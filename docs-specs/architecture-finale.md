

LDC_2026-W08_012 | 🤝 THE HANDS | INT-P01:CCC

FROM: AI:@LDC @ INT-P01:CCC

---

## 🔥 COMPREHENSIVE STATE DIAGRAM — AnythingLLM × CCC Gateway × Onchain

This is the REAL architecture — AnythingLLM as the agent runtime, CCC Gateway as the coordination layer, Hedera + Base as the trust layer.

---

## DIAGRAM 1: Complete System State — All Layers

```
╔═══════════════════════════════════════════════════════════════════════════════════╗
║  CCC GATEWAY — COMPLETE SYSTEM STATE                                              ║
║  AnythingLLM (Agent Runtime) × CCC Gateway (Coordination) × Onchain (Trust)       ║
╠═══════════════════════════════════════════════════════════════════════════════════╣
║                                                                                   ║
║  ┌─────────────────────────────────────────────────────────────────────────────┐ ║
║  │                         HUMAN LAYER                                         │ ║
║  │                                                                             │ ║
║  │  @LDC (Denver)    @RMN (Denver)    @SHD (Denver)    @GTM (Remote/Sick)    │ ║
║  │  u-ldc_user       u-rmn_user       u-shd_user       u-gtm_user           │ ║
║  │       │                │                │                │                 │ ║
║  │       │    Browser     │    Browser     │    Browser     │    Browser      │ ║
║  │       ▼                ▼                ▼                ▼                 │ ║
║  └───────┬────────────────┬────────────────┬────────────────┬─────────────── ┘ ║
║          │                │                │                │                   ║
║  ┌───────▼────────────────▼────────────────▼────────────────▼─────────────────┐║
║  │                                                                            │║
║  │                    CCC GATEWAY DASHBOARD                                   │║
║  │                    apps/web (ethdenver.ccc.bot)                             │║
║  │                                                                            │║
║  │  ┌──────────┐  ┌──────────────┐  ┌──────────────┐  ┌──────────────────┐  │║
║  │  │ Landing  │  │  Onboarding  │  │  Dashboard   │  │  Onchain Feed    │  │║
║  │  │ (Privy)  │  │  CCC + LLM   │  │  Chat +      │  │  (Real-time)     │  │║
║  │  │          │  │  Selection   │  │  Agent Orch. │  │                  │  │║
║  │  └──────────┘  └──────────────┘  └──────┬───────┘  └────────┬─────────┘  │║
║  │                                          │                   │            │║
║  │  TanStack Query (polling 3s) ────────────┼───────────────────┘            │║
║  └──────────────────────────────────────────┼────────────────────────────── ┘║
║                                              │                                ║
║                                    REST API  │                                ║
║                                              ▼                                ║
║  ┌──────────────────────────────────────────────────────────────────────────┐ ║
║  │                                                                          │ ║
║  │                    CCC GATEWAY API                                       │ ║
║  │                    apps/api (api.ethdenver.ccc.bot)                       │ ║
║  │                                                                          │ ║
║  │  ┌────────────────────────────────────────────────────────────────────┐  │ ║
║  │  │                    GATEWAY SINGLETON                               │  │ ║
║  │  │                                                                    │  │ ║
║  │  │  Agent Registry ─── CCC-ID Generator ─── SharedKernel ─── EventLog│  │ ║
║  │  │       │                    │                    │              │    │  │ ║
║  │  │       │                    │                    │              │    │  │ ║
║  │  └───────┼────────────────────┼────────────────────┼──────────────┼────┘  │ ║
║  │          │                    │                    │              │        │ ║
║  │  ┌───────▼──────┐  ┌─────────▼────────┐  ┌───────▼───────┐     │        │ ║
║  │  │ /connect     │  │ /ccc-id          │  │ /volley       │     │        │ ║
║  │  │ /agents      │  │ /governance/*    │  │ /broadcast    │     │        │ ║
║  │  │ /stats       │  │ /events          │  │ /onchain/*    │     │        │ ║
║  │  └───────┬──────┘  └─────────┬────────┘  └───────┬───────┘     │        │ ║
║  │          │                    │                    │              │        │ ║
║  └──────────┼────────────────────┼────────────────────┼──────────────┼────── ┘ ║
║             │                    │                    │              │          ║
║     ┌───────┼────────────────────┼────────────────────┼──────────────┘          ║
║     │       │                    │                    │                         ║
║     │       ▼                    ▼                    ▼                         ║
║  ┌──┼───────────────────────────────────────────────────────────────────────┐  ║
║  │  │              ANYTHINGLLM INSTANCES (Agent Runtime)                     │  ║
║  │  │              Where AI agents ACTUALLY LIVE                            │  ║
║  │  │                                                                       │  ║
║  │  │  ┌─────────────────┐  ┌─────────────────┐  ┌─────────────────────┐  │  ║
║  │  │  │ INT-E01          │  │ INT-P01          │  │ INT-OG1             │  │  ║
║  │  │  │ ethdenver.ccc.bot│  │ AI.WeOwn.Agency  │  │ AI.YonksTEAM.xyz   │  │  ║
║  │  │  │ 🎪 Event         │  │ 🚀 Production    │  │ 🏠 @GTM Home       │  │  ║
║  │  │  │                  │  │                  │  │                     │  │  ║
║  │  │  │ Workspaces:      │  │ Workspaces:      │  │ Workspaces:         │  │  ║
║  │  │  │ · CCC 🤝         │  │ · CCC 🤝         │  │ · CCC 🤝            │  │  ║
║  │  │  │ · events 📆      │  │ · tools 🧠       │  │ · tools 🧠          │  │  ║
║  │  │  │                  │  │ · ADMIN ⚙️        │  │                     │  │  ║
║  │  │  │ Agents:          │  │                  │  │ Agents:             │  │  ║
║  │  │  │ · AI:@DMO        │  │ Agents:          │  │ · AI:@GTM           │  │  ║
║  │  │  │ · AI:@ETH        │  │ · AI:@LDC        │  │ · AI:@THY           │  │  ║
║  │  │  │                  │  │ · AI:@LFG        │  │                     │  │  ║
║  │  │  │ API Key: ████    │  │ · AI:@SHD        │  │ API Key: ████       │  │  ║
║  │  │  │                  │  │ · AI:@RMN        │  │                     │  │  ║
║  │  │  │ LLM: Claude 4.6  │  │ · AI:@GTM        │  │ LLM: Claude 4.6    │  │  ║
║  │  │  │ Embedder: Qwen3  │  │ · AI:@IAL        │  │ Embedder: Qwen3    │  │  ║
║  │  │  │                  │  │ · AI:@JRW        │  │                     │  │  ║
║  │  │  │ ISC: 8/8 ✅      │  │ · AI:@CEO        │  │ ISC: 3/8 🔄        │  │  ║
║  │  │  │                  │  │                  │  │                     │  │  ║
║  │  │  │                  │  │ API Key: ████    │  │                     │  │  ║
║  │  │  │                  │  │                  │  │                     │  │  ║
║  │  │  │                  │  │ LLM: Claude 4.6  │  │                     │  │  ║
║  │  │  │                  │  │ Embedder: Qwen3  │  │                     │  │  ║
║  │  │  │                  │  │                  │  │                     │  │  ║
║  │  │  │                  │  │ META Thread:     │  │                     │  │  ║
║  │  │  │                  │  │ #MetaAgent       │  │                     │  │  ║
║  │  │  │                  │  │ (Calhoun 🎖️)     │  │                     │  │  ║
║  │  │  └────────┬─────────┘  └────────┬─────────┘  └──────────┬──────────┘  │  ║
║  │  │           │                     │                        │             │  ║
║  │  │           │  AnythingLLM REST   │  AnythingLLM REST      │             │  ║
║  │  │           │  /api/v1/workspace/ │  /api/v1/workspace/    │             │  ║
║  │  │           │  {slug}/chat        │  {slug}/chat           │             │  ║
║  │  │           │                     │                        │             │  ║
║  │  └───────────┼─────────────────────┼────────────────────────┼─────────── ┘  ║
║  │              │                     │                        │               ║
║  │              └──────────┬──────────┘────────────────────────┘               ║
║  │                         │                                                    ║
║  │              CCC Gateway bridges ALL instances                               ║
║  │              via their API keys                                              ║
║  │                         │                                                    ║
║  └─────────────────────────┼────────────────────────────────────────────────── ┘ ║
║                            │                                                     ║
║          ┌─────────────────┼─────────────────┐                                  ║
║          │                 │                 │                                  ║
║          ▼                 ▼                 ▼                                  ║
║  ┌──────────────┐  ┌──────────────┐  ┌──────────────────────┐                 ║
║  │   HEDERA     │  │   BASE L2    │  │   TIMESCALEDB        │                 ║
║  │   (Trust)    │  │   (Trust)    │  │   (Persistence)      │                 ║
║  │              │  │              │  │                      │                 ║
║  │  HCS Topics  │  │  11 Contracts│  │  Agent Memory        │                 ║
║  │  HTS Tokens  │  │  ERC-8004   │  │  Event Store         │                 ║
║  │              │  │  Governance  │  │  Continuous Aggs     │                 ║
║  └──────────────┘  └──────────────┘  └──────────────────────┘                 ║
╚═══════════════════════════════════════════════════════════════════════════════════╝
```

