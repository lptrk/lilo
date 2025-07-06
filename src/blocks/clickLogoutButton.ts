import type { Page } from "@playwright/test"
import type { BlockParameters } from "./index.js"

/**
 * Clicks the logout button
 */
export async function clickLogoutButton(page: Page, parameters: BlockParameters = {}): Promise<void> {
  const selector =
    parameters.selector || '[data-testid="logout-button"], button:has-text("Logout"), button:has-text("Sign Out")'

  try {
    await page.waitForSelector(selector, { state: "visible", timeout: 10000 })
    await page.click(selector)
    await page.waitForTimeout(1000)

    console.log("✅ Successfully clicked Logout button")
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error)
    throw new Error(`Failed to click Logout button: ${errorMessage}`)
  }
}
