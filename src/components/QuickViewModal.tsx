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
  Clock,
  ExternalLink,
  ChevronLeft,
  ChevronRight,
  ZoomIn,
} from 'lucide-react';

export default function QuickViewModal() {
  const {
    quickViewProduct,
    setQuickViewProduct,
    addToCart,
    isWhatsAppAvailable,
    whatsAppNumber,
  } = useShop();

  const [selectedSize, setSelectedSize] = useState<string>('');
  const [quantity, setQuantity] = useState<number>(1);
  const [isAdded, setIsAdded] = useState(false);
  const [imgError, setImgError] = useState(false);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [isZoomOpen, setIsZoomOpen] = useState(false);

  useEffect(() => {
    if (quickViewProduct) {
      setSelectedSize(quickViewProduct.sizes[0] || 'M');
      setQuantity(1);
      setIsAdded(false);
      setImgError(false);
      setActiveImageIndex(0);
      setIsZoomOpen(false);
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

  const cleanPhone = (whatsAppNumber || '').replace(/[^0-9]/g, '');
  const priceDisplay =
    quickViewProduct.price !== undefined && quickViewProduct.price !== null
      ? `${quickViewProduct.price.toFixed(2)}€`
      : 'Su richiesta';
  const whatsappMsg = encodeURIComponent(
    `Salve! Vorrei maggiori informazioni o ordinare il capo: *${quickViewProduct.name}* (Taglia: ${selectedSize}, Prezzo: ${priceDisplay}) visto sul vostro sito.`
  );
  const whatsappUrl = `https://wa.me/${cleanPhone}?text=${whatsappMsg}`;

  const allImages =
    quickViewProduct.images && quickViewProduct.images.length > 0
      ? quickViewProduct.images
      : [quickViewProduct.imageUrl];

  const currentImageUrl = imgError
    ? 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=800&q=80'
    : allImages[activeImageIndex] || quickViewProduct.imageUrl;

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

        <div className="w-full md:w-1/2 bg-neutral-900 flex flex-col justify-between relative overflow-hidden">
          <div className="relative aspect-[3/4] md:aspect-auto md:flex-1 bg-neutral-950 overflow-hidden flex items-center justify-center group">
            <img
              src={currentImageUrl}
              alt={quickViewProduct.name}
              onError={() => setImgError(true)}
              className="w-full h-full object-cover object-center cursor-zoom-in transition-transform duration-300 group-hover:scale-105"
              onClick={() => setIsZoomOpen(true)}
            />

            {/* Badges */}
            <div className="absolute top-4 left-4 flex flex-col gap-1.5 z-10 pointer-events-none">
              <div className="bg-[#141414] text-[#F5E272] text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest shadow-md">
                Pezzo Unico d&apos;Archivio
              </div>
              {allImages.length > 1 && (
                <div className="bg-[#141414]/90 text-white text-[10px] font-bold px-2.5 py-1 rounded-full shadow-xs">
                  Foto {activeImageIndex + 1} di {allImages.length}
                </div>
              )}
            </div>

            {/* Pulsante Zoom */}
            <button
              type="button"
              onClick={() => setIsZoomOpen(true)}
              className="absolute top-4 right-14 z-10 p-2 rounded-full bg-black/60 hover:bg-black text-white transition-colors cursor-pointer shadow-md"
              title="Ingrandisci a schermo intero"
            >
              <ZoomIn className="w-4 h-4" />
            </button>

            {/* Frecce Navigazione Immagini (se più di 1 foto) */}
            {allImages.length > 1 && (
              <>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setActiveImageIndex((prev) => (prev > 0 ? prev - 1 : allImages.length - 1));
                  }}
                  className="absolute left-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/90 hover:bg-white text-neutral-900 shadow-md transition-all cursor-pointer z-10"
                  aria-label="Foto precedente"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setActiveImageIndex((prev) => (prev < allImages.length - 1 ? prev + 1 : 0));
                  }}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/90 hover:bg-white text-neutral-900 shadow-md transition-all cursor-pointer z-10"
                  aria-label="Foto successiva"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </>
            )}
          </div>

          {/* Striscia miniature (Thumbnails Anteprime) */}
          {allImages.length > 1 && (
            <div className="p-3 bg-neutral-950 border-t border-neutral-800 flex items-center gap-2 overflow-x-auto">
              <span className="text-[10px] text-neutral-400 uppercase tracking-wider font-semibold mr-1 shrink-0">
                Anteprime:
              </span>
              {allImages.map((imgUrl, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setActiveImageIndex(idx)}
                  className={`w-12 h-14 rounded-lg overflow-hidden border-2 transition-all shrink-0 cursor-pointer ${
                    activeImageIndex === idx
                      ? 'border-amber-400 scale-105 shadow-md'
                      : 'border-neutral-700 opacity-60 hover:opacity-100'
                  }`}
                >
                  <img src={imgUrl} alt={`Anteprima ${idx + 1}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="w-full md:w-1/2 p-6 sm:p-8 flex flex-col justify-between overflow-y-auto">
          <div className="space-y-4">
            <div className="flex flex-wrap items-center gap-2">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-neutral-100 text-neutral-700 text-xs rounded-md font-medium">
                <Folder className="w-3.5 h-3.5 text-amber-600" />
                <span>Cartella Drive: {quickViewProduct.folderName}</span>
              </div>
              {quickViewProduct.isEbayItem && (
                <div className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-blue-100 text-blue-900 text-xs rounded-md font-bold">
                  <ShieldCheck className="w-3.5 h-3.5 text-blue-600" />
                  <span>Oggetto su eBay • newebservices</span>
                </div>
              )}
            </div>

            <div>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-neutral-900 leading-tight">
                {quickViewProduct.name}
              </h2>
              <div className="flex items-baseline gap-3 mt-2">
                {quickViewProduct.price !== undefined && quickViewProduct.price !== null ? (
                  <>
                    <span className="text-2xl font-bold text-neutral-950">
                      {quickViewProduct.price.toFixed(2)} €
                    </span>
                    {quickViewProduct.originalPrice && (
                      <span className="text-sm text-neutral-400 line-through">
                        {quickViewProduct.originalPrice.toFixed(2)} €
                      </span>
                    )}
                  </>
                ) : (
                  <span className="text-sm font-semibold text-neutral-600 bg-neutral-100 px-3 py-1 rounded-lg">
                    {quickViewProduct.isEbayItem ? 'Vedi prezzo su eBay' : 'Prezzo su richiesta'}
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
            {quickViewProduct.isEbayItem && quickViewProduct.ebayListingUrl && (
              <div className="p-4 rounded-2xl bg-[#141414] text-[#F5E272] border-2 border-black space-y-3 shadow-lg">
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-1.5 font-black uppercase tracking-wider text-[#F5E272]">
                    <ShieldCheck className="w-4 h-4 text-[#F5E272]" />
                    <span>Garanzia Ufficiale eBay</span>
                  </div>
                  <span className="text-[10px] font-bold text-neutral-300">Venditore: newebservices</span>
                </div>
                <a
                  href={quickViewProduct.ebayListingUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3.5 px-4 rounded-full bg-[#F5E272] hover:bg-white text-[#141414] font-black uppercase tracking-wider text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md transition-all cursor-pointer hover:scale-105"
                >
                  <ShieldCheck className="w-4 h-4" />
                  <span>
                    Acquista su eBay
                    {quickViewProduct.price !== undefined && quickViewProduct.price !== null
                      ? ` • ${(quickViewProduct.price * quantity).toFixed(2)} €`
                      : ''}
                  </span>
                  <ExternalLink className="w-4 h-4 opacity-70" />
                </a>
              </div>
            )}

            <button
              onClick={handleAddToCart}
              disabled={isAdded}
              className={`w-full py-3.5 rounded-full font-black uppercase tracking-wider text-xs sm:text-sm flex items-center justify-center gap-2 border-2 border-[#141414] shadow-md transition-all cursor-pointer hover:scale-105 ${
                isAdded
                  ? 'bg-emerald-800 text-white border-emerald-800'
                  : 'bg-[#141414] text-[#F5E272] hover:bg-black'
              }`}
            >
              {isAdded ? (
                <>
                  <Check className="w-5 h-5" />
                  <span>Aggiunto al Carrello Personale!</span>
                </>
              ) : (
                <>
                  <ShoppingBag className="w-5 h-5" />
                  <span>
                    Aggiungi al Carrello Personale
                    {quickViewProduct.price !== undefined && quickViewProduct.price !== null
                      ? ` • ${(quickViewProduct.price * quantity).toFixed(2)} €`
                      : ''}
                  </span>
                </>
              )}
            </button>

            {isWhatsAppAvailable ? (
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 rounded-xl border border-emerald-500/30 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 font-medium text-xs flex items-center justify-center gap-2 transition-colors cursor-pointer"
              >
                <MessageCircle className="w-4 h-4 text-emerald-600" />
                <span>Richiedi info o ordina su WhatsApp</span>
              </a>
            ) : (
              <div className="w-full py-2.5 px-3 rounded-xl bg-neutral-100 border border-neutral-200 text-neutral-500 text-xs flex items-center justify-center gap-2">
                <Clock className="w-3.5 h-3.5 text-neutral-400" />
                <span>Assistenza WhatsApp: Prossimamente attiva (Coming Soon)</span>
              </div>
            )}

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

      {/* Lightbox Ingrandimento Anteprima ad Alta Definizione */}
      {isZoomOpen && (
        <div
          className="fixed inset-0 z-60 bg-black/95 backdrop-blur-md flex items-center justify-center p-4 sm:p-8 cursor-zoom-out"
          onClick={() => setIsZoomOpen(false)}
        >
          <button
            onClick={() => setIsZoomOpen(false)}
            className="absolute top-6 right-6 p-3 rounded-full bg-white/20 hover:bg-white text-white hover:text-black transition-colors cursor-pointer"
            aria-label="Chiudi Zoom"
          >
            <X className="w-6 h-6" />
          </button>
          <img
            src={currentImageUrl}
            alt={`${quickViewProduct.name} - Anteprima HD`}
            className="max-w-full max-h-[92vh] object-contain rounded-xl shadow-2xl"
          />
        </div>
      )}
    </div>
  );
}
