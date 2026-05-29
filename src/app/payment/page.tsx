'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Navbar } from '@/components/sections/Navbar';
import { Footer } from '@/components/sections/Footer';
import { Slider } from '@/components/ui/slider';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { ShieldCheck, Zap, Loader2, CheckCircle2, Info, Copy, Check } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { getCurrentVDXPrice } from '@/lib/price-utils';

const DESTINATION_WALLET = "5caRrEq62WNwiDuvLUed8QxhqpJgLk11fBH4bHgE7yDG";
// 2000 VDX = 0.1 SOL -> 1 VDX = 0.00005 SOL
const VDX_TO_SOL_RATE = 0.1 / 2000; 

export default function PaymentPage() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [vdxAmount, setVdxAmount] = useState(2000);
  const [vdxPrice, setVdxPrice] = useState(0.05);
  const [txId, setTxId] = useState('');
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    setVdxPrice(getCurrentVDXPrice());
    const interval = setInterval(() => {
      setVdxPrice(getCurrentVDXPrice());
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  const solAmount = Number((vdxAmount * VDX_TO_SOL_RATE).toFixed(4));
  const estimatedUsdValue = Number((vdxAmount * vdxPrice).toFixed(2));

  const copyToClipboard = () => {
    navigator.clipboard.writeText(DESTINATION_WALLET);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
    toast({
      title: "Address copied!",
      description: "Wallet address copied to clipboard.",
    });
  };

  const handleManualSubmission = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!txId || txId.length < 32) {
      toast({
        variant: "destructive",
        title: "Invalid Transaction ID",
        description: "Please provide a valid Solana Transaction Signature.",
      });
      return;
    }

    setLoading(true);
    // Simulate Strict Protocol Verification
    setTimeout(() => {
      setSuccess(true);
      setLoading(false);
      toast({
        title: "Submission Received",
        description: "Your transaction is now being verified by the protocol.",
      });
    }, 2500);
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
            <h1 className="font-headline font-bold text-4xl mb-4 text-foreground">Airdrop Phase 1 Registered</h1>
            <div className="space-y-4 text-muted-foreground text-lg mb-8 leading-relaxed">
              <p>
                Protocol verification initiated. Your <span className="text-primary font-bold">{vdxAmount.toLocaleString()} VDX</span> allocation 
                is being processed and will be sent to your origin wallet within <span className="text-white font-bold">48 hours</span>.
              </p>
              <div className="p-4 bg-primary/5 border border-primary/20 rounded-xl text-sm italic">
                Recommendation: It is highly advised to hold these tokens in your cold storage until the official public token launch to maximize eligibility for future Genesis rewards.
              </div>
            </div>
            <div className="p-4 bg-primary/5 border border-primary/20 rounded-xl mb-8 font-code text-xs text-primary break-all">
              VERIFICATION STATUS: PENDING_VALIDATION_PHASE_1
            </div>
            <Button size="lg" asChild className="font-bold px-12">
              <Link href="/">Return to Protocol</Link>
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
            <span className="font-code text-xs text-primary font-medium uppercase tracking-tighter">Strict Verification Protocol</span>
          </div>
          <h1 className="font-headline font-bold text-4xl md:text-6xl mb-6">
            Secure Your <em className="font-body italic font-light text-primary">Genesis Allocation</em>
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Verdex is raising <span className="text-primary font-bold">$500,000</span> to finance the Phase 3 roadmap development and IoT sensor expansion. Secure your position through the manual Airdrop Phase 1 protocol.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-start">
          <div className="lg:col-span-3 space-y-8">
            <Card className="bg-secondary/30 border-primary/20 shadow-2xl overflow-hidden">
              <CardHeader className="bg-gradient-to-br from-primary/5 to-transparent border-b border-border/50">
                <CardTitle className="text-2xl font-headline flex items-center gap-2">
                  <ShieldCheck className="text-primary w-6 h-6" /> 
                  1. Allocation Settings
                </CardTitle>
                <CardDescription className="text-foreground/80">
                  Select your contribution level. Higher allocations grant increased governance weight.
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-8 space-y-6">
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <Label className="font-headline font-bold text-lg">Allocation Target</Label>
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
                    <span>2,000 VDX (Min)</span>
                    <span>50,000 VDX (Max)</span>
                  </div>
                </div>

                <div className="p-4 bg-primary/5 border border-primary/20 rounded-xl flex items-start gap-3">
                  <Info className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                  <p className="text-xs leading-relaxed text-foreground/80">
                    Calculated Rate: <span className="font-bold text-primary">0.1 SOL per 2,000 VDX</span>. These funds directly support the planetary restoration infrastructure.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-secondary/30 border-border shadow-2xl overflow-hidden">
              <CardHeader>
                <CardTitle className="text-2xl font-headline flex items-center gap-2">
                  <span className="text-primary">2.</span> Manual SOL Transfer
                </CardTitle>
                <CardDescription>
                  Send the exact SOL amount to the official Verdex Protocol Secure Address.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="p-6 bg-background/50 border border-border rounded-2xl">
                  <Label className="font-code text-[10px] uppercase text-muted-foreground block mb-3">Protocol Secure Address (Solana)</Label>
                  <div className="flex items-center gap-3">
                    <code className="flex-1 bg-secondary p-4 rounded-xl font-code text-xs md:text-sm break-all text-primary border border-primary/20">
                      {DESTINATION_WALLET}
                    </code>
                    <Button variant="outline" size="icon" onClick={copyToClipboard} className="h-12 w-12 shrink-0">
                      {copied ? <Check className="text-primary" /> : <Copy />}
                    </Button>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 border border-border rounded-xl">
                    <span className="block text-[10px] uppercase text-muted-foreground mb-1">Transfer Amount</span>
                    <span className="text-2xl font-bold">{solAmount} SOL</span>
                  </div>
                  <div className="p-4 border border-border rounded-xl">
                    <span className="block text-[10px] uppercase text-muted-foreground mb-1">Est. Public Value</span>
                    <span className="text-2xl font-bold text-primary">~${estimatedUsdValue}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="lg:col-span-2">
            <Card className="bg-background border-primary shadow-2xl sticky top-24">
              <CardHeader>
                <CardTitle className="text-xl font-headline">3. Final Verification</CardTitle>
                <CardDescription className="text-xs">
                  Submit your transaction ID (Signature) to trigger the Airdrop Phase 1 release.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <form onSubmit={handleManualSubmission} className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="txId" className="font-code text-[10px] uppercase tracking-widest text-muted-foreground">Transaction ID / Signature</Label>
                    <Input 
                      id="txId" 
                      placeholder="Paste SOL signature here..." 
                      className="bg-secondary/50 border-border h-12 font-code text-xs"
                      value={txId}
                      onChange={(e) => setTxId(e.target.value)}
                    />
                  </div>

                  <Button 
                    type="submit"
                    size="lg" 
                    className="w-full h-16 text-lg font-bold transition-all transform hover:scale-[1.02]"
                    disabled={loading}
                  >
                    {loading ? <Loader2 className="animate-spin mr-2" /> : "Verify & Secure Allocation"}
                  </Button>
                </form>

                <div className="space-y-4">
                  <div className="p-4 bg-secondary/20 rounded-xl space-y-3">
                    <h4 className="text-xs font-bold uppercase text-primary">Verification Steps:</h4>
                    <ul className="text-[10px] text-muted-foreground space-y-2 leading-tight">
                      <li className="flex gap-2"><span>1.</span> Protocol monitors Solana cluster for ID match.</li>
                      <li className="flex gap-2"><span>2.</span> Cold wallet cross-references SOL amount.</li>
                      <li className="flex gap-2"><span>3.</span> VDX tokens queued for airdrop within 48h.</li>
                    </ul>
                  </div>
                  
                  <p className="text-[10px] text-center text-muted-foreground leading-relaxed italic">
                    By submitting, you agree that your allocation is fixed based on the verified SOL transfer. Tokens are distributed in Phase 1 Airdrop.
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
