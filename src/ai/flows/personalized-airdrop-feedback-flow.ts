'use server';
/**
 * @fileOverview Provides AI-generated personalized feedback on a wallet's airdrop eligibility.
 *
 * - personalizedAirdropFeedback - A function that generates personalized feedback for a wallet's airdrop eligibility.
 * - PersonalizedAirdropFeedbackInput - The input type for the personalizedAirdropFeedback function.
 * - PersonalizedAirdropFeedbackOutput - The return type for the personalizedAirdropFeedback function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const PersonalizedAirdropFeedbackInputSchema = z.object({
  walletAddress: z.string().describe('The blockchain wallet address being checked for eligibility.'),
  isEligible: z.boolean().describe('Whether the wallet is currently eligible for the airdrop.'),
  allocatedVDX: z.number().optional().describe('The amount of VDX tokens allocated if eligible.'),
  estimatedUSDValue: z.number().optional().describe('The estimated USD value of the allocated VDX tokens if eligible.'),
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
  prompt: `You are an AI assistant specialized in providing clear, concise, and actionable feedback for blockchain airdrop eligibility.

Based on the provided wallet eligibility status for the Verdex Genesis Airdrop, generate a personalized feedback message, specific reasons for the current standing, and actionable suggestions.

If the wallet is eligible:
- Congratulate the user.
- Clearly state the allocated VDX amount and its estimated USD value.
- Provide general reasons for eligibility (e.g., early testnet participation, climate-focused DeFi activity, environmental DAO membership).
- Suggest ways to maximize benefits or stay engaged with the Verdex protocol.

If the wallet is not eligible:
- Explain politely why it might not be eligible (e.g., missed snapshots, insufficient activity, not meeting specific criteria).
- Offer concrete and actionable suggestions on how to improve their simulated blockchain-environmental footprint or enhance future allocation chances within the Verdex ecosystem. Focus on activities like participating in future testnets, engaging with Verdex DApps, staking VDX, or contributing to ecological DAOs.

Wallet Address: {{{walletAddress}}}
Eligibility Status: {{{isEligible}}}
{{#if allocatedVDX}}Allocated VDX: {{{allocatedVDX}}}{{/if}}
{{#if estimatedUSDValue}}Estimated USD Value: \${{{estimatedUSDValue}}}{{/if}}

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
