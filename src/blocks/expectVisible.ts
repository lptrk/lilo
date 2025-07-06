/**
 * Element visibility assertion block for verifying elements are visible on page.
 * Waits for element to become visible within specified timeout period.
 * Essential for testing dynamic content and ensuring UI elements are rendered.
 * Supports custom timeout values for different loading scenarios.
 * One of the most frequently used assertion blocks in UI testing.
 */

import type { Page } from "@playwright/test"
import { validateParameters, type BlockParameters } from "./index.js"

export async function expectVisible(page: Page, parameters: BlockParameters = {}): Promise<void> {
	validateParameters(parameters, ["selector"])

	const selector = parameters.selector as string
	const timeout = Number.parseInt(parameters.timeout as string) || 10000

	try {
		console.log(`👀 Checking visibility: ${selector}`)
		await page.waitForSelector(selector, { state: "visible", timeout })
		console.log(`✅ Element is visible: ${selector}`)
	} catch (error) {
		const errorMessage = error instanceof Error ? error.message : String(error)
		throw new Error(`Element not visible "${selector}": ${errorMessage}`)
	}
}
