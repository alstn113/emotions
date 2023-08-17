#! /bin/bash

pnpm install
pnpm prisma:generate

./scripts/deploy-web.sh
./scripts/deploy-server.sh
