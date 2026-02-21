# ETHDenver 2026 — CCC Gateway: Hackathon Plan
> Freeze: **Fri Feb 20 @ 5 PM MT** · Judging: **Sat Feb 21 @ 9 AM MT**
> Written after full repo scan — Feb 19, 2026

---

## STATUS SNAPSHOT

### ✅ Built & Verified

| What | Location |
|------|----------|
| All 9 gateway API routes | `apps/gateway/app/` |
| CCC-ID generator (ISO week, high-water mark) | `apps/gateway/app/lib/ccc-id-generator.ts` |
| SharedKernel governance engine (10 rules) | `apps/gateway/app/lib/shared-kernel.ts` |
| Hedera HCS attestation layer | `packages/hedera/src/hcs-attestor.ts` |
| 5 Hedera token definitions + bootstrap CLI | `packages/hedera/src/tokens/` |
| **10 Solidity contracts** | `packages/adi/src/` |
| **Foundry deploy script (all 10)** | `packages/adi/script/Deploy.s.sol` ✅ |
| **Dashboard → Gateway typed client + hooks** | `apps/web/lib/gateway-client.ts` ✅ |
| Full web dashboard (onboarding, stats, CCC-ID, volley, governance, Hedera panels) | `apps/web/` |
| 7 LLM providers abstracted | `packages/ai-providers/src/providers.ts` |
| Zustand persistent state + Wagmi wallet | `apps/web/lib/store.ts` |

### ❌ Missing (Real Gaps)

| Gap | Severity | Time |
|-----|----------|------|
| No `.env` files exist anywhere | 🔴 CRITICAL | 30 min |
| CORS not configured on gateway | 🔴 CRITICAL | 15 min |
| `foundry.toml` targets ADI testnet, not Base Sepolia | 🔴 CRITICAL | 5 min |
| Contracts not deployed on any chain | 🔴 CRITICAL | 1–2 hr |
| Hedera tokens not bootstrapped | 🟠 HIGH | 30 min |
| Gateway not at a public URL | 🟠 HIGH | 1–2 hr |
| Web dashboard not at a public URL | 🟠 HIGH | 30 min |
| Network visualization component | 🟡 MEDIUM | 2–3 hr |
| Live cross-instance #ContextVolley | � HIGH | 2 hr |
| On-chain CCC-ID verify page | 🟡 MEDIUM | 1 hr |

---

## CRITICAL PATH — DO IN ORDER

| # | Task | Time |
|---|------|------|
| 1 | Create `.env.local` files | 30 min |
| 2 | Add CORS middleware to gateway | 15 min |
| 3 | Fix `foundry.toml` for Base Sepolia | 5 min |
| 4 | Install OpenZeppelin + compile contracts | 30 min |
| 5 | Deploy 10 contracts to Base Sepolia | 1 hr |
| 6 | Bootstrap Hedera tokens | 30 min |
| 7 | Deploy gateway to public URL | 1 hr |
| 8 | Deploy web dashboard to public URL | 30 min |
| 9 | End-to-end smoke test | 1 hr |
| 10 | 🟠 Live #ContextVolley bridge (AnythingLLM) | 2 hr |
| 11 | Network visualization | 2–3 hr |
| 12 | Pitch deck finalize | 2 hr |

---

## STEP-BY-STEP EXECUTION

---

### STEP 1 — `.env.local` Files

**`apps/gateway/.env.local`:**
```bash
GATEWAY_INSTANCE=INT-E01
GATEWAY_SEASON=3
HEDERA_ACCOUNT_ID=0.0.XXXXXXX
HEDERA_PRIVATE_KEY=302e...
HEDERA_NETWORK=testnet
# Fill after Step 6 (bootstrap creates these):
HCS_TOPIC_CCC_ID=
HCS_TOPIC_CONTEXT_VOLLEY=
HCS_TOPIC_GOVERNANCE=
HCS_TOPIC_VSA=
HCS_TOPIC_AGENT_REGISTRY=
HCS_TOPIC_SEASON=
# Base L2
BASE_SEPOLIA_RPC=https://sepolia.base.org
BASE_PRIVATE_KEY=0x<deployer-wallet-key>
# AnythingLLM (fill for Step 11):
INT_E01_URL=https://ethdenver.ccc.bot
INT_E01_API_KEY=
INT_P01_URL=https://ai.weown.agency
INT_P01_API_KEY=
```

