import type { Page } from "@playwright/test"
import { validateParameters, type BlockParameters } from "./index.js"

/**
 * Gets element dimensions and position
 */
export async function getElementBounds(page: Page, parameters: BlockParameters = {}): Promise<void> {
  validateParameters(parameters, ["selector"])

  const selector = parameters.selector as string

  try {
    console.log(`📐 Getting element bounds: ${selector}`)

    const bounds = await page.locator(selector).boundingBox()
    if (bounds) {
      console.log(`📐 Element bounds: x=${bounds.x}, y=${bounds.y}, width=${bounds.width}, height=${bounds.height}`)
    } else {
      throw new Error(`Element not found or not visible: ${selector}`)
    }
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error)
    throw new Error(`Failed to get element bounds: ${errorMessage}`)
  }
}
