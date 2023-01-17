import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { SOCKET_EVENT } from '~/common/constants';
import { JoinRoomDto, LeaveRoomDto, RoomMessageDto, TypingStatusDto } from '../dto';
import { RoomGatewayService } from './room.gateway.service';

@WebSocketGateway({
  cors: { origin: '*' },
  transports: ['websocket', 'polling'],
  namespace: 'socket/room',
})
export class RoomGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  constructor(private readonly roomGatewayService: RoomGatewayService) {}

  /** Default Setting */

  afterInit(server: Server) {
    return this.roomGatewayService.onAfterInit(server);
  }

  handleConnection(client: Socket) {
    return this.roomGatewayService.onConnection(client);
  }

  handleDisconnect(client: Socket) {
    return this.roomGatewayService.onDisconnect(client);
  }

  /** Socket Chat */

  @SubscribeMessage(SOCKET_EVENT.JOIN_ROOM)
  handleJoinRoom(client: Socket, dto: JoinRoomDto) {
    return this.roomGatewayService.onJoinRoom(client, dto);
  }

  @SubscribeMessage(SOCKET_EVENT.LEAVE_ROOM)
  handleLeaveRoom(client: Socket, dto: LeaveRoomDto) {
    return this.roomGatewayService.onLeaveRoom(client, dto);
  }

  @SubscribeMessage(SOCKET_EVENT.CHAT_MESSAGE)
  handleChatMessage(client: Socket, dto: RoomMessageDto) {
    return this.roomGatewayService.onChatMessage(client, dto);
  }

  @SubscribeMessage(SOCKET_EVENT.TYPING_STATUS)
  handleTypingStatus(client: Socket, dto: TypingStatusDto) {
    return this.roomGatewayService.onTypingStatus(client, dto);
  }

  @SubscribeMessage(SOCKET_EVENT.CHOOSE_QUESTION)
  handleChooseQuestion(client: Socket) {
    return this.roomGatewayService.onChooseQuestion(client);
  }

  @SubscribeMessage(SOCKET_EVENT.ANSWER_QUESTION)
  handleAnswerQuestion(client: Socket) {
    return this.roomGatewayService.onAnswerQuestion(client);
  }
}
