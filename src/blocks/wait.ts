/**
 * Simple time-based waiting block for adding delays in test execution.
 * Useful for waiting for animations, transitions, or timed operations.
 * Provides a straightforward way to add pauses in workflow execution.
 * Should be used sparingly - prefer waitForSelector or other condition-based waits.
 * Accepts millisecond values for precise timing control.
 */

import type { Page } from "@playwright/test"
import { validateParameters, type BlockParameters } from "./index.js"

export async function wait(page: Page, parameters: BlockParameters = {}): Promise<void> {
	validateParameters(parameters, ["ms"])

	const ms = Number.parseInt(parameters.ms as string)

	if (ms < 0) {
		throw new Error("Wait time must be positive")
	}

	try {
		console.log(`⏱️ Waiting for ${ms}ms`)
		await page.waitForTimeout(ms)
		console.log(`✅ Wait completed`)
	} catch (error) {
		const errorMessage = error instanceof Error ? error.message : String(error)
		throw new Error(`Wait failed: ${errorMessage}`)
	}
}
