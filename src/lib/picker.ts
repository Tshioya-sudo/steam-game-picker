import { SteamGame, PickMode, MoodCategory, GameMetadata, PickResult } from '@/types';

// 未プレイとみなすプレイ時間の閾値（分）
const BACKLOG_THRESHOLD_MINUTES = 30; // 30分未満は未プレイ扱い

/**
 * 加重ランダム選択のためのユーティリティ
 */
function weightedRandomSelect<T>(items: T[], weights: number[]): T {
  const totalWeight = weights.reduce((sum, w) => sum + w, 0);
  let random = Math.random() * totalWeight;

  for (let i = 0; i < items.length; i++) {
    random -= weights[i];
    if (random <= 0) {
      return items[i];
    }
  }

  return items[items.length - 1];
}

/**
 * Backlogモード: 未プレイ・ほぼ未プレイのゲームをフィルタリング
 */
export function filterBacklogGames(games: SteamGame[]): SteamGame[] {
  return games.filter((game) => game.playtime_forever < BACKLOG_THRESHOLD_MINUTES);
}

/**
 * 気分（Mood）でゲームをフィルタリング
 */
export function filterByMood(
  games: SteamGame[],
  mood: MoodCategory,
  metadata: Record<number, GameMetadata>
): SteamGame[] {
  return games.filter((game) => {
    const meta = metadata[game.appid];
    if (!meta || !meta.mood) return false;
    return meta.mood.includes(mood);
  });
}

/**
 * ゲームリストからランダムに1つ選択
 */
export function pickRandomGame(games: SteamGame[]): SteamGame | null {
  if (games.length === 0) return null;
  const index = Math.floor(Math.random() * games.length);
  return games[index];
}

/**
 * プレイ時間に基づいた加重ランダム選択
 * プレイ時間が短いゲームほど選ばれやすくなる
 */
export function pickWeightedByPlaytime(games: SteamGame[]): SteamGame | null {
  if (games.length === 0) return null;

  // プレイ時間の最大値を取得（正規化用）
  const maxPlaytime = Math.max(...games.map((g) => g.playtime_forever), 1);

  // 重みを計算（プレイ時間が短いほど重みが大きい）
  const weights = games.map((game) => {
    const normalizedPlaytime = game.playtime_forever / maxPlaytime;
    // 1 - normalizedPlaytime で逆転、最小値0.1を保証
    return Math.max(1 - normalizedPlaytime, 0.1);
  });

  return weightedRandomSelect(games, weights);
}

/**
 * メインの抽選ロジック
 */
export function pickGame(
  games: SteamGame[],
  mode: PickMode,
  mood?: MoodCategory,
  metadata?: Record<number, GameMetadata>,
  excludeAppIds?: number[]
): PickResult | null {
  // 除外リストがあればフィルタリング
  let candidates = excludeAppIds
    ? games.filter((g) => !excludeAppIds.includes(g.appid))
    : [...games];

  // モードに応じたフィルタリング
  switch (mode) {
    case 'backlog':
      candidates = filterBacklogGames(candidates);
      break;

    case 'mood':
      if (mood && metadata) {
        candidates = filterByMood(candidates, mood, metadata);
      }
      break;

    case 'daily':
    default:
      // 全ゲームが対象
      break;
  }

  if (candidates.length === 0) {
    return null;
  }

  // 選択
  const selectedGame =
    mode === 'backlog'
      ? pickRandomGame(candidates) // Backlogは完全ランダム
      : pickWeightedByPlaytime(candidates); // 他はプレイ時間加重

  if (!selectedGame) return null;

  return {
    game: selectedGame,
    mode,
    mood,
    timestamp: Date.now(),
  };
}

/**
 * 候補ゲーム数を取得
 */
export function getCandidateCount(
  games: SteamGame[],
  mode: PickMode,
  mood?: MoodCategory,
  metadata?: Record<number, GameMetadata>
): number {
  switch (mode) {
    case 'backlog':
      return filterBacklogGames(games).length;

    case 'mood':
      if (mood && metadata) {
        return filterByMood(games, mood, metadata).length;
      }
      return 0;

    case 'daily':
    default:
      return games.length;
  }
}

/**
 * ゲームの統計情報を計算
 */
export function calculateGameStats(games: SteamGame[]) {
  const totalGames = games.length;
  const unplayedGames = filterBacklogGames(games).length;
  const totalPlaytime = games.reduce((sum, g) => sum + g.playtime_forever, 0);
  const avgPlaytime = totalGames > 0 ? totalPlaytime / totalGames : 0;

  return {
    totalGames,
    unplayedGames,
    playedGames: totalGames - unplayedGames,
    totalPlaytimeHours: Math.round(totalPlaytime / 60),
    avgPlaytimeHours: Math.round(avgPlaytime / 60),
    unplayedRate: totalGames > 0 ? Math.round((unplayedGames / totalGames) * 100) : 0,
  };
}
