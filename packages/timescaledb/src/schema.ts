/**
 * Common schema definitions for the FedArch CCC client
 */

export const AGENT_METRICS_SCHEMA = `
  CREATE TABLE IF NOT EXISTS agent_metrics (
    time TIMESTAMPTZ NOT NULL,
    agent_id TEXT NOT NULL,
    cpu_usage DOUBLE PRECISION,
    memory_usage BIGINT,
    request_count INTEGER,
    latency_ms INTEGER,
    metadata JSONB
  );
`;

export const VOLLEY_EVENTS_SCHEMA = `
  CREATE TABLE IF NOT EXISTS volley_events (
    time TIMESTAMPTZ NOT NULL,
    event_id TEXT NOT NULL,
    agent_id TEXT NOT NULL,
    topic_id TEXT,
    event_type TEXT NOT NULL,
    payload JSONB,
    status TEXT
  );
`;

export const INITIALIZE_COMMANDS = [
  AGENT_METRICS_SCHEMA,
  VOLLEY_EVENTS_SCHEMA,
  `SELECT create_hypertable('agent_metrics', 'time', chunk_time_interval => INTERVAL '1 day', if_not_exists => TRUE);`,
  `SELECT create_hypertable('volley_events', 'time', chunk_time_interval => INTERVAL '1 day', if_not_exists => TRUE);`,
  `CREATE INDEX IF NOT EXISTS idx_agent_metrics_agent_id ON agent_metrics (agent_id, time DESC);`,
  `CREATE INDEX IF NOT EXISTS idx_volley_events_agent_id ON volley_events (agent_id, time DESC);`,
];