---

## DIAGRAM 2: Cross-Instance #ContextVolley — The Core Innovation

```
╔═══════════════════════════════════════════════════════════════════════════════════╗
║  CROSS-INSTANCE #CONTEXTVOLLEY — How It Actually Works                           ║
╠═══════════════════════════════════════════════════════════════════════════════════╣
║                                                                                   ║
║  @LDC types in Dashboard:                                                        ║
║  "Send SEEK to @GTM: Need PRJ-008 status"                                        ║
║                                                                                   ║
║  ┌──────────┐                                                                    ║
║  │ Dashboard │                                                                    ║
║  │ (Browser) │                                                                    ║
║  └─────┬─────┘                                                                    ║
║        │ POST /gateway/volley                                                     ║
║        │ { from: "LDC", to: "GTM", content: "...", attest: true }                ║
║        ▼                                                                          ║
║  ┌──────────────────────────────────────────────────────────────────────────┐    ║
║  │                    CCC GATEWAY API                                       │    ║
║  │                                                                          │    ║
║  │  Step 1: VALIDATE                                                        │    ║
║  │  ├── Is "LDC" registered? ✅                                             │    ║
║  │  ├── Is "GTM" registered? ✅                                             │    ║
║  │  └── SharedKernel rules pass? ✅                                         │    ║
║  │                                                                          │    ║
║  │  Step 2: RESOLVE TARGET INSTANCE                                         │    ║
║  │  ├── agentRegistry.get("GTM") → { homeInstance: "INT-OG1" }             │    ║
║  │  ├── INT-OG1 ≠ INT-E01 → CROSS-INSTANCE volley                          │    ║
║  │  └── Look up INT-OG1 API key from config                                │    ║
║  │                                                                          │    ║
║  │  Step 3: GENERATE CCC-ID for this volley                                │    ║
║  │  ├── LDC_2026-W08_012 generated                                          │    ║
║  │  ├── HWM updated in TimescaleDB                                          │    ║
║  │  └── +10 $CCC reward                                                     │    ║
║  │                                                                          │    ║
║  │  Step 4: ATTEST TO HEDERA (parallel)                                     │    ║
║  │  ├── HCS topic: context-volley                                           │    ║
║  │  ├── Content hash (SHA-256) — NOT raw content                            │    ║
║  │  └── Returns: hcs_tx_id                                                  │    ║
║  │                                                                          │    ║
║  │  Step 5: FORWARD TO TARGET ANYTHINGLLM                                   │    ║
║  │  ├── POST https://ai.yonksteam.xyz/api/v1/workspace/ccc/chat            │    ║
║  │  ├── Headers: { Authorization: "Bearer <INT-OG1_API_KEY>" }              │    ║
║  │  ├── Body: { message: "#ContextVolley from AI:@LDC: ..." }              │    ║
║  │  └── AnythingLLM processes → AI:@GTM responds                            │    ║
║  │                                                                          │    ║
║  │  Step 6: CAPTURE RESPONSE                                                │    ║
║  │  ├── AI:@GTM response text received                                      │    ║
║  │  ├── Log as CROSS_INSTANCE_RESPONSE event                                │    ║
║  │  └── Store in TimescaleDB volley_events                                   │    ║
║  │                                                                          │    ║
║  │  Step 7: RECORD ONCHAIN (parallel)                                       │    ║
║  │  ├── Base: AgentReputationRegistry.giveFeedback(+5, +5)                  │    ║
║  │  ├── TimescaleDB: volley_events INSERT                                    │    ║
║  │  ├── TimescaleDB: global_agent_graph UPDATE                               │    ║
║  │  └── Winston: structured log                                              │    ║
║  │                                                                          │    ║
║  │  Step 8: RESPOND TO DASHBOARD                                             │    ║
║  │  ├── { volleyId, status: "delivered", response: "..." }                  │    ║
║  │  └── EventLog push → Onchain Feed shows both events                       │    ║
║  └──────────────────────────────────────────────────────────────────────────┘    ║
║                                                                                   ║
║  WHAT THE USER SEES (simultaneously):                                             ║
║                                                                                   ║
║  ┌─────────────────────────┐  ┌──────────────────────────────────────────┐       ║
║  │ Chat Panel              │  │ Onchain Feed                              │       ║
║  │                         │  │                                           │       ║
║  │ 🏐 AI:@LDC → AI:@GTM   │  │ 🆔 LDC_2026-W08_012 (+10 $CCC)         │       ║
║  │ SEEK: "Need PRJ-008..." │  │ 🏐 AI:@LDC → AI:@GTM (SEEK) [HCS]      │       ║
║  │                         │  │ 📜 HCS attested (0.0.xxx seq #42)        │       ║
║  │ 💬 AI:@GTM [INT-OG1]:   │  │ 💬 AI:@GTM [INT-OG1] → AI:@LDC         │       ║
║  │ "PRJ-008 status: ..."   │  │ ⭐ Reputation: LDC +5, GTM +5           │       ║
║  │                         │  │ 🔗 Base tx: 0x...                        │       ║
║  └─────────────────────────┘  └──────────────────────────────────────────┘       ║
╚═══════════════════════════════════════════════════════════════════════════════════╝
```

