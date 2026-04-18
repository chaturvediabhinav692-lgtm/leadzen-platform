import { apiFetch, apiWithRetry } from '@/api/client';
import { User, UserResponse } from '../types';

export const userService = {
  async getUsers(): Promise<UserResponse<User[]>> {
    return apiWithRetry(() => apiFetch<UserResponse<User[]>>('/users'));
  },

  async updateUserRole(id: string, role: string): Promise<UserResponse<User>> {
    return apiFetch<UserResponse<User>>(`/users/${id}/role`, {
      method: 'PATCH',
      body: JSON.stringify({ role }),
    });
  },
};
