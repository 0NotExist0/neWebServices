import { WebService } from '@/types/services';

export const EBAY_STORE_URL =
  process.env.NEXT_PUBLIC_EBAY_STORE_URL ||
  'https://www.ebay.it/sch/i.html?item=287591702835&rt=nc&_trksid=p4429486.m3561.l161211&_ssn=newebservices';

export const EBAY_LISTING_URL =
  process.env.NEXT_PUBLIC_EBAY_LISTING_URL || 'https://www.ebay.it/itm/287591702835';

export const EBAY_USERNAME = process.env.NEXT_PUBLIC_EBAY_USERNAME || 'newebservices';

export const WEB_SERVICES: WebService[] = [
  {
    id: 'sito-vetrina',
    title: 'Sito Web Vetrina & Portfolio',
    subtitle: 'Presenza online elegante, veloce e professionale',
    description:
      'Realizzazione di un sito web moderno e completamente su misura per la tua attività o brand. Design responsive ottimizzato per smartphone e posizionamento Google.',
    startingPrice: 199.0,
    badge: 'Ideale per Iniziare',
    deliveryDays: '3 - 5 giorni lavorativi',
    features: [
      'Design personalizzato moderno e responsive',
      'Ottimizzazione SEO e indicizzazione Google',
      'Certificato SSL HTTPS e dominio personalizzato',
      'Hosting ultraveloce (Vercel / Cloudflare)',
      'Moduli di contatto e pulsante WhatsApp diretto',
      'Statistiche visite integrate',
    ],
    techStack: ['Next.js', 'React', 'Tailwind CSS', 'Vercel'],
    ebayListingUrl: EBAY_STORE_URL,
    popular: false,
  },
  {
    id: 'sito-ecommerce-drive',
    title: 'E-Commerce con Sync Google Drive',
    subtitle: 'Vendi online gestendo foto e prezzi direttamente da Drive',
    description:
      'Il sistema rivoluzionario per vendere prodotti online senza pannelli di controllo complicati. Ti basta trascinare le foto nella cartella Google Drive per aggiornare il negozio in tempo reale.',
    startingPrice: 349.0,
    badge: 'Inserzione Ufficiale su eBay',
    deliveryDays: '5 - 7 giorni lavorativi',
    features: [
      'Sincronizzazione automatica con cartelle Google Drive',
      'Le sottocartelle Drive diventano menu di navigazione',
      'Riconoscimento automatico di prezzi e nomi dai file',
      'Carrello laterale interattivo e selettore taglie',
      'Ordini con 1 clic su WhatsApp o form di spedizione',
      'Zero costi mensili di gestione catalogo',
      'Acquisto protetto con Garanzia Cliente eBay',
    ],
    techStack: ['Next.js 16', 'Google Drive API v3', 'Tailwind CSS', 'WhatsApp API'],
    ebayListingUrl: EBAY_LISTING_URL,
    popular: true,
  },
  {
    id: 'webapp-gestionale',
    title: 'Web App & Gestionali Custom',
    subtitle: 'Automatizza la tua azienda con software web dedicato',
    description:
      'Sviluppo di applicazioni web interattive, gestionali interni, dashboard analitiche, aree riservate per clienti o dipendenti con database cloud sicuro.',
    startingPrice: 599.0,
    badge: 'Soluzione Aziendale',
    deliveryDays: '7 - 14 giorni lavorativi',
    features: [
      'Autenticazione utenti sicura (Google, Email, Ruoli)',
      'Database relazionale cloud (PostgreSQL / Supabase)',
      'Dashboard con grafici, esportazione Excel/PDF',
      'API RESTful e webhook personalizzati',
      'Integrazione sistemi di pagamento (Stripe, PayPal)',
      'Supporto e manutenzione tecnica continua',
    ],
    techStack: ['TypeScript', 'Next.js', 'PostgreSQL', 'Prisma', 'Stripe'],
    ebayListingUrl: EBAY_STORE_URL,
    popular: false,
  },
  {
    id: 'app-mobile',
    title: 'Applicazioni Mobile iOS & Android',
    subtitle: 'La tua app nativa su App Store e Google Play Store',
    description:
      'Sviluppo di app per smartphone e tablet veloci e fluide, con notifiche push, geolocalizzazione, fotocamera e sincronizzazione in tempo reale con il tuo server.',
    startingPrice: 899.0,
    badge: 'Massima Visibilità',
    deliveryDays: '14 - 21 giorni lavorativi',
    features: [
      'Applicazione cross-platform per iOS (Apple) e Android',
      'Interfaccia fluida a 60fps con componenti nativi',
      'Notifiche push istantanee per promozioni o ordini',
      'Funzionalità offline e sincronizzazione cloud',
      'Assistenza per pubblicazione su App Store e Play Store',
      'Pannello web per gestire i contenuti dell app',
    ],
    techStack: ['React Native', 'Expo', 'Node.js', 'Firebase'],
    ebayListingUrl: EBAY_STORE_URL,
    popular: false,
  },
];

export const SERVICE_FAQS = [
  {
    q: 'Come posso acquistare il servizio tramite la vostra inserzione eBay?',
    a: 'Puoi cliccare direttamente sul pulsante "Acquista con Garanzia eBay" per andare all\'inserzione dell\'articolo n. 287591702835 del nostro account newebservices. Il pagamento e la consegna sono tutelati al 100% dalla Garanzia Cliente eBay.',
  },
  {
    q: 'Cosa include l\'e-commerce collegato a Google Drive?',
    a: 'Include il sito completo pronto all\'uso identico a NotExistShoppingPlace, configurato con le tue credenziali Google Drive. Non dovrai pagare abbonamenti mensili costosi: ti basterà creare le cartelle su Drive per vedere i tuoi prodotti online.',
  },
  {
    q: 'Posso richiedere personalizzazioni o funzionalità speciali?',
    a: 'Certamente! Ogni progetto viene personalizzato con il tuo logo, i tuoi colori, font e tutte le funzionalità aggiuntive di cui hai bisogno (integrazione corrieri, pagamenti con carta, fatturazione, ecc.).',
  },
  {
    q: 'Che garanzia ho sui tempi e sul funzionamento?',
    a: 'Garantiamo consegna entro i tempi concordati e assistenza gratuita post-lancio per modifiche e verifiche. Inoltre, acquistando su eBay hai la massima tutela dell\'acquirente.',
  },
];