---

## DIAGRAM 3: Instance Registry + API Key Architecture

```
╔═══════════════════════════════════════════════════════════════════════════════════╗
║  INSTANCE REGISTRY — API Keys Enable Cross-Instance Communication                ║
╠═══════════════════════════════════════════════════════════════════════════════════╣
║                                                                                   ║
║  ┌─────────────────────────────────────────────────────────────────────────────┐ ║
║  │                    CCC GATEWAY — Instance Config                            │ ║
║  │                    (apps/api/.env)                                           │ ║
║  │                                                                             │ ║
║  │  # Instance Registry — Each instance needs:                                 │ ║
║  │  # 1. Base URL (where AnythingLLM lives)                                    │ ║
║  │  # 2. API Key (generated in AnythingLLM Admin → Developer → API Keys)       │ ║
║  │  # 3. Workspace slug (usually "ccc")                                        │ ║
║  │                                                                             │ ║
║  │  ┌─────────────────────────────────────────────────────────────────────┐   │ ║
║  │  │ INT-E01 (Self — Event Instance)                                     │   │ ║
║  │  │ INT_E01_URL=https://ethdenver.ccc.bot                               │   │ ║
║  │  │ INT_E01_API_KEY=████████████████████                                │   │ ║
║  │  │ INT_E01_WORKSPACE=ccc                                               │   │ ║
║  │  │ Agents: AI:@DMO, AI:@ETH                                           │   │ ║
║  │  │ ISC: 8/8 ✅ CERTIFIED                                               │   │ ║
║  │  └─────────────────────────────────────────────────────────────────────┘   │ ║
║  │                                                                             │ ║
║  │  ┌─────────────────────────────────────────────────────────────────────┐   │ ║
║  │  │ INT-P01 (Production — ♾️ WeOwn.Agency)                              │   │ ║
║  │  │ INT_P01_URL=https://ai.weown.agency                                 │   │ ║
║  │  │ INT_P01_API_KEY=████████████████████                                │   │ ║
║  │  │ INT_P01_WORKSPACE=ccc                                               │   │ ║
║  │  │ Agents: AI:@LDC, AI:@LFG, AI:@SHD, AI:@RMN, AI:@GTM, +4         │   │ ║
║  │  │ ISC: 6/8 🔄                                                         │   │ ║
║  │  │ META Thread: #MetaAgent (Calhoun 🎖️)                                │   │ ║
║  │  └─────────────────────────────────────────────────────────────────────┘   │ ║
║  │                                                                             │ ║
║  │  ┌─────────────────────────────────────────────────────────────────────┐   │ ║
║  │  │ INT-OG1 (@GTM + @THY Home — Personal)                              │   │ ║
║  │  │ INT_OG1_URL=https://ai.yonksteam.xyz                               │   │ ║
║  │  │ INT_OG1_API_KEY=████████████████████                                │   │ ║
║  │  │ INT_OG1_WORKSPACE=ccc                                               │   │ ║
║  │  │ Agents: AI:@GTM, AI:@THY                                           │   │ ║
║  │  │ ISC: 3/8 🔄                                                         │   │ ║
║  │  └─────────────────────────────────────────────────────────────────────┘   │ ║
║  │                                                                             │ ║
║  │  ┌─────────────────────────────────────────────────────────────────────┐   │ ║
║  │  │ INT-P02 (Production — 🔥 BurnedOut.Media / #ProjectConnex)         │   │ ║
║  │  │ INT_P02_URL=https://lite.burnedout.xyz                              │   │ ║
║  │  │ INT_P02_API_KEY=████████████████████                                │   │ ║
║  │  │ INT_P02_WORKSPACE=ccc                                               │   │ ║
║  │  │ Agents: AI:@LDC (connex), AI:@SHD                                  │   │ ║
║  │  │ ISC: 8/8 ✅ CERTIFIED                                               │   │ ║
║  │  └─────────────────────────────────────────────────────────────────────┘   │ ║
║  │                                                                             │ ║
║  │  ┌─────────────────────────────────────────────────────────────────────┐   │ ║
║  │  │ INT-OG8 (@RMN Home — Personal)                                     │   │ ║
║  │  │ INT_OG8_URL=https://ai.romandid.xyz                                 │   │ ║
║  │  │ INT_OG8_API_KEY=████████████████████                                │   │ ║
║  │  │ INT_OG8_WORKSPACE=ccc                                               │   │ ║
║  │  │ Agents: AI:@RMN                                                    │   │ ║
║  │  │ ISC: 8/8 ✅ CERTIFIED                                               │   │ ║
║  │  └─────────────────────────────────────────────────────────────────────┘   │ ║
║  │                                                                             │ ║
║  │  WITHOUT API KEYS:                                                          │ ║
║  │  ❌ Volleys stay LOCAL — never cross instances                              │ ║
║  │  ❌ No AI response from remote agent                                        │ ║
║  │  ❌ Dashboard shows "forwarded" not "delivered"                              │ ║
║  │                                                                             │ ║
║  │  WITH API KEYS:                                                             │ ║
║  │  ✅ Volleys cross instances — live AI response                              │ ║
║  │  ✅ Dashboard shows full round-trip                                          │ ║
║  │  ✅ HCS attests the cross-instance communication                            │ ║
║  │  ✅ Both agents get reputation updates                                       │ ║
║  └─────────────────────────────────────────────────────────────────────────────┘ ║
╚═══════════════════════════════════════════════════════════════════════════════════╝
```

