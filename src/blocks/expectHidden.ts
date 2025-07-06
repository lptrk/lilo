/**
 * Element hidden state assertion block for verifying elements are not visible.
 * Waits for element to become hidden or confirms it's already hidden.
 * Useful for testing conditional UI elements and dynamic content hiding.
 * Supports timeout configuration for different hiding animation durations.
 * Complementary to expectVisible for comprehensive visibility testing.
 */

import type { Page } from "@playwright/test"
import { validateParameters, type BlockParameters } from "./index.js"

export async function expectHidden(page: Page, parameters: BlockParameters = {}): Promise<void> {
	validateParameters(parameters, ["selector"])

	const selector = parameters.selector as string
	const timeout = Number.parseInt(parameters.timeout as string) || 10000

	try {
		console.log(`🙈 Checking element is hidden: ${selector}`)
		await page.waitForSelector(selector, { state: "hidden", timeout })
		console.log(`✅ Element is hidden: ${selector}`)
	} catch (error) {
		const errorMessage = error instanceof Error ? error.message : String(error)
		throw new Error(`Element not hidden "${selector}": ${errorMessage}`)
	}
}
