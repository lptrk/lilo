import type { Page } from "@playwright/test"
import type { BlockParameters } from "./index.js"
import path from "path"
import fs from "fs"

/**
 * Takes a screenshot of the current page
 */
export async function takeScreenshot(page: Page, parameters: BlockParameters = {}): Promise<void> {
  const filename = (parameters.filename as string) || `screenshot-${Date.now()}.png`
  const screenshotsDir = path.join(process.cwd(), "screenshots")

  try {
    // Create screenshots directory if it doesn't exist
    if (!fs.existsSync(screenshotsDir)) {
      fs.mkdirSync(screenshotsDir, { recursive: true })
    }

    const filepath = path.join(screenshotsDir, filename)
    await page.screenshot({
      path: filepath,
      fullPage: parameters.fullPage !== false,
      clip: parameters.clip,
      quality: parameters.quality ? Number.parseInt(parameters.quality as string) : undefined,
      type: (parameters.type as "png" | "jpeg") || "png",
    })

    console.log(`✅ Screenshot saved: ${filepath}`)
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error)
    throw new Error(`Failed to take screenshot: ${errorMessage}`)
  }
}
