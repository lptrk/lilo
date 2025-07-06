import type { Page } from "@playwright/test"
import type { BlockParameters } from "./index.js"

/**
 * Waits for page crash
 */
export async function waitForPageCrash(page: Page, parameters: BlockParameters = {}): Promise<void> {
  const timeout = Number.parseInt(parameters.timeout as string) || 30000

  try {
    console.log(`💥 Waiting for page crash (timeout: ${timeout}ms)`)

    await page.waitForEvent("crash", { timeout })

    console.log(`💥 Page crash detected`)
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error)
    throw new Error(`Failed to wait for page crash: ${errorMessage}`)
  }
}
