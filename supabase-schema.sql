-- Steam積みゲー統計用テーブル

-- ゲーム統計テーブル（集計済みデータ）
CREATE TABLE game_statistics (
  appid INTEGER PRIMARY KEY,
  game_name TEXT NOT NULL,
  total_owners INTEGER DEFAULT 0,
  unplayed_count INTEGER DEFAULT 0,
  total_playtime_minutes BIGINT DEFAULT 0,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ユーザーセッション追跡（重複防止用、匿名）
CREATE TABLE stat_sessions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  session_hash TEXT UNIQUE NOT NULL,  -- ライブラリのハッシュ
  games_count INTEGER NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- インデックス
CREATE INDEX idx_game_statistics_unplayed ON game_statistics(unplayed_count DESC);
CREATE INDEX idx_game_statistics_owners ON game_statistics(total_owners DESC);
CREATE INDEX idx_stat_sessions_hash ON stat_sessions(session_hash);

-- Row Level Security を有効化
ALTER TABLE game_statistics ENABLE ROW LEVEL SECURITY;
ALTER TABLE stat_sessions ENABLE ROW LEVEL SECURITY;

-- 匿名ユーザーが読み取り可能に
CREATE POLICY "Allow anonymous read" ON game_statistics FOR SELECT USING (true);
CREATE POLICY "Allow anonymous read sessions" ON stat_sessions FOR SELECT USING (true);

-- サーバーサイド（service_role）のみ書き込み可能
CREATE POLICY "Allow service insert" ON game_statistics FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow service update" ON game_statistics FOR UPDATE USING (true);
CREATE POLICY "Allow service insert sessions" ON stat_sessions FOR INSERT WITH CHECK (true);

-- 積みゲー率計算用ビュー
CREATE VIEW game_backlog_ranking AS
SELECT
  appid,
  game_name,
  total_owners,
  unplayed_count,
  CASE
    WHEN total_owners > 0 THEN ROUND((unplayed_count::NUMERIC / total_owners) * 100, 1)
    ELSE 0
  END as backlog_rate,
  CASE
    WHEN total_owners > 0 AND unplayed_count > 0
    THEN ROUND(total_playtime_minutes::NUMERIC / (total_owners - unplayed_count) / 60, 1)
    ELSE 0
  END as avg_playtime_hours,
  updated_at
FROM game_statistics
WHERE total_owners >= 3  -- 最低3人以上の所有者
ORDER BY backlog_rate DESC, total_owners DESC;
