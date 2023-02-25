import { ApiProperty, ApiTags } from '@nestjs/swagger';
import {
  IsArray,
  IsNotEmpty,
  IsOptional,
  IsString,
  Matches,
} from 'class-validator';

@ApiTags('/posts')
export class CreatePostDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  // 빈칸 유니코드 문자열을 허용하지 않는다.
  @Matches(/^\p{Alpha}{2,}[\p{Alpha}\s]{1,57}$/gu, {
    message: 'The input is not valid',
  })
  title: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  slug?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  body: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  thumbnail?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsArray()
  tags?: string[];

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  seriesId?: string;
}