**`apps/web/.env.local`:**
```bash
# localhost during dev, change to deployed gateway URL after Step 7
NEXT_PUBLIC_API_URL=http://localhost:3002
```

**Get free Base Sepolia testnet ETH:**
- https://www.coinbase.com/faucets/base-ethereum-goerli-faucet
- https://faucet.quicknode.com/base/sepolia

**RPC options:** Public (`https://sepolia.base.org`) is fine to start. If slow during demo, use Alchemy free tier (sign up at alchemy.com → create Base Sepolia app).

---

### STEP 2 — CORS Middleware

**Create `apps/gateway/middleware.ts`** (same level as `app/` folder):

```typescript
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
    if (request.method === "OPTIONS") {
        return new NextResponse(null, {
            status: 200,
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
                "Access-Control-Allow-Headers": "Content-Type, Authorization",
            },
        });
    }
    const response = NextResponse.next();
    response.headers.set("Access-Control-Allow-Origin", "*");
    response.headers.set("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
    response.headers.set("Access-Control-Allow-Headers", "Content-Type, Authorization");
    return response;
}

export const config = { matcher: "/:path*" };
```

**Verify:** In browser DevTools (F12 → Network), after starting gateway, no red CORS errors on API calls.

---

### STEP 3 — Fix `foundry.toml`

**Replace entire `packages/adi/foundry.toml` with:**

```toml
[profile.default]
src = "src"
out = "out"
libs = ["lib"]
solc_version = "0.8.24"
via_ir = true
optimizer = true
optimizer_runs = 200

[rpc_endpoints]
base_sepolia = "https://sepolia.base.org"

[etherscan]
base_sepolia = { key = "${BASESCAN_API_KEY}", url = "https://api-sepolia.basescan.org/api" }
```

**Optional Basescan API key** (for contract verification): https://basescan.org → Sign Up → API Keys.

---

### STEP 4 + 5 — Build & Deploy Contracts

```bash
# Check Foundry
forge --version
# If missing: curl -L https://foundry.paradigm.xyz | bash && foundryup

# Check / install OpenZeppelin
ls packages/adi/lib/
# If empty:
cd packages/adi && forge install OpenZeppelin/openzeppelin-contracts --no-commit

# Compile to catch errors early
cd packages/adi
forge build

# Deploy (no verification — faster, fine for demo)
export PRIVATE_KEY=0x<your-base-sepolia-private-key>
forge script script/Deploy.s.sol:Deploy \
  --rpc-url https://sepolia.base.org \
  --broadcast \
  -vvvv

# Deploy WITH verification (source visible on Basescan — more impressive)
forge script script/Deploy.s.sol:Deploy \
  --rpc-url https://sepolia.base.org \
  --broadcast \
  --verify \
  --etherscan-api-key $BASESCAN_API_KEY \
  -vvvv
```

**The deploy script deploys these 10 contracts in order:**
`CCCGovernanceToken` → `SharedKernelRegistry` → `SeasonRegistry` → `ISCRegistry` → `AgentIdentityRegistry` → `AgentReputationRegistry` → `AgentValidationRegistry` → `VSARegistry` → `DocumentRegistry` → `CCCIdRegistry`

**Save the output addresses** to `deployed-addresses.json` at repo root immediately after deploy.

**If Foundry fails (20-min rule):** Use https://remix.ethereum.org — paste each `.sol` file, compile, deploy individually. Slower but zero setup.

---

### STEP 6 — Bootstrap Hedera Tokens

```bash
cd packages/hedera
pnpm add -D tsx   # if not installed

export HEDERA_ACCOUNT_ID=0.0.XXXXXXX
export HEDERA_PRIVATE_KEY=302e...
export HEDERA_NETWORK=testnet

npx tsx src/tokens/bootstrap.ts
```

