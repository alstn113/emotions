#! /bin/bash

git stash && git pull origin main
pnpm install
pnpm prisma:generate

./deploy-client.sh
./deploy-server.sh
