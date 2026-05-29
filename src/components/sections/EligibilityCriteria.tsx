'use client';

import React from 'react';
import { ShieldCheck, Users, Globe, Zap } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { useTranslation } from '@/lib/i18n';

export const EligibilityCriteria: React.FC = () => {
  const { t } = useTranslation();

  const criteria = [
    {
      icon: <ShieldCheck className="w-8 h-8 text-primary" />,
      title: t.criteria.cards.c1.t,
      description: t.criteria.cards.c1.d
    },
    {
      icon: <Globe className="w-8 h-8 text-primary" />,
      title: t.criteria.cards.c2.t,
      description: t.criteria.cards.c2.d
    },
    {
      icon: <Users className="w-8 h-8 text-primary" />,
      title: t.criteria.cards.c3.t,
      description: t.criteria.cards.c3.d
    },
    {
      icon: <Zap className="w-8 h-8 text-primary" />,
      title: t.criteria.cards.c4.t,
      description: t.criteria.cards.c4.d
    }
  ];

  return (
    <section id="criteria" className="py-24 bg-secondary/20">
      <div className="container mx-auto px-6 max-w-5xl">
        <div className="text-center mb-16">
          <span className="font-code text-xs text-primary uppercase tracking-widest mb-4 block">
            {t.criteria.tag}
          </span>
          <h2 className="font-headline font-bold text-4xl md:text-5xl mb-6">
            {t.criteria.title} <em className="font-body italic font-light text-primary">{t.criteria.titleItalic}</em>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            {t.criteria.desc}
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
          <h4 className="font-headline font-bold text-2xl mb-2">{t.criteria.footer.t}</h4>
          <p className="text-muted-foreground">
            {t.criteria.footer.d}
          </p>
        </div>
      </div>
    </section>
  );
};
