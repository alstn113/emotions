#! /bin/bash

pnpm install
pnpm prisma:generate

./deploy-client.sh
./deploy-server.sh
