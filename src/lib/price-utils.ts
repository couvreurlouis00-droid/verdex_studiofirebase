/**
 * Calculates VDX token price deterministically based on time.
 */
export function getCurrentVDXPrice(): number {
  const now = Date.now();
  
  const minPrice = 0.0410;
  const maxPrice = 0.0550;
  const center = (minPrice + maxPrice) / 2;
  const amplitude = (maxPrice - minPrice) / 2;
  
  const period = 300000;
  const variation = Math.sin((now % period) * (2 * Math.PI / period));
  
  const noise = Math.sin((now % 10000) * (2 * Math.PI / 10000)) * 0.0005;
  
  const finalPrice = center + (amplitude * variation) + noise;
  
  return Number(finalPrice.toFixed(6));
}

/**
 * Calculates waitlist count deterministically.
 * Base: 14,187. Growth: ~100/day (1 every ~14.4 minutes / 864,000ms).
 */
export function getLiveWaitlistCount(): number {
  const baseCount = 14187;
  const startTime = 1739000000000; // Fixed reference point
  const now = Date.now();
  
  // 1 person every 864,000ms (roughly 4 per hour)
  const progress = Math.floor((now - startTime) / 864000);
  
  return baseCount + Math.max(0, progress);
}
