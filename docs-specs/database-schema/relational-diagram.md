╔═══════════════════════════════════════════════════════════════════════════════════╗
║  ENTITY RELATIONSHIP — CCC GATEWAY DATABASE                                       ║
║  TimescaleDB + pgvector + RLS                                                     ║
╠═══════════════════════════════════════════════════════════════════════════════════╣
║                                                                                   ║
║  ┌─────────────┐       ┌──────────────┐       ┌──────────────────┐              ║
║  │   clients   │──1:N──│  instances   │──1:N──│   workspaces     │              ║
║  │             │       │              │       │                  │              ║
║  │ wallet_addr │       │ instance_id  │       │ workspace_id     │              ║
║  │ uuid (PK)   │       │ domain       │       │ slug ("ccc")     │              ║
║  │ ccc          │       │ type         │       │ type             │              ║
║  │ contributor  │       │ api_key_hash │       │ instance_id (FK) │              ║
║  │ tier         │       │ client_id FK │       │                  │              ║
║  └──────┬──────┘       └──────┬───────┘       └────────┬─────────┘              ║
║         │                     │                         │                        ║
║         │1:N                  │1:N                      │1:N                     ║
║         ▼                     ▼                         ▼                        ║
║  ┌─────────────┐       ┌──────────────┐       ┌──────────────────┐              ║
║  │  projects   │       │   agents     │       │  workspace_      │              ║
║  │             │       │              │       │  memory          │              ║
║  │ project_id  │       │ agent_id     │       │                  │              ║
║  │ client_id FK│       │ ccc          │       │ workspace_id FK  │              ║
║  │ name        │       │ instance_id  │       │ key              │              ║
║  │ type        │       │ client_id FK │       │ value (JSONB)    │              ║
║  └──────┬──────┘       │ wallet_addr  │       │ embedding (vec)  │              ║
║         │              └──────┬───────┘       └──────────────────┘              ║
║         │                     │                                                  ║
║         │                     │1:N                                               ║
║         │                     ▼                                                  ║
║         │              ┌──────────────┐                                          ║
║         │              │ agent_       │       ┌──────────────────┐              ║
║         │              │ scratchpad   │       │ agent_working_   │              ║
║         │              │ (RLS)        │       │ memory           │              ║
║         │              │              │       │ (RLS + pgvector) │              ║
║         │              │ agent_id FK  │       │                  │              ║
║         │              │ key          │       │ agent_id FK      │              ║
║         │              │ value        │       │ content          │              ║
║         │              │ ttl          │       │ embedding (vec)  │              ║
║         │              └──────────────┘       │ decay_rate       │              ║
║         │                                     └──────────────────┘              ║
║         │                                                                        ║
║         │         ┌────────────────────────────────────────────┐                ║
║         │         │         TIMESCALEDB HYPERTABLES            │                ║
║         │         │         (Auto-partitioned by time)         │                ║
║         │         │                                            │                ║
║         │         │  ┌──────────────┐  ┌──────────────────┐  │                ║
║         │         │  │ volley_      │  │ ccc_id_          │  │                ║
║         │         │  │ events       │  │ events           │  │                ║
║         │         │  │ (1-day)      │  │ (1-day)          │  │                ║
║         │         │  └──────────────┘  └──────────────────┘  │                ║
║         │         │                                            │                ║
║         │         │  ┌──────────────┐  ┌──────────────────┐  │                ║
║         │         │  │ governance_  │  │ agent_state_     │  │                ║
║         │         │  │ events       │  │ log              │  │                ║
║         │         │  │ (1-week)     │  │ (1-hour)         │  │                ║
║         │         │  └──────────────┘  └──────────────────┘  │                ║
║         │         │                                            │                ║
║         │         │  ┌──────────────────────────────────────┐│                ║
║         │         │  │ connection_events (handshake log)    ││                ║
║         │         │  │ (1-day)                              ││                ║
║         │         │  └──────────────────────────────────────┘│                ║
║         │         └────────────────────────────────────────────┘                ║
║         │                                                                        ║
║         │         ┌────────────────────────────────────────────┐                ║
║         │         │         SHARED GLOBAL MEMORY               │                ║
║         │         │                                            │                ║
║         │         │  shared_kernel_rules (+ pgvector)          │                ║
║         │         │  shared_context (+ pgvector)               │                ║
║         │         │  global_agent_graph (trust scores)         │                ║
║         │         │  season_state                              │                ║
║         │         └────────────────────────────────────────────┘                ║
║         │                                                                        ║
║         │         ┌────────────────────────────────────────────┐                ║
║         └────────▶│         CONTINUOUS AGGREGATES              │                ║
║                   │                                            │                ║
║                   │  agent_hourly_stats (materialized)         │                ║
║                   │  network_daily_stats (materialized)        │                ║
║                   │  client_weekly_stats (materialized)        │                ║
║                   │  connection_stats (materialized)           │                ║
║                   └────────────────────────────────────────────┘                ║
╚═══════════════════════════════════════════════════════════════════════════════════╝
