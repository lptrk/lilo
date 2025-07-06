import type { Page } from "@playwright/test"
import type { BlockParameters } from "./index.js"

/**
 * Performs a touch tap gesture
 */
export async function tap(page: Page, parameters: BlockParameters = {}): Promise<void> {
  const { selector, x, y } = parameters

  if (!selector && (x === undefined || y === undefined)) {
    throw new Error("Either selector or coordinates (x, y) are required for tap")
  }

  try {
    if (selector) {
      console.log(`👆 Tapping: ${selector}`)
      await page.locator(selector as string).tap()
    } else {
      console.log(`👆 Tapping at: (${x}, ${y})`)
      await page.touchscreen.tap(Number.parseInt(x as string), Number.parseInt(y as string))
    }

    console.log(`✅ Tap completed`)
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error)
    throw new Error(`Failed to tap: ${errorMessage}`)
  }
}
