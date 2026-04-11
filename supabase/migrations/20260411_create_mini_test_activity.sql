-- Mini-test activity tracking (for hot-ranking algorithm)
create table if not exists mini_test_activity (
  id          bigint generated always as identity primary key,
  test_id     text        not null,
  result_id   text        not null,
  session_id  text        not null,
  created_at  timestamptz not null default now(),

  constraint mini_test_activity_session_test_unique unique (session_id, test_id)
);

create index if not exists idx_mini_test_activity_test_id
  on mini_test_activity (test_id);

create index if not exists idx_mini_test_activity_created_at
  on mini_test_activity (created_at desc);

-- RLS: anonymous insert + public read
alter table mini_test_activity enable row level security;

create policy "Allow anonymous insert"
  on mini_test_activity for insert
  to anon
  with check (true);

create policy "Allow public read"
  on mini_test_activity for select
  to anon
  using (true);
