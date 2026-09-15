'use client';

import React from 'react';
import { useShop } from '@/context/ShopContext';
import {
  HardDrive,
  MessageCircle,
  Truck,
  RotateCcw,
} from 'lucide-react';

export default function Footer() {
  const { folders, setSelectedFolderId, setIsConfigOpen, isDemo } = useShop();

  const whatsappPhone = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '+393400000000';
  const whatsappClean = whatsappPhone.replace(/[^0-9]/g, '');

  const scrollToCatalog = (folderId: string) => {
    setSelectedFolderId(folderId);
    const el = document.getElementById('catalog-section');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="bg-neutral-950 text-neutral-300 border-t border-neutral-900 pt-16 pb-12">
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
            <div className="p-3 bg-neutral-900 text-amber-400 rounded-2xl shrink-0">
              <RotateCcw className="w-6 h-6" />
            </div>
            <div>
              <h5 className="text-sm font-semibold text-white">Reso Senza Pensieri</h5>
              <p className="text-xs text-neutral-400 mt-0.5">14 giorni di tempo per il reso</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="p-3 bg-neutral-900 text-amber-400 rounded-2xl shrink-0">
              <MessageCircle className="w-6 h-6" />
            </div>
            <div>
              <h5 className="text-sm font-semibold text-white">Assistenza WhatsApp</h5>
              <p className="text-xs text-neutral-400 mt-0.5">Consigli su taglie e disponibilità</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="p-3 bg-neutral-900 text-amber-400 rounded-2xl shrink-0">
              <HardDrive className="w-6 h-6" />
            </div>
            <div>
              <h5 className="text-sm font-semibold text-white">Google Drive Sync</h5>
              <p className="text-xs text-neutral-400 mt-0.5">Catalogo aggiornato in tempo reale</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          <div className="space-y-4 md:col-span-1">
            <span className="font-serif text-2xl font-bold tracking-widest text-white uppercase block">
              Atelier
            </span>
            <p className="text-xs text-neutral-400 leading-relaxed font-light">
              Boutique sartoriale contemporanea. Capi esclusivi selezionati con passione e gestiti direttamente dal nostro archivio digitale su Google Drive.
            </p>
            <div className="pt-2">
              <button
                onClick={() => setIsConfigOpen(true)}
                className="inline-flex items-center gap-2 text-xs font-semibold px-3 py-1.5 rounded-lg bg-neutral-900 hover:bg-neutral-800 text-neutral-300 hover:text-white border border-neutral-800 transition-colors cursor-pointer"
              >
                <HardDrive className="w-3.5 h-3.5 text-amber-400" />
                <span>{isDemo ? 'Collega Google Drive' : 'Stato Sincronizzazione Drive'}</span>
              </button>
            </div>
          </div>

          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              Menu Categorie
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

          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              Servizio Clienti
            </h4>
            <ul className="space-y-2 text-xs text-neutral-400">
              <li><span className="hover:text-white transition-colors cursor-pointer">Spedizioni & Tariffe</span></li>
              <li><span className="hover:text-white transition-colors cursor-pointer">Politica di Reso</span></li>
              <li><span className="hover:text-white transition-colors cursor-pointer">Guida alle Taglie</span></li>
              <li><span className="hover:text-white transition-colors cursor-pointer">Domande Frequenti (FAQ)</span></li>
            </ul>
          </div>

          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              Contatti Rapidi
            </h4>
            <p className="text-xs text-neutral-400 leading-relaxed">
              Hai una domanda su un capo o preferisci ordinare direttamente con il nostro staff?
            </p>
            <a
              href={`https://wa.me/${whatsappClean}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-all shadow-xs cursor-pointer"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Scrivici su WhatsApp</span>
            </a>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 border-t border-neutral-900 text-center text-xs text-neutral-500 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p>&copy; Atelier Boutique. Tutti i diritti riservati.</p>
        <p className="flex items-center gap-1.5">
          <span>Pronto per il deploy su</span>
          <strong className="text-neutral-300">GitHub &amp; Vercel</strong>
        </p>
      </div>
    </footer>
  );
}
