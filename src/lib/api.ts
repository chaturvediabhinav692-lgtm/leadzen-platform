import { ApiResponse } from './types';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api/v1';

interface FetchOptions extends RequestInit {
  timeout?: number;
  retries?: number;
}

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export async function apiRequest<T>(
  endpoint: string,
  options: FetchOptions = {}
): Promise<ApiResponse<T>> {
  const { timeout = 8000, retries = 2, ...fetchOptions } = options;

  const url = `${API_BASE_URL}${endpoint}`;
  
  // Default headers
  const headers = new Headers(fetchOptions.headers);
  if (!headers.has('Content-Type') && !(fetchOptions.body instanceof FormData)) {
    headers.set('Content-Type', 'application/json');
  }

  let lastError: any;

  for (let attempt = 0; attempt <= retries; attempt++) {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeout);

    try {
      const response = await fetch(url, {
        ...fetchOptions,
        headers,
        signal: controller.signal,
        credentials: 'include', // Important for httpOnly cookies
      });

      clearTimeout(timeoutId);

      const result: ApiResponse<T> = await response.json();

      if (!response.ok || !result.success) {
        // Hardened Security: Handle 403 Forbidden globally
        if (response.status === 403) {
          window.location.href = '/403';
          throw new Error('Access Denied: Security Clearance Failure');
        }
        
        throw new Error(result.error || `HTTP error! status: ${response.status}`);
      }

      return result;
    } catch (error: any) {
      clearTimeout(timeoutId);
      lastError = error;

      if (error.name === 'AbortError') {
        lastError = new Error('Request timed out after 8 seconds');
      }

      // Don't retry on certain errors (e.g., unauthorized) if needed, 
      // but for now we follow the "Retry 2x" rule.
      if (attempt < retries) {
        const backoff = Math.pow(2, attempt) * 1000;
        await sleep(backoff);
        continue;
      }
    }
  }

  return {
    success: false,
    data: null as any,
    error: lastError?.message || 'An unexpected error occurred',
  };
}
