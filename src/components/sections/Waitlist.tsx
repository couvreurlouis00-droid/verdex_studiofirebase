
'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { joinWaitlistAction } from '@/app/actions';
import { Hexagon, Loader2 } from 'lucide-react';

export const Waitlist: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    const formData = new FormData(e.currentTarget);
    const agreed = formData.get('agree');
    if (!agreed) return alert('Please accept the terms.');

    setLoading(true);
    try {
      const res = await joinWaitlistAction(formData);
      if (res.success) {
        // Redirection as requested
        router.push('/payment');
      }
    } catch (e: any) {
      console.error(e);
      setError(e.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="waitlist" className="py-24 bg-gradient-to-t from-background to-secondary/30">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          <div className="space-y-8">
            <div>
              <span className="font-code text-xs text-primary uppercase tracking-widest mb-4 block">
                Early Access
              </span>
              <h2 className="font-headline font-bold text-4xl md:text-6xl mb-6">
                Be first to <em className="font-body italic font-light text-primary">grow</em>
              </h2>
              <p className="text-lg text-muted-foreground max-w-lg">
                Join 14,250+ early adopters securing their spot in the Verdex Genesis cohort. 
                Waitlist members receive priority allocation and exclusive rewards.
              </p>
            </div>

            <ul className="space-y-4">
              {[
                'Priority Genesis Airdrop allocation (500 VDX)',
                'Reduced validator bond (–25%)',
                'Founding Validator NFT badge',
                'Access to private testnet beta',
                'Guaranteed spot in the first 20k members'
              ].map((perk, i) => (
                <li key={i} className="flex items-center gap-3 text-sm text-muted-foreground">
                  <span className="text-primary font-bold">✓</span> {perk}
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-secondary/50 border border-border rounded-3xl p-10 backdrop-blur-sm shadow-2xl relative overflow-hidden">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="name" className="font-code text-[10px] uppercase tracking-widest text-muted-foreground">Full Name</Label>
                <Input id="name" name="name" required placeholder="Satoshi Nakamoto" className="bg-background border-border h-12" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email" className="font-code text-[10px] uppercase tracking-widest text-muted-foreground">Email Address</Label>
                <Input id="email" name="email" type="email" required placeholder="you@greenchain.xyz" className="bg-background border-border h-12" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="walletAddress" className="font-code text-[10px] uppercase tracking-widest text-muted-foreground">Wallet Address (Optional)</Label>
                <Input id="walletAddress" name="walletAddress" placeholder="0x..." className="bg-background border-border h-12" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="role" className="font-code text-[10px] uppercase tracking-widest text-muted-foreground">I'm interested as a</Label>
                <Select name="role" defaultValue="retail">
                  <SelectTrigger className="bg-background border-border h-12">
                    <SelectValue placeholder="Select your role…" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="validator">Validator / Node Operator</SelectItem>
                    <SelectItem value="dev">DeFi Developer</SelectItem>
                    <SelectItem value="buyer">Carbon Credit Buyer</SelectItem>
                    <SelectItem value="investor">Institutional Investor</SelectItem>
                    <SelectItem value="org">Environmental Organisation</SelectItem>
                    <SelectItem value="retail">Retail Investor</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-start gap-3 py-2">
                <Checkbox id="agree" name="agree" required className="mt-1" />
                <Label htmlFor="agree" className="text-xs text-muted-foreground leading-relaxed cursor-pointer">
                  I accept the terms and conditions and agree to pay the priority processing fee.
                </Label>
              </div>
              
              {error && <p className="text-destructive text-xs font-code">{error}</p>}

              <Button size="lg" className="w-full h-14 font-bold text-lg" disabled={loading}>
                {loading ? <Loader2 className="animate-spin mr-2" /> : 'Secure My Spot →'}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};
