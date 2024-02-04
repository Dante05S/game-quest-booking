import { type User } from '@/models/User.interface';

export interface UserState {
  user: User | null;
  token: string | null;
}
