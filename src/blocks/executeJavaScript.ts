import type { Page } from "@playwright/test"
import { validateParameters, type BlockParameters } from "./index.js"

/**
 * Executes custom JavaScript code
 */
export async function executeJavaScript(page: Page, parameters: BlockParameters = {}): Promise<void> {
  validateParameters(parameters, ["code"])

  const code = parameters.code as string
  const args = parameters.args

  try {
    console.log(`🔧 Executing JavaScript`)

    const result = await page.evaluate(code, args)
    console.log(`🔧 JavaScript result:`, result)
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error)
    throw new Error(`Failed to execute JavaScript: ${errorMessage}`)
  }
}
