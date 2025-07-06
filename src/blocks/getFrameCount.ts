import type { Page } from "@playwright/test"
import type { BlockParameters } from "./index.js"

/**
 * Gets the number of frames on the page
 */
export async function getFrameCount(page: Page, parameters: BlockParameters = {}): Promise<void> {
  try {
    const frames = page.frames()
    const count = frames.length

    console.log(`🖼️ Frame count: ${count}`)
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error)
    throw new Error(`Failed to get frame count: ${errorMessage}`)
  }
}
