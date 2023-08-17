FROM node:18-alpine as base

RUN npm i -g pnpm

FROM base AS dependecies

WORKDIR /app
COPY package.json pnpm-lock.yaml ./
RUN pnpm install

FROM base AS build

WORKDIR /app
COPY . .
COPY --from=dependecies /app/node_modules ./node_modules
RUN pnpm build
# 필요없는 devDependecies 제거
RUN pnpm prune --prod

FROM base AS deploy

WORKDIR /app
COPY --from=build /app/dist ./dist
COPY --from=build /app/node_modules ./node_modules

CMD ["pnpm", "start"]