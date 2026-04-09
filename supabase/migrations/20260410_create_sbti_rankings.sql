-- SBTI Rankings 表：存储用户提交的人格测试结果
create table if not exists sbti_rankings (
  id            bigint generated always as identity primary key,
  submission_id text        not null,
  type_code     text        not null,
  raw_scores    jsonb       not null default '{}',
  levels        jsonb       not null default '{}',
  similarity    smallint    not null default 0,
  created_at    timestamptz not null default now(),

  constraint sbti_rankings_submission_id_unique unique (submission_id)
);

-- 按 type_code 聚合查询排行榜
create index if not exists idx_sbti_rankings_type_code on sbti_rankings (type_code);

-- 按时间排序
create index if not exists idx_sbti_rankings_created_at on sbti_rankings (created_at desc);

-- RLS：允许匿名 insert，允许 select（排行榜公开数据）
alter table sbti_rankings enable row level security;

create policy "Allow anonymous insert"
  on sbti_rankings for insert
  to anon
  with check (true);

create policy "Allow public read"
  on sbti_rankings for select
  to anon
  using (true);
