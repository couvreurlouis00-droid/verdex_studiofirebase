'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

type Language = 'en' | 'fr';

const translations = {
  en: {
    nav: {
      token: 'Token',
      roadmap: 'Roadmap',
      dashboard: 'Dashboard',
      faq: 'FAQ',
      eligibility: 'Eligibility Guide',
      join: 'Join Waitlist',
    },
    hero: {
      tag: 'Mainnet launch · September 1st, 2026',
      title1: 'The Carbon-Neutral',
      title2: 'Blockchain',
      title3: 'for a Living Planet.',
      desc: 'Verdex is a Layer-1 proof-of-growth protocol that turns every validated transaction into a certified carbon offset — making DeFi inherently regenerative.',
      cta1: 'Join the Waitlist',
      cta2: 'Explore VDX Token',
      stat1: 'Waitlist members',
      stat2: 'Carbon offset rate',
      stat3: 'Block finality',
    },
    dashboard: {
      tag: 'Dashboard',
      title: 'Protocol at a',
      titleItalic: 'glance',
      sync: 'Synchronized with Global Oracle feed. (Algorithmic estimation)',
      live: 'LIVE ESTIMATION',
      unlisted: 'Token not listed: estimation based on predictive launch algorithms.',
      tps: 'Network TPS',
      tpsSub: 'transactions / second',
      co2: 'CO₂ Offset',
      co2Sub: 'metric tonnes this epoch',
      apy: 'Staking APY (Forecast)',
      apySub: 'estimated annual yield',
      nodes: 'Active Nodes',
      nodesSub: 'validators online',
      recent: 'Recent Transactions',
      greenScore: 'Green Score',
      greenSub: 'Protocol sustainability index',
    },
    roadmap: {
      tag: 'Development Timeline',
      title: 'Roadmap to',
      titleItalic: 'mainnet',
      current: 'Current',
    },
    criteria: {
      tag: 'Qualification',
      title: 'How to qualify for',
      titleItalic: 'Genesis VDX',
      desc: 'Verdex values participation over capital. Our goal is to distribute the protocol as widely as possible to early pioneers of regenerative finance.',
      boxTitle: 'Maximum Inclusivity',
      boxDesc: 'If you can see this page and have a wallet address, you are likely already eligible. Simply register below to secure your',
    },
    waitlist: {
      tag: 'Early Access',
      title: 'Be first to',
      titleItalic: 'grow',
      desc: 'Join over 14,678 early adopters securing their spot in the Genesis cohort. We are raising $500k to fund Phase 3 development. Secure your 2,000 VDX allocation today.',
      perks: [
        'Priority Genesis Allocation (2,000 VDX)',
        'Reduced Validator Bond (-25%)',
        'Founding Validator NFT Badge',
        'Private Testnet Beta Access',
        'Guaranteed spot in the first 20k members'
      ],
      form: {
        name: 'Full Name',
        email: 'Email Address',
        wallet: 'Wallet Address (Optional)',
        roleLabel: "I'm interested as a",
        roles: {
          validator: 'Validator / Node Operator',
          dev: 'DeFi Developer',
          buyer: 'Carbon Credit Buyer',
          investor: 'Institutional Investor',
          org: 'Environmental Organisation',
          retail: 'Retail Investor',
        },
        agree: 'I accept the terms and consent to pay the priority processing fee.',
        submit: 'Secure My Spot →',
      }
    },
    payment: {
      tag: 'Strict Verification Protocol',
      title: 'Secure Your',
      titleItalic: 'Genesis Allocation',
      desc: 'Verdex is raising $500,000 to finance the Phase 3 roadmap development and IoT sensor expansion. Secure your position through the manual Airdrop Phase 1 protocol.',
      step1: '1. Allocation Settings',
      step1Desc: 'Select your contribution level. Higher allocations grant increased governance weight.',
      target: 'Allocation Target',
      min: '2,000 VDX (Min)',
      max: '50,000 VDX (Max)',
      rateInfo: 'Calculated Rate: 0.1 SOL per 2,000 VDX. These funds directly support the planetary restoration infrastructure.',
      step2: '2. Manual SOL Transfer',
      step2Desc: 'Send the exact SOL amount to the official Verdex Protocol Secure Address.',
      addressLabel: 'Protocol Secure Address (Solana)',
      transferAmount: 'Transfer Amount',
      estValue: 'Est. Public Value',
      step3: '3. Final Verification',
      step3Desc: 'Submit your transaction ID (Signature) to trigger the Airdrop Phase 1 release.',
      txLabel: 'Transaction ID / Signature',
      txPlaceholder: 'Paste SOL signature here...',
      verifyCta: 'Verify & Secure Allocation',
      steps: {
        title: 'Verification Steps:',
        1: 'Protocol monitors Solana cluster for ID match.',
        2: 'Cold wallet cross-references SOL amount.',
        3: 'VDX tokens queued for airdrop within 48h.',
      },
      agreement: 'By submitting, you agree that your allocation is fixed based on the verified SOL transfer. Tokens are distributed in Phase 1 Airdrop.',
      cancel: 'Cancel and return home',
      success: {
        title: 'Airdrop Phase 1 Registered',
        desc1: 'Protocol verification initiated. Your',
        desc2: 'allocation is being processed and will be sent to your origin wallet within',
        desc3: '48 hours',
        tip: 'Recommendation: It is highly advised to hold these tokens in your cold storage until the official public token launch to maximize eligibility for future Genesis rewards.',
        status: 'VERIFICATION STATUS: PENDING_VALIDATION_PHASE_1',
        return: 'Return to Protocol',
      }
    },
    footer: {
      desc: 'The carbon-neutral Layer-1 protocol. Built for the planet.',
      protocol: 'Protocol',
      whitepaper: 'Whitepaper',
      docs: 'Documentation',
      audit: 'Audit Reports',
      copy: '© 2025 Verdex Protocol Foundation',
      made: 'Made with 🌱 & curiosity',
    }
  },
  fr: {
    nav: {
      token: 'Token',
      roadmap: 'Feuille de route',
      dashboard: 'Tableau de bord',
      faq: 'FAQ',
      eligibility: 'Guide d\'éligibilité',
      join: 'Rejoindre la liste',
    },
    hero: {
      tag: 'Lancement du Mainnet · 1er septembre 2026',
      title1: 'La Blockchain',
      title2: 'Neutre en Carbone',
      title3: 'pour une Planète Vivante.',
      desc: 'Verdex est un protocole de preuve de croissance (Proof-of-Growth) de couche 1 qui transforme chaque transaction validée en un crédit carbone certifié — rendant la DeFi intrinsèquement régénérative.',
      cta1: 'Rejoindre la liste d\'attente',
      cta2: 'Explorer le Token VDX',
      stat1: 'Membres sur liste',
      stat2: 'Taux de compensation carbone',
      stat3: 'Finalité de bloc',
    },
    dashboard: {
      tag: 'Tableau de bord',
      title: 'Aperçu du',
      titleItalic: 'protocole',
      sync: 'Synchronisé avec le flux Global Oracle. (Estimation algorithmique)',
      live: 'ESTIMATION EN DIRECT',
      unlisted: 'Token non listé : estimation basée sur des algorithmes prédictifs de lancement.',
      tps: 'TPS du réseau',
      tpsSub: 'transactions / seconde',
      co2: 'CO₂ Compensé',
      co2Sub: 'tonnes métriques cette époque',
      apy: 'APY de Staking (Prévision)',
      apySub: 'rendement annuel estimé',
      nodes: 'Nœuds Actifs',
      nodesSub: 'validateurs en ligne',
      recent: 'Transactions Récentes',
      greenScore: 'Score Éco',
      greenSub: 'Indice de durabilité du protocole',
    },
    roadmap: {
      tag: 'Calendrier de Développement',
      title: 'Route vers le',
      titleItalic: 'mainnet',
      current: 'Actuel',
    },
    criteria: {
      tag: 'Qualification',
      title: 'Comment se qualifier pour',
      titleItalic: 'Genesis VDX',
      desc: 'Verdex valorise la participation plus que le capital. Notre objectif est de distribuer le protocole le plus largement possible aux premiers pionniers de la finance régénérative.',
      boxTitle: 'Inclusivité Maximale',
      boxDesc: 'Si vous voyez cette page et possédez une adresse de portefeuille, vous êtes probablement déjà éligible. Inscrivez-vous simplement ci-dessous pour sécuriser votre allocation de',
    },
    waitlist: {
      tag: 'Accès Anticipé',
      title: 'Soyez les premiers à',
      titleItalic: 'grandir',
      desc: 'Rejoignez plus de 14 678 adoptants précoces sécurisant leur place dans la cohorte Genesis. Nous levons 500 000 $ pour financer le développement de la Phase 3. Sécurisez votre allocation de 2 000 VDX aujourd\'hui.',
      perks: [
        'Allocation Genesis Prioritaire (2 000 VDX)',
        'Dépôt de Validateur Réduit (-25%)',
        'Badge NFT de Validateur Fondateur',
        'Accès Beta au Testnet Privé',
        'Place garantie dans les 20 000 premiers membres'
      ],
      form: {
        name: 'Nom complet',
        email: 'Adresse e-mail',
        wallet: 'Adresse du portefeuille (Optionnel)',
        roleLabel: 'Je suis intéressé en tant que',
        roles: {
          validator: 'Validateur / Opérateur de nœud',
          dev: 'Développeur DeFi',
          buyer: 'Acheteur de crédits carbone',
          investor: 'Investisseur institutionnel',
          org: 'Organisation environnementale',
          retail: 'Investisseur particulier',
        },
        agree: 'J\'accepte les conditions et consens à payer les frais de traitement prioritaire.',
        submit: 'Sécuriser ma place →',
      }
    },
    payment: {
      tag: 'Protocole de Vérification Strict',
      title: 'Sécurisez votre',
      titleItalic: 'Allocation Genesis',
      desc: 'Verdex lève 500 000 $ pour financer le développement de la feuille de route Phase 3 et l\'expansion des capteurs IoT. Sécurisez votre position via le protocole manuel Airdrop Phase 1.',
      step1: '1. Paramètres d\'Allocation',
      step1Desc: 'Sélectionnez votre niveau de contribution. Les allocations plus élevées accordent un poids de gouvernance accru.',
      target: 'Cible d\'Allocation',
      min: '2 000 VDX (Min)',
      max: '50 000 VDX (Max)',
      rateInfo: 'Taux Calculé : 0,1 SOL pour 2 000 VDX. Ces fonds soutiennent directement l\'infrastructure de restauration planétaire.',
      step2: '2. Transfert Manuel SOL',
      step2Desc: 'Envoyez le montant exact de SOL à l\'adresse sécurisée officielle du protocole Verdex.',
      addressLabel: 'Adresse Sécurisée du Protocole (Solana)',
      transferAmount: 'Montant du Transfert',
      estValue: 'Val. Publique Est.',
      step3: '3. Vérification Finale',
      step3Desc: 'Soumettez votre ID de transaction (Signature) pour déclencher la libération de l\'Airdrop Phase 1.',
      txLabel: 'ID de Transaction / Signature',
      txPlaceholder: 'Collez la signature SOL ici...',
      verifyCta: 'Vérifier et Sécuriser l\'Allocation',
      steps: {
        title: 'Étapes de Vérification :',
        1: 'Le protocole surveille le cluster Solana pour trouver l\'ID.',
        2: 'Le cold wallet vérifie le montant de SOL.',
        3: 'Tokens VDX mis en file pour l\'airdrop sous 48h.',
      },
      agreement: 'En soumettant, vous acceptez que votre allocation soit fixée sur la base du transfert SOL vérifié. Les tokens sont distribués lors de l\'Airdrop Phase 1.',
      cancel: 'Annuler et retourner à l\'accueil',
      success: {
        title: 'Airdrop Phase 1 Enregistré',
        desc1: 'Vérification du protocole initiée. Votre allocation de',
        desc2: 'est en cours de traitement et sera envoyée à votre portefeuille d\'origine sous',
        desc3: '48 heures',
        tip: 'Recommandation : Il est fortement conseillé de conserver ces tokens dans votre stockage à froid jusqu\'au lancement public officiel pour maximiser l\'éligibilité aux futures récompenses Genesis.',
        status: 'STATUT DE VÉRIFICATION : PENDING_VALIDATION_PHASE_1',
        return: 'Retour au Protocole',
      }
    },
    footer: {
      desc: 'Le protocole Layer-1 neutre en carbone. Conçu pour la planète.',
      protocol: 'Protocole',
      whitepaper: 'Livre Blanc',
      docs: 'Documentation',
      audit: 'Rapports d\'Audit',
      copy: '© 2025 Fondation du Protocole Verdex',
      made: 'Fait avec 🌱 & curiosité',
    }
  }
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: any;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>('en');

  useEffect(() => {
    const saved = localStorage.getItem('verdex_lang') as Language;
    if (saved && (saved === 'en' || saved === 'fr')) {
      setLanguage(saved);
    } else {
      const browserLang = navigator.language.split('-')[0];
      if (browserLang === 'fr') setLanguage('fr');
    }
  }, []);

  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang);
    localStorage.setItem('verdex_lang', lang);
  };

  const t = translations[language];

  return (
    <LanguageContext.Provider value={{ language, setLanguage: handleSetLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useTranslation() {
  const context = useContext(LanguageContext);
  if (!context) throw new Error('useTranslation must be used within a LanguageProvider');
  return context;
}
