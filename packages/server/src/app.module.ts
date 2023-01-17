// nest config
import { MiddlewareConsumer, Module, NestModule, ValidationPipe } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { EnvConfig, AuthConfig, JwtConfig } from './config';
import { PrismaModule } from './prisma/prisma.module';
import { JwtAuthMiddleware } from './middlewares';
import { JwtAuthGuard } from './common/guards';

// providers
import { APP_GUARD, APP_PIPE } from '@nestjs/core';

// main modules
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { EventsModule } from './modules/events/events.module';
import { RoomsModule } from './modules/rooms/rooms.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [EnvConfig, AuthConfig, JwtConfig],
    }),
    PrismaModule,
    // main modules
    AuthModule,
    UsersModule,
    EventsModule,
    RoomsModule,
  ],

  providers: [
    {
      provide: APP_PIPE,
      useClass: ValidationPipe,
    },
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class AppModule implements NestModule {
  configure(cunsumer: MiddlewareConsumer) {
    cunsumer.apply(JwtAuthMiddleware).forRoutes('*');
  }
}
