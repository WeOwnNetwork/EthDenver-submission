#!/bin/bash
# ============================================================
# CCC Gateway — Deploy / Redeploy Script
# Run from the repo root on the droplet
# Usage: bash apps/gateway/scripts/deploy.sh
# ============================================================
set -e

REPO_DIR="/opt/ccc"
BRANCH="roman/infra-deploy"

echo "==> Pulling latest from $BRANCH..."
cd "$REPO_DIR"
git fetch origin
git checkout "$BRANCH"
git pull origin "$BRANCH"

echo "==> Installing dependencies..."
pnpm install --frozen-lockfile

echo "==> Building gateway..."
pnpm --filter gateway build

echo "==> Restarting gateway with pm2..."
pm2 reload ecosystem.config.cjs --only ccc-gateway || pm2 start ecosystem.config.cjs --only ccc-gateway

echo "==> Gateway status:"
pm2 status ccc-gateway

echo ""
echo "✅ Deploy complete — https://ethdenver2026.payless.tax/health"
