
'use client';

import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Navbar } from '@/components/sections/Navbar';
import { Footer } from '@/components/sections/Footer';
import { AlertCircle, CreditCard, ShieldCheck, Zap } from 'lucide-react';

export default function PaymentPage() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      
      <section className="pt-32 pb-20 container mx-auto px-6 max-w-3xl">
        <div className="text-center mb-12 animate-in fade-in slide-in-from-bottom duration-700">
          <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 px-4 py-2 rounded-full mb-6">
            <Zap className="w-4 h-4 text-primary" />
            <span className="font-code text-xs text-primary font-medium">Inscription en attente</span>
          </div>
          <h1 className="font-headline font-bold text-4xl md:text-5xl mb-6">
            Finalisez votre <em className="font-body italic font-light text-primary">accès privilégié</em>
          </h1>
          <p className="text-muted-foreground text-lg">
            Merci de rejoindre la waitlist de Verdex. Pour garantir l'équité et la sécurité du réseau, une étape finale est requise.
          </p>
        </div>

        <Card className="bg-secondary/30 border-primary/30 shadow-2xl animate-in fade-in zoom-in-95 duration-700 delay-200">
          <CardHeader className="text-center border-b border-border/50 pb-8">
            <div className="flex justify-center mb-4">
              <AlertCircle className="w-12 h-12 text-primary" />
            </div>
            <CardTitle className="text-2xl font-headline">Forte Demande Détectée</CardTitle>
            <CardDescription className="text-foreground/80 mt-2">
              Nous avons reçu un nombre exceptionnel de demandes pour obtenir les <span className="text-primary font-bold">500 tokens VDX</span> garantis au lancement.
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-8 space-y-6">
            <div className="bg-background/50 p-6 rounded-2xl border border-border">
              <h3 className="font-headline font-bold text-lg mb-4 flex items-center gap-2">
                <ShieldCheck className="text-primary" /> Pourquoi cette étape ?
              </h3>
              <ul className="space-y-4 text-sm text-muted-foreground">
                <li className="flex gap-3">
                  <span className="text-primary font-bold">•</span>
                  <span><strong>Limite de 20 000 places</strong> pour l'Early Access Genesis afin de stabiliser le réseau.</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-primary font-bold">•</span>
                  <span>Filtrage anti-bot pour assurer que les tokens reviennent à de vrais utilisateurs.</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-primary font-bold">•</span>
                  <span>Frais de traitement prioritaire pour l'intégration de votre adresse sur la Mainnet.</span>
                </li>
              </ul>
            </div>

            <div className="text-center p-6 border-2 border-dashed border-primary/30 rounded-2xl bg-primary/5">
              <span className="block font-code text-xs uppercase tracking-widest text-muted-foreground mb-2">Montant du traitement</span>
              <span className="block font-headline font-bold text-4xl text-foreground">19,99 €</span>
              <p className="text-[10px] text-muted-foreground mt-2 uppercase tracking-tight">Frais uniques de réservation de place</p>
            </div>

            <div className="space-y-4">
              <Button size="lg" className="w-full h-16 text-xl font-bold group" asChild>
                <Link href="#">
                  Procéder au paiement <CreditCard className="ml-2 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
              <p className="text-[10px] text-center text-muted-foreground uppercase tracking-widest">
                Paiement sécurisé par cryptage SSL 256-bit
              </p>
            </div>
          </CardContent>
        </Card>

        <div className="mt-12 text-center text-xs text-muted-foreground">
          <Link href="/" className="hover:text-primary transition-colors underline underline-offset-4">
            Retourner à l'accueil
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  );
}
