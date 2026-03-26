#!/bin/bash

# Deployment Quick Start

echo "🚀 Setting up SimuClinik for deployment..."

# Check if .env exists
if [ ! -f .env ]; then
    echo "❌ .env file not found!"
    echo "1. Copy: cp .env.example .env"
    echo "2. Edit: Add your GEMINI_API_KEY"
    exit 1
fi

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Check if API key is set
if grep -q "your_api_key_here" .env; then
    echo "⚠️  WARNING: API key still says 'your_api_key_here'"
    echo "Please edit .env with your actual Gemini API key"
    exit 1
fi

echo "✅ Setup complete!"
echo ""
echo "To start server:"
echo "  npm start"
echo ""
echo "Server will run at: http://localhost:3000"
