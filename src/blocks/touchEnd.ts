import type { Page } from "@playwright/test"
import type { BlockParameters } from "./index.js"

/**
 * Ends a touch interaction
 */
export async function touchEnd(page: Page, parameters: BlockParameters = {}): Promise<void> {
  try {
    console.log(`👆 Touch end`)

    // In Playwright, touch end is handled automatically
    // This is more for semantic clarity in workflows

    console.log(`✅ Touch end completed`)
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error)
    throw new Error(`Failed to end touch: ${errorMessage}`)
  }
}
