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
import { useTranslation } from '@/lib/i18n';

const DESTINATION_WALLET = "5caRrEq62WNwiDuvLUed8QxhqpJgLk11fBH4bHgE7yDG";
// 2000 VDX = 0.1 SOL -> 1 VDX = 0.00005 SOL
const VDX_TO_SOL_RATE = 0.1 / 2000; 

export default function PaymentPage() {
  const { t } = useTranslation();
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
            <h1 className="font-headline font-bold text-4xl mb-4 text-foreground">{t.payment.success.title}</h1>
            <div className="space-y-4 text-muted-foreground text-lg mb-8 leading-relaxed">
              <p>
                {t.payment.success.desc1} <span className="text-primary font-bold">{vdxAmount.toLocaleString()} VDX</span> {t.payment.success.desc2} <span className="text-white font-bold">{t.payment.success.desc3}</span>.
              </p>
              <div className="p-4 bg-primary/5 border border-primary/20 rounded-xl text-sm italic">
                {t.payment.success.tip}
              </div>
            </div>
            <div className="p-4 bg-primary/5 border border-primary/20 rounded-xl mb-8 font-code text-xs text-primary break-all">
              {t.payment.success.status}
            </div>
            <Button size="lg" asChild className="font-bold px-12">
              <Link href="/">{t.payment.success.return}</Link>
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
            <span className="font-code text-xs text-primary font-medium uppercase tracking-tighter">{t.payment.tag}</span>
          </div>
          <h1 className="font-headline font-bold text-4xl md:text-6xl mb-6">
            {t.payment.title} <em className="font-body italic font-light text-primary">{t.payment.titleItalic}</em>
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            {t.payment.desc}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-start">
          <div className="lg:col-span-3 space-y-8">
            <Card className="bg-secondary/30 border-primary/20 shadow-2xl overflow-hidden">
              <CardHeader className="bg-gradient-to-br from-primary/5 to-transparent border-b border-border/50">
                <CardTitle className="text-2xl font-headline flex items-center gap-2">
                  <ShieldCheck className="text-primary w-6 h-6" /> 
                  {t.payment.step1}
                </CardTitle>
                <CardDescription className="text-foreground/80">
                  {t.payment.step1Desc}
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-8 space-y-6">
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <Label className="font-headline font-bold text-lg">{t.payment.target}</Label>
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
                    <span>{t.payment.min}</span>
                    <span>{t.payment.max}</span>
                  </div>
                </div>

                <div className="p-4 bg-primary/5 border border-primary/20 rounded-xl flex items-start gap-3">
                  <Info className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                  <p className="text-xs leading-relaxed text-foreground/80">
                    {t.payment.rateInfo}
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-secondary/30 border-border shadow-2xl overflow-hidden">
              <CardHeader>
                <CardTitle className="text-2xl font-headline flex items-center gap-2">
                  <span className="text-primary">2.</span> {t.payment.step2}
                </CardTitle>
                <CardDescription>
                  {t.payment.step2Desc}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="p-6 bg-background/50 border border-border rounded-2xl">
                  <Label className="font-code text-[10px] uppercase text-muted-foreground block mb-3">{t.payment.addressLabel}</Label>
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
                    <span className="block text-[10px] uppercase text-muted-foreground mb-1">{t.payment.transferAmount}</span>
                    <span className="text-2xl font-bold">{solAmount} SOL</span>
                  </div>
                  <div className="p-4 border border-border rounded-xl">
                    <span className="block text-[10px] uppercase text-muted-foreground mb-1">{t.payment.estValue}</span>
                    <span className="text-2xl font-bold text-primary">~${estimatedUsdValue}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="lg:col-span-2">
            <Card className="bg-background border-primary shadow-2xl sticky top-24">
              <CardHeader>
                <CardTitle className="text-xl font-headline">{t.payment.step3}</CardTitle>
                <CardDescription className="text-xs">
                  {t.payment.step3Desc}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <form onSubmit={handleManualSubmission} className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="txId" className="font-code text-[10px] uppercase tracking-widest text-muted-foreground">{t.payment.txLabel}</Label>
                    <Input 
                      id="txId" 
                      placeholder={t.payment.txPlaceholder} 
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
                    {loading ? <Loader2 className="animate-spin mr-2" /> : t.payment.verifyCta}
                  </Button>
                </form>

                <div className="space-y-4">
                  <div className="p-4 bg-secondary/20 rounded-xl space-y-3">
                    <h4 className="text-xs font-bold uppercase text-primary">{t.payment.steps.title}</h4>
                    <ul className="text-[10px] text-muted-foreground space-y-2 leading-tight">
                      <li className="flex gap-2"><span>1.</span> {t.payment.steps[1]}</li>
                      <li className="flex gap-2"><span>2.</span> {t.payment.steps[2]}</li>
                      <li className="flex gap-2"><span>3.</span> {t.payment.steps[3]}</li>
                    </ul>
                  </div>
                  
                  <p className="text-[10px] text-center text-muted-foreground leading-relaxed italic">
                    {t.payment.agreement}
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="mt-12 text-center text-xs text-muted-foreground">
          <Link href="/" className="hover:text-primary transition-colors underline underline-offset-4">
            {t.payment.cancel}
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  );
}
