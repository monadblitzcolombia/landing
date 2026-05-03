-- Applications table for mentor and judge applications
-- Run this in your Supabase SQL Editor

create table if not exists applications (
  id uuid primary key default gen_random_uuid(),
  created_at timestamp with time zone default now(),

  -- Application type
  role text not null check (role in ('mentor', 'judge')),

  -- Basic info (both roles)
  full_name text not null,
  email text not null,
  phone text,
  linkedin text,
  twitter text,
  instagram text,

  -- Availability (both roles)
  city text not null check (city in ('medellin', 'bogota', 'both')),
  availability text,

  -- Mentor-specific fields
  mentor_primary_skills text,
  mentor_monad_experience boolean,
  mentor_monad_experience_details text,
  mentor_blockchain_experience text,
  mentor_non_technical_skills text,
  mentor_previous_experience boolean,
  mentor_previous_details text,
  mentor_bio text,
  mentor_why text,
  mentor_team_commitment text,

  -- Judge-specific fields
  judge_current_role text,
  judge_years_blockchain integer,
  judge_years_total integer,
  judge_bio text,
  judge_technical_level text check (judge_technical_level in ('highly_technical', 'moderate', 'business_focused')),
  judge_expertise_areas text[],
  judge_specific_experience text[],
  judge_previous_experience boolean,
  judge_previous_details text,
  judge_criteria_ranking jsonb,
  judge_conflicts text,
  judge_other_conflicts text,
  judge_why text,

  -- Review fields
  status text not null default 'pending' check (status in ('pending', 'approved', 'rejected')),
  reviewed_at timestamp with time zone,
  reviewed_by uuid,
  reviewer_notes text,

  -- Constraints
  constraint applications_email_role_unique unique (email, role)
);

-- Row Level Security
alter table applications enable row level security;

-- Public can insert (for form submissions)
create policy "Public can submit applications"
  on applications for insert
  with check (true);

-- Admins can read all (we'll use service role key for now)
create policy "Service role can read all applications"
  on applications for select
  using (true);

-- Admins can update status (we'll use service role key for now)
create policy "Service role can update applications"
  on applications for update
  using (true);

-- Indexes for performance
create index if not exists applications_status_idx on applications(status);
create index if not exists applications_created_at_idx on applications(created_at desc);
create index if not exists applications_role_idx on applications(role);
create index if not exists applications_email_idx on applications(email);
