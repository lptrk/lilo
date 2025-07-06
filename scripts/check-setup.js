#!/usr/bin/env node

import fs from "fs"
import chalk from "chalk"
import { execSync } from "child_process"

let hasErrors = false

console.log(chalk.blue("🔍 Checking setup..."))

// Check if TypeScript is compiled
if (!fs.existsSync("dist") || fs.readdirSync("dist").length === 0) {
  console.log(chalk.yellow("⚠️  TypeScript not compiled, compiling now..."))
  try {
    execSync("npx tsc", { stdio: "inherit" })
    console.log(chalk.green("✅ TypeScript compiled"))
  } catch (error) {
    console.log(chalk.yellow("⚠️  TypeScript compilation failed, continuing with ts-node..."))
  }
}

// Check if Playwright browsers are installed
try {
  execSync("npx playwright --version", { stdio: "pipe" })
  console.log(chalk.green("✅ Playwright is installed"))
} catch (error) {
  console.log(chalk.red("❌ Playwright not found"))
  hasErrors = true
}

// Check required directories
const requiredDirs = ["screenshots", "workflows", "test-files"]
requiredDirs.forEach((dir) => {
  if (!fs.existsSync(dir)) {
    console.log(chalk.yellow(`⚠️  Creating missing directory: ${dir}`))
    fs.mkdirSync(dir, { recursive: true })
  }
})

// Check if workflow files exist
const workflowFiles = [
  "workflows/simple-example.json",
  "workflows/comprehensive-example.json",
  "workflows/example-with-chaining.json",
]

let missingWorkflows = 0
workflowFiles.forEach((file) => {
  if (!fs.existsSync(file)) {
    console.log(chalk.yellow(`⚠️  Missing workflow: ${file}`))
    missingWorkflows++
  }
})

if (missingWorkflows > 0) {
  console.log(chalk.yellow(`⚠️  ${missingWorkflows} workflow files missing. Run 'npm run setup' to create them.`))
}

if (hasErrors) {
  console.log(chalk.red('\n❌ Setup check failed. Run "npm run setup:full" to fix issues.'))
  process.exit(1)
} else {
  console.log(chalk.green("\n✅ Setup check passed!"))
}
