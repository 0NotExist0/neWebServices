import { Product, DriveFolder } from '@/types/store';

export const EBAY_SELLER_USERNAME = 'newebservices';
export const EBAY_PROFILE_URL = 'https://www.ebay.it/sch/i.html?_ssn=newebservices';

export const EBAY_FOLDERS: DriveFolder[] = [
  {
    id: 'ebay-capi',
    name: 'Abbigliamento eBay',
    slug: 'abbigliamento-ebay',
    count: 9,
  },
  {
    id: 'ebay-servizi',
    name: 'Servizi Web & App',
    slug: 'servizi-web-app',
    count: 1,
  },
];

export const INITIAL_EBAY_PRODUCTS: Product[] = [
  {
    id: 'ebay-287591784369',
    name: 'Jeans-tuta Uomo Donna blu elasticizzati taglia 46 Regular in denim 5 tasche',
    price: 18.18,
    originalPrice: 24.0,
    folderId: 'ebay-capi',
    folderName: 'Abbigliamento eBay',
    imageUrl: 'https://i.ebayimg.com/images/g/MfwAAeSwsKFqq78v/s-l1600.jpg',
    thumbnailUrl: 'https://i.ebayimg.com/images/g/MfwAAeSwsKFqq78v/s-l500.jpg',
    images: ['https://i.ebayimg.com/images/g/MfwAAeSwsKFqq78v/s-l1600.jpg'],
    sizes: ['46 Regular'],
    inStock: true,
    isNew: true,
    isSale: true,
    isEbayItem: true,
    ebayListingUrl: 'https://www.ebay.it/itm/287591784369',
    description:
      'Jeans-tuta Uomo Donna blu elasticizzati taglia 46 Regular in denim 5 tasche. Capo originale in vendita ufficiale su eBay da venditore newebservices con Garanzia Cliente eBay e spedizione espressa tracciata.',
  },
  {
    id: 'ebay-287591789247',
    name: 'Jeans unisex blu denim vintage wash slim skinny taglia 44 Regular 5 tasche',
    price: 18.3,
    originalPrice: 25.0,
    folderId: 'ebay-capi',
    folderName: 'Abbigliamento eBay',
    imageUrl: 'https://i.ebayimg.com/images/g/zfcAAeSw5hJqq8Bq/s-l1600.jpg',
    thumbnailUrl: 'https://i.ebayimg.com/images/g/zfcAAeSw5hJqq8Bq/s-l500.jpg',
    images: ['https://i.ebayimg.com/images/g/zfcAAeSw5hJqq8Bq/s-l1600.jpg'],
    sizes: ['44 Regular'],
    inStock: true,
    isNew: true,
    isSale: true,
    isEbayItem: true,
    ebayListingUrl: 'https://www.ebay.it/itm/287591789247',
    description:
      'Jeans unisex blu denim vintage wash slim skinny taglia 44 Regular 5 tasche. Ottima vestibilità e comfort elasticizzato. In vendita ufficiale su eBay da newebservices.',
  },
  {
    id: 'ebay-287591763140',
    name: 'Jeans Unisex acid wash grigio antracite elasticizzati Size 48',
    price: 18.14,
    originalPrice: 24.0,
    folderId: 'ebay-capi',
    folderName: 'Abbigliamento eBay',
    imageUrl: 'https://i.ebayimg.com/images/g/ye8AAeSwf55qq7rZ/s-l1600.jpg',
    thumbnailUrl: 'https://i.ebayimg.com/images/g/ye8AAeSwf55qq7rZ/s-l500.jpg',
    images: ['https://i.ebayimg.com/images/g/ye8AAeSwf55qq7rZ/s-l1600.jpg'],
    sizes: ['48'],
    inStock: true,
    isNew: true,
    isSale: true,
    isEbayItem: true,
    ebayListingUrl: 'https://www.ebay.it/itm/287591763140',
    description:
      'Jeans Unisex acid wash grigio antracite elasticizzati taglia 48. Lavaggio speciale di tendenza streetwear con finitura resistente e comoda. Disponibile su eBay.',
  },
  {
    id: 'ebay-287591799187',
    name: 'Pantaloni cargo uomo verde utility vintage streetwear cotone twill M slim',
    price: 21.1,
    originalPrice: 28.0,
    folderId: 'ebay-capi',
    folderName: 'Abbigliamento eBay',
    imageUrl: 'https://i.ebayimg.com/images/g/U08AAeSwvd5qq8I2/s-l1600.jpg',
    thumbnailUrl: 'https://i.ebayimg.com/images/g/U08AAeSwvd5qq8I2/s-l500.jpg',
    images: ['https://i.ebayimg.com/images/g/U08AAeSwvd5qq8I2/s-l1600.jpg'],
    sizes: ['M Slim'],
    inStock: true,
    isNew: true,
    isSale: true,
    isEbayItem: true,
    ebayListingUrl: 'https://www.ebay.it/itm/287591799187',
    description:
      'Pantaloni cargo uomo verde utility vintage streetwear in cotone twill resistente. Taglio slim con ampie tasche laterali. Acquisto sicuro su eBay.',
  },
  {
    id: 'ebay-287591731669',
    name: 'Max & Liu Jeans unisex rossi taglia 52 Regular taglio dritto nuovi con etichette',
    price: 24.82,
    originalPrice: 35.0,
    folderId: 'ebay-capi',
    folderName: 'Abbigliamento eBay',
    imageUrl: 'https://i.ebayimg.com/images/g/VzgAAeSwABRqq7KJ/s-l1600.jpg',
    thumbnailUrl: 'https://i.ebayimg.com/images/g/VzgAAeSwABRqq7KJ/s-l500.jpg',
    images: ['https://i.ebayimg.com/images/g/VzgAAeSwABRqq7KJ/s-l1600.jpg'],
    sizes: ['52 Regular'],
    inStock: true,
    isNew: true,
    isSale: true,
    isEbayItem: true,
    ebayListingUrl: 'https://www.ebay.it/itm/287591731669',
    description:
      'Max & Liu Jeans unisex rossi taglia 52 Regular taglio dritto, nuovi con cartellino ed etichette originali. Colore vibrante e qualità sartoriale premium.',
  },
  {
    id: 'ebay-287591776897',
    name: 'Max & Liu Pantaloni Unisex velluto a coste grigio scuro 48 dritti tasche',
    price: 26.36,
    originalPrice: 38.0,
    folderId: 'ebay-capi',
    folderName: 'Abbigliamento eBay',
    imageUrl: 'https://i.ebayimg.com/images/g/~JYAAeSwHahqq7zO/s-l1600.jpg',
    thumbnailUrl: 'https://i.ebayimg.com/images/g/~JYAAeSwHahqq7zO/s-l500.jpg',
    images: ['https://i.ebayimg.com/images/g/~JYAAeSwHahqq7zO/s-l1600.jpg'],
    sizes: ['48'],
    inStock: true,
    isNew: true,
    isSale: true,
    isEbayItem: true,
    ebayListingUrl: 'https://www.ebay.it/itm/287591776897',
    description:
      'Max & Liu Pantaloni Unisex in velluto a coste morbido grigio scuro taglia 48. Taglio dritto classico e tasche all americane. Inserzione eBay protetta.',
  },
  {
    id: 'ebay-287591702835',
    name: 'Pantaloncino Denim Casual Sportivo Blu',
    price: 10.26,
    originalPrice: 16.0,
    folderId: 'ebay-capi',
    folderName: 'Abbigliamento eBay',
    imageUrl: 'https://i.ebayimg.com/images/g/yJ4AAeSwpalqq6l2/s-l1600.jpg',
    thumbnailUrl: 'https://i.ebayimg.com/images/g/yJ4AAeSwpalqq6l2/s-l500.jpg',
    images: ['https://i.ebayimg.com/images/g/yJ4AAeSwpalqq6l2/s-l1600.jpg'],
    sizes: ['M', 'L'],
    inStock: true,
    isNew: true,
    isSale: true,
    isEbayItem: true,
    ebayListingUrl: 'https://www.ebay.it/itm/287591702835',
    description:
      'Pantaloncino bermuda in denim estivo, confortevole e traspirante. Perfetto per le giornate calde o look casual.',
  },
  {
    id: 'ebay-287591745299',
    name: 'Denim Pantaloni cargo uomo tinta unita con tasche, taglia 54 beige/verde/blu',
    price: 29.31,
    originalPrice: 39.0,
    folderId: 'ebay-capi',
    folderName: 'Abbigliamento eBay',
    imageUrl: 'https://i.ebayimg.com/images/g/10QAAeSwx6lqq7et/s-l1600.jpg',
    thumbnailUrl: 'https://i.ebayimg.com/images/g/10QAAeSwx6lqq7et/s-l500.jpg',
    images: ['https://i.ebayimg.com/images/g/10QAAeSwx6lqq7et/s-l1600.jpg'],
    sizes: ['54'],
    inStock: true,
    isNew: true,
    isSale: true,
    isEbayItem: true,
    ebayListingUrl: 'https://www.ebay.it/itm/287591745299',
    description:
      'Pantaloni cargo uomo Denim tinta unita con tasche multiple, taglia 54. Ottima capienza e tessuto resistente con cuciture rinforzate.',
  },
  {
    id: 'ebay-287591741410',
    name: 'Denim T-shirt uomo nero streetwear girocollo stampa Swag fronte/retro M',
    price: 8.45,
    originalPrice: 15.0,
    folderId: 'ebay-capi',
    folderName: 'Abbigliamento eBay',
    imageUrl: 'https://i.ebayimg.com/images/g/5FoAAeSwa15qq7Xr/s-l1600.jpg',
    thumbnailUrl: 'https://i.ebayimg.com/images/g/5FoAAeSwa15qq7Xr/s-l500.jpg',
    images: ['https://i.ebayimg.com/images/g/5FoAAeSwa15qq7Xr/s-l1600.jpg'],
    sizes: ['M'],
    inStock: true,
    isNew: true,
    isSale: true,
    isEbayItem: true,
    ebayListingUrl: 'https://www.ebay.it/itm/287591741410',
    description:
      'Denim T-shirt uomo nero streetwear girocollo 100% cotone con grafica Swag fronte e retro, taglia M. Stile iconico urbano.',
  },
  {
    id: 'ebay-287228536484',
    name: '🚀 IL TUO ECONOMICO SITO WEB PROFESSIONALE',
    price: 52.7,
    originalPrice: 99.0,
    folderId: 'ebay-servizi',
    folderName: 'Servizi Web & App',
    imageUrl: 'https://i.ebayimg.com/images/g/TTkAAeSwWyhpwkrQ/s-l1600.jpg',
    thumbnailUrl: 'https://i.ebayimg.com/images/g/TTkAAeSwWyhpwkrQ/s-l500.jpg',
    images: ['https://i.ebayimg.com/images/g/TTkAAeSwWyhpwkrQ/s-l1600.jpg'],
    sizes: ['Base', 'Personalizzato'],
    inStock: true,
    isNew: true,
    isSale: true,
    isEbayItem: true,
    ebayListingUrl: 'https://www.ebay.it/itm/287228536484',
    description:
      'Sito web professionale, responsive, veloce ed economico su misura per la tua attività o brand. Include setup hosting, dominio, ottimizzazione SEO e assistenza dedicata con Garanzia Cliente eBay.',
  },
];

