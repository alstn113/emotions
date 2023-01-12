import { Injectable, Logger } from '@nestjs/common';
import { Server, Socket } from 'socket.io';
import { JoinRoomDto, LeaveRoomDto, RoomMessageDto } from '../dto';

@Injectable()
export class RoomGatewayService {
  private server: Server;
  private logger = new Logger('RoomGateway');

  /** Default Setting */

  onAfterInit(server: Server) {
    this.server = server;
    this.logger.verbose('Initialized RoomGateway');
  }

  async onConnection(client: Socket) {
    return;
  }

  onDisconnect(client: Socket) {
    return;
  }

  /** Socket Chat */

  async onJoinRoom(client: Socket, dto: JoinRoomDto) {
    return;
  }

  onLeaveRoom(client: Socket, dto: LeaveRoomDto) {
    return;
  }

  onSendMessage(client: Socket, dto: RoomMessageDto) {
    return;
  }
}
