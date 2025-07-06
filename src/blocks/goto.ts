/**
 * Standard Playwright navigation block for going to URLs.
 * Supports both absolute URLs and relative paths with base URL resolution.
 * Includes automatic waiting for network idle state for stability.
 * Handles navigation errors and provides clear error messages.
 * Core navigation block used in most workflow scenarios.
 */

import type { Page } from "@playwright/test"
import type { BlockParameters } from "./index.js"

export async function goto(page: Page, parameters: BlockParameters = {}): Promise<void> {
	const url = parameters.url as string
	if (!url) {
		throw new Error("URL parameter is required for goto block")
	}

	try {
		console.log(`🌐 Navigating to: ${url}`)
		await page.goto(url)
		await page.waitForLoadState("networkidle")
		console.log(`✅ Successfully navigated to: ${url}`)
	} catch (error) {
		const errorMessage = error instanceof Error ? error.message : String(error)
		throw new Error(`Failed to navigate to "${url}": ${errorMessage}`)
	}
}
