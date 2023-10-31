# Emotions 
> (1년간 유지 후 AWS free tier 만료와 함께 사망했습니다( ~2023.10.31 ))

Emotions는 자신의 감정을 마크다운 형식으로 기록할 수 있는 커뮤니티입니다.
또한 글을 시리즈 형식으로 연재할 수도 있습니다.

## `What I Learned`

1. pnpm workspace를 통해서 monorepo를 구성했습니다.

2. 모바일 우선(mobile first) 방식으로 개발해서 UI/UX를 높였습니다.

3. React의 Suspense와 Error-boundary 을 통해서 데이터 로드와 에러 처리를 분리하였습니다. Lazy Load를 이용한 Code Splitting을 통해 성능을 향상시켰습니다.

4. Git Actions를 통해서 배포 자동화를 시켰습니다.

5. Nest.js에서 class-transformer, class-validator, plainToInstance를 통해서 dto를 요청과 응답에서 알맞는 타입의 값을 받을 수 있게 했습니다.

6. 댓글을 2단계까지 구성하였고, 그 이후로는 mention으로 처리하였습니다. 또한 parentId값을 통해서 한 번의 query 요청으로 댓글들을 받아오고, 이후 Map을 통해 group화하는 방식을 사용했습니다.

7. AWS SES(Simple Email Service)를 통해서 댓글이나 답글이 달릴 시, 경우에 따라 Post Author이나 Commenter, Mention User에게 Notification Email을 보냅니다.

## `Sturcture`

- Server: Nest
- Web: React + Vite
- Deploy: AWS EC2 Ubuntu, NGINX, Docker, PM2, Git Actions
- DB: Superbase + Postgresql
- ETC: AWS S3, AWS SES, Google Analytics

## `Website Link`

- web: <https://wap-dev.store>
- server: <https://api.wap-dev.store>

## `Project Stack`

- Server

  - Nest
  - Typescript
  - Prisma
  - Swagger
  - Postgresql
  - Passport
  - JWT + Cookie
  - AWS S3, AWS SES
  - PM2

- Web
  - React
  - Typescript
  - React-Router
  - Suspense + Error-boundary
  - Tanstack Query
  - Zustand
  - Emotion
  - Framer-motion
  - React-beautiful-dnd
  - Code-mirror
