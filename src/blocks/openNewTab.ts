import type { Page } from "@playwright/test"
import type { BlockParameters } from "./index.js"

/**
 * Opens a new browser tab
 */
export async function openNewTab(page: Page, parameters: BlockParameters = {}): Promise<void> {
  const url = parameters.url as string

  try {
    console.log(`🗂️ Opening new tab${url ? ` with URL: ${url}` : ""}`)

    const context = page.context()
    const newPage = await context.newPage()

    if (url) {
      await newPage.goto(url)
      await newPage.waitForLoadState("networkidle")
    }

    const totalTabs = context.pages().length
    console.log(`✅ New tab opened (Total tabs: ${totalTabs})`)
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error)
    throw new Error(`Failed to open new tab: ${errorMessage}`)
  }
}
