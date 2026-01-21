// Steam API関連の型定義

export interface SteamGame {
  appid: number;
  name: string;
  playtime_forever: number; // 総プレイ時間（分）
  playtime_2weeks?: number; // 過去2週間のプレイ時間（分）
  img_icon_url?: string;
  img_logo_url?: string;
}

export interface GameMetadata {
  appid: number;
  genres?: string[];
  tags?: string[];
  mood?: MoodCategory[];
}

export type MoodCategory = 'relax' | 'thrill' | 'think' | 'story' | 'party';

export interface MoodOption {
  id: MoodCategory;
  label: string;
  labelJa: string;
  icon: string;
  description: string;
}

export const MOOD_OPTIONS: MoodOption[] = [
  { id: 'relax', label: 'Relax', labelJa: 'リラックス', icon: '🌿', description: 'のんびりプレイしたい' },
  { id: 'thrill', label: 'Thrill', labelJa: 'スリル', icon: '⚡', description: 'ドキドキしたい' },
  { id: 'think', label: 'Think', labelJa: '頭を使う', icon: '🧩', description: 'じっくり考えたい' },
  { id: 'story', label: 'Story', labelJa: '物語', icon: '📖', description: 'ストーリーを楽しみたい' },
  { id: 'party', label: 'Party', labelJa: 'みんなで', icon: '🎉', description: '友達と遊びたい' },
];

export type PickMode = 'backlog' | 'daily' | 'mood';

export interface PickModeOption {
  id: PickMode;
  label: string;
  labelJa: string;
  icon: string;
  description: string;
}

export const PICK_MODE_OPTIONS: PickModeOption[] = [
  { id: 'backlog', label: 'Backlog', labelJa: '積みゲー消化', icon: '📚', description: '未プレイ・ほぼ未プレイのゲームから' },
  { id: 'daily', label: 'Daily Pick', labelJa: '今日の1本', icon: '🎲', description: '全ゲームからランダムに' },
  { id: 'mood', label: 'Mood', labelJa: '気分で選ぶ', icon: '💭', description: '今の気分に合わせて' },
];

export interface PickResult {
  game: SteamGame;
  mode: PickMode;
  mood?: MoodCategory;
  timestamp: number;
}

export interface ShareParams {
  appid: number;
  name: string;
  mode: PickMode;
  mood?: MoodCategory;
}

export interface AnalyticsEvent {
  event: string;
  steamId?: string; // ハッシュ化
  mode?: PickMode;
  mood?: MoodCategory;
  appid?: number;
  timestamp: number;
}

// Steam ID入力フォーマット
export type SteamIdFormat = 'steamid64' | 'customurl' | 'profileurl';

export interface ResolvedSteamId {
  steamid64: string;
  format: SteamIdFormat;
}
