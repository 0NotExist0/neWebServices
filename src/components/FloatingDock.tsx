'use client';

import React from 'react';
import { Calendar, Ticket, Search, MapPin, Clock, ShoppingBag } from 'lucide-react';
import { useShop } from '@/context/ShopContext';
import { EBAY_STORE_URL } from '@/lib/services-data';

export default function FloatingDock() {
  const { setIsCartOpen, cartCount, setSearchQuery } = useShop();

  const scrollToCatalog = () => {
    const el = document.getElementById('catalog-section');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const focusSearch = () => {
    scrollToCatalog();
    const input = document.getElementById('catalog-search-input');
    if (input) {
      input.focus();
    }
  };

  return (
    <aside
      aria-label="Navigazione Rapida"
      className="fixed left-0 sm:left-4 top-1/2 -translate-y-1/2 z-40 flex flex-col items-center bg-[#161616] text-[#F5E272] py-4 px-2 sm:px-2.5 rounded-r-2xl sm:rounded-2xl shadow-2xl border-y border-r sm:border border-black/40 backdrop-blur-md transition-all duration-300 hover:scale-105"
    >
      <div className="flex flex-col items-center gap-4 sm:gap-5">
        {/* Drop / Calendario Usato */}
        <button
          onClick={scrollToCatalog}
          className="group relative p-2 rounded-xl text-[#F5E272] hover:bg-[#262626] transition-all cursor-pointer"
          title="Drop & Novità in Archivio"
          aria-label="Visualizza Drop e Novità"
        >
          <Calendar className="w-5 h-5 transition-transform group-hover:scale-110" />
          <span className="absolute left-full ml-3 px-2 py-1 bg-[#161616] text-[#F5E272] text-[11px] font-bold uppercase tracking-wider rounded-md shadow-xl whitespace-nowrap opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity">
            Nuovo Drop
          </span>
        </button>

        {/* eBay Direct Store Link / Ticket */}
        <a
          href={EBAY_STORE_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="group relative p-2 rounded-xl text-[#F5E272] hover:bg-[#262626] transition-all cursor-pointer"
          title="Inserzioni Ufficiali eBay"
          aria-label="Apri eBay Store"
        >
          <Ticket className="w-5 h-5 transition-transform group-hover:scale-110" />
          <span className="absolute left-full ml-3 px-2 py-1 bg-[#161616] text-[#F5E272] text-[11px] font-bold uppercase tracking-wider rounded-md shadow-xl whitespace-nowrap opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity">
            eBay Store
          </span>
        </a>

        {/* Cerca Rapido */}
        <button
          onClick={focusSearch}
          className="group relative p-2 rounded-xl text-[#F5E272] hover:bg-[#262626] transition-all cursor-pointer"
          title="Cerca nel Vault"
          aria-label="Cerca Capi nel Vault"
        >
          <Search className="w-5 h-5 transition-transform group-hover:scale-110" />
          <span className="absolute left-full ml-3 px-2 py-1 bg-[#161616] text-[#F5E272] text-[11px] font-bold uppercase tracking-wider rounded-md shadow-xl whitespace-nowrap opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity">
            Cerca Capi
          </span>
        </button>

        {/* Origine / Garanzia */}
        <button
          onClick={() => {
            const el = document.getElementById('about-section') || document.getElementById('catalog-section');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }}
          className="group relative p-2 rounded-xl text-[#F5E272] hover:bg-[#262626] transition-all cursor-pointer"
          title="Garanzia & Spedizioni"
          aria-label="Garanzia e Spedizioni"
        >
          <MapPin className="w-5 h-5 transition-transform group-hover:scale-110" />
          <span className="absolute left-full ml-3 px-2 py-1 bg-[#161616] text-[#F5E272] text-[11px] font-bold uppercase tracking-wider rounded-md shadow-xl whitespace-nowrap opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity">
            Origine & Garanzia
          </span>
        </button>

        {/* Scarcity / Pezzi Unici Timer */}
        <div
          className="group relative p-2 rounded-xl text-[#F5E272] hover:bg-[#262626] transition-all cursor-pointer"
          title="Disponibilità Limitata: Solo 1 pezzo per articolo"
        >
          <Clock className="w-5 h-5 transition-transform group-hover:scale-110 animate-pulse text-[#F5E272]" />
          <span className="absolute left-full ml-3 px-2 py-1 bg-[#161616] text-[#F5E272] text-[11px] font-bold uppercase tracking-wider rounded-md shadow-xl whitespace-nowrap opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity">
            Pezzi Unici
          </span>
        </div>

        {/* Separatore */}
        <div className="w-4 h-[1px] bg-[#333]" />

        {/* Carrello */}
        <button
          onClick={() => setIsCartOpen(true)}
          className="group relative p-2 rounded-xl text-[#F5E272] hover:bg-[#262626] transition-all cursor-pointer flex flex-col items-center"
          title="Visualizza Carrello"
          aria-label="Carrello"
        >
          <ShoppingBag className="w-5 h-5 transition-transform group-hover:scale-110" />
          {cartCount > 0 && (
            <span className="text-[10px] font-black mt-0.5 bg-[#F5E272] text-[#161616] px-1 rounded-full leading-none py-0.5">
              {cartCount}
            </span>
          )}
          <span className="absolute left-full ml-3 px-2 py-1 bg-[#161616] text-[#F5E272] text-[11px] font-bold uppercase tracking-wider rounded-md shadow-xl whitespace-nowrap opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity">
            Carrello ({cartCount})
          </span>
        </button>
      </div>
    </aside>
  );
}
