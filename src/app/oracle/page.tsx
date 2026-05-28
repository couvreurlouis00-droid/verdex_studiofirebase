import React from 'react';
import { Navbar } from '@/components/sections/Navbar';
import { Footer } from '@/components/sections/Footer';
import { Globe, Leaf, Database } from 'lucide-react';

export default function OraclePage() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <section className="pt-32 pb-24 container mx-auto px-6 text-center">
        <h1 className="font-headline font-bold text-5xl mb-8">Carbon <span className="text-primary italic font-body font-light">Oracle</span></h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-20">The decentralised bridge between real-world environmental data and the blockchain.</p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-left">
          <div className="space-y-4 p-8 bg-secondary/30 border border-border rounded-3xl">
            <Globe className="text-primary w-10 h-10" />
            <h3 className="text-2xl font-bold">Satellite Imaging</h3>
            <p className="text-muted-foreground">Real-time forest cover analysis using Sentinel-2 and Landsat-9 spectral data.</p>
          </div>
          <div className="space-y-4 p-8 bg-secondary/30 border border-border rounded-3xl">
            <Leaf className="text-primary w-10 h-10" />
            <h3 className="text-2xl font-bold">IoT Sensors</h3>
            <p className="text-muted-foreground">Direct feed from 14,000+ forest floor sensors tracking humidity, biomass, and health.</p>
          </div>
          <div className="space-y-4 p-8 bg-secondary/30 border border-border rounded-3xl">
            <Database className="text-primary w-10 h-10" />
            <h3 className="text-2xl font-bold">On-Chain Anchors</h3>
            <p className="text-muted-foreground">Every climate data point is cryptographically signed before being anchored to blocks.</p>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}
