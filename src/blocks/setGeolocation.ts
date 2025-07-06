import type { Page } from "@playwright/test"
import { validateParameters, type BlockParameters } from "./index.js"

/**
 * Sets device geolocation
 */
export async function setGeolocation(page: Page, parameters: BlockParameters = {}): Promise<void> {
  validateParameters(parameters, ["latitude", "longitude"])

  const latitude = Number.parseFloat(parameters.latitude as string)
  const longitude = Number.parseFloat(parameters.longitude as string)
  const accuracy = parameters.accuracy ? Number.parseFloat(parameters.accuracy as string) : undefined

  try {
    console.log(`🌍 Setting geolocation: ${latitude}, ${longitude}`)

    await page.context().setGeolocation({
      latitude,
      longitude,
      accuracy,
    })

    console.log(`✅ Geolocation set`)
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error)
    throw new Error(`Failed to set geolocation: ${errorMessage}`)
  }
}
