# Sodiq Yusuff MMA — one-shot deployment script (Windows PowerShell)
# Run this from inside the project folder. It will:
#   1. Init git (if not already)
#   2. Stage all files
#   3. Commit
#   4. Prompt you for the GitHub repo URL
#   5. Push

# Usage: right-click -> "Run with PowerShell"  (or) `powershell -ExecutionPolicy Bypass -File .\deploy.ps1`

Write-Host ""
Write-Host "=== Sodiq Yusuff MMA — Deployment Helper ===" -ForegroundColor Green
Write-Host ""

# Check git is installed
try { git --version | Out-Null } catch {
    Write-Host "ERROR: Git is not installed." -ForegroundColor Red
    Write-Host "Install from: https://git-scm.com/download/win" -ForegroundColor Yellow
    exit 1
}

# Init git if needed
if (-not (Test-Path .git)) {
    Write-Host "[1/5] Initializing git repository..." -ForegroundColor Cyan
    git init -b main
} else {
    Write-Host "[1/5] Git repository already initialized — skipping." -ForegroundColor Cyan
}

# Configure local commit identity if not set
$email = git config user.email
if (-not $email) {
    $userEmail = Read-Host "Your email (for git commits)"
    $userName = Read-Host "Your name (for git commits)"
    git config user.email "$userEmail"
    git config user.name "$userName"
}

Write-Host "[2/5] Staging all files..." -ForegroundColor Cyan
git add .

Write-Host "[3/5] Creating commit..." -ForegroundColor Cyan
$msg = Read-Host "Commit message (press Enter for default)"
if (-not $msg) { $msg = "Sodiq Yusuff MMA website update" }
git commit -m "$msg"

# Check for existing remote
$remote = git remote get-url origin 2>$null
if (-not $remote) {
    Write-Host ""
    Write-Host "You need a GitHub repo. Two options:" -ForegroundColor Yellow
    Write-Host "  A. Create one at https://github.com/new (repo name: sodiq-yusuff-mma, PUBLIC, no README)"
    Write-Host "  B. Use an existing repo"
    Write-Host ""
    $repoUrl = Read-Host "Paste your GitHub repo URL (https://github.com/USERNAME/REPO.git)"
    git remote add origin $repoUrl
    Write-Host "[4/5] Remote added." -ForegroundColor Cyan
} else {
    Write-Host "[4/5] Remote already set: $remote" -ForegroundColor Cyan
}

Write-Host "[5/5] Pushing to GitHub..." -ForegroundColor Cyan
Write-Host "      (If prompted, log in with your GitHub account or a Personal Access Token)" -ForegroundColor Gray
git push -u origin main

Write-Host ""
Write-Host "=== Done! ===" -ForegroundColor Green
Write-Host ""
Write-Host "Next step: go to https://app.netlify.com/start and 'Deploy with GitHub'" -ForegroundColor Yellow
Write-Host "Full instructions in DEPLOY.md"
Write-Host ""
