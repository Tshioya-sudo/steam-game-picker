import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function GET(request: NextRequest) {
  // Supabaseが設定されていない場合は空のデータを返す
  if (!supabase) {
    return NextResponse.json({
      rankings: [],
      stats: {
        totalUsers: 0,
        totalGames: 0,
      },
      message: 'Statistics disabled (Supabase not configured)',
    });
  }

  const searchParams = request.nextUrl.searchParams;
  const limit = parseInt(searchParams.get('limit') || '50', 10);
  const offset = parseInt(searchParams.get('offset') || '0', 10);

  try {
    // 積みゲー率ランキングを取得
    const { data: rankings, error: rankingError } = await supabase
      .from('game_backlog_ranking')
      .select('*')
      .range(offset, offset + limit - 1);

    if (rankingError) {
      throw rankingError;
    }

    // 総統計を取得
    const { data: totalStats, error: statsError } = await supabase
      .from('stat_sessions')
      .select('id', { count: 'exact' });

    if (statsError) {
      throw statsError;
    }

    // ゲーム総数を取得
    const { data: gameStats, error: gameError } = await supabase
      .from('game_statistics')
      .select('appid', { count: 'exact' });

    if (gameError) {
      throw gameError;
    }

    return NextResponse.json({
      rankings: rankings || [],
      stats: {
        totalUsers: totalStats?.length || 0,
        totalGames: gameStats?.length || 0,
      },
    });
  } catch (error) {
    console.error('Error fetching stats:', error);
    return NextResponse.json(
      { error: 'Failed to fetch statistics' },
      { status: 500 }
    );
  }
}
