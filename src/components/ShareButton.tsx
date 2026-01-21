'use client';

import { Button } from '@/components/ui';
import { SteamGame, PickMode, MoodCategory, MOOD_OPTIONS } from '@/types';
import { trackShare } from '@/lib/analytics';

interface ShareButtonProps {
  game: SteamGame;
  mode: PickMode;
  mood?: MoodCategory;
  className?: string;
}

export function ShareButton({ game, mode, mood, className }: ShareButtonProps) {
  const handleShare = () => {
    trackShare(game.appid);

    const moodOption = mood ? MOOD_OPTIONS.find((m) => m.id === mood) : null;

    // 共有URL（OGP用）
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || window.location.origin;
    const shareUrl = new URL('/result', siteUrl);
    shareUrl.searchParams.set('appid', game.appid.toString());
    shareUrl.searchParams.set('name', game.name);
    shareUrl.searchParams.set('mode', mode);
    if (mood) {
      shareUrl.searchParams.set('mood', mood);
    }

    // ツイートテキスト
    let tweetText = `今日やるゲームは「${game.name}」に決めた！`;

    if (mode === 'backlog') {
      tweetText += '\n積みゲー消化モードで選ばれました 📚';
    } else if (mode === 'mood' && moodOption) {
      tweetText += `\n${moodOption.icon} ${moodOption.labelJa}な気分で選びました`;
    } else {
      tweetText += '\nデイリーピックで選ばれました 🎲';
    }

    tweetText += '\n\n#Steam積みゲー消化 #Steam';

    // X（Twitter）共有URL
    const twitterUrl = new URL('https://twitter.com/intent/tweet');
    twitterUrl.searchParams.set('text', tweetText);
    twitterUrl.searchParams.set('url', shareUrl.toString());

    window.open(twitterUrl.toString(), '_blank', 'width=550,height=420');
  };

  return (
    <Button
      variant="primary"
      size="lg"
      onClick={handleShare}
      className={className}
    >
      𝕏 シェアする
    </Button>
  );
}

/**
 * 共有URLパラメータをエンコード
 */
export function encodeShareParams(
  game: SteamGame,
  mode: PickMode,
  mood?: MoodCategory
): string {
  const params = new URLSearchParams();
  params.set('appid', game.appid.toString());
  params.set('name', game.name);
  params.set('mode', mode);
  if (mood) {
    params.set('mood', mood);
  }
  return params.toString();
}

/**
 * 共有URLパラメータをデコード
 */
export function decodeShareParams(searchParams: URLSearchParams): {
  appid: number;
  name: string;
  mode: PickMode;
  mood?: MoodCategory;
} | null {
  const appid = searchParams.get('appid');
  const name = searchParams.get('name');
  const mode = searchParams.get('mode') as PickMode;

  if (!appid || !name || !mode) {
    return null;
  }

  const mood = searchParams.get('mood') as MoodCategory | null;

  return {
    appid: parseInt(appid, 10),
    name,
    mode,
    mood: mood || undefined,
  };
}
