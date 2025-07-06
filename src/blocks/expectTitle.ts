/**
 * Page title assertion block for verifying the current page title.
 * Supports both exact and partial title matching with case sensitivity options.
 * Essential for navigation verification and page state validation.
 * Provides clear error messages showing expected vs actual titles.
 * Commonly used after navigation to confirm successful page loads.
 */

import type { Page } from "@playwright/test"
import { validateParameters, type BlockParameters } from "./index.js"

export async function expectTitle(page: Page, parameters: BlockParameters = {}): Promise<void> {
	validateParameters(parameters, ["title"])

	const expectedTitle = parameters.title as string
	const exact = parameters.exact !== false // Default to exact match

	try {
		const actualTitle = await page.title()
		console.log(`📋 Checking page title: "${actualTitle}"`)

		const matches = exact ? actualTitle === expectedTitle : actualTitle.includes(expectedTitle)

		if (!matches) {
			throw new Error(`Title mismatch. Expected: "${expectedTitle}", Actual: "${actualTitle}"`)
		}

		console.log(`✅ Page title verified: "${actualTitle}"`)
	} catch (error) {
		const errorMessage = error instanceof Error ? error.message : String(error)
		throw new Error(`Title assertion failed: ${errorMessage}`)
	}
}
