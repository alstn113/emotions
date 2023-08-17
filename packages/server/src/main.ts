import {
  ClassSerializerInterceptor,
  Logger,
  ValidationPipe,
} from '@nestjs/common';
import { NestFactory, Reflector } from '@nestjs/core';

import * as compression from 'compression';
import * as cookieParser from 'cookie-parser';
import helmet from 'helmet';

import { AppModule } from './app.module';
import { createDocumnet } from './lib/swagger';

const bootstrap = async () => {
  const app = await NestFactory.create(AppModule);

  app.use(helmet()); // 보안 관련 헤더를 추가합니다.
  app.use(cookieParser()); // 쿠키를 파싱합니다.
  app.use(compression()); // 응답을 압축합니다.

  //TODO: prefix 설정
  // app.setGlobalPrefix(AppModule.API_PREFIX);

  app.enableCors({
    origin: AppModule.ALLOWLIST,
    credentials: true,
  });

  // pipe는 요청을 가공, 검증
  // 요청 객체 역직렬화 json -> class
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // 유효성 검사에서 정의되지 않은 속성을 자동으로 제거합니다.
      transform: true, // 요청 데이터를 지정된 타입으로 자동 변환합니다.
    }),
  );

  // intercept는 응답을 가공, 변경
  // 응답 객체 직렬화 class -> json
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));

  createDocumnet(app);

  app.enableShutdownHooks();
  await app.listen(AppModule.PORT);

  return AppModule.PORT;
};

bootstrap().then((port) => {
  Logger.log(`Application running on port: ${port}`, 'Main');
});
