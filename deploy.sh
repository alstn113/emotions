#! /bin/bash
git pull
pnpm install
./scripts/deploy-client.sh
./scripts/deploy-server.sh