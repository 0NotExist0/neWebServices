'use client';

import React, { useState } from 'react';
import { useShop } from '@/context/ShopContext';
import {
  X,
  ShoppingBag,
  Trash2,
  Plus,
  Minus,
  ArrowRight,
  MessageCircle,
  Truck,
  CheckCircle,
  Clock,
  ShieldCheck,
  ExternalLink,
} from 'lucide-react';

export default function CartDrawer() {
  const {
    cart,
    isCartOpen,
    setIsCartOpen,
    removeFromCart,
    updateQuantity,
    clearCart,
    cartTotal,
    isWhatsAppAvailable,
    whatsAppNumber,
  } = useShop();

  const [checkoutStep, setCheckoutStep] = useState<'cart' | 'checkout' | 'success'>('cart');
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: '',
    city: '',
    cap: '',
    notes: '',
  });

  if (!isCartOpen) return null;

  const freeShippingThreshold = 70.0;
  const shippingCost = cartTotal >= freeShippingThreshold || cartTotal === 0 ? 0 : 5.9;
  const grandTotal = cartTotal + shippingCost;
  const freeShippingRemaining = Math.max(0, freeShippingThreshold - cartTotal);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleWhatsAppCheckout = () => {
    if (!isWhatsAppAvailable) return;
    const cleanPhone = (whatsAppNumber || '').replace(/[^0-9]/g, '');

    let msg = '*NUOVO ORDINE DA SITO WEB*\n\n';
    msg += '*Articoli nel Carrello:*\n';
    cart.forEach((item, idx) => {
      msg += `${idx + 1}. *${item.product.name}*\n`;
      msg += `   - Taglia: ${item.size}\n`;
      msg += `   - Quantità: ${item.quantity}\n`;
      msg += `   - Prezzo: ${(item.product.price * item.quantity).toFixed(2)} €\n`;
    });

    msg += `\n*Totale Capi:* ${cartTotal.toFixed(2)} €`;
    msg += `\n*Spedizione:* ${shippingCost === 0 ? 'GRATUITA' : shippingCost.toFixed(2) + ' €'}`;
    msg += `\n*TOTALE COMPLESSIVO:* ${grandTotal.toFixed(2)} €\n\n`;

    if (formData.name) {
      msg += `*Dati Spedizione:*\n`;
      msg += `Nome: ${formData.name}\n`;
      msg += `Telefono: ${formData.phone}\n`;
      msg += `Indirizzo: ${formData.address}, ${formData.city} (${formData.cap})\n`;
      if (formData.notes) msg += `Note: ${formData.notes}\n`;
    }

    msg += `\nResto in attesa della vostra conferma per procedere. Grazie!`;

    const encoded = encodeURIComponent(msg);
    window.open(`https://wa.me/${cleanPhone}?text=${encoded}`, '_blank');
  };

  const handleDirectSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setCheckoutStep('success');
    if (isWhatsAppAvailable) {
      handleWhatsAppCheckout();
    }
    clearCart();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/60 backdrop-blur-xs">
      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col">
          <div className="p-6 border-b border-neutral-100 flex items-center justify-between bg-neutral-50/50">
            <div className="flex items-center gap-2.5">
              <div className="p-2 bg-neutral-900 text-white rounded-xl">
                <ShoppingBag className="w-4 h-4" />
              </div>
              <div>
                <h2 className="font-serif text-lg font-bold text-neutral-900">Il Tuo Carrello</h2>
                <span className="text-xs text-neutral-500">
                  {cart.length} {cart.length === 1 ? 'articolo' : 'articoli'}
                </span>
              </div>
            </div>
            <button
              onClick={() => {
                setIsCartOpen(false);
                setCheckoutStep('cart');
              }}
              className="p-2 text-neutral-400 hover:text-neutral-900 hover:bg-neutral-100 rounded-full transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {cart.length > 0 && (
            <div className="px-6 py-2.5 bg-neutral-900 text-white text-xs flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Truck className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                {freeShippingRemaining === 0 ? (
                  <span className="text-emerald-300 font-medium">Hai ottenuto la Spedizione Gratuita!</span>
                ) : (
                  <span>
                    Aggiungi altri <strong className="text-amber-300">{freeShippingRemaining.toFixed(2)} €</strong> per la spedizione gratis
                  </span>
                )}
              </div>
            </div>
          )}

          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {checkoutStep === 'success' ? (
              <div className="py-12 text-center space-y-4">
                <div className="w-16 h-16 mx-auto rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center shadow-xs">
                  <CheckCircle className="w-8 h-8" />
                </div>
                <h3 className="font-serif text-2xl font-bold text-neutral-900">
                  Ordine Ricevuto!
                </h3>
                <p className="text-xs sm:text-sm text-neutral-600 max-w-xs mx-auto">
                  Grazie per il tuo acquisto! I dati del tuo ordine sono stati registrati con successo. Verrai ricontattato a breve per la conferma della spedizione.
                </p>
                <button
                  onClick={() => {
                    setCheckoutStep('cart');
                    setIsCartOpen(false);
                  }}
                  className="mt-6 px-6 py-2.5 bg-neutral-900 text-white text-xs font-semibold rounded-xl hover:bg-neutral-800 transition-colors cursor-pointer"
                >
                  Continua lo Shopping
                </button>
              </div>
            ) : cart.length === 0 ? (
              <div className="py-16 text-center space-y-4">
                <div className="w-16 h-16 mx-auto rounded-full bg-neutral-100 text-neutral-400 flex items-center justify-center">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <h3 className="font-serif text-lg font-bold text-neutral-800">
                  Il carrello è vuoto
                </h3>
                <p className="text-xs text-neutral-500 max-w-xs mx-auto">
                  Esplora le collezioni e aggiungi i capi che ami per vederli apparire qui.
                </p>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="mt-4 px-6 py-2.5 bg-neutral-900 text-white text-xs font-semibold rounded-xl hover:bg-neutral-800 transition-colors cursor-pointer"
                >
                  Scopri la Collezione
                </button>
              </div>
            ) : checkoutStep === 'cart' ? (
              <div className="space-y-4 divide-y divide-neutral-100">
                {cart.map((item) => (
                  <div key={item.id} className="pt-4 first:pt-0 flex gap-4 items-center">
                    <img
                      src={item.product.thumbnailUrl || item.product.imageUrl}
                      alt={item.product.name}
                      className="w-16 h-20 object-cover rounded-lg bg-neutral-100 shrink-0 border border-neutral-100"
                    />
                    <div className="flex-1 min-w-0">
                      <h4 className="font-serif text-sm font-semibold text-neutral-900 truncate">
                        {item.product.name}
                      </h4>
                      <div className="text-xs text-neutral-500 mt-0.5 flex items-center gap-2">
                        <span>Taglia: <strong className="text-neutral-800">{item.size}</strong></span>
                        <span>•</span>
                        <span>{item.product.price.toFixed(2)} €</span>
                      </div>

                      {item.product.isEbayItem && item.product.ebayListingUrl && (
                        <a
                          href={item.product.ebayListingUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-[11px] font-bold text-blue-600 hover:text-blue-800 mt-1"
                        >
                          <ShieldCheck className="w-3 h-3" />
                          <span>Acquista con Garanzia eBay</span>
                          <ExternalLink className="w-2.5 h-2.5" />
                        </a>
                      )}

                      <div className="flex items-center justify-between mt-3">
                        <div className="flex items-center border border-neutral-200 rounded-md bg-neutral-50">
                          <button
                            onClick={() => updateQuantity(item.id, -1)}
                            className="p-1 text-neutral-600 hover:text-neutral-950 cursor-pointer"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="px-2 text-xs font-bold text-neutral-900">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.id, 1)}
                            className="p-1 text-neutral-600 hover:text-neutral-950 cursor-pointer"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>

                        <div className="flex items-center gap-3">
                          <span className="text-sm font-bold text-neutral-950">
                            {(item.product.price * item.quantity).toFixed(2)} €
                          </span>
                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="text-neutral-400 hover:text-rose-600 p-1 transition-colors cursor-pointer"
                            title="Rimuovi dal carrello"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <form id="checkout-form" onSubmit={handleDirectSubmit} className="space-y-3">
                <div className="text-xs font-semibold uppercase tracking-wider text-neutral-500 mb-2">
                  Dati di Spedizione
                </div>
                <div>
                  <label className="text-xs font-medium text-neutral-700 block mb-1">Nome e Cognome *</label>
                  <input
                    type="text"
                    name="name"
                    required
                    placeholder="Maria Rossi"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 text-xs border border-neutral-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-neutral-900"
                  />
                </div>
                <div>
                  <label className="text-xs font-medium text-neutral-700 block mb-1">Numero Telefono *</label>
                  <input
                    type="tel"
                    name="phone"
                    required
                    placeholder="+39 340 1234567"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 text-xs border border-neutral-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-neutral-900"
                  />
                </div>
                <div>
                  <label className="text-xs font-medium text-neutral-700 block mb-1">Indirizzo di Consegna *</label>
                  <input
                    type="text"
                    name="address"
                    required
                    placeholder="Via Roma 10"
                    value={formData.address}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 text-xs border border-neutral-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-neutral-900"
                  />
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="text-xs font-medium text-neutral-700 block mb-1">Città *</label>
                    <input
                      type="text"
                      name="city"
                      required
                      placeholder="Milano"
                      value={formData.city}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 text-xs border border-neutral-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-neutral-900"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-medium text-neutral-700 block mb-1">CAP *</label>
                    <input
                      type="text"
                      name="cap"
                      required
                      placeholder="20100"
                      value={formData.cap}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 text-xs border border-neutral-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-neutral-900"
                    />
                  </div>
                </div>
                <div>
                  <label className="text-xs font-medium text-neutral-700 block mb-1">Note per il corriere</label>
                  <textarea
                    name="notes"
                    rows={2}
                    placeholder="Es. Citofono interno 3"
                    value={formData.notes}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 text-xs border border-neutral-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-neutral-900"
                  />
                </div>
              </form>
            )}
          </div>

          {cart.length > 0 && checkoutStep !== 'success' && (
            <div className="p-6 border-t border-neutral-100 bg-neutral-50/50 space-y-4">
              <div className="space-y-1.5 text-xs text-neutral-600">
                <div className="flex justify-between">
                  <span>Subtotale capi:</span>
                  <span>{cartTotal.toFixed(2)} €</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Spedizione:</span>
                  <span>
                    {shippingCost === 0 ? (
                      <strong className="text-emerald-600">Gratuita</strong>
                    ) : (
                      `${shippingCost.toFixed(2)} €`
                    )}
                  </span>
                </div>
                <div className="flex justify-between text-base font-bold text-neutral-950 pt-2 border-t border-neutral-200">
                  <span>Totale:</span>
                  <span>{grandTotal.toFixed(2)} €</span>
                </div>
              </div>

              {checkoutStep === 'cart' ? (
                <div className="space-y-2">
                  <button
                    onClick={() => setCheckoutStep('checkout')}
                    className="w-full py-3.5 bg-neutral-950 hover:bg-neutral-800 text-white rounded-xl text-xs sm:text-sm font-semibold flex items-center justify-center gap-2 shadow-md transition-all cursor-pointer"
                  >
                    <span>Procedi all&apos;ordine</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>

                  {isWhatsAppAvailable ? (
                    <button
                      onClick={handleWhatsAppCheckout}
                      className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-semibold flex items-center justify-center gap-2 shadow-xs transition-all cursor-pointer"
                    >
                      <MessageCircle className="w-4 h-4" />
                      <span>Ordina Subito con WhatsApp</span>
                    </button>
                  ) : (
                    <div className="py-2 text-center text-[11px] text-neutral-400 flex items-center justify-center gap-1.5">
                      <Clock className="w-3.5 h-3.5" />
                      <span>Integrazione WhatsApp attiva a breve (Coming Soon)</span>
                    </div>
                  )}
                </div>
              ) : (
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => setCheckoutStep('cart')}
                    className="w-1/3 py-3 rounded-xl border border-neutral-200 text-neutral-700 text-xs font-medium hover:bg-neutral-100 transition-colors cursor-pointer"
                  >
                    Indietro
                  </button>
                  <button
                    type="submit"
                    form="checkout-form"
                    className="w-2/3 py-3 bg-neutral-950 hover:bg-neutral-800 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-2 shadow-md transition-all cursor-pointer"
                  >
                    <span>Conferma Ordine</span>
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
