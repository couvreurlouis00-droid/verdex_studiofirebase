import React from 'react';
import { Navbar } from '@/components/sections/Navbar';
import { Footer } from '@/components/sections/Footer';
import { Server, Activity, Shield } from 'lucide-react';

export default function ValidatorsPage() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <section className="pt-32 pb-24 container mx-auto px-6 max-w-5xl">
        <div className="text-center mb-16">
          <h1 className="font-headline font-bold text-5xl mb-6">Secure the <span className="text-primary italic font-body font-light">Network</span></h1>
          <p className="text-xl text-muted-foreground">Join the cohort of 1,200+ validators securing the Green-Chain Protocol.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <div className="p-8 bg-secondary/30 border border-border rounded-3xl text-center">
            <Server className="w-10 h-10 text-primary mx-auto mb-4" />
            <h3 className="font-bold text-xl mb-2">10k VDX</h3>
            <p className="text-sm text-muted-foreground">Minimum Stake</p>
          </div>
          <div className="p-8 bg-secondary/30 border border-border rounded-3xl text-center">
            <Activity className="w-10 h-10 text-primary mx-auto mb-4" />
            <h3 className="font-bold text-xl mb-2">12.4%</h3>
            <p className="text-sm text-muted-foreground">Estimated APY</p>
          </div>
          <div className="p-8 bg-secondary/30 border border-border rounded-3xl text-center">
            <Shield className="w-10 h-10 text-primary mx-auto mb-4" />
            <h3 className="font-bold text-xl mb-2">Renewable</h3>
            <p className="text-sm text-muted-foreground">Powered Bonus</p>
          </div>
        </div>
        
        <div className="bg-primary/10 border border-primary/20 p-8 rounded-3xl">
          <h3 className="text-2xl font-bold mb-4">Hardware Requirements</h3>
          <ul className="space-y-4 text-muted-foreground">
            <li className="flex items-center gap-3"><span className="text-primary">✓</span> CPU: 8+ Core (AMD EPYC/Ryzen preferred)</li>
            <li className="flex items-center gap-3"><span className="text-primary">✓</span> RAM: 32GB DDR4/DDR5</li>
            <li className="flex items-center gap-3"><span className="text-primary">✓</span> Storage: 1TB NVMe SSD</li>
            <li className="flex items-center gap-3"><span className="text-primary">✓</span> Network: 1Gbps Symmetric Connection</li>
          </ul>
        </div>
      </section>
      <Footer />
    </main>
  );
}
