import type { Page } from "@playwright/test"
import type { BlockParameters } from "./index.js"

/**
 * Closes a browser tab
 */
export async function closeTab(page: Page, parameters: BlockParameters = {}): Promise<void> {
  const { index, url, current } = parameters

  try {
    const context = page.context()
    const pages = context.pages()

    if (current === true || current === "true" || (!index && !url)) {
      console.log("🗂️ Closing current tab")
      await page.close()
    } else if (index !== undefined) {
      const tabIndex = Number.parseInt(index as string)
      if (tabIndex >= 0 && tabIndex < pages.length) {
        console.log(`🗂️ Closing tab at index: ${tabIndex}`)
        await pages[tabIndex].close()
      } else {
        throw new Error(`Tab index ${tabIndex} out of range`)
      }
    } else if (url) {
      console.log(`🗂️ Closing tab with URL: ${url}`)
      const targetPage = pages.find((p) => p.url().includes(url as string))
      if (targetPage) {
        await targetPage.close()
      } else {
        throw new Error(`Tab with URL "${url}" not found`)
      }
    }

    const remainingTabs = context.pages().length
    console.log(`✅ Tab closed (Remaining tabs: ${remainingTabs})`)
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error)
    throw new Error(`Failed to close tab: ${errorMessage}`)
  }
}