// Cache in-memory per il token OAuth di eBay (valido 2 ore)
let cachedEbayToken: { token: string; expiresAt: number } | null = null;

/**
 * Ottiene un token di applicazione OAuth 2.0 ufficiale da eBay (Client Credentials Grant)
 */
async function getEbayOAuthToken(clientId: string, clientSecret: string): Promise<string | null> {
  const now = Date.now();
  if (cachedEbayToken && cachedEbayToken.expiresAt > now + 60000) {
    return cachedEbayToken.token;
  }

  try {
    const authHeader = Buffer.from(`${clientId.trim()}:${clientSecret.trim()}`).toString('base64');
    const res = await fetch('https://api.ebay.com/identity/v1/oauth2/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: `Basic ${authHeader}`,
      },
      body: 'grant_type=client_credentials&scope=https%3A%2F%2Fapi.ebay.com%2Foauth%2Fapi_scope',
      cache: 'no-store',
    });

    if (!res.ok) {
      console.warn('eBay OAuth Token request failed with status:', res.status);
      return null;
    }

    const data = await res.json();
    if (data.access_token) {
      cachedEbayToken = {
        token: data.access_token,
        expiresAt: now + (data.expires_in || 7200) * 1000,
      };
      return data.access_token;
    }
  } catch (err) {
    console.warn('eBay OAuth token retrieval error:', err);
  }
  return null;
}

