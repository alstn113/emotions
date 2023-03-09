export interface User {
  id: string;
  username: string;
  displayName: string;
  email: string | null;
  emailNotification: boolean;
  profileImage: string | null;
}
