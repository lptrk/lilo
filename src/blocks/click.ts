/**
 * Standard click interaction block for clicking elements on the page.
 * Waits for element to be visible and enabled before clicking.
 * Supports various selector types and includes timeout handling.
 * Provides detailed error messages for debugging failed clicks.
 * One of the most commonly used interaction blocks in workflows.
 */

import type { Page } from "@playwright/test"
import { validateParameters, type BlockParameters } from "./index.js"

export async function click(page: Page, parameters: BlockParameters = {}): Promise<void> {
	validateParameters(parameters, ["selector"])

	const selector = parameters.selector as string
	const timeout = Number.parseInt(parameters.timeout as string) || 10000

	try {
		console.log(`🖱️ Clicking: ${selector}`)
		await page.waitForSelector(selector, { state: "visible", timeout })
		await page.click(selector)
		console.log(`✅ Successfully clicked: ${selector}`)
	} catch (error) {
		const errorMessage = error instanceof Error ? error.message : String(error)
		throw new Error(`Failed to click "${selector}": ${errorMessage}`)
	}
}
