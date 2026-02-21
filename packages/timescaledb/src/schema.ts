/**
 * Common schema definitions for the FedArch CCC client.
 *
 * Performance-oriented setup based on:
 * - Timescale hypertables + retention/compression policies
 * - pgvector memory search indexes
 * - RLS isolation for per-client memory tables
 */

export const EXTENSIONS_SQL = `
  CREATE EXTENSION IF NOT EXISTS timescaledb CASCADE;
  CREATE EXTENSION IF NOT EXISTS vector;
  CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
  CREATE EXTENSION IF NOT EXISTS pgcrypto;
`;

export const IDENTITY_TABLES_SQL = `
  CREATE TABLE IF NOT EXISTS clients (
      id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
      wallet_address TEXT NOT NULL UNIQUE,
      ccc VARCHAR(3) NOT NULL UNIQUE,
      contributor TEXT NOT NULL,
      tier TEXT NOT NULL DEFAULT 'contributor'
          CHECK (tier IN ('founding_og', 'contributor', 'tool_agent')),
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      active BOOLEAN NOT NULL DEFAULT TRUE
  );

  CREATE TABLE IF NOT EXISTS instances (
      id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
      instance_id TEXT NOT NULL UNIQUE,
      domain TEXT NOT NULL,
      instance_type TEXT NOT NULL DEFAULT 'production',
      client_id UUID REFERENCES clients(id),
      isc_certified BOOLEAN NOT NULL DEFAULT FALSE,
      status TEXT NOT NULL DEFAULT 'active',
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
  );

  CREATE TABLE IF NOT EXISTS workspaces (
      id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
      instance_id UUID NOT NULL REFERENCES instances(id) ON DELETE CASCADE,
      slug TEXT NOT NULL,
      name TEXT NOT NULL,
      workspace_type TEXT NOT NULL DEFAULT 'ccc',
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      UNIQUE(instance_id, slug)
  );

  CREATE TABLE IF NOT EXISTS agents (
      id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
      ccc VARCHAR(3) NOT NULL,
      agent_id TEXT NOT NULL UNIQUE,
      client_id UUID NOT NULL REFERENCES clients(id),
      instance_id UUID NOT NULL REFERENCES instances(id),
      wallet_address TEXT NOT NULL,
      ccc_id_count INTEGER NOT NULL DEFAULT 0,
      reputation_score INTEGER NOT NULL DEFAULT 0,
      active BOOLEAN NOT NULL DEFAULT TRUE,
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      UNIQUE(ccc, instance_id)
  );

  CREATE INDEX IF NOT EXISTS idx_instances_client ON instances(client_id);
  CREATE INDEX IF NOT EXISTS idx_agents_client ON agents(client_id);
  CREATE INDEX IF NOT EXISTS idx_agents_instance ON agents(instance_id);
  CREATE INDEX IF NOT EXISTS idx_agents_ccc ON agents(ccc);
`;

