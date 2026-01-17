import { initTRPC } from '@trpc/server';
import superjson from 'superjson';

/**
 * Placeholder tRPC initialization for type inference.
 * Replace this with the actual AppRouter from your backend when available.
 *
 * When you have a backend, replace the entire file with:
 * export type { AppRouter } from 'your-backend-package';
 */

const t = initTRPC.create({
  transformer: superjson,
});

// Placeholder router - replace with your actual backend router type
const appRouter = t.router({
  // Add your procedures here or import from backend
});

export type AppRouter = typeof appRouter;
