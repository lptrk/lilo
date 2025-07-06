import type { Page } from "@playwright/test"
import { validateParameters, type BlockParameters } from "./index.js"

/**
 * Performs a swipe gesture
 */
export async function swipe(page: Page, parameters: BlockParameters = {}): Promise<void> {
  validateParameters(parameters, ["startX", "startY", "endX", "endY"])

  const startX = Number.parseInt(parameters.startX as string)
  const startY = Number.parseInt(parameters.startY as string)
  const endX = Number.parseInt(parameters.endX as string)
  const endY = Number.parseInt(parameters.endY as string)
  const duration = Number.parseInt(parameters.duration as string) || 300

  try {
    console.log(`👆 Swiping from (${startX}, ${startY}) to (${endX}, ${endY})`)

    await page.touchscreen.tap(startX, startY)
    await page.waitForTimeout(50)
    await page.mouse.move(startX, startY)
    await page.mouse.down()
    await page.mouse.move(endX, endY, { steps: 10 })
    await page.mouse.up()
    await page.waitForTimeout(duration)

    console.log(`✅ Swipe completed`)
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error)
    throw new Error(`Failed to swipe: ${errorMessage}`)
  }
}
