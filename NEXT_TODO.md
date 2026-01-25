# 次回作業メモ

最終更新: 2025年1月26日

## 本日完了した作業

- [x] プライバシーポリシーページ (`/privacy`)
- [x] 利用規約ページ (`/terms`)
- [x] このサイトについてページ (`/about`)
- [x] Google Analytics連携 (`GoogleAnalytics.tsx`)
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

## 次回やるべき作業

### 優先度高

1. **Google Analyticsの動作確認**
   - Vercelで再デプロイ後、リアルタイムレポートで確認
   - 環境変数 `NEXT_PUBLIC_GA_ID` が正しく設定されているか確認
   - 広告ブロッカーを無効にしてテスト

2. **Amazonアソシエイト審査申請**
   - 現在9ページあり、コンテンツ量は十分
   - 申請URL: https://affiliate.amazon.co.jp/

### 優先度中

3. **Amazonリンクの設置（審査通過後）**
   - ゲーミングデバイス紹介ページの作成
   - 結果ページにおすすめコントローラーなどのリンク追加

4. **game_metadata.jsonの拡充**
   - 現在約400本 → 目標1,000本以上
   - 「気分で選ぶ」モードの精度向上

### 優先度低

5. **機能追加案**
   - 抽選履歴の表示
   - お気に入り/除外リスト
   - ジャンルフィルター

6. **PWA化**
   - オフライン対応（ただしAPI依存のため効果は限定的）

## 重要な設定情報

### 環境変数（Vercel）

| Key | 説明 |
|-----|------|
| `STEAM_API_KEY` | Steam Web API Key（設定済み） |
| `NEXT_PUBLIC_SITE_URL` | 本番URL（要確認） |
| `NEXT_PUBLIC_GA_ID` | Google Analytics測定ID（要設定） |

### SNSアカウント

- X (Twitter): @Steam_tsumige

### リポジトリ

- GitHub: https://github.com/Tshioya-sudo/steam-game-picker

## 備考

- Vercelへのデプロイは `git push origin main` で自動実行される
- 環境変数を変更した場合は、Vercelダッシュボードから再デプロイが必要