**Output:** 5 token IDs. Copy them into `apps/gateway/.env.local`.
HCS topics are auto-created on first gateway API call — copy logged topic IDs back to `.env.local` after.

---

### STEP 7 — Deploy Gateway (Public URL)

#### Option A: Vercel ⭐ Recommended

```bash
npm i -g vercel
cd apps/gateway
vercel
# Add all .env.local vars in Vercel dashboard → Settings → Environment Variables
vercel --prod
```

**Potential issue:** 10-sec timeout on free tier. If Hedera calls timeout, use Option B.

#### Option B: Digital Ocean (Your Existing Infrastructure)

```bash
ssh root@YOUR_DROPLET_IP
git clone https://github.com/WeOwnNetwork/EthDenver-submission && cd EthDenver-submission
curl -fsSL https://get.pnpm.io/install.sh | sh -s -- --yes && source ~/.bashrc
pnpm install
nano apps/gateway/.env.local   # paste env vars
pnpm turbo build --filter=gateway
npm install -g pm2
cd apps/gateway && pm2 start npm --name "ccc-gateway" -- start && pm2 save && pm2 startup
```

Then point DNS: `gateway.ccc.weown.dev → YOUR_DROPLET_IP` + nginx proxy → port 3000.

#### Option C: Railway.app (Middle ground)

https://railway.app → New Project → Deploy from GitHub → set root to `apps/gateway` → add env vars → done.

**Recommendation:** Vercel first. If timeout errors in smoke test, switch to DO (already have infra).

---

### STEP 8 — Deploy Web Dashboard

```bash
cd apps/web
# Update env to point at deployed gateway URL
echo "NEXT_PUBLIC_API_URL=https://YOUR-GATEWAY-URL" > .env.production
vercel --prod
```

Update `NEXT_PUBLIC_API_URL` to your **live gateway URL** — not localhost.

---

### STEP 9 — Smoke Test Checklist

Run this before calling anything done. Use a fresh browser (clear local storage first).

- [ ] Dashboard URL loads
- [ ] MetaMask connects (Base Sepolia — Chain ID 84532)
- [ ] Onboarding: CCC code → LLM provider → Connect completes
- [ ] Agent appears in agents list
- [ ] Generate CCC-ID → appears in event log with reward
- [ ] HCS attestation visible on https://hashscan.io/testnet
- [ ] Send #ContextVolley → appears in event log
- [ ] Stats panel shows correct counts
- [ ] Governance panel: lock a rule
- [ ] Hedera panel: 5 token IDs shown
- [ ] Base Sepolia contract visible at https://sepolia.basescan.org

---

## TIER 2 — "WOW" FEATURES

---

### Network Visualization

**Option A: vis-network** ⭐ Best visual impact
```bash
cd apps/web && pnpm add vis-network vis-data
```
Create `apps/web/components/gateway/network-graph.tsx`. Show 5 nodes (INT-M01, INT-P01, INT-P02, INT-E01★, INT-OG8) with edges. Animate edges on VOLLEY events from the event log polling hook.
**Time:** 2–3 hrs.

**Option B: React Flow** (easier Tailwind styling)
```bash
cd apps/web && pnpm add @xyflow/react
```

**Option C: Static SVG in pitch deck** — zero time, zero risk.

**Timebox Option A to 2 hrs. If not done, use Option C.**

---

### Live #ContextVolley (AnythingLLM Bridge)

**Priority: 🟠 HIGH — core concept of the project, do this before network viz.**

**How it works end-to-end:**
1. Dashboard sends `POST /volley` with `{ from: "LDC", to: "ROM", content: "...", attest: true }`
2. `VolleySchema.to` is a 3-letter CCC code. The gateway looks up that agent in `agentRegistry` → reads `homeInstance` (e.g. `"INT-P01"`)
3. If `homeInstance !== gateway.instance` → cross-instance → forward to that AnythingLLM via REST
4. AnythingLLM responds → gateway logs a `CROSS_INSTANCE_RESPONSE` event
5. Dashboard event log shows both the outbound volley and the live AI response

**No schema changes needed.** `VolleySchema` already has `content: z.any()` and the agent registry already stores `homeInstance`.

