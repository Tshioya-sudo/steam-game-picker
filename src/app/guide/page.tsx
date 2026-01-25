import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "使い方ガイド | Steam積みゲー消化",
  description: "Steam積みゲー消化アプリの詳しい使い方を解説。Steam IDの入力方法から抽選モードの選び方まで。",
};

export default function GuidePage() {
  return (
    <div className="container-mobile">
      <div className="card-steam p-6 space-y-8">
        <div>
          <h1 className="text-2xl font-bold text-steam-text-light mb-2">
            使い方ガイド
          </h1>
          <p className="text-steam-text/70">
            Steam積みゲー消化アプリの使い方を詳しく解説します
          </p>
        </div>

        {/* ステップ1 */}
        <section className="space-y-4">
          <div className="flex items-center gap-3">
            <span className="flex items-center justify-center w-10 h-10 rounded-full bg-steam-blue text-white font-bold text-lg">
              1
            </span>
            <h2 className="text-xl font-semibold text-steam-text-light">
              Steam IDを入力する
            </h2>
          </div>

          <div className="pl-13 space-y-3">
            <p className="text-steam-text/80 leading-relaxed">
              トップページの入力欄にあなたのSteam IDを入力します。
              以下の形式に対応しています：
            </p>

            <div className="bg-steam-dark/50 rounded-lg p-4 space-y-2">
              <div className="flex flex-col gap-1">
                <span className="text-steam-blue font-medium">SteamID64</span>
                <code className="text-sm text-steam-text/70 bg-steam-dark px-2 py-1 rounded">
                  76561198xxxxxxxxx
                </code>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-steam-blue font-medium">カスタムURL</span>
                <code className="text-sm text-steam-text/70 bg-steam-dark px-2 py-1 rounded">
                  username
                </code>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-steam-blue font-medium">プロフィールURL</span>
                <code className="text-sm text-steam-text/70 bg-steam-dark px-2 py-1 rounded">
                  steamcommunity.com/id/username
                </code>
              </div>
            </div>

            <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-3">
              <p className="text-yellow-400 text-sm">
                <strong>注意：</strong>Steamプロフィールの「ゲームの詳細」が
                公開設定になっている必要があります。
              </p>
            </div>
          </div>
        </section>

        {/* ステップ2 */}
        <section className="space-y-4">
          <div className="flex items-center gap-3">
            <span className="flex items-center justify-center w-10 h-10 rounded-full bg-steam-blue text-white font-bold text-lg">
              2
            </span>
            <h2 className="text-xl font-semibold text-steam-text-light">
              抽選モードを選ぶ
            </h2>
          </div>

          <div className="pl-13 space-y-4">
            <p className="text-steam-text/80 leading-relaxed">
              3つのモードから目的に合ったものを選びます。
            </p>

            <div className="space-y-3">
              <div className="bg-steam-dark/50 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xl">📚</span>
                  <h3 className="font-semibold text-steam-text-light">積みゲー消化モード</h3>
                </div>
                <p className="text-sm text-steam-text/70">
                  プレイ時間30分未満の「積みゲー」からランダムに選出。
                  買ったけど遊んでいないゲームを消化したい時におすすめ。
                </p>
              </div>

              <div className="bg-steam-dark/50 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xl">🎲</span>
                  <h3 className="font-semibold text-steam-text-light">今日の1本</h3>
                </div>
                <p className="text-sm text-steam-text/70">
                  所持している全ゲームからランダムに1本を選出。
                  何をプレイするか決められない時に。
                </p>
              </div>

              <div className="bg-steam-dark/50 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xl">💭</span>
                  <h3 className="font-semibold text-steam-text-light">気分で選ぶ</h3>
                </div>
                <p className="text-sm text-steam-text/70">
                  今の気分に合ったゲームを選出。リラックス、スリル、
                  頭を使う、物語重視、みんなでプレイの5カテゴリー。
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ステップ3 */}
        <section className="space-y-4">
          <div className="flex items-center gap-3">
            <span className="flex items-center justify-center w-10 h-10 rounded-full bg-steam-blue text-white font-bold text-lg">
              3
            </span>
            <h2 className="text-xl font-semibold text-steam-text-light">
              抽選を実行する
            </h2>
          </div>

          <div className="pl-13 space-y-3">
            <p className="text-steam-text/80 leading-relaxed">
              「🎲 抽選する！」ボタンをクリックすると、ルーレット演出の後に
              結果が表示されます。
            </p>
            <p className="text-steam-text/80 leading-relaxed">
              結果に納得いかない場合は「もう一度」ボタンで再抽選できます。
            </p>
          </div>
        </section>

        {/* ステップ4 */}
        <section className="space-y-4">
          <div className="flex items-center gap-3">
            <span className="flex items-center justify-center w-10 h-10 rounded-full bg-steam-blue text-white font-bold text-lg">
              4
            </span>
            <h2 className="text-xl font-semibold text-steam-text-light">
              結果を活用する
            </h2>
          </div>

          <div className="pl-13 space-y-3">
            <p className="text-steam-text/80 leading-relaxed">
              抽選結果画面では以下のアクションが可能です：
            </p>

            <ul className="space-y-2 text-steam-text/80">
              <li className="flex items-start gap-2">
                <span className="text-steam-blue">•</span>
                <span><strong>今すぐプレイ</strong> - Steamクライアントでゲームを起動</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-steam-blue">•</span>
                <span><strong>Steamで見る</strong> - ストアページを確認</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-steam-blue">•</span>
                <span><strong>𝕏でシェア</strong> - 結果をX（Twitter）で共有</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-steam-blue">•</span>
                <span><strong>もう一度</strong> - 別のゲームを抽選</span>
              </li>
            </ul>
          </div>
        </section>

        {/* Tips */}
        <section className="bg-steam-blue/10 rounded-lg p-4 space-y-3">
          <h2 className="font-semibold text-steam-text-light flex items-center gap-2">
            <span>💡</span> Tips
          </h2>
          <ul className="space-y-2 text-sm text-steam-text/80">
            <li>• ゲーム情報は一時的にブラウザに保存されるため、2回目以降は高速に読み込めます</li>
            <li>• 「気分で選ぶ」モードは人気ゲームのメタデータを元に分類しています</li>
            <li>• 抽選結果はSNSでシェアして友達と楽しめます</li>
          </ul>
        </section>

        <div className="pt-4 border-t border-steam-blue/20 flex flex-wrap gap-4">
          <a
            href="/"
            className="text-steam-blue hover:underline text-sm"
          >
            ← トップページに戻る
          </a>
          <a
            href="/howto-steamid"
            className="text-steam-blue hover:underline text-sm"
          >
            Steam IDの確認方法 →
          </a>
        </div>
      </div>
    </div>
  );
}
