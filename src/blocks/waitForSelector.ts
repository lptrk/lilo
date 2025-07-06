/**
 * Element waiting block for waiting until elements appear or change state.
 * Supports different wait states: visible, hidden, attached, detached.
 * More reliable than time-based waits for dynamic content loading.
 * Configurable timeout values for different loading scenarios.
 * Essential for handling asynchronous content and single-page applications.
 */

import type { Page } from "@playwright/test"
import { validateParameters, type BlockParameters } from "./index.js"

export async function waitForSelector(page: Page, parameters: BlockParameters = {}): Promise<void> {
	validateParameters(parameters, ["selector"])

	const selector = parameters.selector as string
	const state = (parameters.state as "attached" | "detached" | "visible" | "hidden") || "visible"
	const timeout = Number.parseInt(parameters.timeout as string) || 30000

	try {
		console.log(`⏳ Waiting for selector "${selector}" to be ${state}`)
		await page.waitForSelector(selector, { state, timeout })
		console.log(`✅ Selector "${selector}" is ${state}`)
	} catch (error) {
		const errorMessage = error instanceof Error ? error.message : String(error)
		throw new Error(`Wait for selector failed "${selector}": ${errorMessage}`)
	}
}
