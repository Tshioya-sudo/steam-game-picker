'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Card, Button, Loading, Input } from '@/components/ui';
import { getGameHeaderUrl } from '@/lib/steam';
import { BacklogRanking } from '@/lib/supabase';
import { Suspense } from 'react';

interface StatsData {
  rankings: BacklogRanking[];
  stats: {
    totalUsers: number;
    totalGames: number;
  };
}

// 管理者パスワード（環境変数から取得、なければデフォルト）
const ADMIN_PASSWORD = process.env.NEXT_PUBLIC_STATS_PASSWORD || 'admin2024';

function StatsPageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [data, setData] = useState<StatsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [authError, setAuthError] = useState(false);

  // URLパラメータまたはセッションストレージから認証チェック
  useEffect(() => {
    const urlPassword = searchParams.get('key');
    const sessionAuth = sessionStorage.getItem('stats_auth');

    if (urlPassword === ADMIN_PASSWORD || sessionAuth === 'true') {
      setIsAuthenticated(true);
      sessionStorage.setItem('stats_auth', 'true');
    } else {
      setLoading(false);
    }
  }, [searchParams]);

  // 認証後にデータを取得
  useEffect(() => {
    if (!isAuthenticated) return;

    const fetchStats = async () => {
      try {
        const response = await fetch('/api/stats?limit=50');
        if (!response.ok) {
          throw new Error('Failed to fetch stats');
        }
        const statsData = await response.json();
        setData(statsData);
      } catch {
        setError('統計データの取得に失敗しました');
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, [isAuthenticated]);

  // パスワード認証
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      sessionStorage.setItem('stats_auth', 'true');
      setAuthError(false);
      setLoading(true);
    } else {
      setAuthError(true);
    }
  };

  // 未認証時のログイン画面
  if (!isAuthenticated) {
    return (
      <div className="container-mobile py-12">
        <Card className="p-6 max-w-sm mx-auto">
          <h1 className="text-xl font-bold text-steam-text-light mb-4 text-center">
            管理者ログイン
          </h1>
          <form onSubmit={handleLogin} className="space-y-4">
            <Input
              type="password"
              placeholder="パスワードを入力"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {authError && (
              <p className="text-red-400 text-sm">パスワードが違います</p>
            )}
            <Button type="submit" variant="primary" className="w-full">
              ログイン
            </Button>
          </form>
          <Button
            variant="ghost"
            className="w-full mt-4"
            onClick={() => router.push('/')}
          >
            トップに戻る
          </Button>
        </Card>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="container-mobile py-12">
        <Loading size="lg" text="統計を読み込み中..." />
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="container-mobile space-y-4">
        <Card className="p-6 text-center">
          <p className="text-red-400 mb-4">{error || 'データがありません'}</p>
          <Button variant="outline" onClick={() => router.push('/')}>
            トップに戻る
          </Button>
        </Card>
      </div>
    );
  }

  return (
    <div className="container-mobile space-y-6">
      {/* ヘッダー */}
      <div className="text-center">
        <h1 className="text-2xl font-bold text-steam-text-light mb-2">
          積みゲー率ランキング
        </h1>
        <p className="text-steam-text/70 text-sm">
          管理者専用データ
        </p>
      </div>

      {/* 統計サマリー */}
      <div className="grid grid-cols-2 gap-3">
        <Card className="p-4 text-center">
          <p className="text-2xl font-bold text-steam-blue">{data.stats.totalUsers}</p>
          <p className="text-xs text-steam-text/60">サンプル数</p>
        </Card>
        <Card className="p-4 text-center">
          <p className="text-2xl font-bold text-green-400">{data.stats.totalGames}</p>
          <p className="text-xs text-steam-text/60">集計ゲーム数</p>
        </Card>
      </div>

      {/* ランキング説明 */}
      <Card className="p-3 bg-steam-blue/10 border-steam-blue/30">
        <p className="text-xs text-steam-text/80">
          積みゲー率 = 未プレイ者数 / 所有者数 × 100
          <br />
          （30分未満のプレイ時間を未プレイとしてカウント）
        </p>
      </Card>

      {/* ランキングリスト */}
      {data.rankings.length === 0 ? (
        <Card className="p-6 text-center">
          <p className="text-steam-text/60 mb-2">まだデータがありません</p>
          <p className="text-sm text-steam-text/40">
            ルーレットを回すとデータが蓄積されます
          </p>
        </Card>
      ) : (
        <div className="space-y-2">
          {data.rankings.map((game, index) => (
            <Card
              key={game.appid}
              className="p-3 hover:border-steam-blue/30 transition-colors"
            >
              <div className="flex items-center gap-3">
                {/* 順位 */}
                <div className="shrink-0 w-8 text-center">
                  <span
                    className={`text-lg font-bold ${
                      index === 0
                        ? 'text-yellow-400'
                        : index === 1
                        ? 'text-gray-300'
                        : index === 2
                        ? 'text-amber-600'
                        : 'text-steam-text/50'
                    }`}
                  >
                    {index + 1}
                  </span>
                </div>

                {/* ゲーム画像 */}
                <div className="shrink-0 w-16 h-8 bg-steam-darker rounded overflow-hidden">
                  <img
                    src={getGameHeaderUrl(game.appid)}
                    alt={game.game_name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      (e.target as HTMLImageElement).style.display = 'none';
                    }}
                  />
                </div>

                {/* ゲーム情報 */}
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-steam-text-light truncate">
                    {game.game_name}
                  </p>
                  <p className="text-xs text-steam-text/50">
                    {game.total_owners}人中 {game.unplayed_count}人が未プレイ
                  </p>
                </div>

                {/* 積みゲー率 */}
                <div className="shrink-0 text-right">
                  <p
                    className={`text-lg font-bold ${
                      game.backlog_rate >= 80
                        ? 'text-red-400'
                        : game.backlog_rate >= 60
                        ? 'text-orange-400'
                        : game.backlog_rate >= 40
                        ? 'text-yellow-400'
                        : 'text-green-400'
                    }`}
                  >
                    {game.backlog_rate}%
                  </p>
                  <p className="text-xs text-steam-text/40">積みゲー率</p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* フッター */}
      <div className="text-center pt-4 space-y-3">
        <Button variant="primary" onClick={() => router.push('/')}>
          ルーレットを回す
        </Button>
        <p className="text-xs text-steam-text/40">
          ※ このデータは管理者専用です
        </p>
      </div>
    </div>
  );
}

export default function StatsPage() {
  return (
    <Suspense fallback={
      <div className="container-mobile py-12">
        <Loading size="lg" text="読み込み中..." />
      </div>
    }>
      <StatsPageContent />
    </Suspense>
  );
}
