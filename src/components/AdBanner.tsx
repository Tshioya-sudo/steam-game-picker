'use client';

import { trackAdClick } from '@/lib/analytics';

const AMAZON_STORE_ID = 'syokakku789-22';

interface AdBannerProps {
  position: 'top' | 'middle' | 'bottom';
  className?: string;
}

// Amazonアフィリエイト広告データ
const AD_DATA = {
  top: {
    type: 'gaming-headset',
    title: 'ゲーミングヘッドセット',
    description: 'ボイスチャットも高音質で快適に',
    asin: 'B09KNYCL3V', // Logicool G435
    emoji: '🎧',
    price: '¥6,500〜',
  },
  middle: {
    type: 'xbox-controller',
    title: 'Xbox ワイヤレスコントローラー',
    description: 'PCゲームの定番コントローラー',
    asin: 'B09VV5LJS1', // Xbox Controller
    emoji: '🎮',
    price: '¥6,000〜',
  },
  bottom: {
    type: 'gaming-mousepad',
    title: '大型ゲーミングマウスパッド',
    description: 'デスク全体をカバーする大判サイズ',
    asin: 'B0788LMLZL', // SteelSeries QcK
    emoji: '🖱️',
    price: '¥1,500〜',
  },
};

function getAmazonUrl(asin: string): string {
  return `https://www.amazon.co.jp/dp/${asin}?tag=${AMAZON_STORE_ID}`;
}

export function AdBanner({ position, className = '' }: AdBannerProps) {
  const ad = AD_DATA[position];
  const amazonUrl = getAmazonUrl(ad.asin);

  const handleClick = () => {
    trackAdClick(ad.type);
    window.open(amazonUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <div
      className={`
        card-steam p-3 cursor-pointer transition-all hover:scale-[1.01]
        hover:border-steam-blue/50
        ${className}
      `}
      onClick={handleClick}
    >
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 bg-steam-blue/20 rounded-lg flex items-center justify-center text-2xl">
          {ad.emoji}
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-steam-text-light truncate">
            {ad.title}
          </p>
          <p className="text-xs text-steam-text/60 truncate">
            {ad.description}
          </p>
        </div>
        <div className="text-right shrink-0">
          <p className="text-xs text-steam-blue font-medium">{ad.price}</p>
          <p className="text-xs text-steam-text/40">Amazon</p>
        </div>
      </div>
    </div>
  );
}

// マッチング広告（選ばれたゲームに基づく）
interface MatchingAdProps {
  gameGenre?: string;
  className?: string;
}

// おすすめ商品（ランダム表示）
const MATCHING_PRODUCTS = [
  {
    title: 'PS5 DualSense コントローラー',
    description: '次世代の触覚フィードバック',
    asin: 'B08H99BPJN',
    price: '¥7,500〜',
  },
  {
    title: 'ゲーミングイヤホン',
    description: '低遅延でFPSに最適',
    asin: 'B09TKLQ3NR',
    price: '¥3,000〜',
  },
  {
    title: 'モニターライト',
    description: '目の疲れを軽減',
    asin: 'B08W2C5W59',
    price: '¥4,000〜',
  },
];

export function MatchingAd({ className = '' }: MatchingAdProps) {
  // ランダムに商品を選択（クライアントサイドで固定）
  const product = MATCHING_PRODUCTS[Math.floor(Date.now() / 60000) % MATCHING_PRODUCTS.length];
  const amazonUrl = getAmazonUrl(product.asin);

  const handleClick = () => {
    trackAdClick('matching');
    window.open(amazonUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <div
      className={`
        card-steam p-4 cursor-pointer transition-all hover:scale-[1.01]
        bg-gradient-to-r from-steam-dark to-steam-darker
        hover:border-steam-blue/50
        ${className}
      `}
      onClick={handleClick}
    >
      <p className="text-xs text-steam-text/60 mb-2">ゲーマーにおすすめ</p>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-steam-text-light">
            {product.title}
          </p>
          <p className="text-xs text-steam-text/60 mt-0.5">
            {product.description}
          </p>
        </div>
        <div className="text-right">
          <p className="text-sm text-steam-blue font-medium">{product.price}</p>
          <p className="text-xs text-steam-text/40">Amazon →</p>
        </div>
      </div>
    </div>
  );
}