---

#### Step A — Get AnythingLLM API Keys

On each live instance, go to: **Settings → API Keys → Generate New Key**
- INT-E01 (`https://ethdenver.ccc.bot`) → copy key → set `INT_E01_API_KEY` in gateway `.env.local`
- INT-P01 (`https://ai.weown.agency`) → copy key → set `INT_P01_API_KEY` in gateway `.env.local`

Also confirm workspace slug. In AnythingLLM, each workspace has a slug (usually the name lowercased, e.g. `"ccc"` or `"default"`). Check **Workspace Settings** → the URL slug is in the address bar when you open the workspace.

---

#### Step B — Create `apps/gateway/app/lib/anythingllm-bridge.ts`

```typescript
// Map from gateway instance ID → AnythingLLM config
const INSTANCE_CONFIG: Record<string, { baseUrl: string; apiKey: string; workspace: string }> = {
    "INT-E01": {
        baseUrl: process.env.INT_E01_URL ?? "https://ethdenver.ccc.bot",
        apiKey: process.env.INT_E01_API_KEY ?? "",
        workspace: process.env.INT_E01_WORKSPACE ?? "ccc",
    },
    "INT-P01": {
        baseUrl: process.env.INT_P01_URL ?? "https://ai.weown.agency",
        apiKey: process.env.INT_P01_API_KEY ?? "",
        workspace: process.env.INT_P01_WORKSPACE ?? "ccc",
    },
    "INT-P02": {
        baseUrl: process.env.INT_P02_URL ?? "",
        apiKey: process.env.INT_P02_API_KEY ?? "",
        workspace: process.env.INT_P02_WORKSPACE ?? "ccc",
    },
};

export function isLiveInstance(instanceId: string): boolean {
    const cfg = INSTANCE_CONFIG[instanceId];
    return !!(cfg?.baseUrl && cfg?.apiKey);
}

export async function sendVolleyToInstance(
    instanceId: string,
    fromCcc: string,
    content: unknown
): Promise<{ response: string; instanceId: string } | null> {
    const cfg = INSTANCE_CONFIG[instanceId];
    if (!cfg?.baseUrl || !cfg?.apiKey) return null;

    // Normalize content to a string for AnythingLLM
    const message =
        typeof content === "string"
            ? content
            : JSON.stringify(content);

    try {
        const res = await fetch(
            `${cfg.baseUrl}/api/v1/workspace/${cfg.workspace}/chat`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${cfg.apiKey}`,
                },
                body: JSON.stringify({
                    message: `#ContextVolley from ${fromCcc}: ${message}`,
                    mode: "chat",
                }),
                signal: AbortSignal.timeout(15_000), // 15s timeout
            }
        );

        if (!res.ok) return null;
        const data = await res.json();
        return {
            response: (data.textResponse as string) ?? "(no response)",
            instanceId,
        };
    } catch {
        return null;
    }
}
```

---

#### Step C — Update `apps/gateway/app/volley/route.ts`

Replace the entire file with this (adds cross-instance bridge after existing HCS logic):

```typescript
import { NextResponse } from "next/server";
import { gateway } from "../lib/gateway";
import { VolleySchema, type GatewayResponse } from "../lib/types";
import { glog } from "../lib/logger";
import { sendVolleyToInstance, isLiveInstance } from "../lib/anythingllm-bridge";
import crypto from "crypto";

