import type { Page } from "@playwright/test"
import type { BlockParameters } from "./index.js"

/**
 * Navigates to a specific page/path
 */
export async function navigateToPage(page: Page, parameters: BlockParameters = {}): Promise<void> {
  const path = (parameters.path as string) || "/"
  const baseUrl = (parameters.baseUrl as string) || page.url().split("/").slice(0, 3).join("/")
  const fullUrl = path.startsWith("http") ? path : `${baseUrl}${path}`

  try {
    await page.goto(fullUrl)
    await page.waitForLoadState("networkidle")

    console.log(`✅ Successfully navigated to: ${fullUrl}`)
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error)
    throw new Error(`Failed to navigate to "${fullUrl}": ${errorMessage}`)
  }
}
