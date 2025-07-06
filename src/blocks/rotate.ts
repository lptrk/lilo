import type { Page } from "@playwright/test"
import { validateParameters, type BlockParameters } from "./index.js"

/**
 * Performs a rotation gesture
 */
export async function rotate(page: Page, parameters: BlockParameters = {}): Promise<void> {
  validateParameters(parameters, ["centerX", "centerY", "angle"])

  const centerX = Number.parseInt(parameters.centerX as string)
  const centerY = Number.parseInt(parameters.centerY as string)
  const angle = Number.parseFloat(parameters.angle as string)

  try {
    console.log(`👆 Rotating at (${centerX}, ${centerY}) by ${angle} degrees`)

    // Simulate rotation gesture
    const radius = 50
    const startAngle = 0
    const endAngle = (angle * Math.PI) / 180

    const startX = centerX + radius * Math.cos(startAngle)
    const startY = centerY + radius * Math.sin(startAngle)
    const endX = centerX + radius * Math.cos(endAngle)
    const endY = centerY + radius * Math.sin(endAngle)

    await page.touchscreen.tap(startX, startY)
    await page.mouse.move(endX, endY, { steps: 20 })

    console.log(`✅ Rotation gesture completed`)
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error)
    throw new Error(`Failed to rotate: ${errorMessage}`)
  }
}