export const POST = async (request: Request): Promise<Response> => {
    try {
        const body = await request.json();
        const parsed = VolleySchema.parse(body);

        const volleyId = crypto.randomUUID();
        gateway.totalVolleys++;

        // Resolve which instance the target agent lives on
        const targetAgent = gateway.agentRegistry.get(parsed.to);
        const targetInstance = targetAgent?.homeInstance ?? "UNKNOWN";
        const isCrossInstance =
            targetInstance !== gateway.instance && targetInstance !== "UNKNOWN";

        // HCS attestation
        if (parsed.attest) {
            const contentHash = crypto
                .createHash("sha256")
                .update(JSON.stringify(parsed.content || ""))
                .digest("hex");

            await gateway.attestSafe(async () => {
                await gateway.hcs.attestContextVolley({
                    volley_id: volleyId,
                    from: parsed.from,
                    to: `AI:@${parsed.to}`,
                    volley_type: parsed.volleyType,
                    ref_ccc_id: parsed.ref || "",
                    content_hash: contentHash,
                });
            });
        }

        // Log outbound volley
        gateway.eventLog.push({
            id: volleyId,
            type: "VOLLEY",
            agent: parsed.from,
            timestamp: new Date().toISOString(),
            summary: `🏐 ${parsed.from} → AI:@${parsed.to}${
                isCrossInstance ? ` [${targetInstance}]` : ""
            } (${parsed.volleyType})`,
        });

        glog.info("ContextVolley", {
            from: parsed.from,
            to: parsed.to,
            type: parsed.volleyType,
            crossInstance: isCrossInstance,
            targetInstance,
        });

        // Cross-instance: forward to AnythingLLM and log response
        let crossInstanceResponse: string | null = null;
        if (isCrossInstance && isLiveInstance(targetInstance)) {
            const result = await sendVolleyToInstance(
                targetInstance,
                parsed.from,
                parsed.content
            );
            if (result) {
                crossInstanceResponse = result.response;
                gateway.eventLog.push({
                    id: crypto.randomUUID(),
                    type: "CROSS_INSTANCE_RESPONSE",
                    agent: parsed.to,
                    timestamp: new Date().toISOString(),
                    summary: `💬 ${parsed.to} [${targetInstance}] → ${parsed.from}: ${result.response.slice(0, 120)}${
                        result.response.length > 120 ? "…" : ""
                    }`,
                });
            }
        }

        return NextResponse.json<GatewayResponse>({
            ok: true,
            data: {
                volleyId,
                from: parsed.from,
                to: `AI:@${parsed.to}`,
                volleyType: parsed.volleyType,
                attested: parsed.attest,
                crossInstance: isCrossInstance,
                targetInstance,
                status: isCrossInstance
                    ? crossInstanceResponse
                        ? "delivered"
                        : "forwarded"
                    : "delivered",
                response: crossInstanceResponse ?? undefined,
            },
            timestamp: new Date().toISOString(),
            instance: gateway.instance,
        });
    } catch (error) {
        return NextResponse.json<GatewayResponse>(
            {
                ok: false,
                error: { code: "ERROR", message: String(error) },
                timestamp: new Date().toISOString(),
                instance: gateway.instance,
            },
            { status: 400 }
        );
    }
};
```

---

#### Step D — Check `AgentRegistry.get()` exists

The bridge calls `gateway.agentRegistry.get(parsed.to)`. Verify this method exists:

```bash
grep -n "get(" apps/gateway/app/lib/agent-registry.ts
```

If it's missing or named differently (e.g. `find`, `getAgent`), update the call in `volley/route.ts` to match.

---

#### Step E — Add new env vars to gateway `.env.local`

```bash
# Add these (INT_E01_URL/INT_P01_URL already listed above)
INT_E01_WORKSPACE=ccc
INT_P01_WORKSPACE=ccc
```

---

#### Step F — Test the bridge

```bash
# 1. Register two agents on different instances first:
# Agent LDC → connects to INT-E01 (your gateway)
# Agent ROM → connects to INT-P01 (remote instance)

# 2. Send a cross-instance volley:
curl -X POST http://localhost:3002/volley \
  -H "Content-Type: application/json" \
  -d '{
    "from": "LDC",
    "to": "ROM",
    "volleyType": "SEEK",
    "content": "What governance rules are locked in Season 3?",
    "attest": true
  }'

