'use client';

import React from 'react';
import { useShop } from '@/context/ShopContext';
import { SlidersHorizontal, RefreshCw, ShieldCheck, ExternalLink, Flame } from 'lucide-react';
import { EBAY_STORE_URL } from '@/lib/services-data';

interface CategoryFilterProps {
  sortBy: string;
  setSortBy: (sort: string) => void;
}

export default function CategoryFilter({ sortBy, setSortBy }: CategoryFilterProps) {
  const {
    folders,
    selectedFolderId,
    setSelectedFolderId,
    products,
    refreshCatalog,
    isLoading,
    searchQuery,
    setSearchQuery,
  } = useShop();

  const currentFolder = folders.find((f) => f.id === selectedFolderId);

  return (
    <div className="mb-12 space-y-6">
      {/* Intestazione Sezione Ispirata a "WHAT'S ON" di Frans Hals */}
      <div className="text-center pt-6 pb-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#141414] text-[#F5E272] text-[10px] font-black tracking-widest uppercase mb-3">
          <Flame className="w-3 h-3 text-[#F5E272]" />
          <span>ARCHIVIO DISPONIBILE ORA</span>
        </div>
        <h2 className="text-4xl sm:text-6xl font-black uppercase tracking-tight text-[#141414]">
          {selectedFolderId === 'all'
            ? "WHAT'S IN THE VAULT"
            : (currentFolder?.name || 'COLLEZIONE')}
        </h2>
        <p className="text-xs sm:text-sm font-bold uppercase tracking-widest text-[#141414]/80 mt-2 max-w-xl mx-auto">
          Tutti i capi sono pezzi unici d&apos;archivio con spedizione immediata e Garanzia Cliente eBay.
        </p>
      </div>

      {/* Barra di Controllo: Cerca, Ordina e Refresh (Tutto in palette Armonica) */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-y-2 border-[#141414]/20 py-4">
        {/* Input Ricerca nel Vault */}
        <div className="w-full sm:w-72 relative">
          <input
            id="catalog-search-input"
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="CERCA TRA I CAPI..."
            className="w-full bg-[#FAF6EE] text-[#141414] placeholder-[#141414]/50 border-2 border-[#141414] rounded-full px-4 py-2 text-xs font-bold tracking-wider uppercase focus:outline-none focus:ring-2 focus:ring-[#141414]"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-black text-[#141414] hover:opacity-70"
            >
              ✕
            </button>
          )}
        </div>

        {/* Ordinamento & Refresh */}
        <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
          <div className="flex items-center gap-2 text-xs font-black tracking-wider uppercase text-[#141414] bg-[#FAF6EE] border-2 border-[#141414] rounded-full px-4 py-2">
            <SlidersHorizontal className="w-3.5 h-3.5" />
            <span>Ordina:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-transparent font-black text-[#141414] focus:outline-none cursor-pointer uppercase text-xs"
            >
              <option value="default">Consigliati</option>
              <option value="price-asc">Prezzo: Min - Max</option>
              <option value="price-desc">Prezzo: Max - Min</option>
              <option value="name">Nome A-Z</option>
            </select>
          </div>

          <button
            onClick={() => refreshCatalog()}
            disabled={isLoading}
            className="p-2 rounded-full border-2 border-[#141414] bg-[#141414] text-[#F5E272] hover:scale-105 transition-transform disabled:opacity-50 cursor-pointer shadow-xs"
            title="Sincronizza Capi Live"
          >
            <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
          </button>
        </div>
      </div>

      {/* Filtri Categorie Armonizzati (Nessun Arcobaleno, Palette Coerente) */}
      <div className="flex items-center justify-center flex-wrap gap-2 pt-2">
        <button
          onClick={() => setSelectedFolderId('all')}
          className={`px-5 py-2.5 rounded-full text-xs font-black uppercase tracking-wider transition-all cursor-pointer flex items-center gap-2 border-2 border-[#141414] ${
            selectedFolderId === 'all'
              ? 'bg-[#141414] text-[#F5E272] shadow-md scale-105'
              : 'bg-[#FAF6EE] text-[#141414] hover:bg-[#141414] hover:text-[#F5E272]'
          }`}
        >
          <span>Tutti i Capi</span>
          <span
            className={`text-[10px] px-1.5 py-0.5 rounded-full font-black ${
              selectedFolderId === 'all'
                ? 'bg-[#F5E272] text-[#141414]'
                : 'bg-[#141414]/15 text-[#141414]'
            }`}
          >
            {products.length}
          </span>
        </button>

        {folders.map((folder) => {
          const isSelected = selectedFolderId === folder.id;

          return (
            <button
              key={folder.id}
              onClick={() => setSelectedFolderId(folder.id)}
              className={`px-5 py-2.5 rounded-full text-xs font-black uppercase tracking-wider transition-all cursor-pointer flex items-center gap-2 border-2 border-[#141414] ${
                isSelected
                  ? 'bg-[#141414] text-[#F5E272] shadow-md scale-105'
                  : 'bg-[#FAF6EE] text-[#141414] hover:bg-[#141414] hover:text-[#F5E272]'
              }`}
            >
              <span>{folder.name}</span>
              {folder.count > 0 && (
                <span
                  className={`text-[10px] px-1.5 py-0.5 rounded-full font-black ${
                    isSelected
                      ? 'bg-[#F5E272] text-[#141414]'
                      : 'bg-[#141414]/15 text-[#141414]'
                  }`}
                >
                  {folder.count}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Banner Esplicativo Raffinato per eBay (Senza colori sgargianti discordanti) */}
      {(selectedFolderId === 'ebay-capi' || currentFolder?.name.toLowerCase().includes('ebay')) && (
        <div className="p-4 sm:p-5 rounded-2xl bg-[#141414] text-[#F5E272] border-2 border-black flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xl">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl overflow-hidden border-2 border-[#F5E272] bg-white p-1 shrink-0 shadow-md">
              <img
                src="/logo-official.jpg"
                alt="Logo newebservices - Not Exist Online"
                className="w-full h-full object-contain"
              />
            </div>
            <div>
              <div className="inline-flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest text-[#F5E272]/80">
                <ShieldCheck className="w-3.5 h-3.5 text-[#F5E272]" />
                <span>Account eBay Ufficiale: newebservices • Not Exist Online</span>
              </div>
              <h4 className="text-sm sm:text-base font-black uppercase tracking-tight text-white">
                Garanzia Cliente eBay 100% Inclusa
              </h4>
              <p className="text-xs text-neutral-300 mt-0.5 max-w-xl font-medium leading-relaxed">
                Tutti i capi caricati in questa sezione provengono direttamente dallo store ufficiale eBay con rimborso sicuro e spedizione tracciata.
              </p>
            </div>
          </div>

          <a
            href={EBAY_STORE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-2.5 bg-[#F5E272] hover:bg-white text-[#141414] text-xs font-black uppercase tracking-wider rounded-full flex items-center gap-2 transition-all shrink-0 shadow-md hover:scale-105"
          >
            <span>Negozio Ufficiale eBay</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      )}

      {/* Banner Esplicativo Raffinato per Servizi Web */}
      {(selectedFolderId === 'ebay-servizi' || currentFolder?.name.toLowerCase().includes('servizi')) && (
        <div className="p-4 sm:p-5 rounded-2xl bg-[#141414] text-[#F5E272] border-2 border-black flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xl">
          <div className="flex items-center gap-3.5">
            <div className="p-2.5 bg-[#F5E272] text-[#141414] rounded-xl shrink-0 text-xl font-black">
              🚀
            </div>
            <div>
              <div className="inline-flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest text-[#F5E272]/80">
                <span>Soluzioni Digitali &amp; Web</span>
              </div>
              <h4 className="text-sm sm:text-base font-black uppercase tracking-tight text-white">
                Servizi Web &amp; Web App Professionali
              </h4>
              <p className="text-xs text-neutral-300 mt-0.5 max-w-xl font-medium leading-relaxed">
                Realizzazione siti vetrina, e-commerce Google Drive e web app custom. Acquisto protetto direttamente su eBay.
              </p>
            </div>
          </div>

          <a
            href={EBAY_STORE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-2.5 bg-[#F5E272] hover:bg-white text-[#141414] text-xs font-black uppercase tracking-wider rounded-full flex items-center gap-2 transition-all shrink-0 shadow-md hover:scale-105"
          >
            <span>Vedi Inserzione eBay</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      )}
    </div>
  );
}
