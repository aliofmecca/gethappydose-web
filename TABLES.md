# Database Tables

This file is the source of truth for every Supabase table the **web** project depends on, plus its RLS policies. New joiners can read this file and know exactly what's in the database without opening Supabase.

The web project shares its Supabase project with the mobile app — the app has its own much larger schema (users, supplements, intake_logs, doctor_profiles, etc.) which is documented separately. The web only owns and reads from a small set of tables: `waitlist` and (later) `feedback`.

---

## Convention

- **All tables** live in the `public` schema.
- **All tables** have RLS enabled (`alter table ... enable row level security`).
- **Anon key** (used by the marketing site and the Expo app on the client) only does what RLS policies explicitly allow.
- **Service role key** (used only by `/api/admin/*` server routes on Vercel) bypasses RLS entirely. Never expose to the browser.

---

## 1. `waitlist`

Captures emails from the landing page form before public launch. Read only by the `/admin` dashboard via the service role key.

### Schema

```sql
create table public.waitlist (
  id uuid not null default gen_random_uuid(),
  email text not null,
  name text null,
  source text null default 'landing_page'::text,
  created_at timestamp with time zone not null default now(),
  constraint waitlist_pkey primary key (id),
  constraint waitlist_email_key unique (email)
) tablespace pg_default;
```

### Columns

| Column       | Type        | Default               | Notes                                                          |
| ------------ | ----------- | --------------------- | -------------------------------------------------------------- |
| `id`         | uuid        | `gen_random_uuid()`   | Primary key.                                                   |
| `email`      | text        | —                     | Required. Unique constraint — same email cannot join twice.    |
| `name`       | text        | null                  | Optional. The form has a name field but it is not required.    |
| `source`     | text        | `'landing_page'`      | Where the signup came from. Useful when we add referral codes. |
| `created_at` | timestamptz | `now()`               | Set automatically by Postgres.                                 |

### RLS Policies

```sql
alter table public.waitlist enable row level security;

-- Anyone (anon or authenticated) can join the waitlist
create policy "Anyone can join the waitlist"
  on public.waitlist for insert
  to anon, authenticated
  with check (true);

-- No SELECT/UPDATE/DELETE policy — the only path to read this table
-- is the /api/admin/waitlist server route, which uses the service role key.
```

### How the web uses it

- **Landing page form** (`src/app/page.tsx`): inserts a new row using the public anon key. If the email already exists, the unique constraint returns Postgres error `23505`, which we treat as success in the UI ("you're already on the list").
- **Admin dashboard** (`src/app/admin/page.tsx`): hits `POST /api/admin/waitlist` with the admin password, which validates the password server-side and returns all rows ordered by `created_at desc` using the service role key.

### Operational notes

- **Email validation**: handled by the `<input type="email" required>` on the form. Postgres does not enforce email format.
- **Unique constraint hit**: when a user tries to sign up twice, Postgres returns error code `23505`. The frontend handles this gracefully — it shows a friendly "you're already on the list" message instead of an error.
- **No deletion path**: signups are append-only. To remove a row, do it manually in the Supabase table editor.

---

## Future tables (placeholder)

These tables will be added as the web grows. Each gets its own section here when it lands.

- `feedback` — submitted from the app, read in the admin dashboard
- `referral_codes` — when we add a referral system
