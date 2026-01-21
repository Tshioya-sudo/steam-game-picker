import { Metadata } from 'next';
import { ResultPageClient } from './ResultPageClient';

interface PageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export async function generateMetadata({ searchParams }: PageProps): Promise<Metadata> {
  const params = await searchParams;
  const name = typeof params.name === 'string' ? params.name : 'Steam積みゲー消化';
  const appid = typeof params.appid === 'string' ? params.appid : '';
  const mode = typeof params.mode === 'string' ? params.mode : '';

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://localhost:3000';

  // OGP画像URL
  const ogImageUrl = new URL('/api/og', siteUrl);
  ogImageUrl.searchParams.set('name', name);
  if (appid) ogImageUrl.searchParams.set('appid', appid);
  if (mode) ogImageUrl.searchParams.set('mode', mode);

  const title = `${name} | Steam積みゲー消化`;
  const description = `今日やるゲームは「${name}」に決めた！あなたも積みゲーを消化しよう。`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: 'website',
      locale: 'ja_JP',
      images: [
        {
          url: ogImageUrl.toString(),
          width: 1200,
          height: 630,
          alt: name,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ogImageUrl.toString()],
    },
  };
}

export default async function ResultPage({ searchParams }: PageProps) {
  const params = await searchParams;
  return <ResultPageClient searchParams={params} />;
}
