import { ApiProperty, ApiTags } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

@ApiTags('comments')
export class CreateCommentDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  text: string;
}
