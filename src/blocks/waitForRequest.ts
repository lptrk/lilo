/**
 * Network request waiting block for waiting for specific HTTP requests.
 * Monitors outgoing requests and waits for matching URL patterns.
 * Useful for testing that certain API calls are made during user interactions.
 * Supports both exact URL matching and pattern-based request detection.
 * Essential for validating client-side API integration behavior.
 */

import type { Page } from "@playwright/test"
import { validateParameters, type BlockParameters } from "./index.js"

export async function waitForRequest(page: Page, parameters: BlockParameters = {}): Promise<void> {
	validateParameters(parameters, ["urlOrPredicate"])

	const urlOrPredicate = parameters.urlOrPredicate as string
	const timeout = Number.parseInt(parameters.timeout as string) || 30000

	try {
		console.log(`⏳ Waiting for request: ${urlOrPredicate}`)
		await page.waitForRequest(urlOrPredicate, { timeout })
		console.log(`✅ Request detected: ${urlOrPredicate}`)
	} catch (error) {
		const errorMessage = error instanceof Error ? error.message : String(error)
		throw new Error(`Wait for request failed: ${errorMessage}`)
	}
}
