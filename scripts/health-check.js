#!/usr/bin/env node

import { execSync } from "child_process"
import chalk from "chalk"
import fs from "fs"

console.log(chalk.blue("🏥 Running Health Check...\n"))

const checks = [
  {
    name: "Node.js Version",
    check: () => {
      const version = process.version
      const major = Number.parseInt(version.slice(1).split(".")[0])
      return { success: major >= 18, message: `${version} ${major >= 18 ? "(✅ Supported)" : "(❌ Requires 18+)"}` }
    },
  },
  {
    name: "TypeScript Compiler",
    check: () => {
      try {
        execSync("npx tsc --version", { stdio: "pipe" })
        return { success: true, message: "Available" }
      } catch {
        return { success: false, message: "Not found" }
      }
    },
  },
  {
    name: "Playwright Installation",
    check: () => {
      try {
        const version = execSync("npx playwright --version", { encoding: "utf8" }).trim()
        return { success: true, message: version }
      } catch {
        return { success: false, message: "Not installed" }
      }
    },
  },
  {
    name: "Required Directories",
    check: () => {
      const dirs = ["screenshots", "workflows", "test-files"]
      const missing = dirs.filter((dir) => !fs.existsSync(dir))
      return {
        success: missing.length === 0,
        message: missing.length === 0 ? "All present" : `Missing: ${missing.join(", ")}`,
      }
    },
  },
  {
    name: "Workflow Files",
    check: () => {
      const workflows = [
        "workflows/simple-example.json",
        "workflows/comprehensive-example.json",
        "workflows/example-with-chaining.json",
      ]
      const existing = workflows.filter((f) => fs.existsSync(f))
      return {
        success: existing.length > 0,
        message: `${existing.length}/${workflows.length} available`,
      }
    },
  },
]

let allPassed = true

checks.forEach(({ name, check }) => {
  const result = check()
  const status = result.success ? chalk.green("✅") : chalk.red("❌")
  console.log(`${status} ${name}: ${result.message}`)
  if (!result.success) allPassed = false
})

console.log("\n" + chalk.blue("📊 System Information:"))
console.log(`   OS: ${process.platform} ${process.arch}`)
console.log(`   Node.js: ${process.version}`)
console.log(`   npm: ${execSync("npm --version", { encoding: "utf8" }).trim()}`)

if (allPassed) {
  console.log("\n" + chalk.green("🎉 All health checks passed!"))
  console.log(chalk.white("Ready to run tests with: npm start"))
} else {
  console.log("\n" + chalk.red("⚠️  Some health checks failed."))
  console.log(chalk.white("Run: npm run setup:full"))
}
