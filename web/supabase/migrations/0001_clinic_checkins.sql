-- DCI Wellness: clinic check-in and lead capture.
--
-- Design notes:
--   Records are pseudonymised at record level and reported at cohort level.
--   Never described as anonymised: a check-in must be able to identify a person
--   so that a referral can reach them.
--   This table is NOT the Early Warning System and holds no wellbeing data.
--
-- Run this in the Supabase dashboard SQL editor, or via the CLI once a
-- service_role key or access token is available.

create table if not exists public.clinic_checkins (
	id uuid primary key default gen_random_uuid(),
	created_at timestamptz not null default now(),

	-- Which session was attended.
	clinic_date date not null,
	clinic_venue text,

	-- Attendee. Email is the join key to a booking.
	full_name text not null,
	email text not null,
	phone text,

	-- Segmentation: drives which next rung is offered.
	-- 'individual'   -> toolkit
	-- 'organisation' -> programme design / partner conversation
	-- 'facilitator'  -> champion certification
	segment text not null check (segment in ('individual', 'organisation', 'facilitator')),

	-- Explicit, unticked by default in the UI. Records permission to follow up.
	consent_follow_up boolean not null default false,

	-- Attendance-based Connection Miles issued for this check-in.
	-- Value is written by the server from a single source of truth, never
	-- supplied by the client.
	connection_miles integer not null default 0,

	-- Set when the seat was paid for online, so bookings and attendance can be
	-- reconciled. Null means the person checked in at the door.
	payment_tx_ref text
);

-- One check-in per person per session.
create unique index if not exists clinic_checkins_unique_attendee
	on public.clinic_checkins (clinic_date, lower(email));

create index if not exists clinic_checkins_clinic_date_idx
	on public.clinic_checkins (clinic_date desc);

-- Row level security: deny by default.
-- No policies are created for the anon role, so the public key cannot read or
-- write this table. All access is server side using the service_role key.
alter table public.clinic_checkins enable row level security;

comment on table public.clinic_checkins is
	'Conversation Clinic attendance. Personal data: server-side access only. Cohort-level reporting, pseudonymised at record level.';

-- Cohort-level view for reporting. Contains no personal identifiers.
create or replace view public.clinic_cohort_summary as
select
	clinic_date,
	clinic_venue,
	count(*)::integer as attendees,
	count(*) filter (where segment = 'individual')::integer as individuals,
	count(*) filter (where segment = 'organisation')::integer as organisations,
	count(*) filter (where segment = 'facilitator')::integer as facilitator_candidates,
	sum(connection_miles)::integer as connection_miles_issued
from public.clinic_checkins
group by clinic_date, clinic_venue;