export const MEMORY_TABLES_SQL = `
  CREATE TABLE IF NOT EXISTS agent_sessions (
      id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
      agent_id UUID NOT NULL REFERENCES agents(id),
      instance_id UUID NOT NULL REFERENCES instances(id),
      workspace_id UUID REFERENCES workspaces(id),
      started_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      ended_at TIMESTAMPTZ,
      status TEXT NOT NULL DEFAULT 'active',
      step_count INTEGER NOT NULL DEFAULT 0,
      token_count INTEGER NOT NULL DEFAULT 0,
      metadata JSONB NOT NULL DEFAULT '{}'::jsonb
  );

  CREATE TABLE IF NOT EXISTS agent_scratchpad (
      id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
      agent_id UUID NOT NULL REFERENCES agents(id),
      client_id UUID NOT NULL REFERENCES clients(id),
      key TEXT NOT NULL,
      value JSONB NOT NULL,
      embedding vector(384),
      ttl TIMESTAMPTZ,
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      UNIQUE(agent_id, key)
  );

  CREATE TABLE IF NOT EXISTS agent_working_memory (
      id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
      agent_id UUID NOT NULL REFERENCES agents(id),
      client_id UUID NOT NULL REFERENCES clients(id),
      session_id UUID REFERENCES agent_sessions(id),
      memory_type TEXT NOT NULL CHECK (memory_type IN ('episodic', 'semantic', 'procedural', 'conversation')),
      content TEXT NOT NULL,
      embedding vector(384),
      relevance_score REAL NOT NULL DEFAULT 1.0,
      decay_rate REAL NOT NULL DEFAULT 0.95,
      access_count INTEGER NOT NULL DEFAULT 0,
      last_accessed TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      metadata JSONB NOT NULL DEFAULT '{}'::jsonb,
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
  );

  CREATE TABLE IF NOT EXISTS agent_checkpoints (
      id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
      session_id UUID NOT NULL REFERENCES agent_sessions(id) ON DELETE CASCADE,
      agent_id UUID NOT NULL REFERENCES agents(id),
      step_number INTEGER NOT NULL,
      checkpoint_state JSONB NOT NULL,
      memory_snapshot JSONB,
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      UNIQUE(session_id, step_number)
  );

  ALTER TABLE agent_scratchpad ENABLE ROW LEVEL SECURITY;
  ALTER TABLE agent_working_memory ENABLE ROW LEVEL SECURITY;

  DROP POLICY IF EXISTS agent_scratchpad_isolation ON agent_scratchpad;
  CREATE POLICY agent_scratchpad_isolation ON agent_scratchpad
      USING (client_id::text = nullif(current_setting('app.current_client_id', TRUE), ''))
      WITH CHECK (client_id::text = nullif(current_setting('app.current_client_id', TRUE), ''));

  DROP POLICY IF EXISTS agent_wmem_isolation ON agent_working_memory;
  CREATE POLICY agent_wmem_isolation ON agent_working_memory
      USING (client_id::text = nullif(current_setting('app.current_client_id', TRUE), ''))
      WITH CHECK (client_id::text = nullif(current_setting('app.current_client_id', TRUE), ''));

  CREATE INDEX IF NOT EXISTS idx_sessions_agent ON agent_sessions(agent_id);
  CREATE INDEX IF NOT EXISTS idx_sessions_status ON agent_sessions(status);
  CREATE INDEX IF NOT EXISTS idx_scratchpad_agent ON agent_scratchpad(agent_id);
  CREATE INDEX IF NOT EXISTS idx_scratchpad_ttl ON agent_scratchpad(ttl);
  CREATE INDEX IF NOT EXISTS idx_scratchpad_embedding ON agent_scratchpad USING ivfflat (embedding vector_cosine_ops) WITH (lists = 50);
  CREATE INDEX IF NOT EXISTS idx_wmem_agent_type ON agent_working_memory(agent_id, memory_type);
  CREATE INDEX IF NOT EXISTS idx_wmem_relevance ON agent_working_memory(relevance_score DESC);
  CREATE INDEX IF NOT EXISTS idx_wmem_last_accessed ON agent_working_memory(last_accessed DESC);
  CREATE INDEX IF NOT EXISTS idx_wmem_embedding ON agent_working_memory USING ivfflat (embedding vector_cosine_ops) WITH (lists = 100);
  CREATE INDEX IF NOT EXISTS idx_checkpoints_session_step ON agent_checkpoints(session_id, step_number DESC);
`;

export const AGENT_METRICS_SCHEMA = `
  CREATE TABLE IF NOT EXISTS agent_metrics (
    time TIMESTAMPTZ NOT NULL,
    agent_id TEXT NOT NULL,
    cpu_usage DOUBLE PRECISION,
    memory_usage BIGINT,
    request_count INTEGER,
    latency_ms INTEGER,
    metadata JSONB DEFAULT '{}'::jsonb
  );
`;

