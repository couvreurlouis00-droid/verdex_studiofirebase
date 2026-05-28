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

/**
 * Calcule le nombre d'inscrits à la waitlist de manière déterministe.
 * Démarre à 14 200 et augmente lentement pour simuler un trafic réel.
 */
export function getLiveWaitlistCount(): number {
  const baseCount = 14200;
  const startTime = 1740000000000; // Un point de référence fixe (date de lancement du code)
  const now = Date.now();
  
  // Simule une nouvelle inscription toutes les ~45 secondes en moyenne
  const progress = Math.floor((now - startTime) / 45000);
  
  return baseCount + Math.max(0, progress);
}
