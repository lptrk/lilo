import type { Page } from "@playwright/test"
import type { BlockParameters } from "./index.js"

/**
 * Sets print and media options
 */
export async function setPrintOptions(page: Page, parameters: BlockParameters = {}): Promise<void> {
  const mediaType = (parameters.mediaType as string) || "print"
  const colorScheme = (parameters.colorScheme as string) || "light"
  const reducedMotion = (parameters.reducedMotion as string) || "no-preference"

  try {
    console.log(`🖨️ Setting print options`)

    await page.emulateMedia({
      media: mediaType as any,
      colorScheme: colorScheme as any,
      reducedMotion: reducedMotion as any,
    })

    console.log(`✅ Print options set`)
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error)
    throw new Error(`Failed to set print options: ${errorMessage}`)
  }
}
