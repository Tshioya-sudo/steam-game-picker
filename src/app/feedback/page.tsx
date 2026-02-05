'use client';

import { useState } from 'react';

const CATEGORIES = [
  { id: 'bug', label: 'バグ報告', icon: '🐛' },
  { id: 'opinion', label: 'ご意見', icon: '💬' },
  { id: 'request', label: 'ご要望', icon: '✨' },
] as const;

type CategoryId = typeof CATEGORIES[number]['id'];
type Status = 'idle' | 'sending' | 'success' | 'error';

export default function FeedbackPage() {
  const [category, setCategory] = useState<CategoryId | null>(null);
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState<Status>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!category || !message.trim()) return;

    setStatus('sending');
    try {
      const res = await fetch('/api/feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ category, message }),
      });
      if (!res.ok) throw new Error('Failed');
      setStatus('success');
      setMessage('');
      setCategory(null);
    } catch {
      setStatus('error');
    }
  };

  if (status === 'success') {
    return (
      <div className="container-mobile py-8">
        <div className="card-steam rounded-xl p-6 text-center space-y-4">
          <p className="text-4xl">✅</p>
          <p className="text-steam-text-light font-semibold">ありがとうございます</p>
          <p className="text-steam-text/70 text-sm">
            お知らせいただいたことを参考にさせていただきます。
          </p>
          <button
            onClick={() => setStatus('idle')}
            className="text-steam-blue hover:underline text-sm"
          >
            もう一つ送信する
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container-mobile py-8 space-y-6">
      <div className="text-center space-y-2">
        <h1 className="text-xl font-bold text-steam-text-light">ご意見・ご要望</h1>
        <p className="text-steam-text/70 text-sm">
          サイトについてのご意見やご要望をお聞かせください
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* カテゴリ選択 */}
        <div className="space-y-2">
          <label className="text-sm text-steam-text/80">カテゴリ</label>
          <div className="grid grid-cols-3 gap-2">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => setCategory(cat.id)}
                className={[
                  'card-steam rounded-lg p-3 text-center transition-all',
                  category === cat.id
                    ? 'border-steam-blue shadow-lg shadow-steam-blue/20'
                    : 'opacity-60 hover:opacity-100',
                ].join(' ')}
              >
                <p className="text-xl">{cat.icon}</p>
                <p className="text-xs text-steam-text-light mt-1">{cat.label}</p>
              </button>
            ))}
          </div>
        </div>

        {/* メッセージ */}
        <div className="space-y-2">
          <label className="text-sm text-steam-text/80">メッセージ</label>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="ご意見やご要望をお書きください…"
            rows={5}
            maxLength={1000}
            className={[
              'w-full rounded-lg px-3 py-2 text-sm bg-steam-darker border text-steam-text-light placeholder-steam-text/40',
              'focus:outline-none focus:border-steam-blue focus:ring-1 focus:ring-steam-blue',
              'border-steam-blue/30 resize-none',
            ].join(' ')}
          />
          <p className="text-xs text-steam-text/40 text-right">{message.length}/1000</p>
        </div>

        {/* エラー表示 */}
        {status === 'error' && (
          <p className="text-red-400 text-sm">
            送信に失敗しました。もう一度お試しください。
          </p>
        )}

        {/* 送信ボタン */}
        <button
          type="submit"
          disabled={!category || !message.trim() || status === 'sending'}
          className={[
            'w-full rounded-lg py-2.5 text-sm font-semibold transition-all',
            category && message.trim() && status !== 'sending'
              ? 'bg-steam-blue text-steam-darker hover:brightness-110'
              : 'bg-steam-blue/30 text-steam-text/40 cursor-not-allowed',
          ].join(' ')}
        >
          {status === 'sending' ? '送信中…' : '送信する'}
        </button>
      </form>
    </div>
  );
}
