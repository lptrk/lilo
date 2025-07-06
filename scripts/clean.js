#!/usr/bin/env node

import fs from "fs"
import path from "path"
import chalk from "chalk"

function deleteDirectory(dirPath) {
  if (fs.existsSync(dirPath)) {
    const files = fs.readdirSync(dirPath)
    files.forEach((file) => {
      const filePath = path.join(dirPath, file)
      if (fs.statSync(filePath).isDirectory()) {
        deleteDirectory(filePath)
      } else {
        fs.unlinkSync(filePath)
      }
    })
    console.log(chalk.green(`🗑️  Cleaned: ${dirPath}`))
  }
}

console.log(chalk.blue("🧹 Cleaning up..."))

// Clean screenshots
deleteDirectory("screenshots")
fs.mkdirSync("screenshots", { recursive: true })

// Clean logs
if (fs.existsSync("logs")) {
  deleteDirectory("logs")
  fs.mkdirSync("logs", { recursive: true })
}

// Clean test results
if (fs.existsSync("test-results")) {
  deleteDirectory("test-results")
}

// Clean playwright reports
if (fs.existsSync("playwright-report")) {
  deleteDirectory("playwright-report")
}

console.log(chalk.green("✅ Cleanup completed!"))
