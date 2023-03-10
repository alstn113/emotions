import { ApiProperty, ApiTags } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty } from 'class-validator';

@ApiTags('users')
export class UpdateEmailNotificationDto {
  @ApiProperty()
  @IsBoolean()
  @IsNotEmpty()
  enabled: boolean;
}
