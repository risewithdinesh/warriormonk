#!/bin/bash
# ================================================
# Warrior Monk — GitHub Push Script
# Usage: ./push-to-github.sh YOUR_GITHUB_TOKEN
# ================================================

TOKEN="$1"
REPO="risewithdinesh/warriormonk"

if [ -z "$TOKEN" ]; then
  echo "❌ Error: Please provide your GitHub token"
  echo "Usage: ./push-to-github.sh ghp_yourTokenHere"
  exit 1
fi

echo "🚀 Pushing Warrior Monk Store to GitHub..."

# Init git
git init
git checkout -b main 2>/dev/null || git checkout main

# Configure remote with token
git remote remove origin 2>/dev/null || true
git remote add origin "https://${TOKEN}@github.com/${REPO}.git"

# Stage and commit
git add .
git commit -m "feat: Warrior Monk digital store — Razorpay integration ready"

# Push
git push -u origin main --force

if [ $? -eq 0 ]; then
  echo ""
  echo "✅ Successfully pushed to GitHub!"
  echo "🔗 Repo: https://github.com/${REPO}"
  echo ""
  echo "Next: Go to https://vercel.com/new → Import this repo → Deploy!"
else
  echo "❌ Push failed. Check your token and try again."
fi
