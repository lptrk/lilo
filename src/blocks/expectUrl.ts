/**
 * URL assertion block for verifying current page URL matches expected pattern.
 * Supports both exact URL matching and pattern-based URL validation.
 * Essential for testing navigation flows and URL-based routing.
 * Handles both full URLs and partial URL pattern matching.
 * Commonly used after navigation to verify correct page destinations.
 */

import type { Page } from "@playwright/test"
import type { BlockParameters } from "./index.js"

export async function expectUrl(page: Page, parameters: BlockParameters = {}): Promise<void> {
	const { url, pattern } = parameters

	if (!url && !pattern) {
		throw new Error("Either url or pattern parameter is required")
	}

	try {
		const currentUrl = page.url()
		console.log(`🌐 Checking current URL: ${currentUrl}`)

		if (url) {
			if (currentUrl !== url) {
				throw new Error(`URL mismatch. Expected: "${url}", Actual: "${currentUrl}"`)
			}
		} else if (pattern) {
			if (!currentUrl.includes(pattern as string)) {
				throw new Error(`URL pattern not found. Pattern: "${pattern}", Actual: "${currentUrl}"`)
			}
		}

		console.log(`✅ URL verified: ${currentUrl}`)
	} catch (error) {
		const errorMessage = error instanceof Error ? error.message : String(error)
		throw new Error(`URL assertion failed: ${errorMessage}`)
	}
}
