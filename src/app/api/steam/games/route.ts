import { NextRequest, NextResponse } from 'next/server';
import { getOwnedGames } from '@/lib/steam';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const steamId = searchParams.get('steamid');

  if (!steamId) {
    return NextResponse.json(
      { error: 'Steam ID is required' },
      { status: 400 }
    );
  }

  // SteamID64形式をバリデーション
  if (!/^\d{17}$/.test(steamId)) {
    return NextResponse.json(
      { error: 'Invalid Steam ID format. Must be a 17-digit SteamID64.' },
      { status: 400 }
    );
  }

  try {
    const games = await getOwnedGames(steamId);

    if (games.length === 0) {
      return NextResponse.json(
        {
          error: 'No games found. Make sure your Steam profile and game details are set to public.',
          games: [],
          count: 0,
        },
        { status: 200 }
      );
    }

    return NextResponse.json({
      games,
      count: games.length,
    });
  } catch (error) {
    console.error('Error fetching games:', error);
    return NextResponse.json(
      { error: 'Failed to fetch games from Steam' },
      { status: 500 }
    );
  }
}
