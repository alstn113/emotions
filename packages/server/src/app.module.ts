// nest config
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { EnvConfig, AuthConfig, JwtConfig } from './config';
import { PrismaModule } from './prisma/prisma.module';
import { JwtModule } from '@nestjs/jwt';
import { AppController } from './app.controller';
import { AppService } from './app.service';

// middlewares
import { JwtMiddleware } from './middlewares';

// providers
import { APP_FILTER, APP_GUARD } from '@nestjs/core';
import { AppErrorExceptionFilter } from './common/filter';
import { JwtGuard } from './common/guards';

// main modules
import {
  AuthModule,
  UsersModule,
  EventsModule,
  RoomsModule,
  PostsModule,
  CommentsModule,
  TagsModule,
} from './modules';

// provider modules
import { S3Module } from './providers';

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
    EventsModule,
    RoomsModule,
    PostsModule,
    CommentsModule,
    TagsModule,
    // provider modules
    S3Module,
  ],
  controllers: [AppController],
  providers: [
    {
      provide: APP_FILTER,
      useClass: AppErrorExceptionFilter,
    },
    AppService,
    {
      provide: APP_GUARD,
      useClass: JwtGuard,
    },
  ],
})
export class AppModule implements NestModule {
  configure(cunsumer: MiddlewareConsumer) {
    cunsumer.apply(JwtMiddleware).forRoutes('*');
  }
}
