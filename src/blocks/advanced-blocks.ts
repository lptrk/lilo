import { type Page, expect } from "@playwright/test"
import type { BlockParameters } from "./index.js"

/**
 * Advanced Playwright blocks for comprehensive testing
 */

// Network and API Testing
export async function interceptRequest(page: Page, parameters: BlockParameters = {}): Promise<void> {
  const { urlPattern, method, response } = parameters
  if (!urlPattern) throw new Error("urlPattern is required for interceptRequest")

  console.log(`🌐 Intercepting requests to: ${urlPattern}`)

  await page.route(urlPattern, async (route) => {
    if (method && route.request().method() !== method.toUpperCase()) {
      await route.continue()
      return
    }

    if (response) {
      await route.fulfill({
        status: response.status || 200,
        contentType: response.contentType || "application/json",
        body: JSON.stringify(response.body || {}),
      })
    } else {
      await route.continue()
    }
  })
}

export async function waitForNetworkIdle(page: Page, parameters: BlockParameters = {}): Promise<void> {
  const timeout = Number.parseInt(parameters.timeout as string) || 30000
  const idleTime = Number.parseInt(parameters.idleTime as string) || 500

  console.log(`🌐 Waiting for network idle (${idleTime}ms idle time)`)
  await page.waitForLoadState("networkidle", { timeout })
}

// Advanced Element Interactions
export async function scrollIntoView(page: Page, parameters: BlockParameters = {}): Promise<void> {
  const selector = parameters.selector
  if (!selector) throw new Error("selector is required for scrollIntoView")

  console.log(`📜 Scrolling element into view: ${selector}`)
  await page.locator(selector).scrollIntoViewIfNeeded()
}

export async function getElementText(page: Page, parameters: BlockParameters = {}): Promise<void> {
  const selector = parameters.selector
  if (!selector) throw new Error("selector is required for getElementText")

  console.log(`📝 Getting text from: ${selector}`)
  const text = await page.locator(selector).textContent()
  console.log(`📝 Element text: ${text}`)
}

export async function getElementAttribute(page: Page, parameters: BlockParameters = {}): Promise<void> {
  const { selector, attribute } = parameters
  if (!selector || !attribute) {
    throw new Error("selector and attribute are required for getElementAttribute")
  }

  console.log(`📝 Getting attribute "${attribute}" from: ${selector}`)
  const value = await page.locator(selector).getAttribute(attribute)
  console.log(`📝 Attribute value: ${value}`)
}

export async function getElementCount(page: Page, parameters: BlockParameters = {}): Promise<void> {
  const selector = parameters.selector
  if (!selector) throw new Error("selector is required for getElementCount")

  console.log(`📊 Counting elements: ${selector}`)
  const count = await page.locator(selector).count()
  console.log(`📊 Element count: ${count}`)
}

// Keyboard and Mouse Advanced Actions
export async function keyboardShortcut(page: Page, parameters: BlockParameters = {}): Promise<void> {
  const { keys, selector } = parameters
  if (!keys) throw new Error("keys are required for keyboardShortcut")

  if (selector) {
    console.log(`⌨️ Pressing keyboard shortcut "${keys}" on ${selector}`)
    await page.locator(selector).press(keys)
  } else {
    console.log(`⌨️ Pressing keyboard shortcut "${keys}" globally`)
    await page.keyboard.press(keys)
  }
}

export async function mouseMove(page: Page, parameters: BlockParameters = {}): Promise<void> {
  const { x, y } = parameters
  if (x === undefined || y === undefined) {
    throw new Error("x and y coordinates are required for mouseMove")
  }

  console.log(`🖱️ Moving mouse to (${x}, ${y})`)
  await page.mouse.move(Number.parseInt(x), Number.parseInt(y))
}

export async function mouseClick(page: Page, parameters: BlockParameters = {}): Promise<void> {
  const { x, y, button, clickCount } = parameters
  if (x === undefined || y === undefined) {
    throw new Error("x and y coordinates are required for mouseClick")
  }

  console.log(`🖱️ Clicking at (${x}, ${y})`)
  await page.mouse.click(Number.parseInt(x), Number.parseInt(y), {
    button: button || "left",
    clickCount: Number.parseInt(clickCount) || 1,
  })
}

// Dialog and Alert Handling
export async function handleDialog(page: Page, parameters: BlockParameters = {}): Promise<void> {
  const { action, text } = parameters
  if (!action) throw new Error("action is required for handleDialog")

  console.log(`🗨️ Setting up dialog handler: ${action}`)

  page.on("dialog", async (dialog) => {
    console.log(`🗨️ Dialog appeared: ${dialog.type()} - ${dialog.message()}`)

    switch (action) {
      case "accept":
        await dialog.accept(text)
        break
      case "dismiss":
        await dialog.dismiss()
        break
      default:
        throw new Error(`Unknown dialog action: ${action}`)
    }
  })
}

