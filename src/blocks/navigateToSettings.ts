import type { Page } from "@playwright/test"
import type { BlockParameters } from "./index.js"

/**
 * Navigates to the settings page
 */
export async function navigateToSettings(page: Page, parameters: BlockParameters = {}): Promise<void> {
  const path = (parameters.path as string) || "/settings"
  const baseUrl = page.url().split("/").slice(0, 3).join("/")
  const fullUrl = `${baseUrl}${path}`

  try {
    await page.goto(fullUrl)
    await page.waitForLoadState("networkidle")

    console.log(`✅ Successfully navigated to settings: ${fullUrl}`)
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error)
    throw new Error(`Failed to navigate to settings "${fullUrl}": ${errorMessage}`)
  }
}
