import { ApiProperty, ApiTags } from '@nestjs/swagger';
import { IsEmail, IsOptional } from 'class-validator';

@ApiTags('users')
export class UpdateEmailDto {
  @ApiProperty({ required: false })
  @IsOptional()
  @IsEmail()
  email: string | null;
}
