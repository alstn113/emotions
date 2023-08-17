export interface User {
  id: string;
  username: string;
  displayName: string;
  email: string | null;
  emailNotification: boolean;
  profileImage: string | null;
}

export interface UpdateEmailParams {
  email?: string | null;
}

export interface UpdateEmailNotificationParams {
  enabled: boolean;
}
