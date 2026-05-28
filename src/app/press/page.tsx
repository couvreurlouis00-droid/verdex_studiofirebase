import React from 'react';
import { Navbar } from '@/components/sections/Navbar';
import { Footer } from '@/components/sections/Footer';
import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';

export default function PressPage() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <section className="pt-32 pb-24 container mx-auto px-6 max-w-4xl">
        <h1 className="font-headline font-bold text-5xl mb-8">Press <span className="text-primary italic font-body font-light">Kit</span></h1>
        <p className="text-xl text-muted-foreground mb-12">Assets and information for journalists and media partners.</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <div className="p-8 bg-secondary/30 border border-border rounded-3xl">
            <h3 className="text-xl font-bold mb-4">Brand Identity</h3>
            <p className="text-sm text-muted-foreground mb-6">Logos, color palettes, and typography guidelines in various formats.</p>
            <Button variant="outline" size="sm" className="w-full">
              <Download className="mr-2 w-4 h-4" /> Download Assets
            </Button>
          </div>
          <div className="p-8 bg-secondary/30 border border-border rounded-3xl">
            <h3 className="text-xl font-bold mb-4">Executive Photos</h3>
            <p className="text-sm text-muted-foreground mb-6">High-resolution portraits of the Verdex leadership team.</p>
            <Button variant="outline" size="sm" className="w-full">
              <Download className="mr-2 w-4 h-4" /> Download Gallery
            </Button>
          </div>
        </div>
        
        <div className="prose prose-invert">
          <h3 className="text-2xl font-bold text-foreground">Media Contact</h3>
          <p className="text-muted-foreground">For all media inquiries, please reach out to: <span className="text-primary">press@greenchain.xyz</span></p>
        </div>
      </section>
      <Footer />
    </main>
  );
}
