import React from 'react';
import { Navbar } from '@/components/sections/Navbar';
import { Footer } from '@/components/sections/Footer';

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <section className="pt-32 pb-24 container mx-auto px-6 max-w-4xl">
        <h1 className="font-headline font-bold text-5xl mb-8">About <span className="text-primary italic font-body font-light">Verdex</span></h1>
        <div className="prose prose-invert max-w-none space-y-6 text-muted-foreground">
          <p className="text-xl text-foreground">Verdex is a next-generation Layer-1 blockchain engineered to bridge the gap between decentralised finance and environmental sustainability.</p>
          <p>Founded by a team of climate scientists and blockchain architects, our mission is to create a protocol where every transaction has a positive ecological footprint. Unlike traditional networks that consume vast amounts of energy, Verdex leverages Proof-of-Growth to verify carbon sequestration in real-time.</p>
          <h2 className="text-2xl font-headline font-bold text-foreground pt-8">Our Vision</h2>
          <p>We envision a world where the global financial system is inherently regenerative. By tokenizing carbon offsets and anchoring them to the core consensus mechanism, we make the planet's health a first-class citizen in the digital economy.</p>
        </div>
      </section>
      <Footer />
    </main>
  );
}
