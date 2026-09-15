'use client';

import React from 'react';
import { useShop } from '@/context/ShopContext';
import { ArrowDown, HardDrive, Sparkles } from 'lucide-react';

export default function Hero() {
  const { isDemo, folders, products, setIsConfigOpen } = useShop();

  const scrollToCatalog = () => {
    const el = document.getElementById('catalog-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative bg-neutral-950 text-white overflow-hidden py-16 sm:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-neutral-300 text-xs font-medium tracking-wide mb-6 backdrop-blur-sm border border-white/15">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>Nuova Collezione • Connesso a Google Drive</span>
          </div>

          <h1 className="font-serif text-4xl sm:text-6xl font-light tracking-tight leading-tight text-white mb-6">
            Eleganza senza tempo,{' '}
            <span className="italic font-normal text-amber-200">scopri la tua silhouette.</span>
          </h1>

          <p className="text-neutral-300 text-base sm:text-lg leading-relaxed mb-8 max-w-2xl font-light">
            Esplora il nostro catalogo esclusivo sincronizzato in tempo reale con le cartelle del nostro atelier. 
            Capi sartoriali, tessuti pregiati e look selezionati per ogni occasione.
          </p>

          <div className="flex flex-wrap items-center gap-4">
            <button
              onClick={scrollToCatalog}
              className="px-8 py-3.5 rounded-full bg-white text-neutral-950 font-medium hover:bg-neutral-100 transition-all flex items-center gap-2 text-sm shadow-lg hover:shadow-xl cursor-pointer"
            >
              <span>Esplora il Catalogo</span>
              <ArrowDown className="w-4 h-4" />
            </button>

            <button
              onClick={() => setIsConfigOpen(true)}
              className="px-6 py-3.5 rounded-full border border-neutral-700 bg-neutral-900/60 hover:bg-neutral-900 text-neutral-300 hover:text-white transition-all text-sm flex items-center gap-2 cursor-pointer"
            >
              <HardDrive className="w-4 h-4 text-amber-400" />
              <span>{isDemo ? 'Come collegare il tuo Drive' : 'Gestisci Cartelle Drive'}</span>
            </button>
          </div>

          <div className="grid grid-cols-3 gap-6 pt-12 mt-12 border-t border-neutral-800/80">
            <div>
              <div className="text-2xl sm:text-3xl font-bold font-serif text-white">
                {products.length}+
              </div>
              <div className="text-xs text-neutral-400 mt-1 uppercase tracking-wider">
                Capi Disponibili
              </div>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-bold font-serif text-white">
                {folders.length}
              </div>
              <div className="text-xs text-neutral-400 mt-1 uppercase tracking-wider">
                Categorie / Cartelle
              </div>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-bold font-serif text-amber-300">
                100%
              </div>
              <div className="text-xs text-neutral-400 mt-1 uppercase tracking-wider">
                Sincronia Drive
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
