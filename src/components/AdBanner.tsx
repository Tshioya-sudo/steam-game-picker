'use client';

import { trackAdClick } from '@/lib/analytics';

const AMAZON_STORE_ID = 'syokakku789-22';

interface AdBannerProps {
  position: 'top' | 'middle' | 'bottom';
  className?: string;
}

// Amazonアフィリエイト広告データ（検証済みASIN）
const AD_DATA = {
  top: {
    type: 'gaming-headset',
    title: 'Logicool G331 ゲーミングヘッドセット',
    description: '2.1chサラウンド・軽量設計で長時間プレイに最適',
    asin: 'B07PHLLMDN',
    image: 'https://m.media-amazon.com/images/I/71OrUUQqvhL._AC_SX75_.jpg',
    price: '¥5,940',
  },
  middle: {
    type: 'xbox-controller',
    title: 'Xbox ワイヤレスコントローラー',
    description: 'PCゲームの定番・Steam完全対応',
    asin: 'B08DF248LD',
    image: 'https://m.media-amazon.com/images/I/71iSzzHV5xL._AC_SX75_.jpg',
    price: '¥6,545',
  },
  bottom: {
    type: 'gaming-mousepad',
    title: 'Logicool G240 マウスパッド',
    description: 'プロ仕様の滑らかな操作感',
    asin: 'B01B1JGDQ6',
    image: 'https://m.media-amazon.com/images/I/61cTUrOV-OL._AC_SX75_.jpg',
    price: '¥1,760',
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
        <img
          src={ad.image}
          alt={ad.title}
          className="w-14 h-14 object-contain bg-white rounded-lg p-1"
        />
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-steam-text-light truncate">
            {ad.title}
          </p>
          <p className="text-xs text-steam-text/60 truncate">
            {ad.description}
          </p>
        </div>
        <div className="text-right shrink-0">
          <p className="text-sm text-steam-blue font-bold">{ad.price}</p>
          <p className="text-xs text-amazon-orange">Amazon →</p>
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

// おすすめ商品（ランダム表示・検証済みASIN）
const MATCHING_PRODUCTS = [
  {
    title: 'DualSense ワイヤレスコントローラー',
    description: 'PS5/PC対応・触覚フィードバック搭載',
    asin: 'B08H99BPJN',
    image: 'https://m.media-amazon.com/images/I/61lXDhwuypL._AC_SX75_.jpg',
    price: '¥9,480',
  },
  {
    title: 'Anker Soundcore ゲーミングイヤホン',
    description: '低遅延モード搭載・FPSに最適',
    asin: 'B09TVLHK1Y',
    image: 'https://m.media-amazon.com/images/I/61CAqiHD3GL._AC_SX75_.jpg',
    price: '¥6,990',
  },
  {
    title: 'BenQ ScreenBar モニターライト',
    description: '目の疲れを軽減・デスク照明の定番',
    asin: 'B076VNFZJG',
    image: 'https://m.media-amazon.com/images/I/61lCxA2gB6L._AC_SX75_.jpg',
    price: '¥12,900',
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
      <div className="flex items-center gap-3">
        <img
          src={product.image}
          alt={product.title}
          className="w-14 h-14 object-contain bg-white rounded-lg p-1"
        />
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-steam-text-light truncate">
            {product.title}
          </p>
          <p className="text-xs text-steam-text/60 mt-0.5">
            {product.description}
          </p>
        </div>
        <div className="text-right shrink-0">
          <p className="text-sm text-steam-blue font-bold">{product.price}</p>
          <p className="text-xs text-amazon-orange">Amazon →</p>
        </div>
      </div>
    </div>
  );
}