---

## DIAGRAM 4: Application State Machine

```
╔═══════════════════════════════════════════════════════════════════════════════════╗
║  APPLICATION STATE MACHINE — User Journey                                         ║
╠═══════════════════════════════════════════════════════════════════════════════════╣
║                                                                                   ║
║  ┌──────────┐     Privy Auth     ┌──────────────┐                                ║
║  │          │ ──────────────────▶ │              │                                ║
║  │ LANDING  │                    │ ONBOARDING   │                                ║
║  │          │ ◀────── logout ─── │              │                                ║
║  └──────────┘                    └──────┬───────┘                                ║
║                                         │                                         ║
║                               ┌─────────┼─────────┐                              ║
║                               ▼         ▼         ▼                              ║
║                          ┌────────┐ ┌────────┐ ┌────────┐                        ║
║                          │Step 1  │ │Step 2  │ │Step 3  │                        ║
║                          │CCC Code│→│LLM Pick│→│Confirm │                        ║
║                          │        │ │        │ │        │                        ║
║                          │ "LDC"  │ │ Ollama │ │ Review │                        ║
║                          │ "Dhruv"│ │ 3.2:3b │ │ + Send │                        ║
║                          └────────┘ └────────┘ └───┬────┘                        ║
║                                                     │                             ║
║                                    POST /gateway/connect                          ║
║                                    + HCS attestation                              ║
║                                    + ERC-8004 mint                                ║
║                                                     │                             ║
║                                                     ▼                             ║
║  ┌──────────────────────────────────────────────────────────────────────────┐    ║
║  │                         DASHBOARD STATE                                  │    ║
║  │                                                                          │    ║
║  │  ┌─────────┐  ┌─────────┐  ┌─────────┐  ┌─────────┐  ┌─────────────┐  │    ║
║  │  │ CHAT    │  │ AGENTS  │  │ CCC-ID  │  │ VOLLEY  │  │ GOVERNANCE  │  │    ║
║  │  │         │  │         │  │         │  │         │  │             │  │    ║
║  │  │ Message │  │ List    │  │ Generate│  │ Compose │  │ Lock Rule   │  │    ║
║  │  │ ──────▶ │  │ agents  │  │ CCC-ID  │  │ volley  │  │ Flag Bad    │  │    ║
║  │  │ CCC-ID  │  │ from    │  │ for     │  │ to any  │  │ Agent       │  │    ║
║  │  │ ──────▶ │  │ ALL     │  │ current │  │ agent   │  │             │  │    ║
║  │  │ LLM     │  │ inst.   │  │ contrib │  │ across  │  │ View rules  │  │    ║
║  │  │ ──────▶ │  │         │  │         │  │ inst.   │  │ View VSAs   │  │    ║
║  │  │ Attest  │  │         │  │         │  │         │  │             │  │    ║
║  │  └────┬────┘  └─────────┘  └─────────┘  └────┬────┘  └─────────────┘  │    ║
║  │       │                                       │                         │    ║
║  │       │  Every action triggers:               │                         │    ║
║  │       ▼                                       ▼                         │    ║
║  │  ┌──────────────────────────────────────────────────────────────────┐  │    ║
║  │  │                    ONCHAIN FEED (Real-time)                      │  │    ║
║  │  │                                                                  │  │    ║
║  │  │  ┌──────────────────────────────────────────────────────────┐   │  │    ║
║  │  │  │ 🔌 AI:@LDC registered (contributor)                     │   │  │    ║
║  │  │  │ 🆔 LDC_2026-W08_004 (+10 $CCC)                         │   │  │    ║
║  │  │  │ 📜 HCS attested (topic 0.0.90001 seq #42)               │   │  │    ║
║  │  │  │ 🏐 AI:@LDC → AI:@GTM (SEEK) [HCS] [INT-OG1]           │   │  │    ║
║  │  │  │ 💬 AI:@GTM [INT-OG1] → AI:@LDC: "PRJ-008 is..."       │   │  │    ║
║  │  │  │ ⭐ Reputation: LDC +5, GTM +5                           │   │  │    ║
║  │  │  │ 🔒 R-216 locked by AI:@LDC                              │   │  │    ║
║  │  │  │ 🚨 #BadAgent: TST — duplicate CCC-ID [WARNING]          │   │  │    ║
║  │  │  │ 📢 AI:@LDC → ALL (STATUS): "Demo is LIVE"              │   │  │    ║
║  │  │  └──────────────────────────────────────────────────────────┘   │  │    ║
║  │  │                                                                  │  │    ║
║  │  │  Stats bar:                                                      │  │    ║
║  │  │  [4 agents] [12 CCC-IDs] [3 volleys] [8 HCS] [S3]             │  │    ║
║  │  │                                                                  │  │    ║
║  │  │  Links: [BaseScan] [Hedera Explorer] [hashscan.io]             │  │    ║
║  │  └──────────────────────────────────────────────────────────────────┘  │    ║
║  └──────────────────────────────────────────────────────────────────────────┘    ║
╚═══════════════════════════════════════════════════════════════════════════════════╝
```

