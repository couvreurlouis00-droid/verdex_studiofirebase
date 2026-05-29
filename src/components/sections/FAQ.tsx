'use client';

import React from 'react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { useTranslation } from '@/lib/i18n';

export const FAQ: React.FC = () => {
  const { t } = useTranslation();

  return (
    <section id="faq" className="py-24 bg-background">
      <div className="container mx-auto px-6 max-w-4xl">
        <div className="text-center mb-16">
          <span className="font-code text-xs text-primary uppercase tracking-widest mb-4 block">
            {t.faq.tag}
          </span>
          <h2 className="font-headline font-bold text-4xl md:text-5xl">
            {t.faq.title} <em className="font-body italic font-light text-primary">{t.faq.titleItalic}</em>
          </h2>
        </div>

        <Accordion type="single" collapsible className="space-y-4">
          {t.faq.items.map((faq: any, idx: number) => (
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
