'use client';

import { trackAdClick } from '@/lib/analytics';

interface AdBannerProps {
  position: 'top' | 'middle' | 'bottom';
  className?: string;
}

// 仮の広告データ（実際にはAmazonアフィリエイトなど）
const AD_DATA = {
  top: {
    type: 'gaming-gear',
    title: 'ゲーミングギアをチェック',
    description: 'より快適なゲーム体験のために',
    link: '#', // 実際にはアフィリエイトリンク
    image: null,
  },
  middle: {
    type: 'steam-cards',
    title: 'Steamギフトカード',
    description: '新しいゲームを手に入れよう',
    link: '#',
    image: null,
  },
  bottom: {
    type: 'gaming-chair',
    title: '長時間プレイも快適に',
    description: 'ゲーミングチェア特集',
    link: '#',
    image: null,
  },
};

export function AdBanner({ position, className = '' }: AdBannerProps) {
  const ad = AD_DATA[position];

  const handleClick = () => {
    trackAdClick(ad.type);
    // 実際にはアフィリエイトリンクを開く
    // window.open(ad.link, '_blank');
  };

  return (
    <div
      className={`
        card-steam p-3 cursor-pointer transition-all hover:scale-[1.01]
        border-dashed border-steam-blue/30
        ${className}
      `}
      onClick={handleClick}
    >
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 bg-steam-blue/20 rounded-lg flex items-center justify-center text-2xl">
          {position === 'top' && '🎧'}
          {position === 'middle' && '💳'}
          {position === 'bottom' && '🪑'}
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-steam-text-light truncate">
            {ad.title}
          </p>
          <p className="text-xs text-steam-text/60 truncate">
            {ad.description}
          </p>
        </div>
        <span className="text-xs text-steam-text/40 px-1.5 py-0.5 border border-steam-text/20 rounded">
          AD
        </span>
      </div>
    </div>
  );
}

// マッチング広告（選ばれたゲームに基づく）
interface MatchingAdProps {
  gameGenre?: string;
  className?: string;
}

export function MatchingAd({ gameGenre, className = '' }: MatchingAdProps) {
  const handleClick = () => {
    trackAdClick('matching');
  };

  return (
    <div
      className={`
        card-steam p-4 cursor-pointer transition-all hover:scale-[1.01]
        bg-gradient-to-r from-steam-dark to-steam-darker
        ${className}
      `}
      onClick={handleClick}
    >
      <p className="text-xs text-steam-text/60 mb-2">おすすめ</p>
      <p className="text-sm text-steam-text-light">
        {gameGenre
          ? `${gameGenre}が好きなあなたにおすすめのゲーミングギア`
          : 'ゲーマーにおすすめのアイテム'}
      </p>
      <div className="mt-2 text-xs text-steam-blue">
        チェックする →
      </div>
    </div>
  );
}
