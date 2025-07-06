#!/bin/bash

echo "🎯 Running Lilo Test Examples..."

echo ""
echo "1️⃣ Running basic example with chaining..."
node --loader ts-node/esm run-workflow.ts ./workflows/example-with-chaining.json

echo ""
echo "2️⃣ Running comprehensive example..."
node --loader ts-node/esm run-workflow.ts ./workflows/comprehensive-example.json

echo ""
echo "✅ All examples completed!"
