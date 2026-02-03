'use client';

import { Card } from '@/components/ui';

const AMAZON_STORE_ID = 'syokakku789-22';

interface Product {
  name: string;
  asin: string;
  description: string;
  price: string;
}

// 売れ筋・手頃な価格の商品を優先
const RECOMMENDED_PRODUCTS: Product[] = [
  {
    name: 'エナジードリンク モンスター 24本',
    asin: 'B00HC7V3TW',
    description: '長時間ゲームのお供に',
    price: '¥4,200',
  },
  {
    name: 'SteelSeries マウスパッド QcK',
    asin: 'B0788LMLZL',
    description: 'プロも使う定番マウスパッド',
    price: '¥1,500',
  },
  {
    name: 'ゲーミングイヤホン 低遅延',
    asin: 'B09TKLQ3NR',
    description: '足音もクリアに聞こえる',
    price: '¥3,000',
  },
  {
    name: 'USBハブ 4ポート',
    asin: 'B07L32B9C2',
    description: 'コントローラー・周辺機器の接続に',
    price: '¥1,000',
  },
  {
    name: 'モニター掛け式ライト',
    asin: 'B08W2C5W59',
    description: '目の疲れを軽減、夜ゲームに必須',
    price: '¥4,000',
  },
];

function getAmazonUrl(asin: string): string {
  return `https://www.amazon.co.jp/dp/${asin}?tag=${AMAZON_STORE_ID}`;
}

export function AmazonProducts() {
  return (
    <Card className="p-4 space-y-3">
      <h3 className="font-semibold text-steam-text-light text-sm">
        ゲーマー向けおすすめアイテム
      </h3>
      <div className="space-y-1">
        {RECOMMENDED_PRODUCTS.map((product) => (
          <a
            key={product.asin}
            href={getAmazonUrl(product.asin)}
            target="_blank"
            rel="noopener noreferrer sponsored"
            className="flex items-center gap-3 p-2 rounded-lg hover:bg-steam-blue/10 transition-colors"
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
              <p className="text-sm text-steam-blue font-medium">{product.price}</p>
              <p className="text-xs text-steam-text/40">Amazon</p>
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
