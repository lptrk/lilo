import type { Page } from "@playwright/test"
import { validateParameters, type BlockParameters } from "./index.js"

/**
 * Waits for an element to appear on the page
 */
export async function waitForElement(page: Page, parameters: BlockParameters = {}): Promise<void> {
  validateParameters(parameters, ["selector"])

  const selector = parameters.selector as string
  const timeout = Number.parseInt(parameters.timeout as string) || 10000
  const state = (parameters.state as "attached" | "detached" | "visible" | "hidden") || "visible"

  try {
    await page.waitForSelector(selector, { state, timeout })
    console.log(`✅ Element found: ${selector}`)
  } catch (error) {
    throw new Error(`Element not found within ${timeout}ms: ${selector}`)
  }
}
