import { z } from 'zod';

import { publicProcedure, router } from '../trpc';

export const chatRouter = router({
  sendMessage: publicProcedure
    .input(
      z.object({
        message: z.string().min(1),
      })
    )
    .mutation(async ({ input }) => {
      // TODO: Implement actual chat logic (e.g., call AI API)
      console.log('Received message:', input.message);

      return {
        id: Date.now().toString(),
        response: `You said: ${input.message}`,
        timestamp: new Date().toISOString(),
      };
    }),

  getHistory: publicProcedure.query(async () => {
    // TODO: Implement actual history retrieval
    return {
      messages: [],
    };
  }),
});
