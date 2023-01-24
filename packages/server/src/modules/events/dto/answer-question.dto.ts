import { ApiProperty, ApiTags } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

@ApiTags('/socket')
export class AnswerQuestionDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  roomId: string;
}
