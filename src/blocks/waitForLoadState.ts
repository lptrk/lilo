/**
 * Page load state waiting block for ensuring page loading completion.
 * Supports different load states: load, domcontentloaded, networkidle.
 * Essential for handling single-page applications and dynamic content.
 * Networkidle state waits for no network activity for 500ms.
 * Commonly used after navigation to ensure page is fully loaded.
 */

import type { Page } from "@playwright/test"
import type { BlockParameters } from "./index.js"

export async function waitForLoadState(page: Page, parameters: BlockParameters = {}): Promise<void> {
	const state = (parameters.state as "load" | "domcontentloaded" | "networkidle") || "load"
	const timeout = Number.parseInt(parameters.timeout as string) || 30000

	try {
		console.log(`⏳ Waiting for load state: ${state}`)
		await page.waitForLoadState(state, { timeout })
		console.log(`✅ Load state reached: ${state}`)
	} catch (error) {
		const errorMessage = error instanceof Error ? error.message : String(error)
		throw new Error(`Wait for load state failed: ${errorMessage}`)
	}
}
