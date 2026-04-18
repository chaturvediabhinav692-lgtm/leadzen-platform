export const ENV = {
  API_URL: import.meta.env.VITE_API_URL || 'http://localhost:8000/api/v1',
  TIMEOUT_MS: 8000,
  RETRY_COUNT: 2,
};
