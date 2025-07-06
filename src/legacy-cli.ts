import { chromium, type Browser, type BrowserContext, type Page } from "playwright"
import { blockRegistry } from "./blocks/index"
import { Logger } from "./utils/logger"
import fs from "fs"
import chalk from "chalk"
import { executeCustomBlock } from "./blocks/index"

interface TestRunnerOptions {
  headless?: boolean
  browser?: string
  timeout?: number
  debug?: boolean
}

interface WorkflowStep {
  block: string
  parameters?: Record<string, any>
}

interface Workflow {
  name: string
  description?: string
  workflow: WorkflowStep[]
}

interface CustomBlock {
  name: string
  description?: string
  code: string
}

interface WorkflowConfig {
  baseUrl?: string
  workflows: Record<string, Workflow>
  mainWorkflow: string
  customBlocks?: Record<string, CustomBlock>
}

interface StepResult {
  stepNumber: number
  blockId: string
  status: "success" | "failed"
  duration: number
  error?: string
  timestamp: string
}

interface TestResult {
  success: boolean
  error?: string
}

class TestRunner {
  private options: Required<TestRunnerOptions>
  private logger: Logger
  private browser: Browser | null = null
  private context: BrowserContext | null = null
  private page: Page | null = null
  private stepResults: StepResult[] = []

  constructor(options: TestRunnerOptions = {}) {
    this.options = {
      headless: process.env.HEADLESS !== "false" && options.headless !== false,
      browser: options.browser || "chromium",
      timeout: options.timeout || 30000,
      debug: process.env.DEBUG === "true" || options.debug || false,
    }
    this.logger = new Logger(this.options.debug)
  }

  async initialize(): Promise<void> {
    this.logger.info("🚀 Initializing Playwright Test Runner...")

    // Launch browser
    this.browser = await chromium.launch({
      headless: this.options.headless,
      devtools: this.options.debug && !this.options.headless,
    })

    // Create context
    this.context = await this.browser.newContext({
      viewport: { width: 1280, height: 720 },
    })

    // Create page
    this.page = await this.context.newPage()
    this.page.setDefaultTimeout(this.options.timeout)

    this.logger.success(`✅ Browser ready (headless: ${this.options.headless})`)
  }

  async runWorkflow(workflowPath: string): Promise<TestResult> {
    let testsPassed = false
    let errorMessage = ""

    try {
      // Load workflow
      const workflowConfig = this.loadWorkflowConfig(workflowPath)
      this.logger.info(`📋 Running workflow: ${workflowConfig.workflows[workflowConfig.mainWorkflow]?.name}`)

      // Log custom blocks if present
      if (workflowConfig.customBlocks && Object.keys(workflowConfig.customBlocks).length > 0) {
        this.logger.info(`🎨 Custom blocks available: ${Object.keys(workflowConfig.customBlocks).join(", ")}`)
      }

      // Initialize browser
      await this.initialize()

      // Navigate to base URL
      if (workflowConfig.baseUrl && this.page) {
        this.logger.info(`🌐 Base URL: ${workflowConfig.baseUrl}`)
        await this.page.goto(workflowConfig.baseUrl)
        await this.page.waitForLoadState("networkidle")
      }

      // Execute main workflow
      await this.executeWorkflow(workflowConfig, workflowConfig.mainWorkflow)

      this.logger.success("🎉 All tests passed!")
      testsPassed = true

      // Output final results
      console.log("=== FINAL_RESULTS ===")
      console.log(JSON.stringify(this.stepResults))
      console.log("=== END_RESULTS ===")

      return { success: true }
    } catch (error) {
      errorMessage = error instanceof Error ? error.message : String(error)
      this.logger.error("❌ Test failed: " + errorMessage)

      // Output final results even on failure
      console.log("=== FINAL_RESULTS ===")
      console.log(JSON.stringify(this.stepResults))
      console.log("=== END_RESULTS ===")

      testsPassed = false
      return { success: false, error: errorMessage }
    } finally {
      await this.cleanup()

      // Exit with proper code
      if (testsPassed) {
        console.log("✅ TESTS PASSED")
        process.exit(0)
      } else {
        console.log("❌ TESTS FAILED")
        console.error("Error:", errorMessage)
        process.exit(1)
      }
    }
  }

  private async executeWorkflow(workflowConfig: WorkflowConfig, workflowId: string, depth = 0): Promise<void> {
    const workflow = workflowConfig.workflows[workflowId]
    if (!workflow) {
      throw new Error(`Workflow '${workflowId}' not found`)
    }

    const indent = "  ".repeat(depth)
    this.logger.info(`${indent}🔄 Executing: ${workflow.name} (${workflow.workflow.length} steps)`)

    // Execute each step
    for (let i = 0; i < workflow.workflow.length; i++) {
      const step = workflow.workflow[i]
      await this.executeStep(step, i + 1, workflowConfig, depth)
    }

    this.logger.success(`${indent}✅ Workflow completed: ${workflow.name}`)
  }

