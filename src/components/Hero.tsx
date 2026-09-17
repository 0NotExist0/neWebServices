'use client';

import React from 'react';
import { useShop } from '@/context/ShopContext';
import { ArrowDown, ExternalLink, ShieldCheck, Flame } from 'lucide-react';
import { EBAY_STORE_URL } from '@/lib/services-data';

export default function Hero() {
  const { products } = useShop();

  const scrollToCatalog = () => {
    const el = document.getElementById('catalog-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative bg-[#F5E272] text-[#141414] pt-12 pb-16 sm:pt-16 sm:pb-24 overflow-hidden border-b-2 border-black/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        
        {/* Scarcity / Vault Pill */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#141414] text-[#F5E272] text-[11px] font-black uppercase tracking-widest mb-8 shadow-md">
          <Flame className="w-3.5 h-3.5 text-[#F5E272] animate-bounce" />
          <span>ARCHIVIO PRIVATO • PEZZI UNICI NON RIPRODUCIBILI</span>
        </div>

        {/* Monumental Hero Headline (Matching "ONE MUSEUM / TWO LOCATIONS" in scale) */}
        <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-black uppercase tracking-tighter leading-[0.9] text-[#141414] mb-8 select-none">
          <div>ONE ARCHIVE</div>
          <div className="text-transparent" style={{ WebkitTextStroke: '2px #141414' }}>
            TWO UNIVERSES
          </div>
        </h1>

        {/* Psychological / Subheading Copy */}
        <p className="max-w-3xl mx-auto text-sm sm:text-base md:text-lg font-bold text-[#141414]/90 tracking-wide uppercase leading-relaxed mb-10">
          Capi sartoriali streetwear rari e soluzioni web su misura.
          <br className="hidden sm:inline" />
          {' '}Creato da <strong className="text-black font-black underline underline-offset-4">0Not_Exist0</strong> per <strong className="text-black font-black">NotExistShoppingPlace</strong>.
          Tutto ciò che vedi è subito acquistabile con <strong className="text-black font-black">Garanzia Ufficiale eBay</strong>.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-4">
          <button
            onClick={scrollToCatalog}
            className="px-8 sm:px-10 py-4 rounded-full bg-[#141414] hover:bg-black text-[#F5E272] font-black text-xs sm:text-sm tracking-widest uppercase shadow-2xl hover:scale-105 transition-all flex items-center gap-3 cursor-pointer"
          >
            <span>Esplora il Vault</span>
            <ArrowDown className="w-4 h-4" />
          </button>

          <a
            href={EBAY_STORE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="px-8 sm:px-10 py-4 rounded-full border-2 border-[#141414] bg-transparent hover:bg-[#141414] text-[#141414] hover:text-[#F5E272] font-black text-xs sm:text-sm tracking-widest uppercase transition-all flex items-center gap-2 cursor-pointer"
          >
            <ShieldCheck className="w-4 h-4" />
            <span>Store Ufficiale eBay</span>
            <ExternalLink className="w-3.5 h-3.5 opacity-70" />
          </a>
        </div>

        {/* Scarcity Counters / Vault Details */}
        <div className="grid grid-cols-3 max-w-2xl mx-auto pt-12 mt-12 border-t-2 border-black/15 text-center">
          <div>
            <div className="text-3xl sm:text-4xl font-black tracking-tight text-[#141414]">
              {products.length}+
            </div>
            <div className="text-[10px] sm:text-xs font-black uppercase tracking-widest text-[#141414]/70 mt-1">
              Pezzi Unici
            </div>
          </div>
          <div className="border-x-2 border-black/15">
            <div className="text-3xl sm:text-4xl font-black tracking-tight text-[#141414]">
              100%
            </div>
            <div className="text-[10px] sm:text-xs font-black uppercase tracking-widest text-[#141414]/70 mt-1">
              Protezione eBay
            </div>
          </div>
          <div>
            <div className="text-3xl sm:text-4xl font-black tracking-tight text-[#141414]">
              24H
            </div>
            <div className="text-[10px] sm:text-xs font-black uppercase tracking-widest text-[#141414]/70 mt-1">
              Spedizione Rapida
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
