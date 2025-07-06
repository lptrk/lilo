import type { Page } from "@playwright/test"
import { validateParameters, type BlockParameters } from "./index.js"

/**
 * Mocks API responses
 */
export async function mockResponse(page: Page, parameters: BlockParameters = {}): Promise<void> {
  validateParameters(parameters, ["urlPattern", "response"])

  const urlPattern = parameters.urlPattern as string
  const response = parameters.response as any

  try {
    console.log(`🌐 Mocking response for: ${urlPattern}`)

    await page.route(urlPattern, async (route) => {
      await route.fulfill({
        status: response.status || 200,
        contentType: response.contentType || "application/json",
        body: JSON.stringify(response.body || {}),
        headers: response.headers || {},
      })
    })

    console.log(`✅ Response mock set up`)
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error)
    throw new Error(`Failed to mock response: ${errorMessage}`)
  }
}
