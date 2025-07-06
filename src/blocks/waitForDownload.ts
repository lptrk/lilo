import type { Page } from "@playwright/test"
import type { BlockParameters } from "./index.js"

/**
 * Waits for a file download to start
 */
export async function waitForDownload(page: Page, parameters: BlockParameters = {}): Promise<void> {
  const timeout = Number.parseInt(parameters.timeout as string) || 30000

  try {
    console.log(`📥 Waiting for download (timeout: ${timeout}ms)`)

    const downloadPromise = page.waitForEvent("download", { timeout })
    const download = await downloadPromise

    const filename = download.suggestedFilename()
    console.log(`✅ Download started: ${filename}`)

    // Store download reference for other blocks
    ;(page as any)._lastDownload = download
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error)
    throw new Error(`Failed to wait for download: ${errorMessage}`)
  }
}
