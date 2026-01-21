import type { Metadata, Viewport } from "next";
import "./globals.css";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export const metadata: Metadata = {
  title: "Steam積みゲー消化 | 今日やるゲームを決めよう",
  description: "Steamの積みゲーから今日プレイするゲームをランダムに選出。未プレイのゲームを消化しよう！",
  keywords: ["Steam", "積みゲー", "ゲーム", "ランダム", "バックログ"],
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
          <footer className="py-4 px-4 border-t border-steam-blue/20 text-center text-sm text-steam-text/60">
            <div className="container-mobile">
              <p>This site is not affiliated with Valve or Steam.</p>
              <p className="mt-1">
                <a
                  href="https://store.steampowered.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-steam-blue transition-colors"
                >
                  Steam Store
                </a>
              </p>
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}
