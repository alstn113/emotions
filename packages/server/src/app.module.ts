// nest config
import { Module, ValidationPipe } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { EnvConfig, AuthConfig, JwtConfig } from './config';
import { PrismaModule } from './prisma/prisma.module';

// providers
import { APP_PIPE } from '@nestjs/core';

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
  ],
})
export class AppModule {}
