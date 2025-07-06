import type { Page } from "@playwright/test"
import { validateParameters, type BlockParameters } from "./index.js"

/**
 * Presses a sequence of keys
 */
export async function pressKeySequence(page: Page, parameters: BlockParameters = {}): Promise<void> {
  validateParameters(parameters, ["keys"])

  const keys = parameters.keys
  const selector = parameters.selector as string
  const delay = Number.parseInt(parameters.delay as string) || 100

  try {
    const keySequence = Array.isArray(keys) ? keys : [keys]

    if (selector) {
      console.log(`⌨️ Pressing key sequence on ${selector}: ${keySequence.join(" + ")}`)
      await page.locator(selector).focus()
    } else {
      console.log(`⌨️ Pressing key sequence: ${keySequence.join(" + ")}`)
    }

    for (const key of keySequence) {
      await page.keyboard.press(key)
      await page.waitForTimeout(delay)
    }

    console.log(`✅ Key sequence completed`)
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error)
    throw new Error(`Failed to press key sequence: ${errorMessage}`)
  }
}
