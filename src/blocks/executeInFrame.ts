import type { Page } from "@playwright/test"
import { validateParameters, type BlockParameters } from "./index.js"

/**
 * Executes code in a specific frame
 */
export async function executeInFrame(page: Page, parameters: BlockParameters = {}): Promise<void> {
  validateParameters(parameters, ["code"])

  const { frameSelector, code, name, url } = parameters

  if (!frameSelector && !name && !url) {
    throw new Error("Either frameSelector, name, or url is required")
  }

  try {
    let frame = null

    if (frameSelector) {
      console.log(`🖼️ Executing code in frame by selector: ${frameSelector}`)
      const frameElement = page.locator(frameSelector as string)
      frame = await frameElement.contentFrame()
    } else if (name) {
      console.log(`🖼️ Executing code in frame by name: ${name}`)
      frame = page.frame({ name: name as string })
    } else if (url) {
      console.log(`🖼️ Executing code in frame by URL: ${url}`)
      frame = page.frame({ url: url as string })
    }

    if (!frame) {
      throw new Error("Frame not found")
    }

    if (frame && "evaluate" in frame) {
      await frame.evaluate(code as string)
    } else {
      throw new Error("Frame does not support evaluate method")
    }
    console.log(`✅ Code executed in frame`)
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error)
    throw new Error(`Failed to execute in frame: ${errorMessage}`)
  }
}
