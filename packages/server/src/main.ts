import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { Logger } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';
import helmet from 'helmet';
import { AppModule } from '~/app.module';
import { SocketIoAdapter } from './adapter';
import { INestApplication } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

const bootstrap = async () => {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const PORT = configService.get<number>('PORT');
  const ALLOWLIST = configService.get<string[]>('ALLOWLIST');

  app.use(helmet());
  app.use(cookieParser());
  app.enableCors({
    origin: ALLOWLIST,
    credentials: true,
  });
  app.useWebSocketAdapter(new SocketIoAdapter(app));

  createDocumnet(app);
  await app.listen(PORT);
};

const createDocumnet = (app: INestApplication): void => {
  const config = new DocumentBuilder().setTitle('iChat').setVersion('1.0.0').build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
};

const logger = new Logger('iChat_Main');

bootstrap()
  .then((port) => {
    logger.log(`Server is running on port ${port}`);
  })
  .catch((err) => {
    logger.error(err.message, err);
  });
