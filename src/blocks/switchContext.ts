import type { Page } from "@playwright/test"
import { validateParameters, type BlockParameters } from "./index.js"

/**
 * Switches between browser contexts
 */
export async function switchContext(page: Page, parameters: BlockParameters = {}): Promise<void> {
  validateParameters(parameters, ["index"])

  const index = Number.parseInt(parameters.index as string)

  try {
    console.log(`🌐 Switching to context at index: ${index}`)

    const browser = page.context().browser()
    if (!browser) throw new Error("Browser not available")

    const contexts = browser.contexts()

    if (index >= 0 && index < contexts.length) {
      const targetContext = contexts[index]
      const pages = targetContext.pages()
      if (pages.length > 0) {
        await pages[0].bringToFront()
      }
      console.log(`✅ Switched to context ${index}`)
    } else {
      throw new Error(`Context index ${index} out of range`)
    }
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error)
    throw new Error(`Failed to switch context: ${errorMessage}`)
  }
}
