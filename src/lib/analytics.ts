import { AnalyticsEvent, PickMode, MoodCategory } from '@/types';

/**
 * 文字列をSHA-256でハッシュ化（匿名化用）
 */
async function hashString(str: string): Promise<string> {
  if (typeof window === 'undefined') return '';

  const encoder = new TextEncoder();
  const data = encoder.encode(str);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map((b) => b.toString(16).padStart(2, '0')).join('');
}

/**
 * イベントをローカルに記録
 * 注: 実際の本番環境ではサーバーにPOSTする
 */
async function logEvent(event: AnalyticsEvent): Promise<void> {
  if (typeof window === 'undefined') return;

  // 開発環境ではコンソールに出力
  if (process.env.NODE_ENV === 'development') {
    console.log('[Analytics]', event);
  }

  // ローカルストレージに保存（後でバッチ送信用）
  try {
    const stored = localStorage.getItem('analytics_events');
    const events: AnalyticsEvent[] = stored ? JSON.parse(stored) : [];
    events.push(event);

    // 最大100イベントまで保持
    const trimmed = events.slice(-100);
    localStorage.setItem('analytics_events', JSON.stringify(trimmed));
  } catch {
    // ストレージエラーは無視
  }
}

/**
 * ページビューを記録
 */
export async function trackPageView(_page: string): Promise<void> {
  await logEvent({
    event: 'page_view',
    timestamp: Date.now(),
  });
}

/**
 * Steam ID入力を記録（ハッシュ化）
 */
export async function trackSteamIdInput(steamId: string): Promise<void> {
  const hashedId = await hashString(steamId);
  await logEvent({
    event: 'steam_id_input',
    steamId: hashedId.substring(0, 16), // 最初の16文字のみ
    timestamp: Date.now(),
  });
}

/**
 * 抽選実行を記録
 */
export async function trackPick(
  mode: PickMode,
  mood?: MoodCategory,
  appid?: number
): Promise<void> {
  await logEvent({
    event: 'pick',
    mode,
    mood,
    appid,
    timestamp: Date.now(),
  });
}

/**
 * リトライを記録
 */
export async function trackRetry(mode: PickMode, mood?: MoodCategory): Promise<void> {
  await logEvent({
    event: 'retry',
    mode,
    mood,
    timestamp: Date.now(),
  });
}

/**
 * X共有を記録
 */
export async function trackShare(appid: number): Promise<void> {
  await logEvent({
    event: 'share',
    appid,
    timestamp: Date.now(),
  });
}

/**
 * Steamで見るリンククリックを記録
 */
export async function trackSteamLink(appid: number): Promise<void> {
  await logEvent({
    event: 'steam_link',
    appid,
    timestamp: Date.now(),
  });
}

/**
 * 広告クリックを記録
 */
export async function trackAdClick(_adType: string): Promise<void> {
  await logEvent({
    event: 'ad_click',
    timestamp: Date.now(),
  });
}

/**
 * エラーを記録
 */
export async function trackError(errorType: string, message: string): Promise<void> {
  await logEvent({
    event: 'error',
    timestamp: Date.now(),
  });

  // 開発環境では詳細をコンソールに出力
  if (process.env.NODE_ENV === 'development') {
    console.error(`[Analytics Error] ${errorType}: ${message}`);
  }
}

/**
 * 蓄積されたイベントを取得（バッチ送信用）
 */
export function getStoredEvents(): AnalyticsEvent[] {
  if (typeof window === 'undefined') return [];

  try {
    const stored = localStorage.getItem('analytics_events');
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
}

/**
 * 蓄積されたイベントをクリア
 */
export function clearStoredEvents(): void {
  if (typeof window === 'undefined') return;
  localStorage.removeItem('analytics_events');
}
