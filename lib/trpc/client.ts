import { createTRPCReact } from '@trpc/react-query';
import { httpBatchLink } from '@trpc/client';
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
  // Update this to your actual API URL
  // For local development, use your machine's IP address (not localhost) for physical devices
  // Example: 'http://192.168.1.100:3000'

  const API_URL = process.env.EXPO_PUBLIC_API_URL;

  if (API_URL) {
    return API_URL;
  }

  // Default fallback - update this for your environment
  return 'http://localhost:3000';
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
        // You can add headers here for authentication
        // headers() {
        //   return {
        //     Authorization: `Bearer ${getToken()}`,
        //   };
        // },
      }),
    ],
  });
}
