'use client';

import React, { useState, useMemo } from 'react';
import { useShop } from '@/context/ShopContext';
import ProductCard from './ProductCard';
import CategoryFilter from './CategoryFilter';
import {
  SearchX,
  HardDrive,
  FolderPlus,
  ExternalLink,
  RefreshCw,
  Sparkles,
  Eye,
} from 'lucide-react';

export default function ProductGrid() {
  const {
    products,
    selectedFolderId,
    setSelectedFolderId,
    searchQuery,
    setSearchQuery,
    isLoading,
    isDemo,
    isEmptyDrive,
    driveFolderName,
    showDemoFallback,
    setShowDemoFallback,
    refreshCatalog,
    setIsConfigOpen,
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
    <section id="catalog-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      
      {/* 1. Schermata Drive Connesso ma Attualmente Vuoto (Onboarding immediato) */}
      {isEmptyDrive && !showDemoFallback && (
        <div className="mb-12 bg-white rounded-3xl border border-neutral-200 p-6 sm:p-10 shadow-lg relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-amber-100/50 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />

          <div className="max-w-3xl relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-emerald-900 text-xs font-semibold tracking-wide mb-4">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
              <span>Google Drive Connesso con Successo!</span>
            </div>

            <h3 className="font-serif text-2xl sm:text-4xl font-bold text-neutral-900 leading-tight">
              La cartella <span className="text-amber-800">&ldquo;{driveFolderName}&rdquo;</span> è collegata ed è pronta.
            </h3>

            <p className="text-sm sm:text-base text-neutral-600 mt-3 leading-relaxed">
              La chiave API funziona perfettamente! La cartella è al momento vuota: segui questi 3 passaggi per popolare il tuo negozio:
            </p>

            {/* Passaggi visuali */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 my-8">
              <div className="p-4 rounded-2xl bg-neutral-50 border border-neutral-100">
                <div className="w-8 h-8 rounded-full bg-neutral-900 text-white font-bold text-xs flex items-center justify-center mb-3">
                  1
                </div>
                <h5 className="font-bold text-xs text-neutral-900 uppercase tracking-wider mb-1">
                  Crea i Menu
                </h5>
                <p className="text-xs text-neutral-600 leading-relaxed">
                  Dentro la cartella crea le sottocartelle (es. <em>Abiti</em>, <em>Giacche</em>, <em>Pantaloni</em>). Diventeranno le categorie del menu!
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-neutral-50 border border-neutral-100">
                <div className="w-8 h-8 rounded-full bg-neutral-900 text-white font-bold text-xs flex items-center justify-center mb-3">
                  2
                </div>
                <h5 className="font-bold text-xs text-neutral-900 uppercase tracking-wider mb-1">
                  Carica le Foto
                </h5>
                <p className="text-xs text-neutral-600 leading-relaxed">
                  Trascina le foto dei vestiti dentro ciascuna sottocartella (JPG, PNG o WEBP).
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-neutral-50 border border-neutral-100">
                <div className="w-8 h-8 rounded-full bg-neutral-900 text-white font-bold text-xs flex items-center justify-center mb-3">
                  3
                </div>
                <h5 className="font-bold text-xs text-neutral-900 uppercase tracking-wider mb-1">
                  Nome &amp; Prezzo
                </h5>
                <p className="text-xs text-neutral-600 leading-relaxed">
                  Rinomina il file indicando il prezzo (es. <code>Vestito Lino - 49.90.jpg</code>). Il sito farà il resto!
                </p>
              </div>
            </div>

            {/* Pulsanti Azione */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <a
                href={driveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 bg-neutral-900 hover:bg-neutral-800 text-white rounded-xl text-xs font-semibold flex items-center gap-2 shadow-md transition-all cursor-pointer"
              >
                <FolderPlus className="w-4 h-4 text-amber-400" />
                <span>Apri Cartella su Google Drive</span>
                <ExternalLink className="w-3 h-3 opacity-70" />
              </a>

              <button
                onClick={() => refreshCatalog()}
                disabled={isLoading}
                className="px-5 py-3 border border-neutral-300 bg-white hover:bg-neutral-50 text-neutral-800 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all cursor-pointer shadow-xs disabled:opacity-50"
              >
                <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin text-amber-600' : ''}`} />
                <span>{isLoading ? 'Rilevamento in corso...' : 'Ricarica da Google Drive'}</span>
              </button>

              <button
                onClick={() => setShowDemoFallback(true)}
                className="px-4 py-3 text-xs text-neutral-600 hover:text-neutral-900 underline flex items-center gap-1.5 cursor-pointer ml-auto"
              >
                <Eye className="w-3.5 h-3.5" />
                <span>Mostra capi di esempio nel frattempo</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Banner se ha attivato la visualizzazione dei capi demo mentre prepara il drive */}
      {isEmptyDrive && showDemoFallback && (
        <div className="mb-8 p-4 rounded-2xl bg-amber-50 border border-amber-200 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-amber-950">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-amber-600 shrink-0" />
            <span>
              Stai visualizzando i capi dimostrativi. La tua cartella Drive <strong>&ldquo;{driveFolderName}&rdquo;</strong> è pronta e in attesa delle tue prime foto.
            </span>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => refreshCatalog()}
              className="px-3 py-1.5 bg-neutral-900 text-white rounded-lg font-semibold hover:bg-neutral-800 transition-colors cursor-pointer"
            >
              Verifica Nuove Foto
            </button>
            <button
              onClick={() => setShowDemoFallback(false)}
              className="px-3 py-1.5 border border-amber-300 text-amber-900 rounded-lg hover:bg-amber-100 transition-colors cursor-pointer"
            >
              Nascondi Demo
            </button>
          </div>
        </div>
      )}

      {/* Categorie e Filtri */}
      {(products.length > 0 || !isEmptyDrive) && (
        <CategoryFilter sortBy={sortBy} setSortBy={setSortBy} />
      )}

      {/* Loading Skeleton */}
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
      ) : filteredProducts.length === 0 && !isEmptyDrive ? (
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
