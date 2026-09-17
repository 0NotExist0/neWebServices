'use client';

import React, { useState } from 'react';
import { useShop } from '@/context/ShopContext';
import { EBAY_STORE_URL } from '@/lib/services-data';
import {
  ShoppingBag,
  Search,
  Menu as MenuIcon,
  X,
  ShieldCheck,
  HardDrive,
  Ticket,
  ChevronDown,
} from 'lucide-react';
import Link from 'next/link';

export default function Navbar() {
  const {
    folders,
    selectedFolderId,
    setSelectedFolderId,
    searchQuery,
    setSearchQuery,
    cartCount,
    setIsCartOpen,
    isDemo,
    setIsConfigOpen,
  } = useShop();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  const handleSelectCategory = (folderId: string) => {
    setSelectedFolderId(folderId);
    setMobileMenuOpen(false);
    const element = document.getElementById('catalog-section');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      {/* 1. Psychological Marquee Ticker (Urgenza, Scarsità, Autorevolezza) */}
      <div className="bg-[#141414] text-[#F5E272] text-[11px] py-1.5 overflow-hidden font-black tracking-widest uppercase select-none border-b border-black/20">
        <div className="animate-marquee whitespace-nowrap flex items-center gap-8">
          <span>⚡ DROP ESCLUSIVO • NOT EXIST SHOPPING PLACE BY 0NOT_EXIST0</span>
          <span>•</span>
          <span>🔥 TUTTI I CAPI SONO PEZZI UNICI D&apos;ARCHIVIO — NESSUN DOPPIONE</span>
          <span>•</span>
          <span>🛡️ 100% GARANZIA CLIENTE EBAY • VENDITORE UFFICIALE NEWEBSERVICES</span>
          <span>•</span>
          <span>📦 SPEDIZIONE ESPRESSA TRACCIATA IN 24/48H</span>
          <span>•</span>
          <span>🚀 REALIZZAZIONE SITI WEB &amp; E-COMMERCE PROFESSIONALI DISPONIBILI</span>
          <span>•</span>
          <span>⚡ DROP ESCLUSIVO • NOT EXIST SHOPPING PLACE BY 0NOT_EXIST0</span>
          <span>•</span>
          <span>🔥 TUTTI I CAPI SONO PEZZI UNICI D&apos;ARCHIVIO — NESSUN DOPPIONE</span>
          <span>•</span>
          <span>🛡️ 100% GARANZIA CLIENTE EBAY • VENDITORE UFFICIALE NEWEBSERVICES</span>
          <span>•</span>
          <span>📦 SPEDIZIONE ESPRESSA TRACCIATA IN 24/48H</span>
        </div>
      </div>

      {/* 2. Frans Hals Museum Inspired Header */}
      <header className="sticky top-0 z-30 bg-[#F5E272] text-[#141414] border-b border-black/10 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20 sm:h-24">
            
            {/* Left: Language Pill & Search (Desktop) */}
            <div className="hidden lg:flex items-center gap-4">
              <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-black/20 bg-black/5 text-xs font-bold tracking-wider uppercase cursor-pointer hover:bg-black/10 transition-colors">
                <span>🇮🇹 IT</span>
                <ChevronDown className="w-3 h-3 opacity-70" />
              </div>

              <nav className="flex items-center gap-6 text-xs font-black tracking-widest uppercase">
                <button
                  onClick={() => {
                    setSelectedFolderId('all');
                    const el = document.getElementById('catalog-section');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="hover:opacity-70 transition-opacity cursor-pointer"
                >
                  Collezione
                </button>
                <button
                  onClick={() => {
                    setSelectedFolderId('ebay-capi');
                    const el = document.getElementById('catalog-section');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="hover:opacity-70 transition-opacity cursor-pointer"
                >
                  Archivio eBay
                </button>
              </nav>
            </div>

            {/* Mobile menu trigger */}
            <div className="flex items-center lg:hidden">
              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-xl text-[#141414] hover:bg-black/10 cursor-pointer"
                aria-label="Apri menu"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
              </button>
            </div>

            {/* Center: Iconic Compact Museum-Style Typography Logo */}
            <div className="text-center">
              <Link href="/" className="inline-block group cursor-pointer focus:outline-none">
                <div className="font-black text-xl sm:text-2xl md:text-3xl tracking-tighter uppercase leading-[0.88] text-[#141414]">
                  <div>NOT EXIST</div>
                  <div className="text-[13px] sm:text-[15px] tracking-widest font-extrabold text-[#141414]/90">
                    SHOPPING PLACE
                  </div>
                </div>
                <div className="text-[9px] sm:text-[10px] tracking-[0.25em] font-black uppercase text-[#141414]/70 mt-1">
                  BY 0NOT_EXIST0
                </div>
              </Link>
            </div>

            {/* Right: Nav Links & Iconic Frans Hals Pill Button */}
            <div className="flex items-center gap-4 sm:gap-6">
              <nav className="hidden lg:flex items-center gap-6 text-xs font-black tracking-widest uppercase">
                <Link
                  href="/servizi-web"
                  className="hover:opacity-70 transition-opacity cursor-pointer flex items-center gap-1 text-purple-950 font-black"
                >
                  <span>Servizi Web</span>
                  <span className="text-[9px] bg-black text-[#F5E272] px-1 rounded-sm">NEW</span>
                </Link>

                <a
                  href={EBAY_STORE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:opacity-70 transition-opacity cursor-pointer flex items-center gap-1 text-[#141414]"
                >
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>eBay Store</span>
                </a>

                <button
                  onClick={() => setIsConfigOpen(true)}
                  className="hover:opacity-70 transition-opacity cursor-pointer flex items-center gap-1 text-[#141414]"
                  title="Gestione Google Drive"
                >
                  <HardDrive className="w-3.5 h-3.5" />
                  <span>Drive</span>
                </button>
              </nav>

              {/* Iconic Black Pill CTA (Matching "Buy tickets" in Image 3) */}
              <button
                onClick={() => setIsCartOpen(true)}
                className="px-4 sm:px-6 py-2.5 sm:py-3 rounded-full bg-[#141414] hover:bg-black text-[#F5E272] font-black text-xs sm:text-sm tracking-wider uppercase flex items-center gap-2 shadow-lg transition-all hover:scale-105 cursor-pointer"
              >
                <Ticket className="w-4 h-4 text-[#F5E272]" />
                <span>Carrello</span>
                <span className="bg-[#F5E272] text-[#141414] text-[11px] font-black px-2 py-0.5 rounded-full ml-1">
                  {cartCount}
                </span>
              </button>
            </div>

          </div>
        </div>

        {/* Mobile menu dropdown */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-[#F5E272] border-t border-black/10 px-4 py-6 space-y-4 shadow-xl">
            <div className="text-xs font-black uppercase tracking-widest text-[#141414]/70 mb-2">
              Menu Principale
            </div>
            <button
              onClick={() => handleSelectCategory('all')}
              className="w-full text-left py-2 text-sm font-black uppercase tracking-wider text-[#141414] hover:opacity-70 flex justify-between"
            >
              <span>Tutti i Capi</span>
              <span className="font-bold">→</span>
            </button>
            <button
              onClick={() => handleSelectCategory('ebay-capi')}
              className="w-full text-left py-2 text-sm font-black uppercase tracking-wider text-[#141414] hover:opacity-70 flex justify-between"
            >
              <span>Archivio Abbigliamento eBay</span>
              <span className="font-bold">→</span>
            </button>
            <button
              onClick={() => handleSelectCategory('ebay-servizi')}
              className="w-full text-left py-2 text-sm font-black uppercase tracking-wider text-[#141414] hover:opacity-70 flex justify-between"
            >
              <span>Servizi Web &amp; App</span>
              <span className="font-bold">→</span>
            </button>
            <Link
              href="/servizi-web"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full text-left py-2 text-sm font-black uppercase tracking-wider text-purple-950 flex justify-between"
            >
              <span>Vetrina Servizi Web Completa</span>
              <span className="font-bold">→</span>
            </Link>
            <a
              href={EBAY_STORE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full text-left py-2 text-sm font-black uppercase tracking-wider text-blue-950 flex items-center justify-between"
            >
              <span>Negozio Ufficiale eBay (newebservices)</span>
              <ShieldCheck className="w-4 h-4 text-blue-800" />
            </a>
            <button
              onClick={() => {
                setIsConfigOpen(true);
                setMobileMenuOpen(false);
              }}
              className="w-full text-left py-2 text-sm font-black uppercase tracking-wider text-[#141414]/80 flex items-center justify-between"
            >
              <span>Gestione Google Drive</span>
              <HardDrive className="w-4 h-4" />
            </button>
          </div>
        )}
      </header>
    </>
  );
}
