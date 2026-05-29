import { genkit } from 'genkit';
import { googleAI } from '@genkit-ai/google-genai';

/**
 * Genkit initialization.
 * Uses GOOGLE_GENAI_API_KEY from environment variables.
 * We use gemini-1.5-flash for stable text generation.
 */
export const ai = genkit({
  plugins: [
    googleAI({
      apiKey: process.env.GOOGLE_GENAI_API_KEY,
    })
  ],
  model: 'googleai/gemini-1.5-flash',
});
