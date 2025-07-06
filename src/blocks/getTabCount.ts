import type { Page } from "@playwright/test"
import type { BlockParameters } from "./index.js"

/**
 * Gets the current number of open browser tabs
 */
export async function getTabCount(page: Page, parameters: BlockParameters = {}): Promise<void> {
  try {
    const context = page.context()
    const count = context.pages().length

    console.log(`🗂️ Current tab count: ${count}`)
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error)
    throw new Error(`Failed to get tab count: ${errorMessage}`)
  }
}
