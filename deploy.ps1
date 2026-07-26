# =================================================================
# Deploy Script for Bhanu Srikar Sai's Portfolio
# Target URL: https://bhanusrikarsai.github.io/portfolio
# =================================================================

Write-Host "🔨 Building production assets with Vite..." -ForegroundColor Cyan
npm run build

Write-Host "📦 Syncing root and dist assets..." -ForegroundColor Cyan
Copy-Item "public\bhanu.png" -Destination "bhanu.png" -Force
New-Item -ItemType File -Path ".nojekyll" -Force

Write-Host "🚀 Committing and pushing to main branch..." -ForegroundColor Cyan
git add .
git commit -m "Deploy Bhanu Srikar Sai Portfolio with Certifications & Suited Profile"
git push origin main --force

Write-Host "✨ Portfolio successfully pushed!" -ForegroundColor Green
Write-Host "🌐 Live URL: https://bhanusrikarsai.github.io/portfolio" -ForegroundColor Yellow
