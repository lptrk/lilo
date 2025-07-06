import type { Page } from "@playwright/test"
import type { BlockParameters } from "./index.js"

/**
 * Switches to a specific browser tab
 */
export async function switchToTab(page: Page, parameters: BlockParameters = {}): Promise<void> {
  const { index, url, title } = parameters

  if (!index && !url && !title) {
    throw new Error("Either index, url, or title is required for switchToTab")
  }

  try {
    const context = page.context()
    const pages = context.pages()

    if (index !== undefined) {
      const tabIndex = Number.parseInt(index as string)
      if (tabIndex >= 0 && tabIndex < pages.length) {
        console.log(`🗂️ Switching to tab at index: ${tabIndex}`)
        await pages[tabIndex].bringToFront()
      } else {
        throw new Error(`Tab index ${tabIndex} out of range (0-${pages.length - 1})`)
      }
    } else if (url) {
      console.log(`🗂️ Switching to tab with URL: ${url}`)
      const targetPage = pages.find((p) => p.url().includes(url as string))
      if (targetPage) {
        await targetPage.bringToFront()
      } else {
        throw new Error(`Tab with URL "${url}" not found`)
      }
    } else if (title) {
      console.log(`🗂️ Switching to tab with title: ${title}`)
      let targetPage = null
      for (const p of pages) {
        const pageTitle = await p.title()
        if (pageTitle.includes(title as string)) {
          targetPage = p
          break
        }
      }
      if (targetPage) {
        await targetPage.bringToFront()
      } else {
        throw new Error(`Tab with title "${title}" not found`)
      }
    }

    console.log(`✅ Successfully switched to tab`)
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error)
    throw new Error(`Failed to switch tab: ${errorMessage}`)
  }
}
