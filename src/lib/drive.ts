import { DriveFolder, Product, CatalogResponse } from '@/types/store';
import { DEMO_FOLDERS, DEMO_PRODUCTS } from './demo-data';
import { getEbayCatalogItems, EBAY_FOLDERS, INITIAL_EBAY_PRODUCTS } from './ebay';

export function slugify(text: string): string {
  return text
    .toString()
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)+/g, '');
}

/**
 * Estrae nome pulito e prezzo dal nome del file su Google Drive
 * Esempi:
 * - "Abito Floreale Seta - 79.90.jpg" -> "Abito Floreale Seta", 79.90
 * - "Giacca Lana 120€.png" -> "Giacca Lana", 120.00
 * - "Camicia Lino Bianco.webp" -> "Camicia Lino Bianco", 49.00
 */
export function parseProductFileName(
  fileName: string,
  fallbackFolder: string
): {
  name: string;
  baseName: string;
  price?: number;
  originalPrice?: number;
  isEbay: boolean;
  ebayListingUrl?: string;
  ebayItemId?: string;
  photoIndex: number;
} {
  const withoutExt = fileName.replace(/\.[a-zA-Z0-9]+$/, '').replace(/[.\s]+$/, '').trim();

  let price: number | undefined = undefined;
  let originalPrice: number | undefined = undefined;
  let cleanName = withoutExt;
  let ebayItemId: string | undefined = undefined;

  // Cerca un ID oggetto eBay numerico esplicito (11-14 cifre, es. #287591702835 o ebay_287591702835 o 287591702835)
  const explicitIdMatch = withoutExt.match(/(?:ebay|item|id|#)[-_#\s]*(\d{11,14})/i);
  const standaloneIdMatch = withoutExt.match(/\b(\d{11,14})\b/);
  if (explicitIdMatch) {
    ebayItemId = explicitIdMatch[1];
    cleanName = cleanName.replace(explicitIdMatch[0], '').trim();
  } else if (standaloneIdMatch) {
    ebayItemId = standaloneIdMatch[1];
    cleanName = cleanName.replace(standaloneIdMatch[0], '').trim();
  }

  // Prezzo: identificato specificamente vicino al simbolo $ (es. 21.90$, 21$, $21.90) o €
  const dollarRegex = /(?:[-_–—\s]*)\$?\s*(\d+(?:[.,]\d{1,2})?)\s*\$(?:[.\s]*)/i;
  const dollarPrefixRegex = /(?:[-_–—\s]*)\$\s*(\d+(?:[.,]\d{1,2})?)(?:[.\s]*)/i;
  const euroRegex = /(?:[-_–—\s]*)(\d+(?:[.,]\d{1,2})?)\s*(?:€|eur|euro)(?:[.\s]*)/i;

  const m1 = cleanName.match(dollarRegex);
  const m2 = cleanName.match(dollarPrefixRegex);
  const m3 = cleanName.match(euroRegex);

  if (m1) {
    const parsed = parseFloat(m1[1].replace(',', '.'));
    if (!isNaN(parsed) && parsed > 0) {
      price = parsed;
      cleanName = cleanName.replace(m1[0], ' ').trim();
    }
  } else if (m2) {
    const parsed = parseFloat(m2[1].replace(',', '.'));
    if (!isNaN(parsed) && parsed > 0) {
      price = parsed;
      cleanName = cleanName.replace(m2[0], ' ').trim();
    }
  } else if (m3) {
    const parsed = parseFloat(m3[1].replace(',', '.'));
    if (!isNaN(parsed) && parsed > 0) {
      price = parsed;
      cleanName = cleanName.replace(m3[0], ' ').trim();
    }
  }

  cleanName = cleanName
    .replace(/^[\s_-]+|[\s_-]+$/g, '')
    .replace(/[_-]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();

  if (!cleanName || cleanName.length < 2) {
    cleanName = `${fallbackFolder} Exclusive`;
  }

  cleanName = cleanName.charAt(0).toUpperCase() + cleanName.slice(1);

  // Riconoscimento numero foto / angolazione per raggruppamento (es. AdventurerCargo1 -> base AdventurerCargo, index 1)
  const baseRegex = /^(.*?)(?:[_\s-]*\(?([0-9]+)\)?)?$/;
  const baseMatch = cleanName.match(baseRegex);
  const baseName = baseMatch && baseMatch[2] ? baseMatch[1].trim() : cleanName;
  const photoIndex = baseMatch && baseMatch[2] ? parseInt(baseMatch[2], 10) : 0;

  // Calcolo prezzo barrato (price anchoring manipolatorio) su qualsiasi articolo con prezzo
  if (price !== undefined) {
    originalPrice = Math.round(price * 1.25 * 100) / 100;
  }

  const isEbay =
    fallbackFolder.toLowerCase().includes('ebay') ||
    fileName.toLowerCase().includes('ebay') ||
    Boolean(ebayItemId);

  const ebayUsername = process.env.NEXT_PUBLIC_EBAY_USERNAME || 'newebservices';
  let ebayListingUrl: string | undefined = undefined;

  if (isEbay) {
    if (ebayItemId) {
      ebayListingUrl = `https://www.ebay.it/itm/${ebayItemId}`;
    } else {
      ebayListingUrl = `https://www.ebay.it/sch/i.html?_ssn=${ebayUsername}&_nkw=${encodeURIComponent(baseName)}`;
    }
  }

  return { name: cleanName, baseName, price, originalPrice, isEbay, ebayListingUrl, ebayItemId, photoIndex };
}

export function getDriveImageUrls(fileId: string) {
  return {
    full: `https://lh3.googleusercontent.com/d/${fileId}=w1200`,
    thumbnail: `https://lh3.googleusercontent.com/d/${fileId}=w600`,
    direct: `https://drive.google.com/thumbnail?id=${fileId}&sz=w1000`,
  };
}

/**
 * Raggruppa le foto di Drive e abbina automaticamente gli articoli eBay corrispondenti
 */
export function groupFilesIntoProducts(
  files: Array<{ id: string; name: string; createdTime?: string }>,
  folderId: string,
  folderName: string,
  ebayProducts?: Product[],
  matchedEbayIds?: Set<string>
): Product[] {
  const productMap = new Map<
    string,
    {
      product: Product;
      imagesWithOrder: Array<{ index: number; url: string; thumb: string }>;
    }
  >();

  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    const { baseName, price, originalPrice, isEbay, ebayListingUrl, ebayItemId, photoIndex } =
      parseProductFileName(file.name, folderName);
    const urls = getDriveImageUrls(file.id);

    const groupKey = `${folderId}___${baseName.toLowerCase()}`;

    if (!productMap.has(groupKey)) {
      let finalId = file.id;
      let finalEbayUrl = ebayListingUrl;
      let finalPrice = price;
      let finalOrigPrice = originalPrice;

      // Matching intelligente con gli articoli eBay scaricati in tempo reale
      if (isEbay && ebayProducts && ebayProducts.length > 0) {
        let matchedEbayItem: Product | undefined;

        if (ebayItemId) {
          matchedEbayItem = ebayProducts.find((p) => p.id === `ebay-${ebayItemId}` || p.id === ebayItemId);
        }

        if (!matchedEbayItem) {
          // Tokenizza il nome in parole chiave significative (es. AdventurerCargo -> ["adventurer", "cargo"])
          const keywords = baseName
            .replace(/([a-z])([A-Z])/g, '$1 $2')
            .toLowerCase()
            .split(/[^a-z0-9]+/)
            .filter((w) => w.length >= 4);

          let bestScore = 0;
          for (const ep of ebayProducts) {
            const epLower = ep.name.toLowerCase();
            let score = 0;
            for (const kw of keywords) {
              if (epLower.includes(kw)) score++;
            }
            if (score > bestScore) {
              bestScore = score;
              matchedEbayItem = ep;
            }
          }
        }

        if (matchedEbayItem) {
          finalId = matchedEbayItem.id;
          finalEbayUrl = matchedEbayItem.ebayListingUrl;
          if (finalPrice === undefined && matchedEbayItem.price) {
            finalPrice = matchedEbayItem.price;
            finalOrigPrice = matchedEbayItem.originalPrice;
          }
          if (matchedEbayIds) {
            matchedEbayIds.add(matchedEbayItem.id);
          }
        }
      }

      const product: Product = {
        id: finalId,
        name: baseName,
        price: finalPrice,
        originalPrice: finalOrigPrice,
        folderId,
        folderName,
        imageUrl: urls.full,
        thumbnailUrl: urls.thumbnail,
        images: [urls.full],
        secondaryImageUrl: undefined,
        driveFileId: file.id,
        sizes: ['XS', 'S', 'M', 'L', 'XL'],
        inStock: true,
        isNew: i === 0,
        isSale: Boolean(finalOrigPrice),
        isEbayItem: isEbay,
        ebayListingUrl: finalEbayUrl,
        description: isEbay
          ? `Capo originale ${baseName} in vendita ufficiale su eBay (venditore newebservices). Pezzo autentico con Garanzia Cliente eBay e spedizione espressa.`
          : `Capo della categoria ${folderName}. Tessuto selezionato e rifiniture artigianali.`,
        createdAt: file.createdTime,
      };

      productMap.set(groupKey, {
        product,
        imagesWithOrder: [{ index: photoIndex, url: urls.full, thumb: urls.thumbnail }],
      });
    } else {
      const entry = productMap.get(groupKey)!;
      // Se il prodotto base non aveva prezzo e un altro scatto ce l'ha, assegnalo
      if (entry.product.price === undefined && price !== undefined) {
        entry.product.price = price;
        entry.product.originalPrice = originalPrice;
      }
      if (!entry.product.ebayListingUrl && ebayListingUrl) {
        entry.product.ebayListingUrl = ebayListingUrl;
      }
    }
  }

  const result: Product[] = [];
  for (const [, entry] of productMap) {
    entry.imagesWithOrder.sort((a, b) => a.index - b.index);
    const allUrls = entry.imagesWithOrder.map((img) => img.url);
    entry.product.images = allUrls;
    entry.product.imageUrl = allUrls[0];
    if (allUrls.length > 1) {
      entry.product.secondaryImageUrl = allUrls[1];
    }
    result.push(entry.product);
  }

  return result;
}

export async function fetchGoogleDriveCatalog(
  apiKey?: string,
  rootFolderId?: string
): Promise<CatalogResponse> {
  const key = apiKey || process.env.GOOGLE_DRIVE_API_KEY || process.env.NEXT_PUBLIC_GOOGLE_DRIVE_API_KEY;
  const folderId = rootFolderId || process.env.NEXT_PUBLIC_GOOGLE_DRIVE_ROOT_FOLDER_ID;

  if (!key || !folderId || key.trim() === '' || folderId.trim() === '') {
    const ebayData = await getEbayCatalogItems();
    return {
      success: true,
      isDemo: false,
      folders: ebayData.folders,
      products: ebayData.products,
      totalProducts: ebayData.products.length,
      rootFolderId: folderId || '',
    };
  }

  try {
    // 0. Recupera nome della cartella principale per verificare i permessi
    let rootFolderName = 'Cartella Drive';
    try {
      const metaRes = await fetch(
        `https://www.googleapis.com/drive/v3/files/${folderId}?key=${key}&fields=id,name`,
        { cache: 'no-store' }
      );
      if (metaRes.ok) {
        const metaData = await metaRes.json();
        if (metaData.name) rootFolderName = metaData.name;
      }
    } catch {
      // continua con fallback
    }

    // 1. Scarica in parallelo sia le sottocartelle di Google Drive che gli articoli attivi da eBay
    const ebayDataPromise = getEbayCatalogItems();

    // Cerca le sottocartelle della cartella Root (queste comporranno il Menu)
    const folderQuery = encodeURIComponent(
      `'${folderId}' in parents and mimeType = 'application/vnd.google-apps.folder' and trashed = false`
    );
    const folderUrl = `https://www.googleapis.com/drive/v3/files?q=${folderQuery}&key=${key}&fields=files(id,name,description)&pageSize=50&orderBy=name`;

    const [folderRes, ebayData] = await Promise.all([
      fetch(folderUrl, { cache: 'no-store' }),
      ebayDataPromise,
    ]);

    if (!folderRes.ok) {
      const errJson = await folderRes.json().catch(() => ({}));
      const errMsg =
        errJson?.error?.message ||
        `Errore HTTP ${folderRes.status}: Verificare chiave API e condivisione della cartella.`;
      console.warn('Google Drive API Folder Fetch Error:', errMsg);
      return {
        success: false,
        isDemo: false,
        folders: ebayData.folders,
        products: ebayData.products,
        totalProducts: ebayData.products.length,
        error: errMsg,
        rootFolderId: folderId,
      };
    }

    const folderData = await folderRes.json();
    const driveSubFolders: Array<{ id: string; name: string }> = folderData.files || [];
    const matchedEbayIds = new Set<string>();

    // Se non ci sono sottocartelle, cerchiamo se ci sono immagini direttamente nella cartella root
    if (driveSubFolders.length === 0) {
      const rootImagesQuery = encodeURIComponent(
        `'${folderId}' in parents and mimeType contains 'image/' and trashed = false`
      );
      const rootImgUrl = `https://www.googleapis.com/drive/v3/files?q=${rootImagesQuery}&key=${key}&fields=files(id,name,mimeType,thumbnailLink,createdTime)&pageSize=100&orderBy=createdTime desc`;
      const rootImgRes = await fetch(rootImgUrl, { cache: 'no-store' });

      if (rootImgRes.ok) {
        const rootImgData = await rootImgRes.json();
        const rootFiles: Array<{ id: string; name: string; createdTime?: string }> = rootImgData.files || [];

        if (rootFiles.length > 0) {
          const driveProducts: Product[] = groupFilesIntoProducts(
            rootFiles,
            folderId,
            rootFolderName || 'Collezione Principale',
            ebayData.products,
            matchedEbayIds
          );
          const defaultFolder: DriveFolder = {
            id: folderId,
            name: rootFolderName || 'Collezione Principale',
            slug: slugify(rootFolderName || 'collezione-principale'),
            count: driveProducts.length,
          };

          const remainingEbayProducts = ebayData.products.filter((p) => !matchedEbayIds.has(p.id));
          const mergedFolders = [defaultFolder, ...ebayData.folders];
          const mergedProducts = [...driveProducts, ...remainingEbayProducts];

          return {
            success: true,
            isDemo: false,
            isEmptyDrive: false,
            folderName: rootFolderName,
            folders: mergedFolders,
            products: mergedProducts,
            totalProducts: mergedProducts.length,
            rootFolderId: folderId,
          };
        }
      }

      // La cartella Google Drive è collegata ma non ha immagini dirette: mostra gli articoli e categorie eBay
      return {
        success: true,
        isDemo: false,
        isEmptyDrive: true,
        folderName: rootFolderName,
        folders: ebayData.folders,
        products: ebayData.products,
        totalProducts: ebayData.products.length,
        rootFolderId: folderId,
      };
    }

    // Abbiamo trovato le sottocartelle di Drive: recupera immagini
    const folderPromises = driveSubFolders.map(async (folder) => {
      const imgQuery = encodeURIComponent(
        `'${folder.id}' in parents and mimeType contains 'image/' and trashed = false`
      );
      const imgUrl = `https://www.googleapis.com/drive/v3/files?q=${imgQuery}&key=${key}&fields=files(id,name,mimeType,thumbnailLink,createdTime)&pageSize=100&orderBy=createdTime desc`;

      try {
        const imgRes = await fetch(imgUrl, { cache: 'no-store' });
        if (!imgRes.ok) return { folder, files: [] };
        const imgData = await imgRes.json();
        return { folder, files: (imgData.files as Array<{ id: string; name: string; createdTime?: string }>) || [] };
      } catch (err) {
        console.error(`Errore caricamento immagini per cartella ${folder.name}:`, err);
        return { folder, files: [] };
      }
    });

    const results = await Promise.all(folderPromises);
    const categories: DriveFolder[] = [];
    const allProducts: Product[] = [];

    for (const res of results) {
      const folderSlug = slugify(res.folder.name);
      const folderProducts = groupFilesIntoProducts(
        res.files,
        res.folder.id,
        res.folder.name,
        ebayData.products,
        matchedEbayIds
      );

      // Includi nel menu la sottocartella se ha capi o se è rilevante
      categories.push({
        id: res.folder.id,
        name: res.folder.name,
        slug: folderSlug,
        count: folderProducts.length,
      });

      allProducts.push(...folderProducts);
    }

    // Aggiungi solo i prodotti eBay che non sono già stati abbinati a uno scatto Drive ad alta risoluzione
    const remainingEbayProducts = ebayData.products.filter((p) => !matchedEbayIds.has(p.id));
    const finalProducts = [...allProducts, ...remainingEbayProducts];

    // Combina le categorie evitando duplicazioni di id
    const finalFolders: DriveFolder[] = [...categories];
    for (const ef of ebayData.folders) {
      if (!finalFolders.some((f) => f.id === ef.id)) {
        finalFolders.push(ef);
      }
    }

    return {
      success: true,
      isDemo: false,
      isEmptyDrive: allProducts.length === 0,
      folderName: rootFolderName,
      folders: finalFolders,
      products: finalProducts,
      totalProducts: finalProducts.length,
      rootFolderId: folderId,
    };
  } catch (err: any) {
    console.error('Fetch Drive Catalog Exception:', err);
    const ebayData = await getEbayCatalogItems().catch(() => ({
      folders: EBAY_FOLDERS,
      products: INITIAL_EBAY_PRODUCTS,
    }));
    return {
      success: false,
      isDemo: false,
      folders: ebayData.folders,
      products: ebayData.products,
      totalProducts: ebayData.products.length,
      error: err.message || 'Errore di connessione a Google Drive',
      rootFolderId: folderId,
    };
  }
}
