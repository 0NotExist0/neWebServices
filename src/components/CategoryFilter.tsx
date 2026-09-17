'use client';

import React from 'react';
import { useShop } from '@/context/ShopContext';
import { Folder, SlidersHorizontal, RefreshCw, ShieldCheck, ExternalLink } from 'lucide-react';
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
  } = useShop();

  const currentFolder = folders.find((f) => f.id === selectedFolderId);

  return (
    <div className="mb-10 space-y-6">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-neutral-200 pb-5">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest text-neutral-500 mb-1">
            <Folder className="w-3.5 h-3.5 text-amber-600" />
            <span>Cartelle & Collezioni</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-serif font-semibold text-neutral-900">
            {selectedFolderId === 'all' ? 'Tutte le Creazioni' : (currentFolder?.name || 'Collezione')}
          </h2>
          <p className="text-xs sm:text-sm text-neutral-500 mt-1">
            Foto caricate direttamente dalle cartelle di Google Drive
          </p>
        </div>

        <div className="flex items-center gap-3 self-start md:self-auto">
          <div className="flex items-center gap-1.5 text-xs text-neutral-600 bg-neutral-100 rounded-lg px-3 py-2">
            <SlidersHorizontal className="w-3.5 h-3.5 text-neutral-500" />
            <span className="font-medium">Ordina per:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-transparent font-semibold text-neutral-900 focus:outline-none cursor-pointer"
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
            className="p-2 rounded-lg border border-neutral-200 hover:bg-neutral-100 text-neutral-600 hover:text-neutral-900 transition-colors disabled:opacity-50 cursor-pointer"
            title="Ricarica da Google Drive"
          >
            <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin text-amber-600' : ''}`} />
          </button>
        </div>
      </div>

      <div className="flex items-center gap-2 overflow-x-auto pb-2">
        <button
          onClick={() => setSelectedFolderId('all')}
          className={`px-4 py-2 rounded-full text-xs sm:text-sm font-medium whitespace-nowrap transition-all cursor-pointer flex items-center gap-1.5 ${
            selectedFolderId === 'all'
              ? 'bg-neutral-900 text-white shadow-md'
              : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
          }`}
        >
          <span>Tutti i Capi</span>
          <span className={`text-[11px] px-1.5 py-0.5 rounded-full ${selectedFolderId === 'all' ? 'bg-white/20 text-white' : 'bg-white text-neutral-600'}`}>
            {products.length}
          </span>
        </button>

        {folders.map((folder) => {
          const isSelected = selectedFolderId === folder.id;
          const isEbayFolder = folder.name.toLowerCase().includes('ebay');
          return (
            <button
              key={folder.id}
              onClick={() => setSelectedFolderId(folder.id)}
              className={`px-4 py-2 rounded-full text-xs sm:text-sm font-medium whitespace-nowrap transition-all cursor-pointer flex items-center gap-2 ${
                isSelected
                  ? isEbayFolder
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'bg-neutral-900 text-white shadow-md'
                  : isEbayFolder
                  ? 'bg-blue-50 text-blue-900 border border-blue-200 hover:bg-blue-100'
                  : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
              }`}
            >
              {isEbayFolder ? (
                <ShieldCheck className={`w-3.5 h-3.5 ${isSelected ? 'text-blue-200' : 'text-blue-600'}`} />
              ) : (
                <Folder className={`w-3.5 h-3.5 ${isSelected ? 'text-amber-300' : 'text-neutral-400'}`} />
              )}
              <span>{folder.name}</span>
              {folder.count > 0 && (
                <span
                  className={`text-[11px] px-1.5 py-0.5 rounded-full ${
                    isSelected ? 'bg-white/20 text-white' : 'bg-white text-neutral-600'
                  }`}
                >
                  {folder.count}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Banner Esplicativo quando è selezionata una cartella eBay */}
      {currentFolder?.name.toLowerCase().includes('ebay') && (
        <div className="p-4 sm:p-5 rounded-2xl bg-linear-to-r from-blue-950/10 via-blue-50 to-amber-50/40 border border-blue-200 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="p-2.5 bg-blue-600 text-white rounded-xl shrink-0 shadow-xs">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="inline-flex items-center gap-1.5 text-[11px] font-bold text-blue-800 uppercase tracking-wide">
                <span>Account eBay Ufficiale: newebservices</span>
              </div>
              <h4 className="text-sm sm:text-base font-bold text-neutral-900 leading-tight">
                Capi in Vendita con Garanzia Cliente eBay
              </h4>
              <p className="text-xs text-neutral-600 mt-0.5 max-w-xl leading-relaxed">
                Tutti i capi caricati in questa sezione sono protetti al 100% dalla Garanzia eBay. Puoi acquistare direttamente tramite il link eBay o aggiungerli al carrello del sito.
              </p>
            </div>
          </div>

          <a
            href={EBAY_STORE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2.5 bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold rounded-xl flex items-center gap-2 transition-colors shrink-0 shadow-xs"
          >
            <span>Negozio Ufficiale eBay</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      )}
    </div>
  );
}
