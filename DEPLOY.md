# Vercelデプロイガイド

## 📋 前提条件

- [x] GitHubアカウント
- [x] Vercelアカウント（GitHubで連携可能）
- [x] Steam Web API Key

## 🚀 デプロイ手順

### 1. GitHubリポジトリの作成

#### オプションA: GitHub CLIを使用（推奨）

```bash
# GitHub CLIがインストールされている場合
gh repo create steam-game-picker --public --source=. --remote=origin --push
```

#### オプションB: GitHub Webサイトで手動作成

1. https://github.com/new にアクセス
2. リポジトリ名: `steam-game-picker`
3. 公開/非公開を選択（公開推奨）
4. 「Create repository」をクリック

その後、ローカルでリモートを追加してプッシュ：

```bash
git remote add origin https://github.com/YOUR_USERNAME/steam-game-picker.git
git branch -M main
git push -u origin main
```

### 2. Vercelへのデプロイ

#### ステップ1: Vercelアカウント作成

1. https://vercel.com にアクセス
2. 「Sign Up」をクリック
3. 「Continue with GitHub」を選択
4. GitHubアカウントで認証

#### ステップ2: プロジェクトのインポート

1. Vercelダッシュボードで「Add New...」→「Project」をクリック
2. GitHubリポジトリ一覧から `steam-game-picker` を選択
3. 「Import」をクリック

#### ステップ3: プロジェクト設定

**Framework Preset**: Next.js（自動検出）

**Root Directory**: `.` (デフォルト)

**Build Command**: `npm run build` (デフォルト)

**Output Directory**: `.next` (デフォルト)

**Install Command**: `npm install` (デフォルト)

#### ステップ4: 環境変数の設定

「Environment Variables」セクションで以下を追加：

```
STEAM_API_KEY = YOUR_ACTUAL_STEAM_API_KEY
NEXT_PUBLIC_SITE_URL = https://your-project.vercel.app
```

**重要:**
- `STEAM_API_KEY`: Steam Web API Keyを入力
  - 取得方法: https://steamcommunity.com/dev/apikey
- `NEXT_PUBLIC_SITE_URL`: デプロイ後のURLを入力
  - 最初は `https://steam-game-picker.vercel.app` など
  - 独自ドメインを設定する場合はそのURLに変更

#### ステップ5: デプロイ実行

1. 「Deploy」ボタンをクリック
2. ビルドが完了するまで待機（約2-3分）
3. 「Visit」ボタンでサイトにアクセス

### 3. デプロイ後の確認

✅ チェックリスト:

- [ ] トップページが正常に表示される
- [ ] Steam ID入力が動作する
- [ ] ゲーム取得が成功する
- [ ] 抽選機能が動作する
- [ ] X共有リンクが正しく生成される
- [ ] OGP画像が表示される

### 4. 環境変数の更新（必要な場合）

1. Vercelダッシュボード → プロジェクト選択
2. 「Settings」→「Environment Variables」
3. `NEXT_PUBLIC_SITE_URL` を実際のデプロイURLに更新
4. 「Save」をクリック
5. 「Deployments」タブから最新のデプロイを「Redeploy」

## 🔄 更新のデプロイ

コードを更新した場合：

```bash
git add .
git commit -m "update: 機能追加/修正内容"
git push
```

Vercelが自動的に検知して再デプロイされます（約2-3分）。

## 🌐 独自ドメインの設定（オプション）

1. Vercelダッシュボード → プロジェクト選択
2. 「Settings」→「Domains」
3. 「Add」をクリックしてドメインを追加
4. DNSレコードを設定（Vercelが指示を表示）
5. 環境変数 `NEXT_PUBLIC_SITE_URL` を新しいドメインに更新

## 📊 分析とモニタリング

Vercelダッシュボードで以下を確認できます：

- **Analytics**: ページビュー、訪問者数
- **Logs**: エラーログ、APIコールログ
- **Deployments**: デプロイ履歴
- **Speed Insights**: パフォーマンス分析（有料プラン）

## ⚠️ トラブルシューティング

### ビルドエラー

```bash
# ローカルでビルドテスト
npm run build
```

エラーがある場合は修正してから再プッシュ。

### Steam APIエラー

- 環境変数 `STEAM_API_KEY` が正しく設定されているか確認
- Steam APIキーの使用制限に達していないか確認

### OGP画像が表示されない

- `NEXT_PUBLIC_SITE_URL` が正しいURLになっているか確認
- ブラウザのキャッシュをクリア
- X（Twitter）の Card Validator で確認: https://cards-dev.twitter.com/validator

## 🎉 完了！

これで**Steam積みゲー消化アプリ**が24時間365日稼働します！

デプロイURL: `https://your-project.vercel.app`

---

## 📝 次のステップ

- [ ] 実際のSteam IDでテスト
- [ ] X（Twitter）でシェアしてOGP確認
- [ ] モバイルでの動作確認
- [ ] game_metadata.jsonの拡充
- [ ] Google Analytics追加（オプション）
- [ ] アフィリエイト広告の設定（オプション）
