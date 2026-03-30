# Quick Start Script for Theem Pharmacy Next.js Project (Windows)

Write-Host "🚀 Theem Pharmacy Project Setup" -ForegroundColor Green
Write-Host "================================" -ForegroundColor Green
Write-Host ""

# Check Node.js
try {
    $nodeVersion = node --version
    Write-Host "✓ Node.js version: $nodeVersion" -ForegroundColor Green
}
catch {
    Write-Host "❌ Node.js is not installed. Please install Node.js 18+ first." -ForegroundColor Red
    exit 1
}

Write-Host ""

# Check if .env.local exists
if (-not (Test-Path ".env.local")) {
    Write-Host "📝 Creating .env.local from template..." -ForegroundColor Yellow
    Copy-Item ".env.example" ".env.local"
    Write-Host "⚠️  Please update .env.local with your database credentials" -ForegroundColor Yellow
    Write-Host ""
}

# Install dependencies
Write-Host "📦 Installing dependencies..." -ForegroundColor Cyan
npm install

Write-Host ""
Write-Host "🗄️  Database Setup" -ForegroundColor Green
Write-Host "===================="  -ForegroundColor Green
Write-Host ""
Write-Host "To complete database setup, run these commands:" -ForegroundColor White
Write-Host ""
Write-Host "1. Generate migrations:" -ForegroundColor Cyan
Write-Host "   npm run db:generate" -ForegroundColor Yellow
Write-Host ""
Write-Host "2. Apply migrations:" -ForegroundColor Cyan
Write-Host "   npm run db:push" -ForegroundColor Yellow
Write-Host ""
Write-Host "3. Seed sample data:" -ForegroundColor Cyan
Write-Host "   npm run db:seed" -ForegroundColor Yellow
Write-Host ""
Write-Host "4. Start development server:" -ForegroundColor Cyan
Write-Host "   npm run dev" -ForegroundColor Yellow
Write-Host ""
Write-Host "Open http://localhost:3000 in your browser" -ForegroundColor White
Write-Host ""
Write-Host "✅ Setup complete!" -ForegroundColor Green
