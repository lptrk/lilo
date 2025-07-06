import chalk from "chalk"
import type { Page } from "@playwright/test"
import { executeCustomBlock } from "../blocks/custom-executor"
import type { Logger } from "./logger"
import type { BlockParameters } from "../blocks"

interface WorkflowStep {
  block: string
  parameters?: BlockParameters
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

export class WorkflowExecutor {
  private page: Page
  private blockRegistry: Record<string, Function>
  private logger: Logger
  private customBlocks: Record<string, CustomBlock>
  private executionStack: string[] = []

  constructor(
    page: Page,
    blockRegistry: Record<string, Function>,
    logger: Logger,
    customBlocks: Record<string, CustomBlock> = {},
  ) {
    this.page = page
    this.blockRegistry = blockRegistry
    this.logger = logger
    this.customBlocks = customBlocks
  }

  async executeWorkflow(workflowConfig: WorkflowConfig, workflowId: string, depth = 0): Promise<void> {
    const workflow = workflowConfig.workflows[workflowId]
    if (!workflow) {
      throw new Error(`Workflow '${workflowId}' not found`)
    }

    // Prevent infinite recursion
    if (this.executionStack.includes(workflowId)) {
      throw new Error(`Circular workflow dependency detected: ${this.executionStack.join(" -> ")} -> ${workflowId}`)
    }

    this.executionStack.push(workflowId)
    const indent = "  ".repeat(depth)

    this.logger.info(`${indent}🔄 Executing workflow: ${chalk.cyan(workflow.name)} (${workflow.workflow.length} steps)`)

    try {
      // Navigate to base URL if this is the main workflow
      if (depth === 0 && workflowConfig.baseUrl) {
        this.logger.info(`${indent}🌐 Navigating to base URL: ${workflowConfig.baseUrl}`)
        await this.page.goto(workflowConfig.baseUrl)
        await this.page.waitForLoadState("networkidle")
      }

      // Execute each step in the workflow
      for (let i = 0; i < workflow.workflow.length; i++) {
        const step = workflow.workflow[i]
        await this.executeStep(step, i + 1, workflowConfig, depth)
      }

      this.logger.success(`${indent}✅ Workflow '${workflow.name}' completed successfully`)
    } finally {
      this.executionStack.pop()
    }
  }

  private async executeStep(
    step: WorkflowStep,
    stepNumber: number,
    workflowConfig: WorkflowConfig,
    depth = 0,
  ): Promise<void> {
    const indent = "  ".repeat(depth)

    // Log block start with clear formatting
    console.log(
      `BLOCK_STATUS:${JSON.stringify({
        blockId: step.block,
        stepNumber: stepNumber,
        status: "running",
        timestamp: new Date().toISOString(),
      })}`,
    )

    this.logger.info(`${indent}  ${stepNumber}. ${step.block}`)

    const startTime = Date.now()

    try {
      // Handle workflow calls
      if (step.block === "callWorkflow") {
        const workflowId = step.parameters?.workflowId
        if (!workflowId) {
          throw new Error("callWorkflow requires workflowId parameter")
        }

        this.logger.info(`${indent}     🔗 Calling workflow: ${workflowId}`)
        await this.executeWorkflow(workflowConfig, workflowId, depth + 1)
      } else if (this.customBlocks[step.block]) {
        // Handle custom blocks
        const customBlock = this.customBlocks[step.block]
        this.logger.info(`${indent}     🎨 Executing custom block: ${customBlock.name}`)

        await executeCustomBlock(this.page, step.parameters || {}, customBlock.code)
      } else {
        // Handle regular blocks
        const blockFunction = this.blockRegistry[step.block]
        if (!blockFunction) {
          throw new Error(`Block '${step.block}' not found in registry`)
        }

        await blockFunction(this.page, step.parameters || {})
      }

      // Small delay for stability
      await this.page.waitForTimeout(200)

      const duration = Date.now() - startTime

      // Log successful completion with clear formatting
      console.log(
        `BLOCK_STATUS:${JSON.stringify({
          blockId: step.block,
          stepNumber: stepNumber,
          status: "success",
          duration: duration,
          timestamp: new Date().toISOString(),
        })}`,
      )

      this.logger.success(`${indent}     ✅ Completed (${duration}ms)`)
    } catch (error) {
      const duration = Date.now() - startTime
      const errorMessage = error instanceof Error ? error.message : String(error)

      // Log failure with clear formatting
      console.log(
        `BLOCK_STATUS:${JSON.stringify({
          blockId: step.block,
          stepNumber: stepNumber,
          status: "failed",
          duration: duration,
          error: errorMessage,
          timestamp: new Date().toISOString(),
        })}`,
      )

      this.logger.error(`${indent}     ❌ Failed: ${errorMessage} (${duration}ms)`)
      throw error
    }
  }
}
