'use client';

import React from 'react';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { useTranslation } from '@/lib/i18n';

export const Roadmap: React.FC = () => {
  const { t } = useTranslation();

  const roadmapData = [
    {
      phase: 'Phase 01 · Q4 2023',
      title: t.roadmap.phases.p1,
      items: ['Whitepaper published', 'Core team assembled', 'Carbon Oracle v0.1 prototype'],
      status: t.roadmap.status.completed,
      current: false
    },
    {
      phase: 'Phase 02 · Q2 2024',
      title: t.roadmap.phases.p2,
      items: ['PoG consensus mechanism deployed', '1,200 alpha validators onboarded', 'Green Sharding spec finalized'],
      status: t.roadmap.status.completed,
      current: false
    },
    {
      phase: 'Phase 03 · Q1–Q2 2025',
      title: t.roadmap.phases.p3,
      items: ['Public testnet open', 'IoT sensor network integration', 'EVM compatibility bridge', 'Developer grants programme launched'],
      status: t.roadmap.status.progress,
      current: true
    },
    {
      phase: 'Phase 04 · Q3 2025',
      title: t.roadmap.phases.p4,
      items: ['VDX token generation event (TGE)', 'CEX & DEX listings', 'Governance DAO activated', '10,000 validator target'],
      status: t.roadmap.status.upcoming,
      current: false
    },
    {
      phase: 'Phase 05 · Q4 2025–2026',
      title: t.roadmap.phases.p5,
      items: ['Cross-chain bridges (ETH, SOL, AVAX)', 'Verdex DeFi suite launch', '100M+ trees tracked on-chain', 'UN partnership for climate data'],
      status: t.roadmap.status.upcoming,
      current: false
    }
  ];

  return (
    <section id="roadmap" className="py-24 bg-secondary/10">
      <div className="container mx-auto px-6">
        <div className="mb-16">
          <span className="font-code text-xs text-primary uppercase tracking-widest mb-4 block">
            {t.roadmap.tag}
          </span>
          <h2 className="font-headline font-bold text-4xl md:text-5xl">
            {t.roadmap.title} <em className="font-body italic font-light text-primary">{t.roadmap.titleItalic}</em>
          </h2>
        </div>

        <div className="relative pl-12 border-l-2 border-border space-y-12">
          {roadmapData.map((item, idx) => (
            <div key={idx} className="relative group">
              <div className={cn(
                "absolute -left-[58px] top-6 w-5 h-5 rounded-full border-2 border-background",
                item.status === t.roadmap.status.completed ? 'bg-primary' : item.current ? 'bg-primary animate-ping' : 'bg-border'
              )} />
              {item.current && <div className="absolute -left-[58px] top-6 w-5 h-5 rounded-full bg-primary" />}
              
              <div className={cn(
                "bg-secondary/40 border border-border rounded-2xl p-8 transition-all duration-300",
                item.current && "border-primary bg-primary/5",
                "group-hover:border-primary/50"
              )}>
                <div className="font-code text-[10px] text-muted-foreground uppercase tracking-widest mb-2">
                  {item.phase}
                </div>
                <h3 className="font-headline font-bold text-2xl mb-6 flex items-center gap-4">
                  {item.title}
                  {item.current && <Badge className="bg-primary text-background">Current</Badge>}
                </h3>
                <ul className="space-y-3">
                  {item.items.map((li, i) => (
                    <li key={i} className="text-sm text-muted-foreground flex gap-3">
                      <span className="text-primary font-bold">{item.status === t.roadmap.status.completed ? '✓' : '–'}</span>
                      {li}
                    </li>
                  ))}
                </ul>
                <div className="mt-8">
                   <Badge variant={item.status === t.roadmap.status.completed ? 'default' : item.current ? 'secondary' : 'outline'} className="font-code text-[9px] uppercase tracking-wider">
                     {item.status}
                   </Badge>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
