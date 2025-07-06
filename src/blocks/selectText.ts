import type { Page } from "@playwright/test"
import { validateParameters, type BlockParameters } from "./index.js"

/**
 * Selects text in an input field
 */
export async function selectText(page: Page, parameters: BlockParameters = {}): Promise<void> {
  validateParameters(parameters, ["selector"])

  const selector = parameters.selector as string
  const start = parameters.start as string
  const end = parameters.end as string

  try {
    console.log(`📝 Selecting text in: ${selector}`)

    if (start !== undefined && end !== undefined) {
      await page.evaluate(
        ({ selector, start, end }) => {
          const element = document.querySelector(selector) as HTMLInputElement
          if (element) {
            element.setSelectionRange(start, end)
          }
        },
        { selector, start: Number.parseInt(start), end: Number.parseInt(end) },
      )
    } else {
      await page.locator(selector).selectText()
    }

    console.log(`✅ Text selected`)
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error)
    throw new Error(`Failed to select text: ${errorMessage}`)
  }
}
