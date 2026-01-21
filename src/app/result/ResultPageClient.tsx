'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { Button, Card } from '@/components/ui';
import { AdBanner, MatchingAd } from '@/components/AdBanner';
import { PickMode, MoodCategory, PICK_MODE_OPTIONS, MOOD_OPTIONS } from '@/types';
import { getGameHeaderUrl, getSteamStoreUrl } from '@/lib/steam';
import { trackPageView } from '@/lib/analytics';

interface ResultPageClientProps {
  searchParams: { [key: string]: string | string[] | undefined };
}

export function ResultPageClient({ searchParams }: ResultPageClientProps) {
  const appid = typeof searchParams.appid === 'string' ? searchParams.appid : null;
  const name = typeof searchParams.name === 'string' ? searchParams.name : null;
  const mode = typeof searchParams.mode === 'string' ? searchParams.mode as PickMode : null;
  const mood = typeof searchParams.mood === 'string' ? searchParams.mood as MoodCategory : null;

  // ページビューを記録
  useEffect(() => {
    trackPageView('/result');
  }, []);

  // パラメータが不足している場合
  if (!appid || !name || !mode) {
    return (
      <div className="container-mobile space-y-6">
        <Card className="p-6 text-center">
          <p className="text-steam-text mb-4">
            共有リンクが無効です
          </p>
          <Link href="/">
            <Button variant="primary">トップページへ</Button>
          </Link>
        </Card>
      </div>
    );
  }

  const modeOption = PICK_MODE_OPTIONS.find((m) => m.id === mode);
  const moodOption = mood ? MOOD_OPTIONS.find((m) => m.id === mood) : null;
  const appidNum = parseInt(appid, 10);

  return (
    <div className="container-mobile space-y-6">
      {/* ヘッダー */}
      <div className="text-center">
        <p className="text-steam-text/70 text-sm">
          {modeOption?.labelJa}
          {moodOption && ` / ${moodOption.labelJa}`}で選ばれました
        </p>
        <h1 className="text-xl font-bold text-steam-text-light mt-1">
          今日やるゲームはこれ！
        </h1>
      </div>

      {/* 広告（上部） */}
      <AdBanner position="top" />

      {/* ゲームカード */}
      <Card className="overflow-hidden animate-pulse-glow">
        <div className="relative aspect-[460/215] bg-steam-darker">
          <img
            src={getGameHeaderUrl(appidNum)}
            alt={name}
            className="w-full h-full object-cover"
            onError={(e) => {
              const img = e.target as HTMLImageElement;
              img.style.display = 'none';
            }}
          />
        </div>

        <div className="p-4 space-y-4">
          <h2 className="font-bold text-xl text-steam-text-light">
            {name}
          </h2>

          {/* アクション */}
          <div className="flex gap-2">
            <a
              href={getSteamStoreUrl(appidNum)}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1"
            >
              <Button variant="secondary" size="lg" className="w-full">
                🎮 Steamで見る
              </Button>
            </a>
          </div>
        </div>
      </Card>

      {/* マッチング広告 */}
      <MatchingAd />

      {/* CTA */}
      <Card className="p-6 text-center space-y-4">
        <h3 className="font-semibold text-steam-text-light">
          あなたも積みゲーを消化しよう！
        </h3>
        <p className="text-sm text-steam-text/70">
          Steam IDを入力して、今日やるゲームを決めよう
        </p>
        <Link href="/">
          <Button variant="primary" size="lg" className="w-full">
            自分のライブラリで試す
          </Button>
        </Link>
      </Card>

      {/* 広告（下部） */}
      <AdBanner position="bottom" />
    </div>
  );
}
