import { User } from '../auth/user.entity';

export const taskErrorMessage = (
  user: User,
  action: string,
  dataName: string,
  data: any,
): string => {
  return `Failed to ${action} for user ${
    user.username
  }. ${dataName}: ${JSON.stringify(data)}`;
};
