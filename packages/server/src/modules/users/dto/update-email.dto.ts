import { ApiTags } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';

@ApiTags('users ')
export class UpdateEmailDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;
}
