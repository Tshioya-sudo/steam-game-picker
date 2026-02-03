'use client';

import { Card } from '@/components/ui';

const AMAZON_STORE_ID = 'syokakku789-22';

interface Product {
  name: string;
  asin: string;
  description: string;
  imageUrl: string;
}

const RECOMMENDED_PRODUCTS: Product[] = [
  {
    name: 'Xbox ワイヤレス コントローラー',
    asin: 'B09VV5LJS1',
    description: 'PCゲームに最適な定番コントローラー',
    imageUrl: 'https://m.media-amazon.com/images/I/71iSzzHV5xL._AC_SX425_.jpg',
  },
  {
    name: 'Logicool G ゲーミングヘッドセット G435',
    asin: 'B09KNYCL3V',
    description: '軽量・ワイヤレスで長時間プレイに最適',
    imageUrl: 'https://m.media-amazon.com/images/I/71U-7pPCs4L._AC_SX425_.jpg',
  },
  {
    name: 'Razer DeathAdder V3',
    asin: 'B0BF5QP3V9',
    description: '高精度ゲーミングマウス',
    imageUrl: 'https://m.media-amazon.com/images/I/61L9eGJRPiL._AC_SX425_.jpg',
  },
];

function getAmazonUrl(asin: string): string {
  return `https://www.amazon.co.jp/dp/${asin}?tag=${AMAZON_STORE_ID}`;
}

export function AmazonProducts() {
  return (
    <Card className="p-4 space-y-3">
      <h3 className="font-semibold text-steam-text-light text-sm">
        おすすめゲーミングアイテム
      </h3>
      <div className="space-y-2">
        {RECOMMENDED_PRODUCTS.map((product) => (
          <a
            key={product.asin}
            href={getAmazonUrl(product.asin)}
            target="_blank"
            rel="noopener noreferrer sponsored"
            className="flex items-center gap-3 p-2 rounded-lg hover:bg-steam-dark/50 transition-colors"
          >
            <img
              src={product.imageUrl}
              alt={product.name}
              className="w-12 h-12 object-contain bg-white rounded"
            />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-steam-text-light truncate">
                {product.name}
              </p>
              <p className="text-xs text-steam-text/60">
                {product.description}
              </p>
            </div>
            <span className="text-xs text-steam-blue shrink-0">Amazon →</span>
          </a>
        ))}
      </div>
      <p className="text-xs text-steam-text/40 text-center">
        ※ Amazonアソシエイト広告
      </p>
    </Card>
  );
}
