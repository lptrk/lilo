import type { Page } from "@playwright/test"
import { validateParameters, type BlockParameters } from "./index.js"

/**
 * Checks if element is in viewport
 */
export async function isElementInViewport(page: Page, parameters: BlockParameters = {}): Promise<void> {
  validateParameters(parameters, ["selector"])

  const selector = parameters.selector as string

  try {
    console.log(`👀 Checking if element is in viewport: ${selector}`)

    const isInViewport = await page.locator(selector).isVisible()
    console.log(`👀 Element in viewport: ${isInViewport}`)
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error)
    throw new Error(`Failed to check viewport visibility: ${errorMessage}`)
  }
}
