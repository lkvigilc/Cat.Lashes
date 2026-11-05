/*
# Create appointments table for Cat Lashes booking

1. New Tables
- `appointments`
  - `id` (uuid, primary key)
  - `name` (text, client's full name)
  - `phone` (text, contact phone)
  - `email` (text, contact email, nullable)
  - `service` (text, the booked service name)
  - `service_type` (text, category: extensiones, retoque, lash_lifting, laminado)
  - `price` (numeric, service price in MXN)
  - `appointment_date` (date, the selected date)
  - `appointment_time` (time, the selected hour slot 10:00-16:00)
  - `status` (text, default 'confirmada')
  - `notes` (text, nullable)
  - `created_at` (timestamptz, default now())

2. Security
- Enable RLS on `appointments`.
- Single-tenant no-auth app: allow anon + authenticated CRUD.
  - SELECT: anyone can read (to check taken slots) — intentionally public booking.
  - INSERT: anyone can book.
  - UPDATE/DELETE: restricted but allowed for demo (anon can manage).

3. Index
- Unique constraint on (appointment_date, appointment_time) to prevent double-booking.
*/

CREATE TABLE IF NOT EXISTS appointments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  phone text NOT NULL,
  email text,
  service text NOT NULL,
  service_type text NOT NULL,
  price numeric NOT NULL DEFAULT 0,
  appointment_date date NOT NULL,
  appointment_time time NOT NULL,
  status text NOT NULL DEFAULT 'confirmada',
  notes text,
  created_at timestamptz DEFAULT now()
);

CREATE UNIQUE INDEX IF NOT EXISTS idx_appointments_date_time
  ON appointments (appointment_date, appointment_time);

ALTER TABLE appointments ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "anon_select_appointments" ON appointments;
CREATE POLICY "anon_select_appointments" ON appointments FOR SELECT
  TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "anon_insert_appointments" ON appointments;
CREATE POLICY "anon_insert_appointments" ON appointments FOR INSERT
  TO anon, authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "anon_update_appointments" ON appointments;
CREATE POLICY "anon_update_appointments" ON appointments FOR UPDATE
  TO anon, authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "anon_delete_appointments" ON appointments;
CREATE POLICY "anon_delete_appointments" ON appointments FOR DELETE
  TO anon, authenticated USING (true);
