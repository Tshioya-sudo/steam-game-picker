'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { SteamIdInput } from '@/components/SteamIdInput';
import { AdBanner } from '@/components/AdBanner';
import { Card, Loading } from '@/components/ui';
import { cacheGames, getCachedGames } from '@/lib/storage';
import { calculateGameStats } from '@/lib/picker';
import { trackSteamIdInput } from '@/lib/analytics';

export default function HomePage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [stats, setStats] = useState<ReturnType<typeof calculateGameStats> | null>(null);

  const handleSteamIdSubmit = async (steamId64: string) => {
    setLoading(true);
    setError(null);
    trackSteamIdInput(steamId64);

    try {
      // まずキャッシュを確認
      const cached = getCachedGames(steamId64);
      if (cached && cached.length > 0) {
        setStats(calculateGameStats(cached));
        router.push(`/pick?steamid=${steamId64}`);
        return;
      }

      // APIからゲームリストを取得
      const response = await fetch(`/api/steam/games?steamid=${steamId64}`);
      const data = await response.json();

      if (!response.ok || data.error) {
        setError(data.error || 'ゲームの取得に失敗しました');
        setLoading(false);
        return;
      }

      if (data.games.length === 0) {
        setError('ゲームが見つかりませんでした。プロフィールが公開設定になっているか確認してください。');
        setLoading(false);
        return;
      }

      // キャッシュに保存
      cacheGames(steamId64, data.games);
      setStats(calculateGameStats(data.games));

      // 抽選ページへ遷移
      router.push(`/pick?steamid=${steamId64}`);
    } catch {
      setError('ネットワークエラーが発生しました');
      setLoading(false);
    }
  };

  return (
    <div className="container-mobile space-y-6">
      {/* ヒーローセクション */}
      <div className="text-center py-6">
        <h1 className="text-2xl font-bold text-steam-text-light mb-2">
          積みゲー消化アプリ
        </h1>
        <p className="text-steam-text/80">
          あなたのSteamライブラリから
          <br />
          今日やるゲームを選ぼう
        </p>
      </div>

      {/* 広告（上部） */}
      <AdBanner position="top" />

      {/* Steam ID入力フォーム */}
      <Card className="p-6">
        <SteamIdInput onSubmit={handleSteamIdSubmit} loading={loading} />

        {error && (
          <div className="mt-4 p-3 bg-red-500/10 border border-red-500/30 rounded-lg">
            <p className="text-red-400 text-sm">{error}</p>
          </div>
        )}
      </Card>

      {/* ローディング中の統計表示 */}
      {loading && (
        <Card className="p-6">
          <Loading text="ゲームを取得中..." />
        </Card>
      )}

      {/* 統計プレビュー（キャッシュがある場合） */}
      {stats && !loading && (
        <Card className="p-4">
          <h3 className="text-sm font-medium text-steam-text/70 mb-3">
            あなたのライブラリ
          </h3>
          <div className="grid grid-cols-3 gap-2 text-center">
            <div>
              <p className="text-2xl font-bold text-steam-blue">
                {stats.totalGames}
              </p>
              <p className="text-xs text-steam-text/60">総ゲーム数</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-green-400">
                {stats.unplayedGames}
              </p>
              <p className="text-xs text-steam-text/60">未プレイ</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-steam-text-light">
                {stats.unplayedRate}%
              </p>
              <p className="text-xs text-steam-text/60">積みゲー率</p>
            </div>
          </div>
        </Card>
      )}

      {/* 使い方 */}
      <Card className="p-4">
        <h3 className="text-sm font-medium text-steam-text/70 mb-3">
          使い方
        </h3>
        <ol className="space-y-2 text-sm text-steam-text/80">
          <li className="flex gap-2">
            <span className="text-steam-blue font-bold">1.</span>
            <span>Steam IDを入力</span>
          </li>
          <li className="flex gap-2">
            <span className="text-steam-blue font-bold">2.</span>
            <span>モードを選択（積みゲー消化、今日の1本、気分で選ぶ）</span>
          </li>
          <li className="flex gap-2">
            <span className="text-steam-blue font-bold">3.</span>
            <span>抽選ボタンを押して今日やるゲームを決定！</span>
          </li>
        </ol>
      </Card>

      {/* 広告（下部） */}
      <AdBanner position="bottom" />
    </div>
  );
}
