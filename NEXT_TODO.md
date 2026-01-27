# 次回作業メモ

最終更新: 2025年1月27日

## 本日（1/27）完了した作業

- [x] game_metadata.jsonの大幅拡充（428本 → **1,004本**）
  - +576本の人気Steamゲームを追加
  - FPS、RPG、アクション、ストラテジー、レーシング、ホラー、パズル、インディーなど網羅
  - 各ゲームにジャンルとムード（relax/thrill/think/story/party）を設定
- [x] GitHubへプッシュ（コミット: `25f9a48`）
- [x] Vercel自動デプロイ完了

## 前回（1/26）完了した作業

- [x] プライバシーポリシーページ (`/privacy`)
- [x] 利用規約ページ (`/terms`)
- [x] このサイトについてページ (`/about`)
- [x] Google Analytics連携 (`GoogleAnalytics.tsx`) - 測定ID: G-KJYPSK557X
- [x] 使い方ガイドページ (`/guide`)
- [x] FAQページ (`/faq`)
- [x] Steam ID確認方法ページ (`/howto-steamid`)
- [x] フッターの更新（サポートリンク + 法的リンク）

## 現在のページ構成（9ページ）

| URL | ページ名 |
|-----|----------|
| `/` | トップページ |
| `/pick` | 抽選ページ |
| `/result` | 結果ページ |
| `/about` | このサイトについて |
| `/terms` | 利用規約 |
| `/privacy` | プライバシーポリシー |
| `/guide` | 使い方ガイド |
| `/faq` | よくある質問 |
| `/howto-steamid` | Steam ID確認方法 |

## 次回やるべき作業候補

### 優先度高

1. **Amazonアソシエイト審査申請**
   - 現在9ページあり、コンテンツ量は十分
   - 申請URL: https://affiliate.amazon.co.jp/
   - 審査には数日〜1週間程度かかる

2. **Google Analyticsの確認**
   - リアルタイムレポートでアクセス状況を確認
   - 測定ID: G-KJYPSK557X（ハードコード済み）

### 優先度中

3. **Amazonリンクの設置（審査通過後）**
   - ゲーミングデバイス紹介ページの作成
   - 結果ページにおすすめコントローラーなどのリンク追加

4. **UI/UX改善案**
   - 抽選履歴の表示機能
   - お気に入り/除外リスト機能
   - ジャンル別フィルター機能

### 優先度低

5. **追加機能案**
   - PWA化（オフライン対応）
   - SNSシェア機能の強化
   - 多言語対応（英語）

6. **game_metadata.jsonのさらなる拡充**
   - 現在1,004本、新作ゲームの随時追加
   - ムードタグの精度向上

## 重要な設定情報

### 環境変数（Vercel）

| Key | 値/状態 |
|-----|---------|
| `STEAM_API_KEY` | 設定済み |
| `NEXT_PUBLIC_SITE_URL` | 設定済み |
| `NEXT_PUBLIC_GA_ID` | コード内でハードコード（G-KJYPSK557X） |

### SNSアカウント

- X (Twitter): @Steam_tsumige

### リポジトリ

- GitHub: https://github.com/Tshioya-sudo/steam-game-picker

### 本番サイト

- Vercel: （デプロイ済み、URLはVercelダッシュボードで確認）

## 備考

- Vercelへのデプロイは `git push origin main` で自動実行される
- game_metadata.jsonは1,004本のゲームを収録（気分フィルター用）
- Google Analyticsはsrc/components/GoogleAnalytics.tsxで直接測定IDを設定
