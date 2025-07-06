#!/usr/bin/env node

import chalk from "chalk"

const blocks = {
  Navigation: [
    "goto - Navigate to URL",
    "goBack - Navigate back",
    "goForward - Navigate forward",
    "reload - Reload page",
  ],
  "Multi-Tab Management": [
    "openNewTab - Open new browser tab",
    "switchToTab - Switch to specific tab",
    "closeTab - Close browser tab",
    "getTabCount - Get number of open tabs",
    "waitForNewTab - Wait for new tab to open",
  ],
  "File Downloads": [
    "waitForDownload - Wait for download to start",
    "downloadFile - Trigger and handle file download",
    "verifyDownload - Verify downloaded file",
    "getDownloadPath - Get path of downloaded file",
  ],
  "Frame Handling": [
    "waitForFrame - Wait for iframe to load",
    "getFrameCount - Get number of frames",
    "switchToMainFrame - Switch to main frame",
    "executeInFrame - Execute code in specific frame",
    "switchToFrame - Switch to iframe (existing)",
  ],
  "Network & API": [
    "mockResponse - Mock API responses",
    "modifyRequest - Modify outgoing requests",
    "blockRequests - Block specific requests",
    "waitForNetworkCall - Wait for network request",
    "getNetworkLogs - Get network request logs",
    "interceptRequest - Intercept requests (existing)",
    "waitForResponse - Wait for response (existing)",
    "waitForRequest - Wait for request (existing)",
  ],
  "Authentication & Permissions": [
    "setGeolocation - Set device location",
    "grantPermissions - Grant browser permissions",
    "setAuthState - Set authentication state",
    "saveAuthState - Save auth state to file",
    "loadAuthState - Load auth state from file",
  ],
  "Advanced Input": [
    "selectText - Select text in input field",
    "copyToClipboard - Copy text to clipboard",
    "pasteFromClipboard - Paste from clipboard",
    "pressKeySequence - Press sequence of keys",
    "mouseWheel - Mouse wheel scrolling",
    "fill - Fill input field (existing)",
    "type - Type text (existing)",
    "press - Press key (existing)",
  ],
  "Mobile & Touch": [
    "tap - Touch tap gesture",
    "swipe - Swipe gesture",
    "pinch - Pinch zoom gesture",
    "rotate - Rotation gesture",
    "touchStart - Start touch interaction",
    "touchMove - Move touch point",
    "touchEnd - End touch interaction",
  ],
  "PDF & Printing": [
    "generatePDF - Generate PDF from page",
    "printPage - Print current page",
    "setPrintOptions - Set print/media options",
  ],
  "Element Operations": [
    "getElementBounds - Get element dimensions",
    "isElementInViewport - Check if element is visible",
    "getComputedStyle - Get CSS computed styles",
    "executeJavaScript - Execute custom JavaScript",
    "evaluateOnElement - Execute code on specific element",
  ],
  "Shadow DOM": [
    "pierceSelector - Pierce shadow DOM boundaries",
    "shadowRoot - Access shadow root content",
    "queryShadowDOM - Query elements in shadow DOM",
  ],
  WebSocket: [
    "waitForWebSocket - Wait for WebSocket connection",
    "sendWebSocketMessage - Send WebSocket message",
    "closeWebSocket - Close WebSocket connection",
  ],
  "Browser Context": [
    "createContext - Create new browser context",
    "switchContext - Switch between contexts",
    "closeContext - Close browser context",
    "setContextOptions - Set context options",
  ],
  "Advanced Waiting": [
    "waitForConsoleMessage - Wait for console output",
    "waitForPageCrash - Wait for page crash",
    "waitForFileChooser - Wait for file picker",
    "waitForSelector - Wait for element (existing)",
    "waitForLoadState - Wait for load state (existing)",
    "wait - Simple time wait (existing)",
  ],
  Interactions: [
    "click - Click element",
    "doubleClick - Double click element",
    "rightClick - Right click element",
    "hover - Hover over element",
    "clear - Clear input field",
    "selectOption - Select dropdown option",
    "check - Check checkbox",
    "uncheck - Uncheck checkbox",
    "uploadFile - Upload file",
    "dragAndDrop - Drag and drop",
  ],
  Assertions: [
    "expectVisible - Expect element visible",
    "expectHidden - Expect element hidden",
    "expectText - Expect text content",
    "expectExactText - Expect exact text",
    "expectValue - Expect input value",
    "expectAttribute - Expect attribute value",
    "expectClass - Expect CSS class",
    "expectCount - Expect element count",
    "expectEnabled - Expect element enabled",
    "expectDisabled - Expect element disabled",
    "expectChecked - Expect checkbox checked",
    "expectUnchecked - Expect checkbox unchecked",
    "expectUrl - Expect page URL",
    "expectTitle - Expect page title",
  ],
  "Storage & Cookies": [
    "setLocalStorage - Set localStorage",
    "getLocalStorage - Get localStorage",
    "clearLocalStorage - Clear localStorage",
    "setSessionStorage - Set sessionStorage",
    "getSessionStorage - Get sessionStorage",
    "clearSessionStorage - Clear sessionStorage",
    "setCookie - Set cookie",
    "getCookies - Get all cookies",
    "clearCookies - Clear all cookies",
  ],
  Utilities: [
    "screenshot - Take screenshot",
    "scrollTo - Scroll to element/position",
    "executeCustomBlock - Run custom JavaScript",
  ],
}

console.log(chalk.blue("📋 Complete Lilo Block Registry\n"))
console.log(chalk.green(`🎉 Total Blocks Available: ${Object.values(blocks).flat().length}\n`))

Object.entries(blocks).forEach(([category, blockList]) => {
  console.log(chalk.cyan(`${category} (${blockList.length} blocks):`))
  blockList.forEach((block) => {
    console.log(chalk.white(`  • ${block}`))
  })
  console.log()
})

console.log(chalk.yellow("💡 Usage in workflow JSON:"))
console.log(
  chalk.white(`{
  "block": "openNewTab",
  "parameters": {
    "url": "https://example.com"
  }
}`),
)

console.log(chalk.blue("\n🚀 New Features Added:"))
console.log(chalk.green("  ✅ Multi-Tab Management (5 blocks)"))
console.log(chalk.green("  ✅ File Downloads (4 blocks)"))
console.log(chalk.green("  ✅ Enhanced Frame Handling (4 blocks)"))
console.log(chalk.green("  ✅ Advanced Network Operations (5 blocks)"))
console.log(chalk.green("  ✅ Authentication & Permissions (5 blocks)"))
console.log(chalk.green("  ✅ Advanced Input Methods (5 blocks)"))
console.log(chalk.green("  ✅ Mobile & Touch Gestures (7 blocks)"))
console.log(chalk.green("  ✅ PDF & Printing (3 blocks)"))
console.log(chalk.green("  ✅ Advanced Element Operations (5 blocks)"))
console.log(chalk.green("  ✅ Shadow DOM Support (3 blocks)"))
console.log(chalk.green("  ✅ WebSocket Testing (3 blocks)"))
console.log(chalk.green("  ✅ Browser Context Management (4 blocks)"))
console.log(chalk.green("  ✅ Advanced Waiting (3 blocks)"))

console.log(chalk.blue("\n📖 For detailed documentation, see README.md"))
