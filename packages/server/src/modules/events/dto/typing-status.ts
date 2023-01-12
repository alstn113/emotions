import { ApiProperty, ApiTags } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsString } from 'class-validator';

enum TypingStatus {
  ON,
  OFF,
}

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
    description: 'Room id',
  })
  @IsEnum(TypingStatus)
  @IsNotEmpty()
  status: TypingStatus;
}
