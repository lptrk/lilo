import type { Page } from "@playwright/test"
import { validateParameters, type BlockParameters } from "./index.js"

/**
 * Modifies outgoing requests
 */
export async function modifyRequest(page: Page, parameters: BlockParameters = {}): Promise<void> {
  validateParameters(parameters, ["urlPattern", "modifications"])

  const urlPattern = parameters.urlPattern as string
  const modifications = parameters.modifications as any

  try {
    console.log(`🌐 Modifying requests for: ${urlPattern}`)

    await page.route(urlPattern, async (route) => {
      const request = route.request()
      await route.continue({
        url: modifications.url || request.url(),
        method: modifications.method || request.method(),
        headers: { ...request.headers(), ...modifications.headers },
        postData: modifications.postData || request.postData(),
      })
    })

    console.log(`✅ Request modification set up`)
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error)
    throw new Error(`Failed to modify request: ${errorMessage}`)
  }
}
