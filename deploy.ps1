# =================================================================
# Deploy Script for Bhanu Srikar Sai's Portfolio
# Target URL: https://bhanusrikarsai.github.io/portfolio
# =================================================================

Write-Host "🔨 Building production assets with Vite..." -ForegroundColor Cyan
npx vite build

Write-Host "📦 Initializing Git repository..." -ForegroundColor Cyan
if (-not (Test-Path ".git")) {
    git init
    git branch -M main
    git remote add origin https://github.com/bhanusrikarsai/portfolio.git
}

Write-Host "🚀 Committing and pushing portfolio files to GitHub..." -ForegroundColor Cyan
git add .
git commit -m "Deploy Bhanu Srikar Sai Portfolio to GitHub Pages"
git push -u origin main --force

Write-Host "✨ Portfolio successfully pushed!" -ForegroundColor Green
Write-Host "🌐 Your live URL will be: https://bhanusrikarsai.github.io/portfolio" -ForegroundColor Yellow
Write-Host "👉 Enable GitHub Pages in repo settings: https://github.com/bhanusrikarsai/portfolio/settings/pages" -ForegroundColor Magenta
