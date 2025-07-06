import type { Page } from "@playwright/test"
import { validateParameters, type BlockParameters } from "./index.js"

/**
 * Waits for a specific network call
 */
export async function waitForNetworkCall(page: Page, parameters: BlockParameters = {}): Promise<void> {
  validateParameters(parameters, ["urlPattern"])

  const urlPattern = parameters.urlPattern as string
  const method = parameters.method as string
  const timeout = Number.parseInt(parameters.timeout as string) || 30000

  try {
    console.log(`🌐 Waiting for network call: ${urlPattern} (timeout: ${timeout}ms)`)

    if (method) {
      await page.waitForRequest(
        (request) => request.url().includes(urlPattern) && request.method() === method.toUpperCase(),
        { timeout },
      )
    } else {
      await page.waitForRequest(urlPattern, { timeout })
    }

    console.log(`✅ Network call detected`)
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error)
    throw new Error(`Failed to wait for network call: ${errorMessage}`)
  }
}
