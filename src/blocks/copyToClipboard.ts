import type { Page } from "@playwright/test"
import type { BlockParameters } from "./index.js"

/**
 * Copies text to clipboard
 */
export async function copyToClipboard(page: Page, parameters: BlockParameters = {}): Promise<void> {
  const { text, selector } = parameters

  if (!text && !selector) {
    throw new Error("Either text or selector is required for copyToClipboard")
  }

  try {
    if (text) {
      console.log(`📋 Copying text to clipboard: ${text}`)
      await page.evaluate((textToCopy) => {
        navigator.clipboard.writeText(textToCopy)
      }, text)
    } else if (selector) {
      console.log(`📋 Copying selected text from: ${selector}`)
      await page.locator(selector as string).selectText()
      await page.keyboard.press("Control+C")
    }

    console.log(`✅ Text copied to clipboard`)
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error)
    throw new Error(`Failed to copy to clipboard: ${errorMessage}`)
  }
}
