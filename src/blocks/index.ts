/**
 * Central registry for all Playwright automation blocks used by the test runner.
 * Imports and exports 50+ test blocks including navigation, interactions, assertions, and advanced features.
 * Provides type definitions and validation utilities for block parameters.
 * Separates executeCustomBlock for special handling due to its unique parameter signature.
 * Serves as the main entry point for all available test automation capabilities.
 */

import type { Page } from "@playwright/test"

export interface BlockParameters {
  [key: string]: any
}

export type BlockFunction = (page: Page, parameters: BlockParameters) => Promise<void>

// Import all block functions
import { navigateToPage } from "./navigateToPage.js"
import { verifyPageTitle } from "./verifyPageTitle.js"
import { waitForElement } from "./waitForElement.js"
import { clickLoginButton } from "./clickLoginButton.js"
import { clickLogoutButton } from "./clickLogoutButton.js"
import { clickCreateUserButton } from "./clickCreateUserButton.js"
import { clickSaveSettingsButton } from "./clickSaveSettingsButton.js"
import { clickGenericButton } from "./clickGenericButton.js"
import { typeInInput } from "./typeInInput.js"
import { fillSearchInput } from "./fillSearchInput.js"
import { navigateToSettings } from "./navigateToSettings.js"
import { takeScreenshot } from "./takeScreenshot.js"
import { executeCustomBlock } from "./custom-executor.js"

// Import all new blocks
import { openNewTab } from "./openNewTab.js"
import { switchToTab } from "./switchToTab.js"
import { closeTab } from "./closeTab.js"
import { getTabCount } from "./getTabCount.js"
import { waitForNewTab } from "./waitForNewTab.js"
import { waitForDownload } from "./waitForDownload.js"
import { downloadFile } from "./downloadFile.js"
import { verifyDownload } from "./verifyDownload.js"
import { getDownloadPath } from "./getDownloadPath.js"
import { waitForFrame } from "./waitForFrame.js"
import { getFrameCount } from "./getFrameCount.js"
import { switchToMainFrame } from "./switchToMainFrame.js"
import { executeInFrame } from "./executeInFrame.js"
import { mockResponse } from "./mockResponse.js"
import { modifyRequest } from "./modifyRequest.js"
import { blockRequests } from "./blockRequests.js"
import { waitForNetworkCall } from "./waitForNetworkCall.js"
import { getNetworkLogs } from "./getNetworkLogs.js"
import { setGeolocation } from "./setGeolocation.js"
import { grantPermissions } from "./grantPermissions.js"
import { setAuthState } from "./setAuthState.js"
import { saveAuthState } from "./saveAuthState.js"
import { loadAuthState } from "./loadAuthState.js"
import { selectText } from "./selectText.js"
import { copyToClipboard } from "./copyToClipboard.js"
import { pasteFromClipboard } from "./pasteFromClipboard.js"
import { pressKeySequence } from "./pressKeySequence.js"
import { mouseWheel } from "./mouseWheel.js"
import { tap } from "./tap.js"
import { swipe } from "./swipe.js"
import { pinch } from "./pinch.js"
import { rotate } from "./rotate.js"
import { touchStart } from "./touchStart.js"
import { touchMove } from "./touchMove.js"
import { touchEnd } from "./touchEnd.js"
import { generatePDF } from "./generatePDF.js"
import { printPage } from "./printPage.js"
import { setPrintOptions } from "./setPrintOptions.js"
import { getElementBounds } from "./getElementBounds.js"
import { isElementInViewport } from "./isElementInViewport.js"
import { getComputedStyle } from "./getComputedStyle.js"
import { executeJavaScript } from "./executeJavaScript.js"
import { evaluateOnElement } from "./evaluateOnElement.js"
import { pierceSelector } from "./pierceSelector.js"
import { shadowRoot } from "./shadowRoot.js"
import { queryShadowDOM } from "./queryShadowDOM.js"
import { waitForWebSocket } from "./waitForWebSocket.js"
import { sendWebSocketMessage } from "./sendWebSocketMessage.js"
import { closeWebSocket } from "./closeWebSocket.js"
import { createContext } from "./createContext.js"
import { switchContext } from "./switchContext.js"
import { closeContext } from "./closeContext.js"
import { setContextOptions } from "./setContextOptions.js"
import { waitForConsoleMessage } from "./waitForConsoleMessage.js"
import { waitForPageCrash } from "./waitForPageCrash.js"
import { waitForFileChooser } from "./waitForFileChooser.js"