/**
 * Scarica in tempo reale gli articoli attivi dal Browse REST API ufficiale di eBay
 */
async function fetchItemsFromBrowseApi(
  clientId: string,
  clientSecret: string,
  seller: string
): Promise<Product[] | null> {
  const token = await getEbayOAuthToken(clientId, clientSecret);
  if (!token) return null;

  try {
    const url = `https://api.ebay.com/buy/browse/v1/item_summary/search?filter=sellers:{${encodeURIComponent(
      seller
    )}}&limit=100`;

    const res = await fetch(url, {
      headers: {
        Authorization: `Bearer ${token}`,
        'X-EBAY-C-MARKETPLACE-ID': 'EBAY_IT',
        'X-EBAY-C-ENDUSERCTX': 'contextualLocation=country=IT',
      },
      cache: 'no-store',
    });

    if (!res.ok) {
      console.warn('eBay Browse API search status:', res.status);
      return null;
    }

    const data = await res.json();
    const items = data.itemSummaries || [];
    if (!Array.isArray(items) || items.length === 0) return [];

    const products: Product[] = [];
    for (const item of items) {
      const numMatch = (item.itemId || '').match(/(\d{11,14})/);
      const cleanId = numMatch ? numMatch[1] : item.itemId;
      const title = item.title || 'Articolo eBay';
      const priceVal = item.price?.value ? parseFloat(item.price.value) : undefined;
      const rawImg = item.image?.imageUrl || '';
      const highResImg = rawImg.replace(/s-l\d+\.jpg/, 's-l1600.jpg');
      const thumbImg = rawImg.replace(/s-l\d+\.jpg/, 's-l500.jpg');

      const isService =
        title.toLowerCase().includes('sito web') ||
        title.toLowerCase().includes('web') ||
        title.toLowerCase().includes('professionale');

      const folderId = isService ? 'ebay-servizi' : 'ebay-capi';
      const folderName = isService ? 'Servizi Web & App' : 'Abbigliamento eBay';

      products.push({
        id: `ebay-${cleanId}`,
        name: title,
        price: priceVal ?? 18.0,
        originalPrice: priceVal ? Math.round(priceVal * 1.25 * 100) / 100 : undefined,
        folderId,
        folderName,
        imageUrl: highResImg || 'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=800',
        thumbnailUrl: thumbImg || highResImg,
        images: highResImg ? [highResImg] : [],
        sizes: isService ? ['Base', 'Personalizzato'] : ['M', 'L', 'Taglia Unica'],
        inStock: true,
        isNew: true,
        isSale: true,
        isEbayItem: true,
        ebayListingUrl: item.itemWebUrl || `https://www.ebay.it/itm/${cleanId}`,
        description: isService
          ? `Realizzazione e fornitura professionale online: ${title}. Inserzione ufficiale eBay con Garanzia Cliente.`
          : `Capo originale ${title}. Inserzione ufficiale eBay dal venditore ${seller} con Garanzia Cliente e spedizione rapida.`,
      });
    }

    return products;
  } catch (err) {
    console.warn('eBay Browse API query exception:', err);
    return null;
  }
}

