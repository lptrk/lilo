import type { Page } from "@playwright/test"
import type { BlockParameters } from "./index.js"

/**
 * Waits for a console message
 */
export async function waitForConsoleMessage(page: Page, parameters: BlockParameters = {}): Promise<void> {
  const { text, type, timeout } = parameters
  const timeoutMs = Number.parseInt(timeout as string) || 30000

  try {
    console.log(`📝 Waiting for console message (timeout: ${timeoutMs}ms)`)

    await page.waitForEvent("console", {
      predicate: (msg) => {
        const matchesType = !type || msg.type() === type
        const matchesText = !text || msg.text().includes(text as string)
        return matchesType && matchesText
      },
      timeout: timeoutMs,
    })

    console.log(`✅ Console message detected`)
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error)
    throw new Error(`Failed to wait for console message: ${errorMessage}`)
  }
}
