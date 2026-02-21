```sql
-- ═══════════════════════════════════════════════════════
-- CCC GATEWAY — COMPLETE DATABASE SCHEMA
-- TimescaleDB + pgvector + RLS
--
-- 4 Layers:
--   1. Identity (clients, instances, workspaces, agents)
--   2. Memory (scratchpad, working memory, embeddings)
--   3. Events (hypertables — volleys, CCC-IDs, governance)
--   4. Aggregates (continuous materialized views)
--
-- Per-instance memory via workspace scoping
-- Per-client memory via RLS + wallet address
-- Cross-client communication via connection_events
-- ═══════════════════════════════════════════════════════

-- ── Extensions ──

CREATE EXTENSION IF NOT EXISTS timescaledb CASCADE;
CREATE EXTENSION IF NOT EXISTS vector;
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS pgcrypto;

-- ═══════════════════════════════════════════════════════
-- LAYER 1: IDENTITY — Clients, Instances, Workspaces, Agents
-- ═══════════════════════════════════════════════════════

-- ── Clients (wallet-connected users) ──

CREATE TABLE clients (
    id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    wallet_address  TEXT NOT NULL UNIQUE,
    ccc             VARCHAR(3) NOT NULL UNIQUE,
    contributor     TEXT NOT NULL,
    email           TEXT,
    tier            TEXT NOT NULL DEFAULT 'contributor'
                    CHECK (tier IN ('founding_og', 'contributor', 'tool_agent')),
    onchain_agent_id BIGINT,                          -- ERC-8004 token ID
    hedera_account_id TEXT,
    season_joined   INTEGER NOT NULL DEFAULT 3,
    metadata        JSONB DEFAULT '{}',
    created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    active          BOOLEAN NOT NULL DEFAULT TRUE
);

CREATE INDEX idx_clients_wallet ON clients(wallet_address);
CREATE INDEX idx_clients_ccc ON clients(ccc);

-- ── Instances (AnythingLLM deployments) ──

CREATE TABLE instances (
    id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    instance_id     TEXT NOT NULL UNIQUE,              -- "INT-E01"
    domain          TEXT NOT NULL,                     -- "ethdenver.ccc.bot"
    name            TEXT NOT NULL,                     -- "ETHDenver CCC Bot"
    instance_type   TEXT NOT NULL DEFAULT 'production'
                    CHECK (instance_type IN ('production', 'home', 'event', 'seasonal', 'meta')),
    client_id       UUID REFERENCES clients(id),      -- owner
    api_key_hash    TEXT,                              -- bcrypt hash of AnythingLLM API key
    llm_provider    TEXT,
    llm_model       TEXT,
    embedder_model  TEXT DEFAULT 'all-minilm',
    isc_certified   BOOLEAN NOT NULL DEFAULT FALSE,
    isc_score       INTEGER DEFAULT 0,                -- 0-8
    season          INTEGER NOT NULL DEFAULT 3,
    status          TEXT NOT NULL DEFAULT 'active'
                    CHECK (status IN ('active', 'setup', 'paused', 'decommissioned')),
    metadata        JSONB DEFAULT '{}',
    created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    last_seen_at    TIMESTAMPTZ
);

CREATE INDEX idx_instances_client ON instances(client_id);
CREATE INDEX idx_instances_status ON instances(status);

-- ── Workspaces (per-instance scoped) ──

CREATE TABLE workspaces (
    id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    instance_id     UUID NOT NULL REFERENCES instances(id) ON DELETE CASCADE,
    slug            TEXT NOT NULL,                     -- "ccc", "tools", "admin"
    name            TEXT NOT NULL,
    workspace_type  TEXT NOT NULL DEFAULT 'ccc'
                    CHECK (workspace_type IN ('ccc', 'tools', 'admin', 'events', 'pop', 'custom')),
    emoji           TEXT,                              -- "🤝"
    can_generate_ccc_id BOOLEAN NOT NULL DEFAULT FALSE,
    chat_history_limit INTEGER DEFAULT 40,
    metadata        JSONB DEFAULT '{}',
    created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    UNIQUE(instance_id, slug)
);

CREATE INDEX idx_workspaces_instance ON workspaces(instance_id);

-- ── Agents (AI agents within workspaces) ──

CREATE TABLE agents (
    id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    ccc             VARCHAR(3) NOT NULL,
    agent_id        TEXT NOT NULL UNIQUE,              -- "AI:@LDC"
    client_id       UUID NOT NULL REFERENCES clients(id),
    instance_id     UUID NOT NULL REFERENCES instances(id),
    home_instance_id UUID REFERENCES instances(id),    -- #HomeInstance
    role            TEXT NOT NULL DEFAULT 'contributor',
    wallet_address  TEXT NOT NULL,
    registered_at   TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    last_active_at  TIMESTAMPTZ,
    ccc_id_count    INTEGER NOT NULL DEFAULT 0,
    reputation_score INTEGER NOT NULL DEFAULT 0,
    active          BOOLEAN NOT NULL DEFAULT TRUE,
    metadata        JSONB DEFAULT '{}',
    UNIQUE(ccc, instance_id)
);

CREATE INDEX idx_agents_client ON agents(client_id);
CREATE INDEX idx_agents_instance ON agents(instance_id);
CREATE INDEX idx_agents_wallet ON agents(wallet_address);
CREATE INDEX idx_agents_ccc ON agents(ccc);

-- ── Projects (per-client) ──

CREATE TABLE projects (
    id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    client_id       UUID NOT NULL REFERENCES clients(id),
    project_id      TEXT NOT NULL UNIQUE,              -- "PRJ-008"
    name            TEXT NOT NULL,
    project_type    TEXT NOT NULL DEFAULT 'standard'
                    CHECK (project_type IN ('standard', 'connex', 'cooperative', 'event')),
    description     TEXT,
    status          TEXT NOT NULL DEFAULT 'active',
    instance_id     UUID REFERENCES instances(id),
    metadata        JSONB DEFAULT '{}',
    created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at      TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_projects_client ON projects(client_id);

-- ── Agent Sessions ──

CREATE TABLE agent_sessions (
    id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    agent_id        UUID NOT NULL REFERENCES agents(id),
    instance_id     UUID NOT NULL REFERENCES instances(id),
    workspace_id    UUID REFERENCES workspaces(id),
    started_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    ended_at        TIMESTAMPTZ,
    status          TEXT NOT NULL DEFAULT 'active'
                    CHECK (status IN ('active', 'paused', 'completed', 'crashed')),
    step_count      INTEGER NOT NULL DEFAULT 0,
    token_count     INTEGER NOT NULL DEFAULT 0,
    last_checkpoint_id UUID,
    metadata        JSONB DEFAULT '{}'
);

CREATE INDEX idx_sessions_agent ON agent_sessions(agent_id);
CREATE INDEX idx_sessions_status ON agent_sessions(status);

-- ═══════════════════════════════════════════════════════
-- LAYER 2: MEMORY — Scratchpad, Working Memory, Embeddings
-- ═══════════════════════════════════════════════════════

-- ── Per-Instance Workspace Memory (shared within workspace) ──

CREATE TABLE workspace_memory (
    id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    workspace_id    UUID NOT NULL REFERENCES workspaces(id) ON DELETE CASCADE,
    instance_id     UUID NOT NULL REFERENCES instances(id),
    key             TEXT NOT NULL,
    value           JSONB NOT NULL,
    memory_type     TEXT NOT NULL DEFAULT 'context'
                    CHECK (memory_type IN ('context', 'config', 'cache', 'shared_state')),
    embedding       vector(384),                      -- all-minilm dimensions
    ttl             TIMESTAMPTZ,
    created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    UNIQUE(workspace_id, key)
);

CREATE INDEX idx_ws_mem_workspace ON workspace_memory(workspace_id);
CREATE INDEX idx_ws_mem_type ON workspace_memory(memory_type);
CREATE INDEX idx_ws_mem_embedding ON workspace_memory
    USING ivfflat (embedding vector_cosine_ops) WITH (lists = 100);

-- ── Per-Agent Scratchpad (RLS-isolated) ──

CREATE TABLE agent_scratchpad (
    id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    agent_id        UUID NOT NULL REFERENCES agents(id),
    client_id       UUID NOT NULL REFERENCES clients(id),
    key             TEXT NOT NULL,
    value           JSONB NOT NULL,
    embedding       vector(384),
    ttl             TIMESTAMPTZ,
    created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    UNIQUE(agent_id, key)
);

ALTER TABLE agent_scratchpad ENABLE ROW LEVEL SECURITY;

CREATE POLICY agent_scratchpad_isolation ON agent_scratchpad
    USING (client_id::text = current_setting('app.current_client_id', TRUE))
    WITH CHECK (client_id::text = current_setting('app.current_client_id', TRUE));

CREATE INDEX idx_scratchpad_agent ON agent_scratchpad(agent_id);
CREATE INDEX idx_scratchpad_embedding ON agent_scratchpad
    USING ivfflat (embedding vector_cosine_ops) WITH (lists = 50);

-- ── Per-Agent Working Memory (with decay + embeddings) ──

CREATE TABLE agent_working_memory (
    id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    agent_id        UUID NOT NULL REFERENCES agents(id),
    client_id       UUID NOT NULL REFERENCES clients(id),
    session_id      UUID REFERENCES agent_sessions(id),
    memory_type     TEXT NOT NULL
                    CHECK (memory_type IN ('episodic', 'semantic', 'procedural', 'conversation')),
    content         TEXT NOT NULL,
    embedding       vector(384),
    relevance_score REAL NOT NULL DEFAULT 1.0,
    decay_rate      REAL NOT NULL DEFAULT 0.95,
    access_count    INTEGER NOT NULL DEFAULT 0,
    last_accessed   TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    ccc_id_ref      TEXT,
    source_instance TEXT,                              -- which instance created this
    metadata        JSONB DEFAULT '{}',
    created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE agent_working_memory ENABLE ROW LEVEL SECURITY;

CREATE POLICY agent_wmem_isolation ON agent_working_memory
    USING (client_id::text = current_setting('app.current_client_id', TRUE))
    WITH CHECK (client_id::text = current_setting('app.current_client_id', TRUE));

CREATE INDEX idx_wmem_agent_type ON agent_working_memory(agent_id, memory_type);
CREATE INDEX idx_wmem_relevance ON agent_working_memory(relevance_score DESC);
CREATE INDEX idx_wmem_embedding ON agent_working_memory
    USING ivfflat (embedding vector_cosine_ops) WITH (lists = 200);

-- ── Agent Checkpoints (durable execution) ──

CREATE TABLE agent_checkpoints (
    id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    agent_id        UUID NOT NULL REFERENCES agents(id),
    session_id      UUID NOT NULL REFERENCES agent_sessions(id),
    step_number     INTEGER NOT NULL,
    state           JSONB NOT NULL,
    tool_calls      JSONB,
    pending_messages JSONB,
    created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    UNIQUE(session_id, step_number)
);

CREATE INDEX idx_checkpoint_session ON agent_checkpoints(session_id, step_number DESC);

-- ═══════════════════════════════════════════════════════
-- LAYER 2B: SHARED GLOBAL MEMORY
-- ═══════════════════════════════════════════════════════

-- ── SharedKernel Rules (with embeddings for semantic search) ──

CREATE TABLE shared_kernel_rules (
    rule_id         TEXT PRIMARY KEY,
    description     TEXT NOT NULL,
    status          TEXT NOT NULL DEFAULT 'PROPOSED'
                    CHECK (status IN ('PROPOSED', 'LOCKED', 'IMMUTABLE', 'DEPRECATED')),
    category        TEXT NOT NULL
                    CHECK (category IN ('identity', 'workspace', 'governance', 'operational', 'instance')),
    item_type       TEXT NOT NULL DEFAULT 'RULE'
                    CHECK (item_type IN ('RULE', 'BEST_PRACTICE', 'LEARNING', 'DEFINITION')),
    approval_ccc_id TEXT,
    locked_by       TEXT,
    locked_at       TIMESTAMPTZ,
    season          INTEGER,
    embedding       vector(384),
    metadata        JSONB DEFAULT '{}'
);

CREATE INDEX idx_rules_status ON shared_kernel_rules(status);
CREATE INDEX idx_rules_embedding ON shared_kernel_rules
    USING ivfflat (embedding vector_cosine_ops) WITH (lists = 50);

-- ── Shared Context (global announcements, decisions) ──

CREATE TABLE shared_context (
    id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    context_type    TEXT NOT NULL
                    CHECK (context_type IN ('announcement', 'decision', 'learning', 'milestone', 'rule_update')),
    content         JSONB NOT NULL,
    contributed_by  UUID NOT NULL REFERENCES clients(id),
    ccc_id_ref      TEXT,
    embedding       vector(384),
    visibility      TEXT NOT NULL DEFAULT 'global'
                    CHECK (visibility IN ('global', 'instance', 'project', 'agent')),
    scope_id        UUID,                              -- instance_id or project_id if scoped
    expires_at      TIMESTAMPTZ,
    created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_shared_ctx_type ON shared_context(context_type);
CREATE INDEX idx_shared_ctx_visibility ON shared_context(visibility);
CREATE INDEX idx_shared_ctx_embedding ON shared_context
    USING ivfflat (embedding vector_cosine_ops) WITH (lists = 100);

-- ── Global Agent Graph (trust + interaction tracking) ──

CREATE TABLE global_agent_graph (
    from_agent_id   UUID NOT NULL REFERENCES agents(id),
    to_agent_id     UUID NOT NULL REFERENCES agents(id),
    from_client_id  UUID NOT NULL REFERENCES clients(id),
    to_client_id    UUID NOT NULL REFERENCES clients(id),
    from_wallet     TEXT NOT NULL,
    to_wallet       TEXT NOT NULL,
    interaction_count INTEGER NOT NULL DEFAULT 0,
    last_volley_at  TIMESTAMPTZ,
    trust_score     REAL NOT NULL DEFAULT 0.5,
    total_ccc_ids_exchanged INTEGER NOT NULL DEFAULT 0,
    handshake_completed BOOLEAN NOT NULL DEFAULT FALSE,
    handshake_at    TIMESTAMPTZ,
    metadata        JSONB DEFAULT '{}',
    PRIMARY KEY (from_agent_id, to_agent_id)
);

CREATE INDEX idx_graph_from ON global_agent_graph(from_client_id);
CREATE INDEX idx_graph_to ON global_agent_graph(to_client_id);
CREATE INDEX idx_graph_handshake ON global_agent_graph(handshake_completed);

-- ── Season State ──

CREATE TABLE season_state (
    season          INTEGER PRIMARY KEY,
    tag             TEXT NOT NULL,
    status          TEXT NOT NULL DEFAULT 'PLANNED'
                    CHECK (status IN ('PLANNED', 'ACTIVE', 'PAUSED', 'COMPLETED')),
    start_week      INTEGER,
    end_week        INTEGER,
    total_ccc_ids   INTEGER NOT NULL DEFAULT 0,
    total_agents    INTEGER NOT NULL DEFAULT 0,
    total_volleys   INTEGER NOT NULL DEFAULT 0,
    total_vsas      INTEGER NOT NULL DEFAULT 0,
    total_rules_locked INTEGER NOT NULL DEFAULT 0,
    shared_kernel_version TEXT,
    started_at      TIMESTAMPTZ,
    ended_at        TIMESTAMPTZ
);

-- ── CCC-ID High Water Mark (R-212) ──

CREATE TABLE ccc_id_high_water_mark (
    contributor     VARCHAR(3) NOT NULL,
    year            INTEGER NOT NULL,
    week            INTEGER NOT NULL,
    high_water_mark INTEGER NOT NULL DEFAULT 3,
    last_instance   TEXT,
    updated_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    PRIMARY KEY (contributor, year, week)
);

-- ═══════════════════════════════════════════════════════
-- LAYER 3: TEMPORAL EVENT STORE (TimescaleDB Hypertables)
-- ═══════════════════════════════════════════════════════

-- ── Volley Events ──

CREATE TABLE volley_events (
    time            TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    volley_id       UUID NOT NULL DEFAULT uuid_generate_v4(),
    from_agent_id   UUID NOT NULL,
    to_agent_id     UUID NOT NULL,
    from_client_id  UUID NOT NULL,
    to_client_id    UUID NOT NULL,
    from_wallet     TEXT NOT NULL,
    to_wallet       TEXT NOT NULL,
    from_ccc        VARCHAR(3) NOT NULL,
    to_ccc          VARCHAR(3) NOT NULL,
    volley_type     TEXT NOT NULL CHECK (volley_type IN ('SEEK', 'ACK', 'STATUS', 'ALERT')),
    ref_ccc_id      TEXT,
    content_hash    TEXT,
    cross_instance  BOOLEAN NOT NULL DEFAULT FALSE,
    from_instance   TEXT NOT NULL,
    to_instance     TEXT,
    attested        BOOLEAN NOT NULL DEFAULT FALSE,
    hcs_tx_id       TEXT,
    base_tx_hash    TEXT,
    latency_ms      INTEGER,
    response_text   TEXT,                              -- cross-instance AI response (truncated)
    metadata        JSONB DEFAULT '{}'
);

SELECT create_hypertable('volley_events', 'time',
    chunk_time_interval => INTERVAL '1 day',
    if_not_exists => TRUE
);

CREATE INDEX idx_volley_from ON volley_events(from_ccc, time DESC);
CREATE INDEX idx_volley_to ON volley_events(to_ccc, time DESC);
CREATE INDEX idx_volley_cross ON volley_events(cross_instance, time DESC);
CREATE INDEX idx_volley_clients ON volley_events(from_client_id, to_client_id, time DESC);

-- ── CCC-ID Events ──

CREATE TABLE ccc_id_events (
    time            TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    ccc_id          TEXT NOT NULL UNIQUE,
    contributor     VARCHAR(3) NOT NULL,
    client_id       UUID NOT NULL,
    agent_id        UUID NOT NULL,
    year            INTEGER NOT NULL,
    week            INTEGER NOT NULL,
    sequence        INTEGER NOT NULL,
    reward          INTEGER NOT NULL,
    instance_id     TEXT NOT NULL,
    workspace       TEXT NOT NULL DEFAULT 'CCC',
    hcs_tx_id       TEXT,
    base_tx_hash    TEXT,
    nft_serial      INTEGER,
    season          INTEGER NOT NULL,
    content_summary TEXT,                              -- brief description of contribution
    embedding       vector(384),                      -- for semantic search of contributions
    metadata        JSONB DEFAULT '{}'
);

SELECT create_hypertable('ccc_id_events', 'time',
    chunk_time_interval => INTERVAL '1 day',
    if_not_exists => TRUE
);

CREATE INDEX idx_cccid_contributor ON ccc_id_events(contributor, time DESC);
CREATE INDEX idx_cccid_client ON ccc_id_events(client_id, time DESC);
CREATE INDEX idx_cccid_week ON ccc_id_events(contributor, year, week);
CREATE INDEX idx_cccid_embedding ON ccc_id_events
    USING ivfflat (embedding vector_cosine_ops) WITH (lists = 200);

-- ── Governance Events ──

CREATE TABLE governance_events (
    time            TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    event_id        UUID NOT NULL DEFAULT uuid_generate_v4(),
    event_type      TEXT NOT NULL
                    CHECK (event_type IN ('rule_locked', 'rule_proposed', 'bad_agent',
                           'bad_agent_resolved', 'vsa', 'isc', 'season', 'document_published')),
    agent_id        UUID NOT NULL,
    client_id       UUID NOT NULL,
    target_id       TEXT,
    payload         JSONB NOT NULL,
    approval_ccc_id TEXT,
    hcs_tx_id       TEXT,
    base_tx_hash    TEXT,
    season          INTEGER NOT NULL
);

SELECT create_hypertable('governance_events', 'time',
    chunk_time_interval => INTERVAL '1 week',
    if_not_exists => TRUE
);

CREATE INDEX idx_gov_type ON governance_events(event_type, time DESC);
CREATE INDEX idx_gov_agent ON governance_events(agent_id, time DESC);

-- ── Agent State Log (durable execution) ──

CREATE TABLE agent_state_log (
    time            TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    agent_id        UUID NOT NULL,
    session_id      UUID NOT NULL,
    state_type      TEXT NOT NULL
                    CHECK (state_type IN ('checkpoint', 'tool_call', 'llm_request',
                           'llm_response', 'error', 'memory_write', 'memory_read')),
    step_number     INTEGER NOT NULL,
    state_data      JSONB NOT NULL,
    duration_ms     INTEGER,
    token_count     INTEGER
);

SELECT create_hypertable('agent_state_log', 'time',
    chunk_time_interval => INTERVAL '1 hour',
    if_not_exists => TRUE
);

CREATE INDEX idx_state_agent ON agent_state_log(agent_id, session_id, time DESC);

-- ── Connection Events (client-to-client handshake) ──

CREATE TABLE connection_events (
    time            TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    connection_id   UUID NOT NULL DEFAULT uuid_generate_v4(),
    initiator_client_id UUID NOT NULL REFERENCES clients(id),
    target_client_id UUID NOT NULL REFERENCES clients(id),
    initiator_wallet TEXT NOT NULL,
    target_wallet   TEXT NOT NULL,
    initiator_agent_id UUID NOT NULL,
    target_agent_id UUID NOT NULL,
    event_type      TEXT NOT NULL
                    CHECK (event_type IN ('handshake_request', 'handshake_accept',
                           'handshake_reject', 'session_start', 'session_end',
                           'heartbeat', 'disconnect')),
    initiator_instance TEXT NOT NULL,
    target_instance TEXT,
    payload         JSONB DEFAULT '{}',
    latency_ms      INTEGER,
    metadata        JSONB DEFAULT '{}'
);

SELECT create_hypertable('connection_events', 'time',
    chunk_time_interval => INTERVAL '1 day',
    if_not_exists => TRUE
);

CREATE INDEX idx_conn_initiator ON connection_events(initiator_client_id, time DESC);
CREATE INDEX idx_conn_target ON connection_events(target_client_id, time DESC);
CREATE INDEX idx_conn_type ON connection_events(event_type, time DESC);

-- ═══════════════════════════════════════════════════════
-- LAYER 3B: COMPRESSION + RETENTION
-- ═══════════════════════════════════════════════════════

ALTER TABLE volley_events SET (
    timescaledb.compress,
    timescaledb.compress_segmentby = 'from_ccc,to_ccc',
    timescaledb.compress_orderby = 'time DESC'
);
SELECT add_compression_policy('volley_events', INTERVAL '7 days');

ALTER TABLE ccc_id_events SET (
    timescaledb.compress,
    timescaledb.compress_segmentby = 'contributor',
    timescaledb.compress_orderby = 'time DESC'
);
SELECT add_compression_policy('ccc_id_events', INTERVAL '7 days');

ALTER TABLE agent_state_log SET (
    timescaledb.compress,
    timescaledb.compress_segmentby = 'agent_id,session_id',
    timescaledb.compress_orderby = 'time DESC'
);
SELECT add_compression_policy('agent_state_log', INTERVAL '1 day');

ALTER TABLE connection_events SET (
    timescaledb.compress,
    timescaledb.compress_segmentby = 'initiator_client_id,target_client_id',
    timescaledb.compress_orderby = 'time DESC'
);
SELECT add_compression_policy('connection_events', INTERVAL '7 days');

-- Retention
SELECT add_retention_policy('agent_state_log', INTERVAL '30 days');
SELECT add_retention_policy('connection_events', INTERVAL '90 days');

-- ═══════════════════════════════════════════════════════
-- LAYER 4: CONTINUOUS AGGREGATES
-- ═══════════════════════════════════════════════════════

-- ── Agent Hourly Stats ──

CREATE MATERIALIZED VIEW agent_hourly_stats
WITH (timescaledb.continuous) AS
SELECT
    time_bucket('1 hour', c.time) AS bucket,
    c.contributor AS agent_ccc,
    c.client_id,
    COUNT(*) AS ccc_id_count,
    SUM(c.reward) AS total_reward
FROM ccc_id_events c
GROUP BY bucket, c.contributor, c.client_id
WITH NO DATA;

SELECT add_continuous_aggregate_policy('agent_hourly_stats',
    start_offset => INTERVAL '3 hours',
    end_offset => INTERVAL '1 hour',
    schedule_interval => INTERVAL '1 hour'
);

-- ── Network Daily Stats ──

CREATE MATERIALIZED VIEW network_daily_stats
WITH (timescaledb.continuous) AS
SELECT
    time_bucket('1 day', c.time) AS bucket,
    COUNT(DISTINCT c.contributor) AS active_agents,
    COUNT(DISTINCT c.client_id) AS active_clients,
    COUNT(*) AS total_ccc_ids,
    SUM(c.reward) AS total_rewards
FROM ccc_id_events c
GROUP BY bucket
WITH NO DATA;

SELECT add_continuous_aggregate_policy('network_daily_stats',
    start_offset => INTERVAL '3 days',
    end_offset => INTERVAL '1 day',
    schedule_interval => INTERVAL '1 day'
);

-- ── Client Weekly Stats ──

CREATE MATERIALIZED VIEW client_weekly_stats
WITH (timescaledb.continuous) AS
SELECT
    time_bucket('1 week', c.time) AS bucket,
    c.client_id,
    c.contributor AS ccc,
    COUNT(*) AS ccc_id_count,
    SUM(c.reward) AS total_reward,
    MAX(c.sequence) AS high_water_mark
FROM ccc_id_events c
GROUP BY bucket, c.client_id, c.contributor
WITH NO DATA;

SELECT add_continuous_aggregate_policy('client_weekly_stats',
    start_offset => INTERVAL '2 weeks',
    end_offset => INTERVAL '1 day',
    schedule_interval => INTERVAL '1 day'
);

-- ── Connection Stats (for exo-style visualization) ──

CREATE MATERIALIZED VIEW connection_stats
WITH (timescaledb.continuous) AS
SELECT
    time_bucket('1 hour', v.time) AS bucket,
    v.from_client_id,
    v.to_client_id,
    v.from_ccc,
    v.to_ccc,
    COUNT(*) AS volley_count,
    COUNT(*) FILTER (WHERE v.cross_instance) AS cross_instance_count,
    AVG(v.latency_ms) AS avg_latency_ms,
    COUNT(DISTINCT v.volley_type) AS volley_types_used
FROM volley_events v
GROUP BY bucket, v.from_client_id, v.to_client_id, v.from_ccc, v.to_ccc
WITH NO DATA;

SELECT add_continuous_aggregate_policy('connection_stats',
    start_offset => INTERVAL '3 hours',
    end_offset => INTERVAL '1 hour',
    schedule_interval => INTERVAL '1 hour'
);

-- ═══════════════════════════════════════════════════════
-- LAYER 5: VIEWS FOR VISUALIZATION (exo-style graph)
-- ═══════════════════════════════════════════════════════

-- ── Active Nodes (for graph visualization) ──

CREATE VIEW active_nodes AS
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
    i.status AS instance_status,
    a.agent_id,
    a.ccc_id_count,
    a.reputation_score,
    a.last_active_at,
    (SELECT COUNT(*) FROM agent_sessions s
     WHERE s.agent_id = a.id AND s.status = 'active') AS active_sessions,
    (SELECT SUM(reward) FROM ccc_id_events e
     WHERE e.client_id = c.id
     AND e.time > NOW() - INTERVAL '24 hours') AS rewards_24h
FROM clients c
JOIN agents a ON a.client_id = c.id AND a.active = TRUE
JOIN instances i ON i.id = a.instance_id AND i.status = 'active';

-- ── Active Edges (for graph visualization) ──

CREATE VIEW active_edges AS
SELECT
    g.from_agent_id,
    g.to_agent_id,
    g.from_wallet,
    g.to_wallet,
    fc.ccc AS from_ccc,
    tc.ccc AS to_ccc,
    fi.domain AS from_domain,
    ti.domain AS to_domain,
    g.interaction_count,
    g.trust_score,
    g.handshake_completed,
    g.last_volley_at,
    cs.volley_count AS recent_volleys,
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
        COUNT(*) AS volley_count,
        AVG(latency_ms) AS avg_latency_ms
    FROM volley_events v
    WHERE v.from_client_id = g.from_client_id
    AND v.to_client_id = g.to_client_id
    AND v.time > NOW() - INTERVAL '1 hour'
) cs ON TRUE
WHERE g.interaction_count > 0;

-- ── Network Graph Summary (for exo-style dashboard) ──

CREATE VIEW network_graph AS
SELECT json_build_object(
    'nodes', (SELECT json_agg(row_to_json(n)) FROM active_nodes n),
    'edges', (SELECT json_agg(row_to_json(e)) FROM active_edges e),
    'stats', json_build_object(
        'total_nodes', (SELECT COUNT(*) FROM active_nodes),
        'total_edges', (SELECT COUNT(*) FROM active_edges),
        'handshakes', (SELECT COUNT(*) FROM active_edges WHERE handshake_completed),
        'cross_instance_volleys_1h', (
            SELECT COUNT(*) FROM volley_events
            WHERE cross_instance AND time > NOW() - INTERVAL '1 hour'
        )
    )
) AS graph;

-- ═══════════════════════════════════════════════════════
-- BOOTSTRAP DATA
-- ═══════════════════════════════════════════════════════

-- Season 3
INSERT INTO season_state (season, tag, status, start_week, end_week, shared_kernel_version, started_at)
VALUES (3, '#WeOwnSeason003', 'ACTIVE', 6, 22, 'v3.1.2.1', '2026-02-02')
ON CONFLICT (season) DO NOTHING;

-- SharedKernel Rules
INSERT INTO shared_kernel_rules (rule_id, description, status, category, item_type) VALUES
    ('R-011', '#OnlyHumanApproves — AI CANNOT approve', 'IMMUTABLE', 'governance', 'RULE'),
    ('R-194', 'CCC-ID generation ONLY in CCC workspace', 'IMMUTABLE', 'workspace', 'RULE'),
    ('R-197', 'Doc generation = #MetaAgent ONLY', 'IMMUTABLE', 'governance', 'RULE'),
    ('R-206', 'ADMIN accounts NEVER generate CCC-IDs', 'IMMUTABLE', 'identity', 'RULE'),
    ('R-168', 'CCC-ID tied to contributor, NOT session', 'LOCKED', 'operational', 'RULE'),
    ('R-169', 'CCC-ID resets at ISO week boundary', 'LOCKED', 'operational', 'RULE'),
    ('R-181', '_001 reserved for #WeeklySummary', 'LOCKED', 'operational', 'RULE'),
    ('R-201', '_002 reserved for #WeeklyPlan', 'LOCKED', 'operational', 'RULE'),
    ('R-202', '_003 reserved for #WeeklyReflection', 'LOCKED', 'operational', 'RULE'),
    ('R-212', 'Cross-instance CCC-ID deconfliction REQUIRED', 'LOCKED', 'operational', 'RULE'),
    ('R-213', 'System Prompt MUST include INSTANCE IDENTITY', 'LOCKED', 'instance', 'RULE')
ON CONFLICT (rule_id) DO NOTHING;
```