#!/usr/bin/env node

import fs from "fs"
import chalk from "chalk"

const docs = `# Lilo Playwright Test Runner

A powerful TypeScript-based Playwright test automation runner that executes workflow JSON files.

## 🚀 Quick Start

\`\`\`bash
npm run setup:full    # Complete setup
npm start            # Run simple test
npm run demo         # Run test with visible browser
\`\`\`

## 📋 Runner Commands

### Setup & Installation
- \`npm run setup:full\` - Complete setup (install everything)
- \`npm run setup\` - Basic setup (directories, files)
- \`npm run install:browsers\` - Install Playwright browsers
- \`npm run setup:check\` - Check if setup is complete

### Running Tests
- \`npm start\` - Quick start with simple example
- \`npm run demo\` - Demo with visible browser
- \`npm run run <workflow.json>\` - Run specific workflow
- \`npm run run:headless <workflow.json>\` - Force headless mode
- \`npm run run:headed <workflow.json>\` - Force visible browser
- \`npm run run:debug <workflow.json>\` - Debug mode (visible + debug output)

### Pre-built Examples
- \`npm run test:simple\` - Run simple example
- \`npm run test:comprehensive\` - Run comprehensive example
- \`npm run test:chaining\` - Run workflow chaining example
- \`npm run test:all\` - Run all examples
- \`npm run test:examples\` - Run examples with detailed output

### Development & Maintenance
- \`npm run build\` - Compile TypeScript
- \`npm run build:watch\` - Compile TypeScript in watch mode
- \`npm run dev <workflow.json>\` - Run with ts-node (development)
- \`npm run type-check\` - Check TypeScript types
- \`npm run lint\` - Lint and fix code
- \`npm run format\` - Format code with Prettier
- \`npm run validate\` - Type check + lint

### Utilities
- \`npm run clean\` - Clean screenshots and logs
- \`npm run clean:screenshots\` - Clean only screenshots
- \`npm run clean:build\` - Clean build output
- \`npm run clean:all\` - Clean everything
- \`npm run health-check\` - System health check
- \`npm run list-blocks\` - List all available test blocks
- \`npm run version\` - Show version information
- \`npm run docs\` - Generate this documentation

## 🎯 Usage Examples

### Run a specific workflow
\`\`\`bash
npm run run ./workflows/my-test.json
\`\`\`

### Run with visible browser for debugging
\`\`\`bash
npm run run:debug ./workflows/my-test.json
\`\`\`

### Run in headless mode (CI/CD)
\`\`\`bash
npm run run:headless ./workflows/my-test.json
\`\`\`

## 🔧 Environment Variables

Set these in your shell or .env file:

- \`HEADLESS=false\` - Show browser window
- \`DEBUG=true\` - Enable debug output
- \`TIMEOUT=30000\` - Set default timeout (ms)
- \`BROWSER=chromium\` - Set browser (chromium/firefox/webkit)

## 📁 Project Structure

\`\`\`
lilo/
├── run-workflow.ts          # Main test runner
├── blocks/                  # Test building blocks
│   ├── index.ts            # Block registry (50+ blocks)
│   └── *.ts                # Individual block implementations
├── utils/                   # Runner utilities
├── workflows/               # Place your JSON workflows here
├── scripts/                 # npm script implementations
├── screenshots/             # Test screenshots (auto-generated)
├── test-files/             # Test assets for upload tests
└── logs/                   # Test execution logs
\`\`\`

## 🧩 Available Test Blocks

The runner supports 50+ test blocks including:

### Navigation
- \`goto\`, \`goBack\`, \`goForward\`, \`reload\`

### Interactions  
- \`click\`, \`fill\`, \`type\`, \`hover\`, \`dragAndDrop\`

### Assertions
- \`expectVisible\`, \`expectText\`, \`expectTitle\`, \`expectUrl\`

### Advanced
- \`screenshot\`, \`waitForSelector\`, \`interceptRequest\`, \`measurePerformance\`

Run \`npm run list-blocks\` for the complete list.

## 🔄 Workflow JSON Format

\`\`\`json
{
  "baseUrl": "https://example.com",
  "workflows": {
    "myTest": {
      "name": "My Test",
      "workflow": [
        {
          "block": "goto",
          "parameters": { "url": "/" }
        },
        {
          "block": "expectTitle", 
          "parameters": { "title": "My App" }
        }
      ]
    }
  },
  "mainWorkflow": "myTest"
}
\`\`\`

## 🚀 Integration

This runner is designed to work with external workflow creators and CI/CD systems:

- Place JSON workflow files in \`./workflows/\`
- Run via npm scripts or direct node execution
- Get structured JSON results for reporting
- Screenshots and logs automatically saved

## 📊 CI/CD Usage

\`\`\`bash
# In your CI pipeline
npm run setup:check
npm run run:headless ./workflows/production-tests.json
\`\`\`

Generated on ${new Date().toISOString()}
`

fs.writeFileSync("DOCS.md", docs)
console.log(chalk.green("📖 Runner documentation generated: DOCS.md"))
