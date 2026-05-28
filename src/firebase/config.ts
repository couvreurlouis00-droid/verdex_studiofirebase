'use client';

/**
 * Firebase configuration object.
 * Uses environment variables with your provided values as hardcoded fallbacks.
 */
export const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || "AIzaSyAG11AzH3kQZlXgbP4awvoOHnPL1fwata0",
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || "studio-6090165366-c9e2d.firebaseapp.com",
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || "studio-6090165366-c9e2d",
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || "studio-6090165366-c9e2d.firebasestorage.app",
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || "425594726537",
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || "1:425594726537:web:3d9ca3d0a1020467b8fe58"
};