export const VOLLEY_EVENTS_SCHEMA = `
  CREATE TABLE IF NOT EXISTS volley_events (
    time TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    event_id TEXT NOT NULL,
    agent_id TEXT NOT NULL,
    from_ccc TEXT,
    to_ccc TEXT,
    from_client_id UUID,
    to_client_id UUID,
    from_instance_id TEXT,
    to_instance_id TEXT,
    topic_id TEXT,
    volley_type TEXT,
    event_type TEXT NOT NULL,
    payload JSONB,
    status TEXT,
    cross_instance BOOLEAN DEFAULT FALSE,
    latency_ms INTEGER,
    metadata JSONB DEFAULT '{}'::jsonb
  );
`;

export const CCC_ID_EVENTS_SCHEMA = `
  CREATE TABLE IF NOT EXISTS ccc_id_events (
    time TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    contributor VARCHAR(3) NOT NULL,
    client_id UUID,
    instance_id TEXT,
    ccc_id TEXT NOT NULL,
    sequence INTEGER,
    year INTEGER,
    week INTEGER,
    reward NUMERIC,
    embedding vector(384),
    metadata JSONB DEFAULT '{}'::jsonb
  );
`;

export const AGENT_STATE_LOG_SCHEMA = `
  CREATE TABLE IF NOT EXISTS agent_state_log (
    time TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    agent_id UUID,
    client_id UUID,
    session_id UUID,
    state TEXT NOT NULL,
    checkpoint_id UUID,
    step_count INTEGER,
    token_count INTEGER,
    metadata JSONB DEFAULT '{}'::jsonb
  );
`;

export const GLOBAL_GRAPH_SQL = `
  CREATE TABLE IF NOT EXISTS global_agent_graph (
    from_agent_id UUID NOT NULL REFERENCES agents(id),
    to_agent_id UUID NOT NULL REFERENCES agents(id),
    from_client_id UUID NOT NULL REFERENCES clients(id),
    to_client_id UUID NOT NULL REFERENCES clients(id),
    interaction_count INTEGER NOT NULL DEFAULT 0,
    trust_score REAL NOT NULL DEFAULT 0,
    handshake_completed BOOLEAN NOT NULL DEFAULT FALSE,
    last_interaction_at TIMESTAMPTZ,
    PRIMARY KEY (from_agent_id, to_agent_id)
  );

  CREATE INDEX IF NOT EXISTS idx_graph_from_client ON global_agent_graph(from_client_id);
  CREATE INDEX IF NOT EXISTS idx_graph_to_client ON global_agent_graph(to_client_id);
  CREATE INDEX IF NOT EXISTS idx_graph_handshake ON global_agent_graph(handshake_completed);
`;

