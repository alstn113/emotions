import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { Logger } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';
import helmet from 'helmet';
import { AppModule } from '~/app.module';
import { SocketIoAdapter } from './adapter';
import { createDocumnet } from './utils';

const bootstrap = async () => {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const PORT = configService.get<number>('PORT');
  const ALLOWLIST = configService.get<string[]>('ALLOWLIST');
  const logger = new Logger('Main');

  app.use(helmet());
  app.use(cookieParser());
  app.enableCors({
    origin: ALLOWLIST,
    credentials: true,
  });
  app.useWebSocketAdapter(new SocketIoAdapter(app));

  createDocumnet(app);
  await app.listen(PORT);

  logger.log(`Server is running on port ${PORT}`);
};

bootstrap();
