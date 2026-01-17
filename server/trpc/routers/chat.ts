import { z } from "zod";

import { publicProcedure, router } from "../trpc";

const SUGGESTIONS = [
  "Analyze my progress photos",
  "Create a workout plan for me",
  "How much protein should I eat?",
  "Log my workout",
];

export const chatRouter = router({
  getSuggestions: publicProcedure.query(() => {
    return { suggestions: SUGGESTIONS };
  }),

  sendMessage: publicProcedure
    .input(
      z.object({
        message: z.string().min(1),
      })
    )
    .mutation(async ({ input }) => {
      // TODO: Implement actual chat logic (e.g., call AI API)
      console.log("Received message:", input.message);

      return {
        id: Date.now().toString(),
        response: `You said: ${input.message}`,
        timestamp: new Date().toISOString(),
      };
    }),
});
