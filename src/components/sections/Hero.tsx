'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { BlockchainCanvas } from '@/components/BlockchainCanvas';
import { useTranslation } from '@/lib/i18n';

const StatItem = ({ target, label, unit }: { target: number; label: string; unit?: string }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTime: number;
    const duration = 2000;
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      setCount(progress * target);
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [target]);

  return (
    <div className="px-8 text-center">
      <span className="block font-headline font-bold text-3xl md:text-4xl text-primary">
        {target % 1 === 0 ? Math.floor(count).toLocaleString() : count.toFixed(3)}
        {unit && <span className="text-xl ml-1">{unit}</span>}
      </span>
      <span className="block font-code text-[10px] text-muted-foreground uppercase tracking-widest mt-1">
        {label}
      </span>
    </div>
  );
};

export const Hero: React.FC = () => {
  const { t } = useTranslation();
  // Static waitlist count as requested
  const waitlistCount = 14678;

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-32 pb-20">
      <BlockchainCanvas />
      <div className="hero-noise" />

      <div className="container relative z-10 mx-auto px-6 text-center">
        <div className="inline-flex items-center gap-2 bg-secondary border border-border px-4 py-2 rounded-full mb-8 animate-in fade-in slide-in-from-bottom duration-700">
          <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
          <span className="font-code text-xs text-primary font-medium tracking-tight">
            {t.hero.tag}
          </span>
        </div>

        <h1 className="font-headline font-bold text-5xl md:text-7xl lg:text-8xl leading-[1.1] mb-8 text-foreground animate-in fade-in slide-in-from-bottom duration-1000">
          <span className="block">{t.hero.title1}</span>
          <span className="block italic text-primary font-body font-light">{t.hero.title2}</span>
          <span className="block">{t.hero.title3}</span>
        </h1>

        <p className="max-w-2xl mx-auto text-lg md:text-xl text-muted-foreground mb-12 animate-in fade-in slide-in-from-bottom duration-1000 delay-200">
          {t.hero.desc}
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-20 animate-in fade-in slide-in-from-bottom duration-1000 delay-300">
          <Button size="lg" className="px-10 h-14 text-lg font-bold" asChild>
            <Link href="#waitlist">{t.hero.cta1}</Link>
          </Button>
          <Button variant="outline" size="lg" className="px-10 h-14 text-lg font-bold border-primary text-primary hover:bg-primary/10" asChild>
            <Link href="#token">{t.hero.cta2}</Link>
          </Button>
        </div>

        <div className="flex flex-wrap items-center justify-center bg-secondary/50 border border-border rounded-3xl p-8 backdrop-blur-sm animate-in fade-in slide-in-from-bottom duration-1000 delay-500">
          <StatItem target={waitlistCount} label={t.hero.stat1} />
          <div className="hidden md:block w-px h-12 bg-border" />
          <StatItem target={98} label={t.hero.stat2} unit="%" />
          <div className="hidden md:block w-px h-12 bg-border" />
          <StatItem target={0.001} label={t.hero.stat3} unit="s" />
        </div>
      </div>

      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 animate-bounce opacity-40">
        <span className="font-code text-[10px] uppercase tracking-widest">Scroll</span>
        <div className="w-px h-10 bg-gradient-to-b from-primary to-transparent" />
      </div>
    </section>
  );
};
