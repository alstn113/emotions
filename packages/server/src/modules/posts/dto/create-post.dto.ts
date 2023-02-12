import { ApiProperty, ApiTags } from '@nestjs/swagger';
import { IsArray, IsNotEmpty, IsOptional, IsString } from 'class-validator';

@ApiTags('/posts')
export class CreatePostDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({ nullable: true })
  @IsString()
  @IsOptional()
  slug?: string;

  @ApiProperty({ nullable: true })
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

  @ApiProperty({ nullable: true })
  @IsOptional()
  @IsArray()
  tags?: string[];

  @ApiProperty({ nullable: true })
  @IsOptional()
  @IsString()
  seriesId?: string;
}
