import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'ご意見・ご要望 | Steam積みゲー消化',
  description: 'Steam積みゲー消化アプリへのご意見やご要望をお聞かせください',
};

export default function FeedbackLayout({ children }: { children: React.ReactNode }) {
  return children;
}
