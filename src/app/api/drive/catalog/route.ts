import { NextRequest, NextResponse } from 'next/server';
import { fetchGoogleDriveCatalog } from '@/lib/drive';

// Configurazione per Vercel Serverless Function
export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';
export const maxDuration = 30; // 30 secondi max per chiamate Google Drive / eBay su Vercel

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const apiKey = searchParams.get('apiKey') || undefined;
  const rootFolderId = searchParams.get('rootFolderId') || undefined;

  const catalog = await fetchGoogleDriveCatalog(apiKey, rootFolderId);

  return NextResponse.json(catalog, {
    headers: {
      'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0',
      'CDN-Cache-Control': 'no-store',
      'Vercel-CDN-Cache-Control': 'no-store',
      'Pragma': 'no-cache',
      'Expires': '0',
    },
  });
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { apiKey, rootFolderId } = body;

    const catalog = await fetchGoogleDriveCatalog(apiKey, rootFolderId);
    return NextResponse.json(catalog);
  } catch (err: any) {
    return NextResponse.json(
      {
        success: false,
        isDemo: true,
        error: err.message || 'Richiesta non valida',
      },
      { status: 400 }
    );
  }
}
