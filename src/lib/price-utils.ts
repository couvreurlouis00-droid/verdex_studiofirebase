/**
 * Calcule le prix du token VDX de manière déterministe basée sur le temps.
 * Cela permet à tous les utilisateurs de voir le même prix sans base de données.
 */
export function getCurrentVDXPrice(): number {
  const now = Date.now();
  
  // Paramètres de la fluctuation
  const minPrice = 0.0410;
  const maxPrice = 0.0550;
  const center = (minPrice + maxPrice) / 2;
  const amplitude = (maxPrice - minPrice) / 2;
  
  // Utilise une fonction sinus basée sur le temps pour créer une variation fluide
  // La période est d'environ 5 minutes (300 000 ms)
  const period = 300000;
  const variation = Math.sin((now % period) * (2 * Math.PI / period));
  
  // Ajoute un peu de "bruit" haute fréquence pour le réalisme (période de 10s)
  const noise = Math.sin((now % 10000) * (2 * Math.PI / 10000)) * 0.0005;
  
  const finalPrice = center + (amplitude * variation) + noise;
  
  return Number(finalPrice.toFixed(6));
}
