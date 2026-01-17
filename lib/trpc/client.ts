import { createTRPCReact } from '@trpc/react-query';
import { httpBatchLink } from '@trpc/client';
import Constants from 'expo-constants';
import { Platform } from 'react-native';
import superjson from 'superjson';

import type { AppRouter } from './types';

/**
 * tRPC React hooks
 */
export const trpc = createTRPCReact<AppRouter>();

/**
 * Get the base URL for the tRPC API
 */
function getBaseUrl(): string {
  // Use environment variable if set
  const apiUrl = process.env.EXPO_PUBLIC_API_URL;
  if (apiUrl) {
    return apiUrl;
  }

  // For web, use relative URL
  if (Platform.OS === 'web') {
    return '';
  }

  // For native, get the debugger host (works in development)
  const debuggerHost = Constants.expoConfig?.hostUri;
  if (debuggerHost) {
    const host = debuggerHost.split(':')[0];
    return `http://${host}:8081`;
  }

  // Fallback for production - update this to your production API URL
  return 'http://localhost:8081';
}

/**
 * Create tRPC client configuration
 */
export function createTRPCClient() {
  return trpc.createClient({
    links: [
      httpBatchLink({
        url: `${getBaseUrl()}/api/trpc`,
        transformer: superjson,
      }),
    ],
  });
}
