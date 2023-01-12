import { ApiProperty, ApiTags } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';

@ApiTags('/socket')
export class TypingStatusDto {
  @ApiProperty({
    type: String,
    description: 'Room id',
  })
  @IsString()
  @IsNotEmpty()
  roomId: string;

  @ApiProperty({
    type: String,
    description: 'Typing Status',
  })
  @IsBoolean()
  @IsNotEmpty()
  isTyping: boolean;
}
