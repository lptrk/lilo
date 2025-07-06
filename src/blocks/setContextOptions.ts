import type { Page } from "@playwright/test"
import type { BlockParameters } from "./index.js"

/**
 * Sets browser context options
 */
export async function setContextOptions(page: Page, parameters: BlockParameters = {}): Promise<void> {
  const { viewport, userAgent, locale, timezone } = parameters

  try {
    console.log(`🌐 Setting context options`)

    const context = page.context()

    if (viewport) {
      await page.setViewportSize(viewport as any)
    }

    if (userAgent) {
      await context.setExtraHTTPHeaders({ "User-Agent": userAgent as string })
    }

    if (locale) {
      console.log(`🌐 Locale setting noted: ${locale}`)
    }

    if (timezone) {
      console.log(`🌐 Timezone setting noted: ${timezone}`)
    }

    console.log(`✅ Context options set`)
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error)
    throw new Error(`Failed to set context options: ${errorMessage}`)
  }
}