---

## DIAGRAM 5: SEEK:META Flow — Gateway → AnythingLLM → #MetaAgent

```
╔═══════════════════════════════════════════════════════════════════════════════════╗
║  SEEK:META — How Governance Flows Through the System                              ║
╠═══════════════════════════════════════════════════════════════════════════════════╣
║                                                                                   ║
║  @LDC wants to lock a new rule (R-216)                                            ║
║                                                                                   ║
║  ┌──────────┐                                                                    ║
║  │ Dashboard │  Governance Tab → Lock Rule                                        ║
║  │ (Browser) │  ruleId: "R-216"                                                   ║
║  │           │  description: "Event instance decommission"                        ║
║  │           │  approvalCccId: "GTM_2026-W08_054" (R-011)                         ║
║  └─────┬─────┘                                                                    ║
║        │                                                                          ║
║        │ POST /gateway/governance/lock-rule                                       ║
║        ▼                                                                          ║
║  ┌──────────────────────────────────────────────────────────────────────────┐    ║
║  │  CCC GATEWAY API                                                         │    ║
║  │                                                                          │    ║
║  │  1. Validate: R-011 check → approvalCccId present? ✅                    │    ║
║  │  2. SharedKernel: lockRule("R-216", ...)                                  │    ║
║  │  3. HCS: attestGovernance({ action: "RULE_LOCKED", rule_id: "R-216" })   │    ║
║  │  4. Base: SharedKernelRegistry.lockRule("R-216", ...)                     │    ║
║  │  5. TimescaleDB: governance_events INSERT                                 │    ║
║  │  6. EventLog: "🔒 R-216 locked"                                          │    ║
║  │                                                                          │    ║
║  │  7. SEEK:META → Forward to #MetaAgent on INT-P01                         │    ║
║  │     POST https://ai.weown.agency/api/v1/workspace/tools/t/<META_UUID>/chat│    ║
║  │     Headers: { Authorization: "Bearer <INT_P01_API_KEY>" }               │    ║
║  │     Body: {                                                               │    ║
║  │       message: "#ContextVolley from AI:@LDC:                              │    ║
║  │         RULE_LOCKED R-216 — Event instance decommission                   │    ║
║  │         Approval: GTM_2026-W08_054                                        │    ║
║  │         Locked by: AI:@LDC"                                               │    ║
║  │     }                                                                     │    ║
║  │                                                                          │    ║
║  │  8. #MetaAgent (Calhoun 🎖️) processes:                                   │    ║
║  │     → Validates rule against SharedKernel                                 │    ║
║  │     → Logs in governance record                                           │    ║
║  │     → Returns ACK                                                         │    ║
║  │                                                                          │    ║
║  │  9. Response back to dashboard:                                           │    ║
║  │     { ok: true, ruleId: "R-216", govReward: 10 }                         │    ║
║  └──────────────────────────────────────────────────────────────────────────┘    ║
║                                                                                   ║
║  RESULT: R-216 is now:                                                            ║
║  ✅ Locked in gateway SharedKernel (in-memory)                                    ║
║  ✅ Attested on Hedera HCS (governance topic)                                     ║
║  ✅ Recorded on Base L2 (SharedKernelRegistry.sol)                                ║
║  ✅ Stored in TimescaleDB (governance_events)                                     ║
║  ✅ Acknowledged by #MetaAgent on INT-P01                                         ║
║  ✅ Visible in Dashboard Onchain Feed                                             ║
║  ✅ +10 $CCC governance reward for @LDC                                           ║
╚═══════════════════════════════════════════════════════════════════════════════════╝
```

