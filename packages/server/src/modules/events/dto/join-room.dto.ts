import { ApiProperty, ApiTags } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

@ApiTags('/socket')
export class JoinRoomDto {
  @ApiProperty({
    type: String,
    description: 'Room ID',
  })
  @IsString()
  @IsNotEmpty()
  roomId: string;
}
