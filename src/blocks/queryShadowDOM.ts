import type { Page } from "@playwright/test"
import { validateParameters, type BlockParameters } from "./index.js"

/**
 * Queries elements in shadow DOM
 */
export async function queryShadowDOM(page: Page, parameters: BlockParameters = {}): Promise<void> {
  validateParameters(parameters, ["hostSelector", "shadowSelector"])

  const hostSelector = parameters.hostSelector as string
  const shadowSelector = parameters.shadowSelector as string

  try {
    console.log(`🌑 Querying shadow DOM: ${hostSelector} -> ${shadowSelector}`)

    const exists = await page.evaluate(
      ({ hostSelector, shadowSelector }) => {
        const host = document.querySelector(hostSelector) as any
        if (!host || !host.shadowRoot) return false

        const shadowElement = host.shadowRoot.querySelector(shadowSelector)
        return !!shadowElement
      },
      { hostSelector, shadowSelector },
    )

    console.log(`🌑 Shadow DOM element exists: ${exists}`)
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error)
    throw new Error(`Failed to query shadow DOM: ${errorMessage}`)
  }
}
