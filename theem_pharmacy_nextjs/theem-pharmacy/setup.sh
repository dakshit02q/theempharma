#!/bin/bash
# Quick Start Script for Theem Pharmacy Next.js Project

echo "🚀 Theem Pharmacy Project Setup"
echo "================================"
echo ""

# Check Node.js
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js 18+ first."
    exit 1
fi

echo "✓ Node.js version: $(node --version)"
echo ""

# Check if .env.local exists
if [ ! -f ".env.local" ]; then
    echo "📝 Creating .env.local from template..."
    cp .env.example .env.local
    echo "⚠️  Please update .env.local with your database credentials"
    echo ""
fi

# Install dependencies
echo "📦 Installing dependencies..."
npm install

echo ""
echo "🗄️  Database Setup"
echo "===================="
echo ""
echo "To complete database setup, run these commands:"
echo ""
echo "1. Generate migrations:"
echo "   npm run db:generate"
echo ""
echo "2. Apply migrations:"
echo "   npm run db:push"
echo ""
echo "3. Seed sample data:"
echo "   npm run db:seed"
echo ""
echo "4. Start development server:"
echo "   npm run dev"
echo ""
echo "Open http://localhost:3000 in your browser"
echo ""
echo "✅ Setup complete!"
