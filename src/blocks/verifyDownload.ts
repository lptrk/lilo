import type { Page } from "@playwright/test"
import type { BlockParameters } from "./index.js"

/**
 * Verifies a downloaded file
 */
export async function verifyDownload(page: Page, parameters: BlockParameters = {}): Promise<void> {
  const { filename, minSize, maxSize } = parameters

  try {
    const download = (page as any)._lastDownload

    if (!download) {
      throw new Error("No download found. Use waitForDownload or downloadFile first.")
    }

    const suggestedName = download.suggestedFilename()
    console.log(`📥 Verifying download: ${suggestedName}`)

    if (filename && !suggestedName.includes(filename as string)) {
      throw new Error(`Download filename "${suggestedName}" does not contain "${filename}"`)
    }

    // Additional size checks if specified
    if (minSize || maxSize) {
      const path = await download.path()
      if (path) {
        const fs = await import("fs")
        const stats = fs.statSync(path)
        const size = stats.size

        if (minSize && size < Number.parseInt(minSize as string)) {
          throw new Error(`Download size ${size} bytes is less than minimum ${minSize} bytes`)
        }
        if (maxSize && size > Number.parseInt(maxSize as string)) {
          throw new Error(`Download size ${size} bytes is greater than maximum ${maxSize} bytes`)
        }

        console.log(`✅ Download verified (${size} bytes)`)
      }
    } else {
      console.log(`✅ Download verified: ${suggestedName}`)
    }
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error)
    throw new Error(`Failed to verify download: ${errorMessage}`)
  }
}
