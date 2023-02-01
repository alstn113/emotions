import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from '../auth/auth.service';
import { UsersRepository } from '../users/users.repository';
import { UsersService } from '../users/users.service';
import { RoomGateway, RoomGatewayService } from './room';
@Module({
  imports: [JwtModule.register({})],
  providers: [
    RoomGateway,
    RoomGatewayService,
    AuthService,
    UsersService,
    UsersRepository,
  ],
})
export class EventsModule {}
