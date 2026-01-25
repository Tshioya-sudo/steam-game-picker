import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "よくある質問（FAQ） | Steam積みゲー消化",
  description: "Steam積みゲー消化アプリに関するよくある質問と回答。トラブルシューティングもこちら。",
};

type FAQItem = {
  question: string;
  answer: string;
};

const faqItems: FAQItem[] = [
  {
    question: "Steam IDとは何ですか？",
    answer: "Steam IDは、Steamアカウントを識別するための固有のIDです。SteamID64（17桁の数字）、カスタムURL、プロフィールURLなど複数の形式があります。詳しくは「Steam IDの確認方法」ページをご覧ください。",
  },
  {
    question: "ゲームが取得できません",
    answer: "Steamプロフィールの「ゲームの詳細」が公開設定になっているか確認してください。Steamクライアント → プロフィール → プロフィールを編集 → プライバシー設定 から変更できます。",
  },
  {
    question: "「積みゲー」の定義は？",
    answer: "本サービスでは、プレイ時間が30分未満のゲームを「積みゲー（未プレイ・ほぼ未プレイ）」として扱っています。",
  },
  {
    question: "「気分で選ぶ」モードの分類基準は？",
    answer: "人気ゲームのジャンルや特性に基づいて、リラックス・スリル・頭を使う・物語重視・みんなでプレイの5カテゴリーに分類しています。すべてのゲームが分類されているわけではありません。",
  },
  {
    question: "無料で使えますか？",
    answer: "はい、完全無料でご利用いただけます。アカウント登録も不要です。",
  },
  {
    question: "個人情報は保存されますか？",
    answer: "いいえ、サーバーに個人情報は保存されません。ゲーム情報は一時的にブラウザのローカルストレージに保存されますが、これはユーザーの利便性向上のためで、いつでも削除可能です。",
  },
  {
    question: "Steamアカウントにログインする必要がありますか？",
    answer: "いいえ、本サービスはSteam IDを入力するだけで利用できます。Steamアカウントへのログインは必要ありません。",
  },
  {
    question: "スマートフォンでも使えますか？",
    answer: "はい、スマートフォン・タブレット・PCなど、あらゆるデバイスのブラウザでご利用いただけます。モバイルファーストで設計されています。",
  },
  {
    question: "抽選結果を共有できますか？",
    answer: "はい、抽選結果画面の「𝕏でシェア」ボタンからX（Twitter）に共有できます。ハッシュタグ付きで投稿されます。",
  },
  {
    question: "同じゲームが連続で選ばれることはありますか？",
    answer: "セッション中は一度選ばれたゲームは除外されるため、連続で同じゲームが選ばれることはありません。モードを変更するとリセットされます。",
  },
  {
    question: "対応していないゲームはありますか？",
    answer: "Steam Web APIで取得できるすべてのゲームに対応しています。ただし、非公開設定のゲームや一部の特殊なタイトルは表示されない場合があります。",
  },
  {
    question: "バグを見つけました / 機能要望があります",
    answer: "X（Twitter）の@Steam_tsumigeまでDMでご連絡ください。フィードバックをお待ちしています。",
  },
];

export default function FAQPage() {
  return (
    <div className="container-mobile">
      <div className="card-steam p-6 space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-steam-text-light mb-2">
            よくある質問（FAQ）
          </h1>
          <p className="text-steam-text/70">
            お困りの際はこちらをご確認ください
          </p>
        </div>

        <div className="space-y-4">
          {faqItems.map((item, index) => (
            <details
              key={index}
              className="group bg-steam-dark/50 rounded-lg overflow-hidden"
            >
              <summary className="flex items-center justify-between p-4 cursor-pointer hover:bg-steam-dark/70 transition-colors">
                <span className="font-medium text-steam-text-light pr-4">
                  {item.question}
                </span>
                <span className="text-steam-blue transition-transform group-open:rotate-180">
                  ▼
                </span>
              </summary>
              <div className="px-4 pb-4">
                <p className="text-steam-text/80 leading-relaxed">
                  {item.answer}
                </p>
              </div>
            </details>
          ))}
        </div>

        <section className="bg-steam-blue/10 rounded-lg p-4 space-y-3">
          <h2 className="font-semibold text-steam-text-light">
            解決しない場合
          </h2>
          <p className="text-sm text-steam-text/80">
            上記で解決しない場合は、
            <a
              href="https://x.com/Steam_tsumige"
              target="_blank"
              rel="noopener noreferrer"
              className="text-steam-blue hover:underline"
            >
              @Steam_tsumige
            </a>
            までお問い合わせください。
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
            href="/guide"
            className="text-steam-blue hover:underline text-sm"
          >
            使い方ガイド →
          </a>
        </div>
      </div>
    </div>
  );
}