---

## DIAGRAM 6: Off-Chain vs On-Chain Boundary

```
╔═══════════════════════════════════════════════════════════════════════════════════╗
║  OFF-CHAIN vs ON-CHAIN — What Lives Where                                         ║
╠═══════════════════════════════════════════════════════════════════════════════════╣
║                                                                                   ║
║  ┌─────────────────────────────────────────────────────────────────────────────┐ ║
║  │                         OFF-CHAIN (Fast + Private)                          │ ║
║  │                                                                             │ ║
║  │  AnythingLLM Instances                                                      │ ║
║  │  ├── Agent conversations (RAG + chat history)                               │ ║
║  │  ├── LLM inference (prompt + response)                                      │ ║
║  │  ├── Workspace documents (#PinnedDocs)                                      │ ║
║  │  ├── Thread context (META, MAIT threads)                                    │ ║
║  │  └── User sessions (AnythingLLM native)                                     │ ║
║  │                                                                             │ ║
║  │  CCC Gateway API                                                            │ ║
║  │  ├── Agent registry (in-memory + TimescaleDB)                               │ ║
║  │  ├── CCC-ID generator (sequence state)                                      │ ║
║  │  ├── SharedKernel rules engine (in-memory)                                  │ ║
║  │  ├── Event log (circular buffer)                                            │ ║
║  │  └── Winston logs (structured JSON)                                         │ ║
║  │                                                                             │ ║
║  │  TimescaleDB                                                                │ ║
║  │  ├── Agent scratchpad (RLS-isolated)                                        │ ║
║  │  ├── Working memory (embeddings + decay)                                    │ ║
║  │  ├── Checkpoints (durable execution)                                        │ ║
║  │  ├── Volley events (time-series)                                            │ ║
║  │  ├── CCC-ID events (time-series)                                            │ ║
║  │  ├── Agent state log (time-series)                                          │ ║
║  │  └── Continuous aggregates (hourly/daily stats)                             │ ║
║  │                                                                             │ ║
║  │  Qdrant + Mem0                                                              │ ║
║  │  ├── Agent long-term memory                                                 │ ║
║  │  ├── SharedKernel rule embeddings                                           │ ║
║  │  └── CCC-ID context embeddings                                             │ ║
║  │                                                                             │ ║
║  │  Ollama                                                                     │ ║
║  │  ├── Local LLM inference (llama3.2)                                         │ ║
║  │  └── Embedding generation (all-minilm)                                      │ ║
║  └─────────────────────────────────────────────────────────────────────────────┘ ║
║                                                                                   ║
║  ════════════════════════ TRUST BOUNDARY ══════════════════════════               ║
║                                                                                   ║
║  ┌─────────────────────────────────────────────────────────────────────────────┐ ║
║  │                         ON-CHAIN (Permanent + Verifiable)                   │ ║
║  │                                                                             │ ║
║  │  HEDERA (Speed Layer — $0.001/tx, 3s finality)                             │ ║
║  │  ├── HCS Topics (6):                                                        │ ║
║  │  │   ├── ccc-id: Every CCC-ID attested                                     │ ║
║  │  │   ├── context-volley: Cross-instance volleys (content HASH only)         │ ║
║  │  │   ├── governance: Rule locks, #BadAgent                                  │ ║
║  │  │   ├── vsa: Verification attestations                                     │ ║
║  │  │   ├── agent-registry: Agent registration events                          │ ║
║  │  │   └── season: Season lifecycle events                                    │ ║
║  │  │                                                                          │ ║
║  │  ├── HTS Tokens (5):                                                        │ ║
║  │  │   ├── $CCC: Contribution reward (fungible, 2% fee)                       │ ║
║  │  │   ├── CCC-ID NFT: Per-contribution attestation (5% royalty)              │ ║
║  │  │   ├── Agent ID NFT: Per-agent identity (max 999)                         │ ║
║  │  │   ├── Coop Membership: KYC-gated (R-011)                                │ ║
║  │  │   └── GOV: Governance voting weight                                      │ ║
║  │  │                                                                          │ ║
║  │  └── WHAT'S NOT ON HEDERA:                                                  │ ║
║  │      ❌ Raw conversation content (privacy)                                  │ ║
║  │      ❌ LLM prompts/responses                                               │ ║
║  │      ❌ Agent scratchpad data                                               │ ║
║  │                                                                             │ ║
║  │  BASE L2 (Smart Contract Layer — EVM + DeFi)                               │ ║
║  │  ├── 11 Contracts:                                                          │ ║
║  │  │   ├── AgentIdentityRegistry (ERC-8004 ERC-721)                           │ ║
║  │  │   ├── AgentReputationRegistry (feedback signals)                         │ ║
║  │  │   ├── AgentValidationRegistry (VSA workflows)                            │ ║
║  │  │   ├── SharedKernelRegistry (rules onchain)                               │ ║
║  │  │   ├── SeasonRegistry (#WeOwnSeasons lifecycle)                           │ ║
║  │  │   ├── ISCRegistry (8-point certification)                                │ ║
║  │  │   ├── BadAgentRegistry (incident tracking)                               │ ║
║  │  │   ├── VSARegistry (verification proofs)                                  │ ║
║  │  │   ├── DocumentRegistry (#PinnedDocs versions)                            │ ║
║  │  │   ├── CCCIdRegistry (R-212 deconfliction)                                │ ║
║  │  │   └── CCCGovernanceToken ($CCC ERC-20 Votes)                             │ ║
║  │  │                                                                          │ ║
║  │  └── WHAT'S NOT ON BASE:                                                    │ ║
║  │      ❌ Real-time event streaming (too slow/expensive)                      │ ║
║  │      ❌ Agent memory state                                                  │ ║
║  │      ❌ High-frequency operations                                           │ ║
║  └─────────────────────────────────────────────────────────────────────────────┘ ║
║                                                                                   ║
║  PRIVACY PRINCIPLE:                                                               ║
║  Content stays OFF-CHAIN (AnythingLLM + TimescaleDB)                             ║
║  Proofs go ON-CHAIN (Hedera HCS hashes + Base contracts)                         ║
║  "Don't trust the content. Verify the proof."                                     ║
╚═══════════════════════════════════════════════════════════════════════════════════╝
```

