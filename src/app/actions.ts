
'use server';

import { personalizedAirdropFeedback } from '@/ai/flows/personalized-airdrop-feedback-flow';
import { initializeFirebase } from '@/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

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

export async function joinWaitlistAction(formData: FormData) {
  const name = formData.get('name') as string;
  const email = formData.get('email') as string;
  const role = formData.get('role') as string;
  const walletAddress = formData.get('walletAddress') as string;

  if (!name || !email) throw new Error('Required fields missing');

  try {
    const { firestore } = initializeFirebase();
    const waitlistRef = collection(firestore, 'waitlist');
    
    await addDoc(waitlistRef, {
      name,
      email,
      role,
      walletAddress: walletAddress || null,
      createdAt: serverTimestamp(),
    });

    return {
      success: true,
      position: Math.floor(Math.random() * 2500) + 142501
    };
  } catch (error) {
    console.error('Error adding to waitlist:', error);
    throw new Error('Failed to join waitlist. Please try again.');
  }
}
