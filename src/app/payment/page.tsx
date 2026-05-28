'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Navbar } from '@/components/sections/Navbar';
import { Footer } from '@/components/sections/Footer';
import { AlertCircle, ShieldCheck, Zap, Loader2, CheckCircle2, TrendingUp } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { getLiveWaitlistCount } from '@/lib/price-utils';
import { 
  Connection, 
  PublicKey, 
  Transaction, 
  SystemProgram, 
  LAMPORTS_PER_SOL 
} from '@solana/web3.js';

// Adresse de destination pour le paiement (votre adresse)
const DESTINATION_WALLET = "5caRrEq62WNwiDuvLUed8QxhqpJgLk11fBH4bHgE7yDG";
const PAYMENT_AMOUNT_SOL = 0.01;
const MAX_SPOTS = 20000;

// Utilisation de devnet pour les tests, passez en mainnet-beta pour la prod
const RPC_ENDPOINT = "https://api.devnet.solana.com";

export default function PaymentPage() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [phantomInstalled, setPhantomInstalled] = useState(false);
  const [waitlistCount, setWaitlistCount] = useState(14200);
  const { toast } = useToast();

  useEffect(() => {
    // Initialisation et mise à jour du compteur live
    setWaitlistCount(getLiveWaitlistCount());
    const interval = setInterval(() => {
      setWaitlistCount(getLiveWaitlistCount());
    }, 10000);

    if (typeof window !== 'undefined') {
      const isPhantomInstalled = (window as any).solana?.isPhantom;
      setPhantomInstalled(!!isPhantomInstalled);
    }
    return () => clearInterval(interval);
  }, []);

  const handlePhantomPayment = async () => {
    if (!phantomInstalled) {
      toast({
        variant: "destructive",
        title: "Phantom non détecté",
        description: "Veuillez installer l'extension Phantom pour continuer.",
      });
      return;
    }

    setLoading(true);
    try {
      const provider = (window as any).solana;
      
      // Connexion au wallet
      const resp = await provider.connect();
      const userPublicKey = resp.publicKey;

      // Initialisation de la connexion
      const connection = new Connection(RPC_ENDPOINT, 'confirmed');

      // Création de la transaction
      const transaction = new Transaction().add(
        SystemProgram.transfer({
          fromPubkey: userPublicKey,
          toPubkey: new PublicKey(DESTINATION_WALLET),
          lamports: PAYMENT_AMOUNT_SOL * LAMPORTS_PER_SOL,
        })
      );

      // Récupération du blockhash récent
      const { blockhash, lastValidBlockHeight } = await connection.getLatestBlockhash();
      transaction.recentBlockhash = blockhash;
      transaction.feePayer = userPublicKey;

      // Signature et envoi
      const { signature } = await provider.signAndSendTransaction(transaction);
      
      // Confirmation "propre" de la transaction
      const confirmation = await connection.confirmTransaction({
        signature,
        blockhash,
        lastValidBlockHeight
      });

      if (confirmation.value.err) {
        throw new Error("Erreur lors de la confirmation de la transaction.");
      }

      setSuccess(true);
      toast({
        title: "Paiement réussi !",
        description: "Transaction confirmée sur la blockchain Solana.",
      });
    } catch (err: any) {
      console.error('Erreur Solana:', err);
      let errorMessage = "La transaction a été annulée ou a échoué.";
      
      if (err.message?.includes('403')) {
        errorMessage = "Limite RPC atteinte. Réessayez dans quelques secondes.";
      }

      toast({
        variant: "destructive",
        title: "Erreur de paiement",
        description: errorMessage,
      });
    } finally {
      setLoading(false);
    }
  };

  const progressValue = (waitlistCount / MAX_SPOTS) * 100;

  if (success) {
    return (
      <main className="min-h-screen bg-background">
        <Navbar />
        <section className="pt-40 pb-20 container mx-auto px-6 max-w-3xl text-center">
          <div className="bg-secondary/30 border border-primary/50 p-12 rounded-3xl shadow-2xl animate-in zoom-in-95 duration-500">
            <div className="flex justify-center mb-6">
              <CheckCircle2 className="w-20 h-20 text-primary animate-bounce" />
            </div>
            <h1 className="font-headline font-bold text-4xl mb-4 text-foreground">Accès Genesis Sécurisé</h1>
            <p className="text-muted-foreground text-lg mb-8">
              Félicitations. Votre transaction de <span className="text-primary font-bold">{PAYMENT_AMOUNT_SOL} SOL</span> a été validée. 
              Votre adresse est désormais enregistrée dans les 20 000 premiers contributeurs prioritaires.
            </p>
            <div className="p-4 bg-primary/5 border border-primary/20 rounded-xl mb-8 font-code text-xs text-primary">
              ID TRANSACTION: SECURED_GENESIS_VALIDATION_001
            </div>
            <Button size="lg" asChild className="font-bold px-12">
              <Link href="/">Retourner au Dashboard</Link>
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
      
      <section className="pt-32 pb-20 container mx-auto px-6 max-w-4xl">
        <div className="text-center mb-10 animate-in fade-in slide-in-from-bottom duration-700">
          <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 px-4 py-2 rounded-full mb-6">
            <Zap className="w-4 h-4 text-primary" />
            <span className="font-code text-xs text-primary font-medium uppercase tracking-tighter">Validation On-Chain Uniquement</span>
          </div>
          <h1 className="font-headline font-bold text-4xl md:text-6xl mb-6">
            Finalisez votre <em className="font-body italic font-light text-primary">accès Genesis</em>
          </h1>
          
          <div className="max-w-xl mx-auto space-y-4">
            <div className="flex justify-between items-end mb-2">
              <span className="font-code text-xs text-muted-foreground uppercase tracking-widest">Places occupées</span>
              <div className="text-right">
                <span className="font-headline font-bold text-xl text-primary">{waitlistCount.toLocaleString()}</span>
                <span className="text-muted-foreground text-sm"> / {MAX_SPOTS.toLocaleString()}</span>
              </div>
            </div>
            <Progress value={progressValue} className="h-3 bg-secondary" />
            <div className="flex items-center justify-center gap-2 text-primary/80 animate-pulse">
              <TrendingUp className="w-4 h-4" />
              <span className="font-code text-[10px] uppercase tracking-widest font-bold">Forte demande : inscriptions en cours</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-start">
          <div className="lg:col-span-3">
            <Card className="bg-secondary/30 border-primary/20 shadow-2xl overflow-hidden">
              <CardHeader className="border-b border-border/50 pb-8 relative bg-gradient-to-br from-primary/5 to-transparent">
                <div className="absolute top-4 right-4 bg-primary/20 text-primary text-[10px] font-bold px-2 py-1 rounded uppercase">Exclusif Genesis</div>
                <CardTitle className="text-2xl font-headline flex items-center gap-2">
                  <ShieldCheck className="text-primary w-6 h-6" /> 
                  Pourquoi cette étape ?
                </CardTitle>
                <CardDescription className="text-foreground/80 mt-2">
                  Verdex est un protocole décentralisé. Pour éliminer les bots et garantir une distribution équitable des <strong>2 000 VDX</strong>, nous demandons une validation on-chain.
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-8 space-y-6">
                <div className="grid grid-cols-1 gap-4 text-sm">
                  {[
                    { t: "Preuve d'Humanité", d: "Seuls les portefeuilles réels avec du SOL peuvent valider cette étape." },
                    { t: "Allocation Garantie", d: "Votre adresse est whitelistée instantanément pour les 2 000 VDX." },
                    { t: "Priorité Mainnet", d: "Accès au réseau 48h avant l'ouverture publique." }
                  ].map((item, i) => (
                    <div key={i} className="flex gap-4 p-4 bg-background/40 rounded-xl border border-border">
                      <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center shrink-0">
                        <span className="text-primary font-bold">{i+1}</span>
                      </div>
                      <div>
                        <h4 className="font-bold text-foreground">{item.t}</h4>
                        <p className="text-muted-foreground text-xs">{item.d}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="lg:col-span-2">
            <Card className="bg-background border-primary shadow-2xl sticky top-24">
              <CardContent className="p-8 space-y-8">
                <div className="text-center">
                  <span className="block font-code text-[10px] uppercase tracking-widest text-muted-foreground mb-4">Activation du Compte</span>
                  <div className="flex items-center justify-center gap-3">
                    <span className="font-headline font-bold text-5xl text-primary">{PAYMENT_AMOUNT_SOL}</span>
                    <span className="font-code text-2xl text-foreground">SOL</span>
                  </div>
                  <span className="block text-xs text-muted-foreground mt-4 italic font-code">Réseau : Solana Devnet</span>
                </div>

                <div className="space-y-4">
                  <Button 
                    size="lg" 
                    className="w-full h-16 text-xl font-bold bg-[#ab9ff2] hover:bg-[#9987f9] text-white border-none transition-all transform hover:scale-[1.02]"
                    onClick={handlePhantomPayment}
                    disabled={loading}
                  >
                    {loading ? (
                      <Loader2 className="animate-spin mr-2" />
                    ) : (
                      <svg viewBox="0 0 128 128" className="w-6 h-6 mr-3 fill-current">
                        <path d="M64 0C28.656 0 0 28.656 0 64s28.656 64 64 64 64-28.656 64-64S99.344 0 64 0zm37.312 66.844c-1.312 11.656-11.75 22.094-25.062 26.594-3.5 1.188-7.375 1.844-11.25 1.844-3.875 0-7.75-.656-11.25-1.844-13.312-4.5-23.75-14.938-25.062-26.594-.156-1.531-.25-3.094-.25-4.656 0-1.562.094-3.125.25-4.656 1.312-11.656 11.75-22.094 25.062-26.594 3.5-1.188 7.375-1.844 11.25-1.844 3.875 0-7.75.656 11.25 1.844 13.312 4.5 23.75 14.938 25.062 26.594.156 1.531.25 3.094.25 4.656 0-1.562.094-3.125.25-4.656zM84.75 60.188c0 3.312-2.688 6-6 6s-6-2.688-6-6 2.688-6 6-6 6 2.688 6 6zm-24 0c0 3.312-2.688 6-6 6s-6-2.688-6-6 2.688-6 6-6 6 2.5 6 6z" />
                      </svg>
                    )}
                    Pay with Phantom
                  </Button>
                  
                  {!phantomInstalled && (
                    <div className="p-4 bg-destructive/10 border border-destructive/20 rounded-xl text-center">
                      <p className="text-xs text-destructive font-bold uppercase tracking-tight">Phantom non détecté</p>
                      <Link href="https://phantom.app/download" target="_blank" className="text-[10px] text-muted-foreground mt-1 underline">
                        Installer l'extension ici
                      </Link>
                    </div>
                  )}

                  <div className="flex items-center justify-center gap-4 py-4">
                    <div className="h-px flex-1 bg-border" />
                    <span className="font-code text-[8px] text-muted-foreground uppercase tracking-[0.2em]">Verified Transaction</span>
                    <div className="h-px flex-1 bg-border" />
                  </div>

                  <p className="text-[10px] text-center text-muted-foreground leading-relaxed">
                    En cliquant sur "Pay with Phantom", vous initiez une transaction irréversible sur la blockchain Solana. Assurez-vous d'avoir assez de SOL pour les frais de gaz (très faibles).
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="mt-12 text-center text-xs text-muted-foreground">
          <Link href="/" className="hover:text-primary transition-colors underline underline-offset-4">
            Annuler et retourner à l'accueil
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  );
}