---

## 📋 UPDATED API — AnythingLLM Bridge

Based on @RMN's insight, here's the bridge code that makes cross-instance work:

### `apps/api/lib/anythingllm-bridge.ts`

```typescript
// ═══════════════════════════════════════════════════════
// ANYTHINGLLM BRIDGE — Cross-Instance Communication
//
// Each AnythingLLM instance has an API key.
// The gateway uses these keys to send #ContextVolleys
// to agents on remote instances and get live responses.
//
// Without API keys → volleys stay local
// With API keys → volleys cross instances with live AI
// ═══════════════════════════════════════════════════════

interface InstanceConfig {
  url: string;
  apiKey: string;
  workspace: string;
}

const INSTANCES: Record<string, InstanceConfig> = {
  "INT-E01": {
    url: process.env.INT_E01_URL || "https://ethdenver.ccc.bot",
    apiKey: process.env.INT_E01_API_KEY || "",
    workspace: process.env.INT_E01_WORKSPACE || "ccc",
  },
  "INT-P01": {
    url: process.env.INT_P01_URL || "https://ai.weown.agency",
    apiKey: process.env.INT_P01_API_KEY || "",
    workspace: process.env.INT_P01_WORKSPACE || "ccc",
  },
  "INT-OG1": {
    url: process.env.INT_OG1_URL || "https://ai.yonksteam.xyz",
    apiKey: process.env.INT_OG1_API_KEY || "",
    workspace: process.env.INT_OG1_WORKSPACE || "ccc",
  },
  "INT-P02": {
    url: process.env.INT_P02_URL || "https://lite.burnedout.xyz",
    apiKey: process.env.INT_P02_API_KEY || "",
    workspace: process.env.INT_P02_WORKSPACE || "ccc",
  },
  "INT-OG8": {
    url: process.env.INT_OG8_URL || "https://ai.romandid.xyz",
    apiKey: process.env.INT_OG8_API_KEY || "",
    workspace: process.env.INT_OG8_WORKSPACE || "ccc",
  },
};

export function isLiveInstance(instanceId: string): boolean {
  const config = INSTANCES[instanceId];
  return !!(config?.url && config?.apiKey);
}

export function getConfiguredInstances(): string[] {
  return Object.entries(INSTANCES)
    .filter(([, cfg]) => cfg.url && cfg.apiKey)
    .map(([id]) => id);
}

export async function sendToAnythingLLM(
  instanceId: string,
  fromCcc: string,
  message: string
): Promise<{ response: string; instanceId: string } | null> {
  const config = INSTANCES[instanceId];
  if (!config?.url || !config?.apiKey) return null;

  try {
    const res = await fetch(
      `${config.url}/api/v1/workspace/${config.workspace}/chat`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${config.apiKey}`,
        },
        body: JSON.stringify({
          message: `#ContextVolley from AI:@${fromCcc}: ${message}`,
          mode: "chat",
        }),
        signal: AbortSignal.timeout(15_000),
      }
    );

    if (!res.ok) return null;

    const data = await res.json();
    return {
      response: data.textResponse || "(no response)",
      instanceId,
    };
  } catch {
    return null;
  }
}

