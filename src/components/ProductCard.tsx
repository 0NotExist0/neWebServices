'use client';

import React, { useState } from 'react';
import { Product } from '@/types/store';
import { useShop } from '@/context/ShopContext';
import { Eye, ShoppingBag, Check, ShieldCheck, ExternalLink, Flame } from 'lucide-react';

interface ProductCardProps {
  product: Product;
  index?: number;
}

export default function ProductCard({ product, index = 0 }: ProductCardProps) {
  const { addToCart, setQuickViewProduct } = useShop();
  const [selectedSize, setSelectedSize] = useState<string>(product.sizes[0] || 'M');
  const [addedAnimation, setAddedAnimation] = useState(false);
  const [imgError, setImgError] = useState(false);

  const handleAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(product, selectedSize, 1);
    setAddedAnimation(true);
    setTimeout(() => setAddedAnimation(false), 1500);
  };

  const displayImage = imgError
    ? 'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?auto=format&fit=crop&w=800&q=80'
    : product.imageUrl;

  // Direzione e ritardo della folata di vento basata sulla posizione della card
  const windClass = index % 2 === 0 ? 'animate-wind-left' : 'animate-wind-right';
  const windDelay = `${(index % 12) * 85}ms`;

  return (
    <article
      onClick={() => setQuickViewProduct(product)}
      style={{ animationDelay: windDelay }}
      className={`group bg-[#FCFAF7] rounded-2xl overflow-hidden border-2 border-[#141414] shadow-[4px_4px_0px_0px_#141414] hover:shadow-[8px_8px_0px_0px_#141414] hover:-translate-y-2 hover:rotate-[0.5deg] transition-all duration-300 flex flex-col cursor-pointer relative ${windClass}`}
    >
      {/* Immagine Pulita senza badge accavallati che coprono il vestito */}
      <div className="relative aspect-[3/4] bg-neutral-200 overflow-hidden border-b-2 border-[#141414]">
        <img
          src={displayImage}
          alt={product.name}
          onError={() => setImgError(true)}
          className={`w-full h-full object-cover object-center transition-all duration-500 ${
            product.secondaryImageUrl
              ? 'group-hover:opacity-0 group-hover:scale-105'
              : 'group-hover:scale-105'
          }`}
          loading="lazy"
        />

        {product.secondaryImageUrl && (
          <img
            src={product.secondaryImageUrl}
            alt={`${product.name} - Seconda Vista`}
            className="w-full h-full object-cover object-center absolute inset-0 opacity-0 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500 pointer-events-none"
            loading="lazy"
          />
        )}

        {/* Un SINGOLO badge minimale ed elegante in alto a sinistra (nessun arcobaleno) */}
        <div className="absolute top-3 left-3 z-10 pointer-events-none">
          <span className="px-3 py-1 text-[10px] font-black uppercase tracking-widest bg-[#141414] text-[#F5E272] rounded-full shadow-md flex items-center gap-1">
            <Flame className="w-3 h-3 text-[#F5E272]" />
            <span>Pezzo Unico</span>
          </span>
        </div>

        {/* Badge Categoria / Provenienza discreto in alto a destra */}
        <div className="absolute top-3 right-3 z-10 pointer-events-none">
          <span className="px-2.5 py-1 text-[10px] font-black uppercase tracking-wider bg-white/90 backdrop-blur-xs text-[#141414] rounded-full border border-black/15 shadow-xs">
            {product.isEbayItem ? 'eBay Archive' : product.folderName}
          </span>
        </div>

        {/* Hover Overlay con pulsante "Guarda Capi" */}
        <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
          <button
            type="button"
            className="pointer-events-auto px-5 py-2.5 bg-[#F5E272] text-[#141414] rounded-full text-xs font-black uppercase tracking-wider shadow-2xl flex items-center gap-2 hover:scale-105 transition-transform cursor-pointer"
            onClick={(e) => {
              e.stopPropagation();
              setQuickViewProduct(product);
            }}
          >
            <Eye className="w-4 h-4 text-[#141414]" />
            <span>Dettagli &amp; Zoom</span>
          </button>
        </div>
      </div>

      {/* Dati Prodotto con Tipografia Rigorosa e Trigger Psicologici */}
      <div className="p-4 sm:p-5 flex flex-col flex-1 justify-between bg-[#FCFAF7]">
        <div>
          {/* Scarcity Trigger Manipolatorio */}
          <div className="flex items-center justify-between text-[10px] font-black uppercase tracking-widest text-[#141414]/70 mb-2">
            <span className="inline-flex items-center gap-1 text-emerald-800">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse" />
              Solo 1 Disponibile
            </span>
            <span>Ref: {product.id.replace('ebay-', '#')}</span>
          </div>

          <h3 className="font-black text-sm sm:text-base text-[#141414] line-clamp-2 leading-snug group-hover:text-black transition-colors">
            {product.name}
          </h3>

          <p className="text-xs text-[#141414]/70 mt-1 line-clamp-1 font-medium">
            {product.description || `Autentico capo d'archivio ${product.folderName}`}
          </p>
        </div>

        <div className="mt-4 pt-3 border-t-2 border-[#141414]/15">
          {/* Prezzo con Price Anchoring Psicologico */}
          <div className="flex items-baseline gap-2 mb-3">
            {product.price !== undefined && product.price !== null ? (
              <>
                <span className="text-xl sm:text-2xl font-black text-[#141414] tracking-tight">
                  {product.price.toFixed(2)} €
                </span>
                {product.originalPrice && product.originalPrice > product.price && (
                  <span className="text-xs font-bold text-[#141414]/40 line-through">
                    {product.originalPrice.toFixed(2)} €
                  </span>
                )}
              </>
            ) : (
              <span className="text-xs font-black uppercase tracking-wider text-[#141414] bg-[#F5E272] px-2.5 py-1 rounded-md">
                Vedi Inserzione eBay
              </span>
            )}
          </div>

          {/* Selettore Taglie & Pulsanti d'Azione Coerenti */}
          <div className="flex items-center justify-between gap-2">
            {/* Taglie */}
            <div
              className="flex items-center gap-1 overflow-x-auto py-0.5"
              onClick={(e) => e.stopPropagation()}
            >
              {product.sizes.map((size) => (
                <button
                  key={size}
                  type="button"
                  onClick={() => setSelectedSize(size)}
                  className={`text-[11px] font-black h-7 min-w-7 px-2 rounded-lg border-2 transition-all cursor-pointer ${
                    selectedSize === size
                      ? 'bg-[#141414] text-[#F5E272] border-[#141414]'
                      : 'bg-white text-[#141414] border-[#141414]/30 hover:border-[#141414]'
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>

            {/* Pulsante Acquisto su eBay / Carrello */}
            <div className="flex items-center gap-1.5 shrink-0">
              {product.isEbayItem && product.ebayListingUrl && (
                <a
                  href={product.ebayListingUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="px-3 py-1.5 rounded-lg bg-[#141414] hover:bg-black text-[#F5E272] text-xs font-black uppercase tracking-wider flex items-center gap-1 transition-all shadow-sm cursor-pointer"
                  title="Acquista con Protezione Acquirente eBay"
                >
                  <ShieldCheck className="w-3.5 h-3.5 text-[#F5E272]" />
                  <span>eBay</span>
                  <ExternalLink className="w-3 h-3 opacity-70" />
                </a>
              )}

              <button
                type="button"
                onClick={handleAdd}
                disabled={addedAnimation}
                className={`p-2 rounded-lg border-2 border-[#141414] transition-all flex items-center justify-center shrink-0 cursor-pointer ${
                  addedAnimation
                    ? 'bg-emerald-700 text-white border-emerald-700'
                    : 'bg-[#F5E272] hover:bg-[#ebd55c] text-[#141414]'
                }`}
                title="Aggiungi al Carrello Personale"
              >
                {addedAnimation ? (
                  <Check className="w-4 h-4 text-white" />
                ) : (
                  <ShoppingBag className="w-4 h-4 text-[#141414]" />
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
