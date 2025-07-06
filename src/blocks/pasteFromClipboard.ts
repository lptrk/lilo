import type { Page } from "@playwright/test"
import type { BlockParameters } from "./index.js"

/**
 * Pastes text from clipboard
 */
export async function pasteFromClipboard(page: Page, parameters: BlockParameters = {}): Promise<void> {
  const selector = parameters.selector as string

  try {
    if (selector) {
      console.log(`📋 Pasting to: ${selector}`)
      await page.locator(selector).focus()
      await page.keyboard.press("Control+V")
    } else {
      console.log(`📋 Pasting at current focus`)
      await page.keyboard.press("Control+V")
    }

    console.log(`✅ Text pasted from clipboard`)
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error)
    throw new Error(`Failed to paste from clipboard: ${errorMessage}`)
  }
}
