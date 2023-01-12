import { ApiProperty, ApiTags } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

@ApiTags('/socket')
export class StopTypingDto {
  @ApiProperty({
    type: String,
    description: 'Room id',
  })
  @IsString()
  @IsNotEmpty()
  roomId: string;
}
