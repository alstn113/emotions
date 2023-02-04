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
  body: string;

  @ApiProperty({ nullable: true })
  @IsArray()
  @IsOptional()
  tags?: string[];
}
