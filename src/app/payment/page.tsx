'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Navbar } from '@/components/sections/Navbar';
import { Footer } from '@/components/sections/Footer';
import { Slider } from '@/components/ui/slider';
import { Label } from '@/components/ui/label';
import { AlertCircle, ShieldCheck, Zap, Loader2, CheckCircle2, TrendingUp, Info } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { getLiveWaitlistPercentage, getCurrentVDXPrice } from '@/lib/price-utils';
import { 
  Connection, 
  PublicKey, 
  Transaction, 
  SystemProgram, 
  LAMPORTS_PER_SOL 
} from '@solana/web3.js';

const DESTINATION_WALLET = "5caRrEq62WNwiDuvLUed8QxhqpJgLk11fBH4bHgE7yDG";
const MAX_SPOTS = 20000;
// 2000 VDX = 0.1 SOL -> 1 VDX = 0.00005 SOL
const VDX_TO_SOL_RATE = 0.1 / 2000; 
const RPC_ENDPOINT = "https://api.devnet.solana.com";

export default function PaymentPage() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [phantomInstalled, setPhantomInstalled] = useState(false);
  const [waitlistPercent, setWaitlistPercent] = useState(73);
  const [vdxAmount, setVdxAmount] = useState(2000);
  const [vdxPrice, setVdxPrice] = useState(0.05);
  const { toast } = useToast();

  useEffect(() => {
    setWaitlistPercent(getLiveWaitlistPercentage());
    setVdxPrice(getCurrentVDXPrice());
    const interval = setInterval(() => {
      setWaitlistPercent(getLiveWaitlistPercentage());
      setVdxPrice(getCurrentVDXPrice());
    }, 10000);

    if (typeof window !== 'undefined') {
      const isPhantomInstalled = (window as any).solana?.isPhantom;
      setPhantomInstalled(!!isPhantomInstalled);
    }
    return () => clearInterval(interval);
  }, []);

  const solAmount = Number((vdxAmount * VDX_TO_SOL_RATE).toFixed(4));
  const estimatedUsdValue = Number((vdxAmount * vdxPrice).toFixed(2));

  const handlePhantomPayment = async () => {
    if (!phantomInstalled) {
      toast({
        variant: "destructive",
        title: "Phantom not detected",
        description: "Please install the Phantom extension to continue.",
      });
      return;
    }

    setLoading(true);
    try {
      const provider = (window as any).solana;
      const resp = await provider.connect();
      const userPublicKey = resp.publicKey;
      const connection = new Connection(RPC_ENDPOINT, 'confirmed');

      const transaction = new Transaction().add(
        SystemProgram.transfer({
          fromPubkey: userPublicKey,
          toPubkey: new PublicKey(DESTINATION_WALLET),
          lamports: Math.round(solAmount * LAMPORTS_PER_SOL),
        })
      );

      const { blockhash, lastValidBlockHeight } = await connection.getLatestBlockhash();
      transaction.recentBlockhash = blockhash;
      transaction.feePayer = userPublicKey;

      const { signature } = await provider.signAndSendTransaction(transaction);
      
      const confirmation = await connection.confirmTransaction({
        signature,
        blockhash,
        lastValidBlockHeight
      });

      if (confirmation.value.err) throw new Error("Transaction confirmation failed.");

      setSuccess(true);
      toast({
        title: "Payment Successful!",
        description: "Transaction confirmed on the Solana blockchain.",
      });
    } catch (err: any) {
      console.error('Solana error:', err);
      toast({
        variant: "destructive",
        title: "Payment Error",
        description: "Transaction was canceled or failed.",
      });
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <main className="min-h-screen bg-background">
        <Navbar />
        <section className="pt-40 pb-20 container mx-auto px-6 max-w-3xl text-center">
          <div className="bg-secondary/30 border border-primary/50 p-12 rounded-3xl shadow-2xl animate-in zoom-in-95 duration-500">
            <div className="flex justify-center mb-6">
              <CheckCircle2 className="w-20 h-20 text-primary animate-bounce" />
            </div>
            <h1 className="font-headline font-bold text-4xl mb-4 text-foreground">Genesis Access Secured</h1>
            <p className="text-muted-foreground text-lg mb-8">
              Congratulations. Your transaction of <span className="text-primary font-bold">{solAmount} SOL</span> has been validated. 
              Your address is now registered for <span className="text-primary font-bold">{vdxAmount.toLocaleString()} VDX</span>.
            </p>
            <div className="p-4 bg-primary/5 border border-primary/20 rounded-xl mb-8 font-code text-xs text-primary">
              TRANSACTION ID: SECURED_GENESIS_VALIDATION_{Math.floor(Math.random() * 999)}
            </div>
            <Button size="lg" asChild className="font-bold px-12">
              <Link href="/">Back to Dashboard</Link>
            </Button>
          </div>
        </section>
        <Footer />
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      
      <section className="pt-32 pb-20 container mx-auto px-6 max-w-5xl">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 px-4 py-2 rounded-full mb-6">
            <Zap className="w-4 h-4 text-primary" />
            <span className="font-code text-xs text-primary font-medium uppercase tracking-tighter">On-Chain Validation Required</span>
          </div>
          <h1 className="font-headline font-bold text-4xl md:text-6xl mb-6">
            Secure Your <em className="font-body italic font-light text-primary">Genesis Allocation</em>
          </h1>
          
          <div className="max-w-xl mx-auto space-y-4">
            <div className="flex justify-between items-end mb-2">
              <span className="font-code text-xs text-muted-foreground uppercase tracking-widest">Early Access Status</span>
              <div className="text-right">
                <span className="font-headline font-bold text-xl text-primary">{waitlistPercent}%</span>
                <span className="text-muted-foreground text-sm"> Full</span>
              </div>
            </div>
            <Progress value={waitlistPercent} className="h-3 bg-secondary" />
            <p className="text-[10px] text-muted-foreground uppercase tracking-widest font-bold">
              High Demand: Filling at ~0.5% per day
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-start">
          <div className="lg:col-span-3 space-y-8">
            <Card className="bg-secondary/30 border-primary/20 shadow-2xl overflow-hidden">
              <CardHeader className="bg-gradient-to-br from-primary/5 to-transparent border-b border-border/50">
                <CardTitle className="text-2xl font-headline flex items-center gap-2">
                  <ShieldCheck className="text-primary w-6 h-6" /> 
                  Fundraising & Roadshow
                </CardTitle>
                <CardDescription className="text-foreground/80">
                  This Genesis Drop aims to raise <strong>$500,000</strong> to fund our Phase 3 development and expand our IoT forest sensor network. By joining now, you fuel the next stage of the Green-Chain Protocol.
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-8 space-y-6">
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <Label className="font-headline font-bold text-lg">Select VDX Amount</Label>
                    <span className="font-code text-primary font-bold text-xl">{vdxAmount.toLocaleString()} VDX</span>
                  </div>
                  <Slider 
                    defaultValue={[2000]} 
                    max={50000} 
                    min={2000} 
                    step={1000}
                    onValueChange={(vals) => setVdxAmount(vals[0])}
                    className="py-4"
                  />
                  <div className="flex justify-between text-[10px] text-muted-foreground uppercase font-code">
                    <span>2,000 VDX (Standard)</span>
                    <span>50,000 VDX (Whale Cap)</span>
                  </div>
                </div>

                <div className="p-4 bg-primary/5 border border-primary/20 rounded-xl flex items-start gap-3">
                  <Info className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                  <p className="text-xs leading-relaxed text-foreground/80">
                    2,000 VDX is the baseline pioneer allocation. Tokens are secured at the Genesis rate (2,000 VDX per 0.1 SOL) to support our $500k growth initiative.
                  </p>
                </div>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                { t: "Humanity Proof", d: "Eliminates bots via on-chain commitment." },
                { t: "Priority Access", d: "Join the Mainnet 48h before the public." },
                { t: "Staking Bonus", d: "+5% APY boost for Genesis members." }
              ].map((item, i) => (
                <div key={i} className="p-4 bg-secondary/20 border border-border rounded-xl">
                  <h4 className="font-bold text-xs mb-1 text-primary">{item.t}</h4>
                  <p className="text-[10px] text-muted-foreground leading-tight">{item.d}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-2">
            <Card className="bg-background border-primary shadow-2xl sticky top-24">
              <CardContent className="p-8 space-y-8">
                <div className="text-center space-y-2">
                  <span className="block font-code text-[10px] uppercase tracking-widest text-muted-foreground">Total to Secure</span>
                  <div className="flex items-center justify-center gap-3">
                    <span className="font-headline font-bold text-5xl text-primary">{solAmount}</span>
                    <span className="font-code text-2xl text-foreground">SOL</span>
                  </div>
                  <div className="inline-flex flex-col items-center gap-1 bg-secondary px-4 py-2 rounded-xl w-full">
                    <span className="text-[10px] font-code text-muted-foreground uppercase tracking-tighter">Est. Value at Public Launch</span>
                    <span className="text-sm font-bold text-primary">~${estimatedUsdValue} USD</span>
                  </div>
                </div>

                <div className="space-y-4">
                  <Button 
                    size="lg" 
                    className="w-full h-16 text-xl font-bold bg-[#ab9ff2] hover:bg-[#9987f9] text-white border-none transition-all transform hover:scale-[1.02]"
                    onClick={handlePhantomPayment}
                    disabled={loading}
                  >
                    {loading ? <Loader2 className="animate-spin mr-2" /> : "Pay with Phantom"}
                  </Button>
                  
                  {!phantomInstalled && (
                    <div className="p-4 bg-destructive/10 border border-destructive/20 rounded-xl text-center">
                      <p className="text-xs text-destructive font-bold uppercase tracking-tight">Phantom not detected</p>
                      <Link href="https://phantom.app/download" target="_blank" className="text-[10px] text-muted-foreground mt-1 underline">
                        Download extension here
                      </Link>
                    </div>
                  )}

                  <p className="text-[10px] text-center text-muted-foreground leading-relaxed">
                    By clicking "Pay with Phantom", you initiate an irreversible transaction on the Solana Network. Ensure you have enough SOL for gas fees.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="mt-12 text-center text-xs text-muted-foreground">
          <Link href="/" className="hover:text-primary transition-colors underline underline-offset-4">
            Cancel and return home
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  );
}