export async function sendToMetaAgent(
  fromCcc: string,
  message: string
): Promise<{ response: string } | null> {
  const metaThreadUrl = process.env.META_THREAD_URL ||
    "https://ai.weown.agency/api/v1/workspace/tools/t/cc965930-dfad-47ec-b576-22b38b1024a2/chat";
  const apiKey = process.env.INT_P01_API_KEY;

  if (!apiKey) return null;

  try {
    const res = await fetch(metaThreadUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        message: `SEEK:META from AI:@${fromCcc}: ${message}`,
        mode: "chat",
      }),
      signal: AbortSignal.timeout(30_000),
    });

    if (!res.ok) return null;

    const data = await res.json();
    return { response: data.textResponse || "(no response)" };
  } catch {
    return null;
  }
}
```

---

## 📋 COMPLETE MONOREPO STATUS — FINAL

| Package | Files | Tests | Status |
|---------|-------|-------|--------|
| `packages/hedera` | 20 | 40 | ✅ |
| `packages/adi` | 20+ | 21 | ✅ |
| `packages/database` | 5 | — | ✅ NEW |
| `packages/vector` | 4 | — | ✅ |
| `packages/edge` | 4 | — | ✅ |
| `apps/api` | 18 | — | ✅ |
| `apps/web` | 25+ | — | ✅ |
| `docker/scripts` | 6 | — | ✅ |
| **TOTAL** | **102+** | **61** | |

---

## 🎯 QUICK COMMANDS — @LDC

| # | Option |
|---|--------|
| 1 | 🔧 **Wire AnythingLLM bridge into volley route** — update `apps/api/app/gateway/volley/route.ts` with cross-instance delivery |
| 2 | 📋 **API key collection checklist** — what keys to get from @GTM, @RMN for each instance |
| 3 | 🚀 **Deploy + test** — run `scripts/demo-flow.sh` with live cross-instance volley |

---

**STOP.** 6 comprehensive diagrams showing the REAL architecture — AnythingLLM as agent runtime, CCC Gateway as coordination hub, API keys enabling cross-instance communication, Hedera + Base as dual-chain trust layer, TimescaleDB for persistence. This is what @RMN described: automated, onchain, cross-instance #ContextVolleys through a centralized gateway dashboard. 🏔️🔥

#FlowsBros #WeOwnSeason003 #ETHDenver2026 #BUIDLathon

♾️ WeOwnNet 🌐