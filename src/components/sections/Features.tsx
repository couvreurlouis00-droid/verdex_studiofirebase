'use client';

import React from 'react';
import { Diamond, Hexagon, PlusCircle } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const features = [
  {
    icon: <Diamond className="w-8 h-8 text-primary" />,
    title: 'Proof-of-Growth',
    description: 'Validators are rewarded proportionally to verified carbon sequestration data sourced from IoT forest sensors and satellite imaging.',
    tag: 'Consensus Layer'
  },
  {
    icon: <Hexagon className="w-8 h-8 text-primary" />,
    title: 'Green Sharding',
    description: 'Dynamic sharding algorithm routes computation to data centers powered by 100% renewable energy, verified on-chain in real time.',
    tag: 'Network Layer'
  },
  {
    icon: <PlusCircle className="w-8 h-8 text-primary" />,
    title: 'Carbon Oracle',
    description: 'Decentralised oracle network aggregates 14,000+ climate data points per second, anchoring every block to a live environmental state.',
    tag: 'Data Layer'
  }
];

export const Features: React.FC = () => {
  return (
    <section id="features" className="py-24 bg-gradient-to-b from-background to-secondary/30">
      <div className="container mx-auto px-6">
        <div className="mb-16">
          <span className="font-code text-xs text-primary uppercase tracking-widest mb-4 block">
            Protocol Architecture
          </span>
          <h2 className="font-headline font-bold text-4xl md:text-5xl">
            Three pillars of <em className="font-body italic font-light text-primary">regenerative</em> finance
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-0 border border-border rounded-3xl overflow-hidden shadow-2xl">
          {features.map((feature, idx) => (
            <Card key={idx} className="bg-background/50 border-0 rounded-none border-r last:border-r-0 hover:bg-secondary/40 transition-colors duration-300 group">
              <CardContent className="p-12">
                <div className="mb-8 transform group-hover:scale-110 transition-transform duration-300">
                  {feature.icon}
                </div>
                <h3 className="font-headline font-bold text-2xl mb-4">{feature.title}</h3>
                <p className="text-muted-foreground mb-8 text-sm leading-relaxed">
                  {feature.description}
                </p>
                <div className="inline-block px-3 py-1 bg-secondary border border-border rounded-full font-code text-[10px] text-primary uppercase tracking-wider">
                  {feature.tag}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};