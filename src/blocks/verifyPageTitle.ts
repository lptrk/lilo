import type { Page } from "@playwright/test"
import { validateParameters, type BlockParameters } from "./index.js"

/**
 * Verifies that the current page title matches the expected title
 */
export async function verifyPageTitle(page: Page, parameters: BlockParameters = {}): Promise<void> {
  validateParameters(parameters, ["expectedTitle"])

  const expectedTitle = parameters.expectedTitle as string

  try {
    // Get the current page title
    const actualTitle = await page.title()

    // Check if titles match (case-insensitive by default)
    const caseSensitive = parameters.caseSensitive === "true"
    const matches = caseSensitive
      ? actualTitle === expectedTitle
      : actualTitle.toLowerCase() === expectedTitle.toLowerCase()

    if (!matches) {
      throw new Error(`Page title mismatch. Expected: "${expectedTitle}", Actual: "${actualTitle}"`)
    }

    console.log(`✅ Page title verified: "${actualTitle}"`)
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error)
    throw new Error(`Failed to verify page title: ${errorMessage}`)
  }
}
