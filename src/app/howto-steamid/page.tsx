import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Steam IDの確認方法 | Steam積みゲー消化",
  description: "SteamID64やカスタムURLの確認方法を画像付きで解説。Steam積みゲー消化アプリを使うために必要なSteam IDの調べ方。",
};

export default function HowToSteamIdPage() {
  return (
    <div className="container-mobile">
      <div className="card-steam p-6 space-y-8">
        <div>
          <h1 className="text-2xl font-bold text-steam-text-light mb-2">
            Steam IDの確認方法
          </h1>
          <p className="text-steam-text/70">
            本サービスで使用するSteam IDの調べ方を解説します
          </p>
        </div>

        {/* Steam IDとは */}
        <section className="space-y-3">
          <h2 className="text-lg font-semibold text-steam-text-light">
            Steam IDとは？
          </h2>
          <p className="text-steam-text/80 leading-relaxed">
            Steam IDは、あなたのSteamアカウントを識別するための固有のIDです。
            本サービスでは、このIDを使ってあなたのゲームライブラリを取得します。
          </p>
          <div className="bg-steam-dark/50 rounded-lg p-4">
            <p className="text-sm text-steam-text/70">
              <strong className="text-steam-text-light">対応形式：</strong>
              SteamID64、カスタムURL、プロフィールURL
            </p>
          </div>
        </section>

        {/* 方法1: プロフィールURLから */}
        <section className="space-y-4">
          <div className="flex items-center gap-3">
            <span className="flex items-center justify-center w-8 h-8 rounded-full bg-steam-blue text-white font-bold">
              1
            </span>
            <h2 className="text-lg font-semibold text-steam-text-light">
              プロフィールURLから確認（最も簡単）
            </h2>
          </div>

          <div className="space-y-3 pl-11">
            <ol className="space-y-3 text-steam-text/80">
              <li className="flex gap-2">
                <span className="text-steam-blue font-bold">1.</span>
                <span>Steamクライアントまたはブラウザで<a href="https://steamcommunity.com/" target="_blank" rel="noopener noreferrer" className="text-steam-blue hover:underline">steamcommunity.com</a>にアクセス</span>
              </li>
              <li className="flex gap-2">
                <span className="text-steam-blue font-bold">2.</span>
                <span>右上のあなたのアカウント名をクリック</span>
              </li>
              <li className="flex gap-2">
                <span className="text-steam-blue font-bold">3.</span>
                <span>「プロフィールを表示」をクリック</span>
              </li>
              <li className="flex gap-2">
                <span className="text-steam-blue font-bold">4.</span>
                <span>ブラウザのアドレスバーのURLを確認</span>
              </li>
            </ol>

            <div className="bg-steam-dark/50 rounded-lg p-4 space-y-2">
              <p className="text-sm text-steam-text/70">URLの例：</p>
              <code className="block text-sm text-steam-blue bg-steam-dark px-3 py-2 rounded">
                https://steamcommunity.com/id/<strong>あなたのカスタムURL</strong>/
              </code>
              <p className="text-sm text-steam-text/70 mt-2">または：</p>
              <code className="block text-sm text-steam-blue bg-steam-dark px-3 py-2 rounded">
                https://steamcommunity.com/profiles/<strong>76561198xxxxxxxxx</strong>/
              </code>
            </div>

            <p className="text-steam-text/80">
              <strong>太字の部分</strong>をコピーして入力欄に貼り付けてください。
              URL全体をそのまま貼り付けてもOKです。
            </p>
          </div>
        </section>

        {/* 方法2: Steamクライアントから */}
        <section className="space-y-4">
          <div className="flex items-center gap-3">
            <span className="flex items-center justify-center w-8 h-8 rounded-full bg-steam-blue text-white font-bold">
              2
            </span>
            <h2 className="text-lg font-semibold text-steam-text-light">
              Steamクライアントから確認
            </h2>
          </div>

          <div className="space-y-3 pl-11">
            <ol className="space-y-3 text-steam-text/80">
              <li className="flex gap-2">
                <span className="text-steam-blue font-bold">1.</span>
                <span>Steamクライアントを開く</span>
              </li>
              <li className="flex gap-2">
                <span className="text-steam-blue font-bold">2.</span>
                <span>左上の「Steam」メニュー → 「設定」</span>
              </li>
              <li className="flex gap-2">
                <span className="text-steam-blue font-bold">3.</span>
                <span>「インターフェイス」を選択</span>
              </li>
              <li className="flex gap-2">
                <span className="text-steam-blue font-bold">4.</span>
                <span>「WebアドレスバーをSteamで表示」にチェック</span>
              </li>
              <li className="flex gap-2">
                <span className="text-steam-blue font-bold">5.</span>
                <span>プロフィールページを開くとアドレスバーにURLが表示される</span>
              </li>
            </ol>
          </div>
        </section>

        {/* 方法3: 外部サイト */}
        <section className="space-y-4">
          <div className="flex items-center gap-3">
            <span className="flex items-center justify-center w-8 h-8 rounded-full bg-steam-blue text-white font-bold">
              3
            </span>
            <h2 className="text-lg font-semibold text-steam-text-light">
              外部サイトで確認
            </h2>
          </div>

          <div className="space-y-3 pl-11">
            <p className="text-steam-text/80">
              以下のサイトでSteamID64を確認できます：
            </p>
            <ul className="space-y-2">
              <li>
                <a
                  href="https://steamid.io/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-steam-blue hover:underline"
                >
                  steamid.io
                </a>
                <span className="text-steam-text/60 text-sm ml-2">
                  - カスタムURLからSteamID64を検索
                </span>
              </li>
              <li>
                <a
                  href="https://steamidfinder.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-steam-blue hover:underline"
                >
                  steamidfinder.com
                </a>
                <span className="text-steam-text/60 text-sm ml-2">
                  - 複数形式のSteam IDを相互変換
                </span>
              </li>
            </ul>
          </div>
        </section>

        {/* プライバシー設定 */}
        <section className="space-y-4">
          <h2 className="text-lg font-semibold text-steam-text-light flex items-center gap-2">
            <span>⚠️</span> 重要：プライバシー設定の確認
          </h2>

          <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-4 space-y-3">
            <p className="text-steam-text/80">
              本サービスを利用するには、Steamプロフィールの
              <strong>「ゲームの詳細」を公開設定</strong>にする必要があります。
            </p>

            <ol className="space-y-2 text-sm text-steam-text/80">
              <li className="flex gap-2">
                <span className="text-yellow-400 font-bold">1.</span>
                <span>Steamクライアント → プロフィール → 「プロフィールを編集」</span>
              </li>
              <li className="flex gap-2">
                <span className="text-yellow-400 font-bold">2.</span>
                <span>「プライバシー設定」タブを選択</span>
              </li>
              <li className="flex gap-2">
                <span className="text-yellow-400 font-bold">3.</span>
                <span>「ゲームの詳細」を「公開」に設定</span>
              </li>
            </ol>

            <p className="text-sm text-steam-text/60">
              ※ 設定変更後、反映まで数分かかる場合があります
            </p>
          </div>
        </section>

        {/* 入力例 */}
        <section className="space-y-3">
          <h2 className="text-lg font-semibold text-steam-text-light">
            入力例
          </h2>
          <div className="bg-steam-dark/50 rounded-lg p-4 space-y-3">
            <div>
              <p className="text-sm text-steam-text/60 mb-1">SteamID64:</p>
              <code className="text-steam-blue">76561198012345678</code>
            </div>
            <div>
              <p className="text-sm text-steam-text/60 mb-1">カスタムURL:</p>
              <code className="text-steam-blue">gaborit</code>
            </div>
            <div>
              <p className="text-sm text-steam-text/60 mb-1">プロフィールURL:</p>
              <code className="text-steam-blue text-sm break-all">
                https://steamcommunity.com/id/gaborit/
              </code>
            </div>
          </div>
          <p className="text-sm text-steam-text/70">
            上記のいずれの形式でも入力可能です。
          </p>
        </section>

        <div className="pt-4 border-t border-steam-blue/20 flex flex-wrap gap-4">
          <a
            href="/"
            className="text-steam-blue hover:underline text-sm"
          >
            ← トップページに戻る
          </a>
          <a
            href="/faq"
            className="text-steam-blue hover:underline text-sm"
          >
            よくある質問 →
          </a>
        </div>
      </div>
    </div>
  );
}
