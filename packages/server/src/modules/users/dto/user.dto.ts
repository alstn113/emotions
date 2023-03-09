import { Expose } from 'class-transformer';

export class UserDto {
  @Expose()
  id: string;

  @Expose()
  username: string;

  @Expose()
  displayName: string;

  @Expose()
  email: string | null;

  @Expose()
  emailNotification: boolean;

  @Expose()
  profileImage: string | null;
}
