import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "このサイトについて | Steam積みゲー消化",
  description: "Steam積みゲー消化アプリの概要と運営者情報",
};

export default function AboutPage() {
  return (
    <div className="container-mobile">
      <div className="card-steam p-6 space-y-6">
        <h1 className="text-2xl font-bold text-steam-text-light">
          このサイトについて
        </h1>

        <section className="space-y-3">
          <h2 className="text-lg font-semibold text-steam-text-light">
            Steam積みゲー消化とは
          </h2>
          <p className="text-steam-text/80 leading-relaxed">
            「Steam積みゲー消化」は、Steamで購入したものの、
            まだプレイしていないゲーム（いわゆる「積みゲー」）を
            消化するための意思決定支援ツールです。
          </p>
          <p className="text-steam-text/80 leading-relaxed">
            多くのゲーマーが抱える「ゲームがたくさんあるのに、
            何をプレイするか決められない」という悩みを解決します。
            あなたのSteamライブラリからランダムにゲームを選出し、
            「今日やるゲーム」を決める手助けをします。
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-semibold text-steam-text-light">
            主な機能
          </h2>
          <ul className="space-y-3 text-steam-text/80">
            <li className="flex gap-3">
              <span className="text-xl">📚</span>
              <div>
                <strong className="text-steam-text-light">積みゲー消化モード</strong>
                <p className="text-sm mt-1">
                  プレイ時間が30分未満の未プレイ・ほぼ未プレイのゲームから抽選
                </p>
              </div>
            </li>
            <li className="flex gap-3">
              <span className="text-xl">🎲</span>
              <div>
                <strong className="text-steam-text-light">今日の1本</strong>
                <p className="text-sm mt-1">
                  所持している全ゲームからランダムに1本を選出
                </p>
              </div>
            </li>
            <li className="flex gap-3">
              <span className="text-xl">💭</span>
              <div>
                <strong className="text-steam-text-light">気分で選ぶ</strong>
                <p className="text-sm mt-1">
                  リラックス、スリル、頭を使う、物語重視、みんなでプレイなど、
                  今の気分に合ったゲームをフィルタリング
                </p>
              </div>
            </li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-semibold text-steam-text-light">
            使い方
          </h2>
          <ol className="space-y-2 text-steam-text/80">
            <li className="flex gap-3">
              <span className="text-steam-blue font-bold">1.</span>
              <span>Steam IDを入力（SteamID64、カスタムURL、プロフィールURLに対応）</span>
            </li>
            <li className="flex gap-3">
              <span className="text-steam-blue font-bold">2.</span>
              <span>抽選モードを選択</span>
            </li>
            <li className="flex gap-3">
              <span className="text-steam-blue font-bold">3.</span>
              <span>「抽選する！」ボタンをクリック</span>
            </li>
            <li className="flex gap-3">
              <span className="text-steam-blue font-bold">4.</span>
              <span>選ばれたゲームをプレイ、または結果をSNSでシェア</span>
            </li>
          </ol>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-semibold text-steam-text-light">
            プライバシーについて
          </h2>
          <p className="text-steam-text/80 leading-relaxed">
            本サービスでは、ユーザーのプライバシーを重視しています。
            アカウント登録は不要で、ゲームライブラリ情報はブラウザに
            一時的にキャッシュされるのみです。サーバーに個人情報は保存されません。
          </p>
          <p className="text-steam-text/80 leading-relaxed">
            詳細は
            <a href="/privacy" className="text-steam-blue hover:underline">
              プライバシーポリシー
            </a>
            をご確認ください。
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-semibold text-steam-text-light">
            技術スタック
          </h2>
          <div className="flex flex-wrap gap-2">
            <span className="px-3 py-1 bg-steam-blue/20 rounded-full text-sm text-steam-text-light">
              Next.js 14
            </span>
            <span className="px-3 py-1 bg-steam-blue/20 rounded-full text-sm text-steam-text-light">
              TypeScript
            </span>
            <span className="px-3 py-1 bg-steam-blue/20 rounded-full text-sm text-steam-text-light">
              Tailwind CSS
            </span>
            <span className="px-3 py-1 bg-steam-blue/20 rounded-full text-sm text-steam-text-light">
              Steam Web API
            </span>
            <span className="px-3 py-1 bg-steam-blue/20 rounded-full text-sm text-steam-text-light">
              Vercel
            </span>
          </div>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-semibold text-steam-text-light">
            運営者情報
          </h2>
          <div className="bg-steam-dark/50 rounded-lg p-4 space-y-2">
            <p className="text-steam-text/80">
              <strong className="text-steam-text-light">運営者:</strong> 個人開発
            </p>
            <p className="text-steam-text/80">
              <strong className="text-steam-text-light">お問い合わせ:</strong>{" "}
              <a
                href="https://x.com/Steam_tsumige"
                target="_blank"
                rel="noopener noreferrer"
                className="text-steam-blue hover:underline"
              >
                @Steam_tsumige
              </a>
              のDMにてお願いします
            </p>
          </div>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-semibold text-steam-text-light">
            免責事項
          </h2>
          <p className="text-steam-text/80 leading-relaxed">
            本サービスはValve CorporationおよびSteamとは一切関係ありません。
            Steam、Steamロゴ、およびその他のSteam関連の商標は、
            Valve Corporationの商標または登録商標です。
          </p>
          <p className="text-steam-text/80 leading-relaxed">
            詳細は
            <a href="/terms" className="text-steam-blue hover:underline">
              利用規約
            </a>
            をご確認ください。
          </p>
        </section>

        <div className="pt-4 border-t border-steam-blue/20">
          <a
            href="/"
            className="text-steam-blue hover:underline text-sm"
          >
            ← トップページに戻る
          </a>
        </div>
      </div>
    </div>
  );
}
