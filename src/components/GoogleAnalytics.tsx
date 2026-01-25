'use client';

import Script from 'next/script';

const GA_ID = process.env.NEXT_PUBLIC_GA_ID;

export function GoogleAnalytics() {
  // GA IDが設定されていない場合は何も表示しない
  if (!GA_ID || GA_ID === 'G-XXXXXXXXXX') {
    return null;
  }

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GA_ID}', {
            page_path: window.location.pathname,
          });
        `}
      </Script>
    </>
  );
}

// カスタムイベントを送信するユーティリティ関数
export function sendGAEvent(action: string, category: string, label?: string, value?: number) {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value,
    });
  }
}

// ページビューを送信するユーティリティ関数
export function sendPageView(url: string) {
  if (typeof window !== 'undefined' && window.gtag && GA_ID) {
    window.gtag('config', GA_ID, {
      page_path: url,
    });
  }
}

// TypeScript用の型定義
declare global {
  interface Window {
    gtag: (
      command: 'config' | 'event' | 'js',
      targetId: string | Date,
      config?: Record<string, unknown>
    ) => void;
    dataLayer: unknown[];
  }
}
