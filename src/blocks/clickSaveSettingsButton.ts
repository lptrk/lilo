import type { Page } from "@playwright/test"
import type { BlockParameters } from "./index.js"

/**
 * Clicks the save settings button
 */
export async function clickSaveSettingsButton(page: Page, parameters: BlockParameters = {}): Promise<void> {
  const selector =
    (parameters.selector as string) ||
    '[data-testid="save-settings"], button:has-text("Save"), button:has-text("Save Settings")'

  try {
    await page.waitForSelector(selector, { state: "visible", timeout: 10000 })
    await page.click(selector)
    await page.waitForTimeout(1000)

    console.log("✅ Successfully clicked Save Settings button")
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error)
    throw new Error(`Failed to click Save Settings button: ${errorMessage}`)
  }
}