export const TIMESCALE_SETUP_SQL = `
  SELECT create_hypertable('agent_metrics', 'time', chunk_time_interval => INTERVAL '1 day', if_not_exists => TRUE);
  SELECT create_hypertable('volley_events', 'time', chunk_time_interval => INTERVAL '1 day', if_not_exists => TRUE);
  SELECT create_hypertable('ccc_id_events', 'time', chunk_time_interval => INTERVAL '1 day', if_not_exists => TRUE);
  SELECT create_hypertable('agent_state_log', 'time', chunk_time_interval => INTERVAL '1 hour', if_not_exists => TRUE);

  CREATE INDEX IF NOT EXISTS idx_agent_metrics_agent_id ON agent_metrics (agent_id, time DESC);
  CREATE INDEX IF NOT EXISTS idx_volley_events_agent_id ON volley_events (agent_id, time DESC);
  CREATE INDEX IF NOT EXISTS idx_volley_events_ccc ON volley_events (from_ccc, to_ccc, time DESC);
  CREATE INDEX IF NOT EXISTS idx_ccc_id_events_contributor ON ccc_id_events (contributor, time DESC);
  CREATE INDEX IF NOT EXISTS idx_ccc_id_events_client ON ccc_id_events (client_id, time DESC);
  CREATE INDEX IF NOT EXISTS idx_ccc_id_events_embedding ON ccc_id_events USING ivfflat (embedding vector_cosine_ops) WITH (lists = 100);
  CREATE INDEX IF NOT EXISTS idx_agent_state_log_agent ON agent_state_log (agent_id, time DESC);

  ALTER TABLE volley_events SET (
    timescaledb.compress,
    timescaledb.compress_segmentby = 'agent_id',
    timescaledb.compress_orderby = 'time DESC'
  );

  ALTER TABLE ccc_id_events SET (
    timescaledb.compress,
    timescaledb.compress_segmentby = 'contributor',
    timescaledb.compress_orderby = 'time DESC'
  );

  ALTER TABLE agent_state_log SET (
    timescaledb.compress,
    timescaledb.compress_segmentby = 'agent_id',
    timescaledb.compress_orderby = 'time DESC'
  );

  SELECT add_compression_policy('volley_events', INTERVAL '7 days', if_not_exists => TRUE);
  SELECT add_compression_policy('ccc_id_events', INTERVAL '7 days', if_not_exists => TRUE);
  SELECT add_compression_policy('agent_state_log', INTERVAL '1 day', if_not_exists => TRUE);

  SELECT add_retention_policy('agent_state_log', INTERVAL '30 days', if_not_exists => TRUE);
  SELECT add_retention_policy('volley_events', INTERVAL '180 days', if_not_exists => TRUE);
`;

export const CONTINUOUS_AGGREGATES_SQL = `
  CREATE MATERIALIZED VIEW IF NOT EXISTS agent_hourly_stats
  WITH (timescaledb.continuous) AS
  SELECT
    time_bucket('1 hour', c.time) AS bucket,
    c.contributor,
    c.client_id,
    COUNT(*)::bigint AS ccc_ids_minted,
    COALESCE(SUM(c.reward), 0)::numeric AS total_reward
  FROM ccc_id_events c
  GROUP BY bucket, c.contributor, c.client_id
  WITH NO DATA;

  CREATE MATERIALIZED VIEW IF NOT EXISTS network_daily_stats
  WITH (timescaledb.continuous) AS
  SELECT
    time_bucket('1 day', c.time) AS bucket,
    COUNT(*)::bigint AS total_ccc_ids,
    COUNT(DISTINCT c.client_id)::bigint AS active_clients,
    COALESCE(SUM(c.reward), 0)::numeric AS total_rewards
  FROM ccc_id_events c
  GROUP BY bucket
  WITH NO DATA;

  CREATE MATERIALIZED VIEW IF NOT EXISTS connection_stats
  WITH (timescaledb.continuous) AS
  SELECT
    time_bucket('1 hour', v.time) AS bucket,
    v.from_client_id,
    v.to_client_id,
    v.from_ccc,
    v.to_ccc,
    COUNT(*)::bigint AS interaction_count,
    AVG(v.latency_ms)::double precision AS avg_latency_ms,
    COUNT(*) FILTER (WHERE v.cross_instance)::bigint AS cross_instance_count
  FROM volley_events v
  GROUP BY bucket, v.from_client_id, v.to_client_id, v.from_ccc, v.to_ccc
  WITH NO DATA;

  SELECT add_continuous_aggregate_policy(
    'agent_hourly_stats',
    start_offset => INTERVAL '3 hours',
    end_offset => INTERVAL '5 minutes',
    schedule_interval => INTERVAL '15 minutes',
    if_not_exists => TRUE
  );

  SELECT add_continuous_aggregate_policy(
    'network_daily_stats',
    start_offset => INTERVAL '3 days',
    end_offset => INTERVAL '1 hour',
    schedule_interval => INTERVAL '1 hour',
    if_not_exists => TRUE
  );

  SELECT add_continuous_aggregate_policy(
    'connection_stats',
    start_offset => INTERVAL '3 hours',
    end_offset => INTERVAL '5 minutes',
    schedule_interval => INTERVAL '15 minutes',
    if_not_exists => TRUE
  );
`;

