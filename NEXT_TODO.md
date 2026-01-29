# 次回作業メモ

最終更新: 2025年1月27日

## 本日（1/27）完了した作業

- [x] game_metadata.jsonの大幅拡充（428本 → **1,004本**）
- [x] 「気分で選ぶ」に注意書き追加
- [x] GitHubへプッシュ・Vercel自動デプロイ完了
- [x] セキュリティ・負荷分析

## 現在のステータス

| 項目 | 状態 |
|------|------|
| **Amazonアソシエイト** | **審査通過** |
| Google Analytics | 動作確認済み（G-KJYPSK557X） |
| ゲームメタデータ | 1,004本収録 |
| 基本機能 | 完成 |

## 重要：Amazonアソシエイト情報

```
Store ID: syokakku789-22
```

リンク形式例：
```
https://www.amazon.co.jp/dp/商品ID?tag=syokakku789-22
```

## 次回やるべき作業

### 優先度高

1. **Google Search Console登録**
   - https://search.google.com/search-console
   - サイトの所有権確認
   - インデックス登録リクエスト

2. **サイトマップ・robots.txt作成**
   - SEO対策として必要
   - Next.jsで自動生成可能

3. **Amazonリンクの設置**
   - ゲーミングデバイス紹介ページ作成
   - または結果ページにおすすめ商品リンク追加
   - Store ID: `syokakku789-22`

### 優先度中（機能追加）

4. **ゲームメタデータの継続追加**
   - 現在1,004本 → 目標2,000本以上

5. **抽選履歴機能**
   - 過去に選ばれたゲームを表示
   - LocalStorageで保存

6. **お気に入り/除外リスト**
   - 気になるゲームを保存
   - 抽選から外すゲームを設定

7. **ジャンルフィルター**
   - RPG、FPS、アクションなどで絞り込み

### 優先度低

8. **カスタムドメイン取得**（任意）
   - 年間約1,000〜2,000円
   - Vercel無料プランでも設定可能

9. **PWA化**
   - オフライン対応

## 将来の展望

### データ販売予定
- ゲームメタデータ（ジャンル、ムード分類）のデータ販売を検討
- API提供の可能性
- 収益化の一環として

## 重要な設定情報

### 環境変数・ID

| Key | 値 |
|-----|-----|
| `STEAM_API_KEY` | 設定済み（Vercel） |
| Google Analytics | G-KJYPSK557X |
| **Amazon Store ID** | **syokakku789-22** |

### SNSアカウント

- X (Twitter): @Steam_tsumige

### リポジトリ

- GitHub: https://github.com/Tshioya-sudo/steam-game-picker

## セキュリティメモ

- 現状は個人サイトとして十分なセキュリティレベル
- 同時アクセス50〜100人程度まで対応可能（Steam APIレート制限に依存）
- 大規模化する場合はレート制限・キャッシュの実装を検討

## 備考

- Vercelへのデプロイは `git push origin main` で自動実行
- game_metadata.jsonは `public/data/` に配置（1,004本収録）
- 気分フィルターのムード: relax / thrill / think / story / party
