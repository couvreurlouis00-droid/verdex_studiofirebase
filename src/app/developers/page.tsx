import React from 'react';
import { Navbar } from '@/components/sections/Navbar';
import { Footer } from '@/components/sections/Footer';
import { Code2, Cpu, Rocket } from 'lucide-react';

export default function DevelopersPage() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <section className="pt-32 pb-24 container mx-auto px-6 text-center">
        <h1 className="font-headline font-bold text-6xl mb-8">Build the <span className="text-primary italic font-body font-light">Green Future</span></h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-16">The first EVM-compatible Layer-1 where every line of code contributes to planetary restoration.</p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-5xl mx-auto">
          <div className="space-y-4">
            <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Code2 className="text-primary w-8 h-8" />
            </div>
            <h3 className="text-2xl font-headline font-bold">100% EVM</h3>
            <p className="text-muted-foreground">Deploy your existing Solidity contracts in seconds. No changes needed.</p>
          </div>
          <div className="space-y-4">
            <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Cpu className="text-primary w-8 h-8" />
            </div>
            <h3 className="text-2xl font-headline font-bold">Carbon SDK</h3>
            <p className="text-muted-foreground">Native libraries to fetch climate data directly from the consensus layer.</p>
          </div>
          <div className="space-y-4">
            <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Rocket className="text-primary w-8 h-8" />
            </div>
            <h3 className="text-2xl font-headline font-bold">Eco-Grants</h3>
            <p className="text-muted-foreground">Get funded to build regenerative apps. Up to $100k in VDX per project.</p>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}