/**
 * Funzione per estrarre in tempo reale gli articoli da eBay a ogni refresh del sito:
 * 1. Tentativo prioritario tramite eBay Browse REST API (se chiavi configurate)
 * 2. Tentativo tramite scraping HTML diretto o mirror
 * 3. Fallback automatico al catalogo verificato per continuità 100% senza blocchi
 */
export async function getEbayCatalogItems(): Promise<{
  folders: DriveFolder[];
  products: Product[];
}> {
  // 1. Prova l'API ufficiale eBay Browse (se sono fornite credenziali)
  const clientId =
    process.env.EBAY_CLIENT_ID ||
    process.env.NEXT_PUBLIC_EBAY_CLIENT_ID ||
    process.env.EBAY_APP_ID;
  const clientSecret =
    process.env.EBAY_CLIENT_SECRET ||
    process.env.EBAY_CERT_ID;

  if (clientId && clientSecret) {
    const apiProducts = await fetchItemsFromBrowseApi(
      clientId,
      clientSecret,
      EBAY_SELLER_USERNAME
    );
    if (apiProducts && apiProducts.length > 0) {
      const clothingCount = apiProducts.filter((p) => p.folderId === 'ebay-capi').length;
      const servicesCount = apiProducts.filter((p) => p.folderId === 'ebay-servizi').length;
      return {
        folders: [
          { id: 'ebay-capi', name: 'Abbigliamento eBay', slug: 'abbigliamento-ebay', count: clothingCount },
          { id: 'ebay-servizi', name: 'Servizi Web & App', slug: 'servizi-web-app', count: servicesCount },
        ],
        products: apiProducts,
      };
    }
  }

  // 2. Tentativo di scraping web con rotazione header
  try {
    const res = await fetch(EBAY_PROFILE_URL, {
      headers: {
        'User-Agent':
          'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36',
        Accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
        'Accept-Language': 'it-IT,it;q=0.9,en-US;q=0.8,en;q=0.7',
      },
      cache: 'no-store',
    });

    if (res.ok) {
      const html = await res.text();
      const rawCards = html.split('<li class="s-card ');

      if (rawCards.length > 1) {
        const scrapedProducts: Product[] = [];
        const seenIds = new Set<string>();

        for (let i = 1; i < rawCards.length; i++) {
          const card = rawCards[i];
          const idMatch = card.match(/data-listingid=([0-9]+)/);
          if (!idMatch) continue;
          const itemId = idMatch[1];
          if (seenIds.has(itemId)) continue;
          seenIds.add(itemId);

          let title = '';
          const titleMatch = card.match(
            /class=s-card__title>[\s\S]*?<span class="su-styled-text primary default">([\s\S]*?)<\/span>/
          );
          if (titleMatch) {
            title = titleMatch[1].replace(/<[^>]+>/g, '').trim();
          } else {
            const altMatch = card.match(/class=s-card__image[^>]*alt="([^"]+)"/);
            if (altMatch) {
              title = altMatch[1].trim();
            }
          }

          if (!title || title.toLowerCase().includes('shop on ebay')) continue;

          let price: number | undefined = undefined;
          const priceMatch = card.match(/class="[^"]*s-card__price">([^<]+)<\/span>/);
          if (priceMatch) {
            const numMatch = priceMatch[1].match(/([0-9]+[.,][0-9]+)/);
            if (numMatch) {
              price = parseFloat(numMatch[1].replace(',', '.'));
            }
          }

          let imageUrl = '';
          const imgMatch =
            card.match(/src=(https:\/\/i\.ebayimg\.com\/images\/g\/[^/]+\/s-l\d+\.jpg)/) ||
            card.match(/data-defer-load=(https:\/\/i\.ebayimg\.com\/images\/g\/[^/]+\/s-l\d+\.jpg)/);
          if (imgMatch) {
            imageUrl = imgMatch[1].replace(/s-l\d+\.jpg/, 's-l1600.jpg');
          }

          const isService =
            title.toLowerCase().includes('sito web') ||
            title.toLowerCase().includes('web') ||
            title.toLowerCase().includes('professionale');

          const folderId = isService ? 'ebay-servizi' : 'ebay-capi';
          const folderName = isService ? 'Servizi Web & App' : 'Abbigliamento eBay';

          scrapedProducts.push({
            id: `ebay-${itemId}`,
            name: title.replace(/&amp;/g, '&'),
            price: price ?? 18.0,
            originalPrice: price ? Math.round(price * 1.25 * 100) / 100 : undefined,
            folderId,
            folderName,
            imageUrl: imageUrl || 'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=800',
            thumbnailUrl: imageUrl ? imageUrl.replace('s-l1600.jpg', 's-l500.jpg') : imageUrl,
            images: imageUrl ? [imageUrl] : [],
            sizes: isService ? ['Base', 'Personalizzato'] : ['M', 'L', 'Taglia Unica'],
            inStock: true,
            isNew: true,
            isSale: true,
            isEbayItem: true,
            ebayListingUrl: `https://www.ebay.it/itm/${itemId}`,
            description: isService
              ? `Realizzazione e fornitura professionale online: ${title}. Inserzione ufficiale eBay con Garanzia Cliente.`
              : `Capo originale ${title}. Inserzione ufficiale eBay dal venditore newebservices con Garanzia Cliente e spedizione rapida.`,
          });
        }

        if (scrapedProducts.length > 0) {
          const clothingCount = scrapedProducts.filter((p) => p.folderId === 'ebay-capi').length;
          const servicesCount = scrapedProducts.filter((p) => p.folderId === 'ebay-servizi').length;

          return {
            folders: [
              { id: 'ebay-capi', name: 'Abbigliamento eBay', slug: 'abbigliamento-ebay', count: clothingCount },
              { id: 'ebay-servizi', name: 'Servizi Web & App', slug: 'servizi-web-app', count: servicesCount },
            ],
            products: scrapedProducts,
          };
        }
      }
    }
  } catch (err) {
    console.warn('eBay direct fetch failed, falling back to verified listings:', err);
  }

  // 3. Fallback garantito al catalogo verificato
  return {
    folders: EBAY_FOLDERS,
    products: INITIAL_EBAY_PRODUCTS,
  };
}
