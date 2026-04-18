import { apiFetch, apiWithRetry } from '@/api/client';
import { AuthResponse } from '../types';

export const authService = {
  async getCurrentUser(): Promise<AuthResponse> {
    return apiWithRetry(() => apiFetch<AuthResponse>('/auth/me'));
  },

  async login(credentials: any): Promise<AuthResponse> {
    return apiFetch<AuthResponse>('/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    });
  },

  async signup(data: any): Promise<AuthResponse> {
    return apiFetch<AuthResponse>('/auth/signup', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  async logout(): Promise<void> {
    await apiFetch('/logout', { method: 'POST' }).catch(() => {});
    localStorage.setItem('leadzen-auth-trigger', Date.now().toString());
  }
};
