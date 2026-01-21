import { ImageResponse } from 'next/og';
import { NextRequest } from 'next/server';

export const runtime = 'edge';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const name = searchParams.get('name') || 'Steam積みゲー消化';
  const appid = searchParams.get('appid');
  const mode = searchParams.get('mode');

  // モード表示テキスト
  let modeText = '今日の1本';
  if (mode === 'backlog') {
    modeText = '積みゲー消化モード';
  } else if (mode === 'mood') {
    modeText = '気分で選ぶモード';
  }

  // ゲーム画像URL
  const gameImageUrl = appid
    ? `https://cdn.cloudflare.steamstatic.com/steam/apps/${appid}/header.jpg`
    : null;

  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          backgroundColor: '#1b2838',
          padding: '40px',
        }}
      >
        {/* 背景グラデーション */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'linear-gradient(135deg, #171a21 0%, #1b2838 50%, #2a475e 100%)',
          }}
        />

        {/* コンテンツ */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100%',
            position: 'relative',
            zIndex: 1,
          }}
        >
          {/* ヘッダー */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              marginBottom: '20px',
            }}
          >
            <span style={{ fontSize: '48px' }}>🎮</span>
            <span
              style={{
                fontSize: '28px',
                color: '#66c0f4',
                fontWeight: 'bold',
              }}
            >
              Steam積みゲー消化
            </span>
          </div>

          {/* モード */}
          <div
            style={{
              fontSize: '18px',
              color: '#c7d5e0',
              marginBottom: '16px',
              opacity: 0.8,
            }}
          >
            {modeText}
          </div>

          {/* ゲーム画像 */}
          {gameImageUrl && (
            <div
              style={{
                display: 'flex',
                borderRadius: '12px',
                overflow: 'hidden',
                boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4)',
                border: '2px solid rgba(102, 192, 244, 0.3)',
                marginBottom: '24px',
              }}
            >
              <img
                src={gameImageUrl}
                alt=""
                width={460}
                height={215}
                style={{
                  objectFit: 'cover',
                }}
              />
            </div>
          )}

          {/* ゲーム名 */}
          <div
            style={{
              fontSize: '36px',
              fontWeight: 'bold',
              color: '#ffffff',
              textAlign: 'center',
              maxWidth: '80%',
              lineHeight: 1.3,
            }}
          >
            {name}
          </div>

          {/* フッター */}
          <div
            style={{
              position: 'absolute',
              bottom: '30px',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              color: '#c7d5e0',
              fontSize: '16px',
              opacity: 0.6,
            }}
          >
            <span>今日やるゲームを決めよう</span>
          </div>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}
