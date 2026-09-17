'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, CartItem, DriveFolder, CatalogResponse } from '@/types/store';
import { DEMO_FOLDERS, DEMO_PRODUCTS } from '@/lib/demo-data';
import { EBAY_FOLDERS, INITIAL_EBAY_PRODUCTS } from '@/lib/ebay';

interface ShopContextType {
  cart: CartItem[];
  addToCart: (product: Product, size: string, quantity?: number) => void;
  removeFromCart: (itemId: string) => void;
  updateQuantity: (itemId: string, delta: number) => void;
  clearCart: () => void;
  cartCount: number;
  cartTotal: number;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;

  folders: DriveFolder[];
  products: Product[];
  selectedFolderId: string;
  setSelectedFolderId: (id: string) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;

  isDemo: boolean;
  isEmptyDrive: boolean;
  driveFolderName: string;
  showDemoFallback: boolean;
  setShowDemoFallback: (show: boolean) => void;
  isLoading: boolean;
  catalogError: string | null;
  refreshCatalog: (customKey?: string, customFolderId?: string) => Promise<void>;

  quickViewProduct: Product | null;
  setQuickViewProduct: (product: Product | null) => void;

  isConfigOpen: boolean;
  setIsConfigOpen: (open: boolean) => void;

  isWhatsAppAvailable: boolean;
  whatsAppNumber: string;
}

const ShopContext = createContext<ShopContextType | undefined>(undefined);

export function ShopProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isConfigOpen, setIsConfigOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);

  const [folders, setFolders] = useState<DriveFolder[]>(EBAY_FOLDERS);
  const [products, setProducts] = useState<Product[]>(INITIAL_EBAY_PRODUCTS);
  const [selectedFolderId, setSelectedFolderId] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [isDemo, setIsDemo] = useState(false);
  const [isEmptyDrive, setIsEmptyDrive] = useState(false);
  const [driveFolderName, setDriveFolderName] = useState('Google Drive');
  const [showDemoFallback, setShowDemoFallback] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [catalogError, setCatalogError] = useState<string | null>(null);

  // Controllo stato WhatsApp
  const rawWhatsApp = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '';
  const isWhatsAppAvailable = Boolean(
    rawWhatsApp &&
      !rawWhatsApp.toLowerCase().includes('soon') &&
      rawWhatsApp.replace(/[^0-9]/g, '').length >= 6
  );
  const whatsAppNumber = rawWhatsApp;

  useEffect(() => {
    try {
      const savedCart = localStorage.getItem('boutique_cart');
      if (savedCart) {
        setCart(JSON.parse(savedCart));
      }
    } catch (e) {
      console.error('Errore recupero carrello:', e);
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem('boutique_cart', JSON.stringify(cart));
    } catch (e) {
      console.error('Errore salvataggio carrello:', e);
    }
  }, [cart]);

  const refreshCatalog = async (customKey?: string, customFolderId?: string) => {
    setIsLoading(true);
    setCatalogError(null);

    try {
      let url = '/api/drive/catalog';
      const params = new URLSearchParams();

      const keyToUse = customKey || localStorage.getItem('drive_api_key');
      const folderToUse = customFolderId || localStorage.getItem('drive_root_folder_id');

      if (keyToUse) params.append('apiKey', keyToUse);
      if (folderToUse) params.append('rootFolderId', folderToUse);

      const qs = params.toString();
      if (qs) {
        url += '?' + qs;
      }

      const res = await fetch(url);
      const data: CatalogResponse = await res.json();

      setIsDemo(Boolean(data.isDemo));
      setDriveFolderName(data.folderName || 'Google Drive');
      setIsEmptyDrive(Boolean(data.isEmptyDrive));

      if (data.products && data.products.length > 0) {
        setFolders(data.folders);
        setProducts(data.products);
      } else if (data.isEmptyDrive) {
        setFolders(data.folders || []);
        setProducts(data.products || []);
      } else {
        // Fallback demo
        setFolders(DEMO_FOLDERS);
        setProducts(DEMO_PRODUCTS);
        setIsDemo(true);
      }

      if (data.error) {
        setCatalogError(data.error);
      }
    } catch (err: any) {
      console.error('Errore fetch catalog:', err);
      setCatalogError(err.message || 'Errore di connessione');
      setFolders(DEMO_FOLDERS);
      setProducts(DEMO_PRODUCTS);
      setIsDemo(true);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    refreshCatalog();
  }, []);

  const addToCart = (product: Product, size: string, quantity = 1) => {
    setCart((prev) => {
      const itemId = `${product.id}-${size}`;
      const existing = prev.find((item) => item.id === itemId);
      if (existing) {
        return prev.map((item) =>
          item.id === itemId ? { ...item, quantity: item.quantity + quantity } : item
        );
      }
      return [...prev, { id: itemId, product, size, quantity }];
    });
    setIsCartOpen(true);
  };

  const removeFromCart = (itemId: string) => {
    setCart((prev) => prev.filter((item) => item.id !== itemId));
  };

  const updateQuantity = (itemId: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((item) => {
          if (item.id === itemId) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);
  const cartTotal = cart.reduce((acc, item) => acc + (item.product.price || 0) * item.quantity, 0);

  // Se l'utente attiva il fallback dimostrativo quando il drive è ancora vuoto
  const displayedFolders = isEmptyDrive && showDemoFallback ? DEMO_FOLDERS : folders;
  const displayedProducts = isEmptyDrive && showDemoFallback ? DEMO_PRODUCTS : products;

  return (
    <ShopContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        cartCount,
        cartTotal,
        isCartOpen,
        setIsCartOpen,
        folders: displayedFolders,
        products: displayedProducts,
        selectedFolderId,
        setSelectedFolderId,
        searchQuery,
        setSearchQuery,
        isDemo,
        isEmptyDrive,
        driveFolderName,
        showDemoFallback,
        setShowDemoFallback,
        isLoading,
        catalogError,
        refreshCatalog,
        quickViewProduct,
        setQuickViewProduct,
        isConfigOpen,
        setIsConfigOpen,
        isWhatsAppAvailable,
        whatsAppNumber,
      }}
    >
      {children}
    </ShopContext.Provider>
  );
}

export function useShop() {
  const context = useContext(ShopContext);
  if (!context) {
    throw new Error('useShop must be used within a ShopProvider');
  }
  return context;
}
