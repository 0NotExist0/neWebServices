'use client';

import React, { useState } from 'react';
import { Product } from '@/types/store';
import { useShop } from '@/context/ShopContext';
import { Eye, ShoppingBag, Check, Folder, ExternalLink, ShieldCheck } from 'lucide-react';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
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
    ? 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=800&q=80'
    : product.imageUrl;

  return (
    <div
      onClick={() => setQuickViewProduct(product)}
      className="group bg-white rounded-xl overflow-hidden border border-neutral-100 hover:border-neutral-300 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col cursor-pointer relative"
    >
      <div className="relative aspect-[3/4] bg-neutral-100 overflow-hidden">
        <img
          src={displayImage}
          alt={product.name}
          onError={() => setImgError(true)}
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />

        <div className="absolute top-3 left-3 flex flex-col gap-1.5 items-start z-10 pointer-events-none">
          {product.isSale && (
            <span className="px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider bg-rose-600 text-white rounded-md shadow-xs">
              Saldi
            </span>
          )}
          {product.isNew && (
            <span className="px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider bg-neutral-900 text-white rounded-md shadow-xs">
              Novità
            </span>
          )}
          {product.isEbayItem && (
            <span className="px-2 py-0.5 text-[10px] font-bold tracking-wider bg-blue-600 text-white rounded-md shadow-xs flex items-center gap-1">
              <ShieldCheck className="w-3 h-3" />
              <span>Su eBay</span>
            </span>
          )}
          {product.folderName && (
            <span className="inline-flex items-center gap-1 px-2 py-0.5 text-[10px] font-medium bg-white/90 backdrop-blur-xs text-neutral-700 rounded-md shadow-xs">
              <Folder className="w-3 h-3 text-amber-600" />
              <span>{product.folderName}</span>
            </span>
          )}
        </div>

        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
          <button
            type="button"
            className="pointer-events-auto px-4 py-2 bg-white/95 backdrop-blur-xs text-neutral-900 rounded-full text-xs font-semibold tracking-wide shadow-md flex items-center gap-1.5 hover:bg-neutral-900 hover:text-white transition-colors cursor-pointer"
            onClick={(e) => {
              e.stopPropagation();
              setQuickViewProduct(product);
            }}
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Anteprima</span>
          </button>
        </div>
      </div>

      <div className="p-4 flex flex-col flex-1 justify-between bg-white">
        <div>
          <h3 className="font-serif text-base font-semibold text-neutral-900 group-hover:text-amber-900 transition-colors line-clamp-1">
            {product.name}
          </h3>
          <p className="text-xs text-neutral-500 mt-1 line-clamp-1">
            {product.description || `Categoria: ${product.folderName}`}
          </p>
        </div>

        <div className="mt-4 pt-3 border-t border-neutral-100">
          <div className="flex items-baseline gap-2 mb-3">
            <span className="text-lg font-bold text-neutral-950 font-sans">
              {product.price.toFixed(2)} €
            </span>
            {product.originalPrice && product.originalPrice > product.price && (
              <span className="text-xs text-neutral-400 line-through">
                {product.originalPrice.toFixed(2)} €
              </span>
            )}
          </div>

          <div className="flex items-center justify-between gap-2">
            <div
              className="flex items-center gap-1 overflow-x-auto py-0.5"
              onClick={(e) => e.stopPropagation()}
            >
              {product.sizes.map((size) => (
                <button
                  key={size}
                  type="button"
                  onClick={() => setSelectedSize(size)}
                  className={`text-[11px] font-semibold h-7 min-w-7 px-1 rounded-md border transition-all cursor-pointer ${
                    selectedSize === size
                      ? 'bg-neutral-900 text-white border-neutral-900'
                      : 'bg-white text-neutral-600 border-neutral-200 hover:border-neutral-400'
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-1.5 shrink-0">
              {product.isEbayItem && product.ebayListingUrl && (
                <a
                  href={product.ebayListingUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="px-2 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-[11px] font-bold flex items-center gap-1 transition-all shadow-xs"
                  title="Acquista protetto su eBay (newebservices)"
                >
                  <span>eBay</span>
                  <ExternalLink className="w-3 h-3 opacity-90" />
                </a>
              )}

              <button
                type="button"
                onClick={handleAdd}
                disabled={addedAnimation}
                className={`p-2 rounded-lg transition-all flex items-center justify-center shrink-0 cursor-pointer ${
                  addedAnimation
                    ? 'bg-emerald-600 text-white'
                    : 'bg-neutral-900 text-white hover:bg-neutral-800'
                }`}
                title="Aggiungi al Carrello"
              >
                {addedAnimation ? (
                  <Check className="w-4 h-4" />
                ) : (
                  <ShoppingBag className="w-4 h-4" />
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
