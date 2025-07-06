import type { Page } from "@playwright/test"
import type { BlockParameters } from "./index.js"

/**
 * Closes a browser context
 */
export async function closeContext(page: Page, parameters: BlockParameters = {}): Promise<void> {
  const { index, current } = parameters

  try {
    if (current === true || current === "true") {
      console.log(`🌐 Closing current context`)
      await page.context().close()
    } else if (index !== undefined) {
      console.log(`🌐 Closing context at index: ${index}`)

      const browser = page.context().browser()
      if (!browser) throw new Error("Browser not available")

      const contexts = browser.contexts()
      const contextIndex = Number.parseInt(index as string)

      if (contextIndex >= 0 && contextIndex < contexts.length) {
        await contexts[contextIndex].close()
      } else {
        throw new Error(`Context index ${contextIndex} out of range`)
      }
    } else {
      throw new Error("Either current=true or index is required for closeContext")
    }

    console.log(`✅ Context closed`)
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error)
    throw new Error(`Failed to close context: ${errorMessage}`)
  }
}
