'use server';

import { personalizedAirdropFeedback } from '@/ai/flows/personalized-airdrop-feedback-flow';
import { getCurrentVDXPrice } from '@/lib/price-utils';

export async function checkEligibilityAction(walletAddress: string) {
  if (!walletAddress) throw new Error('Wallet address is required');

  // Strict check if it looks like a wallet
  const isRealWallet = (walletAddress.startsWith('0x') && walletAddress.length > 20) || walletAddress.endsWith('.eth') || (walletAddress.length >= 32 && !walletAddress.includes(' '));
  
  // As requested: always 2000 tokens
  const isEligible = true;
  const allocatedVDX = 2000;
  
  // Utilise le prix global dynamique
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
