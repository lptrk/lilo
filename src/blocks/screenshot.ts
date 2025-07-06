/**
 * Screenshot capture block for taking page screenshots during test execution.
 * Supports both full page and viewport-only screenshot modes.
 * Automatically creates screenshots directory and handles file naming.
 * Essential for visual testing and debugging failed test scenarios.
 * Provides configurable image quality and format options.
 */

import type { Page } from "@playwright/test"
import type { BlockParameters } from "./index.js"
import path from "path"
import fs from "fs"

export async function screenshot(page: Page, parameters: BlockParameters = {}): Promise<void> {
	const screenshotPath = (parameters.path as string) || `screenshot-${Date.now()}.png`
	const fullPage = parameters.fullPage !== false
	const quality = parameters.quality ? Number.parseInt(parameters.quality as string) : undefined

	try {
		// Ensure directory exists
		const dir = path.dirname(screenshotPath)
		if (!fs.existsSync(dir)) {
			fs.mkdirSync(dir, { recursive: true })
		}

		console.log(`📸 Taking screenshot: ${screenshotPath}`)
		await page.screenshot({
			path: screenshotPath,
			fullPage,
			quality,
			type: screenshotPath.endsWith(".jpg") ? "jpeg" : "png",
		})
		console.log(`✅ Screenshot saved: ${screenshotPath}`)
	} catch (error) {
		const errorMessage = error instanceof Error ? error.message : String(error)
		throw new Error(`Failed to take screenshot: ${errorMessage}`)
	}
}
