import type { Page } from "@playwright/test"
import { validateParameters, type BlockParameters } from "./index.js"

/**
 * Blocks specific requests
 */
export async function blockRequests(page: Page, parameters: BlockParameters = {}): Promise<void> {
  validateParameters(parameters, ["urlPatterns"])

  const urlPatterns = parameters.urlPatterns

  try {
    const patterns = Array.isArray(urlPatterns) ? urlPatterns : [urlPatterns]
    console.log(`🌐 Blocking requests for patterns: ${patterns.join(", ")}`)

    for (const pattern of patterns) {
      await page.route(pattern, (route) => route.abort())
    }

    console.log(`✅ Request blocking set up`)
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error)
    throw new Error(`Failed to block requests: ${errorMessage}`)
  }
}
