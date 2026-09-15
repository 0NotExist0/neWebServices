'use client';

import React, { useState } from 'react';
import { useShop } from '@/context/ShopContext';
import {
  ShoppingBag,
  Search,
  Menu as MenuIcon,
  X,
  HardDrive,
  Sparkles,
  SlidersHorizontal,
} from 'lucide-react';

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
    isLoading,
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
      {/* Top Banner */}
      <div className="bg-neutral-900 text-neutral-200 text-xs py-2 px-4 text-center font-medium tracking-wider flex items-center justify-center gap-2 border-b border-neutral-800">
        <Sparkles className="w-3.5 h-3.5 text-amber-400" />
        <span>Spedizione rapida 24/48h in tutta Italia • Ordini diretti anche via WhatsApp</span>
        <button
          onClick={() => setIsConfigOpen(true)}
          className="ml-3 underline hover:text-white flex items-center gap-1 text-[11px] opacity-90 transition-opacity cursor-pointer"
          title="Configura Google Drive"
        >
          <HardDrive className="w-3 h-3" />
          {isDemo ? 'Configura Drive' : 'Drive Connesso'}
        </button>
      </div>

      {/* Main Header */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-neutral-100 shadow-xs transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Mobile menu trigger */}
            <div className="flex items-center lg:hidden">
              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-md text-neutral-700 hover:text-neutral-900 hover:bg-neutral-100 focus:outline-hidden cursor-pointer"
                aria-label="Apri menu"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
              </button>
            </div>

            {/* Brand Logo */}
            <div className="flex items-center">
              <button
                onClick={() => handleSelectCategory('all')}
                className="text-left group cursor-pointer focus:outline-hidden"
              >
                <div className="flex items-baseline gap-1">
                  <span className="font-serif text-xl sm:text-2xl font-bold tracking-tight text-neutral-900 group-hover:opacity-80 transition-opacity">
                    NotExist<span className="text-amber-600 font-light">ShoppingPlace</span>
                  </span>
                </div>
                <span className="text-[9px] tracking-[0.25em] font-sans font-medium text-neutral-500 uppercase block">
                  Couture • by 0Not_Exist0
                </span>
              </button>
            </div>

            {/* Desktop Navigation Menu: cartelle Google Drive come menu */}
            <nav className="hidden lg:flex items-center space-x-1">
              <button
                onClick={() => handleSelectCategory('all')}
                className={`px-3 py-2 text-sm font-medium tracking-wide transition-all rounded-md cursor-pointer ${
                  selectedFolderId === 'all'
                    ? 'text-neutral-950 font-semibold border-b-2 border-neutral-950 rounded-none'
                    : 'text-neutral-600 hover:text-neutral-950 hover:bg-neutral-50'
                }`}
              >
                Tutti i Capi
              </button>

              {folders.map((folder) => {
                const isActive = selectedFolderId === folder.id;
                return (
                  <button
                    key={folder.id}
                    onClick={() => handleSelectCategory(folder.id)}
                    className={`px-3 py-2 text-sm font-medium tracking-wide transition-all rounded-md flex items-center gap-1.5 cursor-pointer ${
                      isActive
                        ? 'text-neutral-950 font-semibold border-b-2 border-neutral-950 rounded-none'
                        : 'text-neutral-600 hover:text-neutral-950 hover:bg-neutral-50'
                    }`}
                  >
                    <span>{folder.name}</span>
                    {folder.count > 0 && (
                      <span className="text-[11px] font-normal px-1.5 py-0.5 bg-neutral-100 text-neutral-600 rounded-full">
                        {folder.count}
                      </span>
                    )}
                  </button>
                );
              })}
            </nav>

            {/* Right Icons: Search, Drive Config, Cart */}
            <div className="flex items-center space-x-2 sm:space-x-4">
              <div className="relative hidden sm:block">
                <input
                  type="text"
                  placeholder="Cerca vestito, abito..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-44 focus:w-64 transition-all duration-300 pl-9 pr-4 py-1.5 text-xs bg-neutral-50 hover:bg-neutral-100 focus:bg-white border border-neutral-200 rounded-full focus:outline-none focus:ring-1 focus:ring-neutral-900"
                />
                <Search className="w-4 h-4 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-700 cursor-pointer"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>

              <button
                type="button"
                onClick={() => setSearchOpen(!searchOpen)}
                className="sm:hidden p-2 text-neutral-600 hover:text-neutral-900 rounded-full hover:bg-neutral-100 cursor-pointer"
                aria-label="Cerca"
              >
                <Search className="w-5 h-5" />
              </button>

              <button
                type="button"
                onClick={() => setIsConfigOpen(true)}
                className={`p-2 rounded-full border transition-all flex items-center gap-1.5 text-xs font-medium cursor-pointer ${
                  isDemo
                    ? 'border-amber-300 bg-amber-50 text-amber-800 hover:bg-amber-100'
                    : 'border-emerald-200 bg-emerald-50 text-emerald-800 hover:bg-emerald-100'
                }`}
                title="Gestione connessione Google Drive"
              >
                <HardDrive className="w-4 h-4" />
                <span className="hidden md:inline">
                  {isLoading ? 'Aggiornamento...' : isDemo ? 'Demo Drive' : 'Drive Attivo'}
                </span>
                {isDemo ? (
                  <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
                ) : (
                  <span className="w-2 h-2 rounded-full bg-emerald-500" />
                )}
              </button>

              <button
                type="button"
                onClick={() => setIsCartOpen(true)}
                className="relative p-2.5 rounded-full bg-neutral-900 text-white hover:bg-neutral-800 transition-all flex items-center justify-center shadow-xs cursor-pointer"
                aria-label="Carrello"
              >
                <ShoppingBag className="w-5 h-5" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-amber-500 text-neutral-950 font-bold text-[11px] w-5 h-5 rounded-full flex items-center justify-center shadow-xs">
                    {cartCount}
                  </span>
                )}
              </button>
            </div>
          </div>

          {searchOpen && (
            <div className="pb-3 sm:hidden pt-1">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Cerca vestito, colore o stile..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  autoFocus
                  className="w-full pl-9 pr-8 py-2 text-sm bg-neutral-50 border border-neutral-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-neutral-900"
                />
                <Search className="w-4 h-4 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2" />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-700 cursor-pointer"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>
          )}
        </div>

        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-neutral-100 bg-white px-4 pt-3 pb-6 space-y-1 shadow-lg">
            <div className="text-xs font-bold text-neutral-400 uppercase tracking-widest px-3 py-2">
              Menu Categorie (Cartelle Drive)
            </div>

            <button
              onClick={() => handleSelectCategory('all')}
              className={`w-full text-left px-3 py-2.5 rounded-md text-base font-medium flex items-center justify-between cursor-pointer ${
                selectedFolderId === 'all'
                  ? 'bg-neutral-900 text-white font-semibold'
                  : 'text-neutral-700 hover:bg-neutral-100'
              }`}
            >
              <span>Tutti i Capi</span>
              <span className="text-xs opacity-75">Catalogo</span>
            </button>

            {folders.map((folder) => (
              <button
                key={folder.id}
                onClick={() => handleSelectCategory(folder.id)}
                className={`w-full text-left px-3 py-2.5 rounded-md text-base font-medium flex items-center justify-between cursor-pointer ${
                  selectedFolderId === folder.id
                    ? 'bg-neutral-900 text-white font-semibold'
                    : 'text-neutral-700 hover:bg-neutral-100'
                }`}
              >
                <span>{folder.name}</span>
                <span className="text-xs px-2 py-0.5 rounded-full bg-neutral-100 text-neutral-600">
                  {folder.count}
                </span>
              </button>
            ))}

            <div className="pt-4 border-t border-neutral-100 flex flex-col gap-2">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  setIsConfigOpen(true);
                }}
                className="w-full text-left px-3 py-2 text-sm text-neutral-600 hover:text-neutral-900 flex items-center gap-2 cursor-pointer"
              >
                <SlidersHorizontal className="w-4 h-4" />
                <span>Impostazioni & Chiavi Drive</span>
              </button>
            </div>
          </div>
        )}
      </header>
    </>
  );
}
