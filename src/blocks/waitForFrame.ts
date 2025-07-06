import type { Page } from "@playwright/test"
import type { BlockParameters } from "./index.js"

/**
 * Waits for an iframe to load
 */
export async function waitForFrame(page: Page, parameters: BlockParameters = {}): Promise<void> {
  const { name, url, timeout } = parameters
  const timeoutMs = Number.parseInt(timeout as string) || 30000

  if (!name && !url) {
    throw new Error("Either name or url is required for waitForFrame")
  }

  try {
    console.log(`🖼️ Waiting for frame (timeout: ${timeoutMs}ms)`)

    if (name) {
      await page.waitForFunction(
        (frameName) => {
          return Array.from(document.querySelectorAll("iframe")).some((iframe) => iframe.name === frameName)
        },
        name,
        { timeout: timeoutMs },
      )
      console.log(`✅ Frame found by name: ${name}`)
    } else if (url) {
      await page.waitForFunction(
        (frameUrl) => {
          return Array.from(document.querySelectorAll("iframe")).some((iframe) => iframe.src.includes(frameUrl))
        },
        url,
        { timeout: timeoutMs },
      )
      console.log(`✅ Frame found by URL: ${url}`)
    }
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error)
    throw new Error(`Failed to wait for frame: ${errorMessage}`)
  }
}
