import { NextRequest, NextResponse } from 'next/server';
import { extractSteamId, resolveVanityUrl } from '@/lib/steam';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const input = searchParams.get('input');

  if (!input) {
    return NextResponse.json(
      { error: 'Steam ID is required' },
      { status: 400 }
    );
  }

  const extracted = extractSteamId(input);
  if (!extracted) {
    return NextResponse.json(
      { error: 'Invalid Steam ID format' },
      { status: 400 }
    );
  }

  // SteamID64ならそのまま返す
  if (extracted.format === 'steamid64') {
    return NextResponse.json({
      steamid64: extracted.id,
      format: extracted.format,
    });
  }

  // カスタムURLの場合はSteamID64に解決
  try {
    const steamId64 = await resolveVanityUrl(extracted.id);

    if (!steamId64) {
      return NextResponse.json(
        { error: 'Could not resolve Steam ID. Check if the profile exists and is public.' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      steamid64: steamId64,
      format: extracted.format,
    });
  } catch (error) {
    console.error('Error resolving Steam ID:', error);
    return NextResponse.json(
      { error: 'Failed to resolve Steam ID' },
      { status: 500 }
    );
  }
}
