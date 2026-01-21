import { SteamGame, SteamIdFormat } from '@/types';

const STEAM_API_BASE = 'https://api.steampowered.com';

/**
 * Steam IDの形式を判定する
 */
export function detectSteamIdFormat(input: string): SteamIdFormat | null {
  const trimmed = input.trim();

  // SteamID64（17桁の数字）
  if (/^\d{17}$/.test(trimmed)) {
    return 'steamid64';
  }

  // プロフィールURL
  const profileUrlMatch = trimmed.match(
    /(?:https?:\/\/)?steamcommunity\.com\/(?:profiles\/(\d{17})|id\/([a-zA-Z0-9_-]+))/
  );
  if (profileUrlMatch) {
    return profileUrlMatch[1] ? 'steamid64' : 'customurl';
  }

  // カスタムURL（英数字とアンダースコア、ハイフンのみ）
  if (/^[a-zA-Z0-9_-]{2,32}$/.test(trimmed)) {
    return 'customurl';
  }

  return null;
}

/**
 * 入力からSteamID64を抽出または特定する
 */
export function extractSteamId(input: string): { id: string; format: SteamIdFormat } | null {
  const trimmed = input.trim();
  const format = detectSteamIdFormat(trimmed);

  if (!format) return null;

  // プロフィールURLからIDを抽出
  const profileUrlMatch = trimmed.match(
    /(?:https?:\/\/)?steamcommunity\.com\/(?:profiles\/(\d{17})|id\/([a-zA-Z0-9_-]+))/
  );

  if (profileUrlMatch) {
    if (profileUrlMatch[1]) {
      return { id: profileUrlMatch[1], format: 'steamid64' };
    }
    if (profileUrlMatch[2]) {
      return { id: profileUrlMatch[2], format: 'customurl' };
    }
  }

  // SteamID64
  if (format === 'steamid64') {
    return { id: trimmed, format: 'steamid64' };
  }

  // カスタムURL
  return { id: trimmed, format: 'customurl' };
}

/**
 * Steam Web APIでカスタムURLからSteamID64を解決する（サーバーサイドのみ）
 */
export async function resolveVanityUrl(vanityUrl: string): Promise<string | null> {
  const apiKey = process.env.STEAM_API_KEY;
  if (!apiKey) {
    throw new Error('STEAM_API_KEY is not configured');
  }

  const url = `${STEAM_API_BASE}/ISteamUser/ResolveVanityURL/v1/?key=${apiKey}&vanityurl=${encodeURIComponent(vanityUrl)}`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (data.response?.success === 1) {
      return data.response.steamid;
    }
    return null;
  } catch (error) {
    console.error('Error resolving vanity URL:', error);
    return null;
  }
}

/**
 * ユーザーの所持ゲームリストを取得する（サーバーサイドのみ）
 */
export async function getOwnedGames(steamId64: string): Promise<SteamGame[]> {
  const apiKey = process.env.STEAM_API_KEY;
  if (!apiKey) {
    throw new Error('STEAM_API_KEY is not configured');
  }

  const url = `${STEAM_API_BASE}/IPlayerService/GetOwnedGames/v1/?key=${apiKey}&steamid=${steamId64}&include_appinfo=1&include_played_free_games=1`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (data.response?.games) {
      return data.response.games.map((game: Record<string, unknown>) => ({
        appid: game.appid as number,
        name: game.name as string,
        playtime_forever: game.playtime_forever as number || 0,
        playtime_2weeks: game.playtime_2weeks as number | undefined,
        img_icon_url: game.img_icon_url as string | undefined,
      }));
    }

    return [];
  } catch (error) {
    console.error('Error fetching owned games:', error);
    return [];
  }
}

/**
 * ゲームのヘッダー画像URLを生成
 */
export function getGameHeaderUrl(appid: number): string {
  return `https://cdn.cloudflare.steamstatic.com/steam/apps/${appid}/header.jpg`;
}

/**
 * ゲームのカプセル画像URL（縦長）を生成
 */
export function getGameCapsuleUrl(appid: number): string {
  return `https://cdn.cloudflare.steamstatic.com/steam/apps/${appid}/library_600x900.jpg`;
}

/**
 * Steamストアページへのリンクを生成
 */
export function getSteamStoreUrl(appid: number): string {
  return `https://store.steampowered.com/app/${appid}`;
}

/**
 * Steam起動用のプロトコルリンクを生成
 */
export function getSteamRunUrl(appid: number): string {
  return `steam://run/${appid}`;
}
