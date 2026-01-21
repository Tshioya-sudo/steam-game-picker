import { PickResult, SteamGame } from '@/types';

const STORAGE_KEYS = {
  STEAM_ID: 'steam_picker_steam_id',
  GAMES_CACHE: 'steam_picker_games_cache',
  PICK_HISTORY: 'steam_picker_history',
  LAST_PICK: 'steam_picker_last_pick',
};

const CACHE_DURATION = 24 * 60 * 60 * 1000; // 24時間

interface CachedGames {
  steamId: string;
  games: SteamGame[];
  timestamp: number;
}

/**
 * LocalStorageが利用可能かチェック
 */
function isStorageAvailable(): boolean {
  if (typeof window === 'undefined') return false;
  try {
    const test = '__storage_test__';
    window.localStorage.setItem(test, test);
    window.localStorage.removeItem(test);
    return true;
  } catch {
    return false;
  }
}

/**
 * Steam IDを保存
 */
export function saveSteamId(steamId: string): void {
  if (!isStorageAvailable()) return;
  localStorage.setItem(STORAGE_KEYS.STEAM_ID, steamId);
}

/**
 * 保存されたSteam IDを取得
 */
export function getSavedSteamId(): string | null {
  if (!isStorageAvailable()) return null;
  return localStorage.getItem(STORAGE_KEYS.STEAM_ID);
}

/**
 * ゲームリストをキャッシュに保存
 */
export function cacheGames(steamId: string, games: SteamGame[]): void {
  if (!isStorageAvailable()) return;

  const cached: CachedGames = {
    steamId,
    games,
    timestamp: Date.now(),
  };

  try {
    localStorage.setItem(STORAGE_KEYS.GAMES_CACHE, JSON.stringify(cached));
  } catch (error) {
    // ストレージがいっぱいの場合は古いデータを削除
    console.warn('Failed to cache games, clearing old data:', error);
    clearGamesCache();
  }
}

/**
 * キャッシュされたゲームリストを取得
 */
export function getCachedGames(steamId: string): SteamGame[] | null {
  if (!isStorageAvailable()) return null;

  const data = localStorage.getItem(STORAGE_KEYS.GAMES_CACHE);
  if (!data) return null;

  try {
    const cached: CachedGames = JSON.parse(data);

    // Steam IDが一致し、キャッシュが有効期限内か確認
    if (
      cached.steamId === steamId &&
      Date.now() - cached.timestamp < CACHE_DURATION
    ) {
      return cached.games;
    }
  } catch {
    // パースエラー時はキャッシュをクリア
    clearGamesCache();
  }

  return null;
}

/**
 * ゲームキャッシュをクリア
 */
export function clearGamesCache(): void {
  if (!isStorageAvailable()) return;
  localStorage.removeItem(STORAGE_KEYS.GAMES_CACHE);
}

/**
 * 抽選履歴を保存
 */
export function savePickHistory(result: PickResult): void {
  if (!isStorageAvailable()) return;

  const history = getPickHistory();
  history.unshift(result);

  // 最新50件のみ保持
  const trimmed = history.slice(0, 50);

  try {
    localStorage.setItem(STORAGE_KEYS.PICK_HISTORY, JSON.stringify(trimmed));
    localStorage.setItem(STORAGE_KEYS.LAST_PICK, JSON.stringify(result));
  } catch {
    // ストレージがいっぱいの場合は古い履歴を削除
    localStorage.setItem(STORAGE_KEYS.PICK_HISTORY, JSON.stringify(trimmed.slice(0, 10)));
  }
}

/**
 * 抽選履歴を取得
 */
export function getPickHistory(): PickResult[] {
  if (!isStorageAvailable()) return [];

  const data = localStorage.getItem(STORAGE_KEYS.PICK_HISTORY);
  if (!data) return [];

  try {
    return JSON.parse(data);
  } catch {
    return [];
  }
}

/**
 * 最後の抽選結果を取得
 */
export function getLastPick(): PickResult | null {
  if (!isStorageAvailable()) return null;

  const data = localStorage.getItem(STORAGE_KEYS.LAST_PICK);
  if (!data) return null;

  try {
    return JSON.parse(data);
  } catch {
    return null;
  }
}

/**
 * すべてのデータをクリア
 */
export function clearAllData(): void {
  if (!isStorageAvailable()) return;
  Object.values(STORAGE_KEYS).forEach((key) => {
    localStorage.removeItem(key);
  });
}