# Expected response:
# { ok: true, data: { crossInstance: true, targetInstance: "INT-P01",
#   status: "delivered", response: "...AI response from INT-P01..." } }
```

**3. Watch the event log** in the dashboard — you should see TWO new entries:
- `🏐 LDC → AI:@ROM [INT-P01] (SEEK)` — outbound
- `💬 ROM [INT-P01] → LDC: ...` — live AI response

---

#### Fallback Options

**Option B: Simulated response** — If the AnythingLLM API is unreachable (wrong key, network issue), add this guard in the bridge:

```typescript
// In sendVolleyToInstance, before the fetch:
if (process.env.SIMULATE_CROSS_INSTANCE === "true") {
    return {
        response: `[${instanceId}] Acknowledged #ContextVolley from ${fromCcc}. SharedKernel v3.1.2.1 is active. Season 3 certification confirmed.`,
        instanceId,
    };
}
```

Set `SIMULATE_CROSS_INSTANCE=true` in `.env.local` and the demo shows a realistic response without a live AnythingLLM call.

**Option C: Skip, describe verbally** — Only if Options A and B both fail.

---

### On-Chain CCC-ID Verify Page

Create `apps/web/app/gateway/verify/page.tsx`:
- Input: CCC-ID string (e.g. `LDC_2026-W08_015`)
- Two result panels: Hedera HCS (hashscan link) + Base Sepolia `CCCIdRegistry` lookup
- Use `apps/web/lib/contracts.ts` for the contract ABI/address
- **Time:** 1–2 hrs. High demo impact — "watch me prove this contribution is permanent on two chains."

---

## QUICK REFERENCE

### Public URLs at Demo Time

| Component | Target |
|-----------|--------|
| Web Dashboard | Vercel URL or `ccc.weown.dev` |
| Gateway API | Vercel URL or `gateway.ccc.weown.dev` |
| INT-E01 | `https://ethdenver.ccc.bot` |
| INT-P01 | `https://ai.weown.agency` |
| Contracts | Base Sepolia → https://sepolia.basescan.org |
| HCS Attestations | Hedera Testnet → https://hashscan.io/testnet |

### Contract Addresses File

After deploy, create `deployed-addresses.json` at repo root and reference it in the submission form, README, and pitch deck.

### Cut List (If You're Out of Time)

| Cut This | Keep This |
|----------|-----------|
| PostgreSQL | In-memory state |
| Snapshot vote | Governance panel already shows on-chain rules |
| Mobile responsiveness | Desktop demo only |
| ISC certification flow | Flag it as "coming in Season 4" |
| Multi-wallet support | MetaMask only is fine |

---

## SUBMISSION CHECKLIST

- [ ] Working dashboard URL (not localhost)
- [ ] Working gateway URL (not localhost)
- [ ] At least 1 CCC-ID minted and verifiable on Hedera hashscan
- [ ] At least 1 #ContextVolley logged
- [ ] All 10 contracts deployed (include addresses in submission)
- [ ] `deployed-addresses.json` at repo root
- [ ] README updated with: what it is, live URLs, contract addresses, team
- [ ] 2-min demo video recorded as backup (in case live demo fails)
- [ ] Pitch deck includes: problem → architecture diagram → dual-chain proof → live demo plan

---

## PITCH RECOMMENDATIONS

**Opening line:** *"Every AI agent interaction in our network is permanently attributed, attested, and rewarded — across two blockchains, in real time."*

**Demo flow (5 min):**
1. Open dashboard → connect wallet (30 sec)
2. Onboard as a new agent — show CCC code mapping to identity (1 min)
3. Generate a CCC-ID → show Hedera hashscan proof immediately (1 min)
4. Send a #ContextVolley → show it propagate in event log (1 min)
5. Show the network visualization with live nodes (30 sec)
6. Show a contract address on Basescan (30 sec)

**Key differentiators to emphasize:**
- **Dual-chain:** Hedera for speed/auditability + Base for EVM composability — not redundant, intentional
- **ERC-8004:** Proposing a new standard for AI agent identity
- **Season governance:** Rules are locked on-chain — no single entity can override them
- **5 live instances:** Not a prototype — INT-E01 is running here, right now, at ETHDenver

**Risk mitigations:**
- Live demo fails → pre-recorded video backup
- Hedera slow → show hashscan directly (hashscan.io/testnet has your topic pre-loaded)
- "Why two chains?" → Hedera: 3-sec finality, $0.0001 per message, audit log. Base: EVM ecosystem, DeFi composability, token standards.
