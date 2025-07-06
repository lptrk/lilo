import type { Page } from "@playwright/test"
import { validateParameters, type BlockParameters } from "./index.js"

/**
 * Pierces shadow DOM boundaries
 */
export async function pierceSelector(page: Page, parameters: BlockParameters = {}): Promise<void> {
  validateParameters(parameters, ["selector"])

  const selector = parameters.selector as string
  const action = parameters.action as string
  const value = parameters.value as string

  try {
    console.log(`🌑 Piercing shadow DOM: ${selector}`)

    const element = page.locator(`pierce=${selector}`)

    if (action === "click") {
      await element.click()
    } else if (action === "fill" && value) {
      await element.fill(value)
    } else if (action === "getText") {
      const text = await element.textContent()
      console.log(`🌑 Shadow DOM text: ${text}`)
    } else {
      // Just verify element exists
      await element.waitFor()
    }

    console.log(`✅ Shadow DOM pierced successfully`)
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error)
    throw new Error(`Failed to pierce shadow DOM: ${errorMessage}`)
  }
}
