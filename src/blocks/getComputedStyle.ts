import type { Page } from "@playwright/test"
import { validateParameters, type BlockParameters } from "./index.js"

/**
 * Gets computed CSS styles for an element
 */
export async function getComputedStyle(page: Page, parameters: BlockParameters = {}): Promise<void> {
  validateParameters(parameters, ["selector"])

  const selector = parameters.selector as string
  const property = parameters.property as string

  try {
    console.log(`🎨 Getting computed style for: ${selector}`)

    const style = await page.evaluate(
      ({ selector, property }) => {
        const element = document.querySelector(selector)
        if (!element) return null

        const computedStyle = window.getComputedStyle(element)
        return property ? computedStyle.getPropertyValue(property) : computedStyle.cssText
      },
      { selector, property },
    )

    console.log(`🎨 Computed style: ${style}`)
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error)
    throw new Error(`Failed to get computed style: ${errorMessage}`)
  }
}
