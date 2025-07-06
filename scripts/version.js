#!/usr/bin/env node

import fs from "fs"
import chalk from "chalk"

const packageJson = JSON.parse(fs.readFileSync("package.json", "utf8"))

console.log(chalk.blue("🎭 Lilo Playwright Test Runner"))
console.log(chalk.white(`Version: ${packageJson.version}`))
console.log(chalk.gray(`Node.js: ${process.version}`))

try {
  const { execSync } = await import("child_process")
  const playwrightVersion = execSync("npx playwright --version", { encoding: "utf8" }).trim()
  console.log(chalk.gray(`Playwright: ${playwrightVersion}`))
} catch {
  console.log(chalk.yellow("Playwright: Not installed"))
}

console.log(chalk.green("\n🚀 Ready to run tests!"))
console.log(chalk.white("Usage: npm run run <workflow-file.json>"))
