import { ENV } from '@/config/env';

/**
 * Standard API Client with Timeout & Error Normalization
 */
export async function apiFetch<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  const url = endpoint.startsWith('http') ? endpoint : `${ENV.API_URL}${endpoint}`;
  
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), ENV.TIMEOUT_MS);

  const defaultHeaders = {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  };

  try {
    const response = await fetch(url, {
      ...options,
      headers: { ...defaultHeaders, ...options.headers },
      signal: controller.signal,
    });

    clearTimeout(id);

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `API Error: ${response.status}`);
    }

    return await response.json();
  } catch (error: any) {
    clearTimeout(id);
    if (error.name === 'AbortError') {
      throw new Error('Request Timeout: Connection exceeded 8s limit.');
    }
    throw error;
  }
}

/**
 * Retry functionality with limit
 */
export async function apiWithRetry<T>(fn: () => Promise<T>, retries = ENV.RETRY_COUNT): Promise<T> {
  try {
    return await fn();
  } catch (error) {
    if (retries <= 0) throw error;
    return apiWithRetry(fn, retries - 1);
  }
}
