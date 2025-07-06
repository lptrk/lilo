import type { Page } from "@playwright/test"
import type { BlockParameters } from "./index.js"

/**
 * Waits for WebSocket connection
 */
export async function waitForWebSocket(page: Page, parameters: BlockParameters = {}): Promise<void> {
  const url = parameters.url as string
  const timeout = Number.parseInt(parameters.timeout as string) || 30000

  try {
    console.log(`🔌 Waiting for WebSocket connection${url ? ` to ${url}` : ""} (timeout: ${timeout}ms)`)

    await page.waitForEvent("websocket", {
      predicate: (ws) => !url || ws.url().includes(url),
      timeout,
    })

    console.log(`✅ WebSocket connection detected`)
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error)
    throw new Error(`Failed to wait for WebSocket: ${errorMessage}`)
  }
}
