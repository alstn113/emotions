import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_FILTER, APP_GUARD } from '@nestjs/core';
import { JwtModule } from '@nestjs/jwt';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AppErrorExceptionFilter } from './common/filter';
import { JwtGuard } from './common/guards';
import { EnvConfig, AuthConfig, JwtConfig } from './config';
import { JwtMiddleware } from './middlewares';
import {
  AuthModule,
  UsersModule,
  PostsModule,
  CommentsModule,
  TagsModule,
  SeriesModule,
} from './modules';
import { PrismaModule } from './prisma/prisma.module';
import { S3Module, SESModule } from './providers';

@Module({
  imports: [
    JwtModule.register({}),
    ConfigModule.forRoot({
      isGlobal: true,
      load: [EnvConfig, AuthConfig, JwtConfig],
      cache: true,
    }),
    PrismaModule,
    // main modules
    AuthModule,
    UsersModule,
    PostsModule,
    CommentsModule,
    TagsModule,
    SeriesModule,
    // provider modules
    S3Module,
    SESModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_FILTER,
      useClass: AppErrorExceptionFilter,
    },
    {
      provide: APP_GUARD,
      useClass: JwtGuard,
    },
  ],
})
export class AppModule implements NestModule {
  static PORT: number;
  static API_PREFIX: string;
  static ALLOWLIST: RegExp;
  static FRONTEND_URL: string;

  constructor(private readonly configService: ConfigService) {
    AppModule.PORT = this.configService.get<number>('PORT');
    AppModule.API_PREFIX = this.configService.get<string>('API_PREFIX');
    AppModule.ALLOWLIST = this.configService.get<RegExp>('ALLOWLIST');
    AppModule.FRONTEND_URL = this.configService.get<string>('FRONTEND_URL');
  }

  configure(cunsumer: MiddlewareConsumer) {
    cunsumer.apply(JwtMiddleware).forRoutes('*');
  }
}
