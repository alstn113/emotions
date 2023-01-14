import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from '../auth/auth.service';
import { RoomGateway, RoomGatewayService } from './room';
@Module({
  imports: [JwtModule.register({})],
  providers: [RoomGateway, RoomGatewayService, AuthService],
})
export class EventsModule {}
