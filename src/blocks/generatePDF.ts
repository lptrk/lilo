import type { Page } from "@playwright/test"
import type { BlockParameters } from "./index.js"

/**
 * Generates a PDF from the current page
 */
export async function generatePDF(page: Page, parameters: BlockParameters = {}): Promise<void> {
  const path = (parameters.path as string) || `pdf-${Date.now()}.pdf`
  const format = (parameters.format as string) || "A4"
  const landscape = parameters.landscape === true || parameters.landscape === "true"

  try {
    console.log(`📄 Generating PDF: ${path}`)

    await page.pdf({
      path,
      format: format as any,
      landscape,
      margin: parameters.margin || { top: "1cm", right: "1cm", bottom: "1cm", left: "1cm" },
      printBackground: true,
    })

    console.log(`✅ PDF generated: ${path}`)
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error)
    throw new Error(`Failed to generate PDF: ${errorMessage}`)
  }
}
