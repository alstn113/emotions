#!/bin/bash
cd packages/server
pnpm build
pnpm start:pm2
cd ../..