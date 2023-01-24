import { Injectable, Logger } from '@nestjs/common';
import { Server, Socket } from 'socket.io';
import { SOCKET_EVENT } from '~/common/constants';
import { AuthService } from '~/modules/auth/auth.service';
import { parseCookie } from '~/utils/parseCookie';
import {
  AnswerQuestionDto,
  ChooseQuestionDto,
  JoinRoomDto,
  LeaveRoomDto,
  RoomMessageDto,
  TypingStatusDto,
} from '../dto';
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

    client.on('disconnecting', () => this.onDisconnecting(client));
  }

  onDisconnect(client: Socket) {
    this.logger.log(`Client disconnected: ${client.id}`);
  }

  private onDisconnecting(client: Socket) {
    // user가 참여하고 있는 room을 가져온다.
    const roomsToLeave: Set<string> = this.server.adapter['sids'].get(client.id);

    if (!roomsToLeave) {
      return;
    }

    // user sid와 같은 것을 제외시킨다.
    const rooms = [...roomsToLeave].filter(
      (room) => room !== client.id && room !== client.data.uid.toString(),
    );

    rooms.forEach(async (room) => {
      client.to(room).emit(SOCKET_EVENT.LEFT_ROOM, {
        uid: `${client.id}`,
        username: `${client.data.username}`,
        message: `left ${room}`,
      });
      client.to(room).emit(SOCKET_EVENT.TYPING_STATUS, {
        uid: `${client.data.uid}`,
        username: `${client.data.username}`,
        isTyping: false,
      });
    });
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

  onChooseQuestion(client: Socket, dto: ChooseQuestionDto) {
    //TODO: check if user is host

    this.server.to(dto.roomId).emit(SOCKET_EVENT.QUESTION_CHOSEN, {
      uid: `${dto.uid}`,
      username: `${dto.username}`,
      message: `${dto.message}`,
    });
  }

  onAnswerQuestion(client: Socket, dto: AnswerQuestionDto) {
    this.server.to(dto.roomId).emit(SOCKET_EVENT.QUESTION_ANSWERED);
  }
}
