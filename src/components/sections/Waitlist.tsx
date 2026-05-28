'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Hexagon, Loader2 } from 'lucide-react';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { useFirestore } from '@/firebase';
import { errorEmitter } from '@/firebase/error-emitter';
import { FirestorePermissionError } from '@/firebase/errors';

export const Waitlist: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const firestore = useFirestore();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    const formData = new FormData(e.currentTarget);
    const name = formData.get('name') as string;
    const email = formData.get('email') as string;
    const role = formData.get('role') as string;
    const walletAddress = formData.get('walletAddress') as string;
    const agreed = formData.get('agree');

    if (!agreed) return alert('Please accept the terms.');
    if (!name || !email) return setError('Veuillez remplir les champs obligatoires.');

    setLoading(true);

    const data = {
      name,
      email,
      role: role || 'retail',
      walletAddress: walletAddress || null,
      createdAt: serverTimestamp(),
    };

    const waitlistRef = collection(firestore, 'waitlist');
    
    addDoc(waitlistRef, data)
      .catch(async (err) => {
        const permissionError = new FirestorePermissionError({
          path: waitlistRef.path,
          operation: 'create',
          requestResourceData: data,
        });
        errorEmitter.emit('permission-error', permissionError);
      });

    router.push('/payment');
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
                Rejoignez plus de 14 250 adoptants précoces sécurisant leur place dans la cohorte Genesis.
                Les membres de la liste d'attente reçoivent une allocation prioritaire et des récompenses exclusives.
              </p>
            </div>

            <ul className="space-y-4">
              {[
                'Allocation prioritaire Genesis (2 000 VDX)',
                'Caution de validateur réduite (–25%)',
                'Badge NFT Validateur Fondateur',
                'Accès à la bêta privée du testnet',
                'Place garantie dans les 20k premiers membres'
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
                  J'accepte les conditions et je consens à payer les frais de traitement prioritaire.
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
