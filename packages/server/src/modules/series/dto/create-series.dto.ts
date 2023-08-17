import { ApiProperty, ApiTags } from '@nestjs/swagger';

import { IsNotEmpty, IsString } from 'class-validator';

@ApiTags('/series')
export class CreateSeriestDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name: string;
}
