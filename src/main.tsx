import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './index.css';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import GlobalErrorBoundary from './components/GlobalErrorBoundary';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000,
      retry: 2,
    },
  },
});

const container = document.getElementById('root');
if (!container) {
  throw new Error('Failed to find root element');
}

const root = createRoot(container);
root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <GlobalErrorBoundary>
        <App />
      </GlobalErrorBoundary>
    </QueryClientProvider>
  </React.StrictMode>
);
