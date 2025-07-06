import type { Page } from "@playwright/test"
import type { BlockParameters } from "./index.js"

/**
 * Prints the current page
 */
export async function printPage(page: Page, parameters: BlockParameters = {}): Promise<void> {
  const format = (parameters.format as string) || "A4"
  const landscape = parameters.landscape === true || parameters.landscape === "true"

  try {
    console.log(`🖨️ Printing page`)

    await page.pdf({
      format: format as any,
      landscape,
      printBackground: true,
    })

    console.log(`✅ Page printed`)
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error)
    throw new Error(`Failed to print page: ${errorMessage}`)
  }
}
