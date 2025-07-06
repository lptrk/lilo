/**
 * Text typing block that simulates realistic keyboard input with delays.
 * Unlike fill, this types character by character for more realistic interaction.
 * Useful for triggering input events and testing real-time validation.
 * Supports configurable typing delay for different interaction speeds.
 * Preferred over fill when testing input event handlers and autocomplete.
 */

import type { Page } from "@playwright/test"
import { validateParameters, type BlockParameters } from "./index.js"

export async function type(page: Page, parameters: BlockParameters = {}): Promise<void> {
	validateParameters(parameters, ["selector", "text"])

	const selector = parameters.selector as string
	const text = parameters.text as string
	const delay = Number.parseInt(parameters.delay as string) || 100
	const timeout = Number.parseInt(parameters.timeout as string) || 10000

	try {
		console.log(`⌨️ Typing in "${selector}": ${text}`)
		await page.waitForSelector(selector, { state: "visible", timeout })
		await page.type(selector, text, { delay })
		console.log(`✅ Successfully typed in: ${selector}`)
	} catch (error) {
		const errorMessage = error instanceof Error ? error.message : String(error)
		throw new Error(`Failed to type in "${selector}": ${errorMessage}`)
	}
}
