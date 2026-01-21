'use client';

import { Button } from '@/components/ui';
import { SteamGame, PickMode, MoodCategory, PICK_MODE_OPTIONS, MOOD_OPTIONS } from '@/types';
import { getGameHeaderUrl, getSteamStoreUrl, getSteamRunUrl } from '@/lib/steam';
import { trackSteamLink } from '@/lib/analytics';

interface GameResultProps {
  game: SteamGame;
  mode: PickMode;
  mood?: MoodCategory;
  onRetry: () => void;
  onShare: () => void;
  onBack?: () => void;
}

export function GameResult({ game, mode, mood, onRetry, onShare, onBack }: GameResultProps) {
  const modeOption = PICK_MODE_OPTIONS.find((m) => m.id === mode);
  const moodOption = mood ? MOOD_OPTIONS.find((m) => m.id === mood) : null;

  const handleSteamStoreClick = () => {
    trackSteamLink(game.appid);
    window.open(getSteamStoreUrl(game.appid), '_blank');
  };

  const handlePlayClick = () => {
    trackSteamLink(game.appid);
    window.location.href = getSteamRunUrl(game.appid);
  };

  return (
    <div className="space-y-4 animate-fade-in">
      {/* 結果ヘッダー */}
      <div className="text-center">
        <p className="text-steam-text/70 text-sm">
          {modeOption?.labelJa}
          {moodOption && ` / ${moodOption.labelJa}`}
        </p>
        <h2 className="text-xl font-bold text-steam-text-light mt-1">
          今日やるゲームはこれ！
        </h2>
      </div>

      {/* ゲームカード */}
      <div className="card-steam overflow-hidden animate-pulse-glow">
        <div className="relative aspect-[460/215] bg-steam-darker">
          <img
            src={getGameHeaderUrl(game.appid)}
            alt={game.name}
            className="w-full h-full object-cover"
            onError={(e) => {
              const img = e.target as HTMLImageElement;
              img.style.display = 'none';
            }}
          />
        </div>

        <div className="p-4 space-y-3">
          <h3 className="font-bold text-xl text-steam-text-light">
            {game.name}
          </h3>

          <div className="flex flex-wrap gap-2 text-sm">
            <span className="px-2 py-1 bg-steam-blue/20 text-steam-blue rounded">
              {Math.round(game.playtime_forever / 60)}時間プレイ
            </span>
            {game.playtime_forever < 30 && (
              <span className="px-2 py-1 bg-green-500/20 text-green-400 rounded">
                未プレイ
              </span>
            )}
          </div>

          {/* アクションボタン */}
          <div className="flex gap-2 pt-2">
            <Button
              variant="secondary"
              size="md"
              className="flex-1"
              onClick={handlePlayClick}
            >
              🎮 今すぐプレイ
            </Button>
            <Button
              variant="outline"
              size="md"
              onClick={handleSteamStoreClick}
            >
              Steamで見る
            </Button>
          </div>
        </div>
      </div>

      {/* 下部アクション */}
      <div className="space-y-3">
        <div className="flex gap-3">
          <Button
            variant="ghost"
            size="lg"
            className="flex-1"
            onClick={onRetry}
          >
            🔄 もう一度
          </Button>
          <Button
            variant="primary"
            size="lg"
            className="flex-1"
            onClick={onShare}
          >
            𝕏 シェア
          </Button>
        </div>

        {/* モード選択に戻る */}
        {onBack && (
          <Button
            variant="outline"
            size="md"
            className="w-full"
            onClick={onBack}
          >
            ← モード選択に戻る
          </Button>
        )}
      </div>
    </div>
  );
}
