import type { Page } from "@playwright/test"
import { validateParameters, type BlockParameters } from "./index.js"

/**
 * Starts a touch interaction
 */
export async function touchStart(page: Page, parameters: BlockParameters = {}): Promise<void> {
  validateParameters(parameters, ["x", "y"])

  const x = Number.parseInt(parameters.x as string)
  const y = Number.parseInt(parameters.y as string)

  try {
    console.log(`👆 Touch start at: (${x}, ${y})`)

    await page.touchscreen.tap(x, y)

    console.log(`✅ Touch start completed`)
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error)
    throw new Error(`Failed to start touch: ${errorMessage}`)
  }
}
