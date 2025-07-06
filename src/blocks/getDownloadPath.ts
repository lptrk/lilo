import type { Page } from "@playwright/test"
import type { BlockParameters } from "./index.js"

/**
 * Gets the path of the last downloaded file
 */
export async function getDownloadPath(page: Page, parameters: BlockParameters = {}): Promise<void> {
  try {
    const download = (page as any)._lastDownload

    if (!download) {
      throw new Error("No download found. Use waitForDownload or downloadFile first.")
    }

    const path = await download.path()
    console.log(`📥 Download path: ${path}`)
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error)
    throw new Error(`Failed to get download path: ${errorMessage}`)
  }
}
