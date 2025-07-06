import type { Page } from "@playwright/test"
import { validateParameters, type BlockParameters } from "./index.js"

/**
 * Loads authentication state from file
 */
export async function loadAuthState(page: Page, parameters: BlockParameters = {}): Promise<void> {
  validateParameters(parameters, ["path"])

  const path = parameters.path as string

  try {
    console.log(`🔐 Loading authentication state from: ${path}`)

    const fs = await import("fs")
    const authState = JSON.parse(fs.readFileSync(path, "utf8"))

    if (authState.cookies) {
      await page.context().addCookies(authState.cookies)
    }

    if (authState.origins) {
      for (const origin of authState.origins) {
        if (origin.localStorage) {
          await page.evaluate((items) => {
            items.forEach((item: any) => {
              window.localStorage.setItem(item.name, item.value)
            })
          }, origin.localStorage)
        }
      }
    }

    console.log(`✅ Authentication state loaded`)
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error)
    throw new Error(`Failed to load auth state: ${errorMessage}`)
  }
}
