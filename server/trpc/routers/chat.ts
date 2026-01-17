import { z } from 'zod';

import { publicProcedure, router } from '../trpc';

const SUGGESTIONS = [
  'Analyze my progress photos',
  'Create a workout plan for me',
  'How much protein should I eat?',
  'Log my workout',
];

export const chatRouter = router({
  getSuggestions: publicProcedure.query(() => {
    return { suggestions: SUGGESTIONS };
  }),
});
