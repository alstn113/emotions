import { Module } from '@nestjs/common';
import { RoomGateway, RoomGatewayService } from './room';
@Module({
  imports: [],
  providers: [
    // room
    RoomGateway,
    RoomGatewayService,
    // lobby
  ],
})
export class EventsModule {}
