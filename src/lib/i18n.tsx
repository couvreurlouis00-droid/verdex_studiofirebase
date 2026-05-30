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
    nav: {
      token: 'Token',
      roadmap: 'Hoja de ruta',
      dashboard: 'Panel',
      faq: 'Preguntas',
      eligibility: 'Guía de elegibilidad',
      join: 'Unirse a la lista',
    },
    hero: {
      tag: 'Lanzamiento Mainnet · 1 de septiembre de 2026',
      title1: 'La Blockchain',
      title2: 'Neutral en Carbono',
      title3: 'para un Planeta Vivo.',
      desc: 'Verdex es un protocolo de capa 1 que convierte cada transacción validada en una compensación de carbono certificada.',
      cta1: 'Unirse a la lista de espera',
      cta2: 'Explorar Token VDX',
      stat1: 'Miembros en lista',
      stat2: 'Tasa de compensación',
      stat3: 'Finalidad de bloque',
    },
    features: {
      tag: 'Arquitectura del Protocolo',
      title: 'Tres pilares de la',
      titleItalic: 'finanza',
      titleEnd: 'regenerativa',
      item1Title: 'Prueba de Crecimiento',
      item1Desc: 'Los validadores son recompensados proporcionalmente a los datos de secuestro de carbono.',
      item2Title: 'Sharding Verde',
      item2Desc: 'El cálculo se dirige a centros de datos alimentados por energía 100% renovable.',
      item3Title: 'Oráculo de Carbono',
      item3Desc: 'Red de oráculos que agrega más de 14.000 puntos de datos climáticos por segundo.',
      layers: { consensus: 'Capa de Consenso', network: 'Capa de Red', data: 'Capa de Datos' }
    },
    dashboard: {
      tag: 'Panel',
      title: 'Protocolo de un',
      titleItalic: 'vistazo',
      sync: 'Sincronizado con Global Oracle. (Estimación algorítmica)',
      live: 'ESTIMACIÓN EN VIVO',
      unlisted: 'Token no listado: estimación basada en algoritmos predictivos.',
      tps: 'TPS de la red',
      tpsSub: 'transacciones / segundo',
      co2: 'CO₂ Compensado',
      co2Sub: 'toneladas métricas esta época',
      apy: 'APY de Staking',
      apySub: 'rendimiento anual estimado',
      nodes: 'Nodos Activos',
      nodesSub: 'validadores en línea',
      recent: 'Transacciones Recientes',
      greenScore: 'Puntuación Eco',
      greenSub: 'Índice de sostenibilidad del protocolo',
    },
    roadmap: {
      tag: 'Cronograma de Desarrollo',
      title: 'Camino al',
      titleItalic: 'mainnet',
      phases: {
        p1: 'Génesis',
        p2: 'Testnet Alpha',
        p3: 'Testnet Beta',
        p4: 'Lanzamiento Mainnet',
        p5: 'Crecimiento del Ecosistema'
      },
      status: { completed: 'Completado', progress: 'En curso', upcoming: 'Próximo' }
    },
    criteria: {
      tag: 'Calificación',
      title: 'Cómo calificar para',
      titleItalic: 'Genesis VDX',
      desc: 'Verdex valora la participación sobre el capital. Nuestro objetivo es distribuir el protocolo lo más ampliamente posible.',
      cards: {
        c1: { t: 'Billetera Activa', d: 'Cualquier billetera con al menos una transacción en los últimos 6 meses califica.' },
        c2: { t: 'Compromiso Eco', d: 'Al unirse a nuestra lista, cumple automáticamente con nuestros criterios comunitarios.' },
        c3: { t: 'Adoptador Temprano', d: 'Los primeros 20.000 miembros tienen asegurado un lugar en el Airdrop Fase 1.' },
        c4: { t: 'Participación en Red', d: 'Seguir nuestros canales sociales asegura su elegibilidad a largo plazo.' }
      },
      footer: { t: 'Inclusividad Máxima', d: 'Si puede ver esta página y tiene una billetera, probablemente ya sea elegible.' }
    },
    faq: {
      tag: 'Preguntas',
      title: 'Preguntas',
      titleItalic: 'frecuentes',
      items: [
        { q: "¿Por qué la contribución SOL es tan baja comparada con el valor VDX?", a: "Estamos en la Fase 3 de recaudación. Para recompensar a los pioneros, ofrecemos un descuento incentivado." },
        { q: "¿Qué es el consenso Proof-of-Growth?", a: "Los validadores deben staker VDX y mantener una puntuación ecológica verificada." },
        { q: "¿VDX es compatible con Ethereum?", a: "Sí. Verdex implementa un entorno totalmente compatible con EVM." }
      ]
    },
    waitlist: {
      tag: 'Acceso Temprano',
      title: 'Sé el primero en',
      titleItalic: 'crecer',
      desc: 'Únete a más de 14.678 adoptadores tempranos. Estamos recaudando $500k para financiar la Fase 3.',
      perks: [
        'Asignación Génesis Prioritaria (2.000 VDX)',
        'Fianza de Validador Reducida (-25%)',
        'Insignia NFT de Validador Fundador',
        'Acceso Privado a la Beta de Testnet',
        'Lugar garantizado en los primeros 20k miembros'
      ],
      form: {
        name: 'Nombre Completo',
        email: 'Correo Electrónico',
        wallet: 'Dirección de Billetera (Opcional)',
        interest: "Estoy interesado como",
        roles: { retail: 'Inversor Minorista', validator: 'Validador', dev: 'Desarrollador' },
        agree: 'Acepto los términos y consiento pagar la tarifa de procesamiento prioritario.',
        cta: 'Asegurar mi lugar →'
      }
    },
    payment: {
      tag: 'Protocolo de Verificación Estricto',
      title: 'Asegura tu',
      titleItalic: 'Asignación Génesis',
      desc: 'Verdex está recaudando $500,000 para financiar la Fase 3. Asegura tu posición mediante el protocolo manual Airdrop Fase 1.',
      preLaunchNote: 'IMPORTANTE: Como el token VDX está en fase de prelanzamiento (Testnet Fase 3), la interacción automatizada está restringida. Los traslados manuales son la única forma de asegurar asignaciones.',
      step1: '1. Ajustes de Asignación',
      step1Desc: 'Selecciona tu nivel de contribución.',
      target: 'Objetivo de Asignación',
      min: '2.000 VDX (Min)',
      max: '50.000 VDX (Max)',
      rateInfo: 'Tasa Calculada: 0,1 SOL por 2.000 VDX. Estos fondos apoyan la restauración planetaria.',
      step2: '2. Transferencia Manual SOL',
      step2Desc: 'Envía el monto exacto de SOL a la dirección segura oficial.',
      addressLabel: 'Dirección Segura del Protocolo (Solana)',
      transferAmount: 'Monto de Transferencia',
      estValue: 'Val. Pública Est.',
      step3: '3. Verificación Final',
      step3Desc: 'Envía tu ID de transacción para activar la liberación del Airdrop.',
      txLabel: 'ID de Transacción / Firma',
      txPlaceholder: 'Pega la firma SOL aquí...',
      verifyCta: 'Verificar y Asegurar Asignación',
      steps: {
        title: 'Pasos de Verificación:',
        1: 'El protocolo monitorea el cluster Solana.',
        2: 'La billetera fría verifica el monto de SOL.',
        3: 'Tokens VDX en cola en menos de 48h.',
      },
      agreement: 'Al enviar, aceptas que tu asignación es fija.',
      cancel: 'Cancelar y volver al inicio',
      success: {
        title: 'Airdrop Fase 1 Registrado',
        desc1: 'Verificación iniciada. Tu asignación de',
        desc2: 'está siendo procesada y se enviará en',
        desc3: '48 horas',
        tip: 'Recomendación: Mantén estos tokens en tu almacenamiento frío hasta el lanzamiento público.',
        status: 'ESTADO: PENDING_VALIDATION_PHASE_1',
        return: 'Volver al Protocolo',
      }
    },
    admin: {
      title: 'Panel de Control',
      subtitle: 'Gestión de Lista de Espera',
      login: 'Acceso Admin',
      email: 'Correo',
      password: 'Contraseña',
      signIn: 'Entrar',
      stats: {
        total: 'Total Inscritos',
        validators: 'Validadores',
        developers: 'Desarrolladores',
        investors: 'Inversores'
      },
      table: {
        name: 'Nombre',
        email: 'Correo',
        role: 'Rol',
        wallet: 'Billetera',
        date: 'Fecha'
      }
    },
    footer: {
      desc: 'El protocolo Layer-1 neutral en carbono. Construido para el planeta.',
      protocol: 'Protocolo',
      whitepaper: 'Libro Blanco',
      docs: 'Documentación',
      audit: 'Informes de Auditoría',
      copy: '© 2025 Fundación del Protocolo Verdex',
      made: 'Hecho con 🌱 & curiosidad',
    }
  },
  zh: {
    nav: {
      token: '代币',
      roadmap: '路线图',
      dashboard: '仪表板',
      faq: '常见问题',
      eligibility: '资格指南',
      join: '加入候补名单',
    },
    hero: {
      tag: '主网发布 · 2026年9月1日',
      title1: '碳中和',
      title2: '区块链',
      title3: '为了一个充满活力的星球。',
      desc: 'Verdex 是一个 Layer-1 增长证明协议，将每笔验证交易转化为认证碳抵消。',
      cta1: '加入候补名单',
      cta2: '探索 VDX 代币',
      stat1: '名单成员',
      stat2: '碳抵消率',
      stat3: '区块最终性',
    },
    features: {
      tag: '协议架构',
      title: '再生金融的三大',
      titleItalic: '再生',
      titleEnd: '支柱',
      item1Title: '增长证明',
      item1Desc: '验证者根据来自物联网森林传感器的经验证碳封存数据获得奖励。',
      item2Title: '绿色分片',
      item2Desc: '动态分片将计算路由到由 100% 可再生能源供电的数据中心。',
      item3Title: '碳预言机',
      item3Desc: '去中心化预言机网络每秒聚合超过 14,000 个气候数据点。',
      layers: { consensus: '共识层', network: '网络层', data: '数据层' }
    },
    dashboard: {
      tag: '仪表板',
      title: '协议',
      titleItalic: '概览',
      sync: '与全球预言机同步（算法估算）',
      live: '实时估算',
      unlisted: '代币未上市：基于预测算法的估算。',
      tps: '网络 TPS',
      tpsSub: '交易 / 秒',
      co2: '二氧化碳抵消',
      co2Sub: '本阶段公吨',
      apy: '质押 APY（预测）',
      apySub: '预计年收益率',
      nodes: '活跃节点',
      nodesSub: '在线验证者',
      recent: '近期交易',
      greenScore: '绿色评分',
      greenSub: '协议可持续性指数',
    },
    roadmap: {
      tag: '开发时间表',
      title: '通往',
      titleItalic: '主网',
      phases: {
        p1: '创世',
        p2: '测试网 Alpha',
        p3: '测试网 Beta',
        p4: '主网启动',
        p5: '生态系统增长'
      },
      status: { completed: '已完成', progress: '进行中', upcoming: '即将到来' }
    },
    criteria: {
      tag: '资格',
      title: '如何获得',
      titleItalic: 'Genesis VDX 资格',
      desc: 'Verdex 重视参与而非资本。我们的目标是尽可能广泛地分发协议。',
      cards: {
        c1: { t: '活跃钱包', d: '过去 6 个月内至少有一笔交易的任何区块链钱包均符合资格。' },
        c2: { t: '生态承诺', d: '加入我们的名单，即自动符合我们的主要社区标准。' },
        c3: { t: '早期采用者', d: '前 20,000 名成员保证获得创世第 1 阶段空投名额。' },
        c4: { t: '网络参与', d: '关注我们的社交渠道可确保您的长期资格。' }
      },
      footer: { t: '最大包容性', d: '如果您能看到此页面并拥有钱包地址，您可能已经符合资格。' }
    },
    faq: {
      tag: '问题',
      title: '常见',
      titleItalic: '问题',
      items: [
        { q: "为什么 SOL 贡献与预计 VDX 价值相比这么低？", a: "我们正处于关键的第 3 阶段筹资期。为了奖励早期先驱，我们提供大幅折扣。" },
        { q: "什么是增长证明共识？", a: "验证者必须质押 VDX 并维持经验证的生态足迹评分。" },
        { q: "VDX 兼容以太坊吗？", a: "是的。Verdex 实现了完整的 EVM 兼容执行环境。" }
      ]
    },
    waitlist: {
      tag: '早期访问',
      title: '成为首批',
      titleItalic: '成长的',
      desc: '加入超过 14,678 名早期采用者。我们正在筹集 50 万美元用于第 3 阶段开发。',
      perks: [
        '优先创世分配（2,000 VDX）',
        '降低验证者保证金 (-25%)',
        '创始验证者 NFT 徽章',
        '私有测试网 Beta 访问权限',
        '保证获得前 20k 名额'
      ],
      form: {
        name: '全名',
        email: '电子邮箱',
        wallet: '钱包地址（可选）',
        interest: "我感兴趣的身份是",
        roles: { retail: '零售投资者', validator: '验证者', dev: '开发者' },
        agree: '我接受条款并同意支付优先处理费用。',
        cta: '锁定我的名额 →'
      }
    },
    payment: {
      tag: '严格验证协议',
      title: '确保您的',
      titleItalic: '创世分配',
      desc: 'Verdex 正在筹集 500,000 美元用于第 3 阶段开发。通过手动空投协议确保您的位置。',
      preLaunchNote: '重要：VDX 目前处于预发布阶段，自动智能合约受限。手动转账是目前唯一确保分配的方式。',
      step1: '1. 分配设置',
      step1Desc: '选择您的贡献级别。',
      target: '分配目标',
      min: '2,000 VDX (最小)',
      max: '50,000 VDX (最大)',
      rateInfo: '计算汇率：每 2,000 VDX 需 0.1 SOL。资金支持地球修复。',
      step2: '2. 手动 SOL 转账',
      step2Desc: '发送精确的 SOL 金额到官方安全地址。',
      addressLabel: '协议安全地址 (Solana)',
      transferAmount: '转账金额',
      estValue: '预计公开价值',
      step3: '3. 最终验证',
      step3Desc: '提交您的交易 ID 以触发空投释放。',
      txLabel: '交易 ID / 签名',
      txPlaceholder: '在此粘贴 SOL 签名...',
      verifyCta: '验证并确保分配',
      steps: {
        title: '验证步骤：',
        1: '协议监控 Solana 集群匹配。',
        2: '冷钱包交叉引用 SOL 金额。',
        3: 'VDX 代币在 48 小时内排队分发。',
      },
      agreement: '提交即表示您同意分配固定。',
      cancel: '取消并返回首页',
      success: {
        title: '空投第 1 阶段已注册',
        desc1: '协议验证已启动。您的',
        desc2: '分配正在处理中，将在',
        desc3: '48 小时内',
        tip: '建议：将这些代币保存在冷钱包中，直到正式发布。',
        status: '验证状态：PEND_VALIDATION_PHASE_1',
        return: '返回协议',
      }
    },
    admin: {
      title: '协议仪表板',
      subtitle: '候补名单管理',
      login: '管理员访问',
      email: '邮箱',
      password: '密码',
      signIn: '登录',
      stats: {
        total: '总登记数',
        validators: '验证者',
        developers: '开发者',
        investors: '投资者'
      },
      table: {
        name: '姓名',
        email: '邮箱',
        role: '角色',
        wallet: '钱包',
        date: '日期'
      }
    },
    footer: {
      desc: '碳中和 Layer-1 协议。为了地球而建。',
      protocol: '协议',
      whitepaper: '白皮书',
      docs: '文档',
      audit: '审计报告',
      copy: '© 2025 Verdex 协议基金会',
      made: '由 🌱 & 好奇心驱动',
    }
  },
  hi: {
    nav: {
      token: 'टोकन',
      roadmap: 'रोडमैप',
      dashboard: 'डैशबोर्ड',
      faq: 'एफएक्यू',
      eligibility: 'पात्रता गाइड',
      join: 'प्रतीक्षा सूची में शामिल हों',
    },
    hero: {
      tag: 'मेननेट लॉन्च · 1 सितंबर, 2026',
      title1: 'कार्बन-न्यूट्रल',
      title2: 'ब्लॉकचेन',
      title3: 'एक जीवित ग्रह के लिए।',
      desc: 'Verdex एक लेयर-1 प्रूफ-ऑफ-ग्रोथ प्रोटोकॉल है जो हर मान्य लेनदेन को प्रमाणित कार्बन ऑफसेट में बदल देता है।',
      cta1: 'प्रतीक्षा सूची में शामिल हों',
      cta2: 'VDX टोकन देखें',
      stat1: 'सूची सदस्य',
      stat2: 'कार्बन ऑफसेट दर',
      stat3: 'ब्लॉक फाइनलिटी',
    },
    features: {
      tag: 'प्रोटोकॉल वास्तुकला',
      title: 'पुनर्योजी वित्त के',
      titleItalic: 'पुनर्योजी',
      titleEnd: 'तीन स्तंभ',
      item1Title: 'प्रूफ-ऑफ-ग्रोथ',
      item1Desc: 'वैधकर्ताओं को वन सेंसर डेटा के आधार पर कार्बन के बदले पुरस्कृत किया जाता है।',
      item2Title: 'ग्रीन शार्डिंग',
      item2Desc: 'गणना को 100% नवीकरणीय ऊर्जा द्वारा संचालित डेटा केंद्रों पर भेजा जाता है।',
      item3Title: 'कार्बन ऑरेकल',
      item3Desc: 'विकेंद्रीकृत ऑरेकल नेटवर्क प्रति सेकंड 14,000+ डेटा पॉइंट एकत्र करता है।',
      layers: { consensus: 'आम सहमति परत', network: 'नेटवर्क परत', data: 'डेटा परत' }
    },
    dashboard: {
      tag: 'डैशबोर्ड',
      title: 'प्रोटोकॉल एक',
      titleItalic: 'नज़र में',
      sync: 'ग्लोबल ऑरेकल फीड के साथ सिंक किया गया।',
      live: 'लाइव अनुमान',
      unlisted: 'टोकन सूचीबद्ध नहीं: भविष्य कहनेवाला एल्गोरिदम पर आधारित।',
      tps: 'नेटवर्क TPS',
      tpsSub: 'लेनदेन / सेकंड',
      co2: 'CO₂ ऑफसेट',
      co2Sub: 'मीट्रिक टन इस युग',
      apy: 'स्टेकिंग APY',
      apySub: 'अनुमानित वार्षिक उपज',
      nodes: 'सक्रिय नोड्स',
      nodesSub: 'ऑनलाइन वैधकर्ता',
      recent: 'हाल के लेनदेन',
      greenScore: 'ग्रीन स्कोर',
      greenSub: 'प्रोटोकॉल स्थिरता सूचकांक',
    },
    roadmap: {
      tag: 'विकास समयरेखा',
      title: 'मेननेट का',
      titleItalic: 'रास्ता',
      phases: {
        p1: 'उत्पत्ति',
        p2: 'टेस्टनेट अल्फा',
        p3: 'टेस्टनेट बीटा',
        p4: 'मेननेट लॉन्च',
        p5: 'पारिस्थितिकी तंत्र विकास'
      },
      status: { completed: 'पूरा हुआ', progress: 'प्रगति पर', upcoming: 'आगामी' }
    },
    criteria: {
      tag: 'योग्यता',
      title: 'कैसे योग्य बनें',
      titleItalic: 'Genesis VDX के लिए',
      desc: 'Verdex पूंजी के बजाय भागीदारी को महत्व देता है। हमारा लक्ष्य प्रोटोकॉल को व्यापक रूप से वितरित करना है।',
      cards: {
        c1: { t: 'सक्रिय वॉलेट', d: 'कोई भी वॉलेट जिसमें पिछले 6 महीनों में कम से कम एक लेनदेन हुआ हो।' },
        c2: { t: 'पर्यावरण प्रतिबद्धता', d: 'हमारी सूची में शामिल होकर, आप स्वतः ही मानदंडों को पूरा करते हैं।' },
        c3: { t: 'शुरुआती अपनाने वाले', d: 'पहले 20,000 सदस्यों को एयरड्रॉप में जगह की गारंटी है।' },
        c4: { t: 'नेटवर्क भागीदारी', d: 'हमारे सोशल चैनलों का पालन करना आपकी पात्रता सुनिश्चित करता है।' }
      },
      footer: { t: 'अधिकतम समावेशिता', d: 'यदि आप यह पृष्ठ देख सकते हैं, तो आप संभवतः पहले से ही पात्र हैं।' }
    },
    faq: {
      tag: 'प्रश्न',
      title: 'अक्सर पूछे जाने वाले',
      titleItalic: 'प्रश्न',
      items: [
        { q: "VDX मूल्य की तुलना में SOL योगदान इतना कम क्यों है?", a: "हम महत्वपूर्ण चरण 3 फंड जुटाने में हैं। शुरुआती अग्रदूतों को पुरस्कृत करने के लिए छूट दी जा रही है।" },
        { q: "प्रूफ-ऑफ-ग्रोथ क्या है?", a: "वैधकर्ताओं को VDX दांव पर लगाना होगा और एक स्कोर बनाए रखना होगा।" },
        { q: "क्या VDX एथेरियम के साथ संगत है?", a: "हाँ, यह EVM संगत है।" }
      ]
    },
    waitlist: {
      tag: 'जल्दी पहुंच',
      title: 'पहले बनें',
      titleItalic: 'बढ़ने के लिए',
      desc: '14,678 से अधिक शुरुआती अपनाने वालों में शामिल हों।',
      perks: [
        'प्राथमिकता आवंटन (2,000 VDX)',
        'कम वैधकर्ता बांड (-25%)',
        'संस्थापक वैधकर्ता NFT',
        'टेस्टनेट बीटा एक्सेस',
        'पहले 20k सदस्यों में गारंटी'
      ],
      form: {
        name: 'पूरा नाम',
        email: 'ईमेल पता',
        wallet: 'वॉलेट पता (वैकल्पिक)',
        interest: "मेरी रुचि है एक",
        roles: { retail: 'खुदरा निवेशक', validator: 'वैधकर्ता', dev: 'डेवलपर' },
        agree: 'मैं शर्तों को स्वीकार करता हूँ।',
        cta: 'मेरी जगह सुरक्षित करें →'
      }
    },
    payment: {
      tag: 'सख्त सत्यापन प्रोटोकॉल',
      title: 'सुरक्षित करें अपना',
      titleItalic: 'उत्पत्ति आवंटन',
      desc: 'Verdex चरण 3 के लिए $500,000 जुटा रहा है।',
      preLaunchNote: 'महत्वपूर्ण: VDX अभी प्री-लॉन्च चरण में है, इसलिए स्वचालित अनुबंध प्रतिबंधित हैं। मैन्युअल हस्तांतरण एकमात्र तरीका है।',
      step1: '1. आवंटन सेटिंग्स',
      step1Desc: 'अपना योगदान स्तर चुनें।',
      target: 'आवंटन लक्ष्य',
      min: '2,000 VDX (न्यूनतम)',
      max: '50,000 VDX (अधिकतम)',
      rateInfo: 'दर: 0.1 SOL प्रति 2,000 VDX।',
      step2: '2. मैन्युअल SOL हस्तांतरण',
      step2Desc: 'आधिकारिक पते पर SOL भेजें।',
      addressLabel: 'प्रोटोकॉल सुरक्षित पता (Solana)',
      transferAmount: 'हस्तांतरण राशि',
      estValue: 'अनुमानित मूल्य',
      step3: '3. अंतिम सत्यापन',
      step3Desc: 'एयरड्रॉप के लिए अपनी ट्रांजैक्शन आईडी सबमिट करें।',
      txLabel: 'ट्रांजैक्शन आईडी / सिग्नेचर',
      txPlaceholder: 'यहाँ पेस्ट करें...',
      verifyCta: 'सत्यापित करें और सुरक्षित करें',
      steps: {
        title: 'सत्यापन चरण:',
        1: 'प्रोटोकॉल मैच के लिए मॉनिटर करता है।',
        2: 'कोल्ड वॉलेट राशि की जाँच करता है।',
        3: '48 घंटों में टोकन एयरड्रॉप किए जाएंगे।',
      },
      agreement: 'सबमिट करके, आप सहमत हैं कि आवंटन तय है।',
      cancel: 'रद्द करें और घर वापस जाएँ',
      success: {
        title: 'एयरड्रॉप चरण 1 पंजीकृत',
        desc1: 'सत्यापन शुरू। आपका आवंटन',
        desc2: 'प्रक्रिया में है और भेजा जाएगा',
        desc3: '48 घंटों के भीतर',
        tip: 'सिफारिश: इन टोकन को सार्वजनिक लॉन्च तक सुरक्षित रखें।',
        status: 'स्थिति: PENDING_VALIDATION_PHASE_1',
        return: 'प्रोटोकॉल पर वापस लौटें',
      }
    },
    admin: {
      title: 'प्रोटोकॉल डैशबोर्ड',
      subtitle: 'प्रतीक्षा सूची प्रबंधन',
      login: 'एडमिन एक्सेस',
      email: 'ईमेल',
      password: 'पासवर्ड',
      signIn: 'साइन इन करें',
      stats: {
        total: 'कुल प्रविष्टियाँ',
        validators: 'वैधकर्ता',
        developers: 'डेवलपर्स',
        investors: 'निवेशक'
      },
      table: {
        name: 'नाम',
        email: 'ईमेल',
        role: 'भूमिका',
        wallet: 'वॉलेट',
        date: 'तारीख'
      }
    },
    footer: {
      desc: 'कार्बन-न्यूट्रal लेयर-1 प्रोटोकॉल। ग्रह के लिए निर्मित।',
      protocol: 'प्रोटोकॉल',
      whitepaper: 'श्वेतपत्र',
      docs: 'दस्तावेज़',
      audit: 'ऑडिट रिपोर्ट',
      copy: '© 2025 वर्डेक्स प्रोटोकॉल फाउंडेशन',
      made: '🌱 और जिज्ञासा के साथ निर्मित',
    }
  },
  ar: {
    nav: {
      token: 'الرمز',
      roadmap: 'خارطة الطريق',
      dashboard: 'لوحة القيادة',
      faq: 'الأسئلة الشائعة',
      eligibility: 'دليل الأهلية',
      join: 'انضم للقائمة',
    },
    hero: {
      tag: 'إطلاق الشبكة الرئيسية · 1 سبتمبر 2026',
      title1: 'بروتوكول محايد',
      title2: 'للكربون',
      title3: 'من أجل كوكب حي.',
      desc: 'فيرديكس هو بروتوكول من الطبقة الأولى يحول كل معاملة إلى رصيد كربون معتمد.',
      cta1: 'انضم للقائمة',
      cta2: 'استكشف رمز VDX',
      stat1: 'أعضاء القائمة',
      stat2: 'معدل تعويض الكربون',
      stat3: 'نهائية الكتلة',
    },
    features: {
      tag: 'بنية البروتوكول',
      title: 'الركائز الثلاث للتمويل',
      titleItalic: 'التمويل',
      titleEnd: 'التجديدي',
      item1Title: 'إثبات النمو',
      item1Desc: 'تتم مكافأة المدققين بناءً على بيانات عزل الكربون الموثقة.',
      item2Title: 'التجزئة الخضراء',
      item2Desc: 'توجيه الحوسبة إلى مراكز بيانات تعمل بالطاقة المتجددة بنسبة 100%.',
      item3Title: 'أوراكل الكربون',
      item3Desc: 'شبكة أوراكل تجمع أكثر من 14,000 نقطة بيانات مناخية في الثانية.',
      layers: { consensus: 'طبقة الإجماع', network: 'طبقة الشبكة', data: 'طبقة البيانات' }
    },
    dashboard: {
      tag: 'لوحة القيادة',
      title: 'لمحة عن',
      titleItalic: 'البروتوكول',
      sync: 'متزامن مع أوراكل العالمية.',
      live: 'تقدير مباشر',
      unlisted: 'الرمز غير مدرج: التقدير بناءً على خوارزميات تنبؤية.',
      tps: 'معاملات الشبكة',
      tpsSub: 'معاملة / ثانية',
      co2: 'تعويض الكربون',
      co2Sub: 'طن متري هذه الحقبة',
      apy: 'عائد التخزين',
      apySub: 'العائد السنوي المقدر',
      nodes: 'العقد النشطة',
      nodesSub: 'مدققون متصلون',
      recent: 'المعاملات الأخيرة',
      greenScore: 'النتيجة الخضراء',
      greenSub: 'مؤشر استدامة البروتوكول',
    },
    roadmap: {
      tag: 'الجدول الزمني',
      title: 'الطريق نحو',
      titleItalic: 'الشبكة',
      phases: {
        p1: 'البداية',
        p2: 'الشبكة التجريبية ألفا',
        p3: 'الشبكة التجريبية بيتا',
        p4: 'إطلاق الشبكة الرئيسية',
        p5: 'نمو النظام البيئي'
      },
      status: { completed: 'اكتمل', progress: 'قيد التنفيذ', upcoming: 'قادم' }
    },
    criteria: {
      tag: 'المؤهلات',
      title: 'كيف تتأهل لـ',
      titleItalic: 'Genesis VDX',
      desc: 'يقدر فيرديكس المشاركة على رأس المال. هدفنا هو توزيع البروتوكول على نطاق واسع.',
      cards: {
        c1: { t: 'محفظة نشطة', d: 'أي محفظة قامت بمعاملة واحدة على الأقل في آخر 6 أشهر مؤهلة.' },
        c2: { t: 'الالتزام البيئي', d: 'من خلال الانضمام لقائمتنا، تستوفي تلقائياً معاييرنا.' },
        c3: { t: 'المتبنون الأوائل', d: 'أول 20,000 عضو يضمنون مكاناً في الإنزال الجوي.' },
        c4: { t: 'المشاركة في الشبكة', d: 'متابعة قنواتنا تضمن أهليتك على المدى الطويل.' }
      },
      footer: { t: 'شمولية قصوى', d: 'إذا كنت ترى هذه الصفحة ولديك محفظة، فأنت مؤهل بالفعل.' }
    },
    faq: {
      tag: 'أسئلة',
      title: 'الأسئلة',
      titleItalic: 'الشائعة',
      items: [
        { q: "لماذا مساهمة SOL منخفضة مقارنة بقيمة VDX؟", a: "نحن في مرحلة حرجة لجمع التمويل. نقدم خصماً تشجيعياً للمتبنين الأوائل." },
        { q: "ما هو إثبات النمو؟", a: "يجب على المدققين رهن VDX والحفاظ على سجل بيئي موثق." },
        { q: "هل VDX متوافق مع إيثيريوم؟", a: "نعم، البروتوكول متوافق تماماً مع EVM." }
      ]
    },
    waitlist: {
      tag: 'وصول مبكر',
      title: 'كن أول من',
      titleItalic: 'ينمو',
      desc: 'انضم إلى أكثر من 14,678 متبنٍ مبكر.',
      perks: [
        'تخصيص أولي ذو أولوية (2,000 VDX)',
        'تخفيض ضمان المدقق (-25%)',
        'شارة NFT للمدقق المؤسس',
        'وصول خاص للشبكة التجريبية',
        'مكان مضمون لأول 20 ألف عضو'
      ],
      form: {
        name: 'الاسم الكامل',
        email: 'البريد الإلكتروني',
        wallet: 'عنوان المحفظة (اختياري)',
        interest: "أنا مهتم بصفتي",
        roles: { retail: 'مستثمر تجزئة', validator: 'مدقق', dev: 'مطور' },
        agree: 'أوافق على الشروط وأوافق على دفع رسوم المعالجة.',
        cta: 'احجز مكاني الآن ←'
      }
    },
    payment: {
      tag: 'بروتوكول تحقق صارم',
      title: 'أمن تخصيصك',
      titleItalic: 'الأولي',
      desc: 'يجمع فيرديكس 500,000 دولار لتمويل المرحلة الثالثة.',
      preLaunchNote: 'هام: VDX في مرحلة ما قبل الإطلاق، لذا فإن العقود التلقائية مقيدة. التحويل اليدوي هو الوسيلة الوحيدة حالياً.',
      step1: '1. إعدادات التخصيص',
      step1Desc: 'اختر مستوى مساهمتك.',
      target: 'التخصيص المستهدف',
      min: '2,000 VDX (حد أدنى)',
      max: '50,000 VDX (حد أقصى)',
      rateInfo: 'المعدل: 0.1 SOL لكل 2,000 VDX. الأموال تدعم استعادة الكوكب.',
      step2: '2. تحويل SOL يدوي',
      step2Desc: 'أرسل مبلغ SOL المحدد إلى العنوان الرسمي الآمن.',
      addressLabel: 'عنوان البروتوكول الآمن (Solana)',
      transferAmount: 'مبلغ التحويل',
      estValue: 'القيمة العامة المقدرة',
      step3: '3. التحقق النهائي',
      step3Desc: 'أرسل معرف المعاملة لتفعيل صرف الإنزال الجوي.',
      txLabel: 'معرف المعاملة / التوقيع',
      txPlaceholder: 'الصق توقيع SOL هنا...',
      verifyCta: 'تحقق وتأمين التخصيص',
      steps: {
        title: 'خطوات التحقق:',
        1: 'البروتوكول يراقب شبكة Solana للمطابقة.',
        2: 'المحفظة الباردة تتحقق من مبلغ SOL.',
        3: 'سيتم إرسال الرموز في غضون 48 ساعة.',
      },
      agreement: 'بالإرسال، فإنك توافق على أن التخصيص ثابت.',
      cancel: 'إلغاء والعودة للرئيسية',
      success: {
        title: 'تم تسجيل المرحلة الأولى من الإنزال',
        desc1: 'بدء التحقق. تخصيصك من',
        desc2: 'قيد المعالجة وسيتم إرساله في غضون',
        desc3: '48 ساعة',
        tip: 'توصية: احتفظ بهذه الرموز في محفظتك الباردة حتى الإطلاق العام الرسمي.',
        status: 'حالة التحقق: PENDING_VALIDATION_PHASE_1',
        return: 'العودة للبروتوكول',
      }
    },
    admin: {
      title: 'لوحة تحكم البروتوكول',
      subtitle: 'إدارة قائمة الانتظار',
      login: 'دخول المسؤول',
      email: 'البريد الإلكتروني',
      password: 'كلمة المرور',
      signIn: 'تسجيل الدخول',
      stats: {
        total: 'إجمالي القيود',
        validators: 'المدققون',
        developers: 'المطورون',
        investors: 'المستثمرون'
      },
      table: {
        name: 'الاسم',
        email: 'البريد الإلكتروني',
        role: 'الدور',
        wallet: 'المحفظة',
        date: 'التاريخ'
      }
    },
    footer: {
      desc: 'بروتوكول الطبقة الأولى المحايد للكربون. بني من أجل الكوكب.',
      protocol: 'البروتوكول',
      whitepaper: 'الورقة البيضاء',
      docs: 'التوثيق',
      audit: 'تقارير التدقيق',
      copy: '© 2025 مؤسسة بروتوكول فيرديكس',
      made: 'صنع بـ 🌱 وفضول',
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
    if (saved && ['en', 'fr', 'es', 'zh', 'hi', 'ar'].includes(saved)) {
      setLanguage(saved);
    } else {
      const browserLang = typeof navigator !== 'undefined' ? navigator.language.split('-')[0] : 'en';
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
