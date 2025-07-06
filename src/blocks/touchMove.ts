import type { Page } from "@playwright/test"
import { validateParameters, type BlockParameters } from "./index.js"

/**
 * Moves a touch point
 */
export async function touchMove(page: Page, parameters: BlockParameters = {}): Promise<void> {
  validateParameters(parameters, ["x", "y"])

  const x = Number.parseInt(parameters.x as string)
  const y = Number.parseInt(parameters.y as string)

  try {
    console.log(`👆 Touch move to: (${x}, ${y})`)

    await page.mouse.move(x, y)

    console.log(`✅ Touch move completed`)
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error)
    throw new Error(`Failed to move touch: ${errorMessage}`)
  }
}
