/**
 * Text content assertion block for verifying element text content.
 * Supports both exact text matching and partial text inclusion checks.
 * Essential for validating dynamic content and user interface text.
 * Provides detailed error messages showing expected vs actual text content.
 * Commonly used for testing labels, messages, and dynamic content updates.
 */

import type { Page } from "@playwright/test"
import { validateParameters, type BlockParameters } from "./index.js"

export async function expectText(page: Page, parameters: BlockParameters = {}): Promise<void> {
	validateParameters(parameters, ["selector", "text"])

	const selector = parameters.selector as string
	const expectedText = parameters.text as string
	const exact = parameters.exact === true

	try {
		console.log(`📝 Checking text in "${selector}": ${expectedText}`)
		const element = page.locator(selector)
		const actualText = await element.textContent()

		if (!actualText) {
			throw new Error(`No text content found in element: ${selector}`)
		}

		const matches = exact ? actualText.trim() === expectedText : actualText.includes(expectedText)

		if (!matches) {
			throw new Error(`Text mismatch in "${selector}". Expected: "${expectedText}", Actual: "${actualText}"`)
		}

		console.log(`✅ Text verified in "${selector}": ${expectedText}`)
	} catch (error) {
		const errorMessage = error instanceof Error ? error.message : String(error)
		throw new Error(`Text assertion failed: ${errorMessage}`)
	}
}
