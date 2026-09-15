'use client';

import React, { useState, useEffect } from 'react';
import { useShop } from '@/context/ShopContext';
import {
  X,
  ShoppingBag,
  Check,
  Folder,
  ShieldCheck,
  Truck,
  RotateCcw,
  MessageCircle,
} from 'lucide-react';

export default function QuickViewModal() {
  const { quickViewProduct, setQuickViewProduct, addToCart } = useShop();
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [quantity, setQuantity] = useState<number>(1);
  const [isAdded, setIsAdded] = useState(false);
  const [imgError, setImgError] = useState(false);

  useEffect(() => {
    if (quickViewProduct) {
      setSelectedSize(quickViewProduct.sizes[0] || 'M');
      setQuantity(1);
      setIsAdded(false);
      setImgError(false);
    }
  }, [quickViewProduct]);

  if (!quickViewProduct) return null;

  const handleAddToCart = () => {
    addToCart(quickViewProduct, selectedSize, quantity);
    setIsAdded(true);
    setTimeout(() => {
      setIsAdded(false);
      setQuickViewProduct(null);
    }, 1000);
  };

  const whatsappPhone = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '+393400000000';
  const whatsappMsg = encodeURIComponent(
    `Salve! Vorrei maggiori informazioni o ordinare il capo: *${quickViewProduct.name}* (Taglia: ${selectedSize}, Prezzo: ${quickViewProduct.price.toFixed(2)}€) visto sul vostro sito.`
  );
  const whatsappUrl = `https://wa.me/${whatsappPhone.replace(/[^0-9]/g, '')}?text=${whatsappMsg}`;

  const displayImage = imgError
    ? 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=800&q=80'
    : quickViewProduct.imageUrl;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-xs"
      onClick={() => setQuickViewProduct(null)}
    >
      <div
        className="relative w-full max-w-4xl bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col md:flex-row max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={() => setQuickViewProduct(null)}
          className="absolute top-4 right-4 z-20 p-2 rounded-full bg-white/80 hover:bg-white text-neutral-700 hover:text-neutral-950 transition-colors shadow-xs cursor-pointer"
          aria-label="Chiudi"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="w-full md:w-1/2 bg-neutral-100 relative aspect-[3/4] md:aspect-auto max-h-80 md:max-h-none overflow-hidden">
          <img
            src={displayImage}
            alt={quickViewProduct.name}
            onError={() => setImgError(true)}
            className="w-full h-full object-cover object-center"
          />
          {quickViewProduct.isSale && (
            <div className="absolute top-4 left-4 bg-rose-600 text-white text-xs font-bold px-3 py-1 rounded-md uppercase tracking-wider shadow-md">
              In Promozione
            </div>
          )}
        </div>

        <div className="w-full md:w-1/2 p-6 sm:p-8 flex flex-col justify-between overflow-y-auto">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-neutral-100 text-neutral-700 text-xs rounded-md font-medium">
              <Folder className="w-3.5 h-3.5 text-amber-600" />
              <span>Cartella Drive: {quickViewProduct.folderName}</span>
            </div>

            <div>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-neutral-900 leading-tight">
                {quickViewProduct.name}
              </h2>
              <div className="flex items-baseline gap-3 mt-2">
                <span className="text-2xl font-bold text-neutral-950">
                  {quickViewProduct.price.toFixed(2)} €
                </span>
                {quickViewProduct.originalPrice && (
                  <span className="text-sm text-neutral-400 line-through">
                    {quickViewProduct.originalPrice.toFixed(2)} €
                  </span>
                )}
              </div>
            </div>

            <p className="text-neutral-600 text-sm leading-relaxed border-t border-b border-neutral-100 py-3">
              {quickViewProduct.description}
            </p>

            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-bold uppercase tracking-wider text-neutral-800">
                  Seleziona Taglia
                </label>
                <span className="text-[11px] text-neutral-400">Guida alle taglie</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {quickViewProduct.sizes.map((size) => (
                  <button
                    key={size}
                    type="button"
                    onClick={() => setSelectedSize(size)}
                    className={`min-w-10 px-3 py-2 text-xs font-semibold rounded-lg border transition-all cursor-pointer ${
                      selectedSize === size
                        ? 'bg-neutral-900 text-white border-neutral-900 shadow-xs'
                        : 'bg-white text-neutral-700 border-neutral-200 hover:border-neutral-400'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-neutral-800 block mb-2">
                Quantità
              </label>
              <div className="inline-flex items-center border border-neutral-200 rounded-lg overflow-hidden bg-neutral-50">
                <button
                  type="button"
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="px-3 py-1.5 text-neutral-600 hover:bg-neutral-200 transition-colors font-medium cursor-pointer"
                >
                  -
                </button>
                <span className="px-4 py-1.5 text-sm font-semibold text-neutral-900">
                  {quantity}
                </span>
                <button
                  type="button"
                  onClick={() => setQuantity((q) => q + 1)}
                  className="px-3 py-1.5 text-neutral-600 hover:bg-neutral-200 transition-colors font-medium cursor-pointer"
                >
                  +
                </button>
              </div>
            </div>
          </div>

          <div className="pt-6 space-y-3 mt-4">
            <button
              onClick={handleAddToCart}
              disabled={isAdded}
              className={`w-full py-3.5 rounded-xl font-medium text-sm flex items-center justify-center gap-2 shadow-md transition-all cursor-pointer ${
                isAdded
                  ? 'bg-emerald-600 text-white'
                  : 'bg-neutral-950 text-white hover:bg-neutral-800'
              }`}
            >
              {isAdded ? (
                <>
                  <Check className="w-5 h-5" />
                  <span>Aggiunto al Carrello!</span>
                </>
              ) : (
                <>
                  <ShoppingBag className="w-5 h-5" />
                  <span>Aggiungi al Carrello • {(quickViewProduct.price * quantity).toFixed(2)} €</span>
                </>
              )}
            </button>

            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3 rounded-xl border border-emerald-500/30 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 font-medium text-xs flex items-center justify-center gap-2 transition-colors cursor-pointer"
            >
              <MessageCircle className="w-4 h-4 text-emerald-600" />
              <span>Richiedi info o ordina su WhatsApp</span>
            </a>

            <div className="grid grid-cols-3 gap-2 pt-4 border-t border-neutral-100 text-center">
              <div className="flex flex-col items-center text-[10px] text-neutral-500">
                <Truck className="w-3.5 h-3.5 text-neutral-700 mb-1" />
                <span>Spedizione 24/48h</span>
              </div>
              <div className="flex flex-col items-center text-[10px] text-neutral-500">
                <RotateCcw className="w-3.5 h-3.5 text-neutral-700 mb-1" />
                <span>Reso Facile 14gg</span>
              </div>
              <div className="flex flex-col items-center text-[10px] text-neutral-500">
                <ShieldCheck className="w-3.5 h-3.5 text-neutral-700 mb-1" />
                <span>Garanzia Qualità</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
