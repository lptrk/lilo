import type { Page } from "@playwright/test"
import type { BlockParameters } from "./index.js"

/**
 * Saves authentication state to file
 */
export async function saveAuthState(page: Page, parameters: BlockParameters = {}): Promise<void> {
  const path = (parameters.path as string) || "./auth-stateon"

  try {
    console.log(`🔐 Saving authentication state to: ${path}`)

    await page.context().storageState({ path })

    console.log(`✅ Authentication state saved`)
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error)
    throw new Error(`Failed to save auth state: ${errorMessage}`)
  }
}
