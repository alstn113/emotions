import { ApiProperty, ApiTags } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

@ApiTags('/socket')
export class RoomMessageDto {
  @ApiProperty({
    type: String,
    description: 'Room id',
  })
  @IsString()
  @IsNotEmpty()
  roomId: string;

  @ApiProperty({
    type: String,
    description: 'Message to send',
  })
  @IsString()
  @IsNotEmpty()
  message: string;
}
