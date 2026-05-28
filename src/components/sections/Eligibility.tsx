'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { checkEligibilityAction } from '@/app/actions';
import { CheckCircle, XCircle, Loader2 } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

export const Eligibility: React.FC = () => {
  const [wallet, setWallet] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);

  const handleCheck = async () => {
    if (!wallet) return;
    setLoading(true);
    try {
      const res = await checkEligibilityAction(wallet);
      setResult(res);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const tryExample = (addr: string) => {
    setWallet(addr);
  };

  return (
    <section id="eligibility" className="py-24 bg-secondary/20">
      <div className="container mx-auto px-6 max-w-3xl text-center">
        <span className="font-code text-xs text-primary uppercase tracking-widest mb-4 block">
          Genesis Drop
        </span>
        <h2 className="font-headline font-bold text-4xl md:text-5xl mb-6">
          Check your <em className="font-body italic font-light text-primary">eligibility</em>
        </h2>
        <p className="text-muted-foreground mb-12">
          See if your wallet qualifies for the Genesis VDX airdrop. 
          Our AI-powered validator analyzes your on-chain footprint.
        </p>

        <div className="bg-background/50 border border-border p-8 rounded-3xl shadow-xl">
          <div className="flex flex-col md:flex-row gap-4 mb-8">
            <Input
              value={wallet}
              onChange={(e) => setWallet(e.target.value)}
              placeholder="0x... or ENS name"
              className="font-code h-14 bg-secondary/50 border-border"
            />
            <Button 
              size="lg" 
              className="h-14 px-10 font-bold" 
              disabled={loading}
              onClick={handleCheck}
            >
              {loading ? <Loader2 className="animate-spin mr-2" /> : 'Check →'}
            </Button>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
            <span className="font-code text-[10px] text-muted-foreground uppercase tracking-widest">Try:</span>
            {['vitalik.eth', '0xAb58...eC9B', 'green-dev.eth'].map((ex) => (
              <button
                key={ex}
                onClick={() => tryExample(ex)}
                className="font-code text-[10px] text-primary hover:underline border border-primary/20 bg-primary/5 px-2 py-1 rounded"
              >
                {ex}
              </button>
            ))}
          </div>

          {result && (
            <div className="animate-in fade-in slide-in-from-top-4 duration-500 text-left border-t border-border pt-8">
              <div className="flex items-center gap-4 mb-6">
                {result.isEligible ? (
                  <CheckCircle className="w-12 h-12 text-primary" />
                ) : (
                  <XCircle className="w-12 h-12 text-destructive" />
                )}
                <div>
                  <h3 className="font-headline font-bold text-2xl">
                    {result.isEligible ? 'Eligible for Airdrop!' : 'Not Eligible'}
                  </h3>
                  <p className="text-sm text-muted-foreground">Analysis result for {wallet}</p>
                </div>
              </div>

              {result.isEligible && (
                <div className="bg-primary/5 border border-primary/20 rounded-xl p-4 mb-6 text-center">
                  <div className="font-code text-2xl font-bold text-primary">{result.allocatedVDX} VDX</div>
                  <div className="font-code text-[10px] text-muted-foreground">ESTIMATED VALUE: ~${result.estimatedUSDValue}</div>
                </div>
              )}

              <div className="space-y-6">
                <div>
                  <h4 className="font-headline font-semibold text-sm uppercase tracking-wider mb-2 text-muted-foreground">Feedback</h4>
                  <p className="text-sm text-foreground leading-relaxed italic border-l-2 border-primary pl-4">
                    {result.feedbackMessage}
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-headline font-semibold text-sm uppercase tracking-wider mb-2 text-muted-foreground">Reasons</h4>
                    <ul className="space-y-2">
                      {result.reasons.map((r: string, i: number) => (
                        <li key={i} className="text-xs text-muted-foreground flex gap-2">
                          <span className="text-primary tracking-tighter">●</span> {r}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-headline font-semibold text-sm uppercase tracking-wider mb-2 text-muted-foreground">Next Steps</h4>
                    <ul className="space-y-2">
                      {result.suggestions.map((s: string, i: number) => (
                        <li key={i} className="text-xs text-muted-foreground flex gap-2">
                          <span className="text-accent tracking-tighter">▸</span> {s}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};