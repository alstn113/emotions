import { Module } from '@nestjs/common';
import { RoomsController } from './rooms.controller';
import { RoomsService, ChatsService } from './services';
import { RoomsRepository, ChatsRepository, VotesRepository } from './repositories';

@Module({
  imports: [],
  controllers: [RoomsController],
  providers: [
    // services
    RoomsService,
    ChatsService,
    // repositories
    RoomsRepository,
    ChatsRepository,
    VotesRepository,
  ],
})
export class RoomsModule {}
