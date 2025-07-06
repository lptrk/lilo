#!/usr/bin/env node

import fs from "fs"
import chalk from "chalk"
import { createInterface } from "readline"

const rl = createInterface({
  input: process.stdin,
  output: process.stdout,
})

function question(prompt) {
  return new Promise((resolve) => {
    rl.question(prompt, resolve)
  })
}

async function createWorkflow() {
  console.log(chalk.blue("🎯 Workflow Creator\n"))

  const name = await question("Workflow name: ")
  const description = await question("Description (optional): ")
  const baseUrl = await question("Base URL (e.g., https://example.com): ")

  console.log(chalk.yellow("\n📋 Available blocks:"))
  console.log("  goto, click, fill, type, expectVisible, expectText, screenshot, wait")
  console.log("  (See documentation for full list)\n")

  const workflow = {
    baseUrl: baseUrl || "http://localhost:3000",
    workflows: {
      [name]: {
        name: name,
        description: description || `Test workflow: ${name}`,
        workflow: [
          {
            block: "goto",
            parameters: {
              url: "/",
            },
          },
          {
            block: "expectTitle",
            parameters: {
              title: "Your App Title",
            },
          },
          {
            block: "screenshot",
            parameters: {
              path: `screenshots/${name}-result.png`,
            },
          },
        ],
      },
    },
    mainWorkflow: name,
  }

  const filename = `workflows/${name.toLowerCase().replace(/\s+/g, "-")}.json`

  if (fs.existsSync(filename)) {
    const overwrite = await question(`File ${filename} exists. Overwrite? (y/N): `)
    if (overwrite.toLowerCase() !== "y") {
      console.log(chalk.yellow("❌ Cancelled"))
      rl.close()
      return
    }
  }

  fs.writeFileSync(filename, JSON.stringify(workflow, null, 2))

  console.log(chalk.green(`\n✅ Workflow created: ${filename}`))
  console.log(chalk.white(`\nTo run: npm run test ${filename}`))
  console.log(chalk.white(`Edit the file to customize your test steps.`))

  rl.close()
}

createWorkflow().catch(console.error)
