'use server';

import { personalizedAirdropFeedback } from '@/ai/flows/personalized-airdrop-feedback-flow';
import { getCurrentVDXPrice } from '@/lib/price-utils';

export async function checkEligibilityAction(walletAddress: string) {
  if (!walletAddress) throw new Error('Wallet address is required');

  // Simple wallet detection: 0x for EVM, .eth for ENS, or length >= 32 for Solana/others
  const isRealWallet = (walletAddress.startsWith('0x') && walletAddress.length > 20) || walletAddress.endsWith('.eth') || (walletAddress.length >= 32 && !walletAddress.includes(' '));
  
  // Fixed Genesis allocation: 2000 tokens
  const isEligible = true;
  const allocatedVDX = 2000;
  
  const currentPrice = getCurrentVDXPrice();
  const estimatedUSDValue = Number((allocatedVDX * currentPrice).toFixed(2));

  const feedback = await personalizedAirdropFeedback({
    walletAddress,
    isEligible,
    isRealWallet,
    allocatedVDX,
  });

  return {
    ...feedback,
    isEligible,
    isRealWallet,
    allocatedVDX,
    estimatedUSDValue,
    currentPrice
  };
}
