'use client';

import { useState, useEffect } from 'react';
import { Button, Input } from '@/components/ui';
import { detectSteamIdFormat } from '@/lib/steam';
import { getSavedSteamId, saveSteamId } from '@/lib/storage';

interface SteamIdInputProps {
  onSubmit: (steamId64: string) => void;
  loading?: boolean;
}

export function SteamIdInput({ onSubmit, loading }: SteamIdInputProps) {
  const [input, setInput] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [resolving, setResolving] = useState(false);

  // 保存されたSteam IDを復元
  useEffect(() => {
    const saved = getSavedSteamId();
    if (saved) {
      setInput(saved);
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const trimmedInput = input.trim();
    if (!trimmedInput) {
      setError('Steam IDを入力してください');
      return;
    }

    const format = detectSteamIdFormat(trimmedInput);
    if (!format) {
      setError('有効なSteam ID、カスタムURL、またはプロフィールURLを入力してください');
      return;
    }

    setResolving(true);

    try {
      const response = await fetch(
        `/api/steam/resolve?input=${encodeURIComponent(trimmedInput)}`
      );
      const data = await response.json();

      if (!response.ok) {
        setError(data.error || 'Steam IDの解決に失敗しました');
        return;
      }

      // Steam IDを保存して送信
      saveSteamId(trimmedInput);
      onSubmit(data.steamid64);
    } catch {
      setError('ネットワークエラーが発生しました');
    } finally {
      setResolving(false);
    }
  };

  const isProcessing = loading || resolving;

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        label="Steam ID / プロフィールURL"
        placeholder="76561198xxxxxxxxx または カスタムURL"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        error={error || undefined}
        hint="SteamID64、カスタムURL、プロフィールURLのいずれかを入力"
        disabled={isProcessing}
      />

      <Button
        type="submit"
        variant="primary"
        size="lg"
        className="w-full"
        loading={isProcessing}
        disabled={isProcessing}
      >
        {isProcessing ? '確認中...' : 'ゲームを取得'}
      </Button>

      <div className="text-xs text-steam-text/60 space-y-1">
        <p>対応フォーマット:</p>
        <ul className="list-disc list-inside ml-2 space-y-0.5">
          <li>SteamID64: 76561198xxxxxxxxx</li>
          <li>カスタムURL: username</li>
          <li>プロフィールURL: steamcommunity.com/id/username</li>
        </ul>
        <p className="mt-2 text-yellow-400/80">
          ※ プロフィールとゲーム詳細を「公開」に設定してください
        </p>
      </div>
    </form>
  );
}
