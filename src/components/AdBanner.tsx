'use client';

import { trackAdClick } from '@/lib/analytics';

interface AdBannerProps {
  position: 'top' | 'middle' | 'bottom';
  className?: string;
}

// Amazonアフィリエイト広告データ
const AD_DATA = {
  top: {
    type: 'energy-drink',
    title: 'レッドブル エナジードリンク 250ml×24本',
    description: 'ゲーマーの定番エナドリ・集中力アップ',
    url: 'https://amzn.to/3MoKmPU',
    image: 'https://m.media-amazon.com/images/I/515RB5k2dYL._AC_SX679_PIbundle-24,TopRight,0,0_SH20_.jpg',
    price: '¥4,000〜',
  },
  middle: {
    type: 'gaming-mousepad',
    title: 'SteelSeries QcK mini マウスパッド',
    description: 'プロ仕様・ノンスリップラバーベース',
    url: 'https://amzn.to/4rucb8r',
    image: 'https://m.media-amazon.com/images/I/617xz5fKBcL._AC_SL1500_.jpg',
    price: '¥1,000〜',
  },
  bottom: {
    type: 'snack',
    title: '森永製菓 超大粒ラムネ 60g×6袋',
    description: 'ブドウ糖90%・集中力維持に',
    url: 'https://amzn.to/4kjs1jN',
    image: 'https://m.media-amazon.com/images/I/71J-VgL7JtL._AC_SL1500_.jpg',
    price: '¥1,000〜',
  },
};

export function AdBanner({ position, className = '' }: AdBannerProps) {
  const ad = AD_DATA[position];

  const handleClick = () => {
    trackAdClick(ad.type);
    window.open(ad.url, '_blank', 'noopener,noreferrer');
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
        {ad.image && (
          <img
            src={ad.image}
            alt={ad.title}
            className="w-12 h-12 object-contain bg-white rounded-lg p-1 shrink-0"
          />
        )}
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

// おすすめ商品（ランダム表示）
const MATCHING_PRODUCTS = [
  {
    title: 'Pulsar マイクロバンジーES',
    description: 'マウスケーブル固定・コンパクト設計',
    url: 'https://amzn.to/49YLzGQ',
    image: 'https://m.media-amazon.com/images/I/618hPVlV5NL._AC_SL1500_.jpg',
    price: '¥1,500〜',
  },
  {
    title: 'めぐりズム 蒸気でホットアイマスク 12枚×3',
    description: '目の疲れを癒す・長時間プレイ後に',
    url: 'https://amzn.to/3ZlgIhs',
    image: 'https://m.media-amazon.com/images/I/71-SjFhnrdL._AC_SX466_PIbundle-3,TopRight,0,0_SH20_.jpg',
    price: '¥2,500〜',
  },
  {
    title: 'ジェルクリーナー キーボード掃除用 80g×3袋',
    description: 'スライム状でホコリを吸着',
    url: 'https://amzn.to/4qhPbsf',
    image: 'https://m.media-amazon.com/images/I/71jbJdk9r6L._AC_SL1500_.jpg',
    price: '¥1,000〜',
  },
];

export function MatchingAd({ className = '' }: MatchingAdProps) {
  // ランダムに商品を選択（クライアントサイドで固定）
  const product = MATCHING_PRODUCTS[Math.floor(Date.now() / 60000) % MATCHING_PRODUCTS.length];

  const handleClick = () => {
    trackAdClick('matching');
    window.open(product.url, '_blank', 'noopener,noreferrer');
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
        {product.image && (
          <img
            src={product.image}
            alt={product.title}
            className="w-12 h-12 object-contain bg-white rounded-lg p-1 shrink-0"
          />
        )}
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
