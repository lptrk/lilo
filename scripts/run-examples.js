#!/usr/bin/env node

import { execSync } from "child_process"
import chalk from "chalk"
import fs from "fs"

const workflows = [
  {
    name: "Simple Example",
    file: "./workflows/simple-example.json",
    description: "Basic website testing",
  },
  {
    name: "Chaining Example",
    file: "./workflows/example-with-chaining.json",
    description: "Workflow chaining demonstration",
  },
  {
    name: "Comprehensive Example",
    file: "./workflows/comprehensive-example.json",
    description: "Full feature demonstration",
  },
]

console.log(chalk.blue("🎯 Running Lilo Test Examples...\n"))

for (const workflow of workflows) {
  if (!fs.existsSync(workflow.file)) {
    console.log(chalk.yellow(`⚠️  Skipping ${workflow.name}: File not found (${workflow.file})`))
    continue
  }

  console.log(chalk.cyan(`\n▶️  Running: ${workflow.name}`))
  console.log(chalk.gray(`   ${workflow.description}`))
  console.log(chalk.gray(`   File: ${workflow.file}\n`))

  try {
    execSync(`node --loader ts-node/esm run-workflow.ts ${workflow.file}`, {
      stdio: "inherit",
      env: { ...process.env, HEADLESS: "true" },
    })
    console.log(chalk.green(`✅ ${workflow.name} completed successfully\n`))
  } catch (error) {
    console.log(chalk.red(`❌ ${workflow.name} failed\n`))
  }
}

console.log(chalk.blue("🏁 All examples completed!"))