// Add imports for the new standard blocks
import { goto } from "./goto.js"
import { click } from "./click.js"
import { fill } from "./fill.js"
import { type } from "./typing.js"
import { expectTitle } from "./expectTitle.js"
import { expectVisible } from "./expectVisible.js"
import { expectHidden } from "./expectHidden.js"
import { expectText } from "./expectText.js"
import { expectUrl } from "./expectUrl.js"
import { screenshot } from "./screenshot.js"
import { wait } from "./wait.js"
import { waitForSelector } from "./waitForSelector.js"
import { waitForLoadState } from "./waitForLoadState.js"
import { waitForResponse } from "./waitForResponse.js"
import { waitForRequest } from "./waitForRequest.js"

// Block registry with all functions
export const blockRegistry: Record<string, BlockFunction> = {
  // Standard Playwright blocks
  goto,
  click,
  fill,
  type,
  expectTitle,
  expectVisible,
  expectHidden,
  expectText,
  expectUrl,
  screenshot,
  wait,
  waitForSelector,
  waitForLoadState,
  waitForResponse,
  waitForRequest,

  // Existing blocks
  navigateToPage,
  verifyPageTitle,
  waitForElement,
  clickLoginButton,
  clickLogoutButton,
  clickCreateUserButton,
  clickSaveSettingsButton,
  clickGenericButton,
  typeInInput,
  fillSearchInput,
  navigateToSettings,
  takeScreenshot,
  // Remove executeCustomBlock from here since it needs special handling

  // Multi-Tab Management
  openNewTab,
  switchToTab,
  closeTab,
  getTabCount,
  waitForNewTab,

  // File Downloads
  waitForDownload,
  downloadFile,
  verifyDownload,
  getDownloadPath,

  // Enhanced Frame Handling
  waitForFrame,
  getFrameCount,
  switchToMainFrame,
  executeInFrame,

  // Advanced Network
  mockResponse,
  modifyRequest,
  blockRequests,
  waitForNetworkCall,
  getNetworkLogs,

  // Authentication & Permissions
  setGeolocation,
  grantPermissions,
  setAuthState,
  saveAuthState,
  loadAuthState,

  // Advanced Input Methods
  selectText,
  copyToClipboard,
  pasteFromClipboard,
  pressKeySequence,
  mouseWheel,

  // Mobile & Touch Gestures
  tap,
  swipe,
  pinch,
  rotate,
  touchStart,
  touchMove,
  touchEnd,

  // PDF & Printing
  generatePDF,
  printPage,
  setPrintOptions,

  // Advanced Element Operations
  getElementBounds,
  isElementInViewport,
  getComputedStyle,
  executeJavaScript,
  evaluateOnElement,

  // Shadow DOM
  pierceSelector,
  shadowRoot,
  queryShadowDOM,

  // WebSocket Testing
  waitForWebSocket,
  sendWebSocketMessage,
  closeWebSocket,

  // Browser Context Management
  createContext,
  switchContext,
  closeContext,
  setContextOptions,

  // Advanced Waiting
  waitForConsoleMessage,
  waitForPageCrash,
  waitForFileChooser,
}

// Export executeCustomBlock separately for special handling
export { executeCustomBlock }

// Helper function to validate required parameters
export function validateParameters(parameters: BlockParameters, required: string[] = []): void {
  const missing = required.filter((param) => !parameters[param] || String(parameters[param]).trim() === "")
  if (missing.length > 0) {
    throw new Error(`Missing required parameters: ${missing.join(", ")}`)
  }
}
