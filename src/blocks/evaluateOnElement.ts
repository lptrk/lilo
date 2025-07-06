import type { Page } from "@playwright/test"
import { validateParameters, type BlockParameters } from "./index.js"

/**
 * Evaluates code on a specific element
 */
export async function evaluateOnElement(page: Page, parameters: BlockParameters = {}): Promise<void> {
  validateParameters(parameters, ["selector", "code"])

  const selector = parameters.selector as string
  const code = parameters.code as string

  try {
    console.log(`🔧 Evaluating on element: ${selector}`)

    const result = await page.locator(selector).evaluate(code)
    console.log(`🔧 Evaluation result:`, result)
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error)
    throw new Error(`Failed to evaluate on element: ${errorMessage}`)
  }
}
