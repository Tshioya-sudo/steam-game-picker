'use client';

import { useState, useEffect } from 'react';
import { SteamGame } from '@/types';
import { getGameHeaderUrl } from '@/lib/steam';

interface GameRouletteProps {
  games: SteamGame[];
  selectedGame: SteamGame | null;
  isSpinning: boolean;
  onSpinComplete?: () => void;
}

export function GameRoulette({
  games,
  selectedGame,
  isSpinning,
  onSpinComplete,
}: GameRouletteProps) {
  const [displayedGame, setDisplayedGame] = useState<SteamGame | null>(null);
  const [spinIndex, setSpinIndex] = useState(0);

  // スピンアニメーション
  useEffect(() => {
    if (!isSpinning || games.length === 0) {
      if (selectedGame) {
        setDisplayedGame(selectedGame);
      }
      return;
    }

    // スピン中は高速でゲームを切り替え
    let intervalId: ReturnType<typeof setInterval> | null = null;
    let duration = 50; // 初期速度
    let elapsed = 0;
    const totalDuration = 2000; // 2秒間スピン

    const spin = () => {
      setSpinIndex((prev) => (prev + 1) % games.length);
      elapsed += duration;

      // 徐々にスローダウン
      if (elapsed > totalDuration * 0.6) {
        duration = Math.min(duration * 1.2, 300);
      }

      if (elapsed >= totalDuration) {
        if (intervalId) clearInterval(intervalId);
        setDisplayedGame(selectedGame);
        onSpinComplete?.();
      }
    };

    intervalId = setInterval(spin, duration);

    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, [isSpinning, games, selectedGame, onSpinComplete]);

  // スピン中のゲームを表示
  useEffect(() => {
    if (isSpinning && games.length > 0) {
      setDisplayedGame(games[spinIndex]);
    }
  }, [spinIndex, isSpinning, games]);

  const currentGame = displayedGame;

  if (!currentGame) {
    return (
      <div className="card-steam p-8 text-center">
        <div className="text-6xl mb-4">🎮</div>
        <p className="text-steam-text">ゲームを選択中...</p>
      </div>
    );
  }

  return (
    <div
      className={`card-steam overflow-hidden transition-all duration-300 ${
        isSpinning ? 'animate-pulse-glow' : ''
      }`}
    >
      {/* ゲーム画像 */}
      <div className="relative aspect-[460/215] bg-steam-darker overflow-hidden">
        <img
          src={getGameHeaderUrl(currentGame.appid)}
          alt={currentGame.name}
          className={`w-full h-full object-cover transition-all duration-150 ${
            isSpinning ? 'blur-sm scale-105' : ''
          }`}
          onError={(e) => {
            const img = e.target as HTMLImageElement;
            img.style.display = 'none';
          }}
        />
        {isSpinning && (
          <div className="absolute inset-0 bg-gradient-to-t from-steam-darker/80 to-transparent flex items-center justify-center">
            <span className="text-5xl animate-bounce">🎲</span>
          </div>
        )}
      </div>

      {/* ゲーム情報 */}
      <div className="p-4">
        <h3
          className={`font-bold text-lg text-steam-text-light transition-all ${
            isSpinning ? 'blur-[2px]' : ''
          }`}
        >
          {currentGame.name}
        </h3>
        {!isSpinning && (
          <div className="mt-2 flex items-center gap-4 text-sm text-steam-text/70">
            <span>
              プレイ時間: {Math.round(currentGame.playtime_forever / 60)}時間
            </span>
            {currentGame.playtime_forever < 30 && (
              <span className="px-2 py-0.5 bg-green-500/20 text-green-400 rounded text-xs">
                未プレイ
              </span>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
