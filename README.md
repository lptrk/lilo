# Lilo

A powerful TypeScript-based Playwright test automation runner - **both CLI tool and Library**.

## 🎯 Dual Purpose

### 📦 **As Library** (for integration into other projects)
```bash
  npm install lilo
```

```typescript
import { TestRunner, runWorkflow, type WorkflowConfig } from 'lilo'

// Quick usage
const result = await runWorkflow('./workflow.json')

// Advanced usage with callbacks
const runner = new TestRunner({
  headless: false,
  onStepComplete: (step) => console.log(`✅ ${step.blockId}`),
  onProgress: (progress) => console.log(`${progress.current}/${progress.total}`)
})

await runner.initialize()
const result = await runner.runWorkflow(workflowConfig)
await runner.cleanup()
```

### 🖥️ **As CLI** (standalone usage)
```bash

# Install globally
npm install -g lilo

# Run workflows
lilo ./workflow.json
HEADLESS=false lilo ./workflow.json
DEBUG=true lilo ./workflow.json
```

## 🚀 Quick Start

### Library Usage
```typescript
import { runWorkflow } from 'lilo'

const workflowConfig = {
  baseUrl: "https://example.com",
  workflows: {
    test: {
      name: "Simple Test",
      workflow: [
        { block: "goto", parameters: { url: "/" } },
        { block: "expectTitle", parameters: { title": "Example" } }
      ]
    }
  },
  "mainWorkflow": "test"
}

const result = await runWorkflow(workflowConfig)
console.log(result.success ? '✅ Passed' : '❌ Failed')
```

### CLI Usage
```bash

# Create workflow.json
echo '{
  "baseUrl": "https://example.com",
  "workflows": {
    "test": {
      "name": "Simple Test", 
      "workflow": [
        { "block": "goto", "parameters": { "url": "/" } },
        { "block": "expectTitle", "parameters": { "title": "Example" } }
      ]
    }
  },
  "mainWorkflow": "test"
}' > workflow.json

# Run it
lilo workflow.json
```

## 📋 Available Commands

### CLI Commands
```bash
lilo <workflow.json>              # Run workflow
HEADLESS=false lilo <workflow>    # Visible browser
DEBUG=true lilo <workflow>        # Debug mode
```

### Library API
```typescript
// Factory functions
createTestRunner(options?)        // Create runner instance
runWorkflow(config, options?)     // One-shot execution

// TestRunner class
new TestRunner(options)
  .initialize()                   // Setup browser
  .runWorkflow(config)           // Execute workflow
  .cleanup()                     // Close browser
  .takeScreenshot(filename?)     // Utility methods
  .getCurrentUrl()
  .getPageTitle()
  .getStepResults()
```

## 🧩 50+ Test Blocks Available

- **Navigation**: `goto`, `goBack`, `reload`
- **Interactions**: `click`, `fill`, `type`, `hover`
- **Assertions**: `expectVisible`, `expectText`, `expectTitle`
- **Advanced**: `screenshot`, `measurePerformance`, `mockResponse`
- **Mobile**: `tap`, `swipe`, `pinch`
- **Files**: `downloadFile`, `uploadFile`
- **Network**: `interceptRequest`, `waitForResponse`

## 🔧 Integration Examples

### React/Next.js
```typescript
import { useEffect, useState } from 'react'
import { runWorkflow } from 'lilo'

function TestRunner({ workflowConfig }) {
  const [result, setResult] = useState(null)
  
  const runTest = async () => {
    const result = await runWorkflow(workflowConfig, {
      headless: true,
      onProgress: (progress) => setProgress(progress)
    })
    setResult(result)
  }
  
  return <button onClick={runTest}>Run Test</button>
}
```

### Node.js Script
```typescript
import { TestRunner } from 'lilo'

const runner = new TestRunner({
  onStepComplete: (step) => {
    console.log(`${step.status}: ${step.blockId} (${step.duration}ms)`)
  }
})

await runner.initialize()
const result = await runner.runWorkflow('./my-workflow.json')
console.log(`Test ${result.success ? 'passed' : 'failed'}`)
await runner.cleanup()
```

### CI/CD Pipeline
```yaml
- name: Run E2E Tests
  run: |
    npm install lilo
    lilo ./workflows/production-tests.json
```

## 📊 Perfect for

✅ **GUI Integration** - Import as library into your test management tools  
✅ **CI/CD Pipelines** - Use CLI for automated testing  
✅ **Local Development** - Quick workflow execution  
✅ **Custom Tooling** - Build your own test runners on top  

## 🔄 Workflow JSON Format

```json
{
  "baseUrl": "https://example.com",
  "workflows": {
    "myTest": {
      "name": "My Test",
      "workflow": [
        { "block": "goto", "parameters": { "url": "/" } },
        { "block": "expectTitle", "parameters": { "title": "My App" } }
      ]
    }
  },
  "mainWorkflow": "myTest"
}
```

---

**One tool, two ways to use it.** 🎯
