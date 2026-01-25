import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "プライバシーポリシー | Steam積みゲー消化",
  description: "Steam積みゲー消化アプリのプライバシーポリシーについて",
};

export default function PrivacyPage() {
  return (
    <div className="container-mobile">
      <div className="card-steam p-6 space-y-6">
        <h1 className="text-2xl font-bold text-steam-text-light">
          プライバシーポリシー
        </h1>

        <p className="text-sm text-steam-text/60">
          最終更新日: 2025年1月
        </p>

        <section className="space-y-3">
          <h2 className="text-lg font-semibold text-steam-text-light">
            1. はじめに
          </h2>
          <p className="text-steam-text/80 leading-relaxed">
            Steam積みゲー消化（以下「本サービス」）は、ユーザーのプライバシーを尊重し、
            個人情報の保護に努めています。本プライバシーポリシーでは、本サービスが
            収集する情報とその利用方法について説明します。
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-semibold text-steam-text-light">
            2. 収集する情報
          </h2>
          <p className="text-steam-text/80 leading-relaxed">
            本サービスでは、以下の情報を収集・使用する場合があります：
          </p>
          <ul className="list-disc list-inside space-y-2 text-steam-text/80">
            <li>
              <strong>Steam ID:</strong> ユーザーが入力したSteam IDを使用して、
              Steam Web APIを通じてゲームライブラリ情報を取得します。
            </li>
            <li>
              <strong>ゲームライブラリ情報:</strong> 所持ゲームの一覧とプレイ時間を取得します。
              この情報はブラウザのローカルストレージに一時的に保存され、
              サーバーには保存されません。
            </li>
            <li>
              <strong>利用統計:</strong> サービス改善のため、匿名化された利用統計
              （抽選回数、選択されたモードなど）を収集する場合があります。
            </li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-semibold text-steam-text-light">
            3. 情報の利用目的
          </h2>
          <p className="text-steam-text/80 leading-relaxed">
            収集した情報は、以下の目的で利用します：
          </p>
          <ul className="list-disc list-inside space-y-2 text-steam-text/80">
            <li>ゲーム抽選機能の提供</li>
            <li>サービスの改善と最適化</li>
            <li>ユーザーサポートへの対応</li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-semibold text-steam-text-light">
            4. 情報の保存と管理
          </h2>
          <p className="text-steam-text/80 leading-relaxed">
            ゲームライブラリ情報は、ユーザーのブラウザのローカルストレージに
            一時的に保存されます。この情報はユーザーがブラウザのデータを
            クリアすることで削除できます。当サービスのサーバーには、
            個人を特定できる情報は保存されません。
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-semibold text-steam-text-light">
            5. 第三者への提供
          </h2>
          <p className="text-steam-text/80 leading-relaxed">
            本サービスは、以下の場合を除き、ユーザーの個人情報を第三者に
            提供することはありません：
          </p>
          <ul className="list-disc list-inside space-y-2 text-steam-text/80">
            <li>法令に基づく場合</li>
            <li>ユーザーの同意がある場合</li>
            <li>サービス提供に必要な業務委託先への提供</li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-semibold text-steam-text-light">
            6. 外部サービスの利用
          </h2>
          <p className="text-steam-text/80 leading-relaxed">
            本サービスでは、以下の外部サービスを利用しています：
          </p>
          <ul className="list-disc list-inside space-y-2 text-steam-text/80">
            <li>
              <strong>Steam Web API:</strong> ゲームライブラリ情報の取得に使用します。
              Steamのプライバシーポリシーについては、
              <a
                href="https://store.steampowered.com/privacy_agreement/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-steam-blue hover:underline"
              >
                Steam プライバシーポリシー
              </a>
              をご確認ください。
            </li>
            <li>
              <strong>アクセス解析:</strong> サービス改善のため、Google Analytics等の
              アクセス解析ツールを使用する場合があります。
            </li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-semibold text-steam-text-light">
            7. Cookieの使用
          </h2>
          <p className="text-steam-text/80 leading-relaxed">
            本サービスでは、ユーザー体験の向上やアクセス解析のために
            Cookieを使用する場合があります。ブラウザの設定により、
            Cookieの受け入れを拒否することができますが、一部の機能が
            利用できなくなる場合があります。
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-semibold text-steam-text-light">
            8. プライバシーポリシーの変更
          </h2>
          <p className="text-steam-text/80 leading-relaxed">
            本プライバシーポリシーは、必要に応じて変更されることがあります。
            重要な変更がある場合は、本ページにて通知します。
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-semibold text-steam-text-light">
            9. お問い合わせ
          </h2>
          <p className="text-steam-text/80 leading-relaxed">
            本プライバシーポリシーに関するお問い合わせは、
            サイト内のお問い合わせフォームまたは運営者情報ページに
            記載の連絡先までご連絡ください。
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
