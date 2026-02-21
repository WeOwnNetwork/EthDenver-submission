## apps/api/app/gateway/graph/route.ts
```typescript
import { NextResponse } from "next/server";
import { Pool } from "pg";

const pool = new Pool({ connectionString: process.env.DATABASE_URL });

export const GET = async (): Promise<Response> => {
  try {
    const result = await pool.query("SELECT * FROM network_graph");
    return NextResponse.json({
      ok: true,
      ...result.rows[0]?.graph,
    });
  } catch (error) {
    return NextResponse.json({ ok: false, error: String(error) }, { status: 500 });
  }
};
```



## graph response shape( with the specific integration later with the react d3 + shadcn and other libraries):


```json
{
  "ok": true,
  "nodes": [
    {
      "client_id": "uuid-1",
      "wallet_address": "0x1111...",
      "ccc": "LDC",
      "contributor": "Dhruv",
      "tier": "contributor",
      "instance_id": "INT-E01",
      "domain": "ethdenver.ccc.bot",
      "instance_type": "event",
      "isc_certified": true,
      "agent_id": "AI:@LDC",
      "ccc_id_count": 17,
      "reputation_score": 385,
      "active_sessions": 1,
      "rewards_24h": 170
    }
  ],
  "edges": [
    {
      "from_ccc": "LDC",
      "to_ccc": "GTM",
      "from_domain": "ethdenver.ccc.bot",
      "to_domain": "ai.yonksteam.xyz",
      "interaction_count": 12,
      "trust_score": 0.85,
      "handshake_completed": true,
      "recent_volleys": 3,
      "recent_latency": 245
    }
  ],
  "stats": {
    "total_nodes": 5,
    "total_edges": 8,
    "handshakes": 6,
    "cross_instance_volleys_1h": 3
  }
}

```

