'use client';

import React, { useState, useMemo } from 'react';
import { useShop } from '@/context/ShopContext';
import ProductCard from './ProductCard';
import CategoryFilter from './CategoryFilter';
import {
  SearchX,
  HardDrive,
  FolderPlus,
  RefreshCw,
  Eye,
  Flame,
} from 'lucide-react';

export default function ProductGrid() {
  const {
    products,
    selectedFolderId,
    setSelectedFolderId,
    searchQuery,
    setSearchQuery,
    isLoading,
    isEmptyDrive,
    driveFolderName,
    showDemoFallback,
    setShowDemoFallback,
    refreshCatalog,
  } = useShop();

  const [sortBy, setSortBy] = useState('default');

  const rootFolderId =
    process.env.NEXT_PUBLIC_GOOGLE_DRIVE_ROOT_FOLDER_ID ||
    (typeof window !== 'undefined' ? localStorage.getItem('drive_root_folder_id') : '') ||
    '';

  const driveUrl = rootFolderId
    ? `https://drive.google.com/drive/folders/${rootFolderId}`
    : 'https://drive.google.com';

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
        if (sortBy === 'price-asc') return (a.price || 0) - (b.price || 0);
        if (sortBy === 'price-desc') return (b.price || 0) - (a.price || 0);
        if (sortBy === 'name') return a.name.localeCompare(b.name);
        return 0;
      });
  }, [products, selectedFolderId, searchQuery, sortBy]);

  return (
    <section id="catalog-section" className="bg-[#BE9B8D] text-[#141414] py-16 sm:py-24 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Banner discreto se Drive è collegato ma non ha ancora foto (capi eBay visibili sotto) */}
        {isEmptyDrive && products.length > 0 && (
          <div className="mb-10 p-5 rounded-2xl bg-[#141414] text-[#F5E272] border-2 border-black flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xl">
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 rounded-full bg-[#F5E272] animate-ping shrink-0" />
              <div>
                <p className="font-black uppercase tracking-wider text-xs sm:text-sm text-white">
                  Google Drive &amp; eBay Sincronizzati
                </p>
                <p className="text-xs text-neutral-300 mt-0.5 font-medium">
                  Stai visualizzando il catalogo attivo di eBay. I capi che caricherai nella cartella Drive <strong>&ldquo;{driveFolderName}&rdquo;</strong> compariranno automaticamente qui.
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <a
                href={driveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 bg-[#F5E272] hover:bg-white text-[#141414] rounded-full text-xs font-black uppercase tracking-wider transition-all cursor-pointer shadow-md"
              >
                <span>Apri Drive</span>
              </a>
              <button
                onClick={() => refreshCatalog()}
                disabled={isLoading}
                className="px-4 py-2 border-2 border-[#F5E272] text-[#F5E272] hover:bg-[#F5E272] hover:text-[#141414] rounded-full text-xs font-black uppercase tracking-wider transition-all cursor-pointer disabled:opacity-50"
              >
                <span>Sincronizza</span>
              </button>
            </div>
          </div>
        )}

        {/* Categorie e Filtri Ispirati a Frans Hals Museum */}
        <CategoryFilter sortBy={sortBy} setSortBy={setSortBy} />

        {/* Loading Skeleton */}
        {isLoading && products.length === 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8">
            {[...Array(8)].map((_, i) => (
              <div
                key={i}
                className="bg-[#FCFAF7] rounded-2xl border-2 border-[#141414] overflow-hidden animate-pulse shadow-[4px_4px_0px_0px_#141414]"
              >
                <div className="aspect-[3/4] bg-[#141414]/10" />
                <div className="p-4 space-y-3">
                  <div className="h-4 bg-[#141414]/10 rounded-md w-3/4" />
                  <div className="h-3 bg-[#141414]/10 rounded-md w-1/2" />
                  <div className="h-8 bg-[#141414]/10 rounded-md mt-4" />
                </div>
              </div>
            ))}
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="text-center py-20 px-4 bg-[#FCFAF7] rounded-3xl border-2 border-[#141414] shadow-[6px_6px_0px_0px_#141414]">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-[#F5E272] border-2 border-[#141414] flex items-center justify-center text-[#141414]">
              <SearchX className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-black uppercase tracking-tight text-[#141414]">
              Nessun capo trovato
            </h3>
            <p className="text-xs sm:text-sm font-bold uppercase tracking-wider text-[#141414]/70 mt-2 max-w-md mx-auto">
              {searchQuery
                ? `Nessun risultato per "${searchQuery}". Prova un altro termine o ripristina i filtri.`
                : 'Non ci sono capi in questa sezione al momento.'}
            </p>
            <div className="mt-6 flex justify-center gap-3">
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="px-6 py-2.5 bg-[#141414] text-[#F5E272] rounded-full text-xs font-black uppercase tracking-wider shadow-md hover:scale-105 transition-all cursor-pointer"
                >
                  Azzera Ricerca
                </button>
              )}
              {selectedFolderId !== 'all' && (
                <button
                  onClick={() => setSelectedFolderId('all')}
                  className="px-6 py-2.5 border-2 border-[#141414] bg-white text-[#141414] rounded-full text-xs font-black uppercase tracking-wider hover:bg-[#141414] hover:text-[#F5E272] transition-all cursor-pointer"
                >
                  Tutti i Capi
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

      </div>
    </section>
  );
}
