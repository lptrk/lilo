import type { Page } from "@playwright/test"
import { validateParameters, type BlockParameters } from "./index.js"

/**
 * Grants browser permissions
 */
export async function grantPermissions(page: Page, parameters: BlockParameters = {}): Promise<void> {
  validateParameters(parameters, ["permissions"])

  const permissions = parameters.permissions
  const origin = parameters.origin as string

  try {
    const permissionList = Array.isArray(permissions) ? permissions : [permissions]
    console.log(`🔐 Granting permissions: ${permissionList.join(", ")}`)

    await page.context().grantPermissions(permissionList, { origin })

    console.log(`✅ Permissions granted`)
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error)
    throw new Error(`Failed to grant permissions: ${errorMessage}`)
  }
}
