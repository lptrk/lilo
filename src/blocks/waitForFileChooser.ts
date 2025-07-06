import type { Page } from "@playwright/test"
import type { BlockParameters } from "./index.js"

/**
 * Waits for file chooser dialog
 */
export async function waitForFileChooser(page: Page, parameters: BlockParameters = {}): Promise<void> {
  const { triggerSelector, timeout } = parameters
  const timeoutMs = Number.parseInt(timeout as string) || 30000

  try {
    console.log(`📁 Waiting for file chooser (timeout: ${timeoutMs}ms)`)

    const fileChooserPromise = page.waitForEvent("filechooser", { timeout: timeoutMs })

    if (triggerSelector) {
      await page.click(triggerSelector as string)
    }

    const fileChooser = await fileChooserPromise
    console.log(`✅ File chooser opened (accepts: ${fileChooser.isMultiple() ? "multiple" : "single"} files)`)

    // Store for potential file selection
    ;(page as any)._lastFileChooser = fileChooser
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error)
    throw new Error(`Failed to wait for file chooser: ${errorMessage}`)
  }
}
