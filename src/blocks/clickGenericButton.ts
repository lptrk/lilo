import type { Page } from "@playwright/test"
import { validateParameters, type BlockParameters } from "./index.js"

/**
 * Clicks a generic button element using a CSS selector
 */
export async function clickGenericButton(page: Page, parameters: BlockParameters = {}): Promise<void> {
  validateParameters(parameters, ["selector"])

  const selector = parameters.selector as string

  try {
    // Wait for the button to be visible and enabled
    await page.waitForSelector(selector, { state: "visible", timeout: 10000 })

    // Check if button is enabled
    const isEnabled = await page.isEnabled(selector)
    if (!isEnabled) {
      throw new Error(`Button is disabled: ${selector}`)
    }

    // Click the button
    await page.click(selector)

    // Wait a bit for any resulting actions
    await page.waitForTimeout(1000)

    console.log(`✅ Successfully clicked button: ${selector}`)
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error)
    throw new Error(`Failed to click button "${selector}": ${errorMessage}`)
  }
}
