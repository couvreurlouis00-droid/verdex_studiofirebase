'use server';
/**
 * @fileOverview Provides AI-generated personalized feedback on a wallet's airdrop eligibility.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const PersonalizedAirdropFeedbackInputSchema = z.object({
  walletAddress: z.string().describe('The blockchain wallet address or string being checked.'),
  isEligible: z.boolean().describe('Whether the wallet is currently eligible for the airdrop.'),
  isRealWallet: z.boolean().describe('Whether the input looks like a real blockchain address or just a test string.'),
  allocatedVDX: z.number().optional().describe('The amount of VDX tokens allocated.'),
});
export type PersonalizedAirdropFeedbackInput = z.infer<typeof PersonalizedAirdropFeedbackInputSchema>;

const PersonalizedAirdropFeedbackOutputSchema = z.object({
  feedbackMessage: z.string().describe('A personalized summary message about the eligibility status.'),
  reasons: z.array(z.string()).describe('Specific reasons for the current standing.'),
  suggestions: z.array(z.string()).describe('Actionable suggestions to improve future allocation chances or engagement.'),
});
export type PersonalizedAirdropFeedbackOutput = z.infer<typeof PersonalizedAirdropFeedbackOutputSchema>;

export async function personalizedAirdropFeedback(input: PersonalizedAirdropFeedbackInput): Promise<PersonalizedAirdropFeedbackOutput> {
  return personalizedAirdropFeedbackFlow(input);
}

const personalizedAirdropFeedbackPrompt = ai.definePrompt({
  name: 'personalizedAirdropFeedbackPrompt',
  input: { schema: PersonalizedAirdropFeedbackInputSchema },
  output: { schema: PersonalizedAirdropFeedbackOutputSchema },
  prompt: `You are an AI assistant specialized in providing clear, concise, and actionable feedback for the Verdex Genesis Airdrop.

Analyze the user's input: "{{{walletAddress}}}".

If isRealWallet is false:
- Note that the input "{{{walletAddress}}}" is NOT a valid blockchain address.
- Explicitly state that this looks like a test string and cannot be used for the actual Genesis allocation.
- Warn them that only real addresses will be whitelisted for the 2,000 VDX reward.

If isRealWallet is true:
- Congratulate them on having a valid footprint.
- Confirm they have been allocated exactly 2,000 VDX tokens.

Always:
- Mention that the Genesis allocation is fixed at 2,000 VDX for early pioneers.
- Emphasize that because the token is not yet launched, prices shown are predictive estimations of the launch value based on our $500k fundraising goal.
- Mention the 20,000 spot limit for early access.

Wallet Address/Input: {{{walletAddress}}}
Is Real Wallet: {{{isRealWallet}}}
Allocated VDX: 2000

Generate the response in JSON format according to the output schema.`,
});

const personalizedAirdropFeedbackFlow = ai.defineFlow(
  {
    name: 'personalizedAirdropFeedbackFlow',
    inputSchema: PersonalizedAirdropFeedbackInputSchema,
    outputSchema: PersonalizedAirdropFeedbackOutputSchema,
  },
  async (input) => {
    const { output } = await personalizedAirdropFeedbackPrompt(input);
    if (!output) {
      throw new Error('Failed to generate personalized airdrop feedback.');
    }
    return output;
  }
);
