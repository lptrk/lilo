import type { Page } from "@playwright/test"
import type { BlockParameters } from "./index.js"

/**
 * Gets network request logs
 */
export async function getNetworkLogs(page: Page, parameters: BlockParameters = {}): Promise<void> {
  const filterPattern = parameters.filterPattern as string

  try {
    console.log(`🌐 Getting network logs${filterPattern ? ` (filter: ${filterPattern})` : ""}`)

    // Note: This requires setting up request/response listeners beforehand
    const requests = (page as any)._networkLogs || []
    const filtered = filterPattern ? requests.filter((req: any) => req.url.includes(filterPattern)) : requests

    console.log(`📊 Network logs (${filtered.length} entries):`)
    filtered.forEach((req: any, index: number) => {
      console.log(`  ${index + 1}. ${req.method} ${req.url} - ${req.status}`)
    })
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error)
    throw new Error(`Failed to get network logs: ${errorMessage}`)
  }
}
