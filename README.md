# Steam積みゲー消化アプリ

Steamの積みゲーから「今日やるゲーム」をランダムに選出する意思決定支援ツール

![Next.js](https://img.shields.io/badge/Next.js-14-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3-cyan)

## 🎮 機能

- **Steam ID入力** - SteamID64、カスタムURL、プロフィールURL対応
- **3つの抽選モード**
  - 📚 積みゲー消化モード（未プレイ・ほぼ未プレイ）
  - 🎲 今日の1本（全ゲームからランダム）
  - 💭 気分で選ぶ（リラックス、スリル、頭を使う、物語、みんなで）
- **抽選アニメーション** - スロット風のルーレット演出
- **結果表示** - ゲーム画像、プレイ時間、Steamリンク
- **X（Twitter）共有** - ハッシュタグ付きで簡単シェア
- **OGP動的生成** - 共有時に美しいカード画像を自動生成
- **モバイルファースト** - スマホでの利用を最優先した設計

## 🚀 セットアップ

### 必要要件

- Node.js 18以上
- npm
- Steam Web API Key

### インストール

```bash
# 依存関係をインストール
npm install
```

### 環境変数の設定

`.env.local` を編集して、Steam API Keyを設定してください：

```env
# Steam Web API Key
# https://steamcommunity.com/dev/apikey から取得
STEAM_API_KEY=YOUR_STEAM_API_KEY_HERE

# サイトURL（本番環境では実際のURLに変更）
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

### 開発サーバーの起動

```bash
# 開発サーバーを起動
npm run dev

# ブラウザで http://localhost:3000 を開く
```

**サーバーを常に起動しておく方法：**

```bash
# Windowsの場合（バックグラウンド起動）
start /B npm run dev

# macOS/Linuxの場合
npm run dev &

# または、tmux/screenセッションで起動
tmux new -s steam-picker
npm run dev
# Ctrl+B → D でデタッチ

# tmuxセッションに再接続
tmux attach -t steam-picker
```

### ビルドと本番環境

```bash
# プロダクションビルド
npm run build

# 本番サーバーを起動
npm start
```

## 📁 プロジェクト構造

```
steam-game-picker/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── page.tsx           # ホーム（Steam ID入力）
│   │   ├── pick/              # 抽選画面
│   │   ├── result/            # 結果表示（共有用）
│   │   └── api/               # APIルート
│   │       ├── steam/         # Steam API連携
│   │       └── og/            # OGP画像生成
│   ├── components/            # Reactコンポーネント
│   │   ├── ui/                # 汎用UIコンポーネント
│   │   ├── SteamIdInput.tsx   # Steam ID入力
│   │   ├── ModeSelector.tsx   # モード選択
│   │   ├── MoodFilter.tsx     # 気分フィルター
│   │   ├── GameRoulette.tsx   # 抽選アニメーション
│   │   └── GameResult.tsx     # 結果表示
│   ├── lib/                   # ユーティリティ
│   │   ├── steam.ts           # Steam API関連
│   │   ├── picker.ts          # 抽選ロジック
│   │   ├── storage.ts         # LocalStorage管理
│   │   └── analytics.ts       # 匿名データ収集
│   ├── types/                 # TypeScript型定義
│   └── data/                  # 静的データ
├── public/
│   └── data/
│       └── game_metadata.json # ゲームメタデータ
└── .env.local                 # 環境変数
```

## 🎨 技術スタック

- **Next.js 14** (App Router) - Reactフレームワーク
- **TypeScript** - 型安全性
- **Tailwind CSS** - ユーティリティファーストCSS
- **Steam Web API** - ゲームデータ取得
- **Vercel OG** - OGP画像生成

## 📝 使い方

1. **Steam IDを入力**
   - SteamID64: `76561198xxxxxxxxx`
   - カスタムURL: `username`
   - プロフィールURL: `steamcommunity.com/id/username`

2. **モードを選択**
   - 積みゲー消化: 未プレイ・ほぼ未プレイ（30分未満）のゲームから
   - 今日の1本: 所持している全ゲームから
   - 気分で選ぶ: 5つの気分カテゴリーでフィルタリング

3. **抽選実行**
   - 🎲 抽選ボタンをクリック
   - ルーレット演出後、結果が表示される

4. **結果を共有またはリトライ**
   - 🎮 今すぐプレイ: Steamクライアントを起動
   - Steamで見る: ブラウザでストアページを開く
   - 🔄 もう一度: 別のゲームを抽選
   - 𝕏 シェア: X（Twitter）で共有
   - ← モード選択に戻る: 最初からやり直す

## 🔒 プライバシー

- ログイン機能なし（Steam IDのみ使用）
- Steam APIキーはサーバーサイドで管理
- 匿名化されたイベントデータのみLocalStorageに保存
- 個人を特定できる情報は収集しません

## 🚧 今後の実装予定（Phase 2以降）

- [ ] game_metadata.jsonの拡充（1,000本以上）
- [ ] 実際のアフィリエイト広告統合
- [ ] Google Analytics連携
- [ ] ユーザーフィードバック機能
- [ ] ゲームフィルター追加（ジャンル、発売年など）
- [ ] 多言語対応（英語）
- [ ] PWA化（オフライン対応）

## 📄 ライセンス

このプロジェクトはMITライセンスの下で公開されています。

## ⚠️ 免責事項

このサイトはValve社およびSteamとは一切関係ありません。
すべての商標は各所有者に帰属します。

## 🔗 リンク

- [Steam Store](https://store.steampowered.com/)
- [Steam Web API Documentation](https://steamcommunity.com/dev)
- [Next.js Documentation](https://nextjs.org/docs)

---

Made with ❤️ for Steam gamers with backlogs
