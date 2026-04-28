#!/bin/bash
set -Eeuo pipefail

COZE_WORKSPACE_PATH="${COZE_WORKSPACE_PATH:-$(pwd)}"

cd "${COZE_WORKSPACE_PATH}"

echo "Installing dependencies..."
pnpm install --prefer-frozen-lockfile --prefer-offline --loglevel debug --reporter=append-only

echo "Building frontend with Vite..."
pnpm vite build

echo "Copying admin files to dist..."
mkdir -p dist/admin
cp -r admin/* dist/admin/

echo "Copying article detail page..."
cp src/article.html dist/

echo "Bundling server with tsup..."
pnpm tsup server/server.ts --format cjs --platform node --target node20 --outDir dist-server --no-splitting --no-minify --external vite

echo "Build completed successfully!"
