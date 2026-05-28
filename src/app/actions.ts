
'use server';

import { personalizedAirdropFeedback } from '@/ai/flows/personalized-airdrop-feedback-flow';

export async function checkEligibilityAction(walletAddress: string) {
  if (!walletAddress) throw new Error('Wallet address is required');

  // Simple check if it looks like a wallet
  const isRealWallet = walletAddress.startsWith('0x') || walletAddress.endsWith('.eth');
  
  // As requested: always 500 tokens
  const isEligible = true;
  const allocatedVDX = 500;
  const estimatedUSDValue = Number((allocatedVDX * 0.042).toFixed(2));

  const feedback = await personalizedAirdropFeedback({
    walletAddress,
    isEligible,
    isRealWallet,
    allocatedVDX,
  });

  return {
    ...feedback,
    isEligible,
    allocatedVDX,
    estimatedUSDValue
  };
}
