'use client';

import { useState, useEffect, useCallback, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { ModeSelector } from '@/components/ModeSelector';
import { MoodFilter } from '@/components/MoodFilter';
import { GameRoulette } from '@/components/GameRoulette';
import { GameResult } from '@/components/GameResult';
import { AdBanner, MatchingAd } from '@/components/AdBanner';
import { Button, Card, Loading } from '@/components/ui';
import { SteamGame, PickMode, MoodCategory, GameMetadata } from '@/types';
import { getCachedGames, cacheGames, savePickHistory } from '@/lib/storage';
import { pickGame, calculateGameStats, filterBacklogGames, filterByMood } from '@/lib/picker';
import { trackPick, trackRetry } from '@/lib/analytics';

function PickPageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const steamId = searchParams.get('steamid');

  const [games, setGames] = useState<SteamGame[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // 抽選状態
  const [mode, setMode] = useState<PickMode>('backlog');
  const [mood, setMood] = useState<MoodCategory | null>(null);
  const [isSpinning, setIsSpinning] = useState(false);
  const [result, setResult] = useState<ReturnType<typeof pickGame> | null>(null);
  const [pickedAppIds, setPickedAppIds] = useState<number[]>([]);

  // ゲームメタデータ
  const [metadata, setMetadata] = useState<Record<number, GameMetadata>>({});

  // メタデータを読み込み
  useEffect(() => {
    const loadMetadata = async () => {
      try {
        const response = await fetch('/data/game_metadata.json');
        const data = await response.json();
        // games オブジェクトを Record 形式に変換
        if (data.games) {
          setMetadata(data.games);
        }
      } catch (error) {
        console.error('Failed to load game metadata:', error);
      }
    };

    loadMetadata();
  }, []);

  // ゲームリストを取得
  useEffect(() => {
    if (!steamId) {
      router.push('/');
      return;
    }

    const loadGames = async () => {
      // まずキャッシュを確認
      const cached = getCachedGames(steamId);
      if (cached && cached.length > 0) {
        setGames(cached);
        setLoading(false);
        return;
      }

      // APIから取得
      try {
        const response = await fetch(`/api/steam/games?steamid=${steamId}`);
        const data = await response.json();

        if (!response.ok || data.error) {
          setError(data.error || 'ゲームの取得に失敗しました');
          setLoading(false);
          return;
        }

        if (data.games.length === 0) {
          setError('ゲームが見つかりませんでした');
          setLoading(false);
          return;
        }

        cacheGames(steamId, data.games);
        setGames(data.games);
        setLoading(false);
      } catch {
        setError('ネットワークエラーが発生しました');
        setLoading(false);
      }
    };

    loadGames();
  }, [steamId, router]);

  // 統計を計算
  const stats = games.length > 0 ? calculateGameStats(games) : null;

  // 抽選実行
  const handlePick = useCallback(() => {
    if (games.length === 0) return;

    setIsSpinning(true);
    setResult(null);

    // アニメーション後に結果を表示
    setTimeout(() => {
      const pickResult = pickGame(
        games,
        mode,
        mood || undefined,
        metadata,
        pickedAppIds
      );

      if (pickResult) {
        setResult(pickResult);
        setPickedAppIds((prev) => [...prev, pickResult.game.appid]);
        savePickHistory(pickResult);
        trackPick(mode, mood || undefined, pickResult.game.appid);
      }

      setIsSpinning(false);
    }, 2000);
  }, [games, mode, mood, metadata, pickedAppIds]);

  // リトライ
  const handleRetry = useCallback(() => {
    trackRetry(mode, mood || undefined);
    setResult(null);
    handlePick();
  }, [handlePick, mode, mood]);

  // X共有
  const handleShare = useCallback(() => {
    if (!result) return;

    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || window.location.origin;
    const shareUrl = new URL('/result', siteUrl);
    shareUrl.searchParams.set('appid', result.game.appid.toString());
    shareUrl.searchParams.set('name', result.game.name);
    shareUrl.searchParams.set('mode', mode);
    if (mood) {
      shareUrl.searchParams.set('mood', mood);
    }

    let tweetText = `今日やるゲームは「${result.game.name}」に決めた！`;

    if (mode === 'backlog') {
      tweetText += '\n積みゲー消化モードで選ばれました 📚';
    } else if (mode === 'mood' && mood) {
      tweetText += `\n気分で選びました`;
    } else {
      tweetText += '\nデイリーピックで選ばれました 🎲';
    }

    tweetText += '\n\n#Steam積みゲー消化 #Steam';

    const twitterUrl = new URL('https://twitter.com/intent/tweet');
    twitterUrl.searchParams.set('text', tweetText);
    twitterUrl.searchParams.set('url', shareUrl.toString());

    window.open(twitterUrl.toString(), '_blank', 'width=550,height=420');
  }, [result, mode, mood]);

  // モード変更時にリセット
  useEffect(() => {
    setResult(null);
    setPickedAppIds([]);
  }, [mode]);

  // モード選択に戻る
  const handleBack = useCallback(() => {
    setResult(null);
    setPickedAppIds([]);
    setMood(null);
  }, []);

  if (loading) {
    return (
      <div className="container-mobile py-12">
        <Loading size="lg" text="ゲームを読み込み中..." />
      </div>
    );
  }

  if (error) {
    return (
      <div className="container-mobile space-y-4">
        <Card className="p-6 text-center">
          <p className="text-red-400 mb-4">{error}</p>
          <Button variant="outline" onClick={() => router.push('/')}>
            トップに戻る
          </Button>
        </Card>
      </div>
    );
  }

  return (
    <div className="container-mobile space-y-6">
      {/* 統計 */}
      {stats && (
        <div className="grid grid-cols-3 gap-2 text-center text-sm">
          <div className="card-steam p-2">
            <p className="text-lg font-bold text-steam-blue">{stats.totalGames}</p>
            <p className="text-xs text-steam-text/60">総ゲーム</p>
          </div>
          <div className="card-steam p-2">
            <p className="text-lg font-bold text-green-400">{stats.unplayedGames}</p>
            <p className="text-xs text-steam-text/60">未プレイ</p>
          </div>
          <div className="card-steam p-2">
            <p className="text-lg font-bold text-steam-text-light">{stats.unplayedRate}%</p>
            <p className="text-xs text-steam-text/60">積みゲー率</p>
          </div>
        </div>
      )}

      {/* 結果表示（抽選後） */}
      {result && !isSpinning ? (
        <>
          <GameResult
            game={result.game}
            mode={mode}
            mood={mood || undefined}
            onRetry={handleRetry}
            onShare={handleShare}
            onBack={handleBack}
          />
          <MatchingAd />
        </>
      ) : (
        <>
          {/* モード選択 */}
          <ModeSelector
            selectedMode={mode}
            onSelect={setMode}
            backlogCount={filterBacklogGames(games).length}
            totalCount={games.length}
          />

          {/* 気分フィルター（Moodモード時のみ） */}
          {mode === 'mood' && (
            <MoodFilter
              selectedMood={mood}
              onSelect={setMood}
              moodCounts={{
                relax: filterByMood(games, 'relax', metadata).length,
                thrill: filterByMood(games, 'thrill', metadata).length,
                think: filterByMood(games, 'think', metadata).length,
                story: filterByMood(games, 'story', metadata).length,
                party: filterByMood(games, 'party', metadata).length,
              }}
            />
          )}

          {/* ルーレット表示 */}
          {isSpinning && (
            <GameRoulette
              games={games}
              selectedGame={result?.game || null}
              isSpinning={isSpinning}
            />
          )}

          {/* 抽選ボタン */}
          <Button
            variant="primary"
            size="lg"
            className="w-full py-4 text-lg"
            onClick={handlePick}
            disabled={isSpinning || (mode === 'mood' && !mood)}
          >
            {isSpinning ? '抽選中...' : '🎲 抽選する！'}
          </Button>

          {mode === 'mood' && !mood && (
            <p className="text-center text-sm text-steam-text/60">
              気分を選択してください
            </p>
          )}

          {/* 広告 */}
          <AdBanner position="middle" />
        </>
      )}

      {/* トップに戻る */}
      <div className="text-center">
        <Button variant="ghost" size="sm" onClick={() => router.push('/')}>
          ← 別のアカウントで試す
        </Button>
      </div>
    </div>
  );
}

export default function PickPage() {
  return (
    <Suspense fallback={
      <div className="container-mobile py-12">
        <Loading size="lg" text="読み込み中..." />
      </div>
    }>
      <PickPageContent />
    </Suspense>
  );
}
