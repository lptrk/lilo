import type { Page } from "@playwright/test"
import { validateParameters, type BlockParameters } from "./index.js"

/**
 * Triggers a file download and optionally saves it
 */
export async function downloadFile(page: Page, parameters: BlockParameters = {}): Promise<void> {
  validateParameters(parameters, ["triggerSelector"])

  const triggerSelector = parameters.triggerSelector as string
  const savePath = parameters.savePath as string

  try {
    console.log(`📥 Triggering download via: ${triggerSelector}`)

    const downloadPromise = page.waitForEvent("download")
    await page.click(triggerSelector)
    const download = await downloadPromise

    if (savePath) {
      await download.saveAs(savePath)
      console.log(`✅ File downloaded to: ${savePath}`)
    } else {
      const path = await download.path()
      console.log(`✅ File downloaded to: ${path}`)
    }
    // Store download reference for other blocks
    ;(page as any)._lastDownload = download
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error)
    throw new Error(`Failed to download file: ${errorMessage}`)
  }
}
