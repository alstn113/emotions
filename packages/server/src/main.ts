import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { Logger } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';
import helmet from 'helmet';
import { AppModule } from '~/app.module';
import { setupSwagger } from '~/utils';
import { SocketIoAdapter } from './adapter';

const bootstrap = async () => {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const port = configService.get<number>('port');
  const loggger = new Logger('Main');

  app.use(helmet());
  app.use(cookieParser());
  app.enableCors({
    origin: configService.get<string>('client'),
    credentials: true,
  });
  app.useWebSocketAdapter(new SocketIoAdapter(app));

  setupSwagger(app);
  await app.listen(port);
  loggger.verbose(`Server running on port ${port}`);
};

bootstrap();
