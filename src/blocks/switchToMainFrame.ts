import type { Page } from "@playwright/test"
import type { BlockParameters } from "./index.js"

/**
 * Switches to the main frame (semantic operation)
 */
export async function switchToMainFrame(page: Page, parameters: BlockParameters = {}): Promise<void> {
  try {
    console.log(`🖼️ Switching to main frame`)
    // In Playwright, page operations are always on main frame by default
    // This is more for semantic clarity in workflows
    console.log(`✅ Switched to main frame`)
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error)
    throw new Error(`Failed to switch to main frame: ${errorMessage}`)
  }
}
