import type { Page } from "@playwright/test"
import type { BlockParameters } from "./index.js"

/**
 * Sets authentication state
 */
export async function setAuthState(page: Page, parameters: BlockParameters = {}): Promise<void> {
  const { token, cookies, localStorage } = parameters

  try {
    console.log(`🔐 Setting authentication state`)

    if (cookies) {
      await page.context().addCookies(cookies as any[])
    }

    if (localStorage) {
      await page.evaluate((storage) => {
        Object.entries(storage).forEach(([key, value]) => {
          window.localStorage.setItem(key, value as string)
        })
      }, localStorage)
    }

    if (token) {
      await page.evaluate((authToken) => {
        window.localStorage.setItem("authToken", authToken)
      }, token)
    }

    console.log(`✅ Authentication state set`)
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error)
    throw new Error(`Failed to set auth state: ${errorMessage}`)
  }
}
