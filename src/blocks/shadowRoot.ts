import type { Page } from "@playwright/test"
import { validateParameters, type BlockParameters } from "./index.js"

/**
 * Accesses shadow root content
 */
export async function shadowRoot(page: Page, parameters: BlockParameters = {}): Promise<void> {
  validateParameters(parameters, ["hostSelector", "shadowSelector"])

  const hostSelector = parameters.hostSelector as string
  const shadowSelector = parameters.shadowSelector as string
  const action = parameters.action as string

  try {
    console.log(`🌑 Accessing shadow root: ${hostSelector} -> ${shadowSelector}`)

    const result = await page.evaluate(
      ({ hostSelector, shadowSelector, action }) => {
        const host = document.querySelector(hostSelector) as any
        if (!host || !host.shadowRoot) return null

        const shadowElement = host.shadowRoot.querySelector(shadowSelector)
        if (!shadowElement) return null

        if (action === "getText") {
          return shadowElement.textContent
        } else if (action === "click") {
          shadowElement.click()
          return "clicked"
        }

        return shadowElement.outerHTML
      },
      { hostSelector, shadowSelector, action },
    )

    console.log(`🌑 Shadow DOM result:`, result)
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error)
    throw new Error(`Failed to access shadow root: ${errorMessage}`)
  }
}