  private async executeStep(
    step: WorkflowStep,
    stepNumber: number,
    workflowConfig: WorkflowConfig,
    depth = 0,
  ): Promise<void> {
    if (!this.page) {
      throw new Error("Page not initialized")
    }

    const indent = "  ".repeat(depth)
    const startTime = Date.now()

    this.logger.info(`${indent}  ${stepNumber}. ${step.block}`)

    try {
      // Handle workflow calls
      if (step.block === "callWorkflow") {
        const workflowId = step.parameters?.workflowId
        if (!workflowId) {
          throw new Error("callWorkflow requires workflowId parameter")
        }

        this.logger.info(`${indent}     🔗 Calling workflow: ${workflowId}`)
        await this.executeWorkflow(workflowConfig, workflowId, depth + 1)
      } else if (workflowConfig.customBlocks && workflowConfig.customBlocks[step.block]) {
        // Handle custom blocks
        const customBlock = workflowConfig.customBlocks[step.block]
        this.logger.info(`${indent}     🎨 Executing custom block: ${customBlock.name}`)
        this.logger.debug(`${indent}     🔍 Custom block ID: ${step.block}`)
        this.logger.debug(`${indent}     📋 Step parameters: ${JSON.stringify(step.parameters)}`)

        await executeCustomBlock(this.page, step.parameters || {}, customBlock.code)
      } else {
        // Handle regular blocks
        const blockFunction = blockRegistry[step.block as keyof typeof blockRegistry]
        if (!blockFunction) {
          // More detailed error for debugging
          const availableBlocks = Object.keys(blockRegistry)
          const availableCustomBlocks = workflowConfig.customBlocks ? Object.keys(workflowConfig.customBlocks) : []

          this.logger.error(`${indent}     ❌ Block '${step.block}' not found`)
          this.logger.debug(`${indent}     📋 Available built-in blocks: ${availableBlocks.join(", ")}`)
          this.logger.debug(`${indent}     🎨 Available custom blocks: ${availableCustomBlocks.join(", ")}`)

          throw new Error(
            `Block '${step.block}' not found in registry. Available: ${[...availableBlocks, ...availableCustomBlocks].join(", ")}`,
          )
        }

        await blockFunction(this.page, step.parameters || {})
      }

      // Small delay for stability
      await this.page.waitForTimeout(200)

      const duration = Date.now() - startTime

      // Store successful result
      this.stepResults.push({
        stepNumber: stepNumber,
        blockId: step.block,
        status: "success",
        duration: duration,
        timestamp: new Date().toISOString(),
      })

      this.logger.success(`${indent}     ✅ Completed (${duration}ms)`)
    } catch (error) {
      const duration = Date.now() - startTime
      const errorMessage = error instanceof Error ? error.message : String(error)

      // Store failed result
      this.stepResults.push({
        stepNumber: stepNumber,
        blockId: step.block,
        status: "failed",
        duration: duration,
        error: errorMessage,
        timestamp: new Date().toISOString(),
      })

      this.logger.error(`${indent}     ❌ Failed: ${errorMessage} (${duration}ms)`)
      throw error
    }
  }

  private loadWorkflowConfig(workflowPath: string): WorkflowConfig {
    if (!fs.existsSync(workflowPath)) {
      throw new Error(`Workflow file not found: ${workflowPath}`)
    }

    try {
      const content = fs.readFileSync(workflowPath, "utf8")
      const config: WorkflowConfig = JSON.parse(content)

      if (!config.workflows || !config.mainWorkflow) {
        throw new Error("Invalid workflow configuration")
      }

      return config
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : String(error)
      throw new Error(`Failed to parse workflow: ${errorMessage}`)
    }
  }

  private async cleanup(): Promise<void> {
    this.logger.info("🧹 Cleaning up...")
    if (this.browser) {
      await this.browser.close()
    }
  }
}

// CLI execution
async function main(): Promise<void> {
  const workflowPath = process.argv[2] || "./workflows/simple-exampleon"

  if (!fs.existsSync(workflowPath)) {
    console.error(chalk.red(`❌ Workflow file not found: ${workflowPath}`))

    // Show available workflows
    const workflowsDir = "./workflows"
    if (fs.existsSync(workflowsDir)) {
      const availableWorkflows = fs.readdirSync(workflowsDir).filter((f) => f.endsWith("on"))
      if (availableWorkflows.length > 0) {
        console.log(chalk.yellow("\n📋 Available workflows:"))
        availableWorkflows.forEach((workflow) => {
          console.log(chalk.white(`  - ${workflowsDir}/${workflow}`))
        })
        console.log(chalk.gray("\nUsage: npm run test <workflow-file>"))
      }
    }

    process.exit(1)
  }

  const runner = new TestRunner()
  await runner.runWorkflow(workflowPath)
}

// Export for API usage
export { TestRunner }
export type { TestRunnerOptions, WorkflowConfig, WorkflowStep, StepResult, TestResult }

// Run if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  main()
}
