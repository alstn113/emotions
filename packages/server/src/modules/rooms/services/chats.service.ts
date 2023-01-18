import { Injectable } from '@nestjs/common';
import { ChatsRepository } from '../repositories/chats.repository';

@Injectable()
export class ChatsService {
  constructor(private readonly chatsRepository: ChatsRepository) {}
}
