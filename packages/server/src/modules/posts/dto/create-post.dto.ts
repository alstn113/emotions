import { ApiProperty, ApiTags } from '@nestjs/swagger';
import { IsArray, IsNotEmpty, IsOptional, IsString } from 'class-validator';

@ApiTags('/posts')
export class CreatePostDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  slug: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  body: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  thumbnail?: string;

  @ApiProperty({ nullable: true })
  @IsOptional()
  @IsArray()
  tags?: string[];
}
