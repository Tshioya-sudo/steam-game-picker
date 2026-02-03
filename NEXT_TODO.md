# 次回作業メモ

最終更新: 2025年2月4日

## 本日（2/4）完了した作業

- [x] Google Search Console登録・所有権確認完了
- [x] sitemap.xml / robots.txt 作成・デプロイ
- [x] サイトマップをSearch Consoleに送信
- [x] Amazonアフィリエイト広告をサイトに実装
  - AdBanner（上部・中間・下部）
  - MatchingAd（ランダム商品表示）
  - AmazonProducts（商品リスト）
- [x] 商品画像追加・ASIN修正

## 次回確認事項（重要）

### Vercelデプロイ確認
- Vercelが復旧したら最新デプロイを確認
- 商品画像が表示されているか確認
- Amazonリンクが正常に動作するか確認
- 必要に応じてVercelダッシュボードから手動リデプロイ

## 現在のステータス

| 項目 | 状態 |
|------|------|
| **Amazonアソシエイト** | **審査通過・実装済み** |
| Google Analytics | 動作確認済み（G-KJYPSK557X） |
| Google Search Console | 登録完了・サイトマップ送信済み |
| ゲームメタデータ | 1,004本収録 |
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

### 優先度高

1. **Vercelデプロイ確認**
   - 商品画像・リンクの動作確認
   - 必要に応じて手動リデプロイ

2. **商品のASIN確認**
   - 全リンクがAmazonで有効か確認
   - リンク切れがあれば差し替え

### 優先度中（機能追加）

3. **ゲームメタデータの継続追加**
   - 現在1,004本 → 目標2,000本以上

4. **抽選履歴機能**
   - 過去に選ばれたゲームを表示
   - LocalStorageで保存

5. **お気に入り/除外リスト**
   - 気になるゲームを保存
   - 抽選から外すゲームを設定

6. **ジャンルフィルター**
   - RPG、FPS、アクションなどで絞り込み

### 優先度低

7. **カスタムドメイン取得**（任意）
   - 年間約1,000〜2,000円
   - Vercel無料プランでも設定可能

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
- game_metadata.jsonは `public/data/` に配置（1,004本収録）
- 気分フィルターのムード: relax / thrill / think / story / party
- Vercelツールバーは所有者のみ表示（一般ユーザーには非表示）
