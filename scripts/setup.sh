#!/bin/bash

echo "🚀 Setting up Lilo Playwright Test Runner..."

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js first."
    exit 1
fi

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo "❌ npm is not installed. Please install npm first."
    exit 1
fi

echo "📦 Installing dependencies..."
npm install

echo "🎭 Installing Playwright browsers..."
npx playwright install

echo "📁 Creating necessary directories..."
mkdir -p screenshots
mkdir -p test-files

echo "📝 Creating sample test file..."
echo "This is a sample test file for upload testing." > test-files/sample.txt

echo "🔧 Building TypeScript..."
npm run build

echo "✅ Setup complete!"
echo ""
echo "🎯 To run tests:"
echo "  npm run test                    # Run with default workflow"
echo "  npm run dev                     # Run with ts-node (development)"
echo "  HEADLESS=false npm run test     # Run with visible browser"
echo "  DEBUG=true npm run test         # Run with debug output"
echo ""
echo "📋 Available workflows:"
echo "  ./workflows/example-with-chaining.json"
echo "  ./workflows/comprehensive-example.json"
