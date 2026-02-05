# 次回作業メモ

最終更新: 2026年2月5日

## 本日（2/5）完了した作業

- [x] game_metadata.json の管理対策を実装
  - `last_updated`（日付）と `total`（件数）フィールドを先頭に追加
  - `games` キーを appid 数値昇順にソート（新規追加は末尾へ）
- [x] ゲームメタデータを13本追加（1,004 → 1,017本）
  - Celeste, HELLDIVERS 2, Disco Elysium, Among Us, Ghost of Tsushima
  - Undertale, BioShock Infinite, FFXIV, Hollow Knight: Silksong
  - Dragon Age: Inquisition, DELTARUNE, Horizon Forbidden West, The Last of Us Part II Remastered
- [x] 新機能候補を調査・提案（下記「次回やるべき作業」へ）

## 現在のステータス

| 項目 | 状態 |
|------|------|
| **Amazonアソシエイト** | 審査通過・実装済み |
| Google Analytics | 動作確認済み（G-KJYPSK557X） |
| Google Search Console | 登録完了・サイトマップ送信済み |
| ゲームメタデータ | **1,017本収録** |
| フィードバック機能 | 実装済み（Supabase保存） |
| セキュリティ | 修正済み（パスワード露出・認証強化） |
| favicon | 実装済み（icon.svg） |
| 基本機能 | 完成 |

## 重要：Amazonアソシエイト情報

```
Store ID: syokakku789-22
```

### 設置済み商品

**AdBanner（広告バナー）**
| 位置 | 商品 | ASIN |
|------|------|------|
| 上部 | Logicool G331 ヘッドセット | B07PHLLMDN |
| 中間 | Xbox ワイヤレスコントローラー | B08DF248LD |
| 下部 | Logicool G240 マウスパッド | B01B1JGDQ6 |

**AmazonProducts（商品リスト）**
| 商品 | ASIN |
|------|------|
| Logicool G304 マウス | B07BF2Y43G |
| エレコム マウスパッド | B09MJDHK4N |
| Anker USBハブ | B00O0KISQE |
| MOFT PCスタンド | B07YDPBY6D |
| エレコム クリーニングクロス | B001TM6YNU |

## 次回やるべき作業

### 優先度高（低コスト・高価値）

1. **抽選履歴ページ** ← 次回優先
   - データは既に localStorage に保存済み（`savePickHistory()`・最新50件）
   - ページを追加するだけで実現
   - 抽選の「やり取り感」が増える

2. **永続的な除外リスト**
   - 今の「もう一度」は セッション中のみ
   - 「やっぱりやらない」ゲームを永続的に除外 → localStorage に保存
   - pick ページで適用する

### 優先度中（機能拡張）

3. **ユーザー独自の気分タグ編集**
   - 気分モードは game_metadata.json 収録ゲームのみ有効
   - ユーザーが自身のゲームに mood を付けられると対応率アップ
   - localStorage に保存・`filterByMood()` で統合

4. **管理者フィードバック閲覧ページ**
   - 閲覧には現在 Supabase 管理画面しかない
   - stats と同様の認証で閲覧ページを追加
   - 新規 API route `GET /api/feedback` を追加

5. **ゲームメタデータの継続追加**
   - 現在 1,017本 → 目標 2,000本以上
   - 追加方法: 末尾に追加 → `last_updated` と `total` を更新

### 優先度低

6. **抽選傾向グラフ（マイStats）**
   - 履歴データから気分カテゴリ別の抽選回数を可視化

7. **カスタムドメイン取得**（任意）
   - 年間約1,000〜2,000円

8. **PWA化**
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
| Google Search Console | 登録済み（W6HfIdmCjyklc7nV_A0AQDyRvfZb7vyGULJNHMFz_GQ） |
| **Amazon Store ID** | **syokakku789-22** |

### SNSアカウント

- X (Twitter): @Steam_tsumige

### リポジトリ

- GitHub: https://github.com/Tshioya-sudo/steam-game-picker
- 本番URL: https://steam-game-picker.vercel.app/

## セキュリティメモ

- 現状は個人サイトとして十分なセキュリティレベル
- 同時アクセス50〜100人程度まで対応可能（Steam APIレート制限に依存）
- 大規模化する場合はレート制限・キャッシュの実装を検討

## 備考

- Vercelへのデプロイは `git push origin main` で自動実行
- game_metadata.jsonは `public/data/` に配置（1,017本収録・appid昇順・末尾に新規追加）
- 気分フィルターのムード: relax / thrill / think / story / party
- Vercelツールバーは所有者のみ表示（一般ユーザーには非表示）
