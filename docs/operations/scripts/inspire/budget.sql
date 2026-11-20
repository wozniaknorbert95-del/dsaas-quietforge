-- Apply once to the dedicated D1 database shared by ALL paid test instances.
CREATE TABLE IF NOT EXISTS image_spend (
  call_id TEXT PRIMARY KEY,
  replay_id TEXT UNIQUE NOT NULL,
  vehicle_variant TEXT NOT NULL,
  reserved_cents INTEGER NOT NULL CHECK(reserved_cents > 0)
);
