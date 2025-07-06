import type { Page } from "@playwright/test"
import type { BlockParameters } from "./index.js"

/**
 * Waits for a new browser tab to open
 */
export async function waitForNewTab(page: Page, parameters: BlockParameters = {}): Promise<void> {
  const timeout = Number.parseInt(parameters.timeout as string) || 30000

  try {
    console.log(`🗂️ Waiting for new tab (timeout: ${timeout}ms)`)

    const context = page.context()
    const initialCount = context.pages().length

    await context.waitForEvent("page", { timeout })
    const newCount = context.pages().length

    console.log(`✅ New tab detected (${initialCount} → ${newCount})`)
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error)
    throw new Error(`Failed to wait for new tab: ${errorMessage}`)
  }
}
