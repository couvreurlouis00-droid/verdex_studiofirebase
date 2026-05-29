/**
 * Calculates VDX token price deterministically based on time.
 */
export function getCurrentVDXPrice(): number {
  const now = Date.now();
  
  // Base price around $0.05
  const minPrice = 0.0410;
  const maxPrice = 0.0550;
  const center = (minPrice + maxPrice) / 2;
  const amplitude = (maxPrice - minPrice) / 2;
  
  // Fluctuates every 5 minutes
  const period = 300000;
  const variation = Math.sin((now % period) * (2 * Math.PI / period));
  
  // Add some micro-noise
  const noise = Math.sin((now % 10000) * (2 * Math.PI / 10000)) * 0.0005;
  
  const finalPrice = center + (amplitude * variation) + noise;
  
  return Number(finalPrice.toFixed(6));
}

/**
 * Calculates waitlist percentage deterministically.
 * Updated to start at 74.8% to match 14,960 members requirement.
 */
export function getLiveWaitlistPercentage(): number {
  const basePercentage = 74.8;
  const dailyGrowth = 0.5;
  const startTime = 1739097600000; // Fixed reference: Feb 9, 2025
  const now = Date.now();
  
  const daysPassed = (now - startTime) / (24 * 60 * 60 * 1000);
  const currentPercentage = basePercentage + (Math.max(0, daysPassed) * dailyGrowth);
  
  // Cap at 99.8% to maintain urgency without hitting 100% too soon
  return Number(Math.min(99.8, currentPercentage).toFixed(2));
}

/**
 * Calculates raw waitlist count based on percentage and 20k cap.
 */
export function getLiveWaitlistCount(): number {
  const percentage = getLiveWaitlistPercentage();
  const maxSpots = 20000;
  return Math.floor((percentage / 100) * maxSpots);
}
