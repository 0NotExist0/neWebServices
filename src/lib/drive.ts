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
): { name: string; price: number; originalPrice?: number } {
  const withoutExt = fileName.replace(/\.[a-zA-Z0-9]+$/, '').trim();

  let price = 49.0;
  let originalPrice: number | undefined = undefined;
  let cleanName = withoutExt;

  const priceRegex = /[-_–—\s]+(\d+(?:[.,]\d{1,2})?)\s*(?:€|eur|euro)?$/i;
  const match = withoutExt.match(priceRegex);

  if (match) {
    const rawPrice = match[1].replace(',', '.');
    const parsed = parseFloat(rawPrice);
    if (!isNaN(parsed) && parsed > 0) {
      price = parsed;
      cleanName = withoutExt.replace(match[0], '').trim();
    }
  } else {
    const euroRegex = /(\d+(?:[.,]\d{1,2})?)\s*(?:€|eur)/i;
    const euroMatch = withoutExt.match(euroRegex);
    if (euroMatch) {
      const parsed = parseFloat(euroMatch[1].replace(',', '.'));
      if (!isNaN(parsed) && parsed > 0) {
        price = parsed;
        cleanName = withoutExt.replace(euroMatch[0], '').trim();
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

  if (price >= 60) {
    originalPrice = Math.round(price * 1.25);
  }

  return { name: cleanName, price, originalPrice };
}

export function getDriveImageUrls(fileId: string) {
  return {
    full: `https://lh3.googleusercontent.com/d/${fileId}=w1200`,
    thumbnail: `https://lh3.googleusercontent.com/d/${fileId}=w600`,
    direct: `https://drive.google.com/thumbnail?id=${fileId}&sz=w1000`,
  };
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
    const folderQuery = encodeURIComponent(
      `'${folderId}' in parents and mimeType = 'application/vnd.google-apps.folder' and trashed = false`
    );
    const folderUrl = `https://www.googleapis.com/drive/v3/files?q=${folderQuery}&key=${key}&fields=files(id,name,description)&pageSize=50&orderBy=name`;

    const folderRes = await fetch(folderUrl, { next: { revalidate: 60 } });

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

    // Se non ci sono sottocartelle, cerchiamo le immagini direttamente nella cartella root
    if (driveSubFolders.length === 0) {
      const rootImagesQuery = encodeURIComponent(
        `'${folderId}' in parents and mimeType contains 'image/' and trashed = false`
      );
      const rootImgUrl = `https://www.googleapis.com/drive/v3/files?q=${rootImagesQuery}&key=${key}&fields=files(id,name,mimeType,thumbnailLink,createdTime)&pageSize=100&orderBy=createdTime desc`;
      const rootImgRes = await fetch(rootImgUrl, { next: { revalidate: 60 } });

      if (rootImgRes.ok) {
        const rootImgData = await rootImgRes.json();
        const rootFiles: Array<{ id: string; name: string; createdTime?: string }> = rootImgData.files || [];

        const defaultFolder: DriveFolder = {
          id: folderId,
          name: 'Collezione Principale',
          slug: 'collezione-principale',
          count: rootFiles.length,
        };

        const products: Product[] = rootFiles.map((file, idx) => {
          const { name, price, originalPrice } = parseProductFileName(file.name, 'Collezione');
          const urls = getDriveImageUrls(file.id);
          return {
            id: file.id,
            name,
            price,
            originalPrice,
            folderId: folderId,
            folderName: defaultFolder.name,
            imageUrl: urls.full,
            thumbnailUrl: urls.thumbnail,
            driveFileId: file.id,
            sizes: ['XS', 'S', 'M', 'L', 'XL'],
            inStock: true,
            isNew: idx < 3,
            isSale: Boolean(originalPrice),
            description: `Capo della collezione ${defaultFolder.name}.`,
            createdAt: file.createdTime,
          };
        });

        return {
          success: true,
          isDemo: false,
          folders: [defaultFolder],
          products,
          totalProducts: products.length,
          rootFolderId: folderId,
        };
      }
    }

    // Abbiamo trovato le sottocartelle: ognuna diventa un menu di categoria!
    const folderPromises = driveSubFolders.map(async (folder) => {
      const imgQuery = encodeURIComponent(
        `'${folder.id}' in parents and mimeType contains 'image/' and trashed = false`
      );
      const imgUrl = `https://www.googleapis.com/drive/v3/files?q=${imgQuery}&key=${key}&fields=files(id,name,mimeType,thumbnailLink,createdTime)&pageSize=100&orderBy=createdTime desc`;

      try {
        const imgRes = await fetch(imgUrl, { next: { revalidate: 60 } });
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
      categories.push({
        id: res.folder.id,
        name: res.folder.name,
        slug: folderSlug,
        count: res.files.length,
      });

      for (let i = 0; i < res.files.length; i++) {
        const file = res.files[i];
        const { name, price, originalPrice } = parseProductFileName(file.name, res.folder.name);
        const urls = getDriveImageUrls(file.id);

        allProducts.push({
          id: file.id,
          name,
          price,
          originalPrice,
          folderId: res.folder.id,
          folderName: res.folder.name,
          imageUrl: urls.full,
          thumbnailUrl: urls.thumbnail,
          driveFileId: file.id,
          sizes: ['XS', 'S', 'M', 'L', 'XL'],
          inStock: true,
          isNew: i === 0,
          isSale: Boolean(originalPrice),
          description: `Capo della categoria ${res.folder.name}. Tessuto selezionato e rifiniture artigianali.`,
          createdAt: file.createdTime,
        });
      }
    }

    return {
      success: true,
      isDemo: false,
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
