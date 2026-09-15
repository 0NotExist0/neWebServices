'use client';

import React, { useState, useMemo } from 'react';
import { useShop } from '@/context/ShopContext';
import ProductCard from './ProductCard';
import CategoryFilter from './CategoryFilter';
import { SearchX, HardDrive } from 'lucide-react';

export default function ProductGrid() {
  const {
    products,
    selectedFolderId,
    setSelectedFolderId,
    searchQuery,
    setSearchQuery,
    isLoading,
    isDemo,
    setIsConfigOpen,
  } = useShop();

  const [sortBy, setSortBy] = useState('default');

  const filteredProducts = useMemo(() => {
    return products
      .filter((p) => {
        const matchesFolder =
          selectedFolderId === 'all' || p.folderId === selectedFolderId;
        const query = searchQuery.trim().toLowerCase();
        const matchesSearch =
          !query ||
          p.name.toLowerCase().includes(query) ||
          p.folderName.toLowerCase().includes(query) ||
          (p.description && p.description.toLowerCase().includes(query));
        return matchesFolder && matchesSearch;
      })
      .sort((a, b) => {
        if (sortBy === 'price-asc') return a.price - b.price;
        if (sortBy === 'price-desc') return b.price - a.price;
        if (sortBy === 'name') return a.name.localeCompare(b.name);
        return 0;
      });
  }, [products, selectedFolderId, searchQuery, sortBy]);

  return (
    <section id="catalog-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      {isDemo && (
        <div className="mb-10 p-4 sm:p-5 rounded-2xl bg-amber-50 border border-amber-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-xs">
          <div className="flex items-start gap-3">
            <div className="p-2 rounded-xl bg-amber-100 text-amber-800 shrink-0">
              <HardDrive className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-amber-950">
                Modalità Dimostrativa Attiva (Vestiti di Esempio)
              </h4>
              <p className="text-xs text-amber-800 mt-0.5 leading-relaxed">
                I capi mostrati qui sotto sono dimostrativi. Collega la tua API Key di Google Drive e la cartella per caricare istantaneamente le tue foto con i tuoi menu!
              </p>
            </div>
          </div>
          <button
            onClick={() => setIsConfigOpen(true)}
            className="px-4 py-2 bg-amber-900 hover:bg-neutral-900 text-white rounded-xl text-xs font-semibold tracking-wide transition-colors whitespace-nowrap shadow-xs cursor-pointer"
          >
            Collega il tuo Drive
          </button>
        </div>
      )}

      <CategoryFilter sortBy={sortBy} setSortBy={setSortBy} />

      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="bg-white rounded-xl border border-neutral-100 overflow-hidden animate-pulse">
              <div className="aspect-[3/4] bg-neutral-200" />
              <div className="p-4 space-y-3">
                <div className="h-4 bg-neutral-200 rounded-md w-3/4" />
                <div className="h-3 bg-neutral-200 rounded-md w-1/2" />
                <div className="h-8 bg-neutral-100 rounded-md mt-4" />
              </div>
            </div>
          ))}
        </div>
      ) : filteredProducts.length === 0 ? (
        <div className="text-center py-20 px-4 bg-neutral-50 rounded-3xl border border-dashed border-neutral-200">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-neutral-100 flex items-center justify-center text-neutral-400">
            <SearchX className="w-8 h-8" />
          </div>
          <h3 className="font-serif text-xl font-bold text-neutral-800">
            Nessun capo trovato
          </h3>
          <p className="text-sm text-neutral-500 mt-1 max-w-md mx-auto">
            {searchQuery
              ? `Nessun risultato per "${searchQuery}". Prova a cercare un altro termine o ripristina la ricerca.`
              : 'Non ci sono capi in questa cartella al momento.'}
          </p>
          <div className="mt-6 flex justify-center gap-3">
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="px-4 py-2 text-xs font-semibold bg-neutral-900 text-white rounded-lg hover:bg-neutral-800 transition-colors cursor-pointer"
              >
                Cancella Ricerca
              </button>
            )}
            {selectedFolderId !== 'all' && (
              <button
                onClick={() => setSelectedFolderId('all')}
                className="px-4 py-2 text-xs font-semibold bg-neutral-100 text-neutral-700 rounded-lg hover:bg-neutral-200 transition-colors cursor-pointer"
              >
                Mostra Tutti i Capi
              </button>
            )}
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </section>
  );
}
