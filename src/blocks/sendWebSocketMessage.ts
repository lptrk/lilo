import type { Page } from "@playwright/test"
import { validateParameters, type BlockParameters } from "./index.js"

/**
 * Sends a WebSocket message
 */
export async function sendWebSocketMessage(page: Page, parameters: BlockParameters = {}): Promise<void> {
  validateParameters(parameters, ["message"])

  const message = parameters.message as string
  const url = parameters.url as string

  try {
    console.log(`🔌 Sending WebSocket message: ${message}`)

    await page.evaluate(
      ({ message, url }) => {
        // Find existing WebSocket or create new one
        const ws = (window as any)._testWebSocket || new WebSocket(url || "ws://localhost:8080")
        ws.send(message)
        ;(window as any)._testWebSocket = ws
      },
      { message, url },
    )

    console.log(`✅ WebSocket message sent`)
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error)
    throw new Error(`Failed to send WebSocket message: ${errorMessage}`)
  }
}
