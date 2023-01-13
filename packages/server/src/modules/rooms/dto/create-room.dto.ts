import { ApiProperty, ApiTags } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

@ApiTags('/rooms')
export class CreateRoomDto {
  @ApiProperty({
    type: String,
    description: 'The title of the room',
  })
  @IsString()
  @IsNotEmpty()
  name: string;
}
