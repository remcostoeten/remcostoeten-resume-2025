-- Visitor tracking schema
-- Unique visitors identified by a stable device fingerprint (tolerant to IP/browser version changes)

CREATE TABLE IF NOT EXISTS visitors (
	id BIGSERIAL PRIMARY KEY,
	fingerprint TEXT NOT NULL UNIQUE,
	first_seen TIMESTAMPTZ NOT NULL DEFAULT now(),
	last_seen TIMESTAMPTZ NOT NULL DEFAULT now(),
	visit_count INTEGER NOT NULL DEFAULT 1,
	device_type TEXT,
	os TEXT,
	os_version TEXT,
	browser TEXT,
	browser_version TEXT,
	screen_resolution TEXT,
	timezone TEXT,
	language TEXT,
	country TEXT,
	region TEXT,
	city TEXT,
	ip_hash TEXT,
	ua TEXT,
	meta JSONB
);

CREATE INDEX IF NOT EXISTS idx_visitors_last_seen ON visitors(last_seen);

-- Individual visitor events (page views, downloads, session lifecycle)
CREATE TABLE IF NOT EXISTS visitor_events (
	id BIGSERIAL PRIMARY KEY,
	visitor_id BIGINT NOT NULL REFERENCES visitors(id),
	event_type TEXT NOT NULL,
	ts TIMESTAMPTZ NOT NULL DEFAULT now(),
	path TEXT,
	referrer TEXT,
	session_id TEXT,
	duration_ms INTEGER,
	meta JSONB
);

CREATE INDEX IF NOT EXISTS idx_visitor_events_visitor_id ON visitor_events(visitor_id);
CREATE INDEX IF NOT EXISTS idx_visitor_events_event_type ON visitor_events(event_type);
CREATE INDEX IF NOT EXISTS idx_visitor_events_session_id ON visitor_events(session_id);
CREATE INDEX IF NOT EXISTS idx_visitor_events_ts ON visitor_events(ts);
