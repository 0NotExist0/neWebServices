import { NextRequest, NextResponse } from 'next/server';
import { getEbayCatalogItems, EBAY_SELLER_USERNAME } from '@/lib/ebay';
import { fetchGoogleDriveCatalog } from '@/lib/drive';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';
export const maxDuration = 30;

export async function GET(request: NextRequest) {
  try {
    const clientId =
      process.env.EBAY_CLIENT_ID ||
      process.env.NEXT_PUBLIC_EBAY_CLIENT_ID ||
      process.env.EBAY_APP_ID;
    const clientSecret =
      process.env.EBAY_CLIENT_SECRET ||
      process.env.EBAY_CERT_ID;

    // Esegui il download in tempo reale
    const catalog = await fetchGoogleDriveCatalog();

    return NextResponse.json(
      {
        success: true,
        seller: EBAY_SELLER_USERNAME,
        hasBrowseApiCredentials: Boolean(clientId && clientSecret),
        syncedAt: new Date().toISOString(),
        totalProducts: catalog.totalProducts,
        products: catalog.products,
        folders: catalog.folders,
      },
      {
        headers: {
          'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0',
          'CDN-Cache-Control': 'no-store',
          'Vercel-CDN-Cache-Control': 'no-store',
          'Pragma': 'no-cache',
          'Expires': '0',
        },
      }
    );
  } catch (err: any) {
    return NextResponse.json(
      {
        success: false,
        error: err.message || 'Errore durante la sincronizzazione eBay',
      },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json().catch(() => ({}));
    const catalog = await fetchGoogleDriveCatalog(body.apiKey, body.rootFolderId);

    return NextResponse.json({
      success: true,
      message: 'Sincronizzazione completata con successo',
      syncedAt: new Date().toISOString(),
      totalProducts: catalog.totalProducts,
      products: catalog.products,
    });
  } catch (err: any) {
    return NextResponse.json(
      {
        success: false,
        error: err.message || 'Errore durante il refresh del catalogo',
      },
      { status: 500 }
    );
  }
}
