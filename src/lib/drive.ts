import { DriveFolder, Product, CatalogResponse } from '@/types/store';
import { DEMO_FOLDERS, DEMO_PRODUCTS } from './demo-data';

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
  price: number;
  originalPrice?: number;
  isEbay: boolean;
  ebayListingUrl?: string;
  photoIndex: number;
} {
  const withoutExt = fileName.replace(/\.[a-zA-Z0-9]+$/, '').replace(/[.\s]+$/, '').trim();

  let price = 49.0;
  let originalPrice: number | undefined = undefined;
  let cleanName = withoutExt;
  let ebayItemId: string | undefined = undefined;

  // Cerca un eventuale ID oggetto eBay (es. #287591702835 o ebay_287591702835 o - 287591702835)
  const ebayIdRegex = /(?:ebay|item|id|#)[-_#\s]*(\d{11,14})/i;
  const idMatch = withoutExt.match(ebayIdRegex);
  if (idMatch) {
    ebayItemId = idMatch[1];
    cleanName = cleanName.replace(idMatch[0], '').trim();
  }

  const priceRegex = /[-_–—\s]+(\d+(?:[.,]\d{1,2})?)\s*(?:€|eur|euro|\$|usd)?[.\s]*$/i;
  const match = cleanName.match(priceRegex);

  if (match) {
    const rawPrice = match[1].replace(',', '.');
    const parsed = parseFloat(rawPrice);
    if (!isNaN(parsed) && parsed > 0) {
      price = parsed;
      cleanName = cleanName.replace(match[0], '').trim();
    }
  } else {
    const euroRegex = /(\d+(?:[.,]\d{1,2})?)\s*(?:€|eur|\$|usd)/i;
    const euroMatch = cleanName.match(euroRegex);
    if (euroMatch) {
      const parsed = parseFloat(euroMatch[1].replace(',', '.'));
      if (!isNaN(parsed) && parsed > 0) {
        price = parsed;
        cleanName = cleanName.replace(euroMatch[0], '').trim();
      }
    }
  }

  cleanName = cleanName
    .replace(/^[\s_-]+|[\s_-]+$/g, '')
    .replace(/[_-]+/g, ' ')
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

  if (price >= 60) {
    originalPrice = Math.round(price * 1.25);
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

  return { name: cleanName, baseName, price, originalPrice, isEbay, ebayListingUrl, photoIndex };
}

export function getDriveImageUrls(fileId: string) {
  return {
    full: `https://lh3.googleusercontent.com/d/${fileId}=w1200`,
    thumbnail: `https://lh3.googleusercontent.com/d/${fileId}=w600`,
    direct: `https://drive.google.com/thumbnail?id=${fileId}&sz=w1000`,
  };
}

export function groupFilesIntoProducts(
  files: Array<{ id: string; name: string; createdTime?: string }>,
  folderId: string,
  folderName: string
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
    const { baseName, price, originalPrice, isEbay, ebayListingUrl, photoIndex } =
      parseProductFileName(file.name, folderName);
    const urls = getDriveImageUrls(file.id);

    const groupKey = `${folderId}___${baseName.toLowerCase()}`;

    if (!productMap.has(groupKey)) {
      const product: Product = {
        id: file.id,
        name: baseName,
        price,
        originalPrice,
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
        isSale: Boolean(originalPrice),
        isEbayItem: isEbay,
        ebayListingUrl,
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
      entry.imagesWithOrder.push({ index: photoIndex, url: urls.full, thumb: urls.thumbnail });
      // Se il file iniziale aveva prezzo di default e questo ne ha uno specifico, aggiorna
      if (entry.product.price === 49 && price !== 49) {
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
    return {
      success: true,
      isDemo: true,
      folders: DEMO_FOLDERS,
      products: DEMO_PRODUCTS,
      totalProducts: DEMO_PRODUCTS.length,
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

    // 1. Cerca le sottocartelle della cartella Root (queste comporranno il Menu)
    const folderQuery = encodeURIComponent(
      `'${folderId}' in parents and mimeType = 'application/vnd.google-apps.folder' and trashed = false`
    );
    const folderUrl = `https://www.googleapis.com/drive/v3/files?q=${folderQuery}&key=${key}&fields=files(id,name,description)&pageSize=50&orderBy=name`;

    const folderRes = await fetch(folderUrl, { cache: 'no-store' });

    if (!folderRes.ok) {
      const errJson = await folderRes.json().catch(() => ({}));
      const errMsg =
        errJson?.error?.message ||
        `Errore HTTP ${folderRes.status}: Verificare chiave API e condivisione della cartella.`;
      console.warn('Google Drive API Folder Fetch Error:', errMsg);
      return {
        success: false,
        isDemo: true,
        folders: DEMO_FOLDERS,
        products: DEMO_PRODUCTS,
        totalProducts: DEMO_PRODUCTS.length,
        error: errMsg,
        rootFolderId: folderId,
      };
    }

    const folderData = await folderRes.json();
    const driveSubFolders: Array<{ id: string; name: string }> = folderData.files || [];

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
          const products: Product[] = groupFilesIntoProducts(rootFiles, folderId, rootFolderName || 'Collezione Principale');
          const defaultFolder: DriveFolder = {
            id: folderId,
            name: rootFolderName || 'Collezione Principale',
            slug: slugify(rootFolderName || 'collezione-principale'),
            count: products.length,
          };

          return {
            success: true,
            isDemo: false,
            folderName: rootFolderName,
            folders: [defaultFolder],
            products,
            totalProducts: products.length,
            rootFolderId: folderId,
          };
        }
      }

      // La cartella Google Drive è valida e connessa, ma è attualmente vuota (0 sottocartelle, 0 immagini)
      return {
        success: true,
        isDemo: false,
        isEmptyDrive: true,
        folderName: rootFolderName,
        folders: [],
        products: [],
        totalProducts: 0,
        rootFolderId: folderId,
      };
    }

    // Abbiamo trovato le sottocartelle: ognuna diventa una voce di menu!
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
      const folderProducts = groupFilesIntoProducts(res.files, res.folder.id, res.folder.name);

      categories.push({
        id: res.folder.id,
        name: res.folder.name,
        slug: folderSlug,
        count: folderProducts.length,
      });

      allProducts.push(...folderProducts);
    }

    return {
      success: true,
      isDemo: false,
      isEmptyDrive: allProducts.length === 0,
      folderName: rootFolderName,
      folders: categories,
      products: allProducts,
      totalProducts: allProducts.length,
      rootFolderId: folderId,
    };
  } catch (err: any) {
    console.error('Fetch Drive Catalog Exception:', err);
    return {
      success: false,
      isDemo: true,
      folders: DEMO_FOLDERS,
      products: DEMO_PRODUCTS,
      totalProducts: DEMO_PRODUCTS.length,
      error: err.message || 'Errore di connessione a Google Drive',
      rootFolderId: folderId,
    };
  }
}
