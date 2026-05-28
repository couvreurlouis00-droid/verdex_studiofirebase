import React from 'react';
import { Navbar } from '@/components/sections/Navbar';
import { Footer } from '@/components/sections/Footer';
import { ShieldCheck, CheckCircle2 } from 'lucide-react';

export default function AuditsPage() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <section className="pt-32 pb-24 container mx-auto px-6 max-w-4xl">
        <h1 className="font-headline font-bold text-5xl mb-8">Security <span className="text-primary italic font-body font-light">Audits</span></h1>
        <p className="text-xl text-muted-foreground mb-12">Verdex undergoes continuous security reviews from the world's leading blockchain security firms.</p>
        
        <div className="space-y-6">
          {[
            { firm: "CertiK", focus: "Smart Contracts", status: "Passed", date: "Jan 2025" },
            { firm: "Quantstamp", focus: "Consensus Layer", status: "Passed", date: "Nov 2024" },
            { firm: "Trail of Bits", focus: "Oracle Infrastructure", status: "In Progress", date: "Scheduled" }
          ].map((audit, i) => (
            <div key={i} className="flex items-center justify-between p-8 bg-secondary/30 border border-border rounded-2xl">
              <div className="flex items-center gap-4">
                <ShieldCheck className="w-8 h-8 text-primary" />
                <div>
                  <h3 className="font-headline font-bold text-xl">{audit.firm}</h3>
                  <p className="text-sm text-muted-foreground">{audit.focus}</p>
                </div>
              </div>
              <div className="text-right">
                <div className="flex items-center gap-2 text-primary font-bold">
                  {audit.status === "Passed" && <CheckCircle2 className="w-5 h-5" />}
                  {audit.status}
                </div>
                <p className="text-xs text-muted-foreground">{audit.date}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
      <Footer />
    </main>
  );
}