// Page and Browser Management
export async function newPage(page: Page, parameters: BlockParameters = {}): Promise<void> {
  const context = page.context()
  console.log(`📄 Creating new page`)

  const newPage = await context.newPage()
  if (parameters.url) {
    await newPage.goto(parameters.url as string)
  }
}

export async function switchToPage(page: Page, parameters: BlockParameters = {}): Promise<void> {
  const { index, url } = parameters
  const context = page.context()
  const pages = context.pages()

  if (index !== undefined) {
    const pageIndex = Number.parseInt(index)
    if (pageIndex >= 0 && pageIndex < pages.length) {
      console.log(`📄 Switching to page at index: ${pageIndex}`)
      await pages[pageIndex].bringToFront()
    } else {
      throw new Error(`Page index ${pageIndex} out of range`)
    }
  } else if (url) {
    console.log(`📄 Switching to page with URL: ${url}`)
    const targetPage = pages.find((p) => p.url().includes(url))
    if (targetPage) {
      await targetPage.bringToFront()
    } else {
      throw new Error(`Page with URL "${url}" not found`)
    }
  } else {
    throw new Error("Either index or url is required for switchToPage")
  }
}

// Performance and Metrics
export async function measurePerformance(page: Page, parameters: BlockParameters = {}): Promise<void> {
  console.log(`⚡ Measuring page performance`)

  const metrics = await page.evaluate(() => {
    const navigation = performance.getEntriesByType("navigation")[0] as PerformanceNavigationTiming
    return {
      domContentLoaded: navigation.domContentLoadedEventEnd - navigation.domContentLoadedEventStart,
      loadComplete: navigation.loadEventEnd - navigation.loadEventStart,
      firstPaint: performance.getEntriesByName("first-paint")[0]?.startTime || 0,
      firstContentfulPaint: performance.getEntriesByName("first-contentful-paint")[0]?.startTime || 0,
    }
  })

  console.log(`⚡ Performance metrics:`, metrics)
}

// Accessibility Testing
export async function checkAccessibility(page: Page, parameters: BlockParameters = {}): Promise<void> {
  console.log(`♿ Running accessibility checks`)

  // Basic accessibility checks
  const results = await page.evaluate(() => {
    const issues: string[] = []

    // Check for images without alt text
    const images = document.querySelectorAll("img:not([alt])")
    if (images.length > 0) {
      issues.push(`${images.length} images without alt text`)
    }

    // Check for form inputs without labels
    const inputs = document.querySelectorAll("input:not([aria-label]):not([aria-labelledby])")
    const unlabeledInputs = Array.from(inputs).filter((input) => {
      const labels = document.querySelectorAll(`label[for="${input.id}"]`)
      return labels.length === 0
    })
    if (unlabeledInputs.length > 0) {
      issues.push(`${unlabeledInputs.length} form inputs without labels`)
    }

    // Check for missing heading structure
    const headings = document.querySelectorAll("h1, h2, h3, h4, h5, h6")
    if (headings.length === 0) {
      issues.push("No heading elements found")
    }

    return issues
  })

  if (results.length > 0) {
    console.warn(`♿ Accessibility issues found:`, results)
  } else {
    console.log(`♿ No basic accessibility issues found`)
  }
}

// Visual Testing
export async function compareScreenshot(page: Page, parameters: BlockParameters = {}): Promise<void> {
  const { name, threshold } = parameters
  if (!name) throw new Error("name is required for compareScreenshot")

  console.log(`📸 Taking screenshot for comparison: ${name}`)

  await expect(page).toHaveScreenshot(`${name}.png`, {
    threshold: Number.parseFloat(threshold as string) || 0.2,
    maxDiffPixels: Number.parseInt(parameters.maxDiffPixels as string) || 1000,
  })
}

// Mobile and Device Testing
export async function setViewport(page: Page, parameters: BlockParameters = {}): Promise<void> {
  const { width, height } = parameters
  if (!width || !height) {
    throw new Error("width and height are required for setViewport")
  }

  console.log(`📱 Setting viewport to ${width}x${height}`)
  await page.setViewportSize({
    width: Number.parseInt(width),
    height: Number.parseInt(height),
  })
}

export async function emulateDevice(page: Page, parameters: BlockParameters = {}): Promise<void> {
  const { deviceName } = parameters
  if (!deviceName) throw new Error("deviceName is required for emulateDevice")

  console.log(`📱 Emulating device: ${deviceName}`)

  // Common device configurations
  const devices: Record<string, any> = {
    "iPhone 12": { width: 390, height: 844, deviceScaleFactor: 3, isMobile: true },
    iPad: { width: 768, height: 1024, deviceScaleFactor: 2, isMobile: false },
    "Galaxy S21": { width: 360, height: 800, deviceScaleFactor: 3, isMobile: true },
    Desktop: { width: 1920, height: 1080, deviceScaleFactor: 1, isMobile: false },
  }

  const device = devices[deviceName]
  if (!device) {
    throw new Error(`Unknown device: ${deviceName}. Available: ${Object.keys(devices).join(", ")}`)
  }

  await page.setViewportSize({ width: device.width, height: device.height })
}
