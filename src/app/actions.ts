'use server';

import { personalizedAirdropFeedback } from '@/ai/flows/personalized-airdrop-feedback-flow';

export async function checkEligibilityAction(walletAddress: string) {
  if (!walletAddress) throw new Error('Wallet address is required');

  // Simulated logic: deteministic based on string sum
  let sum = 0;
  for (let i = 0; i < walletAddress.length; i++) sum += walletAddress.charCodeAt(i);
  
  const isEligible = sum % 3 !== 0; // 66% chance of being eligible
  const allocatedVDX = isEligible ? 80 + (sum % 241) : 0;
  const estimatedUSDValue = Number((allocatedVDX * 0.042).toFixed(2));

  const feedback = await personalizedAirdropFeedback({
    walletAddress,
    isEligible,
    allocatedVDX: isEligible ? allocatedVDX : undefined,
    estimatedUSDValue: isEligible ? estimatedUSDValue : undefined,
  });

  return {
    ...feedback,
    isEligible,
    allocatedVDX,
    estimatedUSDValue
  };
}

export async function joinWaitlistAction(formData: FormData) {
  const name = formData.get('name');
  const email = formData.get('email');
  const role = formData.get('role');

  if (!name || !email) throw new Error('Required fields missing');

  // Simulated storage
  await new Promise((resolve) => setTimeout(resolve, 1000));
  
  return {
    success: true,
    position: Math.floor(Math.random() * 2500) + 142501
  };
}