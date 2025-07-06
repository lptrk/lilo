/**
 * Network response waiting block for waiting for specific HTTP responses.
 * Supports URL pattern matching and response status validation.
 * Essential for testing API integrations and asynchronous data loading.
 * Can wait for specific endpoints or response patterns.
 * Useful for ensuring data has loaded before proceeding with tests.
 */

import type { Page } from "@playwright/test"
import { validateParameters, type BlockParameters } from "./index.js"

export async function waitForResponse(page: Page, parameters: BlockParameters = {}): Promise<void> {
	validateParameters(parameters, ["urlOrPredicate"])

	const urlOrPredicate = parameters.urlOrPredicate as string
	const timeout = Number.parseInt(parameters.timeout as string) || 30000

	try {
		console.log(`⏳ Waiting for response: ${urlOrPredicate}`)
		await page.waitForResponse(urlOrPredicate, { timeout })
		console.log(`✅ Response received: ${urlOrPredicate}`)
	} catch (error) {
		const errorMessage = error instanceof Error ? error.message : String(error)
		throw new Error(`Wait for response failed: ${errorMessage}`)
	}
}
