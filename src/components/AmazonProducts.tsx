'use client';

import { Card } from '@/components/ui';

interface Product {
  name: string;
  url: string;
  description: string;
  price: string;
}

// ゲーマー向けおすすめ商品
const RECOMMENDED_PRODUCTS: Product[] = [
  {
    name: 'レッドブル エナジードリンク 250ml×24本',
    url: 'https://amzn.to/3MoKmPU',
    description: 'ゲーマーの定番エナドリ',
    price: '¥4,000〜',
  },
  {
    name: 'SteelSeries QcK mini マウスパッド',
    url: 'https://amzn.to/4rucb8r',
    description: 'プロ仕様・ノンスリップ',
    price: '¥1,000〜',
  },
  {
    name: '森永製菓 超大粒ラムネ 60g×6袋',
    url: 'https://amzn.to/4kjs1jN',
    description: 'ブドウ糖90%・集中力維持',
    price: '¥1,000〜',
  },
  {
    name: 'エレコム エアダスター 350ml×3本',
    url: 'https://amzn.to/4kACRSV',
    description: 'キーボード・PC内部の掃除に',
    price: '¥1,500〜',
  },
  {
    name: 'めぐりズム ホットアイマスク 12枚×3',
    url: 'https://amzn.to/3ZlgIhs',
    description: '目の疲れを癒す',
    price: '¥2,500〜',
  },
  {
    name: 'Pulsar マイクロバンジーES',
    url: 'https://amzn.to/49YLzGQ',
    description: 'マウスケーブル固定',
    price: '¥1,500〜',
  },
  {
    name: 'ジェルクリーナー 80g×3袋',
    url: 'https://amzn.to/4qhPbsf',
    description: 'キーボードのホコリ取り',
    price: '¥1,000〜',
  },
];

export function AmazonProducts() {
  return (
    <Card className="p-4 space-y-3">
      <h3 className="font-semibold text-steam-text-light text-sm">
        ゲーマー向けおすすめアイテム
      </h3>
      <div className="space-y-2">
        {RECOMMENDED_PRODUCTS.map((product, index) => (
          <a
            key={index}
            href={product.url}
            target="_blank"
            rel="noopener noreferrer sponsored"
            className="flex items-center gap-3 p-2 rounded-lg hover:bg-steam-blue/10 transition-colors border border-transparent hover:border-steam-blue/30"
          >
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-steam-text-light truncate">
                {product.name}
              </p>
              <p className="text-xs text-steam-text/60">
                {product.description}
              </p>
            </div>
            <div className="text-right shrink-0">
              <p className="text-sm text-steam-blue font-bold">{product.price}</p>
              <p className="text-xs text-amazon-orange">Amazon →</p>
            </div>
          </a>
        ))}
      </div>
      <p className="text-xs text-steam-text/40 text-center">
        ※ 上記はAmazonアソシエイト広告です
      </p>
    </Card>
  );
}
