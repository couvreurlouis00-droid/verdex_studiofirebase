'use client';

import React from 'react';
import { ShieldCheck, Users, Globe, Zap } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const criteria = [
  {
    icon: <ShieldCheck className="w-8 h-8 text-primary" />,
    title: 'Active Wallet',
    description: 'Any blockchain wallet (Solana, Ethereum, or EVM-compatible) with at least one transaction in the last 6 months qualifies.'
  },
  {
    icon: <Globe className="w-8 h-8 text-primary" />,
    title: 'Eco-Commitment',
    description: 'By joining our waitlist, you automatically declare your interest in regenerative finance, meeting our primary community criteria.'
  },
  {
    icon: <Users className="w-8 h-8 text-primary" />,
    title: 'Early Adopter',
    description: 'The first 20,000 members of the Verdex waitlist are guaranteed a spot in the Genesis Phase 1 Airdrop.'
  },
  {
    icon: <Zap className="w-8 h-8 text-primary" />,
    title: 'Network Participation',
    description: 'Following our social channels and staying updated on the Phase 3 roadmap ensures your long-term eligibility.'
  }
];

export const EligibilityCriteria: React.FC = () => {
  return (
    <section id="criteria" className="py-24 bg-secondary/20">
      <div className="container mx-auto px-6 max-w-5xl">
        <div className="text-center mb-16">
          <span className="font-code text-xs text-primary uppercase tracking-widest mb-4 block">
            Qualification
          </span>
          <h2 className="font-headline font-bold text-4xl md:text-5xl mb-6">
            How to qualify for <em className="font-body italic font-light text-primary">Genesis VDX</em>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Verdex values participation over capital. Our goal is to distribute the protocol as widely as possible to early pioneers of regenerative finance.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {criteria.map((item, idx) => (
            <Card key={idx} className="bg-background/50 border-border hover:border-primary/50 transition-all duration-300">
              <CardContent className="p-8 flex gap-6">
                <div className="shrink-0">
                  {item.icon}
                </div>
                <div>
                  <h3 className="font-headline font-bold text-xl mb-2">{item.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-16 p-8 bg-primary/5 border border-primary/20 rounded-3xl text-center">
          <h4 className="font-headline font-bold text-2xl mb-2">Maximum Inclusivity</h4>
          <p className="text-muted-foreground">
            If you can see this page and have a wallet address, you are likely already eligible. Simply register below to secure your <span className="text-primary font-bold">2,000 VDX</span> allocation.
          </p>
        </div>
      </div>
    </section>
  );
};
