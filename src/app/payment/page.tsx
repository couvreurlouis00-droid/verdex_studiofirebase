'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Navbar } from '@/components/sections/Navbar';
import { Footer } from '@/components/sections/Footer';
import { AlertCircle, ShieldCheck, Zap, Loader2, CheckCircle2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { 
  Connection, 
  PublicKey, 
  Transaction, 
  SystemProgram, 
  LAMPORTS_PER_SOL 
} from '@solana/web3.js';

// Adresse de destination pour le paiement
const DESTINATION_WALLET = "5caRrEq62WNwiDuvLUed8QxhqpJgLk11fBH4bHgE7yDG";
const PAYMENT_AMOUNT_SOL = 0.01;

// Utilisation d'un RPC plus stable. Pour la production, utilisez un fournisseur comme Helius, Alchemy ou QuickNode.
const RPC_ENDPOINT = "https://api.devnet.solana.com"; // Changé en devnet pour les tests. Remplacez par mainnet pour la version finale.

export default function PaymentPage() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [phantomInstalled, setPhantomInstalled] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const isPhantomInstalled = (window as any).solana?.isPhantom;
      setPhantomInstalled(!!isPhantomInstalled);
    }
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

      // Initialisation de la connexion avec le réseau Solana
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
      const { blockhash } = await connection.getLatestBlockhash('confirmed');
      transaction.recentBlockhash = blockhash;
      transaction.feePayer = userPublicKey;

      // Signature et envoi
      const { signature } = await provider.signAndSendTransaction(transaction);
      
      // Confirmation de la transaction
      await connection.confirmTransaction(signature, 'confirmed');

      setSuccess(true);
      toast({
        title: "Paiement réussi !",
        description: "Votre place dans la waitlist Genesis est désormais sécurisée.",
      });
    } catch (err: any) {
      console.error('Erreur Solana:', err);
      
      let errorMessage = "La transaction a été annulée ou a échoué.";
      if (err.message?.includes('403')) {
        errorMessage = "Erreur de connexion au réseau Solana (403). Veuillez réessayer plus tard ou utiliser un VPN.";
      }

      toast({
        variant: "destructive",
        title: "Erreur de transaction",
        description: errorMessage,
      });
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <main className="min-h-screen bg-background">
        <Navbar />
        <section className="pt-32 pb-20 container mx-auto px-6 max-w-3xl text-center">
          <div className="bg-secondary/30 border border-primary/50 p-12 rounded-3xl shadow-2xl animate-in zoom-in-95 duration-500">
            <div className="flex justify-center mb-6">
              <CheckCircle2 className="w-20 h-20 text-primary" />
            </div>
            <h1 className="font-headline font-bold text-4xl mb-4 text-foreground">Accès Sécurisé !</h1>
            <p className="text-muted-foreground text-lg mb-8">
              Félicitations. Votre paiement de <span className="text-primary font-bold">{PAYMENT_AMOUNT_SOL} SOL</span> a été confirmé. 
              Vous recevrez bientôt un email avec vos identifiants pour le Dashboard Genesis.
            </p>
            <Button size="lg" asChild className="font-bold">
              <Link href="/">Retourner à l'accueil</Link>
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
      
      <section className="pt-32 pb-20 container mx-auto px-6 max-w-3xl">
        <div className="text-center mb-12 animate-in fade-in slide-in-from-bottom duration-700">
          <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 px-4 py-2 rounded-full mb-6">
            <Zap className="w-4 h-4 text-primary" />
            <span className="font-code text-xs text-primary font-medium uppercase tracking-tighter">Phase de Validation</span>
          </div>
          <h1 className="font-headline font-bold text-4xl md:text-5xl mb-6">
            Finalisez votre <em className="font-body italic font-light text-primary">accès Genesis</em>
          </h1>
          <p className="text-muted-foreground text-lg">
            Verdex est un protocole Web3 pur. Pour garantir l'intégrité du réseau et filtrer les accès, seule la validation on-chain est acceptée.
          </p>
        </div>

        <Card className="bg-secondary/30 border-primary/30 shadow-2xl animate-in fade-in zoom-in-95 duration-700 delay-200 overflow-hidden">
          <CardHeader className="text-center border-b border-border/50 pb-8 relative">
            <div className="absolute top-4 right-4 bg-primary/20 text-primary text-[10px] font-bold px-2 py-1 rounded uppercase">Exclusif Crypto</div>
            <div className="flex justify-center mb-4">
              <AlertCircle className="w-12 h-12 text-primary" />
            </div>
            <CardTitle className="text-2xl font-headline">Forte Demande Détectée</CardTitle>
            <CardDescription className="text-foreground/80 mt-2">
              Nous limitons l'Early Access aux <span className="text-primary font-bold">20 000 premiers utilisateurs</span> pour assurer la stabilité du Mainnet.
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-8 space-y-6">
            <div className="bg-background/50 p-6 rounded-2xl border border-border">
              <h3 className="font-headline font-bold text-lg mb-4 flex items-center gap-2">
                <ShieldCheck className="text-primary w-5 h-5" /> Pourquoi le SOL ?
              </h3>
              <ul className="space-y-4 text-sm text-muted-foreground">
                <li className="flex gap-3">
                  <span className="text-primary font-bold">•</span>
                  <span><strong>Preuve d'Humanité</strong> : Le paiement on-chain élimine 100% des bots.</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-primary font-bold">•</span>
                  <span><strong>Vitesse</strong> : Votre adresse est whitelistée instantanément après confirmation.</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-primary font-bold">•</span>
                  <span><strong>Récompenses</strong> : Seuls les wallets ayant validé cette étape recevront les 500 VDX.</span>
                </li>
              </ul>
            </div>

            <div className="p-8 border-2 border-primary/30 rounded-2xl bg-primary/5 text-center">
              <span className="block font-code text-[10px] uppercase tracking-widest text-primary mb-2">Frais d'Activation Genesis</span>
              <span className="block font-headline font-bold text-5xl text-primary">{PAYMENT_AMOUNT_SOL} SOL</span>
              <span className="block text-xs text-muted-foreground mt-2 italic">~ Environ 20 €</span>
              <span className="block text-[10px] text-muted-foreground mt-2 font-code">(Réseau: Devnet pour test)</span>
            </div>

            <div className="space-y-4 pt-4">
              <Button 
                size="lg" 
                className="w-full h-16 text-xl font-bold bg-[#ab9ff2] hover:bg-[#9987f9] text-white border-none group transition-all transform hover:scale-[1.02]"
                onClick={handlePhantomPayment}
                disabled={loading}
              >
                {loading ? (
                  <Loader2 className="animate-spin mr-2" />
                ) : (
                  <svg viewBox="0 0 128 128" className="w-6 h-6 mr-3 fill-current">
                    <path d="M64 0C28.656 0 0 28.656 0 64s28.656 64 64 64 64-28.656 64-64S99.344 0 64 0zm37.312 66.844c-1.312 11.656-11.75 22.094-25.062 26.594-3.5 1.188-7.375 1.844-11.25 1.844-3.875 0-7.75-.656-11.25-1.844-13.312-4.5-23.75-14.938-25.062-26.594-.156-1.531-.25-3.094-.25-4.656 0-1.562.094-3.125.25-4.656 1.312-11.656 11.75-22.094 25.062-26.594 3.5-1.188 7.375-1.844 11.25-1.844 3.875 0-7.75.656 11.25 1.844 13.312 4.5 23.75 14.938 25.062 26.594.156 1.531.25 3.094.25 4.656 0-1.562.094-3.125.25-4.656zM84.75 60.188c0 3.312-2.688 6-6 6s-6-2.688-6-6 2.688-6 6-6 6 2.688 6 6zm-24 0c0 3.312-2.688 6-6 6s-6-2.688-6-6 2.688-6 6-6 6 2.688 6 6z" />
                  </svg>
                )}
                Activer avec Phantom
              </Button>
              
              {!phantomInstalled && (
                <div className="p-4 bg-destructive/10 border border-destructive/20 rounded-xl text-center">
                  <p className="text-xs text-destructive font-bold uppercase tracking-tight">
                    Extension Phantom non détectée
                  </p>
                  <p className="text-[10px] text-muted-foreground mt-1">
                    Veuillez utiliser un navigateur avec Phantom installé pour procéder.
                  </p>
                </div>
              )}
              
              <div className="flex items-center justify-center gap-4 pt-2">
                <div className="h-px flex-1 bg-border" />
                <span className="font-code text-[8px] text-muted-foreground uppercase tracking-[0.2em]">Sécurisé par Solana Network</span>
                <div className="h-px flex-1 bg-border" />
              </div>
            </div>
          </CardContent>
        </Card>

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