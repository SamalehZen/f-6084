
import { configureGenkit } from '@genkit-ai/core';
import { googleAI } from '@genkit-ai/googleai';

export const ai = configureGenkit({
  plugins: [
    googleAI({
      apiKey: import.meta.env.GEMINI_API_KEY
    })
  ],
  logLevel: 'debug',
  enableTracingAndMetrics: true,
});

export const model = 'googleai/gemini-2.0-flash-exp';
