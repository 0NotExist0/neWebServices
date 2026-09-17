'use client';

import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CartDrawer from '@/components/CartDrawer';
import DriveConfigModal from '@/components/DriveConfigModal';
import { WEB_SERVICES, SERVICE_FAQS, EBAY_STORE_URL, EBAY_LISTING_URL } from '@/lib/services-data';
import {
  Code,
  Globe,
  Smartphone,
  Database,
  CheckCircle2,
  ExternalLink,
  ShieldCheck,
  Zap,
  Sparkles,
  ArrowRight,
  MessageCircle,
  HardDrive,
  Clock,
  HelpCircle,
  ChevronDown,
  Send,
} from 'lucide-react';
import Link from 'next/link';

export default function WebServicesPage() {
  const [selectedService, setSelectedService] = useState<string>('sito-ecommerce-drive');
  const [quoteOpen, setQuoteOpen] = useState(false);
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    projectType: 'E-Commerce con Sync Google Drive',
    budget: '300€ - 600€',
    description: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const handleOpenQuoteFor = (title: string) => {
    setFormData((prev) => ({ ...prev, projectType: title }));
    setQuoteOpen(true);
    setSubmitted(false);
  };

  return (
    <div className="min-h-screen flex flex-col bg-neutral-950 text-neutral-100">
      <Navbar />

      {/* Hero Section Servizi Web */}
      <section className="relative overflow-hidden py-16 sm:py-24 border-b border-neutral-900">
        <div className="absolute inset-0 bg-radial-gradient from-amber-500/10 via-transparent to-transparent pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          {/* Badge eBay Verificato */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-950/60 border border-blue-500/30 text-blue-300 text-xs font-medium tracking-wide mb-6 backdrop-blur-xs">
            <ShieldCheck className="w-4 h-4 text-blue-400" />
            <span>Venditore Ufficiale eBay: <strong>0not_exist0</strong> • Garanzia Cliente eBay</span>
            <a
              href={EBAY_STORE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-white underline hover:text-blue-200 ml-1"
            >
              <span>Vedi Profilo eBay</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>

          <div className="max-w-3xl">
            <h1 className="font-serif text-4xl sm:text-6xl font-light tracking-tight leading-tight text-white mb-6">
              Siti Web, E-Commerce &amp;{' '}
              <span className="italic font-normal text-amber-300">App su Misura.</span>
            </h1>

            <p className="text-neutral-300 text-base sm:text-lg leading-relaxed mb-8 font-light">
              Dall&apos;ideazione alla pubblicazione: realizziamo la tua presenza online professionale. 
              Specializzati in <strong>e-commerce con sincronizzazione automatica su Google Drive</strong>, 
              portali web performanti e applicazioni mobile native.
            </p>

            <div className="flex flex-wrap items-center gap-4">
              <a
                href="#pacchetti"
                className="px-8 py-3.5 rounded-full bg-white text-neutral-950 font-medium hover:bg-neutral-100 transition-all flex items-center gap-2 text-sm shadow-lg cursor-pointer"
              >
                <span>Esplora i Pacchetti</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <a
                href={EBAY_LISTING_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3.5 rounded-full border border-blue-500/40 bg-blue-950/40 hover:bg-blue-900/60 text-blue-200 hover:text-white transition-all text-sm flex items-center gap-2 cursor-pointer shadow-xs"
              >
                <span className="font-bold text-blue-400 tracking-wider">eBay</span>
                <span>Acquista su eBay (Protezione Acquisti)</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>

              <button
                onClick={() => setQuoteOpen(true)}
                className="px-6 py-3.5 rounded-full border border-neutral-800 bg-neutral-900/80 hover:bg-neutral-900 text-neutral-300 hover:text-white transition-all text-sm flex items-center gap-2 cursor-pointer"
              >
                <Zap className="w-4 h-4 text-amber-400" />
                <span>Richiedi Preventivo Rapido</span>
              </button>
            </div>
          </div>

          {/* Vantaggi Rapidi */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-12 mt-12 border-t border-neutral-900">
            <div className="flex items-start gap-3">
              <div className="p-2 rounded-xl bg-neutral-900 text-amber-400 shrink-0">
                <Zap className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-white uppercase tracking-wider">Consegna Rapida</h4>
                <p className="text-xs text-neutral-400 mt-0.5">Sito pronto e online in 3-7 giorni</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="p-2 rounded-xl bg-neutral-900 text-amber-400 shrink-0">
                <HardDrive className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-white uppercase tracking-wider">Zero Canoni Mensili</h4>
                <p className="text-xs text-neutral-400 mt-0.5">Gestisci catalogo e foto da Drive gratis</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="p-2 rounded-xl bg-neutral-900 text-blue-400 shrink-0">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-white uppercase tracking-wider">Protezione eBay</h4>
                <p className="text-xs text-neutral-400 mt-0.5">Disponibile su inserzione ufficiale</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="p-2 rounded-xl bg-neutral-900 text-emerald-400 shrink-0">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-white uppercase tracking-wider">Assistenza Diretta</h4>
                <p className="text-xs text-neutral-400 mt-0.5">Supporto tecnico e modifiche incluse</p>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Focus su E-Commerce con Google Drive Sync */}
      <section className="py-16 bg-neutral-900/40 border-b border-neutral-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 text-amber-300 text-xs font-semibold tracking-wide mb-4">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                <span>La Nostra Tecnologia Esclusiva</span>
              </div>

              <h2 className="font-serif text-3xl sm:text-4xl font-light text-white leading-tight mb-4">
                Come Funziona l&apos;E-Commerce con{' '}
                <span className="italic text-amber-200">Google Drive Automatico?</span>
              </h2>

              <p className="text-neutral-300 text-sm sm:text-base leading-relaxed mb-6 font-light">
                Basta spendere centinaia di euro ogni mese in piattaforme complesse come Shopify o WooCommerce. 
                Abbiamo creato un sistema in cui <strong>il tuo Google Drive personale diventa il database del tuo negozio</strong>:
              </p>

              <div className="space-y-4 text-xs sm:text-sm text-neutral-300">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-amber-400 text-neutral-950 font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                    1
                  </div>
                  <div>
                    <strong className="text-white">Le tue cartelle creano i Menu:</strong> una cartella chiamata &ldquo;Abiti&rdquo; o &ldquo;Scarpe&rdquo; crea automaticamente la categoria e la voce del menu di navigazione.
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-amber-400 text-neutral-950 font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                    2
                  </div>
                  <div>
                    <strong className="text-white">Caricamento foto istantaneo:</strong> scatti una foto dal telefono, la carichi nella cartella Drive e appare subito sul sito in alta qualità.
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-amber-400 text-neutral-950 font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                    3
                  </div>
                  <div>
                    <strong className="text-white">Prezzi automatici:</strong> nomini il file es. <code>Abito Floreale - 49.90.jpg</code> e il sito imposta titolo, taglie e prezzo automaticamente.
                  </div>
                </div>
              </div>

              <div className="mt-8 flex items-center gap-4">
                <Link
                  href="/"
                  className="px-6 py-3 rounded-xl bg-white text-neutral-950 text-xs font-semibold hover:bg-neutral-100 transition-colors shadow-xs"
                >
                  Guarda la Demo della Vetrina
                </Link>
                <a
                  href={EBAY_LISTING_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs text-blue-300 hover:text-white underline"
                >
                  <span>Inserzione eBay attiva</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

            {/* Mockup visuale interattivo */}
            <div className="bg-neutral-900 border border-neutral-800 rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
              <div className="text-xs font-mono text-neutral-400 mb-4 pb-3 border-b border-neutral-800 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-rose-500/80" />
                  <span className="w-3 h-3 rounded-full bg-amber-500/80" />
                  <span className="w-3 h-3 rounded-full bg-emerald-500/80" />
                  <span className="text-neutral-500 ml-2">drive-sync-architecture.json</span>
                </div>
                <span className="text-emerald-400 font-bold text-[10px]">LIVE CONNECTED</span>
              </div>

              <div className="space-y-3 font-mono text-xs text-neutral-300 leading-relaxed bg-black/40 p-4 rounded-xl border border-neutral-800">
                <p className="text-amber-400">{`// Esempio Struttura Cartella Drive:`}</p>
                <p className="text-neutral-400">📁 Google Drive / Negozio Vestiti</p>
                <p className="pl-4 text-neutral-300">├── 📁 Abiti &amp; Vestiti <span className="text-amber-300 font-normal">→ Genera Menu &apos;Abiti&apos;</span></p>
                <p className="pl-8 text-neutral-400">├── 🖼️ Abito Seta Floreale - 89.00.jpg</p>
                <p className="pl-8 text-neutral-400">└── 🖼️ Vestito Chemisier_59.90€.png</p>
                <p className="pl-4 text-neutral-300">├── 📁 Giacche &amp; Trench <span className="text-amber-300 font-normal">→ Genera Menu &apos;Giacche&apos;</span></p>
                <p className="pl-8 text-neutral-400">└── 🖼️ Blazer Doppiopetto - 110.00.jpg</p>
                <p className="text-emerald-400 pt-2">{`✓ Sincronizzazione automatica senza ricaricare il server`}</p>
              </div>

              <div className="mt-6 p-4 rounded-2xl bg-blue-950/40 border border-blue-500/20 text-xs text-blue-200 flex items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-blue-400 shrink-0" />
                  <span>Disponibile all&apos;acquisto protetto su eBay</span>
                </div>
                <a
                  href={EBAY_STORE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-semibold text-[11px] whitespace-nowrap"
                >
                  Negozio eBay
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Griglia Pacchetti & Servizi */}
      <section id="pacchetti" className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-neutral-300 text-xs font-medium tracking-wide mb-3">
            <Code className="w-3.5 h-3.5 text-amber-400" />
            <span>Pacchetti &amp; Tariffe Chiare</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl font-bold text-white">
            Scegli la Soluzione per la Tua Attività
          </h2>
          <p className="text-neutral-400 text-sm mt-3">
            Tutti i pacchetti includono codice sorgente completo, configurazione dominio e opzione di acquisto protetto su eBay.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {WEB_SERVICES.map((service) => (
            <div
              key={service.id}
              className={`rounded-3xl p-6 sm:p-7 flex flex-col justify-between transition-all duration-300 relative ${
                service.popular
                  ? 'bg-neutral-900 border-2 border-amber-400 shadow-2xl shadow-amber-950/30'
                  : 'bg-neutral-900/60 border border-neutral-800 hover:border-neutral-700'
              }`}
            >
              {service.popular && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-amber-400 text-neutral-950 text-[11px] font-bold uppercase tracking-wider shadow-md">
                  ⭐ Più Venduto
                </div>
              )}

              <div>
                <div className="text-[11px] font-semibold text-amber-400 tracking-wider uppercase mb-1">
                  {service.badge}
                </div>
                <h3 className="font-serif text-xl font-bold text-white mb-2">
                  {service.title}
                </h3>
                <p className="text-xs text-neutral-400 leading-relaxed mb-6">
                  {service.description}
                </p>

                {/* Prezzo */}
                <div className="mb-6 pb-6 border-b border-neutral-800">
                  <div className="text-[11px] text-neutral-400 uppercase tracking-wider">A partire da</div>
                  <div className="flex items-baseline gap-1 mt-1">
                    <span className="text-3xl sm:text-4xl font-bold text-white font-sans">
                      {service.startingPrice.toFixed(0)} €
                    </span>
                    <span className="text-xs text-neutral-400">una tantum</span>
                  </div>
                  <div className="text-[11px] text-neutral-500 mt-1 flex items-center gap-1">
                    <Clock className="w-3 h-3 text-neutral-400" />
                    <span>Consegna in {service.deliveryDays}</span>
                  </div>
                </div>

                {/* Lista Features */}
                <div className="space-y-2.5 mb-8">
                  <div className="text-xs font-bold uppercase tracking-wider text-neutral-300">Cosa include:</div>
                  {service.features.map((feat, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 text-xs text-neutral-300">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Azioni del pacchetto */}
              <div className="space-y-2.5 pt-4 border-t border-neutral-800/80">
                <a
                  href={EBAY_LISTING_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold flex items-center justify-center gap-2 shadow-md transition-all cursor-pointer"
                >
                  <ShieldCheck className="w-4 h-4" />
                  <span>Acquista con Garanzia eBay</span>
                </a>

                <button
                  type="button"
                  onClick={() => handleOpenQuoteFor(service.title)}
                  className="w-full py-2.5 rounded-xl border border-neutral-700 bg-neutral-800 hover:bg-neutral-700 text-neutral-200 text-xs font-semibold flex items-center justify-center gap-2 transition-colors cursor-pointer"
                >
                  <span>Richiedi Informazioni / Preventivo</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Domande Frequenti (FAQ) */}
      <section className="py-16 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 border-t border-neutral-900">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-neutral-300 text-xs font-medium tracking-wide mb-3">
            <HelpCircle className="w-3.5 h-3.5 text-amber-400" />
            <span>Dubbi o Domande?</span>
          </div>
          <h3 className="font-serif text-2xl sm:text-4xl font-bold text-white">
            Domande Frequenti sui Servizi
          </h3>
        </div>

        <div className="space-y-4">
          {SERVICE_FAQS.map((faq, idx) => {
            const isOpen = activeFaq === idx;
            return (
              <div
                key={idx}
                className="bg-neutral-900 border border-neutral-800 rounded-2xl overflow-hidden transition-colors"
              >
                <button
                  type="button"
                  onClick={() => setActiveFaq(isOpen ? null : idx)}
                  className="w-full p-5 text-left flex items-center justify-between gap-4 font-medium text-sm text-white hover:text-amber-300 cursor-pointer"
                >
                  <span>{faq.q}</span>
                  <ChevronDown className={`w-4 h-4 text-neutral-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                </button>
                {isOpen && (
                  <div className="px-5 pb-5 text-xs sm:text-sm text-neutral-400 leading-relaxed border-t border-neutral-800/60 pt-3">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* Modal Richiesta Preventivo */}
      {quoteOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs animate-in fade-in"
          onClick={() => setQuoteOpen(false)}
        >
          <div
            className="bg-neutral-900 border border-neutral-800 rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl relative"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="font-serif text-xl font-bold text-white">Richiedi Preventivo Rapido</h3>
                <p className="text-xs text-neutral-400">Riceverai risposta entro poche ore da 0Not_Exist0</p>
              </div>
              <button
                onClick={() => setQuoteOpen(false)}
                className="p-1.5 rounded-full text-neutral-400 hover:text-white hover:bg-neutral-800"
              >
                ✕
              </button>
            </div>

            {submitted ? (
              <div className="py-10 text-center space-y-3">
                <div className="w-14 h-14 mx-auto rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h4 className="font-serif text-xl font-bold text-white">Richiesta Ricevuta!</h4>
                <p className="text-xs text-neutral-300 max-w-sm mx-auto leading-relaxed">
                  Grazie {formData.name}! Abbiamo preso in carico la tua richiesta per <strong>{formData.projectType}</strong>. Ti ricontatteremo via email ({formData.email}) o telefono.
                </p>
                <div className="pt-4 flex flex-col gap-2">
                  <a
                    href={EBAY_STORE_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold"
                  >
                    Visita il Negozio Ufficiale su eBay
                  </a>
                  <button
                    onClick={() => setQuoteOpen(false)}
                    className="text-xs text-neutral-400 underline hover:text-white"
                  >
                    Chiudi
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleFormSubmit} className="space-y-4">
                <div>
                  <label className="text-xs font-medium text-neutral-300 block mb-1">Nome e Cognome *</label>
                  <input
                    type="text"
                    required
                    placeholder="Mario Rossi"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-3 py-2 text-xs bg-neutral-950 border border-neutral-800 rounded-lg text-white focus:outline-hidden focus:border-amber-400"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-medium text-neutral-300 block mb-1">Email *</label>
                    <input
                      type="email"
                      required
                      placeholder="mario@esempio.it"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-3 py-2 text-xs bg-neutral-950 border border-neutral-800 rounded-lg text-white focus:outline-hidden focus:border-amber-400"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-medium text-neutral-300 block mb-1">Telefono / WhatsApp</label>
                    <input
                      type="tel"
                      placeholder="+39 340 0000000"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-3 py-2 text-xs bg-neutral-950 border border-neutral-800 rounded-lg text-white focus:outline-hidden focus:border-amber-400"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-medium text-neutral-300 block mb-1">Tipo di Progetto</label>
                  <select
                    value={formData.projectType}
                    onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
                    className="w-full px-3 py-2 text-xs bg-neutral-950 border border-neutral-800 rounded-lg text-white focus:outline-hidden focus:border-amber-400"
                  >
                    <option value="Sito Web Vetrina & Portfolio">Sito Web Vetrina &amp; Portfolio (da 199€)</option>
                    <option value="E-Commerce con Sync Google Drive">E-Commerce con Sync Google Drive (da 349€)</option>
                    <option value="Web App & Gestionali Custom">Web App &amp; Gestionale Custom (da 599€)</option>
                    <option value="Applicazioni Mobile iOS & Android">Applicazione Mobile iOS / Android (da 899€)</option>
                    <option value="Altro / Progetto Speciale">Altro / Personalizzato</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-medium text-neutral-300 block mb-1">Dettagli del Progetto o Richiesta</label>
                  <textarea
                    rows={3}
                    placeholder="Descrivi brevemente cosa vorresti realizzare, il settore o eventuali esempi..."
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="w-full px-3 py-2 text-xs bg-neutral-950 border border-neutral-800 rounded-lg text-white focus:outline-hidden focus:border-amber-400"
                  />
                </div>

                <div className="pt-2 flex items-center justify-between gap-3">
                  <a
                    href={EBAY_STORE_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[11px] text-blue-400 underline hover:text-blue-300 flex items-center gap-1"
                  >
                    <span>Preferisci eBay? Clicca qui</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>

                  <button
                    type="submit"
                    className="px-6 py-2.5 rounded-xl bg-white text-neutral-950 font-bold text-xs hover:bg-neutral-200 transition-colors flex items-center gap-2 cursor-pointer"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Invia Richiesta</span>
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

      {/* Altri componenti globali */}
      <CartDrawer />
      <DriveConfigModal />
      <Footer />
    </div>
  );
}
