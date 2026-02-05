import type { Metadata, Viewport } from "next";
import "./globals.css";
import { GoogleAnalytics } from "@/components/GoogleAnalytics";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export const metadata: Metadata = {
  title: "Steam積みゲー消化 | 今日やるゲームを決めよう",
  description: "Steamの積みゲーから今日プレイするゲームをランダムに選出。未プレイのゲームを消化しよう！",
  keywords: ["Steam", "積みゲー", "ゲーム", "ランダム", "バックログ"],
  verification: {
    google: "W6HfIdmCjyklc7nV_A0AQDyRvfZb7vyGULJNHMFz_GQ",
  },
  openGraph: {
    title: "Steam積みゲー消化",
    description: "あなたの積みゲーから今日の1本を選ぼう",
    type: "website",
    locale: "ja_JP",
  },
  twitter: {
    card: "summary_large_image",
    title: "Steam積みゲー消化",
    description: "あなたの積みゲーから今日の1本を選ぼう",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body className="antialiased min-h-screen">
        <GoogleAnalytics />
        <div className="min-h-screen flex flex-col">
          {/* ヘッダー */}
          <header className="py-4 px-4 border-b border-steam-blue/20">
            <div className="container-mobile">
              <a href="/" className="flex items-center gap-2">
                <span className="text-2xl">🎮</span>
                <h1 className="text-lg font-bold text-steam-text-light">
                  Steam積みゲー消化
                </h1>
              </a>
            </div>
          </header>

          {/* メインコンテンツ */}
          <main className="flex-1 py-6">
            {children}
          </main>

          {/* フッター */}
          <footer className="py-6 px-4 border-t border-steam-blue/20 text-sm text-steam-text/60">
            <div className="container-mobile space-y-4">
              {/* サポートリンク */}
              <nav className="flex flex-wrap justify-center gap-x-4 gap-y-2">
                <a
                  href="/guide"
                  className="hover:text-steam-blue transition-colors"
                >
                  使い方ガイド
                </a>
                <a
                  href="/faq"
                  className="hover:text-steam-blue transition-colors"
                >
                  よくある質問
                </a>
                <a
                  href="/howto-steamid"
                  className="hover:text-steam-blue transition-colors"
                >
                  Steam ID確認方法
                </a>
                <a
                  href="/feedback"
                  className="hover:text-steam-blue transition-colors"
                >
                  ご意見・ご要望
                </a>
              </nav>

              {/* 法的リンク */}
              <nav className="flex flex-wrap justify-center gap-x-4 gap-y-2">
                <a
                  href="/about"
                  className="hover:text-steam-blue transition-colors"
                >
                  このサイトについて
                </a>
                <a
                  href="/terms"
                  className="hover:text-steam-blue transition-colors"
                >
                  利用規約
                </a>
                <a
                  href="/privacy"
                  className="hover:text-steam-blue transition-colors"
                >
                  プライバシーポリシー
                </a>
              </nav>

              {/* 外部リンク */}
              <p className="text-center">
                <a
                  href="https://store.steampowered.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-steam-blue transition-colors"
                >
                  Steam Store
                </a>
              </p>

              {/* 免責事項 */}
              <p className="text-center text-xs">
                This site is not affiliated with Valve or Steam.
              </p>
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}
