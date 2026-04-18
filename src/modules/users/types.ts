import { User } from '@/modules/auth/types'; // Reuse User type from auth for now or define a more specific one

export interface UserResponse<T> {
  success: boolean;
  data: T;
  error?: string;
}

export type { User };
