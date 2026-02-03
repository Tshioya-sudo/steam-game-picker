'use client';

import { Card } from '@/components/ui';

const AMAZON_STORE_ID = 'syokakku789-22';

interface Product {
  name: string;
  asin: string;
  description: string;
  price: string;
  image: string;
}

// 売れ筋・手頃な価格の商品を優先（検証済みASIN）
const RECOMMENDED_PRODUCTS: Product[] = [
  {
    name: 'Logicool G304 ゲーミングマウス',
    asin: 'B07BF2Y43G',
    description: 'ワイヤレス・軽量99g・プロ仕様',
    price: '¥4,950',
    image: 'https://m.media-amazon.com/images/I/61UxfXTUyvL._AC_SX75_.jpg',
  },
  {
    name: 'エレコム ゲーミングマウスパッド',
    asin: 'B09MJDHK4N',
    description: '大型サイズ・滑り止め付き',
    price: '¥1,480',
    image: 'https://m.media-amazon.com/images/I/81aeQKT1-YL._AC_SX75_.jpg',
  },
  {
    name: 'Anker USB3.0 ハブ 4ポート',
    asin: 'B00O0KISQE',
    description: 'コントローラー接続に最適',
    price: '¥1,590',
    image: 'https://m.media-amazon.com/images/I/61LtuHfLJcL._AC_SX75_.jpg',
  },
  {
    name: 'MOFT ノートPCスタンド',
    asin: 'B07YDPBY6D',
    description: '姿勢改善・放熱効果で長時間プレイ対応',
    price: '¥2,880',
    image: 'https://m.media-amazon.com/images/I/61U5zTOFxpL._AC_SX75_.jpg',
  },
  {
    name: 'エレコム クリーニングクロス',
    asin: 'B001TM6YNU',
    description: 'モニター・マウスのお手入れに',
    price: '¥475',
    image: 'https://m.media-amazon.com/images/I/71U8c8SvwGL._AC_SX75_.jpg',
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
      <div className="space-y-2">
        {RECOMMENDED_PRODUCTS.map((product) => (
          <a
            key={product.asin}
            href={getAmazonUrl(product.asin)}
            target="_blank"
            rel="noopener noreferrer sponsored"
            className="flex items-center gap-3 p-2 rounded-lg hover:bg-steam-blue/10 transition-colors border border-transparent hover:border-steam-blue/30"
          >
            <img
              src={product.image}
              alt={product.name}
              className="w-12 h-12 object-contain bg-white rounded p-0.5"
            />
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
