import React from 'react';
import { Navbar } from '@/components/sections/Navbar';
import { Footer } from '@/components/sections/Footer';
import { Button } from '@/components/ui/button';

export default function GrantsPage() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <section className="pt-32 pb-24 container mx-auto px-6 max-w-4xl text-center">
        <h1 className="font-headline font-bold text-5xl mb-6">Regenerative <span className="text-primary italic font-body font-light">Grants</span></h1>
        <p className="text-xl text-muted-foreground mb-12">We are allocating 20,000,000 VDX to support the next wave of ecological dApps.</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
          <div className="p-8 bg-secondary/30 border border-border rounded-3xl">
            <h3 className="text-2xl font-bold mb-4">Core Tech</h3>
            <p className="text-muted-foreground mb-6">Building bridges, wallets, or infrastructure to support the Verdex network.</p>
            <div className="text-primary font-bold">Up to $150k VDX</div>
          </div>
          <div className="p-8 bg-secondary/30 border border-border rounded-3xl">
            <h3 className="text-2xl font-bold mb-4">Regen Apps</h3>
            <p className="text-muted-foreground mb-6">Consumer apps focused on carbon credits, forest protection, or eco-incentives.</p>
            <div className="text-primary font-bold">Up to $50k VDX</div>
          </div>
        </div>
        
        <Button size="lg" className="mt-16 px-12 h-16 font-bold">Apply for a Grant →</Button>
      </section>
      <Footer />
    </main>
  );
}
