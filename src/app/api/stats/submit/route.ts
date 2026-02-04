import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';

interface GameData {
  appid: number;
  name: string;
  playtime_forever: number;
}

// ライブラリのハッシュを生成（重複チェック用）
async function generateSessionHash(games: GameData[]): Promise<string> {
  const sortedAppIds = games.map(g => g.appid).sort((a, b) => a - b);
  const data = sortedAppIds.join(',');

  // Web Crypto APIでハッシュ生成
  const encoder = new TextEncoder();
  const dataBuffer = encoder.encode(data);
  const hashBuffer = await crypto.subtle.digest('SHA-256', dataBuffer);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

export async function POST(request: NextRequest) {
  // Supabaseが設定されていない場合はスキップ
  if (!supabaseAdmin) {
    return NextResponse.json({
      success: true,
      message: 'Statistics disabled (Supabase not configured)',
      isNew: false,
    });
  }

  try {
    const body = await request.json();
    const games: GameData[] = body.games;

    if (!games || !Array.isArray(games) || games.length === 0) {
      return NextResponse.json(
        { error: 'Invalid games data' },
        { status: 400 }
      );
    }

    // セッションハッシュを生成
    const sessionHash = await generateSessionHash(games);

    // 既に同じライブラリが登録済みかチェック
    const { data: existingSession } = await supabaseAdmin
      .from('stat_sessions')
      .select('id')
      .eq('session_hash', sessionHash)
      .single();

    if (existingSession) {
      // 既存のセッションがある場合はスキップ
      return NextResponse.json({
        success: true,
        message: 'Already recorded',
        isNew: false,
      });
    }

    // 新しいセッションを記録
    await supabaseAdmin
      .from('stat_sessions')
      .insert({
        session_hash: sessionHash,
        games_count: games.length,
      });

    // 各ゲームの統計を更新
    for (const game of games) {
      const isUnplayed = game.playtime_forever < 30; // 30分未満は未プレイ扱い

      // まず既存のレコードを取得
      const { data: existing } = await supabaseAdmin
        .from('game_statistics')
        .select('*')
        .eq('appid', game.appid)
        .single();

      if (existing) {
        // 更新
        await supabaseAdmin
          .from('game_statistics')
          .update({
            total_owners: existing.total_owners + 1,
            unplayed_count: existing.unplayed_count + (isUnplayed ? 1 : 0),
            total_playtime_minutes: existing.total_playtime_minutes + game.playtime_forever,
            updated_at: new Date().toISOString(),
          })
          .eq('appid', game.appid);
      } else {
        // 新規作成
        await supabaseAdmin
          .from('game_statistics')
          .insert({
            appid: game.appid,
            game_name: game.name,
            total_owners: 1,
            unplayed_count: isUnplayed ? 1 : 0,
            total_playtime_minutes: game.playtime_forever,
          });
      }
    }

    return NextResponse.json({
      success: true,
      message: 'Statistics recorded',
      isNew: true,
      gamesCount: games.length,
    });
  } catch (error) {
    console.error('Error submitting stats:', error);
    return NextResponse.json(
      { error: 'Failed to submit statistics' },
      { status: 500 }
    );
  }
}
