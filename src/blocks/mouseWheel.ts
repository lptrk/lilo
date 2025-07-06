import type { Page } from "@playwright/test"
import type { BlockParameters } from "./index.js"

/**
 * Performs mouse wheel scrolling
 */
export async function mouseWheel(page: Page, parameters: BlockParameters = {}): Promise<void> {
  const deltaX = Number.parseInt(parameters.deltaX as string) || 0
  const deltaY = Number.parseInt(parameters.deltaY as string) || 0
  const x = parameters.x as string
  const y = parameters.y as string

  try {
    console.log(`🖱️ Mouse wheel: deltaX=${deltaX}, deltaY=${deltaY}`)

    if (x !== undefined && y !== undefined) {
      await page.mouse.move(Number.parseInt(x), Number.parseInt(y))
    }

    await page.mouse.wheel(deltaX, deltaY)

    console.log(`✅ Mouse wheel action completed`)
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error)
    throw new Error(`Failed to perform mouse wheel: ${errorMessage}`)
  }
}
