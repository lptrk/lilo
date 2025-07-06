import type { Page } from "@playwright/test"
import { validateParameters, type BlockParameters } from "./index.js"

/**
 * Performs a pinch zoom gesture
 */
export async function pinch(page: Page, parameters: BlockParameters = {}): Promise<void> {
  validateParameters(parameters, ["centerX", "centerY", "scale"])

  const centerX = Number.parseInt(parameters.centerX as string)
  const centerY = Number.parseInt(parameters.centerY as string)
  const scale = Number.parseFloat(parameters.scale as string)

  try {
    console.log(`🤏 Pinching at (${centerX}, ${centerY}) with scale: ${scale}`)

    // Simulate pinch gesture with two touch points
    const distance = 100
    const newDistance = distance * scale

    // Start with two points
    await page.touchscreen.tap(centerX - distance / 2, centerY)
    await page.touchscreen.tap(centerX + distance / 2, centerY)

    // Move points apart or together based on scale
    await page.mouse.move(centerX - newDistance / 2, centerY, { steps: 10 })
    await page.mouse.move(centerX + newDistance / 2, centerY, { steps: 10 })

    console.log(`✅ Pinch gesture completed`)
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error)
    throw new Error(`Failed to pinch: ${errorMessage}`)
  }
}
