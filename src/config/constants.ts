export const FILE_LIMITS = {
  MAX_SIZE_BYTES: 5 * 1024 * 1024, // 5MB
  ALLOWED_MIME_TYPES: ['image/jpeg', 'image/png', 'image/webp'],
};

export const UI_MESSAGES = {
  BACKEND_OFFLINE: 'System connection interrupted. Check Node Status.',
  UNAUTHORIZED: 'Session expired. Please re-authenticate.',
  FETCH_ERROR: 'Unable to fetch data. Please check connection.',
  SUBMISSION_SUCCESS: 'Transmission complete. Token registered.',
};

export const RETRY_DEFAULTS = {
  MAX_RETRIES: 2,
  TIMEOUT: 8000,
};
