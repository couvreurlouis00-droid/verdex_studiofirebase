'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { LineChart, Line, ResponsiveContainer, YAxis } from 'recharts';
import { cn } from '@/lib/utils';
import { getCurrentVDXPrice } from '@/lib/price-utils';

const PriceWidget = () => {
  const [price, setPrice] = useState<number | null>(null);
  const [history, setHistory] = useState<number[]>([]);

  useEffect(() => {
    // Initialisation
    const initialPrice = getCurrentVDXPrice();
    setPrice(initialPrice);
    setHistory(Array.from({ length: 20 }, (_, i) => initialPrice - (Math.random() * 0.002)));

    const interval = setInterval(() => {
      const newPrice = getCurrentVDXPrice();
      setPrice(newPrice);
      setHistory(prev => [...prev.slice(1), newPrice]);
    }, 2000); // Mise à jour toutes les 2 secondes
    return () => clearInterval(interval);
  }, []);

  if (price === null) return null;

  const chartData = history.map((val, i) => ({ time: i, value: val }));

  return (
    <Card className="col-span-1 md:col-span-2 bg-secondary/50 border-border">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <span className="font-code text-[10px] text-muted-foreground uppercase tracking-wider">1 VDX / USD</span>
        <div className="flex items-center gap-2 text-primary">
          <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
          <span className="font-code text-[10px] font-bold">LIVE GLOBAL PRICE</span>
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-4xl font-headline font-bold mb-4 tracking-tighter">
          ${price.toFixed(4)}
        </div>
        <div className="h-20 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData}>
              <Line type="monotone" dataKey="value" stroke="hsl(var(--primary))" strokeWidth={2} dot={false} isAnimationActive={false} />
              <YAxis hide domain={['dataMin - 0.001', 'dataMax + 0.001']} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

const MetricCard = ({ title, value, sub, colorClass }: { title: string; value: string; sub: string; colorClass?: string }) => (
  <Card className="bg-secondary/50 border-border">
    <CardHeader className="pb-2">
      <span className="font-code text-[10px] text-muted-foreground uppercase tracking-wider">{title}</span>
    </CardHeader>
    <CardContent>
      <div className={cn("text-3xl font-headline font-bold mb-1", colorClass)}>
        {value}
      </div>
      <div className="font-code text-[10px] text-muted-foreground uppercase">{sub}</div>
    </CardContent>
  </Card>
);

export const Dashboard: React.FC = () => {
  const [metrics, setMetrics] = useState({ tps: 0, co2: 0 });
  const [txHashes, setTxHashes] = useState<string[]>([]);

  useEffect(() => {
    // Generate random hashes only on the client to avoid hydration mismatch
    setTxHashes([...Array(5)].map(() => `0x....${Math.random().toString(16).slice(2, 6)}`));

    const interval = setInterval(() => {
      setMetrics({
        tps: Math.floor(Math.random() * 5) + 2,
        co2: Number((Math.random() * 0.1 + 0.75).toFixed(2))
      });
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="dashboard" className="py-24 bg-background">
      <div className="container mx-auto px-6">
        <div className="mb-12">
          <span className="font-code text-xs text-primary uppercase tracking-widest mb-4 block">
            Dashboard
          </span>
          <h2 className="font-headline font-bold text-4xl md:text-5xl mb-6">
            Protocol at a <em className="font-body italic font-light text-primary">glance</em>
          </h2>
          <div className="inline-flex items-center gap-2 bg-accent/10 border border-accent/20 px-3 py-1 rounded-md text-accent font-code text-[10px]">
            <span>✓ Synchronized with Global Oracle feed.</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <PriceWidget />
          <MetricCard title="Network TPS (Waitlist)" value={metrics.tps.toString()} sub="transactions / second" />
          <MetricCard title="CO₂ Offset" value={`${metrics.co2} kg`} sub="metric tonnes this epoch" colorClass="text-primary" />
          <MetricCard title="Staking APY (Forecast)" value="12.4%" sub="estimated annual yield" />
          <MetricCard title="Active Nodes" value="COMING SOON" sub="validators online" colorClass="text-muted-foreground" />
          
          <Card className="col-span-1 md:col-span-3 bg-secondary/50 border-border">
             <CardHeader className="flex flex-row items-center justify-between pb-2">
                <span className="font-code text-[10px] text-muted-foreground uppercase tracking-wider">Recent Transactions</span>
                <span className="font-code text-[10px] text-muted-foreground">COMING SOON</span>
             </CardHeader>
             <CardContent>
                <div className="overflow-x-auto">
                   <table className="w-full text-left font-code text-xs">
                      <thead>
                        <tr className="border-b border-border text-muted-foreground uppercase">
                           <th className="pb-3 px-2">Hash</th>
                           <th className="pb-3 px-2">Type</th>
                           <th className="pb-3 px-2">Amount</th>
                           <th className="pb-3 px-2">CO₂</th>
                           <th className="pb-3 px-2">Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {(txHashes.length > 0 ? txHashes : [...Array(5)].map(() => '0x....----')).map((hash, i) => (
                          <tr key={i} className="border-b border-border/50 opacity-20">
                            <td className="py-4 px-2">{hash}</td>
                            <td className="py-4 px-2">Transfer</td>
                            <td className="py-4 px-2">---</td>
                            <td className="py-4 px-2">---</td>
                            <td className="py-4 px-2">Pending</td>
                          </tr>
                        ))}
                      </tbody>
                   </table>
                </div>
             </CardContent>
          </Card>

          <Card className="bg-secondary/50 border-border flex flex-col items-center justify-center p-8">
            <div className="relative w-32 h-32 mb-4">
              <svg viewBox="0 0 120 120" className="w-full h-full transform -rotate-90">
                <circle cx="60" cy="60" r="50" fill="none" stroke="hsl(var(--border))" strokeWidth="8" />
                <circle cx="60" cy="60" r="50" fill="none" stroke="hsl(var(--primary))" strokeWidth="8" 
                  strokeDasharray="314" strokeDashoffset="31" strokeLinecap="round" className="animate-in fade-in duration-1000" />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center rotate-90">
                <span className="font-headline font-bold text-3xl text-primary">92</span>
                <span className="font-code text-[10px] text-muted-foreground uppercase">/100</span>
              </div>
            </div>
            <div className="text-center">
              <span className="font-code text-[10px] text-muted-foreground uppercase tracking-wider">Green Score</span>
              <p className="text-[10px] text-muted-foreground mt-2">Protocol sustainability index</p>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
};
