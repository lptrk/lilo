/**
 * Standard form input filling block for entering text into input fields.
 * Automatically clears existing content before filling new text.
 * Waits for input field to be visible and interactable.
 * Supports various input types including text, email, password fields.
 * Essential block for form automation and data entry workflows.
 */

import type { Page } from "@playwright/test"
import { validateParameters, type BlockParameters } from "./index.js"

export async function fill(page: Page, parameters: BlockParameters = {}): Promise<void> {
	validateParameters(parameters, ["selector", "value"])

	const selector = parameters.selector as string
	const value = parameters.value as string
	const timeout = Number.parseInt(parameters.timeout as string) || 10000

	try {
		console.log(`📝 Filling "${selector}" with: ${value}`)
		await page.waitForSelector(selector, { state: "visible", timeout })
		await page.fill(selector, value)
		console.log(`✅ Successfully filled: ${selector}`)
	} catch (error) {
		const errorMessage = error instanceof Error ? error.message : String(error)
		throw new Error(`Failed to fill "${selector}": ${errorMessage}`)
	}
}
