BEGIN;

CREATE TABLE IF NOT EXISTS sbti_rankings (
  id bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  submission_id text NOT NULL UNIQUE,
  type_code text NOT NULL,
  raw_scores jsonb NOT NULL DEFAULT '{}',
  levels jsonb NOT NULL DEFAULT '{}',
  similarity smallint NOT NULL DEFAULT 0 CHECK (similarity BETWEEN 0 AND 100),
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_sbti_rankings_type_code ON sbti_rankings (type_code);
CREATE INDEX IF NOT EXISTS idx_sbti_rankings_created_at ON sbti_rankings (created_at DESC);

CREATE TABLE IF NOT EXISTS mini_test_activity (
  id bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  test_id text NOT NULL,
  result_id text NOT NULL,
  session_id text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (session_id, test_id)
);

CREATE INDEX IF NOT EXISTS idx_mini_test_activity_test_id ON mini_test_activity (test_id);
CREATE INDEX IF NOT EXISTS idx_mini_test_activity_created_at ON mini_test_activity (created_at DESC);

COMMIT;
