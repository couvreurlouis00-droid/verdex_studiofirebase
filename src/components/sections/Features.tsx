'use client';

import React from 'react';
import { Diamond, Hexagon, PlusCircle } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { useTranslation } from '@/lib/i18n';

export const Features: React.FC = () => {
  const { t } = useTranslation();

  const features = [
    {
      icon: <Diamond className="w-8 h-8 text-primary" />,
      title: t.features.item1Title,
      description: t.features.item1Desc,
      tag: t.features.layers.consensus
    },
    {
      icon: <Hexagon className="w-8 h-8 text-primary" />,
      title: t.features.item2Title,
      description: t.features.item2Desc,
      tag: t.features.layers.network
    },
    {
      icon: <PlusCircle className="w-8 h-8 text-primary" />,
      title: t.features.item3Title,
      description: t.features.item3Desc,
      tag: t.features.layers.data
    }
  ];

  return (
    <section id="features" className="py-24 bg-gradient-to-b from-background to-secondary/30">
      <div className="container mx-auto px-6">
        <div className="mb-16">
          <span className="font-code text-xs text-primary uppercase tracking-widest mb-4 block">
            {t.features.tag}
          </span>
          <h2 className="font-headline font-bold text-4xl md:text-5xl">
            {t.features.title} <em className="font-body italic font-light text-primary">{t.features.titleItalic}</em> {t.features.titleEnd}
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
