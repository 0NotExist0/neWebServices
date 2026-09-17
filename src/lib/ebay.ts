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

/**
 * Funzione per estrarre in tempo reale gli articoli da eBay se il fetch ha successo,
 * con fallback immediato ai dati verificati per garantire affidabilità 100%.
 */
export async function getEbayCatalogItems(): Promise<{
  folders: DriveFolder[];
  products: Product[];
}> {
  try {
    const res = await fetch(EBAY_PROFILE_URL, {
      headers: {
        'User-Agent':
          'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36',
        Accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
        'Accept-Language': 'it-IT,it;q=0.9,en-US;q=0.8,en;q=0.7',
      },
      cache: 'no-store',
    });

    if (!res.ok) {
      return {
        folders: EBAY_FOLDERS,
        products: INITIAL_EBAY_PRODUCTS,
      };
    }

    const html = await res.text();
    const rawCards = html.split('<li class="s-card ');
    if (rawCards.length <= 1) {
      return {
        folders: EBAY_FOLDERS,
        products: INITIAL_EBAY_PRODUCTS,
      };
    }

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
      const titleMatch = card.match(/class=s-card__title>[\s\S]*?<span class="su-styled-text primary default">([\s\S]*?)<\/span>/);
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

      const dynamicFolders: DriveFolder[] = [
        {
          id: 'ebay-capi',
          name: 'Abbigliamento eBay',
          slug: 'abbigliamento-ebay',
          count: clothingCount,
        },
        {
          id: 'ebay-servizi',
          name: 'Servizi Web & App',
          slug: 'servizi-web-app',
          count: servicesCount,
        },
      ];

      return {
        folders: dynamicFolders,
        products: scrapedProducts,
      };
    }

    return {
      folders: EBAY_FOLDERS,
      products: INITIAL_EBAY_PRODUCTS,
    };
  } catch (err) {
    console.error('eBay fetch error, using verified cache:', err);
    return {
      folders: EBAY_FOLDERS,
      products: INITIAL_EBAY_PRODUCTS,
    };
  }
}
