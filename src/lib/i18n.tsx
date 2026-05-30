'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

type Language = 'en' | 'fr' | 'es' | 'zh' | 'hi' | 'ar';

const translations: Record<Language, any> = {
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
    features: {
      tag: 'Protocol Architecture',
      title: 'Three pillars of',
      titleItalic: 'regenerative',
      titleEnd: 'finance',
      item1Title: 'Proof-of-Growth',
      item1Desc: 'Validators are rewarded proportionally to verified carbon sequestration data sourced from IoT forest sensors.',
      item2Title: 'Green Sharding',
      item2Desc: 'Dynamic sharding routes computation to data centers powered by 100% renewable energy.',
      item3Title: 'Carbon Oracle',
      item3Desc: 'Decentralised oracle network aggregates 14,000+ climate data points per second.',
      layers: { consensus: 'Consensus Layer', network: 'Network Layer', data: 'Data Layer' }
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
      phases: {
        p1: 'Genesis',
        p2: 'Testnet Alpha',
        p3: 'Testnet Beta',
        p4: 'Mainnet Launch',
        p5: 'Ecosystem Growth'
      },
      status: { completed: 'Completed', progress: 'In Progress', upcoming: 'Upcoming' }
    },
    criteria: {
      tag: 'Qualification',
      title: 'How to qualify for',
      titleItalic: 'Genesis VDX',
      desc: 'Verdex values participation over capital. Our goal is to distribute the protocol as widely as possible to early pioneers of regenerative finance.',
      cards: {
        c1: { t: 'Active Wallet', d: 'Any blockchain wallet with at least one transaction in the last 6 months qualifies.' },
        c2: { t: 'Eco-Commitment', d: 'By joining our waitlist, you automatically meeting our primary community criteria.' },
        c3: { t: 'Early Adopter', d: 'The first 20,000 members are guaranteed a spot in the Genesis Phase 1 Airdrop.' },
        c4: { t: 'Network Participation', d: 'Following our social channels ensures your long-term eligibility.' }
      },
      footer: { t: 'Maximum Inclusivity', d: 'If you can see this page and have a wallet address, you are likely already eligible.' }
    },
    faq: {
      tag: 'Questions',
      title: 'Frequently',
      titleItalic: 'asked',
      items: [
        { q: "Why is the SOL contribution so low compared to the estimated VDX value?", a: "We are in the critical Phase 3 fundraising stage with a $500k goal. To reward earliest pioneers, we offer Genesis allocation at a significant protocol-incentivized discount." },
        { q: "What is Proof-of-Growth consensus?", a: "Validators must stake VDX and maintain a verified ecological footprint score." },
        { q: "Is VDX compatible with Ethereum?", a: "Yes. Verdex implements a full EVM-compatible execution environment." }
      ]
    },
    waitlist: {
      tag: 'Early Access',
      title: 'Be first to',
      titleItalic: 'grow',
      desc: 'Join over 14,678 early adopters securing their spot. We are raising $500k to fund Phase 3 development.',
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
        interest: "I'm interested as a",
        roles: { retail: 'Retail Investor', validator: 'Validator', dev: 'Developer' },
        agree: 'I accept the terms and consent to pay the priority processing fee.',
        cta: 'Secure My Spot →'
      }
    },
    payment: {
      tag: 'Strict Verification Protocol',
      title: 'Secure Your',
      titleItalic: 'Genesis Allocation',
      desc: 'Verdex is raising $500,000 to finance the Phase 3 roadmap development. Secure your position through the manual Airdrop Phase 1 protocol.',
      preLaunchNote: 'IMPORTANT: As the VDX token is currently in the pre-launch phase (Phase 3 Testnet), automated Smart Contract interaction is restricted to internal core validators. Manual priority transfers are the only way to secure Phase 1 Airdrop allocations before public listing.',
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
    admin: {
      title: 'Protocol Dashboard',
      subtitle: 'Waitlist Management',
      login: 'Admin Access',
      email: 'Email',
      password: 'Password',
      signIn: 'Sign In',
      stats: {
        total: 'Total Entries',
        validators: 'Validators',
        developers: 'Developers',
        investors: 'Investors'
      },
      table: {
        name: 'Name',
        email: 'Email',
        role: 'Role',
        wallet: 'Wallet',
        date: 'Date'
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
      desc: 'Verdex est un protocole de couche 1 qui transforme chaque transaction validée en un crédit carbone certifié.',
      cta1: 'Rejoindre la liste d\'attente',
      cta2: 'Explorer le Token VDX',
      stat1: 'Membres sur liste',
      stat2: 'Taux de compensation',
      stat3: 'Finalité de bloc',
    },
    features: {
      tag: 'Architecture du Protocole',
      title: 'Les trois piliers de la',
      titleItalic: 'finance',
      titleEnd: 'régénérative',
      item1Title: 'Preuve de Croissance',
      item1Desc: 'Les validateurs sont récompensés proportionnellement aux données de séquestration carbone.',
      item2Title: 'Sharding Vert',
      item2Desc: 'Le calcul est routé vers des centres de données alimentés par des énergies 100% renouvelables.',
      item3Title: 'Oracle Carbone',
      item3Desc: 'Réseau d\'oracles agrégeant plus de 14 000 points de données climatiques par seconde.',
      layers: { consensus: 'Couche de Consensus', network: 'Couche Réseau', data: 'Couche de Données' }
    },
    dashboard: {
      tag: 'Tableau de bord',
      title: 'Aperçu du',
      titleItalic: 'protocole',
      sync: 'Synchronisé avec le flux Global Oracle. (Estimation algorithmique)',
      live: 'ESTIMATION EN DIRECT',
      unlisted: 'Token non listé : estimation basée sur des algorithmes prédictifs.',
      tps: 'TPS du réseau',
      tpsSub: 'transactions / seconde',
      co2: 'CO₂ Compensé',
      co2Sub: 'tonnes métriques cette époque',
      apy: 'APY de Staking',
      apySub: 'rendement annuel estimé',
      nodes: 'Nœuds Actifs',
      nodesSub: 'validateurs en ligne',
      recent: 'Transactions Récentes',
      greenScore: 'Score Éco',
      greenSub: 'Indice de durabilité du protocole',
    },
    roadmap: {
      tag: 'Chronologie du Développement',
      title: 'Route vers le',
      titleItalic: 'mainnet',
      phases: {
        p1: 'Genèse',
        p2: 'Testnet Alpha',
        p3: 'Testnet Beta',
        p4: 'Lancement Mainnet',
        p5: 'Croissance de l\'Écosystème'
      },
      status: { completed: 'Terminé', progress: 'En cours', upcoming: 'À venir' }
    },
    criteria: {
      tag: 'Qualification',
      title: 'Comment se qualifier pour',
      titleItalic: 'Genesis VDX',
      desc: 'Verdex valorise la participation plutôt que le capital. Notre objectif est de distribuer le protocole le plus largement possible.',
      cards: {
        c1: { t: 'Portefeuille Actif', d: 'Tout portefeuille avec au moins une transaction au cours des 6 derniers mois est éligible.' },
        c2: { t: 'Engagement Éco', d: 'En rejoignant notre liste, vous répondez automatiquement à nos critères communautaires.' },
        c3: { t: 'Adopteur Précoce', d: 'Les 20 000 premiers membres sont garantis d\'une place dans l\'Airdrop Phase 1.' },
        c4: { t: 'Participation Réseau', d: 'Suivre nos canaux sociaux garantit votre éligibilité à long terme.' }
      },
      footer: { t: 'Inclusivité Maximale', d: 'Si vous voyez cette page et possédez un portefeuille, vous êtes probablement déjà éligible.' }
    },
    faq: {
      tag: 'Questions',
      title: 'Foire aux',
      titleItalic: 'questions',
      items: [
        { q: "Pourquoi la contribution SOL est-elle si basse par rapport à la valeur VDX ?", a: "Nous sommes en Phase 3 de levée de fonds. Pour récompenser les pionniers, nous offrons une remise incitative." },
        { q: "Qu'est-ce que le consensus Proof-of-Growth ?", a: "Les validateurs doivent staker des VDX et maintenir un score écologique vérifié." },
        { q: "VDX est-il compatible avec Ethereum ?", a: "Oui. Verdex implémente un environnement entièrement compatible EVM." }
      ]
    },
    waitlist: {
      tag: 'Accès Anticipé',
      title: 'Soyez les premiers à',
      titleItalic: 'croître',
      desc: 'Rejoignez plus de 14 678 adopteurs précoces. Nous levons 500k$ pour financer la Phase 3.',
      perks: [
        'Allocation Genesis Prioritaire (2 000 VDX)',
        'Caution de Validateur Réduite (-25%)',
        'Badge NFT de Validateur Fondateur',
        'Accès Privé à la Beta du Testnet',
        'Place garantie dans les 20k premiers membres'
      ],
      form: {
        name: 'Nom Complet',
        email: 'Adresse Email',
        wallet: 'Adresse Portefeuille (Optionnel)',
        interest: "Je suis intéressé en tant que",
        roles: { retail: 'Investisseur Particulier', validator: 'Validateur', dev: 'Développeur' },
        agree: 'J\'accepte les conditions et consens à payer les frais de traitement prioritaires.',
        cta: 'Sécuriser ma place →'
      }
    },
    payment: {
      tag: 'Protocole de Vérification Strict',
      title: 'Sécurisez votre',
      titleItalic: 'Allocation Genesis',
      desc: 'Verdex lève 500 000 $ pour financer la Phase 3. Sécurisez votre position via le protocole manuel Airdrop Phase 1.',
      preLaunchNote: 'IMPORTANT : Comme le token VDX est actuellement en phase de pré-lancement (Testnet Phase 3), l\'interaction automatisée par Smart Contract est restreinte aux validateurs internes. Les transferts manuels prioritaires sont le seul moyen de sécuriser les allocations avant l\'inscription publique.',
      step1: '1. Paramètres d\'Allocation',
      step1Desc: 'Sélectionnez votre niveau de contribution.',
      target: 'Cible d\'Allocation',
      min: '2 000 VDX (Min)',
      max: '50 000 VDX (Max)',
      rateInfo: 'Taux Calculé : 0,1 SOL pour 2 000 VDX. Ces fonds soutiennent la restauration planétaire.',
      step2: '2. Transfert Manuel SOL',
      step2Desc: 'Envoyez le montant exact de SOL à l\'adresse sécurisée officielle.',
      addressLabel: 'Adresse Sécurisée du Protocole (Solana)',
      transferAmount: 'Montant du Transfert',
      estValue: 'Val. Publique Est.',
      step3: '3. Vérification Finale',
      step3Desc: 'Soumettez votre ID de transaction pour déclencher la libération de l\'Airdrop.',
      txLabel: 'ID de Transaction / Signature',
      txPlaceholder: 'Collez la signature SOL ici...',
      verifyCta: 'Vérifier et Sécuriser l\'Allocation',
      steps: {
        title: 'Étapes de Vérification :',
        1: 'Le protocole surveille le cluster Solana.',
        2: 'Le cold wallet vérifie le montant de SOL.',
        3: 'Tokens VDX mis en file sous 48h.',
      },
      agreement: 'En soumettant, vous acceptez que votre allocation soit fixée.',
      cancel: 'Annuler et retourner à l\'accueil',
      success: {
        title: 'Airdrop Phase 1 Enregistré',
        desc1: 'Vérification initiée. Votre allocation de',
        desc2: 'est en cours de traitement et sera envoyée sous',
        desc3: '48 heures',
        tip: 'Recommandation : Conservez ces tokens dans votre stockage à froid jusqu\'au lancement public.',
        status: 'STATUT : PENDING_VALIDATION_PHASE_1',
        return: 'Retour au Protocole',
      }
    },
    admin: {
      title: 'Tableau de Bord',
      subtitle: 'Gestion de la Liste d\'Attente',
      login: 'Accès Admin',
      email: 'Email',
      password: 'Mot de passe',
      signIn: 'Se connecter',
      stats: {
        total: 'Total Inscrits',
        validators: 'Validateurs',
        developers: 'Développeurs',
        investors: 'Investisseurs'
      },
      table: {
        name: 'Nom',
        email: 'Email',
        role: 'Rôle',
        wallet: 'Portefeuille',
        date: 'Date'
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
  },
  es: {
    // ... translations for es, zh, hi, ar ...
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
    if (saved && ['en', 'fr', 'es', 'zh', 'hi', 'ar'].includes(saved)) {
      setLanguage(saved);
    } else {
      const browserLang = navigator.language.split('-')[0];
      if (['en', 'fr', 'es', 'zh', 'hi', 'ar'].includes(browserLang)) {
        setLanguage(browserLang as Language);
      }
    }
  }, []);

  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang);
    localStorage.setItem('verdex_lang', lang);
  };

  const t = translations[language] || translations['en'];

  return (
    <LanguageContext.Provider value={{ language, setLanguage: handleSetLanguage, t }}>
      <div dir={language === 'ar' ? 'rtl' : 'ltr'} className={language === 'ar' ? 'text-right' : ''}>
        {children}
      </div>
    </LanguageContext.Provider>
  );
}

export function useTranslation() {
  const context = useContext(LanguageContext);
  if (!context) throw new Error('useTranslation must be used within a LanguageProvider');
  return context;
}
