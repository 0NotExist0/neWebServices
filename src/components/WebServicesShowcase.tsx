'use client';

import React from 'react';
import Link from 'next/link';
import { WEB_SERVICES, EBAY_STORE_URL, EBAY_LISTING_URL } from '@/lib/services-data';
import {
  Code,
  ExternalLink,
  ShieldCheck,
  ArrowRight,
  Sparkles,
  Zap,
  Globe,
  Smartphone,
  Database,
  Check,
} from 'lucide-react';

export default function WebServicesShowcase() {
  const iconMap: Record<string, any> = {
    'sito-vetrina': Globe,
    'sito-ecommerce-drive': Sparkles,
    'webapp-gestionale': Database,
    'app-mobile': Smartphone,
  };

  return (
    <section className="bg-neutral-950 text-white py-20 border-t border-neutral-900 relative overflow-hidden">
      <div className="absolute inset-0 bg-radial-gradient from-amber-500/5 via-transparent to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Intestazione Sezione */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 border-b border-neutral-900 pb-8">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 text-amber-300 text-xs font-semibold tracking-wide mb-3">
              <Code className="w-3.5 h-3.5 text-amber-400" />
              <span>Studio Digitale • 0Not_Exist0</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-light text-white leading-tight">
              Realizziamo il tuo <span className="italic font-normal text-amber-200">Sito Web o App</span> su misura.
            </h2>
            <p className="text-sm text-neutral-400 mt-2 max-w-xl font-light">
              Vuoi un sito e-commerce con Google Drive identico a questo o un&apos;applicazione mobile? 
              Acquista in totale sicurezza anche tramite la nostra inserzione ufficiale su eBay.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <a
              href={EBAY_STORE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2.5 rounded-full border-2 border-[#F5E272] bg-[#141414] hover:bg-[#F5E272] hover:text-[#141414] text-[#F5E272] text-xs font-black uppercase tracking-wider flex items-center gap-2 transition-all shadow-md cursor-pointer"
            >
              <ShieldCheck className="w-4 h-4" />
              <span>Negozio Ufficiale eBay</span>
              <ExternalLink className="w-3 h-3" />
            </a>

            <Link
              href="/servizi-web"
              className="px-6 py-2.5 rounded-full bg-[#F5E272] hover:bg-white text-[#141414] text-xs font-black uppercase tracking-wider flex items-center gap-2 transition-all shadow-md cursor-pointer"
            >
              <span>Vedi Tutti i Pacchetti</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* Griglia 4 Card Servizi */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {WEB_SERVICES.map((service) => {
            const Icon = iconMap[service.id] || Code;
            return (
              <div
                key={service.id}
                className={`rounded-2xl p-6 flex flex-col justify-between transition-all duration-300 relative ${
                  service.popular
                    ? 'bg-neutral-900 border-2 border-amber-400/80 shadow-xl'
                    : 'bg-neutral-900/60 border border-neutral-800 hover:border-neutral-700'
                }`}
              >
                {service.popular && (
                  <span className="absolute -top-3 right-6 px-3 py-0.5 rounded-full bg-amber-400 text-neutral-950 text-[10px] font-bold uppercase tracking-wider">
                    In Evidenza
                  </span>
                )}

                <div>
                  <div className="p-3 w-fit rounded-xl bg-neutral-800 text-amber-400 mb-4">
                    <Icon className="w-5 h-5" />
                  </div>

                  <div className="text-[11px] font-semibold text-amber-400 uppercase tracking-wider mb-1">
                    {service.badge}
                  </div>

                  <h3 className="font-serif text-lg font-bold text-white mb-2 leading-snug">
                    {service.title}
                  </h3>

                  <p className="text-xs text-neutral-400 leading-relaxed mb-4 line-clamp-3">
                    {service.subtitle}
                  </p>

                  <div className="mb-4 pt-3 border-t border-neutral-800">
                    <span className="text-[10px] text-neutral-400 uppercase tracking-wider block">A partire da</span>
                    <span className="text-2xl font-bold text-white font-sans">
                      {service.startingPrice.toFixed(0)} €
                    </span>
                  </div>

                  <ul className="space-y-1.5 mb-6 text-[11px] text-neutral-300">
                    {service.features.slice(0, 3).map((feat, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                        <span className="line-clamp-1">{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-3 border-t border-neutral-800/80 flex flex-col gap-2">
                  <a
                    href={EBAY_LISTING_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold flex items-center justify-center gap-1.5 transition-colors"
                  >
                    <span>Acquista con eBay</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>

                  <Link
                    href="/servizi-web"
                    className="w-full py-2 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-200 text-xs font-medium flex items-center justify-center gap-1.5 transition-colors text-center"
                  >
                    <span>Dettagli Pacchetto</span>
                    <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

        {/* Banner Garanzia eBay in fondo */}
        <div className="mt-12 p-6 rounded-3xl bg-linear-to-r from-blue-950/40 via-neutral-900 to-amber-950/30 border border-blue-500/20 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-blue-500/20 text-blue-400 rounded-2xl shrink-0">
              <ShieldCheck className="w-8 h-8" />
            </div>
            <div>
              <h4 className="text-base font-bold text-white">
                Garanzia Cliente eBay &amp; Pagamenti Protetti
              </h4>
              <p className="text-xs text-neutral-300 mt-1 max-w-xl leading-relaxed">
                Tutti i nostri servizi di sviluppo siti web ed e-commerce possono essere acquistati con la massima serenità tramite l&apos;inserzione ufficiale del nostro account eBay <strong>newebservices</strong>.
              </p>
            </div>
          </div>

          <a
            href={EBAY_STORE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs flex items-center gap-2 shrink-0 transition-colors shadow-md"
          >
            <span>Vai al Profilo Venditore eBay</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>

      </div>
    </section>
  );
}
