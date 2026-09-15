import { NextRequest, NextResponse } from 'next/server';
import { fetchGoogleDriveCatalog } from '@/lib/drive';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const apiKey = searchParams.get('apiKey') || undefined;
  const rootFolderId = searchParams.get('rootFolderId') || undefined;

  const catalog = await fetchGoogleDriveCatalog(apiKey, rootFolderId);
  return NextResponse.json(catalog);
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
