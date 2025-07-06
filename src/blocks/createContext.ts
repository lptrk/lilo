import type { Page } from "@playwright/test"
import type { BlockParameters } from "./index.js"

/**
 * Creates a new browser context
 */
export async function createContext(page: Page, parameters: BlockParameters = {}): Promise<void> {
  const { viewport, userAgent, locale } = parameters

  try {
    console.log(`🌐 Creating new browser context`)

    const browser = page.context().browser()
    if (!browser) throw new Error("Browser not available")

    const newContext = await browser.newContext({
      viewport: viewport || { width: 1280, height: 720 },
      userAgent: userAgent as string,
      locale: locale as string,
    })

    const newPage = await newContext.newPage()
    console.log(`✅ New context created with ${newContext.pages().length} pages`)
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error)
    throw new Error(`Failed to create context: ${errorMessage}`)
  }
}
