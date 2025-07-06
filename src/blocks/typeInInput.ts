import type { Page } from "@playwright/test"
import { validateParameters, type BlockParameters } from "./index.js"

/**
 * Types text into an input field
 */
export async function typeInInput(page: Page, parameters: BlockParameters = {}): Promise<void> {
  validateParameters(parameters, ["text", "selector"])

  const text = parameters.text as string
  const selector = parameters.selector as string

  try {
    // Wait for the input to be visible
    await page.waitForSelector(selector, { state: "visible", timeout: 10000 })

    // Clear existing text if specified
    if (parameters.clearFirst !== "false") {
      await page.fill(selector, "")
    }

    // Type the text (simulates real typing)
    await page.type(selector, text, { delay: Number.parseInt(parameters.delay as string) || 100 })

    console.log(`✅ Successfully typed "${text}" into ${selector}`)
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error)
    throw new Error(`Failed to type into input "${selector}": ${errorMessage}`)
  }
}
