# Google Analytics 設定ガイド

## 📊 Google Analytics 4 (GA4) の設定方法

### ステップ1: Google Analytics アカウント作成

1. https://analytics.google.com/ にアクセス
2. Googleアカウントでログイン
3. 「測定を開始」をクリック
4. アカウント情報を入力
   - アカウント名: 任意（例: Steam Game Picker）
   - データ共有設定: デフォルトでOK
5. 「次へ」をクリック

### ステップ2: プロパティ設定

1. プロパティ名: `steam-game-picker`
2. タイムゾーン: `日本`
3. 通貨: `日本円`
4. 「次へ」をクリック

### ステップ3: ビジネス情報

1. 業種: `ゲーム`
2. ビジネス規模: `小規模`
3. 利用目的: 任意選択
4. 「作成」をクリック
5. 利用規約に同意

### ステップ4: データストリーム作成

1. 「ウェブ」を選択
2. ウェブサイトのURL: `https://steam-game-picker.vercel.app`
3. ストリーム名: `Steam Game Picker Web`
4. 「ストリームを作成」をクリック

### ステップ5: 測定IDを取得

1. 作成されたストリームの詳細画面で「測定ID」をコピー
   - 形式: `G-XXXXXXXXXX`
2. このIDを次のステップで使用

---

## 💻 アプリへの実装

### 方法1: Next.js App Router用の実装（推奨）

#### 1. 環境変数を追加

`.env.local` に以下を追加：

```env
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
```

Vercelにも同じ環境変数を追加：
- Vercel Dashboard → Settings → Environment Variables
- Name: `NEXT_PUBLIC_GA_ID`
- Value: `G-XXXXXXXXXX`

#### 2. Google Analytics コンポーネントを作成

`src/components/GoogleAnalytics.tsx` を作成：

```typescript
'use client';

import Script from 'next/script';

export function GoogleAnalytics() {
  const gaId = process.env.NEXT_PUBLIC_GA_ID;

  if (!gaId) {
    return null;
  }

  return (
    <>
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
      />
      <Script
        id="google-analytics"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${gaId}', {
              page_path: window.location.pathname,
            });
          `,
        }}
      />
    </>
  );
}
```

#### 3. layout.tsx に追加

`src/app/layout.tsx` を編集：

```typescript
import { GoogleAnalytics } from '@/components/GoogleAnalytics';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <body>
        <GoogleAnalytics />
        {/* 既存のコンテンツ */}
        {children}
      </body>
    </html>
  );
}
```

#### 4. デプロイ

```bash
git add .
git commit -m "feat: Add Google Analytics"
git push
```

---

## 📈 データの確認方法

### Google Analytics ダッシュボード

1. https://analytics.google.com/ にアクセス
2. 左メニューから確認できる項目：

**リアルタイム:**
- 現在のアクティブユーザー数
- 閲覧中のページ

**レポート > ライフサイクル:**
- ユーザー獲得: 流入元
- エンゲージメント: ページビュー、滞在時間
- 収益化: (広告収益など)

**レポート > ユーザー:**
- ユーザー属性: 地域、デバイス、ブラウザ
- テクノロジー: OS、画面解像度

### よく見る指標

- **ユーザー数**: 訪問者数
- **セッション数**: 訪問回数
- **ページビュー数**: ページ閲覧数
- **平均セッション時間**: 滞在時間
- **直帰率**: 1ページだけ見て離脱した割合
- **トラフィック ソース**: どこから来たか（検索、SNS、直接）

---

## 🎯 カスタムイベントの追加（オプション）

特定の操作を追跡する場合：

### イベント送信用の関数を作成

`src/lib/ga.ts` を作成：

```typescript
export const GA_ID = process.env.NEXT_PUBLIC_GA_ID;

// イベント送信
export const event = (action: string, params?: Record<string, any>) => {
  if (typeof window !== 'undefined' && window.gtag && GA_ID) {
    window.gtag('event', action, params);
  }
};

// ページビュー送信
export const pageview = (url: string) => {
  if (typeof window !== 'undefined' && window.gtag && GA_ID) {
    window.gtag('config', GA_ID, {
      page_path: url,
    });
  }
};
```

### 型定義を追加

`src/types/gtag.d.ts` を作成：

```typescript
interface Window {
  gtag: (
    command: 'config' | 'event' | 'js',
    target: string | Date,
    params?: Record<string, any>
  ) => void;
}
```

### 使用例

```typescript
import { event } from '@/lib/ga';

// Steam ID入力時
event('steam_id_submit', {
  category: 'engagement',
  label: 'steam_id_input'
});

// ゲーム抽選時
event('game_pick', {
  category: 'engagement',
  label: mode,
  value: 1
});

// Twitter共有時
event('share', {
  method: 'twitter',
  content_type: 'game_result'
});
```

---

## ⚠️ 注意事項

### プライバシーポリシーの追加

Google Analytics を使用する場合、プライバシーポリシーの記載が推奨されます。

サイトに以下の内容を追加：

```markdown
## プライバシーポリシー

当サイトでは、Googleによるアクセス解析ツール「Google Analytics」を使用しています。
このGoogle Analyticsはデータの収集のためにCookieを使用しています。
このデータは匿名で収集されており、個人を特定するものではありません。

この機能はCookieを無効にすることで収集を拒否することが出来ますので、
お使いのブラウザの設定をご確認ください。

Google Analyticsの利用規約については、以下をご確認ください。
https://marketingplatform.google.com/about/analytics/terms/jp/
```

### GDPRコンプライアンス

EU圏のユーザーがいる場合は、Cookie同意バナーの実装を検討してください。

---

## 📊 データが表示されるまでの時間

- リアルタイムデータ: 数秒〜数分
- レポートデータ: 24〜48時間

設置後すぐには詳細なレポートが表示されないので、数日待ちましょう。

---

## 🔍 トラブルシューティング

### データが表示されない場合

1. 測定IDが正しいか確認
2. 環境変数が設定されているか確認（Vercel）
3. ブラウザの拡張機能（広告ブロッカー）を無効化してテスト
4. ブラウザのコンソールでエラーを確認
5. リアルタイムレポートで自分のアクセスが表示されるか確認

### デバッグ方法

ブラウザの開発者ツールで以下を確認：

```javascript
// コンソールで実行
window.gtag
// 関数が表示されればGA読み込み成功

window.dataLayer
// 配列が表示されればデータ送信中
```

---

## 📖 参考リンク

- [Google Analytics 4 公式ドキュメント](https://support.google.com/analytics/answer/9304153)
- [Next.js with Google Analytics](https://nextjs.org/docs/app/building-your-application/optimizing/analytics)
- [GA4 イベント測定](https://support.google.com/analytics/answer/9267735)
