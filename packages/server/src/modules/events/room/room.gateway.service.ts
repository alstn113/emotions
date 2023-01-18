import { Injectable, Logger } from '@nestjs/common';
import { Server, Socket } from 'socket.io';
import { SOCKET_EVENT } from '~/common/constants';
import { AuthService } from '~/modules/auth/auth.service';
import { parseCookie } from '~/utils/parseCookie';
import { JoinRoomDto, LeaveRoomDto, RoomMessageDto, TypingStatusDto } from '../dto';
import { UsersService } from '~/modules/users/users.service';

@Injectable()
export class RoomGatewayService {
  private server: Server;
  private logger = new Logger('RoomGateway');

  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService,
  ) {}

  /** Default Setting */

  onAfterInit(server: Server) {
    this.server = server;
    this.logger.log('Initialized RoomGateway');
  }

  async onConnection(client: Socket) {
    try {
      const token = parseCookie(client.handshake.headers.cookie, 'access_token');
      const decoded = await this.authService.verifyToken(token);
      const user = await this.usersService.getUserById(decoded.userId);

      // set user data to client
      client.data.uid = user.id;
      client.data.username = user.username;

      this.logger.log(`Client connected: ${client.id}`);
    } catch (error) {
      console.log(error);
      client.disconnect();
    }
  }

  onDisconnect(client: Socket) {
    this.logger.log(`Client disconnected: ${client.id}`);
  }

  /** Socket Chat */

  async onJoinRoom(client: Socket, dto: JoinRoomDto) {
    await client.join(dto.roomId);
    client.to(dto.roomId).emit(SOCKET_EVENT.JOINED_ROOM, {
      uid: `${client.data.uid}`,
      username: `${client.data.username}`,
      message: `joined ${dto.roomId}`,
    });
  }

  async onLeaveRoom(client: Socket, dto: LeaveRoomDto) {
    await client.leave(dto.roomId);
    client.to(dto.roomId).emit(SOCKET_EVENT.LEFT_ROOM, {
      uid: `${client.data.uid}`,
      username: `${client.data.username}`,
      message: `left ${dto.roomId}`,
    });
  }

  onChatMessage(client: Socket, dto: RoomMessageDto) {
    // send to all users in room
    this.server.to(dto.roomId).emit(SOCKET_EVENT.CHAT_MESSAGE, {
      uid: `${client.data.uid}`,
      username: `${client.data.username}`,
      message: `${dto.message}`,
    });
  }

  onTypingStatus(client: Socket, dto: TypingStatusDto) {
    client.to(dto.roomId).emit(SOCKET_EVENT.TYPING_STATUS, {
      uid: `${client.data.uid}`,
      username: `${client.data.username}`,
      isTyping: dto.isTyping,
    });
  }

  onChooseQuestion(client: Socket) {
    client.emit(SOCKET_EVENT.QUESTION_CHOSEN);
  }

  onAnswerQuestion(client: Socket) {
    client.emit(SOCKET_EVENT.QUESTION_ANSWERED);
  }
}
