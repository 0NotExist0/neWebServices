'use client';

import React from 'react';
import { useShop } from '@/context/ShopContext';
import { EBAY_STORE_URL, EBAY_LISTING_URL } from '@/lib/services-data';
import {
  HardDrive,
  MessageCircle,
  Truck,
  RotateCcw,
  Clock,
  Code,
  ShieldCheck,
  ExternalLink,
} from 'lucide-react';
import Link from 'next/link';

export default function Footer() {
  const {
    folders,
    setSelectedFolderId,
    setIsConfigOpen,
    isDemo,
    isWhatsAppAvailable,
    whatsAppNumber,
  } = useShop();

  const cleanPhone = (whatsAppNumber || '').replace(/[^0-9]/g, '');

  const scrollToCatalog = (folderId: string) => {
    setSelectedFolderId(folderId);
    const el = document.getElementById('catalog-section');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="bg-neutral-950 text-neutral-300 border-t border-neutral-900 pt-16 pb-12">
      {/* Barra Vantaggi */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 border-b border-neutral-900">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-neutral-900 text-amber-400 rounded-2xl shrink-0">
              <Truck className="w-6 h-6" />
            </div>
            <div>
              <h5 className="text-sm font-semibold text-white">Spedizioni Veloci</h5>
              <p className="text-xs text-neutral-400 mt-0.5">Consegna espressa 24/48h tracciata</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="p-3 bg-neutral-900 text-blue-400 rounded-2xl shrink-0">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h5 className="text-sm font-semibold text-white">Venditore Ufficiale eBay</h5>
              <p className="text-xs text-neutral-400 mt-0.5">Garanzia Cliente &amp; Pagamenti protetti</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="p-3 bg-neutral-900 text-amber-400 rounded-2xl shrink-0">
              <Code className="w-6 h-6" />
            </div>
            <div>
              <h5 className="text-sm font-semibold text-white">Siti &amp; App su Misura</h5>
              <p className="text-xs text-neutral-400 mt-0.5">Sviluppo web e e-commerce con Drive</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="p-3 bg-neutral-900 text-emerald-400 rounded-2xl shrink-0">
              <HardDrive className="w-6 h-6" />
            </div>
            <div>
              <h5 className="text-sm font-semibold text-white">Google Drive Sync</h5>
              <p className="text-xs text-neutral-400 mt-0.5">Catalogo aggiornato in tempo reale</p>
            </div>
          </div>
        </div>
      </div>

      {/* Colonne Principali Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          
          {/* Brand Colonna */}
          <div className="space-y-4 md:col-span-1">
            <span className="font-serif text-2xl font-bold tracking-tight text-white block">
              NotExist<span className="text-amber-400 font-light">ShoppingPlace</span>
            </span>
            <span className="text-[10px] tracking-[0.2em] font-sans font-medium text-neutral-400 uppercase block -mt-2">
              by 0Not_Exist0
            </span>
            <p className="text-xs text-neutral-400 leading-relaxed font-light">
              Boutique esclusiva &amp; Studio di Sviluppo Digitale firmato <strong>0Not_Exist0</strong>. Capi selezionati e creazione di siti web ed app su misura.
            </p>
            
            <div className="pt-2 flex flex-col gap-2">
              <a
                href={EBAY_STORE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg bg-blue-950/60 hover:bg-blue-900/80 text-blue-200 border border-blue-500/30 transition-colors cursor-pointer"
              >
                <ShieldCheck className="w-3.5 h-3.5 text-blue-400" />
                <span>Visita Negozio eBay (newebservices)</span>
                <ExternalLink className="w-2.5 h-2.5" />
              </a>

              <button
                onClick={() => setIsConfigOpen(true)}
                className="inline-flex items-center gap-2 text-xs font-semibold px-3 py-1.5 rounded-lg bg-neutral-900 hover:bg-neutral-800 text-neutral-300 hover:text-white border border-neutral-800 transition-colors cursor-pointer"
              >
                <HardDrive className="w-3.5 h-3.5 text-amber-400" />
                <span>{isDemo ? 'Collega Google Drive' : 'Stato Sincronizzazione Drive'}</span>
              </button>
            </div>
          </div>

          {/* Categorie Vestiti */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              Collezione Moda
            </h4>
            <ul className="space-y-2 text-xs text-neutral-400">
              <li>
                <button
                  onClick={() => scrollToCatalog('all')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Tutti i Capi
                </button>
              </li>
              {folders.map((f) => (
                <li key={f.id}>
                  <button
                    onClick={() => scrollToCatalog(f.id)}
                    className="hover:text-white transition-colors cursor-pointer flex items-center justify-between w-full"
                  >
                    <span>{f.name}</span>
                    <span className="text-[10px] text-neutral-600">({f.count})</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Servizi Web & App (Novità) */}
          <div className="space-y-3">
            <div className="flex items-center gap-1.5">
              <h4 className="text-xs font-bold uppercase tracking-wider text-white">
                Servizi Web &amp; App
              </h4>
              <span className="text-[9px] font-bold px-1.5 py-0.2 bg-amber-400 text-neutral-950 rounded-full">
                ONLINE
              </span>
            </div>
            <ul className="space-y-2 text-xs text-neutral-400">
              <li>
                <Link href="/servizi-web" className="hover:text-white transition-colors flex items-center gap-1.5">
                  <Code className="w-3 h-3 text-amber-400" />
                  <span>Tutti i Pacchetti Digitali</span>
                </Link>
              </li>
              <li>
                <Link href="/servizi-web#pacchetti" className="hover:text-white transition-colors">
                  Siti Web Vetrina &amp; Portfolio
                </Link>
              </li>
              <li>
                <Link href="/servizi-web#pacchetti" className="hover:text-white transition-colors">
                  E-Commerce con Sync Drive
                </Link>
              </li>
              <li>
                <Link href="/servizi-web#pacchetti" className="hover:text-white transition-colors">
                  Web App &amp; Gestionali Cloud
                </Link>
              </li>
              <li>
                <Link href="/servizi-web#pacchetti" className="hover:text-white transition-colors">
                  Applicazioni Mobile iOS &amp; Android
                </Link>
              </li>
              <li>
                <a
                  href={EBAY_LISTING_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-300 hover:text-white transition-colors flex items-center gap-1"
                >
                  <span>Inserzione di Vendita su eBay</span>
                  <ExternalLink className="w-2.5 h-2.5" />
                </a>
              </li>
            </ul>
          </div>

          {/* Contatti & Assistenza */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              Contatti &amp; Preventivi
            </h4>
            <p className="text-xs text-neutral-400 leading-relaxed">
              Desideri ordinare un capo o richiedere la realizzazione del tuo sito web personalizzato?
            </p>

            <Link
              href="/servizi-web"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-neutral-950 text-xs font-bold transition-all shadow-xs"
            >
              <Code className="w-4 h-4" />
              <span>Richiedi Preventivo Web/App</span>
            </Link>

            <div className="pt-1">
              {isWhatsAppAvailable ? (
                <a
                  href={`https://wa.me/${cleanPhone}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-all shadow-xs cursor-pointer"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Scrivici su WhatsApp</span>
                </a>
              ) : (
                <div className="inline-flex items-center gap-2 px-3 py-2 rounded-xl bg-neutral-900 border border-neutral-800 text-neutral-400 text-xs font-medium">
                  <Clock className="w-3.5 h-3.5 text-amber-400" />
                  <span>WhatsApp: Coming Soon</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Copyright Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 border-t border-neutral-900 text-center text-xs text-neutral-500 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p>&copy; {new Date().getFullYear()} NotExistShoppingPlace by 0Not_Exist0. Tutti i diritti riservati.</p>
        <div className="flex items-center gap-3">
          <a
            href={EBAY_STORE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-400 hover:text-white underline flex items-center gap-1"
          >
            <span>Negozio eBay: newebservices</span>
            <ExternalLink className="w-3 h-3" />
          </a>
          <span>•</span>
          <p className="flex items-center gap-1.5">
            <span>Pronto per</span>
            <strong className="text-neutral-300">GitHub &amp; Vercel</strong>
          </p>
        </div>
      </div>
    </footer>
  );
}
