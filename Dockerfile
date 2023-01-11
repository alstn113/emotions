FROM node:18-alphine as dependecies

# Path: dockerFile
WORKDIR /app

COPY package.json ./
COPY pnpm-lock.yaml ./

RUN pnpm install

FROM node:18-alphine as build

WORKDIR /app
COPY --from=dependecies /app/node_modules ./node_modules
COPY . .

RUN npx prisma generate
RUN npx prisma migrate deploy
RUN pnpm build


FROM node:18-alphine as deploy

WORKDIR /app

ENV NODE_ENV production

COPY --from=build /app/public ./public
COPY --from=build /app/package.json ./package.json
COPY --from=build /app/.next/stadalone ./
COPY --from=build /app/.next/static ./.next/static

EXPOSE 3000

ENV PORT 3000

CMD ["node", "server.js"]

