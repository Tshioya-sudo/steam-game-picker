import { createClient, SupabaseClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || '';

// Supabaseが設定されているかチェック
export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseAnonKey);

// クライアント用（読み取り専用）
export const supabase: SupabaseClient | null = isSupabaseConfigured
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

// サーバー用（書き込み可能）
export const supabaseAdmin: SupabaseClient | null =
  supabaseUrl && supabaseServiceKey
    ? createClient(supabaseUrl, supabaseServiceKey)
    : null;

// 型定義
export interface GameStatistic {
  appid: number;
  game_name: string;
  total_owners: number;
  unplayed_count: number;
  total_playtime_minutes: number;
  updated_at: string;
}

export interface BacklogRanking {
  appid: number;
  game_name: string;
  total_owners: number;
  unplayed_count: number;
  backlog_rate: number;
  avg_playtime_hours: number;
  updated_at: string;
}

export interface StatSession {
  id: string;
  session_hash: string;
  games_count: number;
  created_at: string;
}
