#!/bin/bash
# ============================================================
# CCC Gateway — DigitalOcean Server Setup
# Run as root on a fresh Ubuntu 22.04 droplet
# ============================================================
set -e

echo "==> Updating packages..."
apt-get update -y && apt-get upgrade -y

echo "==> Installing Node.js 20 LTS..."
curl -fsSL https://deb.nodesource.com/setup_20.x | bash -
apt-get install -y nodejs

echo "==> Installing pnpm..."
npm install -g pnpm@9

echo "==> Installing pm2..."
npm install -g pm2

echo "==> Installing nginx + certbot..."
apt-get install -y nginx certbot python3-certbot-nginx git

echo "==> Creating app user..."
useradd -m -s /bin/bash ccc 2>/dev/null || true
usermod -aG sudo ccc

echo "==> Done. Node: $(node -v), pnpm: $(pnpm -v), pm2: $(pm2 -v)"
echo ""
echo "Next: clone repo as root or ccc user, then run deploy.sh"
