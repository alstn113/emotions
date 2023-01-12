import { Injectable, Logger } from '@nestjs/common';
import { Server, Socket } from 'socket.io';
import { SOCKET_EVENT } from '~/common/constants';
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
    this.logger.verbose(`Client connected: ${client.id}`);
  }

  onDisconnect(client: Socket) {
    this.logger.verbose(`Client disconnected: ${client.id}`);
  }

  /** Socket Chat */

  async onJoinRoom(client: Socket, dto: JoinRoomDto) {
    await client.join(dto.roomId);
    client.to(dto.roomId).emit(SOCKET_EVENT.JOINED_ROOM, {
      message: `${client.id} joined ${dto.roomId}`,
    });
  }

  async onLeaveRoom(client: Socket, dto: LeaveRoomDto) {
    await client.leave(dto.roomId);
    client.to(dto.roomId).emit(SOCKET_EVENT.LEFT_ROOM, {
      message: `${client.id} left ${dto.roomId}`,
    });
  }

  onChatMessage(client: Socket, dto: RoomMessageDto) {
    // send to all users in room
    this.server.to(dto.roomId).emit(SOCKET_EVENT.CHAT_MESSAGE, {
      message: `FROM: ${client.id}: ${dto.message}`,
    });
  }
}
