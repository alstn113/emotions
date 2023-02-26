#! /bin/bash

pnpm install
pnpm prisma:generate

./scripts/deploy-client.sh
./scripts/deploy-server.sh
