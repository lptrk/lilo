import type { Page } from "@playwright/test"
import type { BlockParameters } from "./index.js"

/**
 * Closes WebSocket connection
 */
export async function closeWebSocket(page: Page, parameters: BlockParameters = {}): Promise<void> {
  try {
    console.log(`🔌 Closing WebSocket connection`)

    await page.evaluate(() => {
      const ws = (window as any)._testWebSocket
      if (ws) {
        ws.close()
        delete (window as any)._testWebSocket
      }
    })

    console.log(`✅ WebSocket connection closed`)
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error)
    throw new Error(`Failed to close WebSocket: ${errorMessage}`)
  }
}
