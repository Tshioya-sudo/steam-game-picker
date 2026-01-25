import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "利用規約 | Steam積みゲー消化",
  description: "Steam積みゲー消化アプリの利用規約について",
};

export default function TermsPage() {
  return (
    <div className="container-mobile">
      <div className="card-steam p-6 space-y-6">
        <h1 className="text-2xl font-bold text-steam-text-light">
          利用規約
        </h1>

        <p className="text-sm text-steam-text/60">
          最終更新日: 2025年1月
        </p>

        <section className="space-y-3">
          <h2 className="text-lg font-semibold text-steam-text-light">
            1. はじめに
          </h2>
          <p className="text-steam-text/80 leading-relaxed">
            この利用規約（以下「本規約」）は、Steam積みゲー消化（以下「本サービス」）の
            利用条件を定めるものです。ユーザーの皆様には、本規約に同意いただいた上で、
            本サービスをご利用いただきます。
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-semibold text-steam-text-light">
            2. サービスの内容
          </h2>
          <p className="text-steam-text/80 leading-relaxed">
            本サービスは、ユーザーのSteamゲームライブラリから、プレイするゲームを
            ランダムに選出する無料のWebサービスです。以下の機能を提供します：
          </p>
          <ul className="list-disc list-inside space-y-2 text-steam-text/80">
            <li>Steam IDを使用したゲームライブラリの取得</li>
            <li>積みゲー（未プレイ・ほぼ未プレイのゲーム）の抽選</li>
            <li>気分に合わせたゲームのフィルタリングと抽選</li>
            <li>抽選結果のSNS共有機能</li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-semibold text-steam-text-light">
            3. 利用条件
          </h2>
          <p className="text-steam-text/80 leading-relaxed">
            本サービスを利用するには、以下の条件を満たす必要があります：
          </p>
          <ul className="list-disc list-inside space-y-2 text-steam-text/80">
            <li>有効なSteamアカウントを所持していること</li>
            <li>Steamプロフィールのゲーム情報が公開設定になっていること</li>
            <li>本規約に同意していること</li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-semibold text-steam-text-light">
            4. 禁止事項
          </h2>
          <p className="text-steam-text/80 leading-relaxed">
            ユーザーは、本サービスの利用にあたり、以下の行為を行ってはなりません：
          </p>
          <ul className="list-disc list-inside space-y-2 text-steam-text/80">
            <li>他人のSteam IDを無断で使用する行為</li>
            <li>本サービスのサーバーに過度な負荷をかける行為</li>
            <li>本サービスの運営を妨害する行為</li>
            <li>不正アクセスやハッキング行為</li>
            <li>本サービスを商業目的で無断利用する行為</li>
            <li>法令または公序良俗に反する行為</li>
            <li>その他、運営者が不適切と判断する行為</li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-semibold text-steam-text-light">
            5. 免責事項
          </h2>
          <p className="text-steam-text/80 leading-relaxed">
            本サービスは「現状のまま」提供されます。運営者は以下について
            一切の責任を負いません：
          </p>
          <ul className="list-disc list-inside space-y-2 text-steam-text/80">
            <li>本サービスの利用により生じた損害</li>
            <li>サービスの中断、停止、終了による損害</li>
            <li>ゲーム情報の正確性や完全性</li>
            <li>第三者のサービス（Steam等）の仕様変更による影響</li>
            <li>ユーザー間またはユーザーと第三者間のトラブル</li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-semibold text-steam-text-light">
            6. 知的財産権
          </h2>
          <p className="text-steam-text/80 leading-relaxed">
            本サービスに関する知的財産権は、運営者または正当な権利者に帰属します。
            Steamおよび関連する商標は、Valve Corporationの財産です。
            本サービスはValve CorporationおよびSteamとは一切関係ありません。
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-semibold text-steam-text-light">
            7. サービスの変更・終了
          </h2>
          <p className="text-steam-text/80 leading-relaxed">
            運営者は、ユーザーへの事前通知なく、本サービスの内容を変更し、
            または本サービスの提供を終了することができます。これによりユーザーに
            生じた損害について、運営者は一切の責任を負いません。
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-semibold text-steam-text-light">
            8. 利用規約の変更
          </h2>
          <p className="text-steam-text/80 leading-relaxed">
            運営者は、必要に応じて本規約を変更することができます。
            変更後の規約は、本ページに掲載した時点から効力を生じるものとします。
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-semibold text-steam-text-light">
            9. 準拠法と裁判管轄
          </h2>
          <p className="text-steam-text/80 leading-relaxed">
            本規約の解釈および適用は、日本法に準拠します。
            本サービスに関連して生じた紛争については、
            運営者の所在地を管轄する裁判所を第一審の専属的合意管轄裁判所とします。
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-semibold text-steam-text-light">
            10. お問い合わせ
          </h2>
          <p className="text-steam-text/80 leading-relaxed">
            本規約に関するお問い合わせは、運営者情報ページに記載の
            連絡先までご連絡ください。
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
