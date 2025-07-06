/**
 * Command-line interface for the Lilo Playwright Test Runner.
 * Handles CLI argument parsing, workflow file validation, and result output formatting.
 * Provides user-friendly error messages and lists available workflows when files aren't found.
 * Supports environment variable configuration for headless mode and debugging.
 * Exits with appropriate status codes for CI/CD integration.
 */

import { TestRunner } from "./runner/TestRunner.js"
import chalk from "chalk"
import fs from "fs"

// CLI execution
async function main(): Promise<void> {
  const workflowPath = process.argv[2] || "./workflows/simple-example.json"

  if (!fs.existsSync(workflowPath)) {
    console.error(chalk.red(`❌ Workflow file not found: ${workflowPath}`))

    // Show available workflows
    const workflowsDir = "./workflows"
    if (fs.existsSync(workflowsDir)) {
      const availableWorkflows = fs.readdirSync(workflowsDir).filter((f) => f.endsWith(".json"))
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

  try {
    const result = await runner.runWorkflow(workflowPath)

    // Output final results
    console.log("=== FINAL_RESULTS ===")
    console.log(JSON.stringify(result.stepResults))
    console.log("=== END_RESULTS ===")

    if (result.success) {
      console.log("✅ TESTS PASSED")
      process.exit(0)
    } else {
      console.log("❌ TESTS FAILED")
      console.error("Error:", result.error)
      process.exit(1)
    }
  } catch (error) {
    console.error("❌ CLI Error:", error)
    process.exit(1)
  } finally {
    await runner.cleanup()
  }
}

// Run if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  main()
}