export const NETWORK_GRAPH_VIEW_SQL = `
  CREATE OR REPLACE VIEW active_nodes AS
  SELECT
      c.id AS client_id,
      c.wallet_address,
      c.ccc,
      c.contributor,
      c.tier,
      i.instance_id,
      i.domain,
      i.instance_type,
      i.isc_certified,
      a.agent_id,
      a.ccc_id_count,
      a.reputation_score,
      COALESCE((
        SELECT COUNT(*)
        FROM agent_sessions s
        WHERE s.agent_id = a.id AND s.status = 'active'
      ), 0) AS active_sessions,
      COALESCE((
        SELECT SUM(c2.reward)
        FROM ccc_id_events c2
        WHERE c2.client_id = c.id
          AND c2.time > NOW() - INTERVAL '24 hours'
      ), 0) AS rewards_24h
  FROM clients c
  JOIN agents a ON a.client_id = c.id AND a.active = TRUE
  JOIN instances i ON i.id = a.instance_id AND i.status = 'active';

  CREATE OR REPLACE VIEW active_edges AS
  SELECT
      fc.ccc AS from_ccc,
      tc.ccc AS to_ccc,
      fi.domain AS from_domain,
      ti.domain AS to_domain,
      g.interaction_count,
      g.trust_score,
      g.handshake_completed,
      COALESCE(cs.cross_instance_count, 0) AS recent_volleys,
      cs.avg_latency_ms AS recent_latency
  FROM global_agent_graph g
  JOIN agents fa ON fa.id = g.from_agent_id
  JOIN agents ta ON ta.id = g.to_agent_id
  JOIN clients fc ON fc.id = g.from_client_id
  JOIN clients tc ON tc.id = g.to_client_id
  JOIN instances fi ON fi.id = fa.instance_id
  JOIN instances ti ON ti.id = ta.instance_id
  LEFT JOIN LATERAL (
      SELECT
          SUM(c.interaction_count) AS interaction_count,
          AVG(c.avg_latency_ms) AS avg_latency_ms,
          SUM(c.cross_instance_count) AS cross_instance_count
      FROM connection_stats c
      WHERE c.from_client_id = g.from_client_id
        AND c.to_client_id = g.to_client_id
        AND c.bucket > NOW() - INTERVAL '1 hour'
  ) cs ON TRUE
  WHERE g.interaction_count > 0;

  CREATE OR REPLACE VIEW network_graph AS
  SELECT json_build_object(
      'nodes', COALESCE((SELECT json_agg(row_to_json(n)) FROM active_nodes n), '[]'::json),
      'edges', COALESCE((SELECT json_agg(row_to_json(e)) FROM active_edges e), '[]'::json),
      'stats', json_build_object(
          'total_nodes', (SELECT COUNT(*) FROM active_nodes),
          'total_edges', (SELECT COUNT(*) FROM active_edges),
          'handshakes', (SELECT COUNT(*) FROM active_edges WHERE handshake_completed = TRUE),
          'cross_instance_volleys_1h', COALESCE((
            SELECT SUM(recent_volleys) FROM active_edges
          ), 0)
      )
  ) AS graph;
`;

export const INITIALIZE_COMMANDS = [
  EXTENSIONS_SQL,
  IDENTITY_TABLES_SQL,
  MEMORY_TABLES_SQL,
  AGENT_METRICS_SCHEMA,
  VOLLEY_EVENTS_SCHEMA,
  CCC_ID_EVENTS_SCHEMA,
  AGENT_STATE_LOG_SCHEMA,
  GLOBAL_GRAPH_SQL,
  TIMESCALE_SETUP_SQL,
  CONTINUOUS_AGGREGATES_SQL,
  NETWORK_GRAPH_VIEW_SQL,
];
