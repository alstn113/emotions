import { ApiTags } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty } from 'class-validator';

@ApiTags('users')
export class UpdateEmailNotificationDto {
  @IsBoolean()
  @IsNotEmpty()
  enabled: boolean;
}
