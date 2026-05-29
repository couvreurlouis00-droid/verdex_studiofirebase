'use client';

import React from 'react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

const faqs = [
  {
    q: "Why is the SOL contribution so low compared to the estimated VDX value?",
    a: "We are currently in the critical Phase 3 fundraising stage with a $500,000 goal to finalize our IoT sensor infrastructure and mainnet readiness. To reward our earliest pioneers and ensure rapid network decentralization, we are offering the Genesis allocation at a significant protocol-incentivized discount. This 'early-backer advantage' allows you to secure a substantial stake (e.g., 50k VDX for 2.5 SOL) before the public market listing and price discovery occur."
  },
  {
    q: "What is Proof-of-Growth consensus?",
    a: "Proof-of-Growth (PoG) is Verdex's novel consensus mechanism where validators must stake VDX tokens and maintain a verified carbon sequestration footprint. Block rewards are weighted by a validator's verified ecological impact score, creating a direct financial incentive for environmental restoration."
  },
  {
    q: "How are carbon offsets verified?",
    a: "Verdex's Carbon Oracle network ingests data from a consortium of IoT forest sensors, satellite imaging partners (Sentinel-2, Landsat), and certified carbon registries. All data sources are cryptographically attested before being anchored on-chain."
  },
  {
    q: "Is VDX compatible with Ethereum?",
    a: "Yes. Verdex implements a full EVM-compatible execution environment (Verdex EVM), meaning any Solidity smart contract can be deployed without modification. A canonical bridge to Ethereum mainnet will launch with Phase 4."
  },
  {
    q: "Who can become a validator?",
    a: "Any entity staking a minimum of 10,000 VDX tokens can apply to become a validator. Additionally, validators running their infrastructure on certified renewable energy receive a 20% boost to their staking rewards."
  },
  {
    q: "What is the Genesis Airdrop?",
    a: "5% of the total VDX supply (50M tokens) is reserved for the Genesis Airdrop, distributed to early testnet participants, environmental DAO members, and climate-focused DeFi users. Eligibility is determined by on-chain activity snapshots."
  }
];

export const FAQ: React.FC = () => {
  return (
    <section id="faq" className="py-24 bg-background">
      <div className="container mx-auto px-6 max-w-4xl">
        <div className="text-center mb-16">
          <span className="font-code text-xs text-primary uppercase tracking-widest mb-4 block">
            Questions
          </span>
          <h2 className="font-headline font-bold text-4xl md:text-5xl">
            Frequently <em className="font-body italic font-light text-primary">asked</em>
          </h2>
        </div>

        <Accordion type="single" collapsible className="space-y-4">
          {faqs.map((faq, idx) => (
            <AccordionItem key={idx} value={`item-${idx}`} className="border border-border rounded-xl bg-secondary/30 px-6 data-[state=open]:border-primary/50 transition-colors">
              <AccordionTrigger className="font-headline font-bold text-lg hover:no-underline text-left py-6">
                {faq.q}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground text-sm leading-relaxed pb-6">
                {faq.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
};
