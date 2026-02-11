CREATE TABLE IF NOT EXISTS resume (
	id BIGSERIAL PRIMARY KEY,
	event TEXT NOT NULL,
	ts TIMESTAMPTZ NOT NULL DEFAULT now(),
	path TEXT,
	referrer TEXT,
	ua TEXT,
	lang TEXT,
	ip_hash TEXT,
	country TEXT,
	region TEXT,
	city TEXT,
	device_type TEXT,
	resume_version TEXT,
	meta JSONB
);
