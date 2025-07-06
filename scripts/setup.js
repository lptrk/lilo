#!/usr/bin/env node

import fs from "fs"
import path from "path"
import chalk from "chalk"

console.log(chalk.blue("🚀 Setting up Lilo Playwright Test Runner..."))

// Check Node.js version
const nodeVersion = process.version
const majorVersion = Number.parseInt(nodeVersion.slice(1).split(".")[0])
if (majorVersion < 18) {
  console.error(chalk.red(`❌ Node.js ${nodeVersion} is not supported. Please use Node.js 18 or higher.`))
  process.exit(1)
}

console.log(chalk.green(`✅ Node.js ${nodeVersion} is supported`))

// Create necessary directories
const directories = ["screenshots", "test-files", "workflows", "logs"]
directories.forEach((dir) => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true })
    console.log(chalk.green(`📁 Created directory: ${dir}`))
  }
})

// Create sample test file
const sampleFilePath = path.join("test-files", "sample.txt")
if (!fs.existsSync(sampleFilePath)) {
  fs.writeFileSync(sampleFilePath, "This is a sample test file for upload testing.")
  console.log(chalk.green("📝 Created sample test file"))
}

// Create .env.example file
const envExample = `# Lilo Runner Environment Variables
HEADLESS=true
DEBUG=false
TIMEOUT=30000
BROWSER=chromium
`

if (!fs.existsSync(".env.example")) {
  fs.writeFileSync(".env.example", envExample)
  console.log(chalk.green("📄 Created .env.example file"))
}

// Create .gitignore if it doesn't exist
const gitignoreContent = `# Dependencies
node_modules/

# Build output
dist/
*.tsbuildinfo

# Test artifacts
screenshots/
test-results/
playwright-report/
logs/

# Environment variables
.env
.env.local

# OS generated files
.DS_Store
Thumbs.db

# IDE files
.vscode/
.idea/
*.swp
*.swo
`

if (!fs.existsSync(".gitignore")) {
  fs.writeFileSync(".gitignore", gitignoreContent)
  console.log(chalk.green("📄 Created .gitignore file"))
}

console.log(chalk.green("✅ Runner setup completed!"))
console.log(chalk.yellow("\n📋 Next steps:"))
console.log(chalk.white("  npm run install:browsers  # Install Playwright browsers"))
console.log(chalk.white("  npm run build            # Build TypeScript"))
console.log(chalk.white("  npm start                # Run first test"))
console.log(chalk.gray("\n💡 Place your workflow JSON files in the ./workflows/ directory"))
