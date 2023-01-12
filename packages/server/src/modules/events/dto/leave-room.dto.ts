import { ApiProperty, ApiTags } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

@ApiTags('/socket/rooms')
export class LeaveRoomDto {
  @ApiProperty({
    type: String,
    description: 'Room ID',
  })
  @IsString()
  @IsNotEmpty()
  roomId: string;
}
