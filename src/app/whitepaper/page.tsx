import React from 'react';
import { Navbar } from '@/components/sections/Navbar';
import { Footer } from '@/components/sections/Footer';
import { Button } from '@/components/ui/button';
import { FileText, Download } from 'lucide-react';

export default function WhitepaperPage() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <section className="pt-32 pb-24 container mx-auto px-6 max-w-4xl text-center">
        <div className="inline-flex p-4 bg-primary/10 rounded-full mb-8">
          <FileText className="w-12 h-12 text-primary" />
        </div>
        <h1 className="font-headline font-bold text-5xl mb-6">Verdex <span className="text-primary italic font-body font-light">Whitepaper</span></h1>
        <p className="text-xl text-muted-foreground mb-12">Version 2.0: The Architectural Blueprint for Regenerative Finance.</p>
        
        <div className="bg-secondary/30 border border-border p-12 rounded-3xl text-left space-y-8">
          <div>
            <h3 className="text-2xl font-headline font-bold mb-4">Abstract</h3>
            <p className="text-muted-foreground leading-relaxed">This paper presents Verdex, an EVM-compatible Layer-1 blockchain that implements a novel Proof-of-Growth (PoG) consensus mechanism. We detail the integration of real-world ecological data via the Carbon Oracle network and the tokenomics of VDX.</p>
          </div>
          <div className="flex justify-center pt-8">
            <Button size="lg" className="px-12 h-16 text-lg font-bold">
              <Download className="mr-2" /> Download PDF (12.4 MB)
            </Button>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}
