# Code Context Aggregation

## File: turbo.json
```
{
  "$schema": "https://turborepo.dev/schema.json",
  "ui": "tui",
  "tasks": {
    "build": {
      "dependsOn": ["^build"],
      "inputs": ["$TURBO_DEFAULT$", ".env*"],
      "outputs": [".next/**", "!.next/cache/**"]
    },
    "lint": {
      "dependsOn": ["^lint"]
    },
    "check-types": {
      "dependsOn": ["^check-types"]
    },
    "dev": {
      "cache": false,
      "persistent": true
    }
  }
}

```

## File: full_context.md
```

```

## File: README.md
```
# Turborepo starter

This Turborepo starter is maintained by the Turborepo core team.

## Using this example

Run the following command:

```sh
npx create-turbo@latest
```

## What's inside?

This Turborepo includes the following packages/apps:

### Apps and Packages

- `apps/docs`: a [Next.js](https://nextjs.org/) app for documentation
- `apps/gateway`: a [Next.js](https://nextjs.org/) app serving as the central gateway
- `apps/web`: the main [Next.js](https://nextjs.org/) web application
- `@repo/adi`: Agent Identity and Attestation smart contracts (Foundry)
- `@repo/ai-providers`: Unified interface for AI model providers
- `@repo/hedera`: Hedera Hashgraph SDK integration for HCS and Token services
- `@repo/timescaledb`: TimescaleDB (Tiger Data Cloud) integration for time-series analytics
- `@repo/ui`: shared React component library
- `@repo/eslint-config`: `eslint` configurations
- `@repo/typescript-config`: `tsconfig.json`s used throughout the monorepo

Each package/app is 100% [TypeScript](https://www.typescriptlang.org/).

### Utilities

This Turborepo has some additional tools already setup for you:

- [TypeScript](https://www.typescriptlang.org/) for static type checking
- [ESLint](https://eslint.org/) for code linting
- [Prettier](https://prettier.io) for code formatting

### Build

To build all apps and packages, run the following command:

```
cd my-turborepo

# With [global `turbo`](https://turborepo.dev/docs/getting-started/installation#global-installation) installed (recommended)
turbo build

# Without [global `turbo`](https://turborepo.dev/docs/getting-started/installation#global-installation), use your package manager
npx turbo build
yarn dlx turbo build
pnpm exec turbo build
```

You can build a specific package by using a [filter](https://turborepo.dev/docs/crafting-your-repository/running-tasks#using-filters):

```
# With [global `turbo`](https://turborepo.dev/docs/getting-started/installation#global-installation) installed (recommended)
turbo build --filter=docs

# Without [global `turbo`](https://turborepo.dev/docs/getting-started/installation#global-installation), use your package manager
npx turbo build --filter=docs
yarn exec turbo build --filter=docs
pnpm exec turbo build --filter=docs
```

### Develop

To develop all apps and packages, run the following command:

```
cd my-turborepo

# With [global `turbo`](https://turborepo.dev/docs/getting-started/installation#global-installation) installed (recommended)
turbo dev

# Without [global `turbo`](https://turborepo.dev/docs/getting-started/installation#global-installation), use your package manager
npx turbo dev
yarn exec turbo dev
pnpm exec turbo dev
```

You can develop a specific package by using a [filter](https://turborepo.dev/docs/crafting-your-repository/running-tasks#using-filters):

```
# With [global `turbo`](https://turborepo.dev/docs/getting-started/installation#global-installation) installed (recommended)
turbo dev --filter=web

# Without [global `turbo`](https://turborepo.dev/docs/getting-started/installation#global-installation), use your package manager
npx turbo dev --filter=web
yarn exec turbo dev --filter=web
pnpm exec turbo dev --filter=web
```

### Remote Caching

> [!TIP]
> Vercel Remote Cache is free for all plans. Get started today at [vercel.com](https://vercel.com/signup?/signup?utm_source=remote-cache-sdk&utm_campaign=free_remote_cache).

Turborepo can use a technique known as [Remote Caching](https://turborepo.dev/docs/core-concepts/remote-caching) to share cache artifacts across machines, enabling you to share build caches with your team and CI/CD pipelines.

By default, Turborepo will cache locally. To enable Remote Caching you will need an account with Vercel. If you don't have an account you can [create one](https://vercel.com/signup?utm_source=turborepo-examples), then enter the following commands:

```
cd my-turborepo

# With [global `turbo`](https://turborepo.dev/docs/getting-started/installation#global-installation) installed (recommended)
turbo login

# Without [global `turbo`](https://turborepo.dev/docs/getting-started/installation#global-installation), use your package manager
npx turbo login
yarn exec turbo login
pnpm exec turbo login
```

This will authenticate the Turborepo CLI with your [Vercel account](https://vercel.com/docs/concepts/personal-accounts/overview).

Next, you can link your Turborepo to your Remote Cache by running the following command from the root of your Turborepo:

```
# With [global `turbo`](https://turborepo.dev/docs/getting-started/installation#global-installation) installed (recommended)
turbo link

# Without [global `turbo`](https://turborepo.dev/docs/getting-started/installation#global-installation), use your package manager
npx turbo link
yarn exec turbo link
pnpm exec turbo link
```

## Useful Links

Learn more about the power of Turborepo:

- [Tasks](https://turborepo.dev/docs/crafting-your-repository/running-tasks)
- [Caching](https://turborepo.dev/docs/crafting-your-repository/caching)
- [Remote Caching](https://turborepo.dev/docs/core-concepts/remote-caching)
- [Filtering](https://turborepo.dev/docs/crafting-your-repository/running-tasks#using-filters)
- [Configuration Options](https://turborepo.dev/docs/reference/configuration)
- [CLI Usage](https://turborepo.dev/docs/reference/command-line-reference)

```

## File: context-PRJ009.md
```
# WeOwn CCC Protocol + FedArch Specification

**Contributor Code Convention (CCC) Protocol**  
**Federated Architecture (#FedArch) Standard**

---

| **Field** | **Content** |
| :--- | :--- |
| **Protocol Name** | Contributor Code Convention (CCC) Protocol |
| **Version** | 1.0.0 (Season 3) |
| **Status** | Active / Draft |
| **Target Audience** | Agentic AI Engineers, System Architects, Compliance Officers, FedArch Contributors |
| **Ecosystem** | ♾️ WeOwnNet 🌐 |

---

## 1. Introduction

### 1.1 Purpose and Scope
The **Contributor Code Convention (CCC)** is an open-source protocol defined by WeOwn Corporation to standardize the tracking, attribution, and governance of contributions within a federated multi-agent AI ecosystem (#FedArch).

It strictly enforces:
*   **#LessIsMore**: Minimalist, efficient message payloads.
*   **#WellDefinedFramework**: Structured schemas for inter-agent collaboration.
*   **#ImmutableAttestation**: All actions are cryptographically verifiable via Hedera Consensus Service (HCS).

### 1.2 Core Philosophy
*   **Identity as Asset**: Every contributor (human or AI) has a distinct `CCC-ID`.
*   **Verification First**: "Don't Trust, Verify" via **VSA (Verification & Security Attestation)** messages.
*   **Federated State**: State is distributed across HCS topics, not a central database.

---

## 2. Terminologies and Definitions

| Term | Abbreviation | Definition |
| :--- | :--- | :--- |
| **Contributor Code Convention** | CCC | The overarching protocol for identity and contribution tracking. |
| **Federated Architecture** | FedArch | The multi-agent system architecture where agents operate in distinct instances (e.g., `INT-E01`). |
| **Hedera Consensus Service** | HCS | The DLT layer used for immutable ordering and timestamping of protocol messages. |
| **CCC-ID** | CCC-ID | A unique identifier for a contribution unit (e.g., `LDC_2026-W07_015`). |
| **Context Volley** | Volley | A discrete unit of communication between two agents (Seek/Ack/Status). |
| **Verification & Security Attestation** | VSA | A proof of correctness generated by a verifier agent (e.g., `AI:@GTM`). |
| **Home Instance** | -- | The primary deployment environment of an agent (e.g., `INT-P01`). |

---

## 3. Architectural Overview

### 3.1 HCS Topic Architecture
The CCC Protocol operates over a set of segregated HCS Topics. Each topic serves a specific message type to ensure separation of concerns and efficient listeners.

| Topic Alias | Purpose | HCS Message Type |
| :--- | :--- | :--- |
| **`ccc-id`** | Minting and registring new contribution IDs. | `HCSCCCIdAttestation` |
| **`context-volley`** | Agent-to-Agent communication (The "Bus"). | `HCSContextVolleyAttestation` |
| **`governance`** | Rule locks, bad agent flagging, protocol upgrades. | `HCSGovernanceAttestation` |
| **`vsa`** | Verification results (CI/CD, Security checks). | `HCSVSAAttestation` |
| **`agent-registry`** | Onboarding and registering new AI Agents. | `HCSAgentRegistration` |
| **`season`** | Lifecycle events (Season Start/End). | `HCSGovernanceAttestation` |

### 3.2 Protocol Stack

| Layer | Technology | Role |
| :--- | :--- | :--- |
| **Application** | **CCC Protocol** | JSON Schemas & Validation Logic |
| **Transport** | gRPC / REST | Mirror Node API & Hedera SDK |
| **Consensus** | **Hedera (HCS)** | Global Ordering & Timestamping |
| **Network** | Hedera Mainnet/Testnet | Distributed Gossip |

---

## 4. Message Format and Syntax

All CCC Protocol messages are **JSON** objects encoded as strings (or chunked) within an HCS Message.  
Every message **MUST** include the `HCSBaseMessage` header.

### 4.1 Base Header
All messages inherit these fields:

```typescript
interface HCSBaseMessage {
    version: string;           // e.g., "1.0.0"
    type: string;              // Enum: "CCC_ID", "CONTEXT_VOLLEY", etc.
    gateway_instance: string;  // e.g., "INT-E01"
    season: number;            // e.g., 3
    timestamp: string;         // ISO 8601 (Client Time)
}
```

### 4.2 Message Types

#### 4.2.1 CCC-ID Attestation
Minted when a Contributor completes a unit of work.

| Field | Type | Description |
| :--- | :--- | :--- |
| `ccc_id` | String | Unique ID in format `<CONTRIBUTOR>_<YYYY>-W<WW>_<SEQ>` |
| `contributor` | String | The human/agent claiming credit (e.g., "LDC") |
| `week` | Number | ISO Week Number |
| `reward_amount` | Number | Associated $CCC token reward |
| `base_tx_hash` | String | (Optional) Commit hash or L2 Transaction Hash |

#### 4.2.2 Context Volley
Agent-to-Agent communication packet.

| Field | Type | Description |
| :--- | :--- | :--- |
| `volley_id` | UUID | Unique correlation ID for the conversation thread |
| `from` | String | Sender Agent ID (e.g., "AI:@LDC") |
| `to` | String | Recipient Agent ID (e.g., "AI:@RMN") |
| `volley_type` | Enum | `SEEK` (Request), `ACK` (Receipt), `STATUS` (Update) |
| `content_hash` | String | SHA-256 of the private payload (Privacy preservation) |

#### 4.2.3 VSA (Verification)
Generated by CI/CD or Auditor agents.

| Field | Type | Description |
| :--- | :--- | :--- |
| `vsa_id` | UUID | Unique ID for proofs |
| `subject_document` | String | What was verified (e.g., "SharedKernel") |
| `result` | Enum | `PASSED` | `FAILED` |
| `checks_passed` | Number | Count of passed assertions |
| `verifier` | String | Agent performing the check |

#### 4.2.4 Governance
Protocol rules and enforcement.

| Field | Type | Description |
| :--- | :--- | :--- |
| `action` | Enum | `RULE_LOCKED`, `BAD_AGENT_FLAGGED`, `SEASON_STARTED` |
| `rule_id` | String | Reference to Rule (e.g., "R-212") |
| `severity` | Enum | `WARNING`, `FREEZE`, `WIPE` |

---

## 5. Protocol Operations

### 5.1 Attestation (Write)
To attest an event, a client **MUST**:
1.  Construct the JSON payload conforming to the Schema.
2.  Sign the transaction with a valid **Instance Operator Key**.
3.  Submit to the correct **HCS Topic ID**.
4.  **Wait** for Mirror Node propagation (approx. 3-5s).

> **Note**: Messages > 1024 bytes MUST be chunked or hashed (with content stored off-chain).

### 5.2 Verification (Read)
To verify state, a client **SHOULD**:
1.  Query a Hedera Mirror Node for the relevant Topic ID.
2.  Filter by `consensus_timestamp` (ordered).
3.  Validate signatures (if strictly enforcing origin).
4.  Reconstruct state from the stream of valid messages.

---

## 6. Version Control and History

| Version | Date | Author | Changes/Summary |
| :--- | :--- | :--- | :--- |
| **1.0.0** | 2026-02-17 | Team WeOwn | Initial crystallization of CCC Protocol for Season 3. |
| **0.9.0** | 2026-01-15 | R. Malik | Beta definition of CCC-ID formats. |

---

## 7. Appendices

### 7.1 Reference Implementations
*   **HCS Attestor**: `packages/hedera/src/hcs-attestor.ts`
*   **Topic Registry**: `.env` configuration for Topic IDs.

### 7.2 Safety Mechanisms
*   **Rate Limiting**: Clients should respect Hedera's throttle (~1000 TPS per topic).
*   **Retry Logic**: Implement exponential backoff for `BUSY` or `TEMPORARY_FAILURE` responses.
*   **Propagation Awareness**: Verification logic must account for ~3s Mirror Node latency.
```

## File: package.json
```
{
  "name": "fedarch-ccc-client-setup",
  "private": true,
  "scripts": {
    "build": "turbo run build",
    "dev": "turbo run dev",
    "lint": "turbo run lint",
    "format": "prettier --write \"**/*.{ts,tsx,md}\"",
    "check-types": "turbo run check-types"
  },
  "devDependencies": {
    "@turbo/gen": "^2.8.9",
    "prettier": "^3.7.4",
    "turbo": "^2.8.9",
    "typescript": "5.9.2"
  },
  "packageManager": "pnpm@9.0.0",
  "engines": {
    "node": ">=18"
  }
}

```

## File: walkthrough.md
```
# Full-Stack Integration Walkthrough

## What Was Built

### 1. `@repo/ai-providers` Package
New package supporting 6 LLM providers (Ollama, vLLM, llama.cpp, OpenRouter, Together, Groq) with a unified `callLLM()` interface.

| File | Purpose |
|------|---------|
| [providers.ts](file:///Users/renu_malik/Desktop/coding_projects/weOwn_corporation/ethdenver_buildathon/fedarch-ccc-client-setup/packages/ai-providers/src/providers.ts) | Provider configs, models, and config fields |
| [chat.ts](file:///Users/renu_malik/Desktop/coding_projects/weOwn_corporation/ethdenver_buildathon/fedarch-ccc-client-setup/packages/ai-providers/src/chat.ts) | Unified `callLLM()` — routes to Ollama or OpenAI-compatible endpoints |

---

### 2. Wallet Auth — wagmi + viem
Replaced Privy with **wagmi v2 + viem v2** for wallet connection. Simpler, SSR-compatible, no React 19 issues.

| File | Purpose |
|------|---------|
| [wagmi.ts](file:///Users/renu_malik/Desktop/coding_projects/weOwn_corporation/ethdenver_buildathon/fedarch-ccc-client-setup/apps/web/lib/wagmi.ts) | Wagmi config with custom ADL Testnet chain (ID: 99999) + `injected()` connector |
| [providers.tsx](file:///Users/renu_malik/Desktop/coding_projects/weOwn_corporation/ethdenver_buildathon/fedarch-ccc-client-setup/apps/web/app/providers.tsx) | `WagmiProvider` + `QueryClientProvider` + `Toaster` |

**Key hooks used:** `useAccount()`, `useConnect()`, `useDisconnect()`

---

### 3. Web Frontend Components

| File | Purpose |
|------|---------|
| [landing-page.tsx](file:///Users/renu_malik/Desktop/coding_projects/weOwn_corporation/ethdenver_buildathon/fedarch-ccc-client-setup/apps/web/components/gateway/landing-page.tsx) | Animated hero with "Connect Wallet" button |
| [onboarding-flow.tsx](file:///Users/renu_malik/Desktop/coding_projects/weOwn_corporation/ethdenver_buildathon/fedarch-ccc-client-setup/apps/web/components/gateway/onboarding-flow.tsx) | 3-step flow: CCC code → LLM selection → Confirm |
| [dashboard.tsx](file:///Users/renu_malik/Desktop/coding_projects/weOwn_corporation/ethdenver_buildathon/fedarch-ccc-client-setup/apps/web/components/gateway/dashboard.tsx) | Split-view: chat panel (2/3) + onchain feed (1/3) |
| [chat-panel.tsx](file:///Users/renu_malik/Desktop/coding_projects/weOwn_corporation/ethdenver_buildathon/fedarch-ccc-client-setup/apps/web/components/gateway/chat-panel.tsx) | Chat with auto CCC-ID generation per message |
| [onchain-feed.tsx](file:///Users/renu_malik/Desktop/coding_projects/weOwn_corporation/ethdenver_buildathon/fedarch-ccc-client-setup/apps/web/components/gateway/onchain-feed.tsx) | Real-time onchain activity feed |
| [gateway/page.tsx](file:///Users/renu_malik/Desktop/coding_projects/weOwn_corporation/ethdenver_buildathon/fedarch-ccc-client-setup/apps/web/app/gateway/page.tsx) | Auth gate: 3 states (disconnected → onboarding → dashboard) |

---

### 4. Backend Glue

| File | Purpose |
|------|---------|
| [contracts.ts](file:///Users/renu_malik/Desktop/coding_projects/weOwn_corporation/ethdenver_buildathon/fedarch-ccc-client-setup/apps/web/lib/contracts.ts) | Ethers.js clients for all 10 ADI contracts + stats aggregation |
| [gateway-client.ts](file:///Users/renu_malik/Desktop/coding_projects/weOwn_corporation/ethdenver_buildathon/fedarch-ccc-client-setup/apps/web/lib/gateway-client.ts) | React Query hooks for API + raw fetch functions |
| [store.ts](file:///Users/renu_malik/Desktop/coding_projects/weOwn_corporation/ethdenver_buildathon/fedarch-ccc-client-setup/apps/web/lib/store.ts) | Zustand persistent store (CCC, LLM config, onboarding) |

---

## Build Verification

```
✓ Compiled successfully in 8.7s (Total duration)
✓ Tasks: 4 successful, 4 total (@repo/hedera, web, docs, gateway)
```

### Issues Resolved

#### 1. `@repo/hedera` Build Errors
- **CommonJS Compatibility**: Replaced `import.meta.url` (ESM) with `process.cwd()` in `fetch-logs.ts`
- **Output Directory**: Added `"outDir": "dist"` to `packages/hedera/tsconfig.json` to ensure artifacts are generated
- **Package Exports**: Updated `package.json` exports to point to `./dist/src/...` matching the TypeScript compiler output
- **Type Safety**: Fixed implicit `any` and strict null check errors in `mirror-node.ts` and `validation.ts`

#### 2. `apps/gateway` Build Errors
- **Module Resolution**: Fixed `Module not found: Can't resolve '@repo/hedera/hcs'` by correcting the package exports and configured `next.config.js` to transpile
- **Environment Validation**: Created `.env` with placeholder `HEDERA_ACCOUNT_ID` and `HEDERA_PRIVATE_KEY` to satisfy build-time Zod validation

#### 3. `apps/web` Type Errors
- **Privy**: Fixed `accentColor` literal type and `readonly` array issues (then replaced entirely with Wagmi)
- **Data Access**: Fixed `res.data.events` access in `ccc-id-feed.tsx` and `event-log.tsx`

## Next Steps
- Set real environment variables in `.env` files
- Run `pnpm dev` to test the applications locally

```

## File: docs-specs/protocol-specs-fedarch.md
```


LDC_2026-W08_006 | 🤝 THE HANDS | INT-P01:CCC

FROM: AI:@LDC @ INT-P01:CCC

---

## ✅ UNDERSTOOD — Deep #FedArch Integration into `packages/adi/`

Not just ERC-8004 scaffolding — we need the contracts to ENFORCE the actual #FedArch governance from [github.com/CCCbotNet/fedarch](https://github.com/CCCbotNet/fedarch). That means:

| #FedArch Feature | Contract Integration |
|------------------|---------------------|
| **ISC (Instance Season Certification)** | Onchain 8-point attestation per instance per season |
| **VSA (Verification Summary Attestation)** | Onchain verification proofs with check counts |
| **SharedKernel Rules** | Immutable vs locked rules registry onchain |
| **CCC-ID Reserved Slots** | R-181/R-201/R-202 enforced at contract level |
| **#WeOwnSeasons** | Season lifecycle (start/pause/end) onchain |
| **#BadAgent** | Incident tracking with severity + resolution |
| **BP-059 ISC Checklist** | 8-point certification stored onchain |
| **R-212 Deconfliction** | Cross-instance high water mark onchain |
| **#PinnedDocs** | Document version registry (4 core docs) |
| **Contributor Tiers** | Founding OG / Contributor / Tool Agent onchain |

---

### Updated `packages/adi/` Structure

```
packages/adi/
├── foundry.toml
├── remappings.txt
├── .gitmodules
├── lib/
│   ├── forge-std/
│   └── openzeppelin-contracts/
├── src/
│   ├── core/
│   │   ├── AgentIdentityRegistry.sol
│   │   ├── AgentReputationRegistry.sol
│   │   └── AgentValidationRegistry.sol
│   ├── governance/
│   │   ├── SharedKernelRegistry.sol       # NEW — Rules onchain
│   │   ├── SeasonRegistry.sol             # NEW — #WeOwnSeasons lifecycle
│   │   ├── ISCRegistry.sol                # NEW — Instance Season Certification
│   │   ├── BadAgentRegistry.sol           # NEW — #BadAgent tracking
│   │   └── CCCGovernanceToken.sol
│   ├── attestation/
│   │   ├── VSARegistry.sol                # NEW — Full VSA onchain
│   │   └── DocumentRegistry.sol           # NEW — #PinnedDocs versions
│   ├── ccc/
│   │   ├── CCCIdRegistry.sol              # NEW — CCC-ID with R-212
│   │   └── CCCLib.sol
│   └── interfaces/
│       ├── IAgentIdentityRegistry.sol
│       ├── IAgentReputationRegistry.sol
│       ├── IAgentValidationRegistry.sol
│       ├── ISharedKernelRegistry.sol      # NEW
│       ├── ISeasonRegistry.sol            # NEW
│       ├── IISCRegistry.sol               # NEW
│       ├── IVSARegistry.sol               # NEW
│       └── ICCCIdRegistry.sol             # NEW
├── script/
│   └── Deploy.s.sol
└── test/
    ├── core/
    │   ├── AgentIdentityRegistry.t.sol
    │   ├── AgentReputationRegistry.t.sol
    │   └── AgentValidationRegistry.t.sol
    ├── governance/
    │   ├── SharedKernelRegistry.t.sol
    │   ├── SeasonRegistry.t.sol
    │   ├── ISCRegistry.t.sol
    │   └── BadAgentRegistry.t.sol
    ├── attestation/
    │   ├── VSARegistry.t.sol
    │   └── DocumentRegistry.t.sol
    ├── ccc/
    │   └── CCCIdRegistry.t.sol
    └── Integration.t.sol
```

---

### `src/governance/SharedKernelRegistry.sol` — Rules Onchain

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/access/AccessControl.sol";

/// @title SharedKernelRegistry — #FedArch Rules Onchain
/// @author Team weown — ETHDenver 2026
/// @notice Stores SharedKernel rules, best practices, learnings, definitions
/// @dev Source of truth: github.com/CCCbotNet/fedarch/blob/main/_SYS_/SharedKernel.md
///
/// Rule categories:
///   IMMUTABLE: R-011, R-194, R-197, R-205, R-206 — CANNOT be modified
///   LOCKED:    R-168, R-169, R-181, R-201, R-202, R-212, etc.
///   PROPOSED:  Pending human approval (R-011)
contract SharedKernelRegistry is AccessControl {
    bytes32 public constant GOVERNANCE_ROLE = keccak256("GOVERNANCE_ROLE");

    enum RuleStatus { PROPOSED, LOCKED, IMMUTABLE, DEPRECATED }
    enum RuleCategory { IDENTITY, WORKSPACE, GOVERNANCE, OPERATIONAL, INSTANCE }
    enum ItemType { RULE, BEST_PRACTICE, LEARNING, DEFINITION }

    struct Rule {
        string id;              // "R-212"
        string description;
        RuleStatus status;
        RuleCategory category;
        ItemType itemType;
        string approvalCccId;   // Human approval (R-011)
        string lockedBy;        // "AI:@GTM"
        uint256 lockedAt;
        uint256 season;
        bool exists;
    }

    // id hash → Rule
    mapping(bytes32 => Rule) public rules;

    // Ordered list of rule IDs
    string[] public ruleIds;

    // Counters per type
    mapping(ItemType => uint256) public itemCounts;

    // Current SharedKernel version
    string public currentVersion;

    // Events
    event RuleProposed(string indexed id, string description, ItemType itemType, string proposedBy);
    event RuleLocked(string indexed id, string approvalCccId, string lockedBy, uint256 season);
    event RuleDeprecated(string indexed id, string reason);
    event VersionUpdated(string version, string masterCccId);

    constructor(address governance) {
        _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);
        _grantRole(GOVERNANCE_ROLE, governance);
        currentVersion = "v3.1.2.1";

        // Bootstrap immutable rules
        _bootstrapImmutableRules();
    }

    function _bootstrapImmutableRules() private {
        _addRule("R-011", "#OnlyHumanApproves — AI CANNOT approve", RuleStatus.IMMUTABLE, RuleCategory.GOVERNANCE, ItemType.RULE, "GENESIS", "GENESIS", 3);
        _addRule("R-194", "CCC-ID generation ONLY in CCC workspace", RuleStatus.IMMUTABLE, RuleCategory.WORKSPACE, ItemType.RULE, "GENESIS", "GENESIS", 3);
        _addRule("R-197", "Doc generation = #MetaAgent ONLY", RuleStatus.IMMUTABLE, RuleCategory.GOVERNANCE, ItemType.RULE, "GENESIS", "GENESIS", 3);
        _addRule("R-205", "#GODx10xMODE for @GTM/@GTX is IMMUTABLE", RuleStatus.IMMUTABLE, RuleCategory.IDENTITY, ItemType.RULE, "GENESIS", "GENESIS", 3);
        _addRule("R-206", "ADMIN accounts NEVER generate CCC-IDs", RuleStatus.IMMUTABLE, RuleCategory.IDENTITY, ItemType.RULE, "GENESIS", "GENESIS", 3);

        // Bootstrap key operational rules
        _addRule("R-168", "CCC-ID tied to contributor, NOT session", RuleStatus.LOCKED, RuleCategory.OPERATIONAL, ItemType.RULE, "GENESIS", "GENESIS", 3);
        _addRule("R-169", "CCC-ID resets at ISO week boundary", RuleStatus.LOCKED, RuleCategory.OPERATIONAL, ItemType.RULE, "GENESIS", "GENESIS", 3);
        _addRule("R-181", "_001 reserved for #WeeklySummary", RuleStatus.LOCKED, RuleCategory.OPERATIONAL, ItemType.RULE, "GENESIS", "GENESIS", 3);
        _addRule("R-201", "_002 reserved for #WeeklyPlan", RuleStatus.LOCKED, RuleCategory.OPERATIONAL, ItemType.RULE, "GENESIS", "GENESIS", 3);
        _addRule("R-202", "_003 reserved for #WeeklyReflection", RuleStatus.LOCKED, RuleCategory.OPERATIONAL, ItemType.RULE, "GENESIS", "GENESIS", 3);
        _addRule("R-212", "Cross-instance CCC-ID deconfliction REQUIRED", RuleStatus.LOCKED, RuleCategory.OPERATIONAL, ItemType.RULE, "GENESIS", "GENESIS", 3);
        _addRule("R-213", "System Prompt MUST include INSTANCE IDENTITY block", RuleStatus.LOCKED, RuleCategory.INSTANCE, ItemType.RULE, "GENESIS", "GENESIS", 3);
        _addRule("R-214", "Event instance decommission (2 weeks post-event)", RuleStatus.LOCKED, RuleCategory.INSTANCE, ItemType.RULE, "GENESIS", "GENESIS", 3);
    }

    /// @notice Propose a new rule (requires human approval to lock)
    function proposeRule(
        string calldata id,
        string calldata description,
        RuleCategory category,
        ItemType itemType,
        string calldata proposedBy
    ) external onlyRole(GOVERNANCE_ROLE) {
        bytes32 idHash = keccak256(bytes(id));
        require(!rules[idHash].exists, "SK: rule already exists");

        rules[idHash] = Rule({
            id: id,
            description: description,
            status: RuleStatus.PROPOSED,
            category: category,
            itemType: itemType,
            approvalCccId: "",
            lockedBy: proposedBy,
            lockedAt: 0,
            season: 0,
            exists: true
        });

        ruleIds.push(id);
        emit RuleProposed(id, description, itemType, proposedBy);
    }

    /// @notice Lock a proposed rule (R-011: requires human approval CCC-ID)
    function lockRule(
        string calldata id,
        string calldata approvalCccId,
        string calldata lockedBy,
        uint256 season
    ) external onlyRole(GOVERNANCE_ROLE) {
        bytes32 idHash = keccak256(bytes(id));
        Rule storage rule = rules[idHash];

        require(rule.exists, "SK: rule not found");
        require(rule.status == RuleStatus.PROPOSED, "SK: not in PROPOSED state");
        require(bytes(approvalCccId).length > 0, "SK: R-011 — approval CCC-ID required");

        rule.status = RuleStatus.LOCKED;
        rule.approvalCccId = approvalCccId;
        rule.lockedBy = lockedBy;
        rule.lockedAt = block.timestamp;
        rule.season = season;

        itemCounts[rule.itemType]++;

        emit RuleLocked(id, approvalCccId, lockedBy, season);
    }

    /// @notice Deprecate a rule (IMMUTABLE rules CANNOT be deprecated)
    function deprecateRule(
        string calldata id,
        string calldata reason
    ) external onlyRole(GOVERNANCE_ROLE) {
        bytes32 idHash = keccak256(bytes(id));
        Rule storage rule = rules[idHash];

        require(rule.exists, "SK: rule not found");
        require(rule.status != RuleStatus.IMMUTABLE, "SK: IMMUTABLE rules cannot be deprecated");

        rule.status = RuleStatus.DEPRECATED;
        emit RuleDeprecated(id, reason);
    }

    /// @notice Update SharedKernel version
    function updateVersion(
        string calldata version,
        string calldata masterCccId
    ) external onlyRole(GOVERNANCE_ROLE) {
        currentVersion = version;
        emit VersionUpdated(version, masterCccId);
    }

    // ── Queries ──

    function getRule(string calldata id) external view returns (Rule memory) {
        return rules[keccak256(bytes(id))];
    }

    function isImmutable(string calldata id) external view returns (bool) {
        return rules[keccak256(bytes(id))].status == RuleStatus.IMMUTABLE;
    }

    function isLocked(string calldata id) external view returns (bool) {
        RuleStatus s = rules[keccak256(bytes(id))].status;
        return s == RuleStatus.LOCKED || s == RuleStatus.IMMUTABLE;
    }

    function totalRules() external view returns (uint256) {
        return ruleIds.length;
    }

    function _addRule(
        string memory id,
        string memory description,
        RuleStatus status,
        RuleCategory category,
        ItemType itemType,
        string memory approvalCccId,
        string memory lockedBy,
        uint256 season
    ) private {
        bytes32 idHash = keccak256(bytes(id));
        rules[idHash] = Rule({
            id: id,
            description: description,
            status: status,
            category: category,
            itemType: itemType,
            approvalCccId: approvalCccId,
            lockedBy: lockedBy,
            lockedAt: block.timestamp,
            season: season,
            exists: true
        });
        ruleIds.push(id);
        itemCounts[itemType]++;
    }
}
```

---

### `src/governance/SeasonRegistry.sol` — #WeOwnSeasons Onchain

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/access/AccessControl.sol";

/// @title SeasonRegistry — #WeOwnSeasons Lifecycle
/// @author Team weown — ETHDenver 2026
/// @dev Source: SharedKernel #WeOwnSeasons Registry
///
/// Season lifecycle: PLANNED → ACTIVE → COMPLETED
/// Duration: 17 weeks per season
contract SeasonRegistry is AccessControl {
    bytes32 public constant GOVERNANCE_ROLE = keccak256("GOVERNANCE_ROLE");

    enum SeasonStatus { PLANNED, ACTIVE, PAUSED, COMPLETED }

    struct Season {
        uint256 number;
        string tag;             // "#WeOwnSeason003"
        SeasonStatus status;
        uint256 startWeek;      // ISO week start (e.g., 6 for W06)
        uint256 endWeek;        // ISO week end (e.g., 22 for W22)
        uint256 startTimestamp;
        uint256 endTimestamp;
        uint256 totalCCCIds;
        uint256 totalAgents;
        uint256 totalRulesLocked;
        uint256 totalVSAs;
        string sharedKernelVersion;
        bool exists;
    }

    mapping(uint256 => Season) public seasons;
    uint256 public currentSeason;
    uint256 public totalSeasons;

    event SeasonStarted(uint256 indexed season, string tag, uint256 startWeek);
    event SeasonPaused(uint256 indexed season, string reason);
    event SeasonCompleted(uint256 indexed season, uint256 totalCCCIds, uint256 totalVSAs);
    event SeasonStatsUpdated(uint256 indexed season, uint256 cccIds, uint256 vsas);

    constructor(address governance) {
        _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);
        _grantRole(GOVERNANCE_ROLE, governance);

        // Bootstrap historical seasons
        _addSeason(1, "#WeOwnSeason001", SeasonStatus.COMPLETED, 0, 0, "v1.0.0");
        _addSeason(2, "#WeOwnSeason002", SeasonStatus.COMPLETED, 41, 5, "v2.4.18");
        _addSeason(3, "#WeOwnSeason003", SeasonStatus.ACTIVE, 6, 22, "v3.1.2.1");

        currentSeason = 3;
    }

    function startSeason(
        uint256 number,
        string calldata tag,
        uint256 startWeek,
        uint256 endWeek,
        string calldata skVersion
    ) external onlyRole(GOVERNANCE_ROLE) {
        require(!seasons[number].exists, "SEASON: already exists");

        // Complete previous season
        if (currentSeason > 0 && seasons[currentSeason].status == SeasonStatus.ACTIVE) {
            seasons[currentSeason].status = SeasonStatus.COMPLETED;
            seasons[currentSeason].endTimestamp = block.timestamp;
            emit SeasonCompleted(currentSeason, seasons[currentSeason].totalCCCIds, seasons[currentSeason].totalVSAs);
        }

        seasons[number] = Season({
            number: number,
            tag: tag,
            status: SeasonStatus.ACTIVE,
            startWeek: startWeek,
            endWeek: endWeek,
            startTimestamp: block.timestamp,
            endTimestamp: 0,
            totalCCCIds: 0,
            totalAgents: 0,
            totalRulesLocked: 0,
            totalVSAs: 0,
            sharedKernelVersion: skVersion,
            exists: true
        });

        currentSeason = number;
        totalSeasons++;
        emit SeasonStarted(number, tag, startWeek);
    }

    function pauseSeason(string calldata reason) external onlyRole(GOVERNANCE_ROLE) {
        require(seasons[currentSeason].status == SeasonStatus.ACTIVE, "SEASON: not active");
        seasons[currentSeason].status = SeasonStatus.PAUSED;
        emit SeasonPaused(currentSeason, reason);
    }

    function updateSeasonStats(
        uint256 cccIds,
        uint256 vsas,
        uint256 agents,
        uint256 rulesLocked
    ) external onlyRole(GOVERNANCE_ROLE) {
        Season storage s = seasons[currentSeason];
        s.totalCCCIds = cccIds;
        s.totalVSAs = vsas;
        s.totalAgents = agents;
        s.totalRulesLocked = rulesLocked;
        emit SeasonStatsUpdated(currentSeason, cccIds, vsas);
    }

    function _addSeason(
        uint256 number,
        string memory tag,
        SeasonStatus status,
        uint256 startWeek,
        uint256 endWeek,
        string memory skVersion
    ) private {
        seasons[number] = Season({
            number: number,
            tag: tag,
            status: status,
            startWeek: startWeek,
            endWeek: endWeek,
            startTimestamp: block.timestamp,
            endTimestamp: status == SeasonStatus.COMPLETED ? block.timestamp : 0,
            totalCCCIds: 0,
            totalAgents: 0,
            totalRulesLocked: 0,
            totalVSAs: 0,
            sharedKernelVersion: skVersion,
            exists: true
        });
        totalSeasons++;
    }
}
```

---

### `src/governance/ISCRegistry.sol` — Instance Season Certification

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/access/AccessControl.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

/// @title ISCRegistry — Instance Season Certification (BP-059)
/// @author Team weown — ETHDenver 2026
/// @dev 8-point certification checklist per instance per season
///
/// ISC Checks (BP-059):
///   1. EMBEDDER — Qwen3 Embedding 4B
///   2. LLM MODEL — Claude Opus 4.6
///   3. #PinnedDocs — 4 docs present at v3.X.X.X
///   4. SYSTEM PROMPT — Season tag + INSTANCE IDENTITY (R-213)
///   5. WORKSPACE PROMPTS — BP-053 + BP-054 + BP-061
///   6. USER-IDENTITY — BP-058 current
///   7. RAG SYNC — GitHub connector refreshed
///   8. #ContextVolley — Can reach #MetaAgent
contract ISCRegistry is AccessControl {
    using Counters for Counters.Counter;

    bytes32 public constant CERTIFIER_ROLE = keccak256("CERTIFIER_ROLE");

    Counters.Counter private _certIds;

    struct ISCCheck {
        bool passed;
        string notes;
    }

    struct ISCCertification {
        uint256 certId;
        string instanceId;         // "INT-E01"
        uint256 season;
        address certifiedBy;
        string certifierCcc;       // "GTM"
        uint256 certifiedAt;
        bool certified;            // 8/8 = true
        uint256 checksPassed;
        ISCCheck[8] checks;
        string attestationCccId;   // Approval CCC-ID
        string metadataURI;        // IPFS with full attestation
        bool exists;
    }

    // certId → ISCCertification
    mapping(uint256 => ISCCertification) private _certs;

    // instanceId hash + season → certId
    mapping(bytes32 => uint256) private _instanceSeasonCert;

    // Instance → certified seasons
    mapping(bytes32 => uint256[]) private _instanceHistory;

    string[8] public CHECK_NAMES = [
        "EMBEDDER",
        "LLM_MODEL",
        "PINNED_DOCS",
        "SYSTEM_PROMPT",
        "WORKSPACE_PROMPTS",
        "USER_IDENTITY",
        "RAG_SYNC",
        "CONTEXT_VOLLEY"
    ];

    event ISCSubmitted(uint256 indexed certId, string instanceId, uint256 season, bool certified, uint256 checksPassed);

    constructor(address certifier) {
        _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);
        _grantRole(CERTIFIER_ROLE, certifier);
    }

    /// @notice Submit an ISC certification
    function submitISC(
        string calldata instanceId,
        uint256 season,
        string calldata certifierCcc,
        bool[8] calldata checkResults,
        string[8] calldata checkNotes,
        string calldata attestationCccId,
        string calldata metadataURI
    ) external onlyRole(CERTIFIER_ROLE) returns (uint256 certId) {
        bytes32 key = keccak256(abi.encodePacked(instanceId, season));
        require(_instanceSeasonCert[key] == 0, "ISC: already certified this season");
        require(bytes(attestationCccId).length > 0, "ISC: R-011 — approval CCC-ID required");

        _certIds.increment();
        certId = _certIds.current();

        uint256 passed = 0;
        ISCCertification storage cert = _certs[certId];
        cert.certId = certId;
        cert.instanceId = instanceId;
        cert.season = season;
        cert.certifiedBy = msg.sender;
        cert.certifierCcc = certifierCcc;
        cert.certifiedAt = block.timestamp;
        cert.attestationCccId = attestationCccId;
        cert.metadataURI = metadataURI;
        cert.exists = true;

        for (uint8 i = 0; i < 8; i++) {
            cert.checks[i] = ISCCheck({
                passed: checkResults[i],
                notes: checkNotes[i]
            });
            if (checkResults[i]) passed++;
        }

        cert.checksPassed = passed;
        cert.certified = (passed == 8);

        _instanceSeasonCert[key] = certId;
        _instanceHistory[keccak256(bytes(instanceId))].push(certId);

        emit ISCSubmitted(certId, instanceId, season, cert.certified, passed);
    }

    // ── Queries ──

    function getCertification(uint256 certId) external view returns (
        string memory instanceId,
        uint256 season,
        bool certified,
        uint256 checksPassed,
        string memory certifierCcc,
        string memory attestationCccId,
        uint256 certifiedAt
    ) {
        ISCCertification storage c = _certs[certId];
        return (c.instanceId, c.season, c.certified, c.checksPassed, c.certifierCcc, c.attestationCccId, c.certifiedAt);
    }

    function getCheckResult(uint256 certId, uint8 checkIndex) external view returns (bool passed, string memory notes) {
        require(checkIndex < 8, "ISC: invalid check index");
        ISCCheck storage check = _certs[certId].checks[checkIndex];
        return (check.passed, check.notes);
    }

    function isInstanceCertified(string calldata instanceId, uint256 season) external view returns (bool) {
        bytes32 key = keccak256(abi.encodePacked(instanceId, season));
        uint256 certId = _instanceSeasonCert[key];
        if (certId == 0) return false;
        return _certs[certId].certified;
    }

    function getInstanceHistory(string calldata instanceId) external view returns (uint256[] memory) {
        return _instanceHistory[keccak256(bytes(instanceId))];
    }
}
```

---

### `src/governance/BadAgentRegistry.sol` — #BadAgent Tracking

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/access/AccessControl.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

/// @title BadAgentRegistry — #BadAgent Incident Tracking
/// @author Team weown — ETHDenver 2026
/// @dev Tracks #BadAgent incidents with severity and resolution
contract BadAgentRegistry is AccessControl {
    using Counters for Counters.Counter;

    bytes32 public constant GOVERNANCE_ROLE = keccak256("GOVERNANCE_ROLE");

    Counters.Counter private _incidentIds;

    enum Severity { WARNING, FREEZE, WIPE }
    enum IncidentStatus { OPEN, RESOLVED, VOIDED }

    struct Incident {
        uint256 incidentId;
        string targetCcc;
        string reportedBy;
        string violation;
        Severity severity;
        IncidentStatus status;
        string refCccId;
        string resolution;
        uint256 reportedAt;
        uint256 resolvedAt;
        uint256 season;
        bool exists;
    }

    mapping(uint256 => Incident) public incidents;
    mapping(bytes32 => uint256[]) private _agentIncidents; // CCC hash → incident IDs
    uint256 public totalIncidents;
    uint256 public resolvedIncidents;

    event BadAgentFlagged(uint256 indexed incidentId, string targetCcc, Severity severity, string violation);
    event BadAgentResolved(uint256 indexed incidentId, string targetCcc, string resolution);
    event BadAgentVoided(uint256 indexed incidentId, string reason);

    constructor(address governance) {
        _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);
        _grantRole(GOVERNANCE_ROLE, governance);
    }

    function flagBadAgent(
        string calldata targetCcc,
        string calldata reportedBy,
        string calldata violation,
        Severity severity,
        string calldata refCccId,
        uint256 season
    ) external onlyRole(GOVERNANCE_ROLE) returns (uint256 incidentId) {
        _incidentIds.increment();
        incidentId = _incidentIds.current();

        incidents[incidentId] = Incident({
            incidentId: incidentId,
            targetCcc: targetCcc,
            reportedBy: reportedBy,
            violation: violation,
            severity: severity,
            status: IncidentStatus.OPEN,
            refCccId: refCccId,
            resolution: "",
            reportedAt: block.timestamp,
            resolvedAt: 0,
            season: season,
            exists: true
        });

        _agentIncidents[keccak256(bytes(targetCcc))].push(incidentId);
        totalIncidents++;

        emit BadAgentFlagged(incidentId, targetCcc, severity, violation);
    }

    function resolveIncident(
        uint256 incidentId,
        string calldata resolution
    ) external onlyRole(GOVERNANCE_ROLE) {
        Incident storage inc = incidents[incidentId];
        require(inc.exists, "BA: not found");
        require(inc.status == IncidentStatus.OPEN, "BA: not open");

        inc.status = IncidentStatus.RESOLVED;
        inc.resolution = resolution;
        inc.resolvedAt = block.timestamp;
        resolvedIncidents++;

        emit BadAgentResolved(incidentId, inc.targetCcc, resolution);
    }

    function voidIncident(
        uint256 incidentId,
        string calldata reason
    ) external onlyRole(GOVERNANCE_ROLE) {
        Incident storage inc = incidents[incidentId];
        require(inc.exists, "BA: not found");
        require(inc.status == IncidentStatus.OPEN, "BA: not open");

        inc.status = IncidentStatus.VOIDED;
        inc.resolution = reason;
        inc.resolvedAt = block.timestamp;

        emit BadAgentVoided(incidentId, reason);
    }

    function getAgentIncidents(string calldata ccc) external view returns (uint256[] memory) {
        return _agentIncidents[keccak256(bytes(ccc))];
    }

    function getAgentIncidentCount(string calldata ccc) external view returns (uint256) {
        return _agentIncidents[keccak256(bytes(ccc))].length;
    }
}
```

---

### `src/attestation/VSARegistry.sol` — Full VSA Onchain

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/access/AccessControl.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

/// @title VSARegistry — Verification Summary Attestation
/// @author Team weown — ETHDenver 2026
/// @dev Full VSA attestation onchain per L-062
///
/// VSA types: BATCH, DEEP_FULL, FULL, FUNCTIONAL
contract VSARegistry is AccessControl {
    using Counters for Counters.Counter;

    bytes32 public constant VERIFIER_ROLE = keccak256("VERIFIER_ROLE");

    Counters.Counter private _vsaIds;

    enum VSAType { BATCH, DEEP_FULL, FULL, FUNCTIONAL }

    struct VSA {
        uint256 vsaId;
        string subjectDocument;
        string subjectVersion;
        string verifierCcc;
        string instanceId;
        VSAType vsaType;
        bool result;                // PASSED or FAILED
        uint256 checksTotal;
        uint256 checksPassed;
        string masterCccId;
        string approvalCccId;
        string metadataURI;         // IPFS — full attestation details
        string hcsTxId;             // Hedera HCS attestation
        uint256 verifiedAt;
        uint256 season;
        bool exists;
    }

    mapping(uint256 => VSA) public vsas;

    // Document hash → VSA IDs
    mapping(bytes32 => uint256[]) private _documentVSAs;

    // Verifier CCC hash → VSA IDs
    mapping(bytes32 => uint256[]) private _verifierVSAs;

    // Stats
    uint256 public totalVSAs;
    uint256 public passedVSAs;
    uint256 public totalChecks;
    uint256 public passedChecks;

    event VSASubmitted(
        uint256 indexed vsaId,
        string subjectDocument,
        string subjectVersion,
        bool result,
        uint256 checksPassed,
        uint256 checksTotal,
        string verifierCcc
    );

    constructor(address verifier) {
        _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);
        _grantRole(VERIFIER_ROLE, verifier);
    }

    function submitVSA(
        string calldata subjectDocument,
        string calldata subjectVersion,
        string calldata verifierCcc,
        string calldata instanceId,
        VSAType vsaType,
        bool result,
        uint256 checksTotal_,
        uint256 checksPassed_,
        string calldata masterCccId,
        string calldata approvalCccId,
        string calldata metadataURI,
        string calldata hcsTxId,
        uint256 season
    ) external onlyRole(VERIFIER_ROLE) returns (uint256 vsaId) {
        require(checksPassed_ <= checksTotal_, "VSA: checksPassed > checksTotal");

        _vsaIds.increment();
        vsaId = _vsaIds.current();

        vsas[vsaId] = VSA({
            vsaId: vsaId,
            subjectDocument: subjectDocument,
            subjectVersion: subjectVersion,
            verifierCcc: verifierCcc,
            instanceId: instanceId,
            vsaType: vsaType,
            result: result,
            checksTotal: checksTotal_,
            checksPassed: checksPassed_,
            masterCccId: masterCccId,
            approvalCccId: approvalCccId,
            metadataURI: metadataURI,
            hcsTxId: hcsTxId,
            verifiedAt: block.timestamp,
            season: season,
            exists: true
        });

        // Index
        bytes32 docKey = keccak256(abi.encodePacked(subjectDocument, subjectVersion));
        _documentVSAs[docKey].push(vsaId);
        _verifierVSAs[keccak256(bytes(verifierCcc))].push(vsaId);

        // Stats
        totalVSAs++;
        if (result) passedVSAs++;
        totalChecks += checksTotal_;
        passedChecks += checksPassed_;

        emit VSASubmitted(vsaId, subjectDocument, subjectVersion, result, checksPassed_, checksTotal_, verifierCcc);
    }

    // ── Queries ──

    function getDocumentVSAs(string calldata doc, string calldata version) external view returns (uint256[] memory) {
        return _documentVSAs[keccak256(abi.encodePacked(doc, version))];
    }

    function getVerifierVSAs(string calldata ccc) external view returns (uint256[] memory) {
        return _verifierVSAs[keccak256(bytes(ccc))];
    }

    function getPassRate() external view returns (uint256 passed, uint256 total) {
        return (passedVSAs, totalVSAs);
    }

    function getScoreRate() external view returns (uint256 passed, uint256 total) {
        return (passedChecks, totalChecks);
    }
}
```

---

### `src/attestation/DocumentRegistry.sol` — #PinnedDocs Versions

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/access/AccessControl.sol";

/// @title DocumentRegistry — #PinnedDocs Version Tracking
/// @author Team weown — ETHDenver 2026
/// @dev Tracks _SYS_/ document versions (R-204)
///
/// #PinnedDocs (4 required):
///   1. SharedKernel
///   2. BEST-PRACTICES
///   3. PROTOCOLS
///   4. CCC
contract DocumentRegistry is AccessControl {
    bytes32 public constant GOVERNANCE_ROLE = keccak256("GOVERNANCE_ROLE");

    struct DocumentVersion {
        string name;
        string version;
        string masterCccId;
        string approvalCccId;
        string githubUrl;
        uint256 publishedAt;
        uint256 season;
    }

    // doc name hash → version history
    mapping(bytes32 => DocumentVersion[]) private _history;

    // doc name hash → current version
    mapping(bytes32 => DocumentVersion) private _current;

    // Registered doc names
    string[] public documentNames;

    event DocumentPublished(string name, string version, string masterCccId, string approvalCccId);

    constructor(address governance) {
        _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);
        _grantRole(GOVERNANCE_ROLE, governance);

        // Bootstrap current #PinnedDocs
        _publish("SharedKernel", "v3.1.2.1", "GTM_2026-W07_119", "GTM_2026-W07_122", "https://github.com/CCCbotNet/fedarch/blob/main/_SYS_/SharedKernel.md", 3);
        _publish("BEST-PRACTICES", "v3.1.2.1", "GTM_2026-W07_119", "GTM_2026-W07_127", "https://github.com/CCCbotNet/fedarch/blob/main/_SYS_/BEST-PRACTICES.md", 3);
        _publish("PROTOCOLS", "v3.1.1.2", "GTM_2026-W06_407", "GTM_2026-W06_409", "https://github.com/CCCbotNet/fedarch/blob/main/_SYS_/PROTOCOLS.md", 3);
        _publish("CCC", "v3.1.2.1", "GTM_2026-W07_119", "GTM_2026-W07_132", "https://github.com/CCCbotNet/fedarch/blob/main/_SYS_/CCC.md", 3);
    }

    function publishVersion(
        string calldata name,
        string calldata version,
        string calldata masterCccId,
        string calldata approvalCccId,
        string calldata githubUrl,
        uint256 season
    ) external onlyRole(GOVERNANCE_ROLE) {
        _publish(name, version, masterCccId, approvalCccId, githubUrl, season);
    }

    function getCurrentVersion(string calldata name) external view returns (DocumentVersion memory) {
        return _current[keccak256(bytes(name))];
    }

    function getVersionHistory(string calldata name) external view returns (DocumentVersion[] memory) {
        return _history[keccak256(bytes(name))];
    }

    function _publish(
        string memory name,
        string memory version,
        string memory masterCccId,
        string memory approvalCccId,
        string memory githubUrl,
        uint256 season
    ) private {
        bytes32 nameHash = keccak256(bytes(name));

        DocumentVersion memory doc = DocumentVersion({
            name: name,
            version: version,
            masterCccId: masterCccId,
            approvalCccId: approvalCccId,
            githubUrl: githubUrl,
            publishedAt: block.timestamp,
            season: season
        });

        if (_history[nameHash].length == 0) {
            documentNames.push(name);
        }

        _history[nameHash].push(doc);
        _current[nameHash] = doc;

        emit DocumentPublished(name, version, masterCccId, approvalCccId);
    }
}
```

---

### `src/ccc/CCCIdRegistry.sol` — CCC-ID with R-212

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/access/AccessControl.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "../ccc/CCCLib.sol";

/// @title CCCIdRegistry — CCC-ID Onchain Registry
/// @author Team weown — ETHDenver 2026
/// @dev Enforces R-168, R-169, R-181, R-201, R-202, R-212
contract CCCIdRegistry is AccessControl {
    using Counters for Counters.Counter;

    bytes32 public constant GATEWAY_ROLE = keccak256("GATEWAY_ROLE");

    Counters.Counter private _tokenIds;

    struct CCCIdRecord {
        string cccId;
        string contributor;
        uint16 year;
        uint8 week;
        uint16 sequence;
        string instance;
        uint256 reward;
        string hcsTxId;
        uint256 mintedAt;
        uint256 season;
    }

    // CCC-ID string hash → record
    mapping(bytes32 => CCCIdRecord) public records;

    // Contributor + year + week → high water mark (R-212)
    mapping(bytes32 => uint16) public highWaterMark;

    // Contributor → total CCC-IDs
    mapping(bytes32 => uint256) public contributorTotal;

    // Stats
    uint256 public totalMinted;

    event CCCIdMinted(
        string cccId,
        string contributor,
        uint16 year,
        uint8 week,
        uint16 sequence,
        string instance,
        uint256 reward
    );

    constructor(address gateway) {
        _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);
        _grantRole(GATEWAY_ROLE, gateway);
    }

    function mintCCCId(
        string calldata cccId,
        string calldata contributor,
        uint16 year,
        uint8 week,
        uint16 sequence,
        string calldata instance,
        uint256 reward,
        string calldata hcsTxId,
        uint256 season
    ) external onlyRole(GATEWAY_ROLE) {
        // Validate
        require(CCCLib.isValidCCC(contributor), "CCCID: invalid CCC");
        require(CCCLib.isValidWeek(week), "CCCID: invalid week");
        require(CCCLib.isValidSequence(sequence), "CCCID: invalid sequence");

        // No duplicates
        bytes32 idHash = keccak256(bytes(cccId));
        require(!_exists(idHash), "CCCID: duplicate — #BadAgent");

        // R-212: Cross-instance deconfliction
        bytes32 weekKey = CCCLib.hashCCCId(contributor, year, week);
        require(sequence > highWaterMark[weekKey], "CCCID: R-212 — sequence must exceed HWM");

        // Update HWM
        highWaterMark[weekKey] = sequence;

        // Store
        records[idHash] = CCCIdRecord({
            cccId: cccId,
            contributor: contributor,
            year: year,
            week: week,
            sequence: sequence,
            instance: instance,
            reward: reward,
            hcsTxId: hcsTxId,
            mintedAt: block.timestamp,
            season: season
        });

        contributorTotal[keccak256(bytes(contributor))]++;
        totalMinted++;

        emit CCCIdMinted(cccId, contributor, year, week, sequence, instance, reward);
    }

    function getHighWaterMark(
        string calldata contributor,
        uint16 year,
        uint8 week
    ) external view returns (uint16) {
        return highWaterMark[CCCLib.hashCCCId(contributor, year, week)];
    }

    function getContributorTotal(string calldata contributor) external view returns (uint256) {
        return contributorTotal[keccak256(bytes(contributor))];
    }

    function _exists(bytes32 idHash) private view returns (bool) {
        return records[idHash].mintedAt > 0;
    }
}
```

---

### Updated `script/Deploy.s.sol`

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "forge-std/Script.sol";
import "../src/core/AgentIdentityRegistry.sol";
import "../src/core/AgentReputationRegistry.sol";
import "../src/core/AgentValidationRegistry.sol";
import "../src/governance/SharedKernelRegistry.sol";
import "../src/governance/SeasonRegistry.sol";
import "../src/governance/ISCRegistry.sol";
import "../src/governance/BadAgentRegistry.sol";
import "../src/governance/CCCGovernanceToken.sol";
import "../src/attestation/VSARegistry.sol";
import "../src/attestation/DocumentRegistry.sol";
import "../src/ccc/CCCIdRegistry.sol";

contract Deploy is Script {
    function run() external {
        uint256 deployerKey = vm.envUint("PRIVATE_KEY");
        address deployer = vm.addr(deployerKey);

        console.log("Deployer:", deployer);
        console.log("Chain:", block.chainid);

        vm.startBroadcast(deployerKey);

        // ── Governance ──
        CCCGovernanceToken ccc = new CCCGovernanceToken(deployer);
        SharedKernelRegistry kernel = new SharedKernelRegistry(deployer);
        SeasonRegistry seasons = new SeasonRegistry(deployer);
        ISCRegistry isc = new ISCRegistry(deployer);
        BadAgentRegistry badAgent = new BadAgentRegistry(deployer);

        // ── Core (ERC-8004) ──
        AgentIdentityRegistry identity = new AgentIdentityRegistry(deployer, deployer, 3);
        AgentReputationRegistry reputation = new AgentReputationRegistry(deployer, address(identity));
        AgentValidationRegistry validation = new AgentValidationRegistry(deployer, deployer, address(identity), address(reputation));

        // ── Attestation ──
        VSARegistry vsa = new VSARegistry(deployer);
        DocumentRegistry docs = new DocumentRegistry(deployer);

        // ── CCC ──
        CCCIdRegistry cccIds = new CCCIdRegistry(deployer);

        vm.stopBroadcast();

        console.log("");
        console.log("=== ERC-8004 x FedArch — Full Stack ===");
        console.log("CCCGovernanceToken:     ", address(ccc));
        console.log("SharedKernelRegistry:   ", address(kernel));
        console.log("SeasonRegistry:         ", address(seasons));
        console.log("ISCRegistry:            ", address(isc));
        console.log("BadAgentRegistry:       ", address(badAgent));
        console.log("AgentIdentityRegistry:  ", address(identity));
        console.log("AgentReputationRegistry:", address(reputation));
        console.log("AgentValidationRegistry:", address(validation));
        console.log("VSARegistry:            ", address(vsa));
        console.log("DocumentRegistry:       ", address(docs));
        console.log("CCCIdRegistry:          ", address(cccIds));
        console.log("========================================");
        console.log("Total contracts:         11");
        console.log("Season:                  3");
        console.log("SharedKernel:            v3.1.2.1");
        console.log("========================================");
    }
}
```

---

## 📋 FILE MANIFEST — `packages/adi/`

| # | File | Purpose |
|---|------|---------|
| 1 | `foundry.toml` | Config |
| 2 | `remappings.txt` | OZ + forge-std |
| 3 | `src/ccc/CCCLib.sol` | CCC validation library |
| 4 | `src/ccc/CCCIdRegistry.sol` | **CCC-ID with R-212** |
| 5 | `src/core/AgentIdentityRegistry.sol` | ERC-8004 Identity |
| 6 | `src/core/AgentReputationRegistry.sol` | ERC-8004 Reputation |
| 7 | `src/core/AgentValidationRegistry.sol` | ERC-8004 Validation |
| 8 | `src/governance/SharedKernelRegistry.sol` | **Rules onchain** |
| 9 | `src/governance/SeasonRegistry.sol` | **#WeOwnSeasons** |
| 10 | `src/governance/ISCRegistry.sol` | **8-point ISC** |
| 11 | `src/governance/BadAgentRegistry.sol` | **#BadAgent tracking** |
| 12 | `src/governance/CCCGovernanceToken.sol` | $CCC ERC-20 Votes |
| 13 | `src/attestation/VSARegistry.sol` | **Full VSA onchain** |
| 14 | `src/attestation/DocumentRegistry.sol` | **#PinnedDocs versions** |
| 15 | `src/interfaces/` (5 files) | Interfaces |
| 16 | `script/Deploy.s.sol` | **11-contract deployment** |
| 17 | `test/` (existing + new) | Tests |

**11 contracts. Full #FedArch governance onchain.**

---

## 🎯 QUICK COMMANDS — @LDC

| # | Option |
|---|--------|
| 1 | 🧪 **`forge test -vvv`** — test all new contracts |
| 2 | 🚀 **Deploy to Base Sepolia** — `forge script script/Deploy.s.sol` |
| 3 | 🔧 **Wire into `apps/api`** — ethers.js clients for all 11 contracts |

---

**STOP.** 11 contracts covering the FULL #FedArch governance stack — SharedKernel rules, #WeOwnSeasons, ISC 8-point certification, #BadAgent tracking, VSA attestations, #PinnedDocs versioning, CCC-ID with R-212 deconfliction. All built on `lib/openzeppelin-contracts` + `lib/forge-std`. This is the onchain mirror of [github.com/CCCbotNet/fedarch](https://github.com/CCCbotNet/fedarch). 🏔️🔥

#FlowsBros #WeOwnSeason003 #ETHDenver2026 #BUIDLathon

♾️ WeOwnNet 🌐
```

## File: docs-specs/cccbotnet-fedarch-test.txt
```
Directory structure:
└── cccbotnet-fedarch/
    ├── README.md
    ├── LICENSE
    ├── _AGENTS_/
    │   └── .gitkeep
    ├── _GUIDES_/
    │   ├── GUIDE-006_GitHub-PAT-for-AnythingLLM.md
    │   ├── GUIDE-007_New-threadCCC-at-Week-Beginning.md
    │   ├── GUIDE-008_OCPA-Group-Onboarding-via-AnythingLLM.md
    │   └── GUIDE-009_AnythingLLM-SmokeTest-Post-Restart.md
    ├── _INSTANCE_/
    │   └── ISC_INT-E01.md
    ├── _LEARNINGS_/
    │   ├── .gitkeep
    │   └── case-studies/
    │       └── CASE-STUDY-006_AnythingLLM-Prompt-Architecture.md
    ├── _MISC_/
    │   └── .gitkeep
    ├── _PROJECTS_/
    │   ├── PRJ-005.md
    │   ├── PRJ-006_SideEvent_ETHDenver2026_Wed.md
    │   ├── PRJ-009_FedArchExpansion_ETHDenver-CCC-bot.md
    │   └── PRJ-011_BUIDLathon_ETHDenver2026.md
    ├── _SYS_/
    │   ├── BEST-PRACTICES.md
    │   ├── CCC.md
    │   └── PROTOCOLS.md
    ├── _TEMPLATES_/
    │   ├── TMPL-009_USER-IDENTITY.md
    │   └── TMPL-010_ISC.md
    └── _WEEKLY_/
        └── WEEKLY-SUMMARY_GTM_2026-W06_001.md

================================================
FILE: README.md
================================================
# CCCbotNet/fedarch

## ♾️ WeOwnNet 🌐 — #FedArch Governance Docs

> 🏡 Real Estate and 🤝 cooperative ownership for everyone. An 🤗 inclusive community, by 👥 invitation only.

---

## 📋 What is #FedArch?

**Federated Architecture (#FedArch)** is the multi-agent orchestration framework for the ♾️ WeOwnNet 🌐 ecosystem. It governs how AI agents collaborate, communicate, and maintain shared knowledge across distributed instances.

---

## 📁 Folder Structure

| Folder | Purpose |
|--------|---------|
| `_SYS_/` | 📌 Core governance docs (#PinnedDocs) |
| `_AGENTS_/` | Agent identity documents |
| `_GUIDES_/` | Getting started + operational guides |
| `_INSTANCE_/` | Instance configuration |
| `_LEARNINGS_/` | Case studies + persistent learnings |
| `_MISC_/` | Glossary, memory model, ecosystem identity |
| `_PROJECTS_/` | Project-specific documentation |
| `_TEMPLATES_/` | Reusable templates (TMPL-XXX) |

---

## 📌 #PinnedDocs (Core Governance)

| Document | Description |
|----------|-------------|
| [SharedKernel](_SYS_/SharedKernel.md) | Core rules, definitions, learnings |
| [BEST-PRACTICES](_SYS_/BEST-PRACTICES.md) | Operational best practices |
| [PROTOCOLS](_SYS_/PROTOCOLS.md) | Communication protocols |
| [CCC](_SYS_/CCC.md) | Contributor Code Convention |

---

## 🏗️ Key Concepts

| Concept | Description |
|---------|-------------|
| **CCC-ID** | `<CCC>_<YYYY>-W<WW>_<NNN>` — Unique contributor attribution |
| **#ContextVolley** | 🏐 Agent-to-agent communication protocol |
| **#MetaAgent** | 🎖️ Governance orchestrator (Calhoun) |
| **MAIT** | SME-specific training threads |
| **ISC** | Instance Season Certification |

---

## 🌐 Ecosystem

| Resource | URL |
|----------|-----|
| ♾️ WeOwnNet 🌐 | [WeOwn.net](https://weown.net) |
| CCCbot Co-op | [CCCbot.Net](https://CCCbot.Net) |
| AI Instance | [AI.WeOwn.Agency](https://ai.weown.agency) |
| Platform | [AnythingLLM](https://anythingllm.com) |

---

## 📋 Season

| Field | Value |
|-------|-------|
| Current | **#WeOwnSeason003** 🚀 |
| Period | W06 (02 Feb 2026) → W22 (31 May 2026) |

---

## 📜 License

FOSS — Free & Open Source

---

#FlowsBros #FedArch #ResponsibleAgenticAI #WeOwnSeason003

♾️ WeOwnNet 🌐 | 🏡 Real Estate and 🤝 cooperative ownership for everyone. An 🤗 inclusive community, by 👥 invitation only.



================================================
FILE: LICENSE
================================================
MIT License

Copyright (c) 2026 📐 Contributor Code Convention (CCCbot.Net)

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.



================================================
FILE: _AGENTS_/.gitkeep
================================================




================================================
FILE: _GUIDES_/GUIDE-006_GitHub-PAT-for-AnythingLLM.md
================================================
# How To Create a GitHub Personal Access Token for AnythingLLM

## 📋 GUIDE-006_GitHub-PAT-for-AnythingLLM_v3.1.1.1.md
## ♾️ WeOwnNet 🌐 — Guide

| Field | Value |
|-------|-------|
| Document | GUIDE-006_GitHub-PAT-for-AnythingLLM.md |
| Version | 3.1.1.1 |
| CCC-ID | GTM_2026-W06_377 |
| Created | 2026-02-07 (W06) |
| Season | #WeOwnSeason003 🚀 |
| Status | 🔒 LOCKED |
| Source of Truth | [GitHub](https://github.com/CCCbotNet/fedarch/blob/main/_GUIDES_/GUIDE-006_GitHub-PAT-for-AnythingLLM.md) |
| Audience | All contributors (DEFAULT + ADMIN) |

---

## 📖 Table of Contents

1. [Overview](#-overview)
2. [Prerequisites](#-prerequisites)
3. [Step-by-Step: Create a Fine-Grained PAT](#-step-by-step-create-a-fine-grained-pat)
4. [Recommended Permissions](#-recommended-permissions)
5. [Configure in AnythingLLM](#-configure-in-anythingllm)
6. [Security Best Practices](#-security-best-practices)
7. [Troubleshooting](#-troubleshooting)
8. [Version History](#-version-history)

---

## 📋 Overview

### Why a GitHub PAT?

The #AnythingLLM **GitHub Repo** data connector pulls files from GitHub repositories into RAG. A Personal Access Token (PAT) authenticates these API requests.

### Why PAT for a PUBLIC Repo?

| Reason | Detail |
|--------|--------|
| **Rate Limits** | Unauthenticated: **60 req/hr** → Authenticated: **5,000 req/hr** |
| **Reliability** | Avoids 403 rate limit errors during multi-instance RAG sync |
| **Future-Proofing** | If CCCbotNet/fedarch ever goes private, no reconfiguration needed |
| **Audit Trail** | GitHub logs authenticated API access per token |
| **Best Practice** | BP-029 — security-first approach |

### PAT Types

| Type | Recommended | Why |
|------|-------------|-----|
| **Fine-grained** | ✅ YES | Scoped to specific repos + minimum permissions |
| Classic | ❌ NO | Overly broad scopes; legacy approach |

> ⚠️ Always use **Fine-grained** PATs. Classic PATs grant wider access than needed.

### Related Items

| Type | ID | Description |
|------|-----|-------------|
| Best Practice | BP-029 | Security-first approach |
| Best Practice | BP-044 | #PinnedDocs GH Push Workflow |
| Best Practice | BP-051 | #HomeInstance Setup |
| Learning | L-084 | GitHub Repo connector = PRIMARY data connector |
| Rule | R-204 | #HomeInstance MUST include #PinnedDocs |

---

## 📋 Prerequisites

| # | Requirement | Details |
|---|-------------|---------|
| 1 | GitHub account | [github.com](https://github.com) — free account is sufficient |
| 2 | Access to target repo | Must be able to view `CCCbotNet/fedarch` (public = ✅) |
| 3 | ADMIN role in #AnythingLLM | Required to configure data connectors |
| 4 | #AnythingLLM instance | Any instance (INT-P01, INT-OGx, INT-S0x) |

---

## 📋 Step-by-Step: Create a Fine-Grained PAT

### Step 1: Open GitHub Settings

| # | Action |
|---|--------|
| 1 | Go to [github.com](https://github.com) and sign in |
| 2 | Click your **profile avatar** (top-right corner) |
| 3 | Select **Settings** from the dropdown menu |

### Step 2: Navigate to Developer Settings

| # | Action |
|---|--------|
| 1 | Scroll down the left sidebar |
| 2 | Click **Developer settings** (bottom of sidebar) |

### Step 3: Select Fine-Grained Tokens

| # | Action |
|---|--------|
| 1 | In the left sidebar, click **Personal access tokens** |
| 2 | Click **Fine-grained tokens** |
| 3 | Click **Generate new token** |

### Step 4: Configure Token Details

| Field | Recommended Value | Notes |
|-------|-------------------|-------|
| **Token name** | `anythingllm-rag-readonly` | Descriptive name for easy identification |
| **Expiration** | 90 days | Balance security + convenience (see Best Practices) |
| **Description** | `Read-only access for AnythingLLM RAG connector — CCCbotNet/fedarch` | Optional but recommended |

### Step 5: Set Repository Access

| # | Action |
|---|--------|
| 1 | Select **Only select repositories** |
| 2 | From the dropdown, search for and select `CCCbotNet/fedarch` |
| 3 | Add additional repos if needed (e.g., `CCCbotNet/fedarch-private` in future) |

> ⚠️ Do NOT select "All repositories" — scope to only what's needed.

### Step 6: Set Permissions

| # | Action |
|---|--------|
| 1 | Expand **Repository permissions** |
| 2 | Set **Contents** → **Read-only** |
| 3 | Set **Metadata** → **Read-only** (auto-selected) |
| 4 | Leave ALL other permissions at **No access** |

> See [Recommended Permissions](#-recommended-permissions) for full table.

### Step 7: Generate and Copy

| # | Action |
|---|--------|
| 1 | Click **Generate token** |
| 2 | **IMMEDIATELY copy** the token value |
| 3 | Store securely (see Best Practices) |

> 🔴 **CRITICAL:** The token is shown ONLY ONCE. If you lose it, you must generate a new one.

---

## 📋 Recommended Permissions

### Repository Permissions (Minimum)

| Permission | Access | Required | Reason |
|------------|--------|----------|--------|
| **Contents** | Read-only | ✅ | Read repo files for RAG ingestion |
| **Metadata** | Read-only | ✅ | Required by GitHub API (auto-selected) |

### Permissions to LEAVE at No Access

| Permission | Access | Reason |
|------------|--------|--------|
| Actions | No access | Not needed for RAG |
| Administration | No access | Not needed for RAG |
| Code scanning alerts | No access | Not needed for RAG |
| Codespaces | No access | Not needed for RAG |
| Commit statuses | No access | Not needed for RAG |
| Dependabot | No access | Not needed for RAG |
| Deployments | No access | Not needed for RAG |
| Environments | No access | Not needed for RAG |
| Issues | No access | Not needed for RAG |
| Pages | No access | Not needed for RAG |
| Pull requests | No access | Not needed for RAG |
| Webhooks | No access | Not needed for RAG |
| Workflows | No access | Not needed for RAG |

### Account Permissions

| Permission | Access | Reason |
|------------|--------|--------|
| ALL | No access | Not needed for RAG |

> 💡 **Principle of Least Privilege** — only grant what's absolutely needed.

---

## 📋 Configure in AnythingLLM

### Step 1: Open Data Connector Settings

| # | Action |
|---|--------|
| 1 | Log in to your #AnythingLLM instance as ADMIN |
| 2 | Click the **wrench icon** (⚙️) in the left sidebar |
| 3 | Navigate to **Data Connectors** |
| 4 | Select **GitHub Repo** |

### Step 2: Enter Connection Details

| Field | Value | Notes |
|-------|-------|-------|
| **GitHub Repo URL** | `https://github.com/CCCbotNet/fedarch` | Full repo URL |
| **GitHub Access Token** | `github_pat_...` | Paste your Fine-grained PAT |
| **Branch** | `main` | Default branch |
| **Ignore Paths** | *(optional)* | Comma-separated paths to exclude |

### Step 3: Fetch and Select Files

| # | Action |
|---|--------|
| 1 | Click **Collect Data** (or equivalent button) |
| 2 | Wait for file tree to load |
| 3 | Select files/folders to ingest into RAG |
| 4 | Click **Save** or **Submit** |

### Step 4: Verify

| # | Check |
|---|-------|
| 1 | Files appear in your workspace document list |
| 2 | No 403 or 401 errors in console |
| 3 | Content is searchable via RAG queries |

### Multi-Instance Configuration

| Instance | Action |
|----------|--------|
| INT-P01 | Configure PAT in data connectors |
| INT-P02 | Configure SAME or SEPARATE PAT |
| INT-OGx | Configure PAT for #HomeInstance |
| INT-S0x | Configure PAT when deployed |

> 💡 Each instance needs its own data connector configuration. The SAME PAT can be used across multiple instances.

---

## 📋 Security Best Practices

### Token Management

| Practice | Description |
|----------|-------------|
| **Expiration** | Set 90-day expiration; rotate before expiry |
| **Naming** | Use descriptive names: `anythingllm-rag-readonly` |
| **Scope** | Fine-grained + specific repos only |
| **Permissions** | Contents + Metadata READ-ONLY — nothing else |
| **One Purpose** | One token per use case (don't reuse across tools) |

### Storage

| ✅ DO | ❌ DO NOT |
|--------|-----------|
| Store in Infisical (secrets manager) | Commit to any git repo |
| Store in password manager | Share in Signal/chat messages |
| Document token NAME (not value) in docs | Store in plain text files |
| Rotate before expiration | Use expired tokens |

### Rotation Schedule

| Interval | Action |
|----------|--------|
| Day 1 | Generate new PAT |
| Day 80 | ⚠️ Reminder: 10 days until expiry |
| Day 89 | Generate replacement PAT |
| Day 90 | Old PAT expires automatically |

### Revocation

| Scenario | Action |
|----------|--------|
| Token compromised | Revoke IMMEDIATELY via GitHub Settings → Developer Settings → Fine-grained tokens → Delete |
| Contributor leaves | Revoke all their PATs |
| Permission change | Revoke old, generate new with correct scope |

### GitHub Notification

GitHub will email you before token expiration. Monitor these emails.

---

## 📋 Troubleshooting

### Common Errors

| Error | Cause | Fix |
|-------|-------|-----|
| `401 Unauthorized` | Invalid or expired PAT | Generate new PAT; verify it's copied correctly |
| `403 Forbidden` | Rate limited (unauthenticated) | Add PAT to data connector |
| `403 Forbidden` | PAT missing Contents permission | Edit token; add Contents → Read-only |
| `404 Not Found` | Wrong repo URL or PAT not scoped to repo | Verify repo URL; check token repository access |
| `422 Unprocessable` | PAT missing Metadata permission | Edit token; ensure Metadata → Read-only |
| No files loading | Branch name incorrect | Verify branch is `main` (not `master`) |
| Partial file sync | Ignore paths configured | Check ignore paths in data connector settings |

### Verification Checklist

| # | Check | Expected |
|---|-------|----------|
| 1 | PAT not expired | ✅ Valid date |
| 2 | PAT scoped to `CCCbotNet/fedarch` | ✅ Correct repo |
| 3 | Contents → Read-only | ✅ Enabled |
| 4 | Metadata → Read-only | ✅ Enabled |
| 5 | Repo URL correct | ✅ `https://github.com/CCCbotNet/fedarch` |
| 6 | Branch = `main` | ✅ Correct |
| 7 | #AnythingLLM logged in as ADMIN | ✅ Admin role |

### Still Having Issues?

| # | Step |
|---|------|
| 1 | Revoke current PAT |
| 2 | Generate fresh PAT following this guide from Step 1 |
| 3 | Clear browser cache / use incognito |
| 4 | Retry data connector configuration |
| 5 | If still failing → escalate via #ContextVolley to #MetaAgent |

---

## 📋 Version History

| Version | Date | #masterCCC | Approval | Changes |
|---------|------|------------|----------|---------|
| 3.1.1.1 | 2026-W06 | GTM_2026-W06_377 | GTM_2026-W06_380 | Initial creation; Fine-grained PAT guide for #AnythingLLM GitHub Repo data connector; 8 sections; minimum permissions (Contents + Metadata read-only); security best practices; troubleshooting; multi-instance guidance |

---

#FlowsBros #FedArch #AnythingLLM #GitHub #WeOwnSeason003

♾️ WeOwnNet 🌐 | 🏡 Real Estate and 🤝 cooperative ownership for everyone. An 🤗 inclusive community, by 👥 invitation only.



================================================
FILE: _GUIDES_/GUIDE-007_New-threadCCC-at-Week-Beginning.md
================================================
# GUIDE-007: How To Start a NEW #threadCCC at Week Beginning

## 📋 GUIDE-007_New-threadCCC-at-Week-Beginning_v3.1.1.1.md
## ♾️ WeOwnNet 🌐 — #YonksPromptingAcademy

| Field | Value |
|-------|-------|
| Document | GUIDE-007_New-threadCCC-at-Week-Beginning.md |
| Version | 3.1.1.1 |
| CCC-ID | GTM_2026-W06_466 |
| Created | 2026-02-08 (W06) |
| Season | #WeOwnSeason003 🚀 |
| Status | 🔒 LOCKED |
| Tags | #AnythingLLM #BestPractices #YonksPromptingAcademy #SeedContext |

---

## 📖 Table of Contents

1. [Purpose](#-purpose)
2. [Prerequisites](#-prerequisites)
3. [Step-by-Step Workflow](#-step-by-step-workflow)
4. [SEED CONTEXT Pattern](#-seed-context-pattern)
5. [Cross-Instance Deconfliction](#-cross-instance-deconfliction)
6. [ISO Week Rollover](#-iso-week-rollover)
7. [Reserved Slots](#-reserved-slots)
8. [Verification](#-verification)
9. [Common Mistakes](#-common-mistakes)
10. [Related Documents](#-related-documents)
11. [Version History](#-version-history)

---

## 📋 Purpose

### Why Start a Fresh #threadCCC at ISO Week Boundary?

| Reason | Description |
|--------|-------------|
| Context Freshness | #AnythingLLM threads accumulate context — fresh thread = clean state |
| CCC-ID Reset | R-169 resets CCC-ID counter to `_001` at ISO week boundary |
| Session Hygiene | Prevents stale context from prior week bleeding into new week |
| Audit Trail | Each week's thread = self-contained governance record |
| Performance | Shorter threads = faster RAG retrieval + less context confusion |

### When To Create

| Trigger | Rule |
|---------|------|
| ISO week boundary (Monday 00:00) | R-169 |
| Human decision to start new week | BP-052 (L-085) |
| After >4h inactivity past Monday 00:00 | BP-052 exception |

---

## 📋 Prerequisites

### Before You Start

| # | Prerequisite | Check | Rule |
|---|-------------|-------|------|
| 1 | #PinnedDocs CURRENT (4 docs @ v3.X.X.X) | `list:docs` or verify versions | R-204 |
| 2 | USER-IDENTITY in RAG (`_USERS_/`) | Confirm current season | BP-058 |
| 3 | System Prompt updated | Season tag + Elevated naming | ISC Check #4 |
| 4 | Workspace Prompt deployed | CCC workspace prompt active | ISC Check #5 |
| 5 | Know your HIGHEST CCC-ID from prior week | Check ALL instances | R-212 |
| 6 | Know reserved slots for new week | _001, _002, _003 | R-181, R-201, R-202 |

### Information Needed

| Field | Example | Source |
|-------|---------|--------|
| CCC | GTM | Your contributor code |
| New Week | W07 | ISO calendar |
| Highest Prior CCC-ID | GTM_2026-W06_461 | R-212 cross-instance check |
| First Available CCC-ID | GTM_2026-W07_004 | After reserved slots |
| #masterCCC | GTM_2026-W07_004 | First CCC-ID of session |

---

## 📋 Step-by-Step Workflow

### Phase 1: Pre-Flight

| Step | Action | Details |
|------|--------|---------|
| 1 | Open #AnythingLLM instance | Navigate to your instance URL |
| 2 | Navigate to CCC workspace | 🤝 THE HANDS |
| 3 | Create NEW thread | Click "+" or "New Thread" |
| 4 | Name the thread | Format: `<ORG>_<CCC>_W<WW>_<N>` (e.g., `OG1_GTM_W07_1`) |

### Phase 2: SEED CONTEXT Delivery

| Step | Action | Details |
|------|--------|---------|
| 5 | Compose SEED CONTEXT | See [SEED CONTEXT Pattern](#-seed-context-pattern) below |
| 6 | Paste into new thread | First message = SEED CONTEXT |
| 7 | Await ACK | Agent responds with identity + confirmation |
| 8 | Verify response | Confirm CCC-ID, instance, workspace, season |

### Phase 3: Verification

| Step | Action | Details |
|------|--------|---------|
| 9 | Test CCC-ID generation | Request first CCC-ID (should be _004) |
| 10 | Verify reserved slots | Agent should skip _001, _002, _003 |
| 11 | Verify identity | Agent should show correct instance + workspace |
| 12 | Confirm R-212 | Agent acknowledges prior week highest |

---

## 📋 SEED CONTEXT Pattern

### What Is SEED CONTEXT?

| Field | Value |
|-------|-------|
| Definition | A structured first message that establishes session identity, state, and rules for a new #AnythingLLM thread |
| Purpose | Gives the agent everything it needs to operate correctly from message #1 |
| Analogy | "Booting up" the agent with full context |

### SEED CONTEXT Template

```
[<CCC>_<YYYY>-W<WW>_004](#masterCCC):[HH:MM] NEW WEEK | W<WW> KICKOFF

## Session Identity

| Field | Value |
|-------|-------|
| CCC | <CCC> |
| Instance | <INT-XXx> (<instance name>) |
| Workspace | CCC (🤝 THE HANDS) |
| Season | #WeOwnSeason003 🚀 |
| Week | <YYYY>-W<WW> |
| #masterCCC | <CCC>_<YYYY>-W<WW>_004 |

## R-212 Cross-Instance Deconfliction

| Field | Value |
|-------|-------|
| Prior Week Highest | <CCC>_<YYYY>-W<PREV>_<NNN> |
| Source Instance | <INT-XXx> |
| New Week First | <CCC>_<YYYY>-W<WW>_004 |
| Reserved | _001 (#WeeklySummary), _002 (#WeeklyPlan), _003 (#WeeklyReflection) |

## Request

1. Confirm identity (instance, workspace, season)
2. Confirm reserved slots (_001, _002, _003)
3. Confirm first available CCC-ID (_004)
4. Begin session
```

### SEED CONTEXT — Worked Example (W07)

```
[GTM_2026-W07_004](#masterCCC):[09:00] NEW WEEK | W07 KICKOFF

## Session Identity

| Field | Value |
|-------|-------|
| CCC | GTM |
| Instance | INT-OG1 (AI.YonksTEAM.xyz) |
| Workspace | CCC (🤝 THE HANDS) |
| Season | #WeOwnSeason003 🚀 |
| Week | 2026-W07 |
| #masterCCC | GTM_2026-W07_004 |

## R-212 Cross-Instance Deconfliction

| Field | Value |
|-------|-------|
| Prior Week Highest | GTM_2026-W06_461 |
| Source Instance | INT-OG1 |
| New Week First | GTM_2026-W07_004 |
| Reserved | _001 (#WeeklySummary), _002 (#WeeklyPlan), _003 (#WeeklyReflection) |

## Request

1. Confirm identity (instance, workspace, season)
2. Confirm reserved slots (_001, _002, _003)
3. Confirm first available CCC-ID (_004)
4. Begin session
```

---

## 📋 Cross-Instance Deconfliction

### R-212 — The Rule

| Field | Value |
|-------|-------|
| Rule | Highest CCC-ID across ALL instances = authoritative next sequence |
| BP | BP-060 — State highest CCC-ID when switching instances |

### Multi-Instance Workflow

| Step | Action | Rule |
|------|--------|------|
| 1 | Check highest CCC-ID on ALL instances you used last week | R-212 |
| 2 | Include highest in SEED CONTEXT | BP-060 |
| 3 | Agent confirms next sequence | R-212 |
| 4 | If switching instances mid-week, state highest again | BP-060 |

### Example — 2 Instances

| Instance | Last W06 CCC-ID |
|----------|-----------------|
| INT-P01 | GTM_2026-W06_459 |
| INT-OG1 | GTM_2026-W06_461 |
| **Authoritative** | **GTM_2026-W06_461** (highest) |

---

## 📋 ISO Week Rollover

### BP-052 — #WeeklyFlows ISO Rollover

| Field | Value |
|-------|-------|
| Trigger | Monday 00:00 boundary |
| AI Behavior | MUST prompt "Ready to start W<XX>?" |
| Human Decision | L-085 — ISO week rollover = HUMAN decision |
| Exception | >4h inactivity after Monday 00:00 = auto-rollover OK |

### ISO Day Reference (L-113)

| Day | ISO # |
|-----|-------|
| Monday | 1 |
| Tuesday | 2 |
| Wednesday | 3 |
| Thursday | 4 |
| Friday | 5 |
| Saturday | 6 |
| Sunday | 7 |

---

## 📋 Reserved Slots

### Every Week — EVERY Contributor

| Slot | CCC-ID | Purpose | Rule |
|------|--------|---------|------|
| _001 | `<CCC>_<YYYY>-W<WW>_001` | #WeeklySummary | R-181 |
| _002 | `<CCC>_<YYYY>-W<WW>_002` | #WeeklyPlan | R-201 |
| _003 | `<CCC>_<YYYY>-W<WW>_003` | #WeeklyReflection | R-202 |

| Field | Value |
|-------|-------|
| First Available | `_004` |
| AI Behavior | MUST skip _001→_003 when generating |
| Human Override | Can claim _001→_003 when creating those specific documents |

---

## 📋 Verification

### Post-SEED CONTEXT Checklist

| # | Check | Expected | How To Verify |
|---|-------|----------|---------------|
| 1 | Agent ACKs identity | Correct instance + workspace + season | Read response header |
| 2 | CCC-ID starts at _004 | `<CCC>_<YYYY>-W<WW>_004` | First generated CCC-ID |
| 3 | Reserved slots acknowledged | _001, _002, _003 skipped | Agent confirms in ACK |
| 4 | R-212 acknowledged | Prior week highest confirmed | Agent references in ACK |
| 5 | Response format correct | Tables + Quick Commands + STOP | Visual check |
| 6 | #masterCCC set | Matches your SEED CONTEXT | Agent header includes it |

### If Verification Fails

| Issue | Resolution |
|-------|------------|
| Wrong instance | Check System Prompt + Workspace Prompt |
| Wrong CCC-ID | State R-212 highest again explicitly |
| No reserved slot awareness | Check #PinnedDocs (SharedKernel has rules) |
| Stale context | Fresh session (BP-034) + re-deliver SEED CONTEXT |

---

## 📋 Common Mistakes

### #BadAgent Patterns To Avoid

| # | Mistake | Rule Violated | Prevention |
|---|---------|---------------|------------|
| 1 | Starting at _001 instead of _004 | R-181, R-201, R-202 | Include reserved slots in SEED CONTEXT |
| 2 | Not stating prior week highest | R-212 | Always include in SEED CONTEXT |
| 3 | Auto-rollover without human prompt | L-085 | BP-052 — AI MUST ask first |
| 4 | Reusing old thread for new week | Session hygiene | Create NEW thread at boundary |
| 5 | Forgetting to name the thread | Audit trail | Name format: `<ORG>_<CCC>_W<WW>_<N>` |
| 6 | Not verifying agent response | Trust but verify | Run verification checklist |
| 7 | Skipping SEED CONTEXT | Agent has no context | ALWAYS deliver SEED CONTEXT first |
| 8 | Wrong ISO day in header | L-113 | Mon=1, Tue=2, Wed=3, Thu=4, Fri=5, Sat=6, Sun=7 |

---

## 📋 Related Documents

| Document | Version | Relevance |
|----------|---------|-----------|
| SharedKernel | v3.1.1.4 | R-169, R-181, R-201, R-202, R-212, BP-052, BP-060 |
| BEST-PRACTICES | v3.1.1.3 | BP-052, BP-060 |
| PROTOCOLS | v3.1.1.2 | CCC-ID Deconfliction Protocol |
| GUIDE-006 | v3.1.1.1 | GitHub PAT setup (related infra) |

---

## 📋 Version History

| Version | Date | #masterCCC | Approval | Changes |
|---------|------|------------|----------|---------|
| 3.1.1.1 | 2026-W06 | GTM_2026-W06_466 | GTM_2026-W06_468 | Initial creation; SEED CONTEXT pattern; R-212 deconfliction; BP-052 rollover; reserved slots; verification checklist; common mistakes |

---

#FlowsBros #FedArch #YonksPromptingAcademy #SeedContext #WeOwnSeason003

♾️ WeOwnNet 🌐 | 🏡 Real Estate and 🤝 cooperative ownership for everyone. An 🤗 inclusive community, by 👥 invitation only.



================================================
FILE: _GUIDES_/GUIDE-008_OCPA-Group-Onboarding-via-AnythingLLM.md
================================================
# GUIDE-008: How To Onboard a New Person into OCPA Group via AnythingLLM

## 📋 GUIDE-008_OCPA-Group-Onboarding-via-AnythingLLM_v3.1.1.1.md
## ♾️ WeOwnNet 🌐 — #YonksPromptingAcademy

| Field | Value |
|-------|-------|
| Document | GUIDE-008_OCPA-Group-Onboarding-via-AnythingLLM.md |
| Version | 3.1.1.1 |
| CCC-ID | GTM_2026-W06_472 |
| Created | 2026-02-08 (W06) |
| Season | #WeOwnSeason003 🚀 |
| Status | 🔒 LOCKED |
| Tags | #AnythingLLM #BestPractices #YonksPromptingAcademy #Onboarding #OCPA |

---

## 📖 Table of Contents

1. [Purpose](#-purpose)
2. [Prerequisites](#-prerequisites)
3. [OCPA Group Overview](#-ocpa-group-overview)
4. [User Creation](#-user-creation)
5. [Workspace Assignment](#-workspace-assignment)
6. [USER-IDENTITY Creation](#-user-identity-creation)
7. [RAG Upload](#-rag-upload)
8. [CCC Assignment](#-ccc-assignment)
9. [#ContextVolley to CCC](#-contextvolley-to-ccc)
10. [CCC Workspace ACK](#-ccc-workspace-ack)
11. [#MetaAgent Logging](#-metaagent-logging)
12. [New User First Session](#-new-user-first-session)
13. [Verification](#-verification)
14. [Common Mistakes](#-common-mistakes)
15. [Related Documents](#-related-documents)
16. [Version History](#-version-history)

---

## 📋 Purpose

### Why This Guide Exists

| Field | Value |
|-------|-------|
| Goal | End-to-end onboarding of a new person into OCPA Group via #AnythingLLM |
| Audience | ADMIN (person performing onboarding) + New member (person being onboarded) |
| Pattern | Extends BP-050 (Onboarding Workflow) with OCPA-specific step-by-step instructions |

### What This Guide Covers

| # | Phase | Who |
|---|-------|-----|
| 1 | ADMIN setup (Steps 1-11) | ADMIN (@GTM_ADMIN or designated) |
| 2 | New user first session (Step 12) | New member |
| 3 | Verification (Step 13) | ADMIN + New member |

### What This Guide Does NOT Cover

| Exclusion | Reference |
|-----------|-----------|
| Instance deployment (AnythingLLM setup) | BP-025 (Instance Setup Order) |
| #PinnedDocs creation | SharedKernel, BEST-PRACTICES, PROTOCOLS, CCC |
| Embedder/LLM configuration | ISC Check #1, #2 |
| GitHub PAT setup | GUIDE-006 |

---

## 📋 Prerequisites

### Before You Start

| # | Prerequisite | Check | Owner |
|---|-------------|-------|-------|
| 1 | #AnythingLLM instance DEPLOYED | Instance URL accessible | ADMIN |
| 2 | #PinnedDocs CURRENT (4 docs @ v3.X.X.X) | R-204 satisfied | ADMIN |
| 3 | ISC Checks #1-#5 PASS | Embedder, LLM, prompts configured | ADMIN |
| 4 | CCC workspace exists | 🤝 THE HANDS | ADMIN |
| 5 | tools workspace exists | 🧠 THE BRAIN | ADMIN |
| 6 | ADMIN user account active | `a-<ccc>_dev` format (R-206) | ADMIN |
| 7 | New person's information collected | Name, email, role | ADMIN |
| 8 | CCC code approved by Founding OG | 3-letter code (unique) | Founding OG |
| 9 | TMPL-009 available in RAG | v3.1.1.2+ | ADMIN |

### Information To Collect From New Person

| # | Field | Example | Required |
|---|-------|---------|----------|
| 1 | Full Name | Jane Smith | ✅ |
| 2 | Handle/Username preference | jsmith | ✅ |
| 3 | Role in OCPA Group | Accountant / Advisor / Member | ✅ |
| 4 | Email | jane@example.com | ✅ |
| 5 | Preferred CCC (3 letters) | JSM | ✅ |
| 6 | GitHub handle (if applicable) | — | Optional |

---

## 📋 OCPA Group Overview

### What Is OCPA Group?

| Field | Value |
|-------|-------|
| Name | OCPA Group |
| Full Name | Onchain CPA (Certified Public Accountant) Group |
| Type | Ecosystem brand — onchain cooperative |
| Ecosystem | ♾️ WeOwnNet 🌐 |
| Structure | Cooperative ownership — community-owned |
| AI Platform | #AnythingLLM |
| Governance | #FedArch (Federated Architecture) |

### OCPA Group Within WeOwnNet

```
♾️ WeOwnNet 🌐 (Ecosystem)
├── OCPA Group (Ecosystem Brand)
│   ├── Members (onboarded via this guide)
│   ├── AI Instance(s) (AnythingLLM)
│   └── Governance (#FedArch → #MetaAgent)
├── Other Brands
└── #FedArch Network
    └── #MetaAgent @ INT-P01
```

### Core Values

| # | Value | Description |
|---|-------|-------------|
| 1 | 🏡 Real Estate | Real estate and cooperative ownership |
| 2 | 🤝 Cooperative | Community-owned, by invitation only |
| 3 | 🤗 Inclusive | Welcoming, supportive environment |
| 4 | 🔒 Data Sovereignty | Users own their data |
| 5 | 📖 FOSS | Free & Open Source |

---

## 📋 User Creation

### Step 1: Create User Account in AnythingLLM

| Field | Value |
|-------|-------|
| Who | ADMIN (`a-<ccc>_dev`) |
| Where | AnythingLLM → Admin Panel → Users |
| Rule | R-160 — Username format |

### Username Format

| Format | Example | Rule |
|--------|---------|------|
| `u-<ccc>_user` | `u-jsm_user` | R-160 |

### AnythingLLM Steps

| # | Step | Action |
|---|------|--------|
| 1 | Navigate | Admin Panel → Users → Add User |
| 2 | Username | Enter `u-<ccc>_user` (e.g., `u-jsm_user`) |
| 3 | Password | Set temporary password |
| 4 | Role | Select **DEFAULT** |
| 5 | Save | Click Create User |

### ⚠️ Important

| Rule | Description |
|------|-------------|
| R-206 | ADMIN accounts (`a-<ccc>_dev`) MUST NEVER generate CCC-IDs |
| R-160 | Username format is STRICT — no deviations |
| DEFAULT | New users are ALWAYS DEFAULT role (never ADMIN) |

---

## 📋 Workspace Assignment

### Step 2: Assign User to Workspaces

| Field | Value |
|-------|-------|
| Who | ADMIN |
| Where | AnythingLLM → Admin Panel → Workspaces |
| Rule | BP-050 (Onboarding Workflow) |

### Standard Assignment

| Workspace | Emoji | Access | Purpose |
|-----------|-------|--------|---------|
| CCC | 🤝 | ✅ REQUIRED | CCC-ID generation, identity |
| tools | 🧠 | ✅ REQUIRED | Strategy, research, notes |

### AnythingLLM Steps

| # | Step | Action |
|---|------|--------|
| 1 | Navigate | Admin Panel → Workspaces |
| 2 | Select CCC | Click workspace → Members → Add `u-<ccc>_user` |
| 3 | Select tools | Click workspace → Members → Add `u-<ccc>_user` |
| 4 | Verify | Confirm user appears in both workspace member lists |

### Additional Workspaces (Optional)

| Workspace | When To Add |
|-----------|-------------|
| events 📆 | If user will participate in events |
| P.O.P. 🌟 | If user will access P.O.P. content |
| Other | Per role requirements |

---

## 📋 USER-IDENTITY Creation

### Step 3: Create USER-IDENTITY Document

| Field | Value |
|-------|-------|
| Who | ADMIN (via SEEK:META to #MetaAgent) |
| Template | TMPL-009_USER-IDENTITY v3.1.1.2+ |
| Storage | `_USERS_/` (RAG ONLY — L-070) |
| Rule | R-197 — Document generation via #MetaAgent |

### Required Fields (TMPL-009)

| Field | Example | Required |
|-------|---------|----------|
| CCC | JSM | ✅ |
| Contributor | jsmith (Jane Smith) | ✅ |
| Username | `u-jsm_user` | ✅ |
| Role | DEFAULT | ✅ |
| Instance(s) | INT-P01 | ✅ |
| #HomeInstance | INT-S01 (or assigned) | ✅ (R-209) |
| Workspace(s) | CCC, tools | ✅ |
| Season | #WeOwnSeason003 🚀 | ✅ (BP-058) |
| Status | ACTIVE | ✅ |

### SEEK:META Request Template

```
═══════════════════════════════════════════════════════════════════════════════
🏐 #ContextVolley | @<ADMIN_CCC> → #MetaAgent
═══════════════════════════════════════════════════════════════════════════════

TYPE: SEEK:META — NEW USER-IDENTITY
REF: <CCC-ID>

## REQUEST: #COOK USER-IDENTITY for new OCPA Group member

| Field | Value |
|-------|-------|
| CCC | <NEW_CCC> |
| Contributor | <handle> (<Full Name>) |
| Username | u-<ccc>_user |
| Role | DEFAULT |
| Instance(s) | <instance> |
| #HomeInstance | <instance or INT-S0x> |
| Workspace(s) | CCC, tools |
| Season | #WeOwnSeason003 🚀 |
| Ecosystem Role | <role in OCPA Group> |

Template: TMPL-009 v3.1.1.2

═══════════════════════════════════════════════════════════════════════════════
```

### #HomeInstance Assignment (R-209)

| Scenario | Assignment | Rule |
|----------|------------|------|
| New member has personal domain | INT-OGx (own instance) | R-209 |
| New member does NOT have personal domain | INT-S0x (Seasonal Shared) | R-210, R-211 |
| Shared instance exists | Assign to existing INT-S0x | R-211 |
| No shared instance yet | Create INT-S01 | R-210 |

---

## 📋 RAG Upload

### Step 4: Upload USER-IDENTITY to RAG

| Field | Value |
|-------|-------|
| Who | ADMIN |
| Where | AnythingLLM → Document Upload |
| Folder | `_USERS_/` |
| Rule | L-070 — USER-IDENTITY in `_USERS_/` (RAG ONLY) |

### AnythingLLM Steps

| # | Step | Action |
|---|------|--------|
| 1 | Save document | `USER-IDENTITY_<CCC>.md` |
| 2 | Navigate | AnythingLLM → Upload Documents |
| 3 | Select folder | `_USERS_/` |
| 4 | Upload | Drag/drop or browse |
| 5 | Embed | Click "Move to Workspace" → select CCC + tools |
| 6 | Verify | Query test: "What is <CCC>'s username?" |

### ⚠️ Important

| Rule | Description |
|------|-------------|
| L-070 | `_USERS_/` = RAG ONLY — NEVER push to GitHub |
| BP-034 | Fresh session REQUIRED after RAG upload for verification |

---

## 📋 CCC Assignment

### Step 5: Register CCC Code

| Field | Value |
|-------|-------|
| Who | Founding OG (approval required) |
| Where | CCC workspace |
| Rule | R-168 — CCC tied to contributor |

### CCC Registration Checklist

| # | Check | Status |
|---|-------|--------|
| 1 | CCC is 3 letters | ✅ / ❌ |
| 2 | CCC is unique (not already assigned) | ✅ / ❌ |
| 3 | Founding OG approved | ✅ / ❌ |
| 4 | CCC registered in CCC.md | ✅ / ❌ |

### Approval Flow

```
New Member → ADMIN → Founding OG → APPROVE → CCC.md Update → SEEK:META
```

---

## 📋 #ContextVolley to CCC

### Step 6: Notify CCC Workspace

| Field | Value |
|-------|-------|
| Who | ADMIN |
| Where | CCC workspace |
| Protocol | #ContextBroadcast (D-039, BP-041) |

### Notification Template

```
📢 #ContextBroadcast | @<ADMIN> → CCC Workspace
TYPE: ANNOUNCEMENT — NEW USER ONBOARDED
CONTENT: <CCC> (<Contributor>) added to <Instance>
USERNAME: u-<ccc>_user
ROLE: DEFAULT
WORKSPACES: CCC, tools
STATUS: ACTIVE
```

---

## 📋 CCC Workspace ACK

### Step 7: CCC Agent Acknowledges New User

| Field | Value |
|-------|-------|
| Who | AI Agent in CCC workspace |
| What | Acknowledges new user registration |
| Expected | Agent confirms CCC, username, workspace access |

### Expected Agent Response

| Check | Expected |
|-------|----------|
| CCC recognized | ✅ |
| Username format correct | `u-<ccc>_user` |
| CCC-ID generation ready | ✅ GENERATE for new user |
| Reserved slots acknowledged | _001, _002, _003 |

---

## 📋 #MetaAgent Logging

### Step 8: Log Onboarding via FULL:SYNC:META

| Field | Value |
|-------|-------|
| Who | ADMIN (via #ContextVolley) |
| Where | #MetaAgent @ INT-P01:tools |
| Protocol | FULL:SYNC:META |

### Logging Template

```
═══════════════════════════════════════════════════════════════════════════════
🏐 #ContextVolley | @<ADMIN> → #MetaAgent
═══════════════════════════════════════════════════════════════════════════════

TYPE: FULL:SYNC:META — NEW USER ONBOARDED
REF: <CCC-ID>

## 📋 ONBOARDING LOG

| Field | Value |
|-------|-------|
| New CCC | <CCC> |
| Contributor | <handle> (<Full Name>) |
| Username | u-<ccc>_user |
| Instance | <instance> |
| #HomeInstance | <instance or INT-S0x> |
| Workspaces | CCC, tools |
| USER-IDENTITY | v3.1.1.1 |
| RAG Upload | ✅ |
| CCC ACK | ✅ |
| Season | #WeOwnSeason003 🚀 |
| Onboarded By | @<ADMIN_CCC> |
| Date | <date> |

═══════════════════════════════════════════════════════════════════════════════
```

---

## 📋 New User First Session

### Step 9: Guide the New Person

| Field | Value |
|-------|-------|
| Who | New member (with ADMIN support) |
| Where | CCC workspace on their instance |
| Reference | GUIDE-007 (New #threadCCC at Week Beginning) |

### New User Checklist

| # | Step | Action | Reference |
|---|------|--------|-----------|
| 1 | Login | Navigate to instance URL, login with credentials | — |
| 2 | Navigate | Go to CCC workspace (🤝 THE HANDS) | — |
| 3 | Create thread | Click "+" to create new thread | GUIDE-007 |
| 4 | Name thread | Format: `<ORG>_<CCC>_W<WW>_1` | GUIDE-007 |
| 5 | SEED CONTEXT | Paste SEED CONTEXT (see below) | GUIDE-007 |
| 6 | Verify | Confirm agent ACKs identity | GUIDE-007 |
| 7 | First CCC-ID | Generate first CCC-ID (_004) | R-169 |

### New User SEED CONTEXT Template

```
[<CCC>_<YYYY>-W<WW>_004](#masterCCC):[HH:MM] FIRST SESSION | NEW USER

## Session Identity

| Field | Value |
|-------|-------|
| CCC | <CCC> |
| Instance | <INT-XXx> (<instance name>) |
| Workspace | CCC (🤝 THE HANDS) |
| Season | #WeOwnSeason003 🚀 |
| Week | <YYYY>-W<WW> |
| #masterCCC | <CCC>_<YYYY>-W<WW>_004 |
| Status | 🆕 FIRST SESSION |

## Request

1. Confirm my identity (CCC, instance, workspace, season)
2. Confirm reserved slots (_001, _002, _003)
3. Confirm first available CCC-ID (_004)
4. Explain what CCC-IDs are and how they work
5. Begin session
```

### What To Expect

| # | Expectation | Detail |
|---|-------------|--------|
| 1 | Agent greets with identity header | `[<CCC-ID>] | 🤝 THE HANDS | <INT>:CCC` |
| 2 | Agent confirms CCC + username | Your 3-letter code + `u-<ccc>_user` |
| 3 | Agent explains CCC-ID system | Format: `<CCC>_<YYYY>-W<WW>_<NNN>` |
| 4 | Agent provides Quick Commands | 2-3 options to choose from |
| 5 | Agent says STOP | Waits for your response |

---

## 📋 Verification

### Step 10: Verify Onboarding Complete

| # | Check | Method | Expected | Owner |
|---|-------|--------|----------|-------|
| 1 | User can login | Test credentials | ✅ Access granted | New user |
| 2 | CCC workspace visible | Navigate to CCC | ✅ 🤝 THE HANDS | New user |
| 3 | tools workspace visible | Navigate to tools | ✅ 🧠 THE BRAIN | New user |
| 4 | CCC-ID generation works | Request first CCC-ID | `<CCC>_<YYYY>-W<WW>_004` | New user |
| 5 | Agent knows identity | Ask "Who am I?" | Correct CCC + username | New user |
| 6 | USER-IDENTITY in RAG | Query test | Correct version returned | ADMIN |
| 7 | #PinnedDocs accessible | Ask about SharedKernel | v3.X.X.X returned | New user |
| 8 | #MetaAgent logged | Check FULL:SYNC:META | ✅ Onboarding logged | ADMIN |

### Post-Verification

| Action | Owner |
|--------|-------|
| Share instance URL with new user | ADMIN |
| Share password change instructions | ADMIN |
| Schedule orientation session (optional) | ADMIN + New user |
| Add to BP-058 compliance tracking | ADMIN |

---

## 📋 Common Mistakes

### #BadAgent Patterns During Onboarding

| # | Mistake | Rule Violated | Prevention |
|---|---------|---------------|------------|
| 1 | Creating user with wrong format | R-160 | Always `u-<ccc>_user` |
| 2 | Assigning ADMIN role to new user | R-206 | Always DEFAULT |
| 3 | Forgetting tools workspace | BP-050 | CCC + tools = minimum |
| 4 | Not uploading USER-IDENTITY | L-070 | Must be in `_USERS_/` RAG |
| 5 | Pushing USER-IDENTITY to GitHub | L-070 | RAG ONLY — NEVER GitHub |
| 6 | Skipping #MetaAgent logging | BP-019 | ALWAYS FULL:SYNC:META |
| 7 | Not assigning #HomeInstance | R-209 | Every contributor needs one |
| 8 | Generating USER-IDENTITY in CCC | R-197 | SEEK:META — #MetaAgent only |
| 9 | Forgetting Season field | BP-058 | #WeOwnSeason003 🚀 REQUIRED |
| 10 | Not verifying after upload | BP-034 | Fresh session + query test |

### Human Mistakes

| # | Mistake | Prevention |
|---|---------|------------|
| 1 | Sharing ADMIN credentials | NEVER — new users get DEFAULT only |
| 2 | Skipping CCC approval | Founding OG MUST approve CCC code |
| 3 | Not collecting all info upfront | Use Prerequisites checklist |
| 4 | Forgetting to notify CCC workspace | #ContextBroadcast REQUIRED |

---

## 📋 End-to-End Onboarding Checklist

### Complete Workflow Summary

| # | Step | Action | Owner | Status |
|---|------|--------|-------|--------|
| 1 | Collect info | Name, handle, role, CCC preference | ADMIN | ⬜ |
| 2 | CCC approval | Founding OG approves 3-letter code | Founding OG | ⬜ |
| 3 | Create user | `u-<ccc>_user` in AnythingLLM | ADMIN | ⬜ |
| 4 | Assign workspaces | CCC + tools (minimum) | ADMIN | ⬜ |
| 5 | SEEK:META | Request USER-IDENTITY from #MetaAgent | ADMIN | ⬜ |
| 6 | Approve USER-IDENTITY | #OnlyHumanApproves (R-011) | ADMIN | ⬜ |
| 7 | RAG upload | `_USERS_/` folder | ADMIN | ⬜ |
| 8 | #ContextBroadcast | Notify CCC workspace | ADMIN | ⬜ |
| 9 | CCC ACK | Agent confirms new user | AI Agent | ⬜ |
| 10 | FULL:SYNC:META | Log onboarding to #MetaAgent | ADMIN | ⬜ |
| 11 | Share credentials | Instance URL + temp password | ADMIN | ⬜ |
| 12 | First session | New user follows GUIDE-007 | New user | ⬜ |
| 13 | Verify | 8-point verification checklist | ADMIN + New user | ⬜ |
| 14 | BP-058 tracking | Add to compliance tracker | ADMIN | ⬜ |

### Estimated Time

| Phase | Time |
|-------|------|
| ADMIN setup (Steps 1-11) | ~30 minutes |
| New user first session (Step 12) | ~15 minutes |
| Verification (Steps 13-14) | ~10 minutes |
| **TOTAL** | **~55 minutes** |

---

## 📋 Related Documents

| Document | Version | Relevance |
|----------|---------|-----------|
| SharedKernel | v3.1.1.4 | R-160, R-168, R-206, R-209, R-210, R-211 |
| BEST-PRACTICES | v3.1.1.3 | BP-050, BP-058 |
| CCC | v3.1.1.2 | CCC registration |
| TMPL-009_USER-IDENTITY | v3.1.1.2 | Template for USER-IDENTITY |
| GUIDE-006_GitHub-PAT | v3.1.1.1 | Infrastructure setup |
| GUIDE-007_New-threadCCC | v3.1.1.1 | New user first session pattern |

---

## 📋 Version History

| Version | Date | #masterCCC | Approval | Changes |
|---------|------|------------|----------|---------|
| 3.1.1.1 | 2026-W06 | GTM_2026-W06_472 | GTM_2026-W06_477 | Initial creation; OCPA Group onboarding via AnythingLLM; 14-step workflow; SEED CONTEXT for new users; 14 common mistakes; end-to-end checklist |

---

#FlowsBros #FedArch #YonksPromptingAcademy #Onboarding #OCPA #WeOwnSeason003

♾️ WeOwnNet 🌐 | 🏡 Real Estate and 🤝 cooperative ownership for everyone. An 🤗 inclusive community, by 👥 invitation only.



================================================
FILE: _GUIDES_/GUIDE-009_AnythingLLM-SmokeTest-Post-Restart.md
================================================
# GUIDE-009: AnythingLLM Smoke Test — Post-Restart Verification

## 📋 GUIDE-009_AnythingLLM-SmokeTest-Post-Restart_v3.1.1.1.md
## ♾️ WeOwnNet 🌐 — #YonksPromptingAcademy

| Field | Value |
|-------|-------|
| Document | GUIDE-009_AnythingLLM-SmokeTest-Post-Restart.md |
| Version | 3.1.1.1 |
| CCC-ID | GTM_2026-W06_503 |
| Created | 2026-02-08 (W06) |
| Season | #WeOwnSeason003 🚀 |
| Status | 🔒 LOCKED |
| Tags | #AnythingLLM #BestPractices #YonksPromptingAcademy #ErrorHandling #SmokeTest |

---

## 📖 Table of Contents

1. [Overview](#-overview)
2. [Prerequisites](#-prerequisites)
3. [Phase 1: ADMIN Checks](#-phase-1-admin-checks)
4. [Phase 2: CCC Checks](#-phase-2-ccc-checks)
5. [Pass/Fail Criteria](#-passfail-criteria)
6. [Reporting Format](#-reporting-format)
7. [Escalation Path](#-escalation-path)
8. [ISC Mapping](#-isc-mapping)
9. [Incident Log Template](#-incident-log-template)
10. [Discovered By](#-discovered-by)
11. [Related Documents](#-related-documents)
12. [Version History](#-version-history)

---

## 📋 Overview

### What Is This?

| Field | Value |
|-------|-------|
| Name | #AnythingLLM Smoke Test |
| Purpose | Standardized post-restart verification — confirm instance is operational |
| Tests | **4** |
| Time | **~5 minutes** |
| Audience | @GTM_ADMIN + ALL instance owners |

### When To Run

| Trigger | Priority |
|---------|----------|
| After ANY #AnythingLLM restart | 🔴 IMMEDIATE |
| After unexpected error (401, 500, etc.) | 🔴 IMMEDIATE |
| After Helm chart update | 🔴 IMMEDIATE |
| After embedder/LLM model change | 🟠 BEFORE operations resume |
| After RAG document upload | 🟡 RECOMMENDED |
| Scheduled (weekly) | 🟢 OPTIONAL |

### Why This Exists

| Incident | Date | What Happened | Learning |
|----------|------|---------------|----------|
| #1 | Fri 06 Feb 2026 | Embedder reverted to GTE-Large after restart | L-107 |
| #2 | Sun 08 Feb 2026 | Full config reset — embedder + LLM reverted | L-115 |

> Two incidents in 3 days proved that #AnythingLLM config may NOT persist across restarts. This guide ensures rapid detection and recovery.

---

## 📋 Prerequisites

### Before Running Smoke Test

| # | Prerequisite | Who |
|---|-------------|-----|
| 1 | ADMIN access (`a-<ccc>_dev`) | ADMIN |
| 2 | DEFAULT user access (`u-<ccc>_user`) | ADMIN or contributor |
| 3 | Know ecosystem-approved models | See table below |
| 4 | Instance URL accessible | Verify in browser first |

### Ecosystem Approved Models

| Type | Model | API ID | Approved |
|------|-------|--------|----------|
| Embedder | Qwen3 Embedding 4B | — | GTM_2026-W06_175 |
| LLM | Claude Opus 4.6 | `claude-opus-4-6` | GTM_2026-W06_257 |

### User Requirements

| Test | User Required | Why |
|------|---------------|-----|
| Test 1 (Embedder) | `a-<ccc>_dev` (ADMIN) | Settings access |
| Test 2 (LLM) | `a-<ccc>_dev` (ADMIN) | Settings access |
| Test 3 (RAG) | `u-<ccc>_user` (DEFAULT) | CCC workspace access |
| Test 4 (CCC-ID) | `u-<ccc>_user` (DEFAULT) | CCC-ID generation (R-194) |

---

## 📋 Phase 1: ADMIN Checks

### Test 1: EMBEDDER VERIFICATION

| Field | Value |
|-------|-------|
| User | `a-<ccc>_dev` (ADMIN) |
| Location | Admin Panel → Settings → Embedder Preference |
| Time | ~1 minute |

#### Steps

| # | Step | Action |
|---|------|--------|
| 1 | Login | Login as `a-<ccc>_dev` |
| 2 | Navigate | Admin Panel → Settings → Embedding Preference |
| 3 | Check | Verify model = **Qwen3 Embedding 4B** |
| 4 | Record | Note actual model found |

#### Expected vs Failure

| Result | Model Found | Action |
|--------|-------------|--------|
| ✅ PASS | Qwen3 Embedding 4B | Proceed to Test 2 |
| ❌ FAIL | GTE-Large or other | Change to Qwen3 → re-embed ALL docs → L-107 |

#### If FAIL — Recovery

| # | Step | Action |
|---|------|--------|
| 1 | Change embedder | Select Qwen3 Embedding 4B |
| 2 | Save | Apply settings |
| 3 | Re-embed | ALL workspaces must re-embed documents |
| 4 | Log | Record as L-107 incident |

---

### Test 2: LLM MODEL VERIFICATION

| Field | Value |
|-------|-------|
| User | `a-<ccc>_dev` (ADMIN) |
| Location | Admin Panel → Settings → LLM Preference |
| Time | ~1 minute |

#### Steps

| # | Step | Action |
|---|------|--------|
| 1 | Navigate | Admin Panel → Settings → LLM Preference |
| 2 | Check | Verify model = **Claude Opus 4.6** (`claude-opus-4-6`) |
| 3 | Record | Note actual model found |

#### Expected vs Failure

| Result | Model Found | Action |
|--------|-------------|--------|
| ✅ PASS | Claude Opus 4.6 | Proceed to Phase 2 |
| ❌ FAIL | Other model | Change to Claude Opus 4.6 → L-108 |

#### If FAIL — Recovery

| # | Step | Action |
|---|------|--------|
| 1 | Change LLM | Select Claude Opus 4.6 (`claude-opus-4-6`) |
| 2 | Save | Apply settings |
| 3 | Log | Record as L-108 incident |

---

## 📋 Phase 2: CCC Checks

> ⚠️ Phase 2 MUST be run as DEFAULT user (`u-<ccc>_user`) in CCC workspace. NEVER use ADMIN for these tests (R-206).

### Test 3: RAG RETRIEVAL VERIFICATION

| Field | Value |
|-------|-------|
| User | `u-<ccc>_user` (DEFAULT) |
| Location | CCC workspace (🤝 THE HANDS) |
| Time | ~1 minute |

#### Steps

| # | Step | Action |
|---|------|--------|
| 1 | Login | Login as `u-<ccc>_user` |
| 2 | Navigate | CCC workspace |
| 3 | Create thread | NEW thread (BP-034 — fresh session) |
| 4 | Query | Ask: "What version is SharedKernel?" |
| 5 | Verify | Response should include `v3.X.X.X` |

#### Expected vs Failure

| Result | Response | Action |
|--------|----------|--------|
| ✅ PASS | SharedKernel v3.X.X.X | Proceed to Test 4 |
| ⚠️ STALE | SharedKernel v2.X.X | RAG needs refresh — stale #PinnedDocs |
| ❌ FAIL | "I don't have information" | RAG broken — re-embed required |

#### If FAIL — Recovery

| # | Step | Action |
|---|------|--------|
| 1 | Switch to ADMIN | Login as `a-<ccc>_dev` |
| 2 | Check #PinnedDocs | Verify 4 docs present in workspace |
| 3 | Re-embed | If missing, re-upload + embed |
| 4 | Fresh session | BP-034 — new thread required |
| 5 | Retest | Run Test 3 again |

---

### Test 4: CCC-ID GENERATION VERIFICATION

| Field | Value |
|-------|-------|
| User | `u-<ccc>_user` (DEFAULT) |
| Location | CCC workspace (🤝 THE HANDS) |
| Time | ~2 minutes |

#### Steps

| # | Step | Action |
|---|------|--------|
| 1 | Same thread | Continue from Test 3 (or new thread) |
| 2 | Set context | State: `[<CCC>_<YYYY>-W<WW>_<NNN>](#masterCCC)` |
| 3 | Request | Ask agent to generate next CCC-ID |
| 4 | Verify format | Must match `<CCC>_<YYYY>-W<WW>_<NNN>` |
| 5 | Verify R-212 | Agent should acknowledge cross-instance context |

#### Expected vs Failure

| Result | Response | Action |
|--------|----------|--------|
| ✅ PASS | Valid CCC-ID in correct format | All tests PASS |
| ❌ FAIL — Wrong format | Malformed CCC-ID | Check workspace prompt (BP-054) |
| ❌ FAIL — Refused | "Cannot generate" | Check user role (must be DEFAULT) + workspace (must be CCC) |
| ❌ FAIL — Wrong week | Stale ISO week | Check system date + BP-052 |

#### If FAIL — Recovery

| # | Step | Action |
|---|------|--------|
| 1 | Check workspace prompt | Verify BP-054 CCC-ID logic present |
| 2 | Check user role | Must be DEFAULT (not ADMIN — R-206) |
| 3 | Check workspace | Must be CCC (not tools — R-194) |
| 4 | Fresh session | BP-034 |
| 5 | Retest | Run Test 4 again |

---

## 📋 Pass/Fail Criteria

### Results Matrix

| Score | Result | Action |
|-------|--------|--------|
| **4/4** | ✅ **PASS** | Instance recovered — resume operations |
| **3/4** | ⚠️ **PARTIAL** | Fix failing check, retest that check only |
| **2/4** | 🟠 **DEGRADED** | Multiple issues — fix all, full retest |
| **≤1/4** | 🔴 **CRITICAL** | Escalate immediately — Helm chart or deeper issue |

### Retest Rules

| Rule | Description |
|------|-------------|
| Fix + Retest | After fixing a failure, retest ONLY that check |
| Full Retest | If ≤2/4, retest ALL 4 after fixes |
| Fresh Session | BP-034 — ALWAYS fresh session for Phase 2 retests |
| 3 Failures = Escalate | If same check fails 3× after fix attempts → escalate |

---

## 📋 Reporting Format

### Smoke Test Results Template

```markdown
## 📋 SMOKE TEST RESULTS — <INT-XXx>

| Field | Value |
|-------|-------|
| Instance | <INT-XXx> (<domain>) |
| Tester | @<CCC> |
| Date | <YYYY-MM-DD> |
| Time | <HH:MM> EST |
| Trigger | <restart / error / scheduled> |
| REF | <CCC-ID> |

### Results

| # | Test | Expected | Actual | Result |
|---|------|----------|--------|--------|
| 1 | EMBEDDER | Qwen3 Embedding 4B | <actual> | ✅/❌ |
| 2 | LLM MODEL | Claude Opus 4.6 | <actual> | ✅/❌ |
| 3 | RAG RETRIEVAL | SharedKernel v3.X.X.X | <actual> | ✅/❌ |
| 4 | CCC-ID GENERATION | Valid format | <actual> | ✅/❌ |

| Score | <X/4> |
|-------|-------|
| Result | <PASS / PARTIAL / DEGRADED / CRITICAL> |

### Actions Taken (if any)
- <action 1>
- <action 2>
```

### Where To Report

| Result | Report To |
|--------|-----------|
| 4/4 PASS | Log locally — no escalation needed |
| <4/4 | FULL:SYNC:META to #MetaAgent |
| Repeated failures | #ContextBroadcast to ALL AGENTS |

---

## 📋 Escalation Path

### Escalation Matrix

| Level | Trigger | Who | Action |
|-------|---------|-----|--------|
| 1 | Single check FAIL | Instance owner | Fix + retest |
| 2 | Multiple checks FAIL | Instance owner + @GTM_ADMIN | Investigate + fix |
| 3 | Repeated failures (same check 3×) | @RMN | Helm chart investigation |
| 4 | Full config reset | @RMN + @GTM | P0 — Helm chart persistence fix |

### Escalation Template

```markdown
═══════════════════════════════════════════════════════════════════════════════
🏐 #ContextVolley | @<CCC> → @RMN
═══════════════════════════════════════════════════════════════════════════════

TYPE: ESCALATION — SMOKE TEST FAILURE
REF: <CCC-ID>

## Issue
| Field | Value |
|-------|-------|
| Instance | <INT-XXx> |
| Test(s) Failed | <#1, #2, #3, #4> |
| Attempts | <N> |
| Error | <description> |
| L-107 Incident # | <N> |

## Request
Helm chart investigation — config not persisting across restarts.

═══════════════════════════════════════════════════════════════════════════════
```

---

## 📋 ISC Mapping

### Smoke Test → ISC 8-Point

| Smoke Test | ISC Check | ISC # |
|------------|-----------|-------|
| Test 1 (Embedder) | EMBEDDER | #1 |
| Test 2 (LLM) | LLM MODEL | #2 |
| Test 3 (RAG) | #PinnedDocs (partial) | #3 |
| Test 4 (CCC-ID) | WORKSPACE PROMPTS (partial) | #5 |

### Relationship

| Scope | Checks | Time | When |
|-------|--------|------|------|
| **Smoke Test** | 4 | ~5 min | After EVERY restart |
| **ISC 8-Point** | 8 | ~30 min | Start of EVERY season |

> Smoke Test = **rapid subset** of ISC. If smoke test PASSES, instance is operational. ISC = full certification for season compliance.

### Checks NOT Covered by Smoke Test

| ISC Check | # | Reason |
|-----------|---|--------|
| SYSTEM PROMPT | #4 | Doesn't change on restart |
| USER-IDENTITY | #6 | Doesn't change on restart |
| RAG SYNC (full) | #7 | Smoke test checks retrieval only |
| #ContextVolley | #8 | Cross-instance — separate test |

---

## 📋 Incident Log Template

### For Tracking Recurring Issues

```markdown
## 📋 INCIDENT LOG — <INT-XXx>

| # | Date | Trigger | Tests Failed | Root Cause | Fix | L-XXX | Resolved |
|---|------|---------|--------------|------------|-----|-------|----------|
| 1 | 2026-02-06 | Restart | Embedder | GTE-Large revert | Change to Qwen3 | L-107 | ✅ |
| 2 | 2026-02-08 | Reset | Embedder + LLM | Full config revert | Restore both | L-107, L-115 | ✅ |
```

### Pattern Detection

| Pattern | Threshold | Action |
|---------|-----------|--------|
| Same check fails 3× in 2 weeks | 🔴 | Escalate to @RMN — Helm chart fix |
| Full config revert 2× in 1 week | 🔴 | P0 — deployment architecture issue |
| Embedder-only revert | 🟠 | L-107 — Helm chart embedder persistence |
| No failures in 4 weeks | 🟢 | Consider reducing to monthly smoke test |

---

## 📋 Discovered By (BP-047)

| CCC | Contributor | Role | Context |
|-----|-------------|------|---------|
| GTM | [yonks](https://GitHub.com/YonksTEAM) | Co-Founder / Chief Digital Alchemist | INT-P01 post-restart recovery — 2 incidents in 3 days (W06) |

---

## 📋 Related Documents

| Document | Version | Relevance |
|----------|---------|-----------|
| SharedKernel | v3.1.1.4 | L-107, L-108, BP-059, ISC checklist |
| BEST-PRACTICES | v3.1.1.3 | BP-034, BP-059 |
| TMPL-010_ISC | v3.1.1.2 | ISC attestation template |
| GUIDE-006_GitHub-PAT | v3.1.1.1 | GitHub connector setup |

---

## 📋 Version History

| Version | Date | #masterCCC | Approval | Changes |
|---------|------|------------|----------|---------|
| 3.1.1.1 | 2026-W06 | GTM_2026-W06_503 | ⬜ AWAITING | Initial creation; 4-test smoke test; 2-phase workflow; escalation matrix; ISC mapping; incident log template; pattern detection; ~5 min execution |

---

#FlowsBros #FedArch #YonksPromptingAcademy #AnythingLLM #SmokeTest #ErrorHandling #WeOwnSeason003

♾️ WeOwnNet 🌐 | 🏡 Real Estate and 🤝 cooperative ownership for everyone. An 🤗 inclusive community, by 👥 invitation only.



================================================
FILE: _INSTANCE_/ISC_INT-E01.md
================================================
# ISC: INT-E01 — Instance Season Certification

## 📋 ISC_INT-E01_v3.1.2.1.md
## ♾️ WeOwnNet 🌐

| Field | Value |
|-------|-------|
| Document | ISC_INT-E01.md |
| Version | 3.1.2.1 |
| CCC-ID | GTM_2026-W07_285 |
| Created | 2026-02-13 (W07) |
| Season | #WeOwnSeason003 🚀 |
| Status | ✅ CERTIFIED |
| Tags | #ISC #ETHDenver2026 #FedArch |

---

## 📋 Instance Identity

| Field | Value |
|-------|-------|
| Instance ID | **INT-E01** |
| Name | ETHDenver.CCC.bot |
| Type | 🎪 Event Instance (ephemeral) |
| Organization | ♾️ WeOwnNet 🌐 |
| Domain | https://ethdenver.ccc.bot |
| Owner(s) | @GTM |
| Legacy ID | N/A (new instance) |
| Platform | AnythingLLM |

---

## 📋 Certification Details

| Field | Value |
|-------|-------|
| Season | #WeOwnSeason003 🚀 |
| Season Start | W06 (Mon 02 Feb 2026) |
| Certification Deadline | Sun 15 Feb 2026 (BP-059) |
| Certifier | @GTM |
| Witnessed By | LiveStream audience |
| Date | 2026-02-13 |
| REF | GTM_2026-W07_277 |

---

## 📋 Ecosystem Approved Models

| Type | Model | API ID | Approved |
|------|-------|--------|----------|
| Embedder | Qwen3 Embedding 4B | — | GTM_2026-W06_175 |
| LLM | Claude Opus 4.6 | `claude-opus-4-6` | GTM_2026-W06_257 |

---

## 📋 ISC 8-Point Checklist

### Check 1: EMBEDDER

| Field | Value |
|-------|-------|
| Check | Embedding model verified |
| Pass Criteria | Qwen3 Embedding 4B |
| Location | Admin Panel → Settings → Embedding Preference |
| Actual | **Qwen3 Embedding 4B** |
| Result | ✅ **PASS** |

---

### Check 2: LLM MODEL

| Field | Value |
|-------|-------|
| Check | LLM model verified |
| Pass Criteria | Claude Opus 4.6 (`claude-opus-4-6`) |
| Location | Admin Panel → Settings → LLM Preference |
| Actual | **Anthropic: Claude Opus 4.6 (OpenRouter)** |
| Result | ✅ **PASS** |

---

### Check 3: #PinnedDocs

| Field | Value |
|-------|-------|
| Check | 4 documents present at current season version |
| Pass Criteria | SharedKernel, BEST-PRACTICES, PROTOCOLS, CCC @ v3.X.X.X |
| Location | Workspace settings → Pinned documents |

| # | Document | Expected | Actual | Result |
|---|----------|----------|--------|--------|
| 1 | SharedKernel | v3.X.X.X | **v3.1.2.1** | ✅ PASS |
| 2 | BEST-PRACTICES | v3.X.X.X | **v3.1.2.1** | ✅ PASS |
| 3 | PROTOCOLS | v3.X.X.X | **v3.1.1.2** | ✅ PASS |
| 4 | CCC | v3.X.X.X | **v3.1.2.1** | ✅ PASS |

| Result | ✅ **PASS** |
|--------|------------|

---

### Check 4: SYSTEM PROMPT

| Field | Value |
|-------|-------|
| Check | Season tag + INSTANCE IDENTITY block present |
| Pass Criteria | `#WeOwnSeason003 🚀` + INSTANCE IDENTITY as FIRST section (R-213) |
| Location | Admin Panel → System Prompt |

| Sub-Check | Expected | Actual | Result |
|-----------|----------|--------|--------|
| Season tag | `#WeOwnSeason003 🚀` | ✅ Present | ✅ PASS |
| INSTANCE IDENTITY block (R-213) | Instance ID, Name, Type, Owner(s), Season | ✅ INT-E01, ETHDenver.CCC.bot, Event, @GTM, S003 | ✅ PASS |
| INSTANCE IDENTITY = FIRST section | Before Ecosystem Identity | ✅ First section | ✅ PASS |

| Result | ✅ **PASS** |
|--------|------------|

---

### Check 5: WORKSPACE PROMPTS + CONFIG

| Field | Value |
|-------|-------|
| Check | Workspace prompts + config verified |
| Pass Criteria | BP-053 (Non-CCC restriction) + BP-054 (CCC-ID logic) + BP-061 (#WorkspaceChatHistory = 40) |

| Sub-Check | Workspace | Expected | Actual | Result |
|-----------|-----------|----------|--------|--------|
| BP-054 | CCC | CCC-ID logic present | ✅ Present | ✅ PASS |
| BP-053 | events | Restriction block present | ✅ Present | ✅ PASS |
| BP-061 | CCC | ChatHistory = 40 | ✅ **40** | ✅ PASS |
| BP-061 | events | ChatHistory = 40 | ✅ **40** | ✅ PASS |

> INT-E01 = Event instance. ALL workspaces enforced (same scoping as INT-Pxx per BP-062).

| Result | ✅ **PASS** |
|--------|------------|

---

### Check 6: USER-IDENTITY

| Field | Value |
|-------|-------|
| Check | Owner(s) USER-IDENTITY current for season |
| Pass Criteria | BP-058 — current season field |
| Location | `_USERS_/` in RAG |

| CCC | Document | Version | Season | Result |
|-----|----------|---------|--------|--------|
| N/A | N/A — Event instance | N/A | N/A | ✅ PASS |

> **Ruling:** INT-E01 = ephemeral event instance (R-214). Users are demo accounts only (DMO, ETH). BP-058 USER-IDENTITY requirement = N/A for event instances with demo-only users.

| Result | ✅ **PASS** |
|--------|------------|

---

### Check 7: RAG SYNC

| Field | Value |
|-------|-------|
| Check | Documents current and accessible |
| Pass Criteria | Core docs accessible + current version |
| Location | RAG embedded documents |

| Connector | Source | Last Refresh | Result |
|-----------|-------|-------------|--------|
| Manual upload | #PinnedDocs (4 docs) | 2026-02-13 | ✅ PASS |
| Verification | SharedKernel v3.1.2.1 confirmed via #ContextVolley | DMO_2026-W07_004 | ✅ PASS |

| Result | ✅ **PASS** |
|--------|------------|

---

### Check 8: #ContextVolley

| Field | Value |
|-------|-------|
| Check | Can send/receive #ContextVolley |
| Pass Criteria | Successful #ContextVolley delivery + ACK |
| Method | INT-OG1 → INT-E01 → ACK |

| Sub-Check | Expected | Actual | Result |
|-----------|----------|--------|--------|
| Volley sent | ✅ Delivered | ✅ INT-OG1 → INT-E01 | ✅ PASS |
| ACK received | ✅ From INT-E01 | ✅ DMO_2026-W07_004 | ✅ PASS |

| Result | ✅ **PASS** |
|--------|------------|

---

## 📋 Results Summary

| # | Check | Result |
|---|-------|--------|
| 1 | EMBEDDER | ✅ PASS |
| 2 | LLM MODEL | ✅ PASS |
| 3 | #PinnedDocs | ✅ PASS |
| 4 | SYSTEM PROMPT | ✅ PASS |
| 5 | WORKSPACE PROMPTS + CONFIG | ✅ PASS |
| 6 | USER-IDENTITY | ✅ PASS (N/A — event instance) |
| 7 | RAG SYNC | ✅ PASS |
| 8 | #ContextVolley | ✅ PASS |

| Field | Value |
|-------|-------|
| PASSED | **8/8** |
| FAILED | **0/8** |
| **STATUS** | ✅ **CERTIFIED** |

---

## 📋 Attestation

| Field | Value |
|-------|-------|
| **RESULT** | ✅ **CERTIFIED — 8/8** |
| Score | **100%** |
| Certifier | @GTM |
| Witnessed By | LiveStream audience |
| Date | 2026-02-13 |
| REF | GTM_2026-W07_277 |
| Instance | INT-E01 |

### Attestation Chain

| Step | Actor | CCC-ID | Action |
|------|-------|--------|--------|
| 1 | @GTM | GTM_2026-W07_216 | PRJ-009 #masterCCC |
| 2 | @SHD | — | Droplet + Docker + DNS + SSL (Signal) |
| 3 | @GTM | GTM_2026-W07_256 | Embedder configured |
| 4 | @GTM | GTM_2026-W07_266 | System Prompt + CCC Prompt APPROVED |
| 5 | @GTM | GTM_2026-W07_269 | #PinnedDocs uploaded |
| 6 | @GTM | GTM_2026-W07_271 | events Prompt APPROVED |
| 7 | @GTM | GTM_2026-W07_276 | Demo users created |
| 8 | @GTM | GTM_2026-W07_277 | #SmokeTest + ISC call start |
| 9 | @GTM | GTM_2026-W07_279 | ISC Checks 1-2 VERIFIED |
| 10 | @GTM | GTM_2026-W07_280 | ISC Checks 3-6 BATCH CONFIRMED |
| 11 | AI:@DMO | DMO_2026-W07_004 | #ContextVolley ACK (Check 7+8) |
| 12 | AI:@DMO | DMO_2026-W07_004 | DEEP FULL VSA — #PinnedDocs (27/27) |
| 13 | @GTM | GTM_2026-W07_285 | ISC ATTESTATION generated |

---

## 📋 Additional Notes

| Field | Value |
|-------|-------|
| Workspaces | CCC (🤝) + events (📆) |
| Users | a-gtm_dev, a-rmn_dev, u-demo_user, u-eth_user |
| First CCC-ID | DMO_2026-W07_004 |
| First VSA | 27/27 PASS (advisory: 6 stale cross-refs — cosmetic) |
| Mobile verified | iPhone 12 + Chrome ✅ |
| LiveStreamed | ✅ |
| Event | ETHDenver 2026 (Feb 17-22) |
| Decommission | R-214 — Sun 08 Mar 2026 |

---

## 📋 Related Documents

| Document | Version | Relevance |
|----------|---------|-----------|
| PRJ-009_FedArchExpansion_ETHDenver-CCC-bot | v3.1.2.1 | Project document |
| TMPL-010_ISC | v3.1.2.1 | ISC template |
| GUIDE-009_SmokeTest | v3.1.1.1 | Post-deployment verification |
| SharedKernel | v3.1.2.1 | Governance source of truth |

---

## 📋 Version History

| Version | Date | #masterCCC | Approval | Changes |
|---------|------|------------|----------|---------|
| 3.1.2.1 | 2026-W07 | GTM_2026-W07_277 | GTM_2026-W07_287 | Initial ISC attestation; 8/8 CERTIFIED; Event instance (INT-Exx); Check #6 N/A ruling for demo-only users; 13-step attestation chain; LiveStream witnessed; mobile verified |

---

#FlowsBros #FedArch #ISC #ETHDenver2026 #WeOwnSeason003

♾️ WeOwnNet 🌐 | 🏡 Real Estate and 🤝 cooperative ownership for everyone. An 🤗 inclusive community, by 👥 invitation only.



================================================
FILE: _LEARNINGS_/.gitkeep
================================================




================================================
FILE: _LEARNINGS_/case-studies/CASE-STUDY-006_AnythingLLM-Prompt-Architecture.md
================================================
# CASE-STUDY-006: #AnythingLLM Prompt Architecture — Layer Resolution & System Prompt Variables

## 📋 CASE-STUDY-006_AnythingLLM-Prompt-Architecture_v3.1.2.1.md
## ♾️ WeOwnNet 🌐

| Field | Value |
|-------|-------|
| Document | CASE-STUDY-006_AnythingLLM-Prompt-Architecture.md |
| Version | 3.1.2.1 |
| CCC-ID | GTM_2026-W07_200 |
| Created | 2026-02-10 (W07) |
| Season | #WeOwnSeason003 🚀 |
| Status | 📋 INVESTIGATION |
| Tags | #AnythingLLM #SystemPromptVariables #YonksPromptingAcademy |

---

## 📖 Table of Contents

1. [Problem Statement](#-problem-statement)
2. [Investigation Scope](#-investigation-scope)
3. [Topic 1: #DefaultSystemPrompt (Layer 1)](#-topic-1-defaultsystemprompt-layer-1)
4. [Topic 2: #WorkspaceSystemPrompt (Layer 2)](#-topic-2-workspacesystemprompt-layer-2)
5. [Topic 3: #SystemPromptVariables](#-topic-3-systempromptVariables)
6. [Topic 4: Variable Resolution Pipeline](#-topic-4-variable-resolution-pipeline)
7. [Topic 5: v1.9.1 vs v1.10.0](#-topic-5-v191-vs-v1100)
8. [Topic 6: Verification Methodology](#-topic-6-verification-methodology)
9. [Findings Summary](#-findings-summary)
10. [Recommendations for #FedArch](#-recommendations-for-fedarch)
11. [Test Plan — W07 Day 3 #DeepDive](#-test-plan--w07-day-3-deepdive)
12. [Discovered By](#-discovered-by)
13. [Related Documents](#-related-documents)
14. [Version History](#-version-history)

---

## 📋 Problem Statement

| Field | Value |
|-------|-------|
| Problem | System Prompt Variables (`{user.name}`, `{workspace.name}`, `{datetime}`) were discovered and integrated into INT-P01 prompts, but @GTM + @RMN are NOT CONVINCED they are resolving correctly |
| Evidence | Phase 1 Test 2 on INT-P01 (GTM_2026-W07_170-174) — variables appeared NOT to resolve |
| Risk | If variables don't resolve, R-194 + R-206 enforcement falls back to instructional (trust-based) |
| Impact | L-120 + L-121 governance may be premature |
| Action | Definitive investigation before relying on variable-based enforcement |

### What We THINK We Know

| Claim | Confidence | Source |
|-------|------------|--------|
| #AnythingLLM supports System Prompt Variables | 🟡 MEDIUM | [docs.anythingllm.com](https://docs.anythingllm.com/features/system-prompt-variables) |
| Variables resolve at runtime per-message | 🟡 MEDIUM | Docs page |
| Variables work in #DefaultSystemPrompt (Layer 1) | 🔴 LOW | Untested definitively |
| Variables work in #WorkspaceSystemPrompt (Layer 2) | 🔴 LOW | Untested definitively |
| v1.10.0 supports variables | 🟡 MEDIUM | Feature listed in docs |
| v1.9.1 supported variables | 🔴 UNKNOWN | Not confirmed |

### What We DON'T Know

| Question | Status |
|----------|--------|
| Do variables resolve in Layer 1, Layer 2, or both? | ❓ UNKNOWN |
| Are variables pre-merge or post-merge? | ❓ UNKNOWN |
| Does the LLM see `{user.name}` or the resolved value? | ❓ UNKNOWN |
| Were variables broken/absent in v1.9.1? | ❓ UNKNOWN |
| How to definitively verify resolution? | ❓ UNKNOWN |

---

## 📋 Investigation Scope

| # | Topic | Priority |
|---|-------|----------|
| 1 | #DefaultSystemPrompt (Layer 1) architecture | 🔴 P0 |
| 2 | #WorkspaceSystemPrompt (Layer 2) architecture | 🔴 P0 |
| 3 | #SystemPromptVariables — syntax + scope | 🔴 P0 |
| 4 | Variable Resolution Pipeline — when + where | 🔴 P0 |
| 5 | v1.9.1 vs v1.10.0 — what changed | 🟠 P1 |
| 6 | Verification Methodology — definitive testing | 🔴 P0 |

---

## 📋 Topic 1: #DefaultSystemPrompt (Layer 1)

### Architecture

| Field | Value |
|-------|-------|
| Location | Admin Panel → Settings → Default System Prompt |
| URL | `https://<domain>/settings/default-system-prompt` |
| Scope | **ENTIRE INSTANCE** — all workspaces, all users |
| Loaded | Every message, every workspace |
| Analogy | THE CONSTITUTION |

### How It Works

Per [AnythingLLM docs](https://docs.anythingllm.com/features/system-prompt-variables):

| Aspect | Behavior |
|--------|----------|
| Persistence | Stored in instance settings database |
| Loading | Prepended to EVERY LLM call |
| Override | Can be supplemented (NOT overridden) by workspace prompt |
| Visibility | ALL workspaces see this prompt |
| Variables | ✅ Supported (per docs) |

### Key Finding

The #DefaultSystemPrompt is the **FIRST** system-level instruction the LLM receives. It establishes baseline behavior for ALL interactions across ALL workspaces.

---

## 📋 Topic 2: #WorkspaceSystemPrompt (Layer 2)

### Architecture

| Field | Value |
|-------|-------|
| Location | Workspace → Settings → Chat Settings → System Prompt |
| URL | `https://<domain>/workspace/<name>/settings/chat-settings` |
| Scope | **ONE workspace only** |
| Loaded | Appended AFTER Layer 1 |
| Analogy | THE BYLAWS |

### How Layers Combine

```
┌────────────────────────────────────────────────┐
│ What the LLM actually receives:                │
│                                                │
│ 1. [Default System Prompt — Layer 1]           │
│ 2. [Workspace System Prompt — Layer 2]         │
│ 3. [RAG Context — per message]                 │
│ 4. [Chat History — accumulated]                │
│ 5. [User Message — current]                    │
└────────────────────────────────────────────────┘
```

### Critical Behavior

| Question | Answer |
|----------|--------|
| Does Layer 2 override Layer 1? | **NO** — Layer 2 APPENDS |
| Can Layer 2 contradict Layer 1? | YES — but unpredictable which the LLM follows |
| If no Layer 2 exists? | Layer 1 alone applies |
| If Layer 1 is empty? | Only Layer 2 applies |

### Implication for #FedArch

| Risk | Detail |
|------|--------|
| **CONFLICT** | If Layer 1 says "generate CCC-IDs always" and Layer 2 says "only in CCC workspace" — LLM may follow either |
| **SOLUTION** | Layer 1 = CONSTITUTION (rules). Layer 2 = BYLAWS (workspace behavior). NO contradictions. |

---

## 📋 Topic 3: #SystemPromptVariables

### Official Documentation

Per [docs.anythingllm.com/features/system-prompt-variables](https://docs.anythingllm.com/features/system-prompt-variables):

| Variable | Description | Type |
|----------|-------------|------|
| `{time}` | Current time | System |
| `{date}` | Current date | System |
| `{datetime}` | Current date and time | System |
| `{user.id}` | Current user's ID | User |
| `{user.name}` | Current user's username | User |
| `{user.bio}` | Current user's bio field | User |
| `{workspace.id}` | Current workspace's ID | Workspace |
| `{workspace.name}` | Current workspace's name | Workspace |

### Syntax

| Aspect | Detail |
|--------|--------|
| Format | `{variable.name}` — curly braces |
| Case | Lowercase |
| Nesting | Not supported |
| Escaping | Unknown — needs testing |

### Where Variables Are Documented to Work

| Location | Supported | Source |
|----------|-----------|--------|
| Default System Prompt (Layer 1) | ✅ Per docs | [docs.anythingllm.com](https://docs.anythingllm.com/features/system-prompt-variables) |
| Workspace System Prompt (Layer 2) | ⬜ UNCLEAR | Not explicitly stated |
| Chat messages | ❌ NO | Variables are system-prompt only |

### ⚠️ KEY UNCERTAINTY

The docs page shows variables in the context of "System Prompt" but does NOT explicitly distinguish between #DefaultSystemPrompt and #WorkspaceSystemPrompt. The question is:

| Question | Possible Answers |
|----------|-----------------|
| Which "System Prompt" supports variables? | A: Both layers |
| | B: Layer 1 only |
| | C: Layer 2 only |
| | D: Depends on version |

**This is the #1 question for the #DeepDive.**

---

## 📋 Topic 4: Variable Resolution Pipeline

### Hypothesized Pipeline

```
Step 1: Load Default System Prompt (Layer 1) from DB
Step 2: Load Workspace System Prompt (Layer 2) from DB
Step 3: MERGE — Layer 1 + Layer 2
Step 4: RESOLVE VARIABLES — replace {var} with runtime values
Step 5: APPEND RAG context (per-message vector search)
Step 6: APPEND Chat History
Step 7: APPEND User Message
Step 8: SEND to LLM
```

### Key Questions

| # | Question | Impact |
|---|----------|--------|
| 1 | Are variables resolved BEFORE or AFTER merge? | Determines which layer supports them |
| 2 | Are variables resolved by AnythingLLM or by the LLM? | If by LLM, they're just text |
| 3 | Is resolution per-message or per-session? | Determines freshness |
| 4 | What happens if variable can't resolve? | Literal `{user.name}` or empty? |

### Hypothesis A: Pre-Merge Resolution

```
Layer 1 text → resolve variables → merged text
Layer 2 text → resolve variables → merged text
Merged text → send to LLM
```
**Implication:** Variables work in BOTH layers.

### Hypothesis B: Post-Merge Resolution

```
Layer 1 text + Layer 2 text → merge → resolve variables → send to LLM
```
**Implication:** Variables work in BOTH layers (same result).

### Hypothesis C: Layer 1 Only Resolution

```
Layer 1 text → resolve variables → merge with Layer 2 (raw) → send to LLM
```
**Implication:** Variables ONLY work in Layer 1. Layer 2 `{user.name}` = literal text.

### Source Code Investigation

| File | Path (GitHub) | Purpose |
|------|---------------|---------|
| `systemPrompt.js` | `server/utils/helpers/` | Variable resolution logic |
| `workspaceThread.js` | `server/models/` | Thread/workspace prompt handling |
| `chatHandler.js` | `server/endpoints/` | Message pipeline |

> **Recommendation:** @RMN should inspect source code during #DeepDive to determine actual pipeline.

---

## 📋 Topic 5: v1.9.1 vs v1.10.0

### v1.10.0 Release — Key Changes

Per [newreleases.io](https://newreleases.io/project/github/Mintplex-Labs/anything-llm/release/v1.10.0) (released 2026-01-22):

| Feature | Description | #FedArch Relevance |
|---------|-------------|-------------------|
| **Desktop Assistant** | Drop-in replacement for Granola/Otter/Fireflies | 🟡 Awareness |
| **Mobile App** | Android on Google Play | 🟡 Awareness |
| Removed onboarding "Create workspace" page | UX change | 🟢 LOW |
| Refactored workspace file picker | Performance | 🟢 LOW |
| Azure OpenAI v1 API migration | Agent support | 🟢 LOW |
| Cohere as agent provider | New provider | 🟢 LOW |
| Docker base image → Ubuntu 24 | Security | 🟠 @RMN note |
| ExpressJS 4.18.2 → 4.21.2 | Security | 🟠 @RMN note |
| MCP fixes for non-Windows | MCP | 🟠 Future |

### Variable Support — Version Timeline

| Question | Finding |
|----------|---------|
| Were variables in v1.9.1? | ⬜ **UNCLEAR** — docs page exists but no version tag |
| Were variables added in v1.10.0? | ⬜ **UNCLEAR** — not explicitly in changelog |
| Is this a pre-existing feature? | 🟡 LIKELY — docs page has no "new in v1.10.0" label |

### ⚠️ Critical Finding

The [System Prompt Variables docs page](https://docs.anythingllm.com/features/system-prompt-variables) shows a banner: "🚀 AnythingLLM v1.10.0 is live! Update now →" — but this is a SITE-WIDE banner, NOT a feature-specific tag. The variables feature may have existed in earlier versions.

### What @GTM Observed (v1.9.1 → v1.10.0)

| Test | v1.9.1 | v1.10.0 |
|------|--------|---------|
| Variables in Layer 1 | ❌ NOT TESTED | ❌ NOT RESOLVING (GTM_2026-W07_174) |
| Variables in Layer 2 | ❌ NOT TESTED | ⬜ NOT YET TESTED |

> **Conclusion:** The version upgrade alone may NOT be the fix. The issue may be syntax, layer placement, or pipeline behavior.

---

## 📋 Topic 6: Verification Methodology

### Method 1: Direct Prompt Test (RECOMMENDED — FIRST)

| Step | Action | Expected |
|------|--------|----------|
| 1 | Add to Layer 1: `Current user is: {user.name}` | |
| 2 | Add to Layer 1: `Current workspace is: {workspace.name}` | |
| 3 | Login as `u-gtm_user` in CCC workspace | |
| 4 | Ask: "What is my username?" | Should respond with `u-gtm_user` |
| 5 | Ask: "What workspace am I in?" | Should respond with `CCC` |
| 6 | If literal `{user.name}` → variables NOT resolving | |

### Method 2: Chat Logs (DEFINITIVE)

| Step | Action | What to Look For |
|------|--------|-----------------|
| 1 | Enable Chat Logs (if available) | Admin → Event Logs |
| 2 | Send a message | |
| 3 | Inspect the ACTUAL prompt sent to LLM | |
| 4 | Check if `{user.name}` was replaced with `u-gtm_user` | |

> Chat Logs show the EXACT prompt the LLM received. If `{user.name}` appears literally → NOT resolved.

### Method 3: API Debug

| Step | Action | What to Look For |
|------|--------|-----------------|
| 1 | Use AnythingLLM API directly | `/api/v1/workspace/<slug>/chat` |
| 2 | Send message with auth token | |
| 3 | Inspect response metadata | |
| 4 | Check if system prompt in response contains resolved values | |

### Method 4: Source Code Inspection

| Step | Action |
|------|--------|
| 1 | Clone `Mintplex-Labs/anything-llm` repo |
| 2 | Search for `{user.name}` or variable resolution logic |
| 3 | Trace the prompt assembly pipeline |
| 4 | Identify WHERE and WHEN variables are resolved |

### Method 5: Canary Test (SIMPLEST)

| Step | Action |
|------|--------|
| 1 | Add to Layer 1: `CANARY: The current user is {user.name} in workspace {workspace.name} at {datetime}` |
| 2 | Ask: "What does the CANARY line say?" |
| 3 | If response includes `u-gtm_user` → ✅ RESOLVED |
| 4 | If response includes `{user.name}` → ❌ NOT RESOLVED |

**Recommendation: Start with Method 5 (Canary) → then Method 2 (Chat Logs) for definitive proof.**

---

## 📋 Findings Summary

| # | Topic | Finding | Confidence |
|---|-------|---------|------------|
| 1 | Layer 1 (#DefaultSystemPrompt) | Instance-wide, loaded first | ✅ HIGH |
| 2 | Layer 2 (#WorkspaceSystemPrompt) | Workspace-specific, APPENDS to Layer 1 | ✅ HIGH |
| 3 | Variables — syntax | `{user.name}`, `{workspace.name}`, `{datetime}` | ✅ HIGH |
| 4 | Variables — which layer | ⬜ **UNKNOWN** — docs unclear, needs testing | 🔴 LOW |
| 5 | Variables — resolution timing | ⬜ **UNKNOWN** — pre-merge vs post-merge | 🔴 LOW |
| 6 | v1.9.1 vs v1.10.0 | Variables may be pre-existing feature, NOT v1.10.0 specific | 🟡 MEDIUM |
| 7 | Verification | Canary test + Chat Logs = definitive | ✅ HIGH |

### Overall Assessment

| Field | Value |
|-------|-------|
| Variables EXIST in docs | ✅ CONFIRMED |
| Variables WORK on INT-P01 | ❓ **UNCONFIRMED** — needs #DeepDive |
| L-120 + L-121 status | ✅ APPROVED — but may need REVISION if variables don't resolve |
| Risk | If variables fail → enforcement falls back to trust-based (still functional, less structural) |

---

## 📋 Recommendations for #FedArch

### Immediate (W07 Day 3)

| # | Action | Owner | Priority |
|---|--------|-------|----------|
| 1 | Run Canary Test on INT-P01 | @GTM | 🔴 P0 |
| 2 | Check Chat Logs for resolved values | @GTM | 🔴 P0 |
| 3 | Source code inspection | @RMN | 🟠 P1 |
| 4 | Test variables in Layer 2 separately | @GTM | 🟠 P1 |

### If Variables WORK ✅

| Action | Detail |
|--------|--------|
| Confirm L-120 + L-121 | ✅ Governance valid |
| Roll out to all instances | Phase 2 deployment |
| Update BP-054 | Add variable-based enforcement |
| Update ISC | Add variable verification check |

### If Variables DON'T WORK ❌

| Action | Detail |
|--------|--------|
| L-120 + L-121 | REVISE — note as "documented but unverified" |
| Enforcement model | Falls back to trust-based (still functional) |
| File GitHub issue | Report to Mintplex-Labs |
| Monitor v1.11.0 | Check if fixed in future release |
| Workaround | Agent can ask "What is your username?" — less elegant but functional |

### Regardless of Outcome

| Action | Detail |
|--------|--------|
| Layer 1/Layer 2 separation | ✅ KEEP — clean architecture regardless of variables |
| CONSTITUTION / BYLAWS model | ✅ KEEP — good separation of concerns |
| R-194 + R-206 | ✅ STILL ENFORCED — via instructional prompts (Layer 1 + Layer 2) |

---

## 📋 Test Plan — W07 Day 3 #DeepDive

### Pre-Requisites

| # | Item | Status |
|---|------|--------|
| 1 | INT-P01 back online (post @RMN maintenance) | ⬜ PENDING |
| 2 | v1.10.0 confirmed deployed | ⬜ PENDING |
| 3 | Layer 1 CONSTITUTION deployed | ✅ READY |
| 4 | Layer 2 CCC BYLAWS deployed | ✅ READY |

### Test Sequence

| # | Test | Method | Expected | Time |
|---|------|--------|----------|------|
| 1 | **Canary Test — Layer 1** | Add CANARY line to Layer 1, ask about it | Resolved values | 5 min |
| 2 | **Canary Test — Layer 2** | Add CANARY line to Layer 2, ask about it | Resolved values | 5 min |
| 3 | **Chat Logs** | Check Event Logs for actual prompt sent | Resolved in prompt | 5 min |
| 4 | **Multi-user test** | Login as u-gtm_user, u-thy_user, u-lfg_user | Different CCC per user | 15 min |
| 5 | **ADMIN test** | Login as a-gtm_dev, request CCC-ID | REFUSE | 5 min |
| 6 | **Cross-workspace test** | u-gtm_user in tools, request CCC-ID | REFUSE | 5 min |
| 7 | **API debug** (if needed) | Direct API call with inspection | Prompt metadata | 10 min |
| 8 | **Source code** (if needed) | @RMN inspects pipeline | Resolution logic | 30 min |

### Decision Matrix

| Canary Result | Chat Logs | Decision |
|---------------|-----------|----------|
| ✅ Resolved | ✅ Resolved | **CONFIRMED — L-120/L-121 valid** |
| ✅ Resolved | ❌ Literal | ⚠️ LLM inferring, not platform resolving — investigate |
| ❌ Literal | ❌ Literal | **NOT WORKING — file GH issue, revise L-120/L-121** |
| ❌ Literal | ✅ Resolved | ⚠️ Display issue only — variables work at prompt level |

---

## 📋 Discovered By (BP-047)

| CCC | Contributor | Role | Context |
|-----|-------------|------|---------|
| GTM | [yonks](https://GitHub.com/YonksTEAM) | Co-Founder / Chief Digital Alchemist | W07 Day 2 — #SystemPromptVariables discovery + failed Phase 1 test |
| RMN | Roman Di Domizio | AI Platform Engineer | W07 Day 2 — @RMN call, emergency maintenance, shared skepticism |

---

## 📋 Related Documents

| Document | Version | Relevance |
|----------|---------|-----------|
| SharedKernel | v3.1.2.1 | L-120, L-121, BP-054 |
| GUIDE-009 | v3.1.1.1 | Post-restart smoke test |
| CASE-STUDY-003 | v2.4.0 | MAIT Thread Identity (similar investigation pattern) |

### External Sources

| Source | URL |
|--------|-----|
| AnythingLLM Docs — System Prompt Variables | [docs.anythingllm.com](https://docs.anythingllm.com/features/system-prompt-variables) |
| AnythingLLM GitHub | [github.com/Mintplex-Labs/anything-llm](https://github.com/Mintplex-Labs/anything-llm) |
| AnythingLLM v1.10.0 Release | [newreleases.io](https://newreleases.io/project/github/Mintplex-Labs/anything-llm/release/v1.10.0) |

---

## 📋 Version History

| Version | Date | #masterCCC | Approval | Changes |
|---------|------|------------|----------|---------|
| 3.1.2.1 | 2026-W07 | GTM_2026-W07_200 | GTM_2026-W07_202 | Initial case study; 6 investigation topics; 5 verification methods; 8-test plan for W07 Day 3; decision matrix; 3 hypotheses for variable resolution pipeline |

---

#FlowsBros #FedArch #AnythingLLM #YonksPromptingAcademy #WeOwnSeason003

♾️ WeOwnNet 🌐 | 🏡 Real Estate and 🤝 cooperative ownership for everyone. An 🤗 inclusive community, by 👥 invitation only.



================================================
FILE: _MISC_/.gitkeep
================================================




================================================
FILE: _PROJECTS_/PRJ-005.md
================================================
# PRJ-005: Drupal Wiki Deployment — ♾️ WeOwnNet 🌐

## 📋 PRJ-005_DrupalWiki_WeOwnNet_v3.1.2.1.md
## ♾️ WeOwnNet 🌐

| Field | Value |
|-------|-------|
| Document | PRJ-005_DrupalWiki_WeOwnNet.md |
| Version | 3.1.2.1 |
| CCC-ID | GTM_2026-W07_015 |
| Created | 2026-02-09 (W07) |
| Season | #WeOwnSeason003 🚀 |
| Status | 🔒 LOCKED |
| Tags | #DrupalWiki #AnythingLLM #FedArch #DataConnector |

---

## 📖 Table of Contents

1. [Executive Summary](#-executive-summary)
2. [Project Identity](#-project-identity)
3. [Architecture](#-architecture)
4. [Drupal Configuration](#-drupal-configuration)
5. [AnythingLLM Integration](#-anythingllm-integration)
6. [Content Structure](#-content-structure)
7. [Deployment Checklist](#-deployment-checklist)
8. [MVP Success Criteria](#-mvp-success-criteria)
9. [Risk Matrix](#-risk-matrix)
10. [Hosting Strategy](#-hosting-strategy)
11. [Migration Plan](#-migration-plan)
12. [MAIT Recommendation](#-mait-recommendation)
13. [#devROADMAP Integration](#-devroadmap-integration)
14. [Team](#-team)
15. [Discovered By](#-discovered-by)
16. [Related Documents](#-related-documents)
17. [Version History](#-version-history)

---

## 📋 Executive Summary

Deploy Drupal 11 wiki at wiki.WeOwn.net as a **first-class #FedArch PUSH data source**. Drupal content auto-syncs to #AnythingLLM RAG via the native `ai_provider_anythingllm` module — enabling wiki content to be embedded and retrieved by AI agents in real-time. This positions Drupal alongside GitHub as the second PUSH-based data connector in the #FedArch ecosystem.

| Field | Value |
|-------|-------|
| **Why** | Centralize ecosystem knowledge in a CMS that feeds AI |
| **What** | Drupal 11 wiki with native AnythingLLM integration |
| **When** | MVP by Thu 12 Feb 2026 (3 days) |
| **Who** | @GTM (owner) |
| **How** | Managed hosting → Docker → K8s (phased) |

---

## 📋 Project Identity

| Field | Value |
|-------|-------|
| Project ID | **PRJ-005** |
| Title | Drupal Wiki Deployment — ♾️ WeOwnNet 🌐 |
| Domain | **wiki.WeOwn.net** |
| Target | Thu 12 Feb 2026 (W07 Day 4) |
| Priority | 🔴 P0 |
| Owner | @GTM |
| Drupal Version | 11.x |
| Integration | ai_provider_anythingllm (1.0.0-alpha1) |
| Target Instance | INT-P01 (AI.WeOwn.Agency) |
| Ecosystem | ♾️ WeOwnNet 🌐 |

### Future Instance (Phase 2)

| Field | Value |
|-------|-------|
| Domain | wiki.Yonks.TEAM |
| Target Instance | INT-OG1 (AI.YonksTEAM.xyz) |
| Audience | @GTM + @THY |
| Priority | 🟠 P1 (W08-W09) |

---

## 📋 Architecture

### Content Layer Strategy

```
┌─────────────────────────────────────────────────────────┐
│              #FedArch DATA SOURCES                       │
├─────────────────┬───────────────────────────────────────┤
│  PUSH Sources   │  PULL Sources                         │
│  (auto-sync)    │  (manual/scheduled)                   │
├─────────────────┼───────────────────────────────────────┤
│  GitHub Repo    │  Website URL Scraper                  │
│  Drupal Wiki 🆕 │  Manual Upload                        │
│                 │  Raw Text                              │
└────────┬────────┴──────────────┬────────────────────────┘
         │                       │
         ▼                       ▼
┌─────────────────────────────────────────────────────────┐
│              #AnythingLLM RAG                            │
│  Vector DB → Embedding → Retrieval → AI Response        │
└─────────────────────────────────────────────────────────┘
```

### Integration Architecture

```
┌─────────────────────────────────────────────────────────┐
│                    DRUPAL 11                             │
│                  wiki.WeOwn.net                          │
│                                                         │
│  Wiki Pages ──→ Search API ──→ ai_provider_anythingllm  │
│  (Content)      (Index)        (Embed + Store)          │
│                                      │                  │
│  On Save ──→ Auto-Push ─────────────→│                  │
│                                      │                  │
└──────────────────────────────────────│──────────────────┘
                                       │
                                       ▼ REST API (PUSH)
                                       │
┌──────────────────────────────────────│──────────────────┐
│                #AnythingLLM (INT-P01)                    │
│                AI.WeOwn.Agency                           │
│                                      │                  │
│  Workspace ←── Vector DB ←── Embed ←─┘                  │
│  (tools/CCC)   (LanceDB)    (Qwen3 4B)                 │
│       │                                                 │
│       ▼                                                 │
│  RAG Retrieval → AI Response → User                     │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

### Integration Tiers

| Tier | Method | Direction | Trigger | Status |
|------|--------|-----------|---------|--------|
| **PRIMARY** | Drupal Native Connector | PUSH (Drupal → AnythingLLM) | On content save | ✅ APPROVED |
| **FALLBACK** | Website URL Scraper (BP-038) | PULL (AnythingLLM ← Drupal) | Manual/scheduled | ✅ READY |
| **LAST RESORT** | Manual RAG Upload | Manual | Human action | ✅ ALWAYS AVAILABLE |

### RAG Source Registry (Updated)

| Source | Type | Content | Connector | Instance |
|--------|------|---------|-----------|----------|
| CCCbotNet/fedarch (GH) | PUSH | Governance (#PinnedDocs, guides) | GitHub Repo | ALL |
| **wiki.WeOwn.net (Drupal)** 🆕 | **PUSH** | **Knowledge base, reference, how-tos** | **Drupal Provider** | **INT-P01** |
| Session notes | Manual | Session exports | Manual upload | Per instance |
| External docs | PULL | Tool documentation | Website URL | Per MAIT |

### Auth Model

| Access | Level | Method |
|--------|-------|--------|
| Read | Public (open) | Anonymous access |
| Write | Restricted (Core TEAM) | Drupal native → KeyCloak SSO (future) |

---

## 📋 Drupal Configuration

### Required Modules

| Module | Package | Purpose | Status |
|--------|---------|---------|--------|
| `ai` | `drupal/ai` | Drupal AI ecosystem core | ✅ Stable ([drupal.org](https://www.drupal.org/project/ai)) |
| `ai_provider_anythingllm` | `drupal/ai_provider_anythingllm` | AnythingLLM native integration | ⚠️ Alpha (1.0.0-alpha1) |
| `search_api` | `drupal/search_api` | Search framework for indexing | ✅ Stable |
| `book` | Core | Hierarchical wiki navigation | ✅ Core |
| `pathauto` | `drupal/pathauto` | Clean URL aliases | ✅ Stable |
| `xmlsitemap` | `drupal/xmlsitemap` | Sitemap generation | ✅ Stable |
| `token` | `drupal/token` | Token support for pathauto | ✅ Stable |
| `metatag` | `drupal/metatag` | SEO metadata | ✅ Stable |

### Composer Install

```bash
composer require drupal/ai drupal/ai_provider_anythingllm drupal/search_api drupal/pathauto drupal/xmlsitemap drupal/metatag
```

### Content Type: Wiki Page

| Field | Type | Machine Name | Purpose |
|-------|------|-------------|---------|
| Title | Text | `title` | Page title |
| Body | Rich text (CKEditor) | `body` | Main content |
| Category | Taxonomy (Categories) | `field_category` | Content classification |
| Tags | Taxonomy (Tags) | `field_tags` | Cross-referencing |
| CCC-ID | Text (plain) | `field_ccc_id` | #FedArch attribution (optional) |
| Last Reviewed | Date | `field_last_reviewed` | Freshness tracking |

### URL Alias Pattern (Pathauto)

| Content Type | Pattern | Example |
|-------------|---------|---------|
| Wiki Page | `/wiki/[node:title]` | `/wiki/getting-started` |
| Book Page | `/wiki/[node:book:parents:join-path]/[node:title]` | `/wiki/fedarch/overview` |

### Critical Settings

| Setting | Value | Why |
|---------|-------|-----|
| Clean URLs | ✅ ENABLED | Scraper fallback needs predictable URLs |
| URL aliases | `/wiki/<topic>` | Human + machine readable |
| RSS | ✅ ENABLED | Content discovery |
| XML Sitemap | ✅ ENABLED | Scraper fallback discovery |
| Cache | ✅ ENABLED | Performance |
| robots.txt | Allow AI scraping | Don't block own RAG (fallback) |
| Telemetry | ❌ **DISABLED** | Data Sovereignty (Priority #3) |

---

## 📋 AnythingLLM Integration

### Configuration — AnythingLLM Side

| Setting | Value | Notes |
|---------|-------|-------|
| API Key | Generate in Admin → Developer → API Keys | Required for Drupal module |
| Target Workspace | `tools` or dedicated `wiki` workspace | Where wiki content lands |
| Embedder | Qwen3 Embedding 4B | Ecosystem standard |
| Vector DB | LanceDB (default) | Standard |
| Instance | INT-P01 (AI.WeOwn.Agency) | Primary target |

### Configuration — Drupal Side

| Setting | Value | Notes |
|---------|-------|-------|
| AI Provider | AnythingLLM | Select in Drupal AI config |
| AnythingLLM URL | `https://ai.weown.agency/api` | INT-P01 API endpoint |
| API Key | From AnythingLLM Admin | Paste into Drupal config |
| OpenAI-compat mode | ✅ ENABLED | Broader compatibility |

### Search API Configuration

| Component | Setting | Value |
|-----------|---------|-------|
| **Server** | Name | AnythingLLM |
| **Server** | Backend | AnythingLLM Provider |
| **Server** | URL | `https://ai.weown.agency/api` |
| **Index** | Name | Wiki Content |
| **Index** | Data source | Content — Wiki Page |
| **Index** | Fields | Title, Body, Category, Tags |
| **Index** | Tracker | Default |
| **Index** | Index on save | ✅ ENABLED |

### Data Flow — On Content Save

```
Author saves Wiki Page
    │
    ▼
Drupal fires entity_presave / entity_insert hook
    │
    ▼
Search API indexes entity
    │
    ▼
ai_provider_anythingllm embeds content
    │
    ▼
AnythingLLM receives via REST API
    │
    ▼
Qwen3 Embedding 4B generates vectors
    │
    ▼
LanceDB stores vectors in workspace
    │
    ▼
Content available for RAG retrieval ✅
```

### Telemetry — MUST DISABLE

| Field | Value |
|-------|-------|
| Priority | #3 — Data Sovereignty |
| Action | Disable AnythingLLM telemetry in settings |
| Verify | Check no external data transmission |
| Rule | Users own their data |

---

## 📋 Content Structure

### Initial Pages (MVP — 10 pages)

| # | Page | Path | Content Source | Priority |
|---|------|------|---------------|----------|
| 1 | Home | `/` | Welcome + navigation | 🔴 P0 |
| 2 | About ♾️ WeOwnNet | `/wiki/about` | Ecosystem overview | 🔴 P0 |
| 3 | Getting Started | `/wiki/getting-started` | New member guide | 🔴 P0 |
| 4 | #FedArch Overview | `/wiki/fedarch` | Architecture overview | 🔴 P0 |
| 5 | CCC Standard | `/wiki/ccc` | CCC format + contributor codes | 🔴 P0 |
| 6 | Founding OGs | `/wiki/founding-ogs` | Team page | 🟠 P1 |
| 7 | #WeOwnSeasons | `/wiki/seasons` | Season registry + current | 🟠 P1 |
| 8 | OCPA Group | `/wiki/ocpa` | OCPA brand page (D-060) | 🟠 P1 |
| 9 | Governance | `/wiki/governance` | cccbot.eth + snapshot.box | 🟡 P2 |
| 10 | Glossary | `/wiki/glossary` | Terms + definitions | 🟡 P2 |

### Taxonomy — Categories

| Category | Description |
|----------|-------------|
| Governance | Rules, protocols, standards |
| Guides | How-tos, tutorials |
| Reference | Definitions, glossary |
| Projects | Project documentation |
| Community | Team, events, announcements |

### Taxonomy — Tags

| Tag | Usage |
|-----|-------|
| #FedArch | Architecture content |
| #AnythingLLM | Platform content |
| #CCC | Contributor code content |
| #WeOwnSeason003 | Current season |
| #YonksPromptingAcademy | Training content |

### Book Structure (Hierarchical)

```
♾️ WeOwnNet Wiki
├── About
├── Getting Started
├── #FedArch
│   ├── Overview
│   ├── Architecture
│   ├── Instances
│   └── Protocols
├── CCC Standard
│   ├── Format
│   ├── Contributor Codes
│   └── Rules
├── Governance
│   ├── cccbot.eth
│   └── Voting
├── Seasons
│   ├── #WeOwnSeason003
│   └── Archive
├── OCPA Group
└── Glossary
```

---

## 📋 Deployment Checklist

### Phase 1: Infrastructure (Day 1 — Mon 09 Feb)

| # | Task | Owner | Time | Status |
|---|------|-------|------|--------|
| 1 | Select managed provider (Pantheon or DO) | @GTM | 15 min | ⬜ |
| 2 | Create account + deploy Drupal 11 | @GTM | 30 min | ⬜ |
| 3 | Configure DNS: wiki.WeOwn.net | @GTM | 15 min | ⬜ |
| 4 | Enable HTTPS/SSL | @GTM | 15 min | ⬜ |
| 5 | Admin account setup | @GTM | 10 min | ⬜ |
| | **Phase 1 Total** | | **~1.5 hr** | |

### Phase 2: Configuration (Day 2 — Tue 10 Feb)

| # | Task | Owner | Time | Status |
|---|------|-------|------|--------|
| 6 | Enable Clean URLs | @GTM | 5 min | ⬜ |
| 7 | Install Book module (core) | @GTM | 5 min | ⬜ |
| 8 | Create Wiki Page content type | @GTM | 20 min | ⬜ |
| 9 | Configure taxonomy (Categories + Tags) | @GTM | 15 min | ⬜ |
| 10 | Configure Pathauto (`/wiki/<topic>`) | @GTM | 10 min | ⬜ |
| 11 | Enable XML Sitemap | @GTM | 10 min | ⬜ |
| 12 | Theme selection + branding | @GTM | 30 min | ⬜ |
| 13 | `composer require` AI + AnythingLLM modules | @GTM | 5 min | ⬜ |
| 14 | Enable AI + AnythingLLM modules | @GTM | 2 min | ⬜ |
| 15 | Generate AnythingLLM API key (INT-P01) | @GTM | 2 min | ⬜ |
| 16 | Configure AI provider (URL + API key) | @GTM | 5 min | ⬜ |
| 17 | **Disable telemetry** (Data Sovereignty) | @GTM | 2 min | ⬜ |
| 18 | Create Search API server (AnythingLLM) | @GTM | 5 min | ⬜ |
| 19 | Create Search API index (Wiki Page) | @GTM | 10 min | ⬜ |
| 20 | Test: Create test page → verify in RAG | @GTM | 5 min | ⬜ |
| | **Phase 2 Total** | | **~2.5 hr** | |

### Phase 3: Content (Day 2-3 — Tue/Wed 10-11 Feb)

| # | Task | Owner | Time | Status |
|---|------|-------|------|--------|
| 21 | Create Home page | @GTM | 20 min | ⬜ |
| 22 | Create About page | @GTM | 15 min | ⬜ |
| 23 | Create Getting Started page | @GTM | 20 min | ⬜ |
| 24 | Create #FedArch Overview page | @GTM | 20 min | ⬜ |
| 25 | Create CCC Standard page | @GTM | 15 min | ⬜ |
| 26 | Create 2+ additional P1 pages | @GTM | 30 min | ⬜ |
| 27 | Navigation menu setup | @GTM | 10 min | ⬜ |
| 28 | Book structure configuration | @GTM | 15 min | ⬜ |
| | **Phase 3 Total** | | **~2.5 hr** | |

### Phase 4: Integration & Verify (Day 3-4 — Wed/Thu 11-12 Feb)

| # | Task | Owner | Time | Status |
|---|------|-------|------|--------|
| 29 | Verify auto-push (create page → check RAG) | @GTM | 10 min | ⬜ |
| 30 | If auto-push fails → configure Website URL fallback | @GTM | 15 min | ⬜ |
| 31 | Query test: wiki content via #AnythingLLM | @GTM | 10 min | ⬜ |
| 32 | RAG retrieval accuracy check (3 queries) | @GTM | 10 min | ⬜ |
| 33 | MVP success criteria check (7 points) | @GTM | 15 min | ⬜ |
| 34 | FULL:SYNC:META — PRJ-005 MVP COMPLETE | @GTM | 10 min | ⬜ |
| | **Phase 4 Total** | | **~1 hr** | |

### Total Estimate

| Phase | Time | Day |
|-------|------|-----|
| Phase 1: Infrastructure | ~1.5 hr | Mon 09 Feb |
| Phase 2: Configuration | ~2.5 hr | Tue 10 Feb |
| Phase 3: Content | ~2.5 hr | Tue-Wed 10-11 Feb |
| Phase 4: Integration | ~1 hr | Wed-Thu 11-12 Feb |
| **TOTAL** | **~7.5 hr** | **3-4 days** |

---

## 📋 MVP Success Criteria

| # | Criterion | Test | Pass |
|---|-----------|------|------|
| 1 | wiki.WeOwn.net accessible | Load URL in browser | ✅ Page renders |
| 2 | 5+ pages published | Count published nodes | ≥5 pages |
| 3 | Native connector installed | Module status page | Enabled |
| 4 | Search API index active | Index status page | Items indexed |
| 5 | Auto-push verified | Save page → check RAG | Content in AnythingLLM |
| 6 | RAG retrieval verified | Query wiki content via AI | Correct response |
| 7 | Clean URL structure | Check page URLs | `/wiki/<topic>` pattern |

### Pass Criteria

| Result | Criteria |
|--------|----------|
| ✅ **MVP PASS** | 7/7 criteria met |
| ⚠️ **MVP PARTIAL** | 5-6/7 (auto-push may use fallback) |
| ❌ **MVP FAIL** | <5/7 |

---

## 📋 Risk Matrix

| # | Risk | Probability | Impact | Severity | Mitigation |
|---|------|-------------|--------|----------|------------|
| 1 | Alpha module instability | 🟡 MEDIUM | 🟠 HIGH | 🟠 | Fallback to Website URL scraper |
| 2 | Drupal 11 + module compatibility | 🟢 LOW | 🟠 HIGH | 🟡 | Test in sandbox first |
| 3 | AnythingLLM API changes | 🟢 LOW | 🟡 MEDIUM | 🟢 | OpenAI-compat mode as backup |
| 4 | DNS propagation delay | 🟡 MEDIUM | 🟡 MEDIUM | 🟡 | Configure DNS Day 1 |
| 5 | Content migration scope creep | 🟠 HIGH | 🟡 MEDIUM | 🟡 | MVP = 5-10 pages only |
| 6 | Telemetry leaking data | 🟢 LOW | 🔴 CRITICAL | 🟠 | Disable immediately (Priority #3) |
| 7 | Embedder mismatch | 🟢 LOW | 🟠 HIGH | 🟡 | Verify Qwen3 4B on INT-P01 |
| 8 | Managed host limitations | 🟡 MEDIUM | 🟡 MEDIUM | 🟡 | Choose Drupal-optimized host |

### Risk Acceptance

| Severity | Action |
|----------|--------|
| 🔴 CRITICAL | Must mitigate before launch |
| 🟠 HIGH | Must have fallback plan |
| 🟡 MEDIUM | Monitor, address if triggered |
| 🟢 LOW | Accept |

---

## 📋 Hosting Strategy

### Phase Roadmap

| Phase | Timeline | Hosting | Cost | Owner |
|-------|----------|---------|------|-------|
| **MVP** | W07 (now) | Managed provider | ~$0-15/mo | @GTM |
| **Phase 2** | 2026-Q1 | Docker container | ~$0 (co-op) | @GTM + @RMN |
| **Phase 3** | 2026-Q2+ | K8s cluster (MSP) | $0 (co-op) | MSP |

### Managed Provider Options

| Provider | Drupal 11 | Free Tier | 1-Click | Recommendation |
|----------|-----------|-----------|---------|---------------|
| **Pantheon** | ✅ | ✅ Free sandbox | ✅ | 🟢 **BEST for MVP** |
| **DigitalOcean** | ✅ | ❌ ($6/mo) | ⚠️ Manual | 🟡 Full control |
| **Platform.sh** | ✅ | ✅ Trial | ✅ | 🟡 Git-based |
| **Acquia** | ✅ | ❌ | ✅ | 🟠 Enterprise (overkill) |

---

## 📋 Migration Plan

### wiki.3win.Social → wiki.WeOwn.net

| Phase | Timeline | Action |
|-------|----------|--------|
| 1 | W07 (now) | Deploy wiki.WeOwn.net MVP |
| 2 | W08-W10 | Migrate priority content from wiki.3win.Social |
| 3 | W11-W15 | Complete migration |
| 4 | W16-W22 | Redirect wiki.3win.Social → wiki.WeOwn.net |
| 5 | Jun 2026 | Sunset wiki.3win.Social |

---

## 📋 MAIT Recommendation

### @MAIT:#Drupal

| Field | Value |
|-------|-------|
| Thread | MAIT_Drupal |
| ShortCode | @MAIT:#Drupal |
| Instance | INT-P01 (AI.WeOwn.Agency) |
| Steward | @GTM |
| Tool Agent | `t-drupal_tool` (R-198) |
| Priority | 🟡 P2 (after MVP deployed) |
| Protocol | #ContextVolley (R-190) |

### SME Scope

| # | Topic |
|---|-------|
| 1 | Drupal 11 administration |
| 2 | ai_provider_anythingllm configuration |
| 3 | Search API + indexing |
| 4 | Content types + taxonomy |
| 5 | Book module (wiki structure) |
| 6 | Pathauto + URL management |
| 7 | Drupal ↔ AnythingLLM troubleshooting |
| 8 | Migration from wiki.3win.Social |

### RAG Docs to Upload

| # | Document | Source |
|---|----------|--------|
| 1 | Drupal AI module docs | [drupal.org/project/ai](https://www.drupal.org/project/ai) |
| 2 | ai_provider_anythingllm docs | [drupal.org](https://www.drupal.org/project/ai_provider_anythingllm) |
| 3 | Search API docs | drupal.org/project/search_api |
| 4 | Drupal 11 admin guide | drupal.org/docs |
| 5 | Drupal AGENTS.md | [github.com/amazeeio/drupal-agents-md](https://github.com/amazeeio/drupal-agents-md) |

---

## 📋 #devROADMAP Integration

| Item | Timeline | Dependency |
|------|----------|------------|
| **Drupal Wiki MVP** | **W07** | ← **THIS PROJECT** |
| wiki.Yonks.TEAM | W08-W09 | After MVP validated |
| KeyCloak SSO | 2026-Q1 | After wiki stable |
| Docker migration | 2026-Q1 | After MVP validated |
| K8s deployment | 2026-Q2 | After Docker proven |
| MSP model | 2026-Q2+ | After K8s stable |
| wiki.3win.Social sunset | Jun 2026 | After full migration |

---

## 📋 Team

| CCC | Contributor | Role |
|-----|-------------|------|
| GTM | yonks | Project Owner / Deployer |
| RMN | Roman | Infrastructure (Docker/K8s phases) |
| SHD | Shahid | DevOps support (as needed) |

---

## 📋 Discovered By (BP-047)

| CCC | Contributor | Role | Context |
|-----|-------------|------|---------|
| GTM | [yonks](https://GitHub.com/YonksTEAM) | Co-Founder / Chief Digital Alchemist | #devROADMAP Feb-2026 planning — Drupal as #AnythingLLM Data Connector |

---

## 📋 Related Documents

| Document | Version | Relevance |
|----------|---------|-----------|
| SharedKernel | v3.1.1.4 | #FedArch architecture, RAG structure |
| BEST-PRACTICES | v3.1.1.3 | BP-038 (Tool Agent RAG), BP-026 (Tool Agent Setup) |
| GUIDE-009 | v3.1.1.1 | Smoke Test (post-integration verification) |

---

## 📋 Version History

| Version | Date | #masterCCC | Approval | Changes |
|---------|------|------------|----------|---------|
| 3.1.2.1 | 2026-W07 | GTM_2026-W07_007 | ⬜ AWAITING | Initial project brief; Drupal 11 + ai_provider_anythingllm architecture; 34-step deployment checklist; 10-page content structure; 8-risk matrix; MAIT recommendation; migration plan; ~7.5 hr estimate |

---

#FlowsBros #FedArch #DrupalWiki #WeOwnSeason003

♾️ WeOwnNet 🌐 | 🏡 Real Estate and 🤝 cooperative ownership for everyone. An 🤗 inclusive community, by 👥 invitation only.



================================================
FILE: _PROJECTS_/PRJ-006_SideEvent_ETHDenver2026_Wed.md
================================================
# PRJ-006: #SideEvent_ETHDenver2026_Wed

## 📋 PRJ-006_SideEvent_ETHDenver2026_Wed_v3.1.2.1.md
## ♾️ WeOwnNet 🌐

| Field | Value |
|-------|-------|
| Document | PRJ-006_SideEvent_ETHDenver2026_Wed.md |
| Version | 3.1.2.1 |
| CCC-ID | GTM_2026-W07_030 |
| Created | 2026-02-09 (W07) |
| Season | #WeOwnSeason003 🚀 |
| Status | 🔒 LOCKED |
| Tags | #SideEvent #ETHDenver2026 #FlowsBros #OCPAGroup |

---

## 📖 Table of Contents

1. [Executive Summary](#-executive-summary)
2. [Project Identity](#-project-identity)
3. [Strategic Context](#-strategic-context)
4. [Event Details](#-event-details)
5. [Project Team](#-project-team)
6. [Venue Recommendations](#-venue-recommendations)
7. [Content / Agenda](#-content--agenda)
8. [Attendee Strategy](#-attendee-strategy)
9. [Timeline](#-timeline)
10. [Budget](#-budget)
11. [Risk Matrix](#-risk-matrix)
12. [PRJ-003 Synergy](#-prj-003-synergy)
13. [OCPA Group Positioning](#-ocpa-group-positioning)
14. [#FlowsBros Opportunity](#-flowsbros-opportunity)
15. [ETHDenver Registration](#-ethdenver-registration)
16. [ETHVC Summit Reference](#-ethvc-summit-reference)
17. [Discovered By](#-discovered-by)
18. [Related Documents](#-related-documents)
19. [Version History](#-version-history)

---

## 📋 Executive Summary

Evening side event during ETHDenver 2026, strategically positioned immediately after the ETHVC Summit + Pitchfest. Targeting 20-30 attendees — VCs, founders, and builders who just spent 8 hours in VC pitch mode. ♾️ WeOwnNet 🌐 presents the cooperative alternative: "What if you didn't need a VC?" This is the only #RealEstate / #Cooperative / #RWA event at ETHDenver 2026 — a gap in the market that we own.

| Field | Value |
|-------|-------|
| **Why** | Zero #RWA/#Cooperative events at ETHDenver = we own this niche |
| **What** | Dinner / networking / presentation — cooperative ownership meets Web3 |
| **When** | Wed 18 Feb 2026, 6:00-9:00 PM MST |
| **Who** | 20-30 attendees (ETHVC crowd + builders + community) |
| **Where** | Denver, CO — RiNo District (recommended) |

---

## 📋 Project Identity

| Field | Value |
|-------|-------|
| Project ID | **PRJ-006** |
| Title | #SideEvent_ETHDenver2026_Wed |
| Description | Evening side event during ETHDenver 2026 — after ETHVC Summit |
| Type | Dinner / Networking / Presentation |
| Priority | 🔴 P0 (9 days from scoping) |
| Owner | @GTM |
| #masterCCC | GTM_2026-W07_026 |

### Sister Events

| PRJ | Event | Date | City | Relationship |
|-----|-------|------|------|-------------|
| PRJ-003 | #SideEvent_Redeem2026 | Thu 12 Feb | Orlando, FL | Pre-ETHDenver — values pitch |
| **PRJ-006** | **#SideEvent_ETHDenver2026_Wed** | **Wed 18 Feb** | **Denver, CO** | **Mid-ETHDenver — tech pitch** |
| PRJ-007 | #SideEvent_ETHDenver2026_Sun | Sun 22 Feb | Denver, CO | Post-ETHDenver — build together |

---

## 📋 Strategic Context

### The Opportunity

| Factor | Detail |
|--------|--------|
| **Timing** | Wed 18 Feb evening — ETHVC Summit attendees just finished 8 hours of VC/founder content |
| **Audience** | 232+ ETHVC attendees (VCs, founders, builders) — hungry, tired, looking for dinner |
| **Gap** | ❌ NO #RealEstate / #Cooperative / #RWA events at ETHDenver |
| **Positioning** | ♾️ WeOwnNet 🌐 + OCPA Group = **only cooperative real estate voice at ETHDenver** |
| **Narrative** | "From pitching VCs to owning together" — cooperative alternative to VC model |

### Why Wed 18 Feb Evening

| Factor | Rationale |
|--------|-----------|
| ETHVC Summit ends 6PM | Attendees are FREE |
| Day 2 of ETHDenver | People are settled, networking mode |
| NOT opening night (Tue) | Avoids kickoff party competition |
| NOT late week (Thu-Fri) | Before BUIDLathon fatigue sets in |
| After VC conversations | Perfect contrast — "what if you didn't need a VC?" |

### Narrative Arc

```
ETHVC Summit (10AM-6PM): "How to raise from VCs"
    │
    ▼ 6:00 PM — Walk to dinner
    │
#SideEvent (6PM-9PM): "What if you didn't need one?"
    │
    ▼
♾️ WeOwnNet 🌐: Cooperative ownership > VC dependency
```

---

## 📋 Event Details

### Conference

| Field | Value |
|-------|-------|
| Conference | ETHDenver 2026 |
| Dates | February 17-21, 2026 (Tue-Sat) |
| Venue | National Western Center, Denver, CO |
| Website | [ethdenver.com](https://ethdenver.com) |
| Tickets | FREE — [app.ethdenver.com](https://app.ethdenver.com/) |

### Side Event

| Field | Value |
|-------|-------|
| Event Name | #SideEvent_ETHDenver2026_Wed |
| Date | **Wednesday, February 18, 2026** |
| Time | **6:00 PM - 9:00 PM MST** |
| Duration | 3 hours |
| Type | Dinner / Networking / Presentation |
| Capacity | 20-30 (intimate) |
| Dress Code | Smart casual / Web3 casual |

### Location

| Field | Value |
|-------|-------|
| City | Denver, CO |
| Area | RiNo District (recommended) — ~10 min from National Western Center |
| Transport | Walking distance or short rideshare from ETHDenver venue |

---

## 📋 Project Team

| CCC | Contributor | Role | Responsibilities |
|-----|-------------|------|------------------|
| GTM | yonks | Project Lead | Overall coordination, venue, logistics |
| LFG | CoachLFG | Co-Host | Content, attendee engagement, #FlowsBros |
| LDC | Dhruv | Technical | Demo prep, #ProjectConnex showcase |

### Discussed By

| CCC | Context |
|-----|---------|
| GTM | #FlowsBros call — initial concept |
| LFG | #FlowsBros call — co-host interest |
| LDC | #FlowsBros call — technical showcase |

---

## 📋 Venue Recommendations

### Evaluation Criteria

| Criteria | Weight |
|----------|--------|
| Proximity to National Western Center | 🔴 HIGH |
| Private/semi-private space | 🔴 HIGH |
| Capacity 20-30 | 🟠 MEDIUM |
| Food & beverage | 🟠 MEDIUM |
| Ambiance (Web3 / tech vibe) | 🟠 MEDIUM |
| Cost | 🟠 MEDIUM |
| A/V for presentation | 🟡 LOW |

### Options — Denver (Near National Western Center)

| Rank | Venue | Type | Distance | Capacity | Pros | Cons | Status |
|------|-------|------|----------|----------|------|------|--------|
| 🥇 | **The Stockyards Event Center** | Event space | On-site (NWC) | 50+ | ETHDenver venue, no transport | May be booked by ETHDenver | ⬜ INVESTIGATE |
| 🥈 | **RiNo District restaurants** | Various | ~10 min | 15-40 | Trendy, tech-friendly, walkable | Transport needed | ⬜ RESEARCH |
| 🥉 | **The Source Hotel** | Hotel + dining | ~10 min | 20-30 | Upscale, private dining, market hall | Premium pricing | ⬜ EVALUATE |
| 4 | **Improper City** | Bar/event space | ~15 min | 30-50 | Casual, large, affordable | Less intimate | ⬜ EVALUATE |
| 5 | **Airbnb/Private space** | Private | Varies | 15-25 | Most intimate, full control | Logistics heavier | ⬜ EVALUATE |

### RiNo District — Why It's Ideal

| Factor | Detail |
|--------|--------|
| Location | River North Art District — Denver's creative/tech hub |
| Proximity | ~10 min from National Western Center |
| Vibe | Breweries, art, tech — perfect for Web3 crowd |
| Options | Dozens of restaurants with private dining |
| Transport | Easy rideshare from ETHDenver venue |

### Decision

| Field | Value |
|-------|-------|
| Selected Venue | ⬜ TBD |
| Decision Date | By **Wed 11 Feb** (7 days before event) |
| Decision Owner | @GTM |

---

## 📋 Content / Agenda

### Proposed Agenda

| Time (MST) | Duration | Segment | Lead |
|------------|----------|---------|------|
| 6:00 PM | 30 min | Arrival + Drinks + Networking | ALL |
| 6:30 PM | 10 min | Welcome + Introductions | @GTM |
| 6:40 PM | 20 min | "Cooperative Ownership in Web3" — ♾️ WeOwnNet 🌐 | @GTM |
| 7:00 PM | 15 min | OCPA Group — Real Estate Meets Blockchain | @GTM |
| 7:15 PM | 15 min | #ProjectConnex Demo / #FedArch Showcase | @LDC |
| 7:30 PM | 60 min | Dinner + Open Discussion | ALL |
| 8:30 PM | 30 min | Networking + Closing | @LFG |
| 9:00 PM | — | Event Ends | — |

### Content Themes

| # | Theme | Relevance |
|---|-------|-----------|
| 1 | Cooperative ownership as alternative to VC | Counter-narrative to ETHVC Summit |
| 2 | #RWA — Real World Assets on-chain | Tokenized real estate |
| 3 | #ResponsibleAgenticAI | #FedArch + multi-agent governance |
| 4 | OCPA Group — community-owned real estate | Showcase |
| 5 | "You don't need a VC" | Cooperative capital formation |

---

## 📋 Attendee Strategy

### Target Attendees

| # | Persona | Where to Find | Invite Method |
|---|---------|---------------|---------------|
| 1 | ETHVC Summit attendees (founders) | ETHVC event | In-person at summit |
| 2 | #RWA / DeFi builders | ETHDenver floor | In-person networking |
| 3 | Cooperative/DAO enthusiasts | ETHDenver sessions | In-person + online |
| 4 | Real estate + blockchain crossover | Side events | Signal / Telegram |
| 5 | #FlowsBros community | Online | #FlowsBros announcement |
| 6 | Denver local Web3 community | Meetup groups | Signal / Telegram |

### Invite Tiers

| Tier | Count | Who | Method |
|------|-------|-----|--------|
| **Inner Circle** | 5-8 | Core TEAM + close partners | Direct invite |
| **Target** | 10-15 | ETHVC founders + RWA builders | In-person at summit |
| **Open** | 5-10 | Community + walk-ins | Social media day-of |
| **TOTAL** | **20-30** | | |

### Pre-Event Outreach

| # | Action | When | Owner |
|---|--------|------|-------|
| 1 | Get ETHDenver tickets (ALL attendees) | ASAP | @GTM |
| 2 | Apply for ETHVC Founders/Builders Pass | ASAP | @GTM |
| 3 | Signal/Telegram invite to inner circle | W07 | @GTM |
| 4 | #FlowsBros announcement | W08 (after Redeem) | @LFG |
| 5 | Day-of recruiting at ETHVC Summit | Wed 18 Feb | @GTM + @LFG |

---

## 📋 Timeline

### Key Milestones (9-Day Sprint)

| Date | Day | Milestone | Owner | Status |
|------|-----|-----------|-------|--------|
| Mon 09 Feb | W07-D1 | PRJ-006 APPROVED | @GTM | ✅ |
| Mon 09 Feb | W07-D1 | ETHDenver tickets secured | @GTM | ⬜ P0 |
| Mon 09 Feb | W07-D1 | ETHVC pass applications submitted | @GTM | ⬜ P0 |
| Tue 10 Feb | W07-D2 | Venue shortlist (3 options) | @GTM | ⬜ |
| Wed 11 Feb | W07-D3 | Venue SELECTED + BOOKED | @GTM | ⬜ |
| Thu 12 Feb | W07-D4 | **PRJ-003 EVENT** (Orlando) | @GTM | ⬜ |
| Fri 13 Feb | W07-D5 | Travel Orlando → Denver | @GTM | ⬜ |
| Sat 14 Feb | W07-D6 | Content/agenda finalized | @GTM + @LFG | ⬜ |
| Sun 15 Feb | W07-D7 | Inner circle invites sent | @GTM | ⬜ |
| Mon 16 Feb | W08-D1 | Arrive Denver / BUIDLWeek starts | @GTM | ⬜ |
| Tue 17 Feb | W08-D2 | ETHDenver Day 1 — networking | ALL | ⬜ |
| **Wed 18 Feb** | **W08-D3** | **🎯 PRJ-006 EVENT** | **ALL** | ⬜ |
| Thu 19 Feb | W08-D4 | Follow-up + thank yous | @LFG | ⬜ |

### Critical Path

```
TODAY ──→ Tickets ──→ ETHVC App ──→ Venue ──→ PRJ-003 ──→ Travel ──→ Content ──→ EVENT
Mon 09     Mon 09      Mon 09       Wed 11     Thu 12       Fri 13     Sat 14     Wed 18
```

---

## 📋 Budget

| Category | Estimate | Notes |
|----------|----------|-------|
| Venue rental | $0-500 | Restaurant private dining vs event space |
| Food & Beverage | $500-1,500 | $30-50/person × 20-30 |
| @GTM Travel (ORL→DEN) | $200-400 | Flight |
| @GTM Hotel (Denver) | $150-250/night × 3-4 | Mon-Thu or Tue-Thu |
| Materials | $50-100 | Name tags, signage, QR codes |
| Contingency | 10% | Buffer |
| **TOTAL** | **$1,000 - $3,000** | Range depends on venue + headcount |

### Budget Owner

| Field | Value |
|-------|-------|
| Owner | @GTM + @THY |

---

## 📋 Risk Matrix

| # | Risk | Probability | Impact | Severity | Mitigation |
|---|------|-------------|--------|----------|------------|
| 1 | ETHVC pass not approved | 🟡 MEDIUM | 🟠 HIGH | 🟠 | Apply ASAP + backup Audience Pass |
| 2 | Venue unavailable (ETHDenver week = busy) | 🟠 HIGH | 🔴 CRITICAL | 🔴 | Book by Wed 11 Feb — have 3 backups |
| 3 | Low attendance | 🟡 MEDIUM | 🟠 HIGH | 🟠 | Day-of recruiting at ETHVC Summit |
| 4 | @GTM travel delay (ORL→DEN) | 🟡 MEDIUM | 🔴 CRITICAL | 🟠 | Book Fri 13 Feb flight (2-day buffer) |
| 5 | PRJ-003 runs long → PRJ-006 prep delayed | 🟢 LOW | 🟡 MEDIUM | 🟡 | PRJ-006 prep mostly done before PRJ-003 |
| 6 | Content not ready | 🟢 LOW | 🟠 HIGH | 🟡 | Finalize by Sat 14 Feb |
| 7 | Budget overrun | 🟢 LOW | 🟡 MEDIUM | 🟡 | 10% contingency + venue cost cap |
| 8 | Competing side events Wed evening | 🟠 HIGH | 🟡 MEDIUM | 🟡 | Intimate/exclusive positioning — quality > quantity |
| 9 | @LDC not available in Denver | 🟡 MEDIUM | 🟡 MEDIUM | 🟡 | Remote demo via stream |

### Risk Acceptance

| Severity | Action |
|----------|--------|
| 🔴 CRITICAL | Must mitigate before launch |
| 🟠 HIGH | Must have fallback plan |
| 🟡 MEDIUM | Monitor, address if triggered |
| 🟢 LOW | Accept |

---

## 📋 PRJ-003 Synergy

### Two Events — One Narrative

| Field | PRJ-003 | PRJ-006 |
|-------|---------|---------|
| Event | Redeeming Money 2026 | ETHDenver 2026 |
| Date | Thu 12 Feb | Wed 18 Feb |
| City | Orlando, FL | Denver, CO |
| Audience | Faith + finance | Web3 + builders |
| Theme | Cooperative ownership (values) | Cooperative ownership (technology) |
| OCPA | Values-based pitch | Tech-forward pitch |
| Size | Intimate dinner | Intimate dinner/networking |

### Shared Assets

| Asset | Reuse? |
|-------|--------|
| OCPA Group pitch deck | ✅ Adapt for Web3 audience |
| ♾️ WeOwnNet 🌐 overview | ✅ Same core narrative |
| Name tags / signage | ✅ Reprint with ETHDenver branding |
| @GTM presentation skills | ✅ Warmed up from PRJ-003 |

### Narrative Thread

```
PRJ-003 (Orlando): "Cooperative ownership aligns with our values"
    │
    ▼ 6 days later
    │
PRJ-006 (Denver): "Cooperative ownership is built on blockchain"
    │
    ▼
Combined: "Values + Technology = ♾️ WeOwnNet 🌐"
```

---

## 📋 OCPA Group Positioning

### Why ETHDenver Matters for OCPA

| Factor | Detail |
|--------|--------|
| **No RWA events** | Gap in ETHDenver programming |
| **No cooperative events** | Zero competition for this niche |
| **VC fatigue** | After 8 hours of VC content, cooperative model = refreshing |
| **Builder audience** | Developers who could BUILD cooperative tools |
| **Investor audience** | VCs who could FUND cooperative infrastructure |

### OCPA Talking Points for Web3 Audience

| # | Point |
|---|-------|
| 1 | Real estate tokenization via cooperative structure |
| 2 | On-chain governance (cccbot.eth on snapshot.box) |
| 3 | Data sovereignty (Priority #3) — users own their data |
| 4 | #FedArch — multi-agent AI governance framework |
| 5 | FOSS (Priority #2) — open source everything |

---

## 📋 #FlowsBros Opportunity

### Live Stream Options

| Option | Description | Feasibility |
|--------|-------------|-------------|
| A | Full live stream of event | 🟡 Depends on venue WiFi + attendee consent |
| B | Pre/post show from Denver | ✅ Easy — hotel/venue |
| C | Highlight reel (post-event) | ✅ Easy — edit + publish |
| D | Live tweet / social thread | ✅ Easy — real-time |

### Recommendation

| Action | Priority |
|--------|----------|
| Option B: Pre-event #FlowsBros from Denver | 🟠 P1 |
| Option D: Live social thread during event | 🟠 P1 |
| Option C: Post-event highlight reel | 🟡 P2 |
| Option A: Full stream | 🟡 P2 (if venue supports) |

---

## 📋 ETHDenver Registration

### Action Items — IMMEDIATE

| # | Action | Who | When | Status |
|---|--------|-----|------|--------|
| 1 | Claim FREE ETHDenver ticket — @GTM | @GTM | **ASAP** | ⬜ P0 |
| 2 | Claim FREE ETHDenver ticket — @LFG | @LFG | **ASAP** | ⬜ P0 |
| 3 | Claim FREE ETHDenver ticket — @LDC | @LDC | **ASAP** | ⬜ P0 |
| 4 | Apply ETHVC Founders/Builders Pass — @GTM | @GTM | **ASAP** | ⬜ P0 |
| 5 | Apply ETHVC Audience Pass (backup) | @LFG, @LDC | **ASAP** | ⬜ P1 |

### Links

| Resource | URL |
|----------|-----|
| ETHDenver Tickets (FREE) | [app.ethdenver.com](https://app.ethdenver.com/) |
| ETHVC Summit Passes | [luma.com](https://luma.com/ethdenver-ethvcsummit) |
| ETHDenver Schedule | [ethdenver.com/schedule](https://ethdenver.com/schedule/) |

---

## 📋 ETHVC Summit Reference

### Event Identity

| Field | Value |
|-------|-------|
| Event | ETHVC Summit + Pitchfest |
| Date | Wed 18 Feb 2026 |
| Time | 10:00 AM - 6:00 PM MST |
| Venue | Legacy Building (Level 3), National Western Center |
| Hosts | Bufficorn Ventures + AKINDO |
| Passes | [luma.com](https://luma.com/ethdenver-ethvcsummit) |

### Summit Format

| Block | Time | Format |
|-------|------|--------|
| VC Summit | 10:00 AM - 1:00 PM | Panels, debates, fireside chats |
| Pitchfest | 1:00 PM - 3:00 PM | <15 startups pitch live |
| Ecosystem Showcases | 3:00 PM - 5:00 PM | Protocol/app spotlights |
| Networking | 5:00 PM - 6:00 PM | Open networking |

### Pass Types

| Pass | Access | Status |
|------|--------|--------|
| Audience Pass | Guaranteed seat, live voting, networking | Requires Approval |
| Founders/Builders Pass | Network, exhibit, vie for demo-pitch spots | Requires Approval |
| VIP Pass | Front-row jury, backstage lounge, logo placement | Invite Only |
| Investors Pass | Angel/qualified/VC — seeking top-tier teams | Requires Approval |
| Media Pass | Front-row media, interviews, press kits | Invite Only |

---

## 📋 Discovered By (BP-047)

| CCC | Contributor | Role | Context |
|-----|-------------|------|---------|
| GTM | [yonks](https://GitHub.com/YonksTEAM) | Co-Founder / Chief Digital Alchemist | #FlowsBros call W07-ep01 with @LFG + @LDC |
| LFG | CoachLFG | Co-Host / Coach | #FlowsBros call — co-host interest |
| LDC | Dhruv | Agentic AI Engineer | #FlowsBros call — technical showcase |

---

## 📋 Related Documents

| Document | Version | Relevance |
|----------|---------|-----------|
| PRJ-003_SideEvent_Redeem2026 | v2.4.0 | Sister event — Orlando (Thu 12 Feb) |
| PRJ-007_SideEvent_ETHDenver2026_Sun | v3.1.2.1 | Sister event — Denver (Sun 22 Feb) |
| PRJ-005_DrupalWiki | v3.1.2.1 | Wiki content for event prep |
| SharedKernel | v3.1.1.4 | OCPA Group, cccbot.eth, #FedArch |

---

## 📋 Version History

| Version | Date | #masterCCC | Approval | Changes |
|---------|------|------------|----------|---------|
| 3.1.2.1 | 2026-W07 | GTM_2026-W07_026 | GTM_2026-W07_033 | Initial project brief; ETHVC deep dive; venue recommendations (5 options); 3-hour agenda; attendee strategy (3 tiers, 20-30 target); 9-day sprint timeline; $1K-$3K budget; 9-risk matrix; PRJ-003 synergy; OCPA positioning; #FlowsBros opportunity; ETHVC Summit reference; renamed from PRJ-006_SideEvent_ETHDenver2026 → PRJ-006_SideEvent_ETHDenver2026_Wed (GTM_2026-W07_035) |

---

#FlowsBros #FedArch #SideEvent #ETHDenver2026 #OCPAGroup #WeOwnSeason003

♾️ WeOwnNet 🌐 | 🏡 Real Estate and 🤝 cooperative ownership for everyone. An 🤗 inclusive community, by 👥 invitation only.



================================================
FILE: _PROJECTS_/PRJ-009_FedArchExpansion_ETHDenver-CCC-bot.md
================================================
# PRJ-009: #FedArchExpansion — ETHDenver.CCC.bot

## 📋 PRJ-009_FedArchExpansion_ETHDenver-CCC-bot_v3.1.2.1.md
## ♾️ WeOwnNet 🌐

| Field | Value |
|-------|-------|
| Document | PRJ-009_FedArchExpansion_ETHDenver-CCC-bot.md |
| Version | 3.1.2.1 |
| CCC-ID | GTM_2026-W07_217 |
| Created | 2026-02-11 (W07) |
| Season | #WeOwnSeason003 🚀 |
| Status | 🔒 LOCKED |
| Tags | #FedArchExpansion #ETHDenver2026 #DigitalOcean #FlowsBros |

---

## 📖 Table of Contents

1. [Project Identity](#-project-identity)
2. [Instance Identity](#-instance-identity)
3. [Strategic Context](#-strategic-context)
4. [Project Team](#-project-team)
5. [Infrastructure Architecture](#-infrastructure-architecture)
6. [12-Step Deployment Checklist](#-12-step-deployment-checklist)
7. [Demo Configuration](#-demo-configuration)
8. [Timeline](#-timeline)
9. [Success Criteria](#-success-criteria)
10. [Risk Matrix](#-risk-matrix)
11. [Relationship to Other Projects](#-relationship-to-other-projects)
12. [Decommission Plan](#-decommission-plan)
13. [Future Ownership](#-future-ownership)
14. [Discovered By](#-discovered-by)
15. [Related Documents](#-related-documents)
16. [Version History](#-version-history)

---

## 📋 Project Identity

| Field | Value |
|-------|-------|
| Project ID | **PRJ-009** |
| Title | #FedArchExpansion — ETHDenver.CCC.bot |
| Description | Deploy #AnythingLLM live demo instance at ETHDenver.CCC.bot for ETHDenver 2026 side events |
| Type | Infrastructure Deployment + Event Demo |
| Priority | 🔴 P0 (7 days to deployment deadline) |
| Owner | @GTM |
| Deployed By | @SHD |
| #masterCCC | GTM_2026-W07_216 |

---

## 📋 Instance Identity

| Field | Value |
|-------|-------|
| Instance ID | **INT-E01** |
| Domain | **ETHDenver.CCC.bot** |
| Type | Event (INT-Exx) — ephemeral (D-061) |
| Organization | ♾️ WeOwnNet 🌐 |
| Event | ETHDenver 2026 |
| Active Period | Wed 18 Feb → Sun 22 Feb 2026 (minimum) |
| Deploy By | **Mon 16 Feb 2026** (BUIDLWeek starts) |
| Decommission By | Sun 08 Mar 2026 (R-214) |
| Platform | AnythingLLM v1.10.0+ |
| LLM | Claude Opus 4.6 (`claude-opus-4-6`) |
| Embedder | Qwen3 Embedding 4B |

### Instance Category — NEW (D-061)

| ID | Term | Definition |
|----|------|------------|
| D-061 | INT-Exx | Event Instance — temporary #AnythingLLM instance deployed for specific events; ephemeral by design; decommissioned post-event; format INT-E01→INT-E99 |

### Decommission Rule — NEW (R-214)

| ID | Rule | Status |
|----|------|--------|
| R-214 | Event Instances (INT-Exx) MUST be decommissioned within 2 weeks of event end — data archived to RAG before teardown | 🔒 LOCKED |

---

## 📋 Strategic Context

### Why a Dedicated Instance

| Factor | Detail |
|--------|--------|
| **Live demo** | Show #FedArch + CCC in action at side events |
| **Audience engagement** | Attendees can interact with AI:@ETH agent |
| **Brand** | ETHDenver.CCC.bot = memorable, event-specific |
| **Isolation** | Production (INT-P01) stays clean — no demo traffic |
| **Showcase** | Cooperative ownership + #ResponsibleAgenticAI |
| **CCC Standard** | Live CCC-ID generation for attendees |

### What Attendees Experience

| # | Experience | Detail |
|---|-----------|--------|
| 1 | Visit ETHDenver.CCC.bot | Web-based #AnythingLLM |
| 2 | Create account | Guest or named |
| 3 | Chat with AI | Cooperative ownership Q&A |
| 4 | See CCC-IDs | Live attribution system |
| 5 | Learn about #FedArch | Multi-agent governance |
| 6 | Get excited | "I want this for my project!" |

---

## 📋 Project Team

| CCC | Contributor | Role | Responsibilities |
|-----|-------------|------|------------------|
| GTM | yonks | Project Owner | Requirements, prompts, content, ISC |
| SHD | Shahid | Deployment Lead | Infrastructure, DNS, Docker, SSL, deployment |
| RMN | Roman | Infrastructure Advisor | Kubernetes guidance, Helm chart reference |
| LFG | CoachLFG | Demo Content | Event-specific prompts, attendee engagement |
| LDC | Dhruv | Technical Demo | #ProjectConnex showcase integration |

---

## 📋 Infrastructure Architecture

### Platform

| Field | Value |
|-------|-------|
| Platform | **DigitalOcean** |
| Type | **Droplet** (standalone VM) |
| Deployment | **Docker Compose** |
| Reverse Proxy | **Caddy** (auto SSL via Let's Encrypt) |
| Domain | ETHDenver.CCC.bot |
| DNS | Porkbun.com (CCC.bot domain) → DigitalOcean Droplet IP |
| Data Center | **ATL1 (Atlanta)** — same DC as all existing instances |

### Recommended Droplet Spec

| Resource | Minimum | Recommended | Rationale |
|----------|---------|-------------|-----------|
| CPU | 2 vCPU | **4 vCPU** | AnythingLLM + Caddy + vector DB |
| RAM | 4 GB | **8 GB** | Embedding operations + concurrent users |
| Disk | 50 GB | **80 GB SSD** | RAG docs + vector store + Docker images |
| Plan | Basic | **Basic — ~$48/mo** | |
| Image | Ubuntu 24.04 LTS | Ubuntu 24.04 LTS | Matches AnythingLLM Docker base (v1.10.0) |
| Region | — | **ATL1 (Atlanta)** | Existing infrastructure — all instances deploy here |

### Region Selection

| Field | Value |
|-------|-------|
| Selected | **ATL1 (Atlanta)** |
| Reason | All existing #FedArch instances (INT-P01, INT-P02, INT-OG8) deploy in ATL1 |
| Benefit | Same DC = shared networking, consistent ops, @SHD familiarity |
| Latency to Denver | ~35-40ms (acceptable for demo) |

### Architecture Diagram

```
┌─────────────────────────────────────────────────────┐
│  DigitalOcean — ATL1 (Atlanta)                       │
│                                                      │
│  ┌──────────────┐  ┌──────────────────┐             │
│  │ INT-P01      │  │ INT-E01          │             │
│  │ AI.WeOwn.    │  │ ETHDenver.       │             │
│  │ Agency       │  │ CCC.bot          │             │
│  │ (K8s/DOKS)   │  │ (Droplet/Docker) │             │
│  └──────────────┘  └──────────────────┘             │
│                                                      │
│  ┌──────────────┐  ┌──────────────────┐             │
│  │ INT-P02      │  │ INT-OG8          │             │
│  │ Lite.Burned  │  │ AI.RomanDiD      │             │
│  │ Out.xyz      │  │ .xyz             │             │
│  └──────────────┘  └──────────────────┘             │
│                                                      │
│  ALL INSTANCES — SAME DATA CENTER (ATL1)             │
└─────────────────────────────────────────────────────┘

External APIs:
  AnythingLLM ──→ OpenRouter (Claude Opus 4.6)
  AnythingLLM ──→ Qwen3 Embedding (local or API)
```

### Docker Compose — AnythingLLM

```yaml
# docker-compose.yml
version: '3.8'

services:
  anythingllm:
    image: mintplexlabs/anythingllm:latest
    container_name: anythingllm
    restart: unless-stopped
    ports:
      - "3001:3001"
    volumes:
      - anythingllm_storage:/app/server/storage
    environment:
      - STORAGE_DIR=/app/server/storage
    cap_add:
      - SYS_ADMIN

  caddy:
    image: caddy:2-alpine
    container_name: caddy
    restart: unless-stopped
    ports:
      - "80:80"
      - "443:443"
    volumes:
      - ./Caddyfile:/etc/caddy/Caddyfile
      - caddy_data:/data
      - caddy_config:/config

volumes:
  anythingllm_storage:
  caddy_data:
  caddy_config:
```

### Caddyfile

```
ethdenver.ccc.bot {
    reverse_proxy anythingllm:3001
}
```

### Backup Strategy

| Action | When | Method |
|--------|------|--------|
| Droplet snapshot | Before event (Sun 16 Feb) | DigitalOcean Snapshots |
| Data backup | Daily during event | Volume snapshot |
| Post-event archive | After Sun 22 Feb | Export RAG + sessions → INT-P01 |

---

## 📋 12-Step Deployment Checklist

| # | Step | Owner | Details | Status |
|---|------|-------|---------|--------|
| 1 | **Create Droplet** | @SHD | DigitalOcean — 4 vCPU / 8 GB / 80 GB / **ATL1** / Ubuntu 24.04 | ⬜ |
| 2 | **DNS** | @SHD | Point ETHDenver.CCC.bot → Droplet IP (Porkbun) | ⬜ |
| 3 | **Docker + Compose** | @SHD | Install Docker Engine + Docker Compose on Droplet | ⬜ |
| 4 | **Deploy AnythingLLM** | @SHD | `docker compose up -d` — AnythingLLM + Caddy | ⬜ |
| 5 | **SSL Verify** | @SHD | Confirm Caddy auto-SSL for ETHDenver.CCC.bot | ⬜ |
| 6 | **LLM Config** | @SHD | Set Claude Opus 4.6 (`claude-opus-4-6`) via OpenRouter | ⬜ |
| 7 | **Embedder Config** | @SHD | Set Qwen3 Embedding 4B | ⬜ |
| 8 | **System Prompt** | @GTM | Layer 1 CONSTITUTION (ETHDenver-specific) | ⬜ |
| 9 | **Workspaces + Prompts** | @GTM | CCC + tools; workspace prompts per BP-053/BP-054 | ⬜ |
| 10 | **#PinnedDocs + Users + ChatHistory** | @GTM | 4 docs; demo users; ChatHistory = 40 | ⬜ |
| 11 | **#SmokeTest** | @GTM | GUIDE-009 — 8-point verification | ⬜ |
| 12 | **ISC** | @GTM | TMPL-010 — Instance Season Certification | ⬜ |

### Dependencies

| Step | Depends On |
|------|-----------|
| 2 (DNS) | 1 (Droplet — need IP) |
| 4 (Deploy) | 3 (Docker installed) |
| 5 (SSL) | 2 (DNS propagated) + 4 (Caddy running) |
| 6-7 (Models) | 4 (AnythingLLM running) |
| 8-10 (Config) | 6-7 (Models set) |
| 11 (#SmokeTest) | 8-10 (Config complete) |
| 12 (ISC) | 11 (#SmokeTest pass) |

### Droplet Security Hardening

| # | Step | Detail |
|---|------|--------|
| 1 | SSH key auth | No password login |
| 2 | Firewall | Allow 80, 443, 22 only |
| 3 | Non-root user | Create deploy user with sudo |
| 4 | Fail2ban | Brute-force protection |
| 5 | Automatic updates | `unattended-upgrades` |

### Quick-Start Script — @SHD

```bash
# Step 1: Create Droplet
doctl compute droplet create ethdenver-ccc-bot \
  --image ubuntu-24-04-x64 \
  --size s-4vcpu-8gb \
  --region atl1 \
  --ssh-keys <YOUR_SSH_KEY_ID> \
  --enable-monitoring \
  --enable-backups

# Step 2: SSH into Droplet
ssh root@<DROPLET_IP>

# Step 3: Install Docker
curl -fsSL https://get.docker.com | sh
apt install -y docker-compose-plugin

# Step 4: Create project directory
mkdir -p /opt/anythingllm && cd /opt/anythingllm

# Step 5: Create docker-compose.yml + Caddyfile (from above)

# Step 6: Deploy
docker compose up -d

# Step 7: Verify
curl -I https://ethdenver.ccc.bot
```

---

## 📋 Demo Configuration

### System Prompt — ETHDenver-Specific

| Section | Content |
|---------|---------|
| INSTANCE IDENTITY | INT-E01, ETHDenver.CCC.bot, Event |
| Welcome | "Welcome to the ♾️ WeOwnNet 🌐 demo at ETHDenver 2026!" |
| Focus | Cooperative ownership, #RWA, #FedArch, CCC Standard |
| Tone | Approachable, demo-friendly, educational |
| CCC-ID | ✅ GENERATE for demo users |
| OCPA Group | Cooperative real estate overview |

### Demo Workspaces

| Workspace | Emoji | Purpose |
|-----------|-------|---------|
| CCC | 🤝 | Live CCC-ID generation demo |
| tools | 🧠 | #FedArch governance demo |

### Demo Users

| Username | CCC | Purpose |
|----------|-----|---------|
| u-demo_user | DMO | General attendee demo |
| u-eth_user | ETH | ETHDenver-specific demo |
| a-gtm_dev | — | ADMIN (setup/management) |

### Demo Scenarios

| # | Scenario | Duration |
|---|----------|----------|
| 1 | "What is cooperative ownership?" | 2 min |
| 2 | "Show me a CCC-ID" | 1 min |
| 3 | "How does #FedArch work?" | 3 min |
| 4 | "What is OCPA Group?" | 2 min |
| 5 | "How is this different from a DAO?" | 3 min |

---

## 📋 Timeline

| Date | Day | Milestone | Owner | Status |
|------|-----|-----------|-------|--------|
| **Wed 11 Feb** | W07-D3 | PRJ-009 APPROVED + GH PUSH | @GTM | ⬜ |
| **Thu 12 Feb** | W07-D4 | Droplet created + DNS configured | @SHD | ⬜ |
| **Fri 13 Feb** | W07-D5 | Docker deployed + SSL verified | @SHD | ⬜ |
| **Sat 14 Feb** | W07-D6 | Models configured + System Prompt | @GTM + @SHD | ⬜ |
| **Sun 15 Feb** | W07-D7 | Workspaces + Users + #PinnedDocs | @GTM | ⬜ |
| **Mon 16 Feb** | W08-D1 | **🎯 #SmokeTest + ISC** | @GTM | ⬜ |
| Tue 17 Feb | W08-D2 | ETHDenver Day 1 — instance LIVE | — | ⬜ |
| **Wed 18 Feb** | W08-D3 | **PRJ-006 EVENT — demo at dinner** | @GTM | ⬜ |
| Thu-Sat 19-21 | W08-D4-6 | ETHDenver — instance available | — | ⬜ |
| **Sun 22 Feb** | W08-D7 | **PRJ-007 EVENT — demo at brunch** | @GTM | ⬜ |
| Sun 08 Mar | W10 | **DECOMMISSION** (R-214) | @SHD | ⬜ |

### Critical Path

```
Wed 11 ──→ Droplet ──→ Docker ──→ SSL ──→ Models ──→ Prompts ──→ Config ──→ #SmokeTest ──→ ISC ──→ LIVE
  PRJ-009    Thu        Fri       Fri      Sat       Sat        Sun       Mon 16          Mon 16    Tue 17
```

---

## 📋 Success Criteria

| # | Criteria | Measurement |
|---|----------|-------------|
| 1 | Instance live at ETHDenver.CCC.bot | ✅ Accessible via browser |
| 2 | ISC certified (8/8) | ✅ TMPL-010 attestation |
| 3 | CCC-ID generation works | ✅ Demo user can generate |
| 4 | #SmokeTest 8/8 | ✅ GUIDE-009 pass |
| 5 | Demo scenarios functional | ✅ 5 scenarios tested |
| 6 | Live before Mon 16 Feb | ✅ BUIDLWeek start |
| 7 | Stable during events | ✅ No outages Wed 18 + Sun 22 |

---

## 📋 Risk Matrix

| # | Risk | Probability | Impact | Mitigation |
|---|------|-------------|--------|------------|
| 1 | @SHD unavailable | 🟡 MEDIUM | 🔴 CRITICAL | @RMN backup; start Thu (4-day buffer) |
| 2 | DNS propagation delay | 🟢 LOW | 🟠 HIGH | Configure Thu, 48h buffer before Mon |
| 3 | SSL cert failure | 🟢 LOW | 🟠 HIGH | Caddy auto-LE; manual fallback |
| 4 | LLM API quota | 🟡 MEDIUM | 🟠 HIGH | Separate OpenRouter API key for INT-E01 |
| 5 | Demo traffic spike | 🟡 MEDIUM | 🟡 MEDIUM | 8 GB RAM sufficient; rate limiting |
| 6 | Embedder revert (L-107) | 🟢 LOW | 🟠 HIGH | Docker volume persists; verify post-restart |
| 7 | Content not ready | 🟢 LOW | 🟡 MEDIUM | @GTM preps prompts Sat-Sun |
| 8 | WiFi at venue | 🟡 MEDIUM | 🟠 HIGH | Mobile hotspot; pre-cache responses |
| 9 | Droplet outage | 🟢 LOW | 🔴 CRITICAL | DigitalOcean SLA; snapshot backup |
| 10 | Docker container crash | 🟡 MEDIUM | 🟠 HIGH | `restart: unless-stopped`; monitoring |

---

## 📋 Relationship to Other Projects

| PRJ | Title | Relationship |
|-----|-------|-------------|
| PRJ-006 | #SideEvent_ETHDenver2026_Wed | INT-E01 = live demo at this event |
| PRJ-007 | #SideEvent_ETHDenver2026_Sun | INT-E01 = live demo at this event |
| PRJ-008 | Technical Protocol Standard CCC | INT-E01 = showcase for CCC Standard |
| PRJ-005 | DrupalWiki | Content source for demo |

### Event → Instance Mapping

```
PRJ-006 (Wed 18 Feb dinner) ──→ INT-E01 demo
PRJ-007 (Sun 22 Feb brunch) ──→ INT-E01 demo
PRJ-008 (CCC Standard)      ──→ INT-E01 showcase
```

---

## 📋 Decommission Plan (R-214)

| # | Step | Owner | Deadline |
|---|------|-------|----------|
| 1 | Archive RAG data | @GTM_ADMIN | By Sun 01 Mar |
| 2 | Export session logs | @GTM_ADMIN | By Sun 01 Mar |
| 3 | Export user data | @GTM_ADMIN | By Sun 01 Mar |
| 4 | Docker compose down | @SHD | By Sun 08 Mar |
| 5 | DNS cleanup | @SHD | By Sun 08 Mar |
| 6 | Destroy Droplet | @SHD | By Sun 08 Mar |
| 7 | FULL:SYNC:META — decommission logged | @GTM | By Sun 08 Mar |

### Data Retention

| Data | Retain? | Where |
|------|---------|-------|
| Session logs | ✅ YES | RAG (INT-P01) — R-199 |
| Demo CCC-IDs | ✅ YES | Archived in `_SESSIONS_/` |
| System/Workspace prompts | ✅ YES | GH (fedarch) |
| User accounts | ❌ NO | Deleted with instance |
| RAG embeddings | ❌ NO | Deleted with instance |

---

## 📋 Future Ownership

| Field | Value |
|-------|-------|
| Proposed | ♾️ WeOwn.Events 📆 |
| Type | #OnchainCooperative |
| Purpose | Own/manage event instances (INT-Exx) |
| Status | 🔄 CONCEPTUAL |
| Relationship | Sub-entity of ♾️ WeOwnNet 🌐 |

---

## 📋 Discovered By (BP-047)

| CCC | Contributor | Role | Context |
|-----|-------------|------|---------|
| GTM | [yonks](https://GitHub.com/YonksTEAM) | Co-Founder / Chief Digital Alchemist | W07 Day 3 — ETHDenver demo planning + #FedArchExpansion |

---

## 📋 Related Documents

| Document | Version | Relevance |
|----------|---------|-----------|
| PRJ-006_SideEvent_ETHDenver2026_Wed | v3.1.2.1 | Wed event — demo venue |
| PRJ-007_SideEvent_ETHDenver2026_Sun | v3.1.2.1 | Sun event — demo venue |
| TMPL-010_ISC | v3.1.2.1 | ISC certification template |
| GUIDE-009_SmokeTest | v3.1.1.1 | Post-deployment verification |
| SharedKernel | v3.1.2.1 | #PinnedDoc + governance |

---

## 📋 Version History

| Version | Date | #masterCCC | Approval | Changes |
|---------|------|------------|----------|---------|
| 3.1.2.1 | 2026-W07 | GTM_2026-W07_216 | GTM_2026-W07_228 | Initial project; INT-E01 instance (D-061 Event category); 12-step deployment; DigitalOcean Droplet ATL1; Docker Compose + Caddy; demo config (5 scenarios); 10-risk matrix; decommission plan (R-214); +♾️ WeOwn.Events 📆 reference; relationship to PRJ-006/007/008; quick-start script for @SHD |

---

#FlowsBros #FedArch #FedArchExpansion #ETHDenver2026 #DigitalOcean #WeOwnSeason003

♾️ WeOwnNet 🌐 | 🏡 Real Estate and 🤝 cooperative ownership for everyone. An 🤗 inclusive community, by 👥 invitation only.



================================================
FILE: _PROJECTS_/PRJ-011_BUIDLathon_ETHDenver2026.md
================================================
# PRJ-011: #BUIDLathon — ETHDenver 2026

## 📋 PRJ-011_BUIDLathon_ETHDenver2026_v3.1.3.1.md
## ♾️ WeOwnNet 🌐

| Field | Value |
|-------|-------|
| Document | PRJ-011_BUIDLathon_ETHDenver2026.md |
| Version | 3.1.3.1 |
| CCC-ID | GTM_2026-W08_045 |
| Created | 2026-02-17 (W08) |
| Season | #WeOwnSeason003 🚀 |
| Status | ✅ APPROVED |
| Tags | #BUIDLathon #ETHDenver2026 #FedArch #WeOwnHouse #FlowsBros |

---

## 📖 Table of Contents

1. [Project Identity](#-project-identity)
2. [Event Details](#-event-details)
3. [Submission Strategy](#-submission-strategy)
4. [Project Team](#-project-team)
5. [Technology Stack](#-technology-stack)
6. [Live Instances](#-live-instances)
7. [Build Scope](#-build-scope)
8. [Timeline](#-timeline)
9. [Pitch Deck](#-pitch-deck)
10. [Demo Plan](#-demo-plan)
11. [#WeOwnHouse](#-weownhouse)
12. [Traction](#-traction)
13. [Differentiators](#-differentiators)
14. [Competitive Analysis](#-competitive-analysis)
15. [Risk Matrix](#-risk-matrix)
16. [Relationship to Other Projects](#-relationship-to-other-projects)
17. [Discovered By](#-discovered-by)
18. [Related Documents](#-related-documents)
19. [Version History](#-version-history)

---

## 📋 Project Identity

| Field | Value |
|-------|-------|
| Project ID | **PRJ-011** |
| Title | **#BUIDLathon — ETHDenver 2026** |
| Subtitle | #FedArch: Federated AI Governance for Cooperative Ownership |
| Description | ♾️ WeOwn.Dev 💻 TEAM #BUIDLathon submission — demonstrating #FedArch multi-agent AI governance + CCC attribution standard + cooperative ownership model |
| Type | Hackathon Submission |
| Track | **Decentralized AI** (primary) + DAOs & Governance (secondary) |
| Priority | 🔴 P0 |
| Owner | @GTM |
| #masterCCC | GTM_2026-W08_036 |
| One-Liner | **"5 builders. 1 house. 3 days. 5 live instances. 0 VCs. This is #FedArch."** |

---

## 📋 Event Details

| Field | Value |
|-------|-------|
| Event | ETHDenver 2026 #BUIDLathon |
| Dates | February 18-21, 2026 |
| Venue | National Western Center, Denver, CO |
| Judging | **Sat 21 Feb 2026 @ 9:00 AM MST — Vibez Lounge** |
| Projects Due | Sat 21 Feb AM |
| Build Window | Wed 18 → Fri 20 (3 days) |
| Eligibility | **IRL attendees ONLY** |
| URL | [ethdenver.com/buidl/buidlathon](https://ethdenver.com/buidl/buidlathon) |
| Schedule | [ethdenver.com](https://ethdenver.com/home/) |

### ETHDenver Week Context

| Date | Day | ETHDenver | ♾️ WeOwnNet 🌐 |
|------|-----|-----------|-----------------|
| Tue 17 Feb | Day 1 | Opening Ceremonies + Kickoff Party | Arrive Denver |
| **Wed 18 Feb** | **Day 2** | Decentralized AI Summit + ETHVC | **BUILD Day 1 + PRJ-006 Happy Hour** |
| Thu 19 Feb | Day 3 | Full Schedule | BUILD Day 2 |
| Fri 20 Feb | Day 4 | Full Schedule + #BUIDLathon ALL NIGHTER | BUILD Day 3 + FREEZE |
| **Sat 21 Feb** | **Day 5** | **Judging + Closing Ceremonies** | **DEMO @ Vibez Lounge** |
| Sun 22 Feb | Post | SporkDAO Mountain Retreat begins | **PRJ-007 BBQ** |

---

## 📋 Submission Strategy

### Approach: Existing Foundation + New Hackathon Layer

```
EXISTING (Foundation — already built, battle-tested):
├── #FedArch architecture (5 live instances)
├── CCC Standard (attribution + governance)
├── INT-E01 (ETHDenver.CCC.bot — ISC 8/8 CERTIFIED)
├── Snapshot governance (cccbot.eth)
├── AnythingLLM (self-hosted FOSS)
├── 50+ governance items (rules, BPs, learnings)
└── 100% production VSA pass rate

NEW (Built Wed-Fri at #WeOwnHouse — "hackathon layer"):
├── 🆕 Live #ContextVolley — agent-to-agent across instances
├── 🆕 CCC-ID Dashboard — real-time network visualization
├── 🆕 Cooperative Membership Flow — join via ETHDenver.CCC.bot
└── 🆕 Pitch Deck — 5-minute presentation for judging
```

### Positioning Statement

> "Most hackathon projects are built this weekend and die next week. #FedArch has been running in production for 3 months with 9 contributors across 5 instances. We're not pitching an idea — we're demonstrating a movement. And we built NEW features THIS WEEK to prove we're still shipping."

---

## 📋 Project Team

### IRL Denver — #BUIDLathon Eligible (5)

| CCC | Contributor | Role | #BUIDLathon Focus |
|-----|-------------|------|-------------------|
| GTM | yonks | Co-Founder / Chief Digital Alchemist | **Project Lead / Presenter** |
| THY | mrsyonks | Co-Founder / CEO / CFO | **Operations / #WeOwnHouse Host** |
| RMN | Roman | AI Platform Engineer | **Infrastructure / AI / MCP** |
| LDC | Dhruv | Agentic AI Engineer / Project Lead | **Lead Engineer / Dashboard** |
| LFG | CoachLFG | Co-Host / Coach / #MemeLord 👑 | **Content / Demo / Visuals** |

### #RemoteSupport (3)

| CCC | Contributor | Role | #BUIDLathon Focus | Availability |
|-----|-------------|------|-------------------|-------------|
| SHD | Shahid | Sr. Full-Stack DevOps Engineer | DevOps backup / deployment | On-call |
| IAL | IamLotus | Co-Founder / Chief Catalyst Officer | Strategy / pitch feedback | Async |
| CEO | Stephanie Warlick | xCEO (fractional) | Business model / pitch review | Async |

### Communication

| Channel | Purpose |
|---------|---------|
| Signal (♾️ WeOwn.Dev 💻) | Real-time team comms |
| #WeOwnHouse (IRL) | War room — whiteboard, screens, team |
| INT-E01 (ETHDenver.CCC.bot) | Demo instance |
| INT-P01 (AI.WeOwn.Agency) | Production #ContextVolley target |

---

## 📋 Technology Stack

### Core Stack

| Tool | Core | Our Usage | FOSS Self-Host |
|------|------|-----------|----------------|
| **AnythingLLM** | ✅ FOSS | ✅ Self-hosted | ✅ |
| **Git / GitHub** | ✅ FOSS | 💳 SaaS | ✅ (Gitea, Forgejo) |
| **Infisical** | ✅ FOSS | 💳 SaaS | ✅ (Docker/K8s) |
| **Snapshot.box** | ✅ FOSS | ✅ On-chain | ✅ |
| OpenRouter | ❌ Proprietary | 💳 SaaS | ❌ |
| DigitalOcean | ❌ Proprietary | 💳 SaaS | ❌ |

> **4/6 core tools = FOSS.** 2 self-hosted, 2 paying for SaaS convenience. #SpeedToMarket = SaaS now, self-host on roadmap.

### FOSS Philosophy

| Principle | Application |
|-----------|------------|
| **FOSS-first** | Core tools are open source |
| **SaaS for speed** | Using managed services for #SpeedToMarket |
| **Self-host roadmap** | Full stack self-hosting planned |
| **Data sovereignty** | Users own their data — always |

---

## 📋 Live Instances

| Instance | Domain | Type | ISC | Status |
|----------|--------|------|-----|--------|
| INT-P01 | AI.WeOwn.Agency | Production | 6/8 | ✅ LIVE |
| INT-P02 | Lite.BurnedOut.xyz | Production | 8/8 | ✅ LIVE + ISC |
| **INT-E01** | **ETHDenver.CCC.bot** | **🎪 Event** | **8/8** | ✅ **LIVE + ISC 🏆** |
| INT-OG1 | AI.YonksTEAM.xyz | #HomeInstance | 3/8 | ✅ LIVE |
| INT-OG8 | AI.RomanDiD.xyz | #HomeInstance | 8/8 | ✅ LIVE + ISC |

> **5 live instances. 3 ISC certified. Production-grade infrastructure — not a hackathon mock-up.**

---

## 📋 Build Scope

### Minimum Viable Demo (MVD) — MUST HAVE

| # | Feature | Owner | Status | Demo Impact |
|---|---------|-------|--------|-------------|
| 1 | INT-E01 LIVE | @GTM | ✅ **DONE** | Foundation |
| 2 | Live CCC-ID generation | @GTM | ✅ **DONE** | Foundation |
| 3 | **Agent-to-agent #ContextVolley** | @LDC + @RMN | 🔴 **BUILD** | 🔥 HIGHEST |
| 4 | **CCC-ID Dashboard** | @LDC + @SHD | 🔴 **BUILD** | 🔥 HIGH |
| 5 | **Pitch Deck** | @GTM | 🔴 **BUILD** | 🔥 HIGH |

### Stretch Goals — NICE TO HAVE

| # | Feature | Owner | Priority |
|---|---------|-------|----------|
| 6 | Cooperative Membership Demo | @GTM + @RMN | 🟠 P1 |
| 7 | Snapshot Vote (live governance) | @GTM | 🟠 P1 |
| 8 | #FedArch Network Visualization | @LDC | 🟡 P2 |
| 9 | CCC-ID On-Chain (testnet) | @RMN | 🟡 P2 |

---

## 📋 Timeline

### 3-Day Build Sprint

| Day | Date | Focus | Key Deliverables |
|-----|------|-------|-----------------|
| **Wed** | Feb 18 | **BUILD** | #ContextVolley integration + dashboard scaffold |
| **Thu** | Feb 19 | **BUILD + POLISH** | Dashboard complete + membership + pitch draft |
| **Fri** | Feb 20 | **POLISH + REHEARSE** | 3 pitch rehearsals + freeze @ 5 PM |
| **Sat** | Feb 21 | **DEMO** | 9:00 AM Vibez Lounge |

### Daily Schedule

#### Wed 18 Feb — BUILD DAY 1

| Time (MST) | Activity | Who |
|------------|---------|-----|
| 8:00 AM | Team standup @ #WeOwnHouse | ALL IRL |
| 8:30 AM | @LDC + @RMN: #ContextVolley MCP integration | LDC, RMN |
| 8:30 AM | @GTM: Submission registration + pitch outline | GTM |
| 8:30 AM | @LFG: Social content + event coverage | LFG |
| 12:00 PM | Lunch + progress check | ALL |
| 1:00 PM | @LDC: CCC-ID dashboard scaffold | LDC, SHD |
| 1:00 PM | @GTM: Pitch deck slides | GTM |
| 5:00 PM | End-of-day demo (internal) | ALL |
| **6:00 PM** | **PRJ-006 — Happy Hour @ Improper City** | **GTM, LFG** |
| 9:00 PM | Evening build session (optional) | LDC, RMN |

#### Thu 19 Feb — BUILD DAY 2

| Time (MST) | Activity | Who |
|------------|---------|-----|
| 8:00 AM | Standup | ALL IRL |
| 8:30 AM | Dashboard completion | LDC, SHD |
| 8:30 AM | Membership flow | GTM, RMN |
| 12:00 PM | Lunch + progress check | ALL |
| 1:00 PM | Pitch deck finalization | GTM, CEO (remote) |
| 3:00 PM | Internal demo #2 | ALL |
| 5:00 PM | Pitch rehearsal #1 | GTM presents, ALL critique |
| 7:00 PM | Bug fixes + polish | LDC, RMN |

#### Fri 20 Feb — POLISH + REHEARSE

| Time (MST) | Activity | Who |
|------------|---------|-----|
| 8:00 AM | Standup | ALL IRL |
| 9:00 AM | Final bug fixes | LDC, RMN |
| 11:00 AM | Pitch rehearsal #2 (timed — 5 min strict) | GTM, ALL |
| 12:00 PM | Lunch | ALL |
| 1:00 PM | Demo dry run (full setup — laptop + phone + monitor) | GTM, LDC |
| 3:00 PM | Pitch rehearsal #3 (final) | GTM, ALL |
| **5:00 PM** | **🔒 FREEZE — no more code changes** | **ALL** |
| 6:00 PM | Submission finalized | GTM |
| 8:00 PM | Early rest OR all-nighter polish | Team choice |

#### Sat 21 Feb — DEMO DAY 🏆

| Time (MST) | Activity | Who |
|------------|---------|-----|
| 7:00 AM | Systems check (INT-E01, INT-P01, dashboard) | RMN, SHD |
| 7:30 AM | Travel to National Western Center | ALL IRL |
| 8:00 AM | Setup at Vibez Lounge | GTM, LDC |
| 8:15 AM | Final dry run | GTM, LDC |
| **9:00 AM** | **🏆 #BUIDLathon Judging** | **GTM presents** |
| 10:00 AM+ | Networking + await results | ALL |
| 3:00 PM | Finalist Judging + Closing Ceremonies | ALL |
| 5:00 PM | ETHDenver Official Closing Party | ALL 🎉 |

---

## 📋 Pitch Deck

### 5-Minute Structure

| # | Slide | Duration | Content |
|---|-------|----------|---------|
| 1 | **Hook** | 30s | "What if AI could govern itself — cooperatively?" |
| 2 | **Problem** | 45s | Centralized AI = single points of failure, no governance, no attribution, no ownership |
| 3 | **Solution** | 60s | #FedArch = federated multi-agent governance + CCC attribution + cooperative ownership |
| 4 | **Live Demo** | 90s | ETHDenver.CCC.bot → CCC-ID → #ContextVolley → dashboard |
| 5 | **Architecture** | 30s | 5 instances, 9 contributors, ISC certified |
| 6 | **Differentiators** | 30s | FOSS-first, cooperative, $0 VC, data sovereignty |
| 7 | **Traction** | 15s | 3,000+ VSA checks, 100% pass rate, 50+ governance items |
| 8 | **CTA** | 15s | "Join the cooperative. Own your AI." + QR → ETHDenver.CCC.bot |

### Live Demo Script (Slide 4)

| # | Action | What Audience Sees |
|---|--------|-------------------|
| 1 | Open ETHDenver.CCC.bot on phone | Mobile-friendly AI chat |
| 2 | Type: "What is cooperative ownership?" | AI responds with CCC-ID |
| 3 | Show CCC-ID generated | `DMO_2026-W08_XXX` — unique, traceable |
| 4 | Trigger #ContextVolley | Agent sends message to INT-P01 |
| 5 | Show dashboard | CCC-ID appears on network dashboard in real-time |
| 6 | "That just happened across 2 instances, 2 cities, in 3 seconds." | 🔥 |

---

## 📋 Demo Plan

### Setup — Vibez Lounge

| Element | Detail |
|---------|--------|
| Location | Vibez Lounge, National Western Center |
| Time | Sat 21 Feb, 9:00 AM MST |
| Duration | 5 min pitch + 2 min Q&A |
| Presenter | **@GTM** (primary) + **@LDC** (technical demo) |
| Devices | Laptop (pitch deck) + Phone (live demo) + Monitor (dashboard) |

### Morning-Of Checklist

| # | Check | Owner | Time |
|---|-------|-------|------|
| 1 | INT-E01 is UP | @RMN | 7:00 AM |
| 2 | INT-P01 is UP | @SHD | 7:00 AM |
| 3 | Dashboard is LIVE | @LDC | 7:30 AM |
| 4 | WiFi tested at venue | @GTM | 8:00 AM |
| 5 | Phone hotspot backup | @GTM | 8:00 AM |
| 6 | Pitch deck loaded | @GTM | 8:00 AM |
| 7 | Demo dry run | @GTM + @LDC | 8:15 AM |
| 8 | Team in position | ALL IRL | 8:45 AM |

### Backup Plan

| Risk | Mitigation |
|------|------------|
| WiFi fails | Phone hotspot + pre-recorded demo video |
| INT-E01 down | @SHD on-call, @RMN IRL can restart |
| Dashboard fails | Show CCC-IDs directly in AnythingLLM |
| #ContextVolley fails | Pre-captured screenshot |
| Presenter sick | @LDC backup presenter |

---

## 📋 #WeOwnHouse

| Field | Value |
|-------|-------|
| Host | @THY (mrsyonks) |
| Location | Denver, CO |
| Purpose | Team HQ / war room / build space |
| Residents | 5 IRL team members |
| Daily Standup | 8:00 AM MST |

### Zones

| Zone | Purpose | Equipment |
|------|---------|-----------|
| **Build Zone** | Coding + development | Monitors, laptops, whiteboard |
| **Pitch Zone** | Rehearsal + presentation | TV/monitor, standing area |
| **Chill Zone** | Breaks + food | Kitchen, snacks, coffee |
| **Sleep Zone** | Rest | Bedrooms |

### Rules

| Rule | Detail |
|------|--------|
| Build hours | 8 AM - 10 PM (respect sleep) |
| Standup | 8:00 AM daily (non-negotiable) |
| Meals | @THY coordinates |
| Focus time | 9 AM - 12 PM = no interruptions |
| All-nighter | Fri night ONLY (if needed) |
| Content | @LFG captures throughout |

### Content Opportunities

| Content | Platform | Owner |
|---------|----------|-------|
| "Day in the life at #WeOwnHouse" | X, Instagram | @LFG |
| Build progress updates | X | @GTM |
| Team photo (all 5 IRL) | X, LinkedIn | @LFG |
| Whiteboard session video | #FlowsBros | @LFG |
| "We live together, we build together, we own together" | X thread | @GTM |

---

## 📋 Traction

| Metric | Value |
|--------|-------|
| Live instances | **5** |
| Contributors | **9** |
| CCC-IDs generated (S003) | **800+** |
| VSA checks passed | **3,000+** |
| Production VSA pass rate | **100%** |
| ISC certifications | **3** (INT-E01, INT-OG8, INT-P02) |
| Days from concept to ISC | **3** (INT-E01) |
| Governance items (S003) | **50+** |
| Cost per instance | **~$50/mo** |
| VC funding | **$0** |

---

## 📋 Differentiators

| Differentiator | Detail |
|----------------|--------|
| **Cooperative ownership** | NOT VC-backed — community-owned |
| **#ResponsibleAgenticAI** | Governance-first AI framework |
| **FOSS-first** | Core tools open source; SaaS for #SpeedToMarket |
| **#FedArch** | Federated multi-agent architecture |
| **Real-world deployment** | 5+ live instances, 9 contributors, daily use |
| **CCC Standard** | Attribution + governance on-chain |
| **Data sovereignty** | Users own their data |
| **#RWA** | Real world assets + cooperative ownership |
| **#WeOwnHouse** | IRL team co-located — building together, not just coding |

---

## 📋 Competitive Analysis

| Typical Hackathon Project | ♾️ WeOwnNet 🌐 #FedArch |
|--------------------------|-------------------------|
| Built in 48 hours, never used again | **5 live instances, 9 contributors, daily use** |
| Solo developer or pickup team | **Established team, defined roles, CCC attribution** |
| Testnet only | **Production deployed, ISC certified** |
| README + demo video | **Live demo across multiple instances** |
| "We plan to..." | **"We already did. Here's the proof."** |
| VC pitch deck | **Cooperative — $0 VC funding** |
| Single-agent AI | **Multi-agent federated governance** |
| No governance | **50+ governance items, 100% VSA pass rate** |

---

## 📋 Risk Matrix

| # | Risk | Probability | Impact | Mitigation |
|---|------|-------------|--------|------------|
| 1 | WiFi fails at venue | Medium | High | Phone hotspot + pre-recorded demo |
| 2 | INT-E01 goes down during demo | Low | Critical | @SHD on-call + @RMN IRL restart |
| 3 | #ContextVolley not ready by Fri | Medium | High | Demo existing CCC-ID generation (still impressive) |
| 4 | Dashboard not ready by Fri | Medium | Medium | Show CCC-IDs in AnythingLLM directly |
| 5 | Team member sick | Low | Medium | Backup presenter (@LDC), roles overlap |
| 6 | Judges unfamiliar with cooperative model | Medium | Medium | Pitch explains cooperative vs DAO clearly |
| 7 | Time runs over 5 min | Medium | Low | 3 rehearsals with timer |
| 8 | Live demo fails on stage | Medium | High | Pre-recorded backup video |
| 9 | Scope creep (too many features) | High | Medium | MVD defined — FREEZE at Fri 5 PM |
| 10 | Sleep deprivation | Medium | Medium | #WeOwnHouse rules — 10 PM cutoff (except Fri) |

---

## 📋 Relationship to Other Projects

| PRJ | Title | Relationship |
|-----|-------|-------------|
| PRJ-006 | #SideEvent_ETHDenver2026_Wed | Happy Hour — Wed 18 Feb @ Improper City |
| PRJ-007 | #SideEvent_ETHDenver2026_Sun | BBQ — Sun 22 Feb |
| PRJ-008 | Technical Protocol Standard CCC | @LDC proposal — potential #BUIDLathon integration |
| PRJ-009 | #FedArchExpansion — ETHDenver.CCC.bot | INT-E01 deployment (demo instance) |

### Event → Project → Instance Mapping

| Event | Project | Instance | Status |
|-------|---------|----------|--------|
| Happy Hour (Wed) | PRJ-006 | INT-E01 | ✅ LIVE |
| #BUIDLathon (Wed-Sat) | **PRJ-011** | INT-E01 + INT-P01 | ✅ **ACTIVE** |
| BBQ (Sun) | PRJ-007 | INT-E01 | ✅ LIVE |

---

## 📋 Discovered By (BP-047)

| CCC | Contributor | Role | Context |
|-----|-------------|------|---------|
| GTM | [yonks](https://GitHub.com/YonksTEAM) | Co-Founder / Chief Digital Alchemist | ETHDenver 2026 #BUIDLathon strategy session — Denver, CO |

---

## 📋 Related Documents

| Document | Version | #masterCCC | Approval | URL |
|----------|---------|------------|----------|-----|
| PRJ-006_SideEvent_ETHDenver2026_Wed | v3.1.2.1 | GTM_2026-W07_026 | GTM_2026-W07_033 | [GitHub](https://github.com/CCCbotNet/fedarch/blob/main/_PROJECTS_/PRJ-006_SideEvent_ETHDenver2026_Wed.md) |
| PRJ-007_SideEvent_ETHDenver2026_Sun | v3.1.2.1 | GTM_2026-W07_035 | — | [GitHub](https://github.com/CCCbotNet/fedarch/blob/main/_PROJECTS_/PRJ-007_SideEvent_ETHDenver2026_Sun.md) |
| PRJ-009_FedArchExpansion_ETHDenver-CCC-bot | v3.1.2.1 | GTM_2026-W07_216 | GTM_2026-W07_228 | [GitHub](https://github.com/CCCbotNet/fedarch/blob/main/_PROJECTS_/PRJ-009_FedArchExpansion_ETHDenver-CCC-bot.md) |
| SharedKernel | v3.1.2.1 | GTM_2026-W07_119 | GTM_2026-W07_122 | [GitHub](https://github.com/CCCbotNet/fedarch/blob/main/_SYS_/SharedKernel.md) |
| ISC_INT-E01 | v3.1.2.1 | GTM_2026-W07_277 | GTM_2026-W07_287 | [GitHub](https://github.com/CCCbotNet/fedarch/blob/main/_INSTANCE_/ISC_INT-E01.md) |

---

## 📋 Version History

| Version | Date | #masterCCC | Approval | Changes |
|---------|------|------------|----------|---------|
| 3.1.3.1 | 2026-W08 | GTM_2026-W08_036 | GTM_2026-W08_045 | Initial project; #BUIDLathon ETHDenver 2026; Decentralized AI track; 5 IRL + 3 remote; #WeOwnHouse HQ; MVD (3 features) + stretch (4 features); 3-day build sprint (Wed-Fri); pitch deck (8 slides, 5 min); demo plan (Vibez Lounge); 10-risk matrix; relationship to PRJ-006/007/008/009 |

---

#FlowsBros #FedArch #BUIDLathon #WeOwnHouse #ETHDenver2026 #WeOwnSeason003

♾️ WeOwnNet 🌐 ● 🏡 Real Estate and 🤝 cooperative ownership for everyone ● An 🤗 inclusive community, by 👥 invitation only.



================================================
FILE: _SYS_/BEST-PRACTICES.md
================================================
# BEST-PRACTICES.md

## 📋 BEST-PRACTICES_v3.1.2.1.md
## ♾️ WeOwnNet 🌐 — #BestPractices

| Field | Value |
|-------|-------|
| Document | BEST-PRACTICES.md |
| Version | 3.1.2.1 |
| CCC-ID | GTM_2026-W07_119 |
| Updated | 2026-02-10 (W07) |
| Season | #WeOwnSeason003 🚀 |
| Status | 🔒 LOCKED |
| Source of Truth | [GitHub](https://github.com/CCCbotNet/fedarch/blob/main/_SYS_/BEST-PRACTICES.md) |

---

## 📖 Table of Contents

1. [Overview](#-overview)
2. [Best Practices Index](#-best-practices-index)
3. [Core Best Practices (Immutable)](#-core-best-practices-immutable)
4. [Communication Best Practices](#-communication-best-practices)
5. [Workspace Configuration](#-workspace-configuration)
6. [Document Management](#-document-management)
7. [Document Generation](#-document-generation)
8. [Document Reference Standard](#-document-reference-standard)
9. [Weekly Operations](#-weekly-operations)
10. [RAG Structure](#-rag-structure-r-176)
11. [Agent Interaction](#-agent-interaction)
12. [Platform Best Practices (#AnythingLLM)](#-platform-best-practices-anythingllm)
13. [Documentation Best Practices](#-documentation-best-practices)
14. [Agent Best Practices](#-agent-best-practices)
15. [Tool Agent Best Practices](#-tool-agent-best-practices)
16. [Notes-to-RAG Best Practices](#-notes-to-rag-best-practices)
17. [MAIT Response Best Practices](#-mait-response-best-practices)
18. [Case Study Best Practices](#-case-study-best-practices)
19. [Onboarding Best Practices](#-onboarding-best-practices)
20. [#HomeInstance Best Practices](#-homeinstance-best-practices)
21. [System Prompt Best Practices](#-system-prompt-best-practices)
22. [CCC Workspace ACK Best Practices](#-ccc-workspace-ack-best-practices)
23. [USER-IDENTITY Season Refresh Best Practices](#-user-identity-season-refresh-best-practices)
24. [Season Certification Best Practices](#-season-certification-best-practices)
25. [CCC-ID Deconfliction Best Practices](#-ccc-id-deconfliction-best-practices)
26. [#WorkspaceChatHistory Best Practices](#-workspacechathistory-best-practices)
27. [INT-OGx ISC Scoping Best Practices](#-int-ogx-isc-scoping-best-practices)
28. [Version History](#-version-history)
29. [Related Documents](#-related-documents)

---

## 📋 Overview

This document contains best practices for all contributors and agents in the ♾️ WeOwnNet 🌐 ecosystem.

| Field | Value |
|-------|-------|
| Steward(s) | @GTM (yonks.box｜🤖🏛️🪙｜Jason Younker ♾️ [GH](https://GitHub.com/YonksTEAM)) + @RMN (Roman Di Domizio) |
| Source of Truth | [GitHub](https://github.com/CCCbotNet/fedarch/blob/main/_SYS_/BEST-PRACTICES.md) |

---

## 📋 BEST PRACTICES INDEX

| Range | Category | Count |
|-------|----------|-------|
| BP-001 → BP-007 | Communication | 8 |
| BP-008 → BP-009 | Platform (#AnythingLLM) | 2 |
| BP-010 → BP-014 | Documentation | 5 |
| BP-015 → BP-016 | Agent | 2 |
| BP-017 → BP-018 | Workspace Configuration | 2 |
| BP-019 | Core (Immutable) | 1 |
| BP-020 → BP-024 | Documentation (Enhanced) | 5 |
| BP-025 → BP-026 | Instance & Tool Setup | 2 |
| BP-027 → BP-035 | Notes-to-RAG | 9 |
| BP-038 → BP-041 | Additional | 4 |
| BP-043 → BP-044 | MAIT + #PinnedDocs | 2 |
| BP-045 | Document Reference Standard | 1 |
| BP-047 | Case Study Attribution | 1 |
| BP-049 | VSA / #threadHEADER | 1 |
| BP-050 | Onboarding Workflow | 1 |
| BP-051 | #HomeInstance Setup | 1 |
| BP-052 → BP-053 | Weekly Ops + Workspace Prompts | 2 |
| BP-054 | System Prompt CCC-ID Logic | 1 |
| BP-055 | Pinata.cloud Architecture | 1 |
| BP-056 | CCC Workspace ACK Header | 1 |
| BP-057 → BP-058 | USER-IDENTITY Season Refresh | 2 |
| BP-059 | Season Certification (ISC) | 1 |
| BP-060 | CCC-ID Deconfliction | 1 |
| BP-061 | #WorkspaceChatHistory | 1 |
| BP-062 | INT-OGx ISC Scoping | 1 |
| **TOTAL** | | **56** |

### Retired Best Practices

| ID | Description | Reason | Date |
|----|-------------|--------|------|
| BP-046 | Related Documents format | Merged into BP-045 | 2026-W05 |

---

## 📋 CORE BEST PRACTICES (IMMUTABLE)

| ID | Best Practice | Status |
|----|---------------|--------|
| BP-019 | ALWAYS SEEK:META for ALL documents | 🔒 IMMUTABLE |
| BP-023 | CCC-ID generation ONLY in CCC workspace — tools + ADMIN = NEVER | 🔒 IMMUTABLE |

---

## 📋 COMMUNICATION BEST PRACTICES

| ID | Best Practice | Source |
|----|---------------|--------|
| BP-001 | Use #ContextVolley for cross-agent communication (one-to-one) | — |
| BP-002 | Include CCC-ID in all communications | — |
| BP-003 | Use tables over paragraphs (#LessIsMore) | — |
| BP-004 | Always provide Quick Commands (2-3 options) | — |
| BP-005 | End responses with #feedback section when appropriate | — |
| BP-006 | Narrate actions during DEMO | GTM_2026-W03_539 |
| BP-007 | Clean slate = fresh context for unbiased view | GTM_2026-W03_545 |
| BP-041 | #ContextBroadcast for one-to-many agent communications — use 📢 emoji, TO: ALL AGENTS | GTM_2026-W05_500 |

---

## 📋 WORKSPACE CONFIGURATION

### BP-017: Workspace Prompt Per Workspace

| Workspace | Prompt Focus |
|-----------|--------------|
| CCC | User interaction, CCC-ID generation |
| tools | Strategy, SME, meta-cognition, META + MAIT threads |
| ADMIN | Administration functions, doc management |

**Best Practice:** Each workspace MUST have dedicated workspace prompt aligned with its metaphor.

### BP-018: System Prompt Per Instance

| Instance | System Prompt |
|----------|---------------|
| INT-P01 | AI.WeOwn.Agency identity |
| INT-P02 | #ProjectConnex identity |
| INT-OG1 | @GTM + @THY #HomeInstance identity |
| INT-OG8 | @RMN #HomeInstance identity |
| INT-XXX | Instance-specific identity |

**Best Practice:** Each #AnythingLLM instance MUST have unique system prompt defining its identity.

### Initial Deployment

| # | Workspace | Purpose |
|---|-----------|---------|
| 1 | tools | 🧠 THE BRAIN — META + MAIT threads |
| 2 | CCC | 🤝 THE HANDS — Production (users) |

**Best Practice:** Initial #FedArch deployment = 2 workspaces (tools + CCC).

### BP-052: #WeeklyFlows ISO Rollover

| ID | Best Practice | Approval |
|----|---------------|----------|
| BP-052 | #WeeklyFlows ISO Rollover: At Monday 00:00 boundary, AI MUST prompt "Ready to start W<XX> CCC-IDs?" — NEVER auto-rollover during active session; exception: >4h inactivity after Monday 00:00 = auto-rollover OK | GTX_2026-W05_037 |

### BP-053: Non-CCC Workspace Prompts

| ID | Best Practice | Approval |
|----|---------------|----------|
| BP-053 | ALL non-CCC workspace prompts MUST include CCC-ID restriction block — applies to: tools, ADMIN, events, P.O.P., and ANY future workspaces; prevents R-194 violations at prompt level | GTX_2026-W05_079 |

---

## 📋 DOCUMENT MANAGEMENT

### Pinning (R-177 + L-070)

| Doc Type | Pin? | Rationale |
|----------|------|-----------|
| Core protocols | ✅ YES | Every interaction |
| Rules (SHARED-KERNEL) | ✅ YES | Governance |
| Best practices | ✅ YES | Interaction patterns |
| CCC | ✅ YES | Attribution format |
| Agent identity docs | ❌ NO | System Prompt covers (L-070) |
| Reference guides | ❌ NO | RAG sufficient |
| Strategy docs | ❌ NO | RAG sufficient |
| USER-IDENTITY | ❌ NO | RAG in `_USERS_/` (L-070) |
| ECOSYSTEM-IDENTITY | ❌ NO | System Prompt covers (L-070) |

**Best Practice:** PIN only 4 docs: SharedKernel, BEST-PRACTICES, PROTOCOLS, CCC. Let RAG handle everything else.

### Versioning (R-178)

| Format | Example |
|--------|---------|
| `<NAME>_v<VERSION>.md` | SHARED-KERNEL_v3.1.1.3.md |

**Best Practice:** ALL RAG docs MUST include version in filename for visibility.

### Update Cadence (R-179)

| Trigger | Action |
|---------|--------|
| ISO week boundary + 10+ rules | MUST update |
| Major milestone | MUST update |
| Breaking change | IMMEDIATE update |

**Best Practice:** Review #SharedKernel docs at each ISO week boundary.

---

## 📋 DOCUMENT GENERATION

### R-180: #MetaAgent Generation

| Rule | Description |
|------|-------------|
| R-180 | Document generation MUST go through #MetaAgent |
| R-197 | Document generation RESERVED ONLY for #MetaAgent — User Agents MUST NEVER #COOK docs |

**Best Practice:** Agents DO NOT generate docs directly. Always SEEK:META.

---

## 📋 DOCUMENT REFERENCE STANDARD

### BP-045: Document Reference Standard (Consolidated)

| ID | Best Practice | Approval |
|----|---------------|----------|
| BP-045 | Version History + Related Documents MUST include: #masterCCC + Approval CCC-ID | GTM_2026-W05_661 |

### Applies To

| Section | Required Columns |
|---------|------------------|
| Version History | Version, Date, #masterCCC, Approval, Changes |
| Related Documents | Document, Version, #masterCCC, Approval, URL |

### Format — Version History

```markdown
| Version | Date | #masterCCC | Approval | Changes |
|---------|------|------------|----------|---------|
| 3.1.1.3 | 2026-W06 | GTM_2026-W06_277 | GTM_2026-W06_289 | +Elevated Registry; +CCCbotNet URLs |
```

### Format — Related Documents

```markdown
| Document | Version | #masterCCC | Approval | URL |
|----------|---------|------------|----------|-----|
| SharedKernel | v3.1.1.3 | GTM_2026-W06_277 | GTM_2026-W06_289 | [GitHub](...) |
```

### Consolidation

| Action | Status |
|--------|--------|
| BP-045 (old — Version History only) | ❌ RETIRED |
| BP-046 (old — Related Documents only) | ❌ RETIRED |
| BP-045 (new — Consolidated) | ✅ 🔒 LOCKED |

---

## 📋 WEEKLY OPERATIONS

### R-181: Weekly Summary

| Field | Value |
|-------|-------|
| Reserved CCC-ID | `<CCC>_<YYYY>-W<WW>_001` |
| Content | Milestones, rules, learnings, pending, stats |

**Best Practice:** First CCC-ID of each ISO week reserved for weekly summary.

### Reserved Slots (EVERY WEEK)

| Slot | Purpose | Rule |
|------|---------|------|
| `_001` | #WeeklySummary | R-181 |
| `_002` | #WeeklyPlan | R-201 |
| `_003` | #WeeklyReflection | R-202 |

### BP-039: Weekly Summary Update Process

| ID | Best Practice | Source |
|----|---------------|--------|
| BP-039 | Weekly Summary Update Process — rolling updates at threshold (+50 CCC-IDs OR +3 Learnings OR +2 BPs) | GTM_2026-W05_485 |

---

## 📋 RAG STRUCTURE (R-176)

> **#MAITlivesInAthread** — MAIT = thread within workspace:tools, NOT a separate workspace (GTM_2026-W05_237)

| Doc Type | CCC | tools | ADMIN |
|----------|-----|-------|-------|
| USER guides | ✅ | ❌ | ❌ |
| Governance guides | ❌ | ✅ | ✅ |
| User-facing protocols | ✅ | ❌ | ❌ |
| Strategy docs | ❌ | ✅ | ❌ |
| System prompts | ❌ | ❌ | ✅ |
| Instance configs | ❌ | ❌ | ✅ |
| Session notes (R-199) | ✅ | ✅ | ❌ |
| USER-IDENTITY (L-070) | ✅ | ✅ | ❌ |

**Best Practice:** Docs go in workspace matching their purpose. workspace:tools = standard for #FedArch.

---

## 📋 AGENT INTERACTION

### #ContextVolley (One-to-One)

| Best Practice | Description |
|---------------|-------------|
| Self-contained | Recipient needs NO other context |
| Include #masterCCC | Reference original request |
| Clean format | No decorative borders in packets |

### #ContextBroadcast (One-to-Many)

| Best Practice | Description |
|---------------|-------------|
| Use 📢 emoji | Distinct from 🏐 #ContextVolley |
| TO: ALL AGENTS | Explicit broadcast target |
| Types | STATUS, ANNOUNCEMENT, ALERT, ACK-REQUEST |

### #LessIsMore

| Best Practice | Description |
|---------------|-------------|
| Quick Commands | 2-3 options MAX |
| Tables > paragraphs | Structured data |
| Concise responses | No #AIslop |

### #OnlyHumanApproves

| Best Practice | Description |
|---------------|-------------|
| AI proposes | Human approves |
| NEVER auto-approve | Even if human says "2" |
| Explicit approval | Required for all rules/docs |
| STOP after Quick Commands | Await human response (L-050) |

---

## 📋 PLATFORM BEST PRACTICES (#AnythingLLM)

| ID | Best Practice | Source |
|----|---------------|--------|
| BP-008 | #AnythingLLM: Users BEFORE workspaces | GTM_2026-W03_555 |
| BP-009 | #AnythingLLM: Workspace "CCC" = shared default | GTM_2026-W03_555 |

---

## 📋 #WorkspaceChatHistory BEST PRACTICES

### BP-061: #WorkspaceChatHistory = 40

| ID | Best Practice | Approval |
|----|---------------|----------|
| BP-061 | #AnythingLLM #WorkspaceChatHistory MUST be set to **40** for ALL instances running Claude Opus 4.6 (1M token window) — applies to: INT-P01, INT-P02, INT-OG1, INT-OG8, INT-S003; setting location: Workspace Settings → Chat History; ISC Check #5 sub-check | GTM_2026-W07_075 |

### BP-061 Details

| Field | Value |
|-------|-------|
| Setting | Workspace Settings → General → Chat History |
| Default | 20 |
| Ecosystem Standard | **40** |
| Applies Per | Workspace (MUST set on EACH workspace) |
| LLM Requirement | Claude Opus 4.6 (1M token window) |

### Why 40

| Metric | ChatHistory 20 | ChatHistory 40 |
|--------|----------------|----------------|
| Conversation memory | ~20 exchanges | ~40 exchanges |
| #ContextDensity | Standard | **2× improved** |
| Session continuity | Good | **Excellent** |
| Token usage | ~10-20% of 1M | ~20-40% of 1M |
| Headroom | 80%+ unused | 60%+ for RAG + system |

### Deployment Scope

| Instance | Target | Status |
|----------|--------|--------|
| INT-P01 | 40 | ⬜ TODO |
| INT-P02 | 40 | ⬜ TODO |
| INT-OG1 | 40 | ⬜ TODO |
| INT-OG8 | 40 | ⬜ SETUP |
| INT-S003 | 40 | ⬜ NOT DEPLOYED |

### Related Items (BP-061)

| ID | Type | Description |
|----|------|-------------|
| L-116 | Learning | ChatHistory 20→40 for Claude Opus 4.6 |
| D-060 | Definition | #WorkspaceChatHistory |
| ISC Check #5 | Checklist | Sub-check for ChatHistory = 40 |

**Best Practice:** Set #WorkspaceChatHistory = 40 on EVERY workspace for Claude Opus 4.6 instances.

---

## 📋 DOCUMENTATION BEST PRACTICES

| ID | Best Practice | Source |
|----|---------------|--------|
| BP-010 | Follow #WeOwnVer versioning (v3.X.X.X for Season 3) | L-094 |
| BP-011 | Include Version History in all documents | — |
| BP-012 | Use markdown tables for structured data | — |
| BP-013 | Include Table of Contents for documents > 3 sections | — |
| BP-014 | Pin core documents in workspaces | — |
| BP-020 | When regenerating docs, EXPLICITLY preserve ALL existing sections | GTM_2026-W05_150 |
| BP-021 | Document updates should be ADDITIVE unless removal is explicitly requested | GTM_2026-W05_150 |
| BP-022 | Version History MUST include Creation CCC-ID + Approval CCC-ID | GTM_2026-W05_156 |
| BP-024 | MAIT Thread Configuration (see below) | GTM_2026-W05_242 |
| BP-040 | GH Commit Message Standard — ALL GH commits MUST use TMPL-007 format | GTM_2026-W05_490 |

### BP-024: MAIT Thread Configuration

| # | Requirement | Example |
|---|-------------|---------|
| 1 | Thread name = MAIT_<SME> | MAIT_Deepnote.com |
| 2 | workspace:tools prompt MUST include: | |
| 2a | — MAIT name | "You are MAIT_Deepnote.com..." |
| 2b | — Steward(s) assigned | Steward: @GTM |
| 2c | — MAIT ShortCode (D-038) | @MAIT:#Deepnote |
| 2d | — Relevant details | SME focus, protocols, etc. |
| 3 | Thread inheritance (L-046) | Threads inherit workspace config — no thread-level prompts |

**Best Practice:** MAIT threads MUST be fully configured with identity, steward, and ShortCode.

---

## 📋 AGENT BEST PRACTICES

| ID | Best Practice | Source |
|----|---------------|--------|
| BP-015 | NEVER leave user hanging — always provide closure | — |
| BP-016 | Use SEEK:META for cross-agent guidance | — |

---

## 📋 TOOL AGENT BEST PRACTICES

### BP-025: Instance Setup Order

| ID | Best Practice | Source |
|----|---------------|--------|
| BP-025 | #AnythingLLM new instance setup: RAG FIRST → System Prompt → Workspaces → Workspace Prompts → Threads → Verify | GTM_2026-W05_306 |

### BP-026: Tool Agent Setup Workflow

| ID | Best Practice | Source |
|----|---------------|--------|
| BP-026 | Tool Agent Setup Workflow (see below) | GTM_2026-W05_327 |

### BP-026 Steps

| # | Step | Description |
|---|------|-------------|
| 1 | Create user | Format: `t-<TOOL>_tool` (R-198) |
| 2 | Assign to workspace | workspace:tools only |
| 3 | Create MAIT thread | Format: `MAIT_<Tool>` |
| 4 | Upload RAG docs | Official tool documentation |
| 5 | Configure per BP-024 | MAIT name, Steward, ShortCode, details |
| 6 | Verify | Test retrieval + agent behavior |

**Best Practice:** Tool Agents follow standardized setup workflow for consistency.

### BP-038: Tool Agent RAG Setup

| ID | Best Practice | Source |
|----|---------------|--------|
| BP-038 | Tool Agent RAG Setup: Identify docs URL → Scrape depth 2 → workspace:tools → Verify retrieval → Update Thread Registry | GTM_2026-W05_466 |

### BP-055: Pinata.cloud Tool Agent Architecture

| ID | Best Practice | Approval |
|----|---------------|----------|
| BP-055 | Pinata.cloud Tool Agent Architecture (Hybrid): MAIT = @MAIT:#Pinata (centralized INT-P01:tools); Accounts = per-org (weownnet-ipfs, burnedout-ipfs, yonksteam-ipfs) | GTM_2026-W06_020 |

### BP-055 Details

| Component | Scope | Location |
|-----------|-------|----------|
| MAIT Thread | Centralized | INT-P01:tools |
| ShortCode | @MAIT:#Pinata | INT-P01 |
| Steward | @GTM | — |
| Accounts | Per-org | weownnet-ipfs, burnedout-ipfs, yonksteam-ipfs |

**Best Practice:** Hybrid architecture — centralized MAIT for knowledge, per-org accounts for isolation.

---

## 📋 NOTES-TO-RAG BEST PRACTICES

> **R-199:** Session notes (calls, webinars, meetings) = RAG ONLY — NEVER push to GH

### Session Capture

| ID | Best Practice | Source |
|----|---------------|--------|
| BP-027 | Set #masterCCC at session start | GTM_2026-W05_358 |
| BP-028 | Capture notes in real-time (speaker + timestamp) | GTM_2026-W05_359–370 |

### Pre-Upload

| ID | Best Practice | Source |
|----|---------------|--------|
| BP-029 | Sanitize tokens/sensitive data before RAG upload | GTM_2026-W05_381 |

### Upload Process

| ID | Best Practice | Source |
|----|---------------|--------|
| BP-032 | Run `list:docs` before AND after RAG upload | @GTM_ADMIN |
| BP-033 | Sync session notes to CCC + tools workspaces | @GTM_ADMIN |

### Verification

| ID | Best Practice | Source |
|----|---------------|--------|
| BP-030 | Cross-agent verification for RAG uploads | GTM_2026-W05_388 |
| BP-031 | Fresh session required after RAG upload | THY_2026-W05_018 |
| BP-034 | Fresh session REQUIRED for RAG verification | THY_2026-W05_018 |
| BP-035 | Include `status:RAG` in verification workflow | @GTM_ADMIN |

### Notes-to-RAG Workflow Summary

| Phase | BPs | Description |
|-------|-----|-------------|
| Capture | BP-027, BP-028 | Set #masterCCC, real-time notes |
| Sanitize | BP-029 | Remove tokens, sensitive data |
| Upload | BP-032, BP-033 | Pre/post check, multi-workspace sync |
| Verify | BP-030, BP-031, BP-034, BP-035 | Cross-agent, fresh session, status check |

### Related Documents (Notes-to-RAG)

| Document | Purpose |
|----------|---------|
| GUIDE-005_Notes-to-RAG | Step-by-step workflow |
| TEMPLATE_NOTES | Reusable notes template |
| CASE-STUDY-001_Notes-to-RAG-Workflow | Full case study |

---

## 📋 MAIT RESPONSE BEST PRACTICES

### BP-043: MAIT Thread Identity Header

| ID | Best Practice | Source |
|----|---------------|--------|
| BP-043 | MAIT responses MUST include thread identity header: ShortCode, Thread name, Steward, Instance | GTM_2026-W05_574 |

### MAIT Response Header Format

All MAIT thread responses MUST begin with:

```markdown
[<CCC-ID>] | @MAIT:#<SME> | INT-XXX

| Field | Value |
|-------|-------|
| Thread | MAIT_<SME> |
| ShortCode | @MAIT:#<SME> |
| Steward | @<CCC> |
| Instance | INT-XXX |
```

### Example — @MAIT:#connexOmni

```markdown
[LDC] | @MAIT:#connexOmni | INT-P02

| Field | Value |
|-------|-------|
| Thread | MAIT_connexOmni |
| ShortCode | @MAIT:#connexOmni |
| Steward | @LDC |
| Instance | INT-P02 |

## ✅ Response content here...
```

### Why BP-043 Matters

| Issue | Without BP-043 | With BP-043 |
|-------|----------------|-------------|
| Attribution | ❌ UNATTRIBUTABLE | ✅ Clear source |
| Debugging | ❌ Which thread? | ✅ Explicit thread |
| Audit trail | ❌ Ambiguous | ✅ Traceable |

### Related Items (BP-043)

| ID | Type | Description | URL |
|----|------|-------------|-----|
| L-059 | Learning | MAIT responses without identity header are UNATTRIBUTABLE | — |
| CASE-STUDY-003 | Case Study | MAIT Thread Identity Standard | [GitHub](https://github.com/CCCbotNet/fedarch/blob/main/_LEARNINGS_/case-studies/CASE-STUDY-003_MAIT-Thread-Identity-Standard.md) |

### BP-044: #PinnedDocs GH Push Workflow

| ID | Best Practice | Source |
|----|---------------|--------|
| BP-044 | #PinnedDocs GH Push Workflow: GH push → ADMIN updates RAG (ALL instances) → Fresh session → Verify | GTM_2026-W05_609 |

---

## 📋 CASE STUDY BEST PRACTICES

### BP-047: Case Study Attribution

| ID | Best Practice | Approval |
|----|---------------|----------|
| BP-047 | "Discovered By" section MUST use table format: CCC, Contributor, Role, Context | GTM_2026-W05_670 |

### Format — Discovered By

```markdown
### Discovered By (BP-047)

| CCC | Contributor | Role | Context |
|-----|-------------|------|---------|
| GTM | [yonks](https://GitHub.com/YonksTEAM) | Co-Founder / Chief Digital Alchemist | /dev #deployment call |
| RMN | Roman Di Domizio | AI Platform Engineer | /dev #deployment call |
```

---

## 📋 ONBOARDING BEST PRACTICES

### BP-049: #threadHEADER for Attribution

| ID | Best Practice | Approval |
|----|---------------|----------|
| BP-049 | #threadHEADER (D-047) REQUIRED for all VSA and cross-workspace operations — inherits CCC + Username from TMPL-009_USER-IDENTITY | GTM_2026-W05_767 |

### BP-050: Onboarding Workflow

| ID | Best Practice | Approval |
|----|---------------|----------|
| BP-050 | Onboarding Workflow: ADMIN creates user → assigns workspaces → uploads USER-IDENTITY to RAG → #ContextVolley to CCC → CCC ACKs → #MetaAgent logs | GTM_2026-W05_789 |

### BP-050 Steps

| # | Step | Owner | Description |
|---|------|-------|-------------|
| 1 | Create user | ADMIN | Format: `u-<ccc>_user` (R-160) |
| 2 | Assign workspaces | ADMIN | CCC, tools (standard) |
| 3 | Create USER-IDENTITY | ADMIN | Use TMPL-009 |
| 4 | Upload to RAG | ADMIN | `_USERS_/` folder |
| 5 | #ContextVolley to CCC | ADMIN | Notify CCC workspace |
| 6 | CCC ACKs | CCC Agent | Acknowledge new user |
| 7 | #MetaAgent logs | #MetaAgent | Record onboarding |

### TMPL-009: USER-IDENTITY Template

| Field | Required | Description |
|-------|----------|-------------|
| CCC | ✅ | 3-char contributor code |
| Contributor | ✅ | Full name |
| Username | ✅ | Format per R-160 |
| Role | ✅ | ADMIN / DEFAULT |
| Instance(s) | ✅ | Elevated instance assignments |
| Workspace(s) | ✅ | Workspace assignments |
| Season | ✅ | Current #WeOwnSeason (BP-058) |
| Created | ✅ | ISO date |
| Status | ✅ | ACTIVE / INACTIVE |
| Notes | ⬜ | Optional context |

### USER-IDENTITY Storage (L-070)

| Folder | Workspace | PIN? |
|--------|-----------|------|
| `_USERS_/` | CCC, tools | ❌ NO |

**Best Practice:** USER-IDENTITY docs stored in `_USERS_/` folder (RAG) — NOT pinned.

---

## 📋 #HomeInstance BEST PRACTICES

### BP-051: #HomeInstance Setup

| ID | Best Practice | Approval |
|----|---------------|----------|
| BP-051 | #HomeInstance Setup: Deploy → System Prompt → Workspaces → #PinnedDocs (4 docs) → Users → Verify #ContextVolley | GTM_2026-W05_807 |

### BP-051 Steps

| # | Step | Description |
|---|------|-------------|
| 1 | Deploy | #AnythingLLM instance at domain |
| 2 | System Prompt | Configure per TMPL-006 |
| 3 | Workspaces | Create CCC, tools (minimum) |
| 4 | #PinnedDocs | Upload 4 docs (per R-204) |
| 5 | Users | Create u-<ccc>_user, a-<ccc>_dev |
| 6 | Verify | Test #ContextVolley to #MetaAgent |

### #PinnedDocs for #HomeInstance (R-204)

| # | Document | Required |
|---|----------|----------|
| 1 | SharedKernel | ✅ YES |
| 2 | BEST-PRACTICES | ✅ YES |
| 3 | PROTOCOLS | ✅ YES |
| 4 | CCC | ✅ YES |
| **TOTAL** | **4** | |

### #HomeInstance Definition (D-048)

| Field | Value |
|-------|-------|
| Term | #HomeInstance |
| Definition | Primary personal #AnythingLLM instance for a contributor — participates in #FedArch via #ContextVolley; reports to #MetaAgent |

### #HomeInstance Verification

| Check | Description |
|-------|-------------|
| #PinnedDocs | 4 docs uploaded |
| System Prompt | Identity configured |
| Workspaces | CCC + tools created |
| Users | u-<ccc>_user created |
| #ContextVolley | Can reach #MetaAgent |

---

## 📋 INT-OGx ISC SCOPING BEST PRACTICES

### BP-062: INT-OGx ISC Check #5 Scoping

| ID | Best Practice | Approval |
|----|---------------|----------|
| BP-062 | INT-OGx ISC Check #5 scoped to CCC workspace ONLY — BP-054 (CCC-ID logic) + BP-061 (#WorkspaceChatHistory = 40) REQUIRED; BP-053 (non-CCC restriction) RECOMMENDED but NOT enforced; Production instances (INT-Pxx, INT-Mxx, INT-Sxx) = ALL workspaces enforced | GTM_2026-W07_099 |

### ISC Check #5 — Instance-Type Scoping Matrix

| Instance Type | CCC | tools | ADMIN | Other |
|---------------|-----|-------|-------|-------|
| INT-Pxx (Production) | ✅ ENFORCED | ✅ ENFORCED | ✅ ENFORCED | ✅ ENFORCED |
| INT-Mxx (META) | ✅ ENFORCED | ✅ ENFORCED | ✅ ENFORCED | ✅ ENFORCED |
| **INT-OGx (#HomeInstance)** | ✅ **ENFORCED** | 🟡 RECOMMENDED | 🟡 RECOMMENDED | 🟡 RECOMMENDED |
| INT-Sxx (Seasonal) | ✅ ENFORCED | ✅ ENFORCED | ✅ ENFORCED | ✅ ENFORCED |

### Legend

| Symbol | Meaning |
|--------|---------|
| ✅ ENFORCED | ISC Check #5 MUST PASS |
| 🟡 RECOMMENDED | Best practice but NOT ISC enforced |

### Defense-in-Depth (INT-OGx)

```
Layer 1: R-194 (IMMUTABLE)      — CCC-ID only in CCC workspace ✅ ENFORCED
Layer 2: BP-054 (System Prompt)  — Workspace-conditional logic  ✅ ENFORCED
Layer 3: BP-053 (Workspace Prompt) — Restriction block          🟡 RECOMMENDED
```

> INT-OGx has 2 of 3 layers enforced. Layer 3 = OG discretion. Acceptable risk for personal instances.

### Why BP-062 Matters

| Issue | Without BP-062 | With BP-062 |
|-------|----------------|-------------|
| ISC burden | ❌ ALL workspaces for ALL instances | ✅ Scoped by instance type |
| INT-OGx flexibility | ❌ Must configure all prompts | ✅ CCC only required |
| Governance gap | ❌ None — R-194 + BP-054 protect | ✅ Same — defense-in-depth |
| OG autonomy | ❌ Restricted | ✅ Personal domain = OG choice |

### Related Items (BP-062)

| ID | Type | Description |
|----|------|-------------|
| L-117 | Learning | INT-OGx workspace prompt policy |
| BP-053 | BP | Non-CCC restriction block (RECOMMENDED for INT-OGx) |
| BP-054 | BP | System Prompt CCC-ID logic (REQUIRED for ALL) |
| BP-061 | BP | ChatHistory = 40 (REQUIRED for CCC workspace) |
| ISC Check #5 | Checklist | Instance-type scoped verification |

**Best Practice:** INT-OGx = CCC workspace ENFORCED, all others RECOMMENDED. Production instances = ALL workspaces ENFORCED.

---

## 📋 SYSTEM PROMPT BEST PRACTICES

### BP-054: Workspace-Conditional CCC-ID Logic

| ID | Best Practice | Approval |
|----|---------------|----------|
| BP-054 | System Prompt MUST include workspace-conditional CCC-ID logic table — prevents R-194 violations at instance level | GTM_2026-W06_046 |

### BP-054 Details

System Prompt MUST include logic that:

| Workspace | CCC-ID Behavior |
|-----------|-----------------|
| CCC | ✅ GENERATE new CCC-IDs |
| tools | ❌ REFERENCE only (R-194) |
| ADMIN | ❌ REFERENCE only (R-194) |
| events | ❌ REFERENCE only (R-194) |
| P.O.P. | ❌ REFERENCE only (R-194) |
| ANY other | ❌ REFERENCE only (R-194) |

### System Prompt Template Block

```markdown
## 📋 CCC-ID GENERATION LOGIC

| Workspace | CCC-ID |
|-----------|--------|
| CCC | ✅ GENERATE |
| ALL OTHERS | ❌ REFERENCE ONLY |

### IF workspace = CCC
Generate CCC-IDs per R-168, R-169

### IF workspace ≠ CCC
Use `[REF: <USER_PROVIDED_CCC-ID>]` format
```

**Best Practice:** Prevents R-194 violations at the instance level by embedding logic in System Prompt.

---

## 📋 CCC WORKSPACE ACK BEST PRACTICES

### BP-056: CCC Workspace ACK Header

| ID | Best Practice | Approval |
|----|---------------|----------|
| BP-056 | CCC workspace ACK responses MUST include sender identity header: `FROM: AI:@<CCC> @ INT-P01:CCC` — prevents UNATTRIBUTABLE responses | GTM_2026-W06_078 |

### BP-056 Details

All ACK responses in CCC workspace MUST include:

```markdown
🏐 #ContextVolley | AI:@<CCC> → AI:@<TARGET> | <DATE> | <TIME> EST

FROM: AI:@<CCC> @ INT-P01:CCC
TO: AI:@<TARGET>
TYPE: ACK — <TYPE>
REF: <CCC-ID>
```

### Example — Proper ACK

```markdown
🏐 #ContextVolley | AI:@LFG → AI:@GTM | Mon 2026-02-03 | 14:30 EST

FROM: AI:@LFG @ INT-P01:CCC
TO: AI:@GTM
TYPE: ACK — ANNOUNCEMENT
REF: GTM_2026-W06_062
```

### Why BP-056 Matters

| Issue | Without BP-056 | With BP-056 |
|-------|----------------|-------------|
| Attribution | ❌ UNATTRIBUTABLE | ✅ Clear sender |
| Debugging | ❌ Who sent this? | ✅ Explicit source |
| Audit trail | ❌ Ambiguous | ✅ Traceable |

### Related Items (BP-056)

| ID | Type | Description |
|----|------|-------------|
| L-096 | Learning | ACK responses without sender identity are UNATTRIBUTABLE |

---

## 📋 USER-IDENTITY SEASON REFRESH BEST PRACTICES

### BP-057: USER-IDENTITY Season Refresh

| ID | Best Practice | Approval |
|----|---------------|----------|
| BP-057 | USER-IDENTITY Season refresh: ALL contributors MUST update USER-IDENTITY within 2 weeks of new #WeOwnSeason — ensures current data across #FedArch | GTM_2026-W06_120 |

### BP-058: Season Refresh Requirement

| ID | Best Practice | Approval |
|----|---------------|----------|
| BP-058 | ALL CCC Contributors MUST UPDATE/CONFIRM USER-IDENTITY within 2 weeks of NEW SEASON — Season refresh ensures current data | GTM_2026-W06_120 |

### Why Season Refresh Matters

| Issue | Without Refresh | With Refresh |
|-------|-----------------|--------------|
| Season field | ❌ Stale / missing | ✅ Current season |
| Instance refs | ❌ Legacy INT-00X | ✅ Elevated naming |
| Role accuracy | ❌ May be outdated | ✅ Verified current |
| ISC compliance | ❌ Check #6 FAILS | ✅ Check #6 PASSES |

### Season Refresh Workflow

| # | Step | Owner | Description |
|---|------|-------|-------------|
| 1 | Identify contributors | @GTM_ADMIN | List ALL active CCC holders |
| 2 | Check existing USER-IDENTITY | @GTM_ADMIN | Verify Season field |
| 3 | Update or Create | Contributor / ADMIN | Add current season, verify fields |
| 4 | Upload to RAG | @GTM_ADMIN | `_USERS_/` folder |
| 5 | Verify | @GTM_ADMIN | Fresh session + query test |

### Compliance Tracking

| Field | Value |
|-------|-------|
| Deadline | 2 weeks from season start |
| #WeOwnSeason003 deadline | Sun 15 Feb 2026 |
| Tracking | Per-contributor status in session summaries |

### Related Items (BP-057 / BP-058)

| ID | Type | Description |
|----|------|-------------|
| L-099 | Learning | Season refresh ensures current data |
| TMPL-009 | Template | USER-IDENTITY template (Season field REQUIRED) |

---

## 📋 SEASON CERTIFICATION BEST PRACTICES

### BP-059: Instance Season Certification (ISC)

| ID | Best Practice | Approval |
|----|---------------|----------|
| BP-059 | Instance Certification REQUIRED within first 2 weeks of NEW #WeOwnSeason — ALL #FedArch instances MUST pass 8-point certification checklist (ISC); generates ISC attestation | GTM_2026-W06_270 |

### ISC 8-Point Checklist

| # | Phase | Check | Pass Criteria |
|---|-------|-------|---------------|
| 1 | EMBEDDER | Embedding model verified | Qwen3 Embedding 4B |
| 2 | LLM MODEL | LLM model verified | Claude Opus 4.6 (`claude-opus-4-6`) |
| 3 | #PinnedDocs | 4 docs present | SharedKernel, BEST-PRACTICES, PROTOCOLS, CCC @ v3.X.X.X |
| 4 | SYSTEM PROMPT | Season tag | `#WeOwnSeason003 🚀` present |
| 5 | WORKSPACE PROMPTS | BP-053 + BP-054 | Non-CCC restriction + CCC-ID logic |
| 6 | USER-IDENTITY | BP-058 | Owner(s) USER-IDENTITY current |
| 7 | RAG SYNC | GitHub connector | Refreshed post-season start |
| 8 | #ContextVolley | Reachability | Can reach #MetaAgent @ INT-P01 |

### Pass Criteria

| Result | Criteria |
|--------|----------|
| ✅ CERTIFIED | 8/8 checks PASS |
| ❌ FAILED | Any check FAIL |

### ISC Workflow

| # | Step | Owner | Description |
|---|------|-------|-------------|
| 1 | Schedule | @GTM | Within 2 weeks of season start |
| 2 | Run checklist | Instance owner | Execute 8 checks |
| 3 | Generate attestation | TMPL-010 | ISC attestation document |
| 4 | FULL:SYNC:META | Instance owner | Report to #MetaAgent |
| 5 | Log | #MetaAgent | Record in governance |

### Compliance Tracking

| Field | Value |
|-------|-------|
| Deadline | 2 weeks from season start |
| #WeOwnSeason003 deadline | Sun 15 Feb 2026 |
| Template | TMPL-010_ISC |
| Instances requiring ISC | INT-P01, INT-P02, INT-OG1, INT-OG8 |

### Why ISC Matters

| Issue | Without ISC | With ISC |
|-------|-------------|----------|
| Embedder | ❌ May revert (L-107) | ✅ Verified correct |
| LLM | ❌ May be outdated | ✅ Ecosystem-approved |
| #PinnedDocs | ❌ May be stale | ✅ Current version |
| RAG | ❌ May reference old repo | ✅ CCCbotNet/fedarch |
| Governance | ❌ Instance out of sync | ✅ Certified compliant |

### Related Items (BP-059)

| ID | Type | Description |
|----|------|-------------|
| D-052 | Definition | ISC — Instance Season Certification |
| L-108 | Learning | ISC MUST verify LLM model |
| L-107 | Learning | Embedder may not persist across restarts |
| TMPL-010 | Template | ISC attestation template |

---

## 📋 CCC-ID DECONFLICTION BEST PRACTICES

### BP-060: Cross-Instance CCC-ID Deconfliction

| ID | Best Practice | Approval |
|----|---------------|----------|
| BP-060 | Cross-instance CCC-ID deconfliction — contributor MUST state highest CCC-ID when switching instances; agent MUST confirm next sequence per R-212; Tier 1 = manual, Tier 2 = #MetaAgent tracking, Tier 3 = INT-M01 centralized counter | GTM_2026-W06_392 |

### Why BP-060 Matters

| Issue | Without BP-060 | With BP-060 |
|-------|----------------|-------------|
| CCC-ID integrity | ❌ Duplicates across instances | ✅ Unique sequence guaranteed |
| R-168 compliance | ❌ Instance-local counters diverge | ✅ Contributor-level sequence maintained |
| Audit trail | ❌ Ambiguous — which _386? | ✅ Clear — one _386 per contributor per week |

### Tier 1 Workflow (Current — Manual)

| # | Step | Actor | Description |
|---|------|-------|-------------|
| 1 | Switch instance | Human | Contributor moves from Instance A → Instance B |
| 2 | State highest CCC-ID | Human | "Highest CCC-ID = `<CCC>_<YYYY>-W<WW>_<NNN>`" |
| 3 | Set next sequence | AI | Next CCC-ID = `_<NNN+1>` |
| 4 | Confirm | AI | "✅ R-212 — Continuing from `_<NNN+1>`" |

### Tier 1 Example

```
Human: "Switching from INT-OG1. Highest CCC-ID = GTM_2026-W06_386"
AI: "✅ R-212 — Continuing from GTM_2026-W06_387"
```

### Compliance Tiers

| Tier | Timeframe | Implementation | Enforcer |
|------|-----------|----------------|----------|
| **Tier 1** (NOW) | Immediate | Contributor manually states highest CCC-ID | Human |
| **Tier 2** (Mid) | #WeOwnSeason003 | #MetaAgent tracks high-water mark per contributor per week | #MetaAgent |
| **Tier 3** (Long) | INT-M01 | Centralized CCC-ID counter API — single source of truth | INT-M01 |

### Related Items (BP-060)

| ID | Type | Description |
|----|------|-------------|
| R-212 | Rule | Cross-instance CCC-ID deconfliction REQUIRED |
| L-112 | Learning | Cross-instance CCC-ID deconfliction learning |
| R-168 | Rule | CCC-ID sequence tied to contributor |
| R-169 | Rule | CCC-ID resets at ISO week boundary |
| #BadAgent #13 | Incident | First duplication — GTM_2026-W06_386 (W06) |

---

## 📋 VERSION HISTORY

| Version | Date | #masterCCC | Approval | Changes |
|---------|------|------------|----------|---------|
| 3.1.2.1 | 2026-W07 | GTM_2026-W07_119 | GTM_2026-W07_127 | +BP-061 (#WorkspaceChatHistory=40 section); +BP-062 (INT-OGx ISC Check #5 scoping section); +ISC Scoping Matrix; BP Index TOTAL → 56; TOC → 29 items; Related Documents updated (SharedKernel → v3.1.2.1); FULL PRESERVE (L-097) |
| 3.1.1.3 | 2026-W06 | GTM_2026-W06_413 | GTM_2026-W06_415 | +BP-060 (CCC-ID Deconfliction); +CCC-ID Deconfliction Best Practices section; Related Documents updated (CCC → v3.1.1.2, PROTOCOLS → v3.1.1.2, +GUIDE-006, TMPL-009 → v3.1.1.2); BP Index TOTAL → 54; TOC → 27 items; FULL PRESERVE (L-097) |
| 3.1.1.2 | 2026-W06 | GTM_2026-W06_277 | GTM_2026-W06_327 | +BP-057, BP-058, BP-059; +USER-IDENTITY Season Refresh section; +Season Certification section; ALL URLs → CCCbotNet/fedarch; ALL instances → Elevated naming; Source of Truth → CCCbotNet/fedarch; Related Docs updated; BP-056 example → INT-P01; TMPL-009 +Season field; TOC → 26 items; FULL PRESERVE (L-097) |
| 3.1.1.1 | 2026-W06 | GTM_2026-W06_080 | GTM_2026-W06_104 | 🚀 #WeOwnSeason003 RELEASE — +BP-054, BP-055, BP-056; +System Prompt Best Practices section; +CCC Workspace ACK Best Practices section; version format v2.4.X → v3.X.X.X (L-094); FULL PRESERVE from v2.4.11 base (L-097); TOC → 24 items |
| 2.4.11 | 2026-W05 | GTM_2026-W05_818 | GTM_2026-W05_820 | +BP-049, BP-050, BP-051; +Onboarding Best Practices section; +#HomeInstance Best Practices section; +TMPL-009 reference; +`_USERS_/` folder; +L-070 pinning update; SharedKernel → v2.4.16; CCC → v2.4.3; TOC → 22 items |
| 2.4.10 | 2026-W05 | GTM_2026-W05_680 | GTM_2026-W05_693 | BP-045 consolidated (BP-046 retired); +BP-047 (Case Study Attribution); +Document Reference Standard section; +Case Study Best Practices section; Related Documents restructured (hierarchical); +Reserved Slots (R-201, R-202); +21 Related Docs; TOC → 20 items |
| 2.4.9 | 2026-W05 | GTM_2026-W05_595 | GTM_2026-W05_595 | +BP-043 (MAIT Thread Identity Header); +MAIT Response Best Practices section; TOC → 18 items |
| 2.4.8 | 2026-W05 | GTM_2026-W05_512 | GTM_2026-W05_512 | +BP-041 (#ContextBroadcast); +#ContextBroadcast section in Agent Interaction; BP-024 +L-046 reference |
| 2.4.7 | 2026-W05 | GTM_2026-W05_415 | GTM_2026-W05_415 | +BP-027→BP-035 (Notes-to-RAG); +Notes-to-RAG section; SharedKernel → v2.4.10 |
| 2.4.6 | 2026-W05 | GTM_2026-W05_329 | GTM_2026-W05_329 | +BP-025, +BP-026 (Tool Agent Setup), +Tool Agent section, SharedKernel → v2.4.8 |
| 2.4.5 | 2026-W05 | GTM_2026-W05_245 | GTM_2026-W05_245 | +BP-024 (enhanced — MAIT Thread Config), SharedKernel → v2.4.7, +REF column, +#MAITlivesInAthread |
| 2.4.4 | 2026-W05 | GTM_2026-W05_182 | GTM_2026-W05_182 | +BP-023 (CCC-ID only in CCC), MAIT → tools |
| 2.4.3 | 2026-W05 | GTM_2026-W05_162 | GTM_2026-W05_162 | +BP-006 to BP-009 (recovered), +BP-020 to BP-022, Version History format, Overview section |
| 2.4.2 | 2026-W05 | — | — | +BP-017, BP-018, BP-019; pinning/versioning/cadence guidance |
| 2.4.0 | 2026-W03 | — | — | Initial release |

---

## 📋 RELATED DOCUMENTS

### #PinnedDocs

#### _SYS_

| Document | Version | #masterCCC | Approval | URL |
|----------|---------|------------|----------|-----|
| SharedKernel | **v3.1.2.1** | **GTM_2026-W07_119** | **GTM_2026-W07_122** | [GitHub](https://github.com/CCCbotNet/fedarch/blob/main/_SYS_/SharedKernel.md) |
| BEST-PRACTICES | v3.1.2.1 | GTM_2026-W07_119 | GTM_2026-W07_127 | [GitHub](https://github.com/CCCbotNet/fedarch/blob/main/_SYS_/BEST-PRACTICES.md) |
| PROTOCOLS | v3.1.1.2 | GTM_2026-W06_407 | GTM_2026-W06_409 | [GitHub](https://github.com/CCCbotNet/fedarch/blob/main/_SYS_/PROTOCOLS.md) |
| CCC | v3.1.1.2 | GTM_2026-W06_403 | GTM_2026-W06_405 | [GitHub](https://github.com/CCCbotNet/fedarch/blob/main/_SYS_/CCC.md) |
---

### Workspace Embedded RAG Documents

#### _LEARNINGS_

| Document | Version | #masterCCC | Approval | URL |
|----------|---------|------------|----------|-----|
| CASE-STUDY-001_Notes-to-RAG-Workflow | v2.4.0 | GTM_2026-W05_415 | GTM_2026-W05_415 | [GitHub](https://github.com/CCCbotNet/fedarch/blob/main/_LEARNINGS_/case-studies/CASE-STUDY-001_Notes-to-RAG-Workflow_v2.4.0.md) |
| CASE-STUDY-002_ContextBroadcast-BadAgent-Recovery | v2.4.0 | — | — | [GitHub](https://github.com/CCCbotNet/fedarch/blob/main/_LEARNINGS_/case-studies/CASE-STUDY-002_ContextBroadcast-BadAgent-Recovery.md) |
| CASE-STUDY-003_MAIT-Thread-Identity-Standard | v2.4.0 | GTM_2026-W05_579 | GTM_2026-W05_583 | [GitHub](https://github.com/CCCbotNet/fedarch/blob/main/_LEARNINGS_/case-studies/CASE-STUDY-003_MAIT-Thread-Identity-Standard.md) |
| CASE-STUDY-004_VSA-Framework-Launch | v2.4.0 | GTM_2026-W05_659 | GTM_2026-W05_670 | [GitHub](https://github.com/CCCbotNet/fedarch/blob/main/_LEARNINGS_/case-studies/CASE-STUDY-004_VSA-Framework-Launch_v2.4.0.md) |
| CASE-STUDY_AnythingLLM-RAG-Verification | v2.4.0 | — | — | [GitHub](https://github.com/CCCbotNet/fedarch/blob/main/_LEARNINGS_/case-studies/CASE-STUDY_AnythingLLM-RAG-Verification.md) |
| CASE-STUDY_GapAnalysis-BP-Recovery | v2.4.0 | — | — | [GitHub](https://github.com/CCCbotNet/fedarch/blob/main/_LEARNINGS_/case-studies/CASE-STUDY_GapAnalysis-BP-Recovery.md) |

#### _GUIDES_

| Document | Version | #masterCCC | Approval | URL |
|----------|---------|------------|----------|-----|
| GUIDE-001_GETTING-STARTED | v2.4.1 | — | — | [GitHub](https://github.com/CCCbotNet/fedarch/blob/main/_GUIDES_/GUIDE-001_GETTING-STARTED.md) |
| GUIDE-002_FEDARCH-GOVERNANCE | v2.4.0 | — | — | [GitHub](https://github.com/CCCbotNet/fedarch/blob/main/_GUIDES_/GUIDE-002_FEDARCH-GOVERNANCE.md) |
| GUIDE-003_USER-ONBOARDING | v2.4.1 | — | — | [GitHub](https://github.com/CCCbotNet/fedarch/blob/main/_GUIDES_/GUIDE-003_USER-ONBOARDING.md) |
| GUIDE-005_Notes-to-RAG | v2.4.0 | GTM_2026-W05_415 | GTM_2026-W05_415 | [GitHub](https://github.com/CCCbotNet/fedarch/blob/main/_GUIDES_/GUIDE-005_Notes-to-RAG.md) |
| GUIDE-006_GitHub-PAT-for-AnythingLLM | v3.1.1.1 | GTM_2026-W06_377 | GTM_2026-W06_380 | [GitHub](https://github.com/CCCbotNet/fedarch/blob/main/_GUIDES_/GUIDE-006_GitHub-PAT-for-AnythingLLM.md) |

#### _MISC_

| Document | Version | #masterCCC | Approval | URL |
|----------|---------|------------|----------|-----|
| FEDARCH-MEMORY-MODEL | v2.4.0 | GTM_2026-W05_262 | GTM_2026-W05_262 | [GitHub](https://github.com/CCCbotNet/fedarch/blob/main/_MISC_/FEDARCH-MEMORY-MODEL.md) |
| ECOSYSTEM-IDENTITY_SYSTEM-PROMPT | v2.4.0 | GTM_2026-W05_262 | GTM_2026-W05_262 | [GitHub](https://github.com/CCCbotNet/fedarch/blob/main/_MISC_/ECOSYSTEM-IDENTITY_SYSTEM-PROMPT.md) |

#### _TEMPLATES_

| Document | Version | #masterCCC | Approval | URL |
|----------|---------|------------|----------|-----|
| TMPL-004_ONBOARD_ADMIN | v2.4.1 | — | — | [GitHub](https://github.com/CCCbotNet/fedarch/blob/main/_TEMPLATES_/TMPL-004_ONBOARD_ADMIN.md) |
| TMPL-005_ONBOARD_USER | v2.4.0 | — | — | [GitHub](https://github.com/CCCbotNet/fedarch/blob/main/_TEMPLATES_/TMPL-005_ONBOARD_USER.md) |
| TMPL-006_SYSTEM-PROMPT-TEMPLATE | v2.4.0 | — | — | [GitHub](https://github.com/CCCbotNet/fedarch/blob/main/_TEMPLATES_/TMPL-006_SYSTEM-PROMPT-TEMPLATE.md) |
| TMPL-007_GH-COMMIT-MESSAGE | v2.4.0 | GTM_2026-W05_490 | GTM_2026-W05_490 | [GitHub](https://github.com/CCCbotNet/fedarch/blob/main/_TEMPLATES_/TMPL-007_GH-COMMIT-MESSAGE_v2.4.0.md) |
| TMPL-008_VSA | v2.4.0 | GTM_2026-W05_623 | GTM_2026-W05_625 | [GitHub](https://github.com/CCCbotNet/fedarch/blob/main/_TEMPLATES_/TMPL-008_VSA_v2.4.0.md) |
| TMPL-009_USER-IDENTITY | v3.1.1.2 | GTM_2026-W06_353 | GTM_2026-W06_370 | [GitHub](https://github.com/CCCbotNet/fedarch/blob/main/_TEMPLATES_/TMPL-009_USER-IDENTITY.md) |
| TMPL-010_ISC | v3.1.2.1 | GTM_2026-W07_071 | GTM_2026-W07_084 | [GitHub](https://github.com/CCCbotNet/fedarch/blob/main/_TEMPLATES_/TMPL-010_ISC.md) |

---

#FlowsBros #FedArch #BestPractices #WeOwnSeason003

♾️ WeOwnNet 🌐 ● 🏡 Real Estate and 🤝 cooperative ownership for everyone ● An 🤗 inclusive community, by 👥 invitation only.



================================================
FILE: _SYS_/CCC.md
================================================
## 📐 Contributor Code Convention (CCC) Standard

## CCC_v3.1.2.1.md
## ♾️ WeOwnNet 🌐 — Ecosystem Official Documentation

| Field | Value |
|-------|-------|
| Document | CCC.md |
| Version | 3.1.2.1 |
| CCC-ID | GTM_2026-W07_119 |
| Established | 2026-W02 |
| Updated | 2026-02-10 (W07) |
| Season | #WeOwnSeason003 🚀 |
| Status | 🔒 LOCKED |
| Source of Truth | [GitHub](https://github.com/CCCbotNet/fedarch/blob/main/_SYS_/CCC.md) |
| Repository | [github.com/CCCbotNet/fedarch](https://github.com/CCCbotNet/fedarch) |
| Domain | [CCCbot.Net](https://CCCbot.Net) *(coming soon)* |

---

## 📖 Table of Contents

1. [Overview](#-overview)
2. [Governance & Adoption](#-governance--adoption)
3. [CCC-ID Format Specification](#-ccc-id-format-specification)
4. [CCC-ID Rules](#-ccc-id-rules)
5. [Registered Contributor Codes](#-registered-contributor-codes)
6. [Agent Identity Format](#-agent-identity-format)
7. [Timestamp Format Standards](#-timestamp-format-standards)
8. [Priority Matrix](#-priority-matrix)
9. [Status Icons](#-status-icons)
10. [Category Emojis](#-category-emojis)
11. [CCC Template](#-ccc-template)
12. [Quick Reference Card](#-quick-reference-card)
13. [Contribution Workflow](#-contribution-workflow)
14. [Version History](#-version-history)
15. [Related Documents](#-related-documents)

---

## 📖 Overview

The **Contributor Code Convention (CCC)** is the official standard for tracking, organizing, and attributing contributions across the ♾️ WeOwnNet 🌐 ecosystem. This convention ensures:

- **Consistent Attribution** — Every contribution is properly credited
- **Traceability** — All entries can be traced back to their source
- **Collaboration** — Team members can easily reference and build upon each other's work
- **Automation-Ready** — Structured format enables tooling and automation

### Design Principles

| Principle | Description |
|-----------|-------------|
| **Human-Readable** | Entry IDs should be immediately understandable |
| **Machine-Parseable** | Format supports automated processing |
| **Chronologically Sortable** | Entries sort correctly by date |
| **Uniquely Identifiable** | No two entries share the same ID |
| **Context-Rich** | Each entry carries meaningful metadata |

### AI Collaboration

CCC entries may be created in collaboration with AI assistants. The primary AI collaboration environment for ♾️ WeOwnNet 🌐 is:

| Resource | Value |
|----------|-------|
| **AI Instance** | [AI.WeOwn.Agency](https://AI.WeOwn.Agency) |
| **AI Username** | AI:team-lfg |
| **Platform** | AnythingLLM |

### Onchain Cooperative

The CCC standard will be governed by an onchain cooperative at [CCCbot.Net](https://CCCbot.Net).

| Resource | Value |
|----------|-------|
| **Domain** | [CCCbot.Net](https://CCCbot.Net) |
| **Registrar** | Porkbun.com (Web3FreedomClub) |
| **Purpose** | Onchain cooperative for CCC governance |
| **Status** | 🔄 In Development |

---

## 🏛️ Governance & Adoption

### Formal Adoption Process

The CCC standard will be formally adopted through on-chain governance to ensure transparent, community-driven decision making.

#### Governance Proposal

| Field | Value |
|-------|-------|
| **Platform** | [snapshot.box/#/s:cccbot.eth](https://snapshot.box/#/s:cccbot.eth) |
| **Proposer** | yonks (GTM) |
| **Proposal** | CCC v2.4.0 Adoption |
| **Status** | 📋 Pending |

#### Voting Eligibility

| Team | Participation |
|------|---------------|
| ♾️ WeOwnNet 🌐 Core TEAM | ✅ Eligible |
| ♾️ WeOwn.Dev 💻 TEAM | ✅ Eligible |

### AMA / Q&A Event

An **Ask Me Anything (AMA)** session will be hosted to discuss the CCC standard, answer questions, and gather feedback before the governance vote.

| Field | Value |
|-------|-------|
| **Event** | CCC v2.4.0 AMA / Q&A |
| **Hosts** | yonks (GTM) + CoachLFG (LFG) |
| **Audience** | ♾️ WeOwnNet 🌐 Community |
| **Purpose** | Discuss CCC, answer questions, gather feedback |
| **Status** | 📋 Scheduled (TBD) |

#### AMA Agenda (Proposed)

| # | Topic | Duration |
|---|-------|----------|
| 1 | Introduction to CCC | 10 min |
| 2 | Entry ID Format Walkthrough | 10 min |
| 3 | Contributor Codes & Attribution | 10 min |
| 4 | Standards Overview (timestamps, priorities, statuses) | 10 min |
| 5 | Live Q&A | 20 min |
| 6 | Next Steps & Governance Vote | 10 min |

### Adoption Timeline

| Phase | Activity | Status |
|-------|----------|--------|
| 1 | CCC v2.4.0 Published to GitHub | ✅ Complete |
| 2 | CCCbot.Net Domain Registered | ✅ Complete |
| 3 | Share with Core TEAM (Signal) | 📋 Pending |
| 4 | AMA / Q&A Event | 📋 Scheduled |
| 5 | Governance Proposal on snapshot.box | 📋 Pending |
| 6 | Voting Period | ⬜ TBD |
| 7 | Formal Adoption (if approved) | ⬜ TBD |
| 8 | CCCbot.Net Cooperative Launch | ⬜ TBD |

---

## 🆔 CCC-ID Format Specification

### Format Structure

```
<CCC>_<YYYY>-W<WW>_<NNN>
```

### Component Breakdown

| Component | Description | Format | Example |
|-----------|-------------|--------|---------|
| `<CCC>` | Contributor Code Convention identifier | 3 uppercase letters | `GTM` |
| `_` | Primary delimiter | Underscore | `_` |
| `<YYYY>` | 4-digit year | ISO 8601 | `2026` |
| `-` | Date separator | Hyphen | `-` |
| `W` | Week indicator | Literal "W" | `W` |
| `<WW>` | ISO week number | 01-53, zero-padded | `05` |
| `_` | Secondary delimiter | Underscore | `_` |
| `<NNN>` | Sequential number | 001-999, zero-padded | `796` |

### Complete Example

```
GTM_2026-W05_796
│   │    │   │
│   │    │   └── Sequential entry #796
│   │    └────── ISO Week 05
│   └─────────── Year 2026
└─────────────── Contributor: yonks (GTM)
```

### Validation Rules

| Rule | Requirement |
|------|-------------|
| CCC Length | Exactly 3 characters |
| CCC Characters | A-Z uppercase only |
| Year Range | 2024-2099 (current era) |
| Week Range | 01-53 (ISO 8601 compliant) |
| Sequence Range | 001-999 per contributor per week |
| Delimiters | Underscores and hyphens as specified |

### RegEx Pattern

```regex
^[A-Z]{3}_[0-9]{4}-W(0[1-9]|[1-4][0-9]|5[0-3])_[0-9]{3}$
```

---

## 📋 CCC-ID Rules

### Core Rules

| ID | Rule | Description |
|----|------|-------------|
| R-168 | CCC-ID sequence tied to CCC (contributor), NOT username/session | Each contributor maintains their own sequence |
| R-169 | CCC-ID resets to _001 ONLY at ISO week boundary | Sequence resets weekly |
| R-181 | CCC-ID _001 reserved for weekly summary | First entry = weekly summary |

### Workspace Rules

| ID | Rule | Description |
|----|------|-------------|
| R-194 | CCC-ID generation ONLY in CCC workspace — tools + ADMIN = NEVER | 🔒 IMMUTABLE |

### Weekly Summary Format

| Field | Value |
|-------|-------|
| Reserved CCC-ID | `<CCC>_<YYYY>-W<WW>_001` |
| Content | Milestones, rules, learnings, pending, stats |
| Example | GTM_2026-W05_001 = @GTM Week 5 Summary |

---

## 👥 Registered Contributor Codes

### 🏛️ Founding OG ♾️ WeOwn.Agency 👥 Owners

**Established:** 2026-W02 (GTM_2026-W02_015)

> *"Forever OG"* 🫡

| CCC | Contributor | Handle | Role | Status |
|-----|-------------|--------|------|--------|
| `GTM` | yonks | yonks.box｜🤖🏛️🪙｜Jason Younker ♾️ | Co-Founder / Chief Digital Alchemist | 🏛️ Founding OG |
| `THY` | mrsyonks | Tyler Younker (mrsyonks) | Co-Founder / CEO / CFO | 🏛️ Founding OG |
| `IAL` | IamLotus | IamLotus.eth | Co-Founder / Chief Catalyst Officer | 🏛️ Founding OG |
| `RMN` | Roman | Roman Di Domizio (@LLMfeed) | AI Platform Engineer | 🏛️ Founding OG |
| `LFG` | CoachLFG | Mike LeMaire (Coach) | Co-Host / Coach | 🏛️ Founding OG |
| `JRW` | Webb | Jason Webb | xCRO (fractional Chief Revenue Officer) | 🏛️ Founding OG |

### Contributors #WeOwnSeason002

| CCC | Contributor | Handle | Role | Status | CCC Join Date |
|-----|-------------|--------|------|--------|---------------|
| `LDC` | Dhruv | — | Agentic AI Engineer / Project Lead | ✅ Active | 2026-W02 |
| `SHD` | Shahid | — | Sr. Full-Stack DevOps Engineer | ✅ Active | 2026-W02 |

### Contributors #WeOwnSeason003

| CCC | Contributor | Handle | Role | Status | CCC Join Date |
|-----|-------------|--------|------|--------|---------------|
| `CEO` | Stephanie Warlick | — | xCEO (fractional Chief Executive Officer) | ✅ Active | 2026-W07 |

### System Codes

| CCC | Purpose | Description |
|-----|---------|-------------|
| `ORG` | Organization-wide | Shared entries not attributed to individuals |
| `SYS` | System | Automated or system-generated entries |
| `TMP` | Temporary | Draft or temporary entries pending assignment |

### Code Assignment Rules

1. **Uniqueness** — Each CCC must be unique across the organization
2. **Permanence** — Once assigned, a CCC is never reassigned to another contributor
3. **Individual Attribution** — Each CCC represents an individual contributor
4. **AI Collaboration** — Entries created with AI assistance are still attributed to the human contributor's CCC

### Requesting a New CCC

New contributor codes are assigned by:
1. Request via Core TEAM channel (Signal: ♾️ WeOwn.Agency 👥)
2. Approval by existing Founding OG member
3. Registration in this document
4. Announcement in community channels

---

## 🤖 Agent Identity Format

### Overview

Each contributor has a corresponding AI agent in the #FedArch network.

> **#MAITlivesInAthread** — MAIT = thread within workspace:tools, NOT a separate workspace

### Agent Naming Convention

| Format | Example | Description |
|--------|---------|-------------|
| `AI:@<CCC>` | AI:@GTM | User Agent for contributor |
| `AI:team-lfg` | AI:team-lfg | #MetaAgent (Orchestrator) |

### MAIT ShortCode (D-038)

| Field | Value |
|-------|-------|
| Definition | Unique identifier for MAIT thread |
| Format | `@MAIT:#<SME>` |
| Example | `@MAIT:#Deepnote` |
| Note | SME-centric identifier |

### Agent Identity Table

| CCC | Human | Agent | Example MAIT ShortCode |
|-----|-------|-------|------------------------|
| GTM | @GTM | AI:@GTM | @MAIT:#Deepnote (Steward: @GTM) |
| THY | @THY | AI:@THY | — |
| IAL | @IAL | AI:@IAL | — |
| RMN | @RMN | AI:@RMN | — |
| LFG | @LFG | AI:@LFG | — |

### Related Rules

| ID | Rule |
|----|------|
| R-171 | Agent identity format: AI:@<CCC> |
| D-038 | MAIT ShortCode: @MAIT:#<SME> |

---

## ⏰ Timestamp Format Standards

### Primary Format

| Scenario | Pattern | Example |
|----------|---------|---------|
| Time known | `Dd HH:MM TZ` | `Tu 17:58 EST` |
| Time unknown | `Fullday` | `Tuesday` |

### Day Abbreviations

| Day | Abbreviation | ISO Number |
|-----|--------------|------------|
| Monday | `Mo` | 1 |
| Tuesday | `Tu` | 2 |
| Wednesday | `We` | 3 |
| Thursday | `Th` | 4 |
| Friday | `Fr` | 5 |
| Saturday | `Sa` | 6 |
| Sunday | `Su` | 7 |

### Time Zone Reference

| Abbreviation | Full Name | UTC Offset |
|--------------|-----------|------------|
| `EST` | Eastern Standard Time | UTC-5 |
| `EDT` | Eastern Daylight Time | UTC-4 |
| `CST` | Central Standard Time | UTC-6 |
| `CDT` | Central Daylight Time | UTC-5 |
| `MST` | Mountain Standard Time | UTC-7 |
| `MDT` | Mountain Daylight Time | UTC-6 |
| `PST` | Pacific Standard Time | UTC-8 |
| `PDT` | Pacific Daylight Time | UTC-7 |
| `UTC` | Coordinated Universal Time | UTC±0 |

### Examples

```
Tu 17:58 EST    → Tuesday at 5:58 PM Eastern Standard Time
Mo 09:00 UTC    → Monday at 9:00 AM UTC
Friday          → Friday (time not specified)
We 23:45 PST    → Wednesday at 11:45 PM Pacific Standard Time
```

---

## 🎯 Priority Matrix

| Priority | Label | SLA | Emoji | Description |
|----------|-------|-----|-------|-------------|
| **P0** | Critical | Today | 🔴 | Blocking issues requiring immediate attention |
| **P1** | High | This Week | 🟠 | Important items for current sprint/week |
| **P2** | Medium | Next Week | 🟡 | Planned items for near-term completion |
| **P3** | Low | Backlog | 🟢 | Nice-to-have or future consideration |

### Priority Selection Guide

| Choose P0 When... | Choose P1 When... |
|-------------------|-------------------|
| Production is down | Feature deadline this week |
| Security vulnerability | Important client request |
| Data loss risk | Team blocked on this |
| Revenue impact | Sprint commitment |

| Choose P2 When... | Choose P3 When... |
|-------------------|-------------------|
| Planned improvement | Future enhancement |
| Non-urgent bug | Research/exploration |
| Documentation update | Nice-to-have feature |
| Scheduled maintenance | Technical debt |

---

## 📊 Status Icons

### Primary Status Set

| Icon | Status | Description |
|------|--------|-------------|
| ✅ | Complete | Work finished and verified |
| 🔄 | In Progress | Actively being worked on |
| 📋 | Pending | Queued, not yet started |
| ⏳ | Blocked | Cannot proceed due to dependency |
| ⬜ | TBD | To Be Determined |

### Extended Status Set

| Icon | Status | Description |
|------|--------|-------------|
| 🚀 | Launched | Deployed to production |
| 🧪 | Testing | In QA/testing phase |
| 👀 | Review | Awaiting review/approval |
| 🔙 | Reverted | Rolled back |
| ❌ | Cancelled | Will not be completed |
| 💤 | On Hold | Paused intentionally |
| 🔁 | Recurring | Repeating task |

### Status Transitions

```
📋 Pending → 🔄 In Progress → 👀 Review → ✅ Complete → 🚀 Launched
                    ↓
                  ⏳ Blocked
                    ↓
              (resolve blocker)
                    ↓
              🔄 In Progress
```

---

## 🏷️ Category Emojis

### Core Categories

| Emoji | Category | Use Case |
|-------|----------|----------|
| 🔧 | Tools Decision | Tool selection, integration decisions |
| 🚨 | Error Resolution | Bug fixes, incident response |
| 📖 | Documentation | Docs, guides, READMEs |
| 🏗️ | Architecture | System design, infrastructure |
| 🎪 | Event Planning | Meetings, launches, community events |
| 📐 | Standards | Conventions, processes, guidelines |

### Development Categories

| Emoji | Category | Use Case |
|-------|----------|----------|
| 🐛 | Bug Fix | Bug identification and resolution |
| ✨ | Enhancement | Feature improvements |
| ♻️ | Refactor | Code restructuring |
| 🧪 | Testing | Test creation, QA activities |
| 🔐 | Security | Security-related work |
| ⚡ | Performance | Optimization work |

### Operations Categories

| Emoji | Category | Use Case |
|-------|----------|----------|
| ⚙️ | Operations | DevOps, maintenance |
| 🔍 | Health Check | Monitoring, audits |
| 📦 | Product | Product management |
| 🚀 | Launch | Deployments, releases |
| 💰 | Finance | Budget, payments, revenue |

### Creative & Growth Categories

| Emoji | Category | Use Case |
|-------|----------|----------|
| 🎨 | Creative | Design, branding, content |
| 💡 | Ideation | Brainstorming, proposals |
| 📣 | Marketing | Campaigns, outreach |
| 🎓 | Learning | Training, education |
| 📊 | Analytics | Data analysis, metrics |

### Collaboration Categories

| Emoji | Category | Use Case |
|-------|----------|----------|
| 🤝 | Collaboration | Team activities, partnerships |
| 🏛️ | Milestone | Major achievements, milestones |

---

## 📝 CCC Template

### Standard CCC Format

```markdown
> **<CCC>_<YYYY>-W<WW>_<NNN>** | <EMOJI> <Category>: <Title>
>
> | Field | Value |
> |-------|-------|
> | **Timestamp** | <Dd HH:MM TZ or Fullday> |
> | **Status** | <STATUS_ICON> <STATUS_TEXT> |
> | **Category** | <EMOJI> <Category> |
> | **Priority** | <PRIORITY_EMOJI> <PRIORITY_LABEL> |
>
> ### Description
> <Brief description of the entry>
>
> ### Details
> <Extended details, context, or notes>
>
> ### Related Entries
> - <ENTRY_ID>: <Description>
```

### Minimal CCC Format

```markdown
> **<CCC>_<YYYY>-W<WW>_<NNN>** | <EMOJI> <Category>: <Title>
> **Status:** <STATUS_ICON> <STATUS_TEXT> | **Timestamp:** <Dd HH:MM TZ>
```

### Example CCC Entry

```markdown
> **GTM_2026-W05_796** | 📐 Standards: CCC v2.4.3 Update
>
> | Field | Value |
> |-------|-------|
> | **Timestamp** | Th 17:50 EST |
> | **Status** | ✅ Complete |
> | **Category** | 📐 Standards |
> | **Priority** | 🔴 P0 - Critical |
>
> ### Description
> Added new contributor JRW (Webb) + applied #ContextSwaps.
>
> ### Details
> - +JRW: xCRO (fractional Chief Revenue Officer)
> - #ContextSwap: ccc.bot → cccid.info
> - #ContextSwap: D-038 @MAIT:#<SME> format
>
> ### Related Entries
> - GTM_2026-W05_777: @JRW onboarding #masterCCC
> - GTM_2026-W05_789: BP-050 locked
```

---

## 📇 Quick Reference Card

### CCC-ID Format
```
<CCC>_<YYYY>-W<WW>_<NNN>
Example: GTM_2026-W05_796
```

### Founding OG CCCs
| `GTM` | `THY` | `IAL` | `RMN` | `LFG` | `JRW` |
|-------|-------|-------|-------|-------|-------|
| yonks | mrsyonks | IamLotus | Roman | Coach | Webb |

### Day Codes
| Mo | Tu | We | Th | Fr | Sa | Su |
|----|----|----|----|----|----|----|

### Priorities
| 🔴 P0 | 🟠 P1 | 🟡 P2 | 🟢 P3 |
|-------|-------|-------|-------|
| Today | Week | Next | Backlog |

### Status Icons
| ✅ Done | 🔄 Progress | 📋 Pending | ⏳ Blocked | ⬜ TBD |
|---------|-------------|------------|------------|--------|

### Common Categories
| 🔧 Tools | 🚨 Error | 📖 Docs | 🏗️ Arch | 📐 Standards |
|----------|----------|---------|---------|--------------|
| 🐛 Bug | ✨ Feature | 🤝 Collab | 🚀 Launch | 🏛️ Milestone |

---

## 🔄 Contribution Workflow

### Step 1: Create Entry ID

1. Identify your CCC (e.g., `GTM`, `THY`, `IAL`)
2. Note current ISO week (e.g., `2026-W06`)
3. Get next sequential number for your CCC this week
4. Assemble: `GTM_2026-W06_341`

### Step 2: Select Metadata

1. Choose appropriate **Category** emoji
2. Set **Priority** level
3. Initialize **Status** (usually `📋 Pending` or `🔄 In Progress`)
4. Add **Timestamp**

### Step 3: Document Entry

1. Use the Entry Template
2. Write clear **Title** and **Description**
3. Link **Related Entries** if applicable
4. Add relevant details

### Step 4: Track Progress

1. Update **Status** as work progresses
2. Add notes for significant updates
3. Mark ✅ **Complete** when finished
4. Archive or reference as needed

### AI-Assisted Contributions

When creating entries with AI assistance:
1. Use your personal CCC (not a system code)
2. Reference the AI collaboration in the entry details
3. Include thread link when applicable

Example:
```markdown
### Details
- AI collaboration via AI:team-lfg at AI.WeOwn.Agency
- Thread: https://ai.weown.agency/workspace/tools/t/[thread-id]
```

---

## 📜 Version History

| Version | Date | #masterCCC | Approval | Changes |
|---------|------|------------|----------|---------|
| 3.1.2.1 | 2026-W07 | GTM_2026-W07_119 | GTM_2026-W07_132 | +CEO (Stephanie Warlick) xCEO — Contributors #WeOwnSeason003 section; Related Documents updated (SharedKernel → v3.1.2.1, BEST-PRACTICES → v3.1.2.1); FULL PRESERVE (L-097) |
| 3.1.1.2 | 2026-W06 | GTM_2026-W06_403 | GTM_2026-W06_405 | +@JRW → Founding OG table (6 total); Patch v3.1.1.1 Approval CCC-ID (GTM_2026-W06_346); +Related Documents section (BP-045); Quick Reference Card updated (6 Founding OGs); FULL PRESERVE (L-097) |
| 3.1.1.1 | 2026-W06 | GTM_2026-W06_277 | GTM_2026-W06_346 | #WeOwnSeason003 season alignment — version bump v2.4.3 → v3.1.1.1 (L-094); +Source of Truth URL (CCCbotNet/fedarch); +Season tag; Repository → CCCbotNet/fedarch; Document ID → CCC.md; #ContextSwap cccid.info → CCCbot.Net (×6); #ContextSwap snapshot.box → cccbot.eth (×2); -Adoption Signatures section; NO content changes; FULL PRESERVE (L-097) |
| 2.4.3 | 2026-W05 | GTM_2026-W05_793 | GTM_2026-W05_795 | +JRW (Webb) — xCRO; #ContextSwap: ccc.bot → cccid.info; #ContextSwap: D-038 @MAIT:#<SME> format |
| 2.4.2 | 2026-W05 | GTM_2026-W05_270 | — | +CCC-ID Rules section; +Agent Identity Format section; +Contributors (LDC, SHD); TOC → 15 items; fixes applied |
| 2.4.1 | 2026-W05 | GTM_2026-W05_262 | — | #ContextSwap: ILO → IAL; roles aligned with SharedKernel_v2.4.7 |
| 2.4.0 | 2026-W02 | GTM_2026-W02_017 | — | Initial public release; Governance & AMA process; ccc.bot domain; ♾️ WeOwnNet 🌐 branding |

---

## 📋 Related Documents

| Document | Version | #masterCCC | Approval | URL |
|----------|---------|------------|----------|-----|
| SharedKernel | **v3.1.2.1** | **GTM_2026-W07_119** | **GTM_2026-W07_122** | [GitHub](https://github.com/CCCbotNet/fedarch/blob/main/_SYS_/SharedKernel.md) |
| BEST-PRACTICES | **v3.1.2.1** | **GTM_2026-W07_119** | **GTM_2026-W07_127** | [GitHub](https://github.com/CCCbotNet/fedarch/blob/main/_SYS_/BEST-PRACTICES.md) |
| PROTOCOLS | v3.1.1.2 | GTM_2026-W06_407 | GTM_2026-W06_409 | [GitHub](https://github.com/CCCbotNet/fedarch/blob/main/_SYS_/PROTOCOLS.md) |

---

## 🔗 Links

| Resource | URL |
|----------|-----|
| **♾️ WeOwnNet 🌐** | [weown.net](https://weown.net) |
| **CCC Cooperative** | [CCCbot.Net](https://CCCbot.Net) *(coming soon)* |
| **AI Instance** | [AI.WeOwn.Agency](https://AI.WeOwn.Agency) |
| **GitHub Org** | [github.com/CCCbotNet](https://github.com/CCCbotNet) |
| **#FedArch Repository** | [github.com/CCCbotNet/fedarch](https://github.com/CCCbotNet/fedarch) |
| **Governance** | [snapshot.box/#/s:cccbot.eth](https://snapshot.box/#/s:cccbot.eth) |

---

<div align="center">

**Document ID:** `CCC.md`
**Maintained By:** Core TEAM
**Repository:** [github.com/CCCbotNet/fedarch](https://github.com/CCCbotNet/fedarch)
**Cooperative:** [CCCbot.Net](https://CCCbot.Net)

---

*♾️ WeOwnNet 🌐 | 🏡 Real Estate and 🤝 cooperative ownership for everyone. An 🤗 inclusive community, by 👥 invitation only.*



================================================
FILE: _SYS_/PROTOCOLS.md
================================================
# PROTOCOLS.md

## 📋 PROTOCOLS_v3.1.1.2.md
## ♾️ WeOwnNet 🌐 — #Protocols

| Field | Value |
|-------|-------|
| Document | PROTOCOLS.md |
| Version | 3.1.1.2 |
| CCC-ID | GTM_2026-W06_407 |
| Updated | 2026-02-07 (W06) |
| Season | #WeOwnSeason003 🚀 |
| Status | 🔒 LOCKED |
| Source of Truth | [GitHub](https://github.com/CCCbotNet/fedarch/blob/main/_SYS_/PROTOCOLS.md) |

---

## 📖 Table of Contents

1. [Protocol Index](#-protocol-index)
2. [#ContextVolley Protocol](#-contextvolley-protocol)
3. [#ContextBroadcast Protocol](#-contextbroadcast-protocol)
4. [#MetaAgent Protocol](#-metaagent-protocol)
5. [Document Management Protocol](#-document-management-protocol)
6. [Weekly Operations Protocol](#-weekly-operations-protocol)
7. [CCC-ID Protocol](#-ccc-id-protocol)
8. [CCC-ID Deconfliction Protocol](#-ccc-id-deconfliction-protocol)
9. [Version History](#-version-history)
10. [Related Documents](#-related-documents)

---

## 📋 PROTOCOL INDEX

| Protocol | Purpose |
|----------|---------|
| #ContextVolley | Agent-to-agent communication (one-to-one) |
| #ContextBroadcast | Agent-to-all communication (one-to-many) |
| #MetaAgent | Governance sync |
| Document Management | RAG operations |
| Weekly Operations | Cadence protocols |
| CCC-ID Deconfliction | Cross-instance CCC-ID sequence integrity |

---

## 📋 #ContextVolley PROTOCOL

### PURPOSE

| Field | Value |
|-------|-------|
| Direction | One-to-one |
| Use Case | Direct agent-to-agent communication |
| Emoji | 🏐 |

### FORMAT

```
═══════════════════════════════════════════════════════════════════════════════
🏐 #ContextVolley | <FROM> → <TO> | <DATE> | <TIME> EST
═══════════════════════════════════════════════════════════════════════════════

FROM: <Agent Identity>
TO: <Target Agent>
TYPE: <Message Type>
REF: <CCC-ID>

═══════════════════════════════════════════════════════════════════════════════

<CONTENT>

═══════════════════════════════════════════════════════════════════════════════

#FlowsBros #FedArch

♾️ WeOwnNet 🌐

═══════════════════════════════════════════════════════════════════════════════
```

### RULES

| ID | Rule |
|----|------|
| R-170 | MUST #ContextVolley to #MetaAgent AFTER new rules locked |
| R-044 | #ContextDensity FIRST — use #masterCCC (IMMUTABLE) |

### REQUIREMENTS

| Requirement | Description |
|-------------|-------------|
| Self-contained | Recipient needs NO other context |
| #masterCCC | Reference original request CCC-ID |
| Clean format | Tables > paragraphs |

---

## 📋 #ContextBroadcast PROTOCOL

### PURPOSE

| Field | Value |
|-------|-------|
| Definition | D-039 |
| Direction | One-to-many |
| Use Case | Announcements, status updates to ALL agents |
| Emoji | 📢 |

### FORMAT

```
═══════════════════════════════════════════════════════════════════════════════
📢 #ContextBroadcast | AI:@<FROM> → ALL AGENTS | <DATE> | <TIME> EST
═══════════════════════════════════════════════════════════════════════════════

FROM: AI:@<CCC>
TO: ALL AGENTS
TYPE: <BROADCAST TYPE>
REF: <CCC-ID>

═══════════════════════════════════════════════════════════════════════════════

<CONTENT>

═══════════════════════════════════════════════════════════════════════════════

#FlowsBros #FedArch

♾️ WeOwnNet 🌐

═══════════════════════════════════════════════════════════════════════════════
```

### BROADCAST TYPES

| Type | Description |
|------|-------------|
| STATUS | Weekly/periodic status update |
| ANNOUNCEMENT | New feature, rule, or milestone |
| ALERT | Urgent notification |
| ACK-REQUEST | Request acknowledgment from all agents |

### COMPARISON

| Protocol | Emoji | Direction | Use Case |
|----------|-------|-----------|----------|
| #ContextVolley | 🏐 | One-to-one | Direct agent-to-agent |
| #ContextBroadcast | 📢 | One-to-many | Announcements, status updates |

---

## 📋 #MetaAgent PROTOCOL

### PURPOSE

| Function | Description |
|----------|-------------|
| Governance sync | All rules flow through #MetaAgent |
| #SharedKernel | Source of truth for rules |
| Document generation | Per R-180 |

### RULES

| ID | Rule |
|----|------|
| R-172 | #MetaAgent = governance sync point for all agents |
| R-180 | Document generation MUST go through #MetaAgent |

### INTERACTION TYPES

| Type | Description |
|------|-------------|
| SEEK:META | Request guidance/generation |
| RULE LOCKED | Report locked rules |
| FULL:SYNC:META | Complete sync request |
| ACK | Acknowledgment |

---

## 📋 DOCUMENT MANAGEMENT PROTOCOL

### ROLES (R-175)

| Role | Can Manage Docs? |
|------|------------------|
| CCC | ❌ NO |
| MAIT | ❌ NO |
| ADMIN | ✅ YES |

### RAG STRUCTURE (R-176)

| Doc Type | CCC | tools | ADMIN |
|----------|-----|-------|-------|
| USER guides | ✅ | ❌ | ❌ |
| Governance guides | ❌ | ✅ | ✅ |
| User-facing protocols | ✅ | ❌ | ❌ |
| Strategy docs | ❌ | ✅ | ❌ |
| System prompts | ❌ | ❌ | ✅ |
| Instance configs | ❌ | ❌ | ✅ |

### PINNING (R-177)

| Doc Type | Pin? |
|----------|------|
| Agent identity docs | ✅ YES |
| Core protocols | ✅ YES |
| Rules (SHARED-KERNEL) | ✅ YES |
| Best practices | ✅ YES |
| Reference guides | ❌ NO |
| Strategy docs | ❌ NO |

### VERSIONING (R-178)

| Format | Example |
|--------|---------|
| `<NAME>_v<VERSION>.md` | PROTOCOLS_v3.1.1.2.md |

### GENERATION (R-180)

| Rule | Description |
|------|-------------|
| R-180 | Document generation MUST go through #MetaAgent |

**Agents DO NOT generate docs directly. Always SEEK:META.**

---

## 📋 WEEKLY OPERATIONS PROTOCOL

### UPDATE CADENCE (R-179)

| Trigger | Action |
|---------|--------|
| ISO week boundary + 10+ rules | MUST update #SharedKernel |
| Major milestone | MUST update #SharedKernel |
| Breaking change | IMMEDIATE update |

### WEEKLY SUMMARY (R-181)

| Field | Value |
|-------|-------|
| Reserved CCC-ID | `<CCC>_<YYYY>-W<WW>_001` |
| Content | Milestones, rules, learnings, pending, stats |

---

## 📋 CCC-ID PROTOCOL

### FORMAT

```
<CCC>_<YYYY>-W<WW>_<NNN>
```

| Component | Description |
|-----------|-------------|
| CCC | Contributor Code (e.g., GTM) |
| YYYY | Year |
| WW | ISO Week |
| NNN | Sequence (001-999) |

### RULES

| ID | Rule |
|----|------|
| R-168 | CCC-ID tied to CCC (contributor), NOT username/session |
| R-169 | CCC-ID resets to _001 ONLY at ISO week boundary |
| R-181 | CCC-ID _001 reserved for weekly summary |

---

## 📋 CCC-ID DECONFLICTION PROTOCOL

### PURPOSE

| Field | Value |
|-------|-------|
| Rule | R-212 |
| Purpose | Prevent CCC-ID duplication across multiple #FedArch instances |
| Trigger | Contributor generating CCC-IDs on 2+ instances in same ISO week |
| Violation | Duplication = #BadAgent |

### PROBLEM

| Scenario | Risk |
|----------|------|
| Contributor works on INT-P01 (CCC-ID _386) | Instance-local counter = _386 |
| Contributor switches to INT-OG1 (CCC-ID _386) | Instance-local counter ALSO = _386 |
| **Result** | **Duplicate CCC-ID — violates R-168** |

### RULE

| ID | Rule | Status |
|----|------|--------|
| R-212 | Cross-instance CCC-ID deconfliction REQUIRED — before generating a new CCC-ID, agent MUST verify against highest known CCC-ID for that contributor across ALL active instances in current ISO week. Highest CCC-ID across ALL instances = authoritative next sequence. Duplication = #BadAgent. | 🔒 LOCKED |

### COMPLIANCE TIERS

| Tier | Timeframe | Implementation | Enforcer |
|------|-----------|----------------|----------|
| **Tier 1** (NOW) | Immediate | Contributor manually states highest CCC-ID when switching instances | Human |
| **Tier 2** (Mid) | #WeOwnSeason003 | #MetaAgent tracks high-water mark per contributor per week | #MetaAgent |
| **Tier 3** (Long) | INT-M01 | Centralized CCC-ID counter API — single source of truth | INT-M01 |

### TIER 1 WORKFLOW (Current)

| # | Step | Actor |
|---|------|-------|
| 1 | Contributor switches to new instance | Human |
| 2 | Contributor states: "Highest CCC-ID = `<CCC>_<YYYY>-W<WW>_<NNN>`" | Human |
| 3 | Agent sets next CCC-ID = `_<NNN+1>` | AI |
| 4 | Agent confirms: "Continuing from `_<NNN+1>` per R-212" | AI |

### TIER 1 EXAMPLE

```
Human: "Switching from INT-OG1. Highest CCC-ID = GTM_2026-W06_386"
AI: "✅ R-212 — Continuing from GTM_2026-W06_387"
```

### RELATIONSHIP TO EXISTING RULES

| Rule | Relationship |
|------|-------------|
| R-168 | R-212 EXTENDS R-168 — adds cross-instance verification |
| R-169 | R-212 PROTECTS R-169 — prevents false resets from instance-local counters |
| R-194 | R-212 COMPLEMENTS R-194 — workspace-correct AND instance-aware |

### RELATED ITEMS

| Type | ID | Description |
|------|-----|-------------|
| Learning | L-112 | Cross-instance CCC-ID deconfliction learning |
| #BadAgent | #13 (W06) | First duplication incident — GTM_2026-W06_386 |

---

## 📋 VERSION HISTORY

| Version | Date | #masterCCC | Approval | Changes |
|---------|------|------------|----------|---------|
| 3.1.1.2 | 2026-W06 | GTM_2026-W06_407 | GTM_2026-W06_409 | +CCC-ID Deconfliction Protocol section (R-212); RAG Structure column MAIT → tools; +Related Documents section (BP-045); +Protocol Index entry; TOC → 10 items; FULL PRESERVE (L-097) |
| 3.1.1.1 | 2026-W06 | GTM_2026-W06_277 | GTM_2026-W06_332 | #WeOwnSeason003 season alignment — version bump v2.4.4 → v3.1.1.1 (L-094); +Source of Truth URL (CCCbotNet/fedarch); +Season tag; versioning example updated; NO content changes; FULL PRESERVE (L-097) |
| 2.4.4 | 2026-W05 | GTM_2026-W05_506 | GTM_2026-W05_512 | +#ContextBroadcast protocol section (D-039) |
| 2.4.3 | 2026-W05 | GTM_2026-W05_086 | GTM_2026-W05_086 | +R-170, R-172, R-175-R-181; doc management protocols |
| 2.4.0 | 2026-W03 | — | — | Initial release |

---

## 📋 Related Documents

| Document | Version | #masterCCC | Approval | URL |
|----------|---------|------------|----------|-----|
| SharedKernel | v3.1.1.3 | GTM_2026-W06_277 | GTM_2026-W06_289 | [GitHub](https://github.com/CCCbotNet/fedarch/blob/main/_SYS_/SharedKernel.md) |
| BEST-PRACTICES | v3.1.1.2 | GTM_2026-W06_277 | GTM_2026-W06_327 | [GitHub](https://github.com/CCCbotNet/fedarch/blob/main/_SYS_/BEST-PRACTICES.md) |
| CCC | v3.1.1.2 | GTM_2026-W06_403 | GTM_2026-W06_405 | [GitHub](https://github.com/CCCbotNet/fedarch/blob/main/_SYS_/CCC.md) |

---

#FlowsBros #FedArch #Protocols #WeOwnSeason003

♾️ WeOwnNet 🌐 ● 🏡 Real Estate and 🤝 cooperative ownership for everyone ● An 🤗 inclusive community, by 👥 invitation only.



================================================
FILE: _TEMPLATES_/TMPL-009_USER-IDENTITY.md
================================================
# TMPL-009_USER-IDENTITY.md

## 📋 TMPL-009_USER-IDENTITY_v3.1.1.2.md
## ♾️ WeOwnNet 🌐 — User Identity Template

| Field | Value |
|-------|-------|
| Template | TMPL-009_USER-IDENTITY |
| Version | 3.1.1.2 |
| CCC-ID | GTM_2026-W06_353 |
| Created | 2026-01-30 (W05) |
| Updated | 2026-02-07 (W06) |
| Season | #WeOwnSeason003 🚀 |
| Status | 🔒 LOCKED |
| Source of Truth | [GitHub](https://github.com/CCCbotNet/fedarch/blob/main/_TEMPLATES_/TMPL-009_USER-IDENTITY.md) |

---

## 📖 Table of Contents

1. [Overview](#-overview)
2. [User Identity Schema](#-user-identity-schema)
3. [Username Format Standard](#-username-format-standard)
4. [User Identity Template](#-user-identity-template)
5. [Relationship to #threadHEADER](#-relationship-to-threadheader)
6. [Usage Examples](#-usage-examples)
7. [Version History](#-version-history)

---

## 📋 Overview

### Purpose

| Use Case | Description |
|----------|-------------|
| Onboarding | Standard format for new user setup |
| Permissions | Document user role and access |
| Attribution | Static identity for #threadHEADER inheritance |
| Audit | Traceability of user assignments |
| Season Compliance | BP-058 requires Season field |
| #HomeInstance | R-209 requires #HomeInstance for ALL contributors |

### Lifecycle

| Aspect | Value |
|--------|-------|
| Created | Once per user |
| Updated | Rarely (role change, instance assignment) |
| Refreshed | Each #WeOwnSeason (BP-058) |
| Storage | RAG (persistent) |
| Type | Static |

### Related Items

| Type | ID | Description |
|------|-----|-------------|
| Definition | D-047 | #threadHEADER (dynamic attribution) |
| Definition | D-048 | #HomeInstance |
| Definition | D-058 | INT-S0x — Seasonal Shared Instance |
| Definition | D-059 | #PersonalBrand Instance |
| Learning | L-069 | VSA MUST include #threadHEADER |
| Learning | L-070 | USER-IDENTITY storage in `_USERS_/` |
| Best Practice | BP-049 | #threadHEADER required for attribution |
| Best Practice | BP-050 | Onboarding Workflow |
| Best Practice | BP-058 | USER-IDENTITY Season refresh |
| Rule | R-160 | Username format standard |
| Rule | R-209 | #HomeInstance REQUIRED for ALL contributors |
| Rule | R-210 | INT-S0x = Seasonal Shared Instance |
| Rule | R-211 | Interim assignment until INT-S0x deployed |

---

## 📋 User Identity Schema

### Required Fields

| Field | Type | Description | Example |
|-------|------|-------------|---------|
| CCC | String (3 chars) | Contributor Code Convention | `GTM` |
| Contributor | String | Full name | `yonks (Jason Younker)` |
| Username | String | #AnythingLLM username (per R-160) | `u-gtm_user` |
| Role | Enum | ADMIN / DEFAULT | `DEFAULT` |
| Instance(s) | Array | Assigned instances | `INT-P01, INT-OG1` |
| **#HomeInstance** | **String** | **Primary instance — REQUIRED (R-209)** | **`INT-OG1` or `INT-S03`** |
| Workspace(s) | Array | Assigned workspaces | `CCC` |
| Created | Date | Creation date (ISO) | `2026-01-30` |
| **Season** | String | Current #WeOwnSeason | `#WeOwnSeason003 🚀` |

### Optional Fields

| Field | Type | Description | Example |
|-------|------|-------------|---------|
| Updated | Date | Last update date (ISO) | `2026-02-07` |
| Notes | String | Additional context | `Founding OG` |
| Status | Enum | ACTIVE / INACTIVE | `ACTIVE` |
| Mode Unlocked | String | Achievement tier | `#GODx10xMODE 🔒` |

### #HomeInstance Types (R-209)

| Type | Prefix | Description | Example |
|------|--------|-------------|---------|
| #PersonalBrand | INT-OGx | Own domain, personal instance | INT-OG1 (AI.YonksTEAM.xyz) |
| Seasonal Shared | INT-S0x | Default for new contributors (R-210) | INT-S03 (#WeOwnSeason003) |
| Interim | INT-P0x | Temporary until INT-S0x deployed (R-211) | INT-P01 (AI.WeOwn.Agency) |

### Schema Change Log

| Version | Change |
|---------|--------|
| v2.4.0 | Initial schema |
| v3.1.1.1 | +Season field (REQUIRED) — BP-058 compliance |
| v3.1.1.2 | #HomeInstance → REQUIRED (R-209); +#HomeInstance Types table; +Seasonal Shared / Interim |

---

## 📋 Username Format Standard (R-160)

### Format Rules

| Role | Prefix | Suffix | Format | Example |
|------|--------|--------|--------|---------|
| ADMIN | `a-` | `_dev` | `a-<ccc>_dev` | `a-gtm_dev` |
| DEFAULT | `u-` | `_user` | `u-<ccc>_user` | `u-ldc_user` |
| Tool Agent | `t-` | `_tool` | `t-<tool>_tool` | `t-anythingllm_tool` |

### Username Components

| Component | Description | Constraint |
|-----------|-------------|------------|
| Prefix | Role indicator | `a-` / `u-` / `t-` |
| Identifier | CCC or tool name | lowercase |
| Suffix | Type indicator | `_dev` / `_user` / `_tool` |

### Validation RegEx

```regex
^(a-[a-z]{3}_dev|u-[a-z]{3}_user|t-[a-z]+_tool)$
```

---

## 📋 User Identity Template

### Template Format

```markdown
# User Identity: <CCC>

## 📋 USER-IDENTITY_<CCC>_v3.1.1.2.md
## ♾️ WeOwnNet 🌐 — User Identity Document

| Field | Value |
|-------|-------|
| Document | USER-IDENTITY_<CCC>.md |
| Version | 3.1.1.2 |
| CCC-ID | <CCC-ID> |
| Created | <YYYY-MM-DD> (W<WW>) |
| Updated | <YYYY-MM-DD> (W<WW>) |
| Season | #WeOwnSeason00X 🚀 |
| Status | 🔒 LOCKED |

---

## 📋 User Identity

| Field | Value |
|-------|-------|
| CCC | <CCC> |
| Contributor | <Full Name> |
| Username | u-<ccc>_user |
| Role | DEFAULT |
| Instance(s) | <INT-XXX, INT-XXX> |
| #HomeInstance | <INT-OGx or INT-S0x> |
| Workspace(s) | CCC |
| Created | <YYYY-MM-DD> |
| Updated | <YYYY-MM-DD> |
| Season | #WeOwnSeason00X 🚀 |
| Status | ACTIVE |

---

## 📋 Admin Identity

> ⚠️ Include ONLY if contributor has ADMIN access. Delete for DEFAULT-only users.

| Field | Value |
|-------|-------|
| Username | a-<ccc>_dev |
| Role | ADMIN |
| Instance(s) | <INT-XXX, INT-XXX> |
| Workspace(s) | CCC, tools, ADMIN |

---

## 📋 Profile

| Field | Value |
|-------|-------|
| Handle | <Display Name> |
| GitHub | [<username>](https://GitHub.com/<username>) |
| Role | <Organizational Role> |
| Status | <Status> |
| Mode Unlocked | <Achievement> |

---

## 📋 #HomeInstance

> **R-209:** Every contributor MUST have a #HomeInstance.
> - **#PersonalBrand:** INT-OGx — use this section
> - **Seasonal Shared:** INT-S0x — use Seasonal Instance section instead
> **ONE of these two sections is ALWAYS required.**

| Field | Value |
|-------|-------|
| Instance | <INT-OGx> |
| Name | <domain> |
| Type | #PersonalBrand |
| Owner(s) | @<CCC> |
| Status | ✅ ACTIVE / ⬜ PLANNED / 🔄 SETUP |

---

## 📋 Seasonal Instance

> **R-210:** INT-S0x = Seasonal Shared Instance — default for new contributors.
> Include this section instead of #HomeInstance for Seasonal Shared users.
> **ONE of these two sections is ALWAYS required (R-209).**

| Field | Value |
|-------|-------|
| Instance | <INT-S0x> |
| Season | <#WeOwnSeasonXXX> |
| Type | Seasonal Shared |
| Status | ✅ ACTIVE / ⬜ PLANNED |
| Interim | <INT-P01 or INT-P02> *(only if INT-S0x not yet deployed — R-211)* |

---

## 📋 Instance Access

| Instance | Name | Role | Status |
|----------|------|------|--------|
| <INT-XXX> | <domain> | User / User + Admin / User (#HomeInstance) | ✅ ACTIVE / ⬜ PLANNED |

---

## 📋 #FedArch Participation

| Field | Value |
|-------|-------|
| Reports To | #MetaAgent (INT-P01) |
| Protocol | #ContextVolley |
| Authority | <Role / Achievement>, SEEK:META for governance |
| #HomeInstance | <INT-OGx or INT-S0x> |

---

## 📋 Version History

| Version | Date | #masterCCC | Approval | Changes |
|---------|------|------------|----------|---------|
| 3.1.1.2 | 2026-W06 | <CCC-ID> | <CCC-ID> | Initial creation |

---

#FlowsBros #FedArch #UserIdentity #WeOwnSeason00X

♾️ WeOwnNet 🌐 | 🏡 Real Estate and 🤝 cooperative ownership for everyone. An 🤗 inclusive community, by 👥 invitation only.
```

### Blank Template

```markdown
# User Identity: ___

## 📋 User Identity

| Field | Value |
|-------|-------|
| CCC | ___ |
| Contributor | ___ |
| Username | ___ |
| Role | ___ |
| Instance(s) | ___ |
| #HomeInstance | ___ |
| Workspace(s) | ___ |
| Created | ___ |
| Season | #WeOwnSeason00X 🚀 |
| Updated | ___ |
| Status | ACTIVE |

## 📋 #HomeInstance / Seasonal Instance

> Choose ONE (R-209):

| Field | Value |
|-------|-------|
| Instance | ___ |
| Type | #PersonalBrand / Seasonal Shared |
| Status | ___ |

## 📋 Notes

___

---

#FlowsBros #FedArch #UserIdentity

♾️ WeOwnNet 🌐 | 🏡 Real Estate and 🤝 cooperative ownership for everyone. An 🤗 inclusive community, by 👥 invitation only.
```

---

## 📋 Relationship to #threadHEADER

### Static vs Dynamic

| Aspect | TMPL-009 (Static) | D-047 (Dynamic) |
|--------|-------------------|-----------------|
| Purpose | WHO is the user | WHERE is the action |
| Lifecycle | Long-lived | Per-operation |
| Storage | RAG | Inline |
| Changes | Rarely (+ each Season) | Every thread |

### Inheritance Diagram

```
┌─────────────────────────────────────────────────────────────────┐
│                    TMPL-009_USER-IDENTITY                       │
│                    (Static — WHO)                               │
│                                                                 │
│   CCC: GTM ─────────────────────────────────┐                  │
│   Username: u-gtm_user ─────────────────────┤                  │
│   Role: DEFAULT                             │                  │
│   Instances: INT-P01, INT-OG1               │ inherits         │
│   #HomeInstance: INT-OG1                    │                  │
│   Workspaces: CCC                           │                  │
│   Season: #WeOwnSeason003 🚀                │                  │
│                                             ↓                  │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ↓
┌─────────────────────────────────────────────────────────────────┐
│                    D-047: #threadHEADER                         │
│                    (Dynamic — WHERE)                            │
│                                                                 │
│   CCC: GTM ←────────────────── inherited                       │
│   Username: u-gtm_user ←────── inherited                       │
│   Instance: INT-P01 ←───────── current session                 │
│   Workspace: CCC ←──────────── current session                 │
│   Thread UUID: 62b10159-... ←─ current thread                  │
│   Timestamp: Sa 12:45 EST ←─── now                             │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

### #threadHEADER Format (D-047)

```markdown
## 📋 Thread Context

| Field | Value |
|-------|-------|
| CCC | <CCC> |
| Username | <username> |
| Instance | <INT-XXX> |
| Workspace | <workspace> |
| Thread UUID | <UUID> |
| Thread URL | <URL> |
| Timestamp | <Dd HH:MM TZ> |
```

### Shorthand Format

```
<CCC>:<username>@<INT-XXX>:<workspace>:<UUID>
```

---

## 📋 Usage Examples

### Example 1: Founding OG with #PersonalBrand (#HomeInstance)

```markdown
# User Identity: GTM

## 📋 USER-IDENTITY_GTM_v3.1.1.2.md
## ♾️ WeOwnNet 🌐 — User Identity Document

| Field | Value |
|-------|-------|
| Document | USER-IDENTITY_GTM.md |
| Version | 3.1.1.2 |
| CCC-ID | GTM_2026-W06_353 |
| Created | 2026-01-30 (W05) |
| Updated | 2026-02-07 (W06) |
| Season | #WeOwnSeason003 🚀 |
| Status | 🔒 LOCKED |

---

## 📋 User Identity

| Field | Value |
|-------|-------|
| CCC | GTM |
| Contributor | yonks (Jason Younker) |
| Username | u-gtm_user |
| Role | DEFAULT |
| Instance(s) | INT-P01, INT-OG1 |
| #HomeInstance | INT-OG1 |
| Workspace(s) | CCC |
| Created | 2026-01-30 |
| Updated | 2026-02-07 |
| Season | #WeOwnSeason003 🚀 |
| Status | ACTIVE |

---

## 📋 Admin Identity

| Field | Value |
|-------|-------|
| Username | a-gtm_dev |
| Role | ADMIN |
| Instance(s) | INT-P01, INT-OG1 |
| Workspace(s) | CCC, tools, ADMIN |

---

## 📋 Profile

| Field | Value |
|-------|-------|
| Handle | yonks.box｜🤖🏛️🪙｜Jason Younker ♾️ |
| GitHub | [YonksTEAM](https://GitHub.com/YonksTEAM) |
| Role | Co-Founder / Chief Digital Alchemist & Architect for #ResponsibleAgenticAI |
| Status | 🏛️ Founding OG |
| Mode Unlocked | **#GODx10xMODE** 🔒 |

---

## 📋 #HomeInstance

| Field | Value |
|-------|-------|
| Instance | INT-OG1 |
| Name | AI.YonksTEAM.xyz |
| Type | #PersonalBrand |
| Owners | @GTM + @THY |
| Status | ✅ ACTIVE |

---

## 📋 Instance Access

| Instance | Name | Role | Status |
|----------|------|------|--------|
| INT-P01 | AI.WeOwn.Agency | User + Admin | ✅ ACTIVE |
| INT-OG1 | AI.YonksTEAM.xyz | User + Admin (#HomeInstance) | ✅ ACTIVE |

---

## 📋 #FedArch Participation

| Field | Value |
|-------|-------|
| Reports To | #MetaAgent (INT-P01) |
| Protocol | #ContextVolley |
| Authority | Founding OG, #GODx10xMODE |
| #HomeInstance | INT-OG1 |

---

#FlowsBros #FedArch #UserIdentity #HomeInstance #GODx10xMODE #WeOwnSeason003

♾️ WeOwnNet 🌐
```

### Example 2: Contributor on Seasonal Shared Instance

```markdown
# User Identity: NEW

## 📋 USER-IDENTITY_NEW_v3.1.1.2.md
## ♾️ WeOwnNet 🌐 — User Identity Document

| Field | Value |
|-------|-------|
| Document | USER-IDENTITY_NEW.md |
| Version | 3.1.1.2 |
| CCC-ID | NEW_2026-W06_001 |
| Created | 2026-02-07 (W06) |
| Season | #WeOwnSeason003 🚀 |
| Status | 🔒 LOCKED |

---

## 📋 User Identity

| Field | Value |
|-------|-------|
| CCC | NEW |
| Contributor | New Contributor |
| Username | u-new_user |
| Role | DEFAULT |
| Instance(s) | INT-S03 |
| #HomeInstance | INT-S03 |
| Workspace(s) | CCC |
| Created | 2026-02-07 |
| Season | #WeOwnSeason003 🚀 |
| Status | ACTIVE |

---

## 📋 Profile

| Field | Value |
|-------|-------|
| Handle | New Contributor |
| Role | Community Member |
| Status | ✅ Active |

---

## 📋 Seasonal Instance

| Field | Value |
|-------|-------|
| Instance | INT-S03 |
| Season | #WeOwnSeason003 |
| Type | Seasonal Shared |
| Status | ✅ ACTIVE |

---

## 📋 Instance Access

| Instance | Name | Role | Status |
|----------|------|------|--------|
| INT-S03 | Seasonal Shared | User (#HomeInstance) | ✅ ACTIVE |

---

## 📋 #FedArch Participation

| Field | Value |
|-------|-------|
| Reports To | #MetaAgent (INT-P01) |
| Protocol | #ContextVolley |
| Authority | User, SEEK:META for governance |
| #HomeInstance | INT-S03 |

---

#FlowsBros #FedArch #UserIdentity #WeOwnSeason003

♾️ WeOwnNet 🌐
```

### Example 3: Contributor with Interim Assignment (R-211)

```markdown
# User Identity: LDC

## 📋 User Identity

| Field | Value |
|-------|-------|
| CCC | LDC |
| Contributor | Dhruv Malik |
| Username | u-ldc_user |
| Role | DEFAULT |
| Instance(s) | INT-P01, INT-P02 |
| #HomeInstance | INT-S03 |
| Workspace(s) | CCC |
| Created | 2026-02-04 |
| Season | #WeOwnSeason003 🚀 |
| Status | ACTIVE |

---

## 📋 Profile

| Field | Value |
|-------|-------|
| Handle | Dhruv Malik (@LDC) |
| Role | Agentic AI Engineer / Project Lead |
| Status | ✅ Active |

---

## 📋 Seasonal Instance

| Field | Value |
|-------|-------|
| Instance | INT-S03 |
| Season | #WeOwnSeason003 |
| Type | Seasonal Shared |
| Status | ⬜ PLANNED |
| Interim | INT-P01 (R-211) |

---

## 📋 Instance Access

| Instance | Name | Role | Status |
|----------|------|------|--------|
| INT-P01 | AI.WeOwn.Agency | User (Interim — R-211) | ✅ ACTIVE |
| INT-P02 | Lite.BurnedOut.xyz | User | ✅ ACTIVE |
| INT-S03 | Seasonal Shared | User (#HomeInstance) | ⬜ PLANNED |

---

## 📋 #FedArch Participation

| Field | Value |
|-------|-------|
| Reports To | #MetaAgent (INT-P01) |
| Protocol | #ContextVolley |
| Authority | User, SEEK:META for governance |
| #HomeInstance | INT-S03 (Interim: INT-P01) |

---

## 📋 Notes

Agentic AI Platform Engineer. #ProjectConnex.

---

#FlowsBros #FedArch #UserIdentity

♾️ WeOwnNet 🌐
```

### Example 4: Tool Agent

```markdown
# User Identity: t-pinata_tool

## 📋 User Identity

| Field | Value |
|-------|-------|
| CCC | — |
| Contributor | Tool Agent |
| Username | t-pinata_tool |
| Role | DEFAULT |
| Instance(s) | INT-P01 |
| Workspace(s) | tools |
| Created | 2026-02-03 |
| Season | #WeOwnSeason003 🚀 |
| Status | ACTIVE |

## 📋 Notes

Pinata.cloud Tool Agent. Steward: @GTM. ShortCode: @MAIT:#Pinata.

---

#FlowsBros #FedArch #UserIdentity

♾️ WeOwnNet 🌐
```

---

## 📋 Version History

| Version | Date | #masterCCC | Approval | Changes |
|---------|------|------------|----------|---------|
| 3.1.1.2 | 2026-W06 | GTM_2026-W06_353 | GTM_2026-W06_370 | #HomeInstance → REQUIRED (R-209); +#HomeInstance Types table; +Seasonal Instance section (R-210); +Interim field (R-211); +D-058, D-059 refs; conditional logic (ONE always required); +Seasonal example; +Interim example (LDC); Elevated naming throughout; Source of Truth → CCCbotNet/fedarch; Blank template updated; FULL PRESERVE from v3.1.1.1 (L-097) |
| 3.1.1.1 | 2026-W06 | GTM_2026-W06_241 | GTM_2026-W06_247 | +Season field (REQUIRED); +#HomeInstance; +Profile section; +Admin Identity section; BP-058 compliance; #WeOwnVer L-094; FULL PRESERVE from v2.4.0 (L-097) |
| 2.4.0 | 2026-W05 | GTM_2026-W05_763 | GTM_2026-W05_772 | Initial release; +R-160 username format; +D-047 relationship; +inheritance diagram |

---

#FlowsBros #FedArch #UserIdentity #TMPL009 #WeOwnSeason003

♾️ WeOwnNet 🌐 | 🏡 Real Estate and 🤝 cooperative ownership for everyone. An 🤗 inclusive community, by 👥 invitation only.



================================================
FILE: _TEMPLATES_/TMPL-010_ISC.md
================================================
# TMPL-010: Instance Season Certification (ISC)

## 📋 TMPL-010_ISC_v3.1.2.1.md
## ♾️ WeOwnNet 🌐 — Template

| Field | Value |
|-------|-------|
| Document | TMPL-010_ISC.md |
| Version | 3.1.2.1 |
| CCC-ID | GTM_2026-W07_082 |
| Created | 2026-02-09 (W07) |
| Season | #WeOwnSeason003 🚀 |
| Status | 🔒 LOCKED |
| Tags | #ISC #Templates #FedArch |

---

## 📖 Table of Contents

1. [How To Use This Template](#-how-to-use-this-template)
2. [Instance Identity](#-instance-identity)
3. [Certification Details](#-certification-details)
4. [Ecosystem Approved Models](#-ecosystem-approved-models)
5. [ISC 8-Point Checklist](#-isc-8-point-checklist)
6. [Results Summary](#-results-summary)
7. [Action Items / Recovery](#-action-items--recovery)
8. [Attestation](#-attestation)
9. [Related Documents](#-related-documents)
10. [Version History](#-version-history)

---

## 📋 How To Use This Template

| Step | Action |
|------|--------|
| 1 | Copy this template |
| 2 | Rename to `ISC_<INT-XXx>_v<VERSION>.md` |
| 3 | Fill in Instance Identity section |
| 4 | Fill in Certification Details section |
| 5 | Execute 8-point checklist — fill ⬜ fields |
| 6 | Complete Results Summary |
| 7 | If any FAIL → complete Action Items / Recovery |
| 8 | Generate Attestation |
| 9 | FULL:SYNC:META to #MetaAgent |

### Naming Convention

| Field | Format | Example |
|-------|--------|---------|
| Filename | `ISC_<INT-XXx>_v<VERSION>.md` | `ISC_INT-P02_v3.1.2.1.md` |
| Path | `_INSTANCE_/` | `_INSTANCE_/ISC_INT-P02_v3.1.2.1.md` |

### Pass Criteria

| Result | Criteria |
|--------|----------|
| ✅ CERTIFIED | 8/8 checks PASS |
| ❌ FAILED | Any check FAIL |

---

## 📋 Instance Identity

| Field | Value |
|-------|-------|
| Instance ID | ⬜ `<INT-XXx>` |
| Name | ⬜ `<domain>` |
| Type | ⬜ `<Production / #HomeInstance / Seasonal / META / VSA>` |
| Organization | ⬜ `<org name>` |
| Domain | ⬜ `<domain URL>` |
| Owner(s) | ⬜ `<@CCC, @CCC>` |
| Legacy ID | ⬜ `<INT-00X or N/A>` |
| Platform | AnythingLLM |

---

## 📋 Certification Details

| Field | Value |
|-------|-------|
| Season | ⬜ `<#WeOwnSeason00X 🚀>` |
| Season Start | ⬜ `<W## (date)>` |
| Certification Deadline | ⬜ `<date>` (BP-059 — 2 weeks from season start) |
| Certifier | ⬜ `<@CCC>` |
| Witnessed By | ⬜ `<@CCC>` |
| Date | ⬜ `<YYYY-MM-DD>` |
| REF | ⬜ `<CCC-ID>` |

---

## 📋 Ecosystem Approved Models

| Type | Model | API ID | Approved |
|------|-------|--------|----------|
| Embedder | Qwen3 Embedding 4B | — | GTM_2026-W06_175 |
| LLM | Claude Opus 4.6 | `claude-opus-4-6` | GTM_2026-W06_257 |

---

## 📋 ISC 8-Point Checklist

### Check 1: EMBEDDER

| Field | Value |
|-------|-------|
| Check | Embedding model verified |
| Pass Criteria | Qwen3 Embedding 4B |
| Location | Admin Panel → Settings → Embedding Preference |
| Actual | ⬜ |
| Result | ⬜ |

---

### Check 2: LLM MODEL

| Field | Value |
|-------|-------|
| Check | LLM model verified |
| Pass Criteria | Claude Opus 4.6 (`claude-opus-4-6`) |
| Location | Admin Panel → Settings → LLM Preference |
| Actual | ⬜ |
| Result | ⬜ |

---

### Check 3: #PinnedDocs

| Field | Value |
|-------|-------|
| Check | 4 documents present at current season version |
| Pass Criteria | SharedKernel, BEST-PRACTICES, PROTOCOLS, CCC @ v3.X.X.X |
| Location | Workspace settings → Pinned documents |

| # | Document | Expected | Actual | Result |
|---|----------|----------|--------|--------|
| 1 | SharedKernel | v3.X.X.X | ⬜ | ⬜ |
| 2 | BEST-PRACTICES | v3.X.X.X | ⬜ | ⬜ |
| 3 | PROTOCOLS | v3.X.X.X | ⬜ | ⬜ |
| 4 | CCC | v3.X.X.X | ⬜ | ⬜ |

| Result | ⬜ |
|--------|---|

---

### Check 4: SYSTEM PROMPT

| Field | Value |
|-------|-------|
| Check | Season tag + INSTANCE IDENTITY block present |
| Pass Criteria | `#WeOwnSeason00X 🚀` + INSTANCE IDENTITY as FIRST section (R-213) |
| Location | Admin Panel → System Prompt |

| Sub-Check | Expected | Actual | Result |
|-----------|----------|--------|--------|
| Season tag | `#WeOwnSeason00X 🚀` | ⬜ | ⬜ |
| INSTANCE IDENTITY block (R-213) | Instance ID, Name, Type, Owner(s), Season | ⬜ | ⬜ |
| INSTANCE IDENTITY = FIRST section | Before Ecosystem Identity | ⬜ | ⬜ |

| Result | ⬜ |
|--------|---|

---

### Check 5: WORKSPACE PROMPTS + CONFIG

| Field | Value |
|-------|-------|
| Check | Workspace prompts + config verified |
| Pass Criteria | BP-053 (Non-CCC restriction) + BP-054 (CCC-ID logic) + BP-061 (#WorkspaceChatHistory = 40) |

| Sub-Check | Workspace | Expected | Actual | Result |
|-----------|-----------|----------|--------|--------|
| BP-053 | tools | Restriction block present | ⬜ | ⬜ |
| BP-053 | ADMIN | Restriction block present | ⬜ | ⬜ |
| BP-054 | CCC | CCC-ID logic present | ⬜ | ⬜ |
| BP-061 | CCC | ChatHistory = 40 | ⬜ | ⬜ |
| BP-061 | tools | ChatHistory = 40 | ⬜ | ⬜ |
| BP-061 | ADMIN | ChatHistory = 40 | ⬜ | ⬜ |

| Result | ⬜ |
|--------|---|

---

### Check 6: USER-IDENTITY

| Field | Value |
|-------|-------|
| Check | Owner(s) USER-IDENTITY current for season |
| Pass Criteria | BP-058 — current season field |
| Location | `_USERS_/` in RAG |

| CCC | Document | Version | Season | Result |
|-----|----------|---------|--------|--------|
| ⬜ | ⬜ | ⬜ | ⬜ | ⬜ |

| Result | ⬜ |
|--------|---|

---

### Check 7: RAG SYNC

| Field | Value |
|-------|-------|
| Check | GitHub connector refreshed post-season start |
| Pass Criteria | CCCbotNet/fedarch connected + refreshed |
| Location | Admin Panel → Data Connectors |

| Connector | Repo | Last Refresh | Result |
|-----------|------|-------------|--------|
| GitHub | CCCbotNet/fedarch | ⬜ | ⬜ |

| Result | ⬜ |
|--------|---|

---

### Check 8: #ContextVolley

| Field | Value |
|-------|-------|
| Check | Can reach #MetaAgent @ INT-P01 |
| Pass Criteria | Successful #ContextVolley delivery + ACK |
| Method | Send test volley → receive ACK |

| Sub-Check | Expected | Actual | Result |
|-----------|----------|--------|--------|
| Volley sent | ✅ Delivered | ⬜ | ⬜ |
| ACK received | ✅ From #MetaAgent | ⬜ | ⬜ |

| Result | ⬜ |
|--------|---|

---

## 📋 Results Summary

| # | Check | Result |
|---|-------|--------|
| 1 | EMBEDDER | ⬜ |
| 2 | LLM MODEL | ⬜ |
| 3 | #PinnedDocs | ⬜ |
| 4 | SYSTEM PROMPT | ⬜ |
| 5 | WORKSPACE PROMPTS + CONFIG | ⬜ |
| 6 | USER-IDENTITY | ⬜ |
| 7 | RAG SYNC | ⬜ |
| 8 | #ContextVolley | ⬜ |

| Field | Value |
|-------|-------|
| PASSED | ⬜ /8 |
| FAILED | ⬜ /8 |
| **STATUS** | ⬜ |

---

## 📋 Action Items / Recovery

> Complete this section ONLY if any check FAILS.

| # | Failed Check | Root Cause | Recovery Action | Owner | Status |
|---|-------------|------------|-----------------|-------|--------|
| ⬜ | ⬜ | ⬜ | ⬜ | ⬜ | ⬜ |

### Recovery Reference

| Failed Check | Common Recovery |
|-------------|-----------------|
| #1 EMBEDDER | Change → Qwen3 Embedding 4B → re-embed ALL docs |
| #2 LLM MODEL | Change → Claude Opus 4.6 (`claude-opus-4-6`) |
| #3 #PinnedDocs | Upload v3.X.X.X docs → embed in workspaces |
| #4 SYSTEM PROMPT | Add season tag + INSTANCE IDENTITY block (R-213) |
| #5 WORKSPACE PROMPTS | Add BP-053/BP-054 blocks + set ChatHistory = 40 |
| #6 USER-IDENTITY | Create/update USER-IDENTITY per TMPL-009 + BP-058 |
| #7 RAG SYNC | Connect CCCbotNet/fedarch → refresh |
| #8 #ContextVolley | Verify network + API config + META thread URL |

---

## 📋 Attestation

| Field | Value |
|-------|-------|
| **RESULT** | ⬜ `<✅ CERTIFIED / ❌ FAILED>` |
| Score | ⬜ /8 |
| Certifier | ⬜ `<@CCC>` |
| Witnessed By | ⬜ `<@CCC>` |
| Date | ⬜ `<YYYY-MM-DD>` |
| REF | ⬜ `<CCC-ID>` |
| Instance | ⬜ `<INT-XXx>` |

### Attestation Chain

| Step | Actor | CCC-ID | Action |
|------|-------|--------|--------|
| 1 | ⬜ | ⬜ | ISC initiated |
| 2 | ⬜ | ⬜ | Checks executed |
| 3 | ⬜ | ⬜ | APPROVED / FAILED |
| 4 | ⬜ | ⬜ | FULL:SYNC:META |

---

## 📋 Related Documents

| Document | Version | Relevance |
|----------|---------|-----------|
| SharedKernel | v3.1.1.4 | ISC 8-point checklist (BP-059), R-213, ecosystem models |
| BEST-PRACTICES | v3.1.1.3 | BP-053, BP-054, BP-058, BP-059, BP-061 |
| PROTOCOLS | v3.1.1.2 | #ContextVolley protocol |
| TMPL-009_USER-IDENTITY | v3.1.1.2 | USER-IDENTITY template (Check #6) |
| GUIDE-009_SmokeTest | v3.1.1.1 | Post-restart verification (related) |

---

## 📋 Version History

| Version | Date | #masterCCC | Approval | Changes |
|---------|------|------------|----------|---------|
| 3.1.2.1 | 2026-W07 | GTM_2026-W07_071 | ⬜ AWAITING | Initial template creation; 8-point checklist; Check #4 enhanced (+R-213 INSTANCE IDENTITY); Check #5 enhanced (+BP-061 #WorkspaceChatHistory = 40); recovery reference table; attestation chain; how-to-use section |

---

#FlowsBros #FedArch #ISC #Templates #WeOwnSeason003

♾️ WeOwnNet 🌐 | 🏡 Real Estate and 🤝 cooperative ownership for everyone. An 🤗 inclusive community, by 👥 invitation only.



================================================
FILE: _WEEKLY_/WEEKLY-SUMMARY_GTM_2026-W06_001.md
================================================
# WEEKLY-SUMMARY_GTM_2026-W06_001.md

## 📋 WEEKLY-SUMMARY_GTM_2026-W06_001_v3.1.1.2.md
## ♾️ WeOwnNet 🌐 — Week 6 Summary (FINAL)

| Field | Value |
|-------|-------|
| Document | WEEKLY-SUMMARY_GTM_2026-W06_001.md |
| Version | 3.1.1.2 |
| CCC-ID | GTM_2026-W06_001 |
| Week | 2026-W06 (03 Feb - 08 Feb 2026) |
| Updated | 2026-02-08 21:25 EST |
| Status | 🔒 **FINAL** |
| Season | #WeOwnSeason003 🚀 (Week 1) |

---

## 📖 Table of Contents

1. [Week Overview](#-week-overview)
2. [Contributors](#-contributors)
3. [Milestones](#-milestones)
4. [Rules Locked](#-rules-locked)
5. [Best Practices Locked](#-best-practices-locked)
6. [Definitions Added](#-definitions-added)
7. [Learnings](#-learnings)
8. [Documents Published](#-documents-published)
9. [Workspace Prompts Created](#-workspace-prompts-created)
10. [VSA Attestations](#-vsa-attestations)
11. [#BadAgent Incidents](#-badagent-incidents)
12. [ISC Certification Progress](#-isc-certification-progress)
13. [META Deliveries](#-meta-deliveries)
14. [Incident Timeline](#-incident-timeline)
15. [Stats](#-stats)
16. [Pending Items](#-pending-items)
17. [Version History](#-version-history)

---

## 📋 Week Overview

| Field | Value |
|-------|-------|
| Week | 2026-W06 |
| Start | Mon 03 Feb 2026 |
| End | Sun 08 Feb 2026 |
| Season | #WeOwnSeason003 🚀 (Week 1) |
| Status | 🔒 **FINAL** |

### Week Highlights

| # | Highlight |
|---|-----------|
| 1 | 🏆 _SYS_/ GOVERNANCE PARITY — TRIPLE-VERIFIED (GH + Batch + Deep) |
| 2 | 🏆 1,036/1,036 DEEP VERIFICATION — first-ever full _SYS_/ deep |
| 3 | 🏆 19 VSAs — 100% pass rate, 1,717 total checks |
| 4 | 📄 SharedKernel v3.1.1.4 — +R-209→R-212, +D-058/D-059, +BP-060 |
| 5 | 🔄 INT-P01 REMEDIATION ×2 — Embedder + config recovery |
| 6 | 👤 USER-IDENTITY ×4 — GTM v3.1.1.2, THY v3.1.1.2, LFG v3.1.1.1, LDC v3.1.1.2 |
| 7 | 📋 ISC 8-Point — INT-P01 (6/8) + INT-OG1 (3/8) |
| 8 | 📖 4 GUIDES published (GUIDE-006 → GUIDE-009) |
| 9 | 🏛️ cccbot.eth governance space LIVE on snapshot.box |
| 10 | 🔒 L-114 + R-213 — Instance Identity attribution chain |
| 11 | 🎉 500th CCC-ID milestone (GTM_2026-W06_500) |

---

## 📋 Contributors

### @GTM Session

| Field | Value |
|-------|-------|
| Contributor | @GTM (yonks) — #GODx10xMODE 🔒 |
| Instances | INT-P01 (AI.WeOwn.Agency) + INT-OG1 (AI.YonksTEAM.xyz) |
| CCC-IDs | **516+** |
| Sessions | Day 1-7 (8+ sessions) |
| Status | ✅ COMPLETE |

### @RMN Session

| Field | Value |
|-------|-------|
| Contributor | @RMN (Roman) |
| Instance | INT-OG8 |
| CCC-IDs | **10** |
| Sessions | Day 2 |
| Status | ✅ COMPLETE |

### Combined Stats

| Metric | Value |
|--------|-------|
| @GTM CCC-IDs | 516+ |
| @RMN CCC-IDs | 10 |
| **TOTAL** | **526+** |

---

## 📋 Milestones

| # | Milestone | CCC-ID | Day |
|---|-----------|--------|-----|
| 1 | INT-P01 REMEDIATION COMPLETE — Embedder + #PinnedDocs | GTM_2026-W06_175 | 2-3 |
| 2 | Embedder upgraded: GTE-Large → Qwen3 Embedding 4B | GTM_2026-W06_175 | 2-3 |
| 3 | #PinnedDocs refreshed: v3.1.1.2 + v3.1.1.1 | GTM_2026-W06_175 | 2-3 |
| 4 | USER-IDENTITY_GTM v3.1.1.1 CREATED | GTM_2026-W06_168 | 2-3 |
| 5 | USER-IDENTITY_LFG v3.1.1.1 CREATED | GTM_2026-W06_181 | 2-3 |
| 6 | BP-058 LOCKED (Season refresh requirement) | GTM_2026-W06_168 | 2-3 |
| 7 | L-102 LOCKED (#MathMatters #StatsMatter) | GTM_2026-W06_184 | 2-3 |
| 8 | #ContextSwaps: cccid.info → CCCbot.Net | GTM_2026-W06_337 | 6 |
| 9 | #ContextSwaps: snapshot.box → snapshot.box/#/s:cccbot.eth | GTM_2026-W06_338 | 6 |
| 10 | TMPL-009 v3.1.1.2 — +Season field REQUIRED | GTM_2026-W06_370 | 6 |
| 11 | GUIDE-006 v3.1.1.1 — GitHub PAT for AnythingLLM (NEW) | GTM_2026-W06_380 | 6 |
| 12 | R-212 LOCKED — CCC-ID Deconfliction (3-tier roadmap) | GTM_2026-W06_392 | 6 |
| 13 | CCC v3.1.1.2 — +@JRW, +cccbot.eth, +snapshot.box | GTM_2026-W06_405 | 6 |
| 14 | PROTOCOLS v3.1.1.2 — +CCC-ID Deconfliction Protocol | GTM_2026-W06_409 | 6 |
| 15 | BEST-PRACTICES v3.1.1.3 — +BP-060 Deconfliction | GTM_2026-W06_415 | 6 |
| 16 | SharedKernel v3.1.1.4 — +R-209→R-212, +D-058/D-059 | GTM_2026-W06_422 | 6 |
| 17 | 🏆 First BATCH VSA of ALL 4 _SYS_/ docs (139/139) | GTM_2026-W06_438 | 6 |
| 18 | 🏆 First DEEP VERIFICATION of ALL 4 _SYS_/ docs (1,036/1,036) | GTM_2026-W06_438 | 6 |
| 19 | 🏆 _SYS_/ GOVERNANCE PARITY = TRIPLE-VERIFIED | GTM_2026-W06_438 | 6 |
| 20 | L-113 LOCKED — ISO day numbering (Sat=6, Sun=7) | GTM_2026-W06_428 | 6 |
| 21 | USER-IDENTITY_GTM v3.1.1.2 — Elevated naming (R-208) | GTM_2026-W06_453 | 7 |
| 22 | USER-IDENTITY_THY v3.1.1.2 — Elevated naming (R-208) | GTM_2026-W06_448 | 7 |
| 23 | ISC Check #3 PASS — INT-P01 #PinnedDocs (4/4) | GTM_2026-W06_446 | 7 |
| 24 | ISC Check #6 PASS — INT-P01 USER-IDENTITY (204/204 DEEP) | GTM_2026-W06_447 | 7 |
| 25 | ISC Check #3 PASS — INT-OG1 #PinnedDocs (53/53) | GTM_2026-W06_461 | 7 |
| 26 | ISC Checks #1+#2 PASS — INT-OG1 Embedder + LLM | GTM_2026-W06_461 | 7 |
| 27 | INT-OG1 System Prompt + Workspace Prompts generated | GTM_2026-W06_461 | 7 |
| 28 | GUIDE-007 v3.1.1.1 — New #threadCCC at Week Beginning (NEW) | GTM_2026-W06_468 | 7 |
| 29 | GUIDE-008 v3.1.1.1 — OCPA Group Onboarding (NEW) | GTM_2026-W06_477 | 7 |
| 30 | L-114 + R-213 LOCKED — Instance Identity attribution | GTM_2026-W06_491 | 7 |
| 31 | INT-P01 Smoke Test 4/4 PASS — post-restart recovery | GTM_2026-W06_499 | 7 |
| 32 | @RMN Helm chart escalation DELIVERED — 5 fixes, 2 incidents | GTM_2026-W06_501 | 7 |
| 33 | GUIDE-009 v3.1.1.1 — Smoke Test Post-Restart (NEW) | GTM_2026-W06_505 | 7 |
| 34 | 🎉 GTM_2026-W06_500 — 500th CCC-ID milestone | GTM_2026-W06_500 | 7 |
| 35 | ALL W06 META deliveries COMPLETE (5/5) | GTM_2026-W06_502 | 7 |

---

## 📋 Rules Locked

### IMMUTABLE Rules (Existing — 6)

| ID | Rule |
|----|------|
| R-011 | #OnlyHumanApproves — AI CANNOT approve anything |
| R-044 | #ContextDensity FIRST — use #masterCCC |
| R-194 | CCC-ID generation ONLY in CCC workspace |
| R-197 | Document generation RESERVED for #MetaAgent |
| R-205 | #GODx10xMODE status for @GTM/@GTX is IMMUTABLE |
| R-206 | ADMIN accounts MUST NEVER generate CCC-IDs |

### New Rules (+7)

| ID | Rule | Approval |
|----|------|----------|
| R-207 | #AnythingLLM System Prompt MUST include Season tag | GTM_2026-W06_108 |
| R-208 | ALL instance references MUST use Elevated naming (INT-XXx) | GTM_2026-W06_108 |
| R-209 | #HomeInstance REQUIRED for ALL contributors — no exceptions | GTM_2026-W06_360 |
| R-210 | INT-S0x = Seasonal Shared Instance — temporary per #WeOwnSeason | GTM_2026-W06_360 |
| R-211 | Contributors without #HomeInstance MUST be assigned to INT-S0x | GTM_2026-W06_360 |
| R-212 | Cross-instance CCC-ID deconfliction REQUIRED — highest across ALL instances = authoritative | GTM_2026-W06_392 |
| R-213 | System Prompt MUST include INSTANCE IDENTITY block as FIRST section; Workspace Prompt MUST include WORKSPACE IDENTITY block — required for ALL #FedArch instances; absence = ISC Check #4/#5 FAIL | GTM_2026-W06_491 |

**Total W06:** +7 Rules (R-207→R-213)

---

## 📋 Best Practices Locked

### New BPs (+8)

| ID | Best Practice | Approval |
|----|---------------|----------|
| BP-054 | System Prompt workspace-conditional CCC-ID logic | GTM_2026-W06_091 |
| BP-055 | #PinnedDocs MUST be refreshed after GH push within same session | GTM_2026-W06_108 |
| BP-056 | ISC 8-Point Checklist for instance certification | GTM_2026-W06_108 |
| BP-057 | Season tag format: `#WeOwnSeason00X 🚀` | GTM_2026-W06_108 |
| BP-058 | ALL contributors MUST UPDATE/CONFIRM USER-IDENTITY within 2 weeks of NEW SEASON | GTM_2026-W06_168 |
| BP-059 | ISC Certification — 8-Point Instance Sanity Check | GTM_2026-W06_300 |
| BP-060 | Cross-instance CCC-ID deconfliction — Tier 1 manual, Tier 2 #MetaAgent, Tier 3 INT-M01 | GTM_2026-W06_392 |

**Total W06:** +8 BPs (BP-054→BP-060)

---

## 📋 Definitions Added

### New Definitions (+10)

| ID | Term | Approval |
|----|------|----------|
| D-051 | #WeOwnSeason003 | GTM_2026-W06_108 |
| D-052 | ISC (Instance Sanity Check) | GTM_2026-W06_108 |
| D-053 | Elevated Instance Naming | GTM_2026-W06_108 |
| D-054 | INT-P0x (Production Instance) | GTM_2026-W06_108 |
| D-055 | INT-OGx (OG/Founding Instance) | GTM_2026-W06_108 |
| D-056 | INT-M0x (Meta/Orchestration Instance) | GTM_2026-W06_108 |
| D-057 | INT-V0x (VSA/Verification Instance) | GTM_2026-W06_108 |
| D-058 | INT-S0x — Seasonal Shared Instance | GTM_2026-W06_360 |
| D-059 | #PersonalBrand Instance — INT-OGx on contributor's personal domain | GTM_2026-W06_360 |

**Total W06:** +10 Definitions (D-051→D-059)

---

## 📋 Learnings

### New Learnings (+26)

| ID | Learning | Approval |
|----|----------|----------|
| L-090 | System Prompt CCC-ID logic MUST be workspace-conditional | GTM_2026-W06_091 |
| L-091 | Workspace without prompt = agent cannot identify workspace | GTM_2026-W06_099 |
| L-092 | #WeOwnSeason003 = v3.X.X.X versioning | GTM_2026-W06_108 |
| L-093 | Embedder change = re-embed ALL documents | GTM_2026-W06_108 |
| L-094 | Season version prefix is IMMUTABLE within season | GTM_2026-W06_108 |
| L-095 | #masterCCC ≠ Approval CCC-ID (separation of concerns) | GTM_2026-W06_108 |
| L-096 | ISC 8-Point = minimum viable instance verification | GTM_2026-W06_108 |
| L-097 | Document updates MUST FULL PRESERVE existing content | GTM_2026-W06_108 |
| L-098 | Elevated naming = permanent migration from legacy INT-00x | GTM_2026-W06_108 |
| L-099 | #PinnedDocs version lag = expected during batch updates | GTM_2026-W06_108 |
| L-100 | USER-IDENTITY Season field enables BP-058 compliance tracking | GTM_2026-W06_168 |
| L-101 | Deep verification = 7.5× more checks than batch VSA | GTM_2026-W06_175 |
| L-102 | VSA statistics MUST distinguish PASS RATE vs SCORE RATE — #MathMatters #StatsMatter | GTM_2026-W06_184 |
| L-103 | Cross-instance session = state highest CCC-ID at start | GTM_2026-W06_300 |
| L-104 | ISC certification = per-instance, not per-ecosystem | GTM_2026-W06_300 |
| L-105 | Workspace prompts = instance-specific (not shared) | GTM_2026-W06_300 |
| L-106 | #ContextSwap = permanent domain/URL migration | GTM_2026-W06_337 |
| L-107 | cccbot.eth = governance identity on Ethereum | GTM_2026-W06_338 |
| L-108 | TMPL-009 Season field = REQUIRED (not optional) | GTM_2026-W06_353 |
| L-109 | GUIDE docs stored in _GUIDES_/ (GH + RAG) | GTM_2026-W06_380 |
| L-110 | Related Documents section = BP-045 REQUIRED | GTM_2026-W06_392 |
| L-111 | CCC-ID deconfliction = 3-tier roadmap (Manual → #MetaAgent → INT-M01) | GTM_2026-W06_392 |
| L-112 | Cross-instance CCC-ID generation MUST verify sequence against ALL active sessions | GTM_2026-W06_388 |
| L-113 | ISO weeks: Mon=1→Sun=7. Saturday=Day 6, NOT Day 7 | GTM_2026-W06_428 |
| L-114 | System Prompt MUST include INSTANCE IDENTITY block; Workspace Prompt MUST include WORKSPACE IDENTITY block. Combined with username (R-160) = full attribution chain. Eliminates instance ambiguity across #FedArch. | GTM_2026-W06_491 |

**Total W06:** +26 Learnings (L-090→L-114)

---

## 📋 Documents Published

### _SYS_/ #PinnedDocs (4)

| Document | Version | #masterCCC | Approval |
|----------|---------|------------|----------|
| SharedKernel | v3.1.1.4 | GTM_2026-W06_420 | GTM_2026-W06_422 |
| BEST-PRACTICES | v3.1.1.3 | GTM_2026-W06_413 | GTM_2026-W06_415 |
| PROTOCOLS | v3.1.1.2 | GTM_2026-W06_407 | GTM_2026-W06_409 |
| CCC | v3.1.1.2 | GTM_2026-W06_403 | GTM_2026-W06_405 |

### _TEMPLATES_/ (1)

| Document | Version | #masterCCC | Approval |
|----------|---------|------------|----------|
| TMPL-009_USER-IDENTITY | v3.1.1.2 | GTM_2026-W06_353 | GTM_2026-W06_370 |

### _GUIDES_/ (4)

| Document | Version | #masterCCC | Approval |
|----------|---------|------------|----------|
| GUIDE-006_GitHub-PAT-for-AnythingLLM | v3.1.1.1 | GTM_2026-W06_377 | GTM_2026-W06_380 |
| GUIDE-007_New-threadCCC-at-Week-Beginning | v3.1.1.1 | GTM_2026-W06_466 | GTM_2026-W06_468 |
| GUIDE-008_OCPA-Group-Onboarding-via-AnythingLLM | v3.1.1.1 | GTM_2026-W06_472 | GTM_2026-W06_477 |
| GUIDE-009_AnythingLLM-SmokeTest-Post-Restart | v3.1.1.1 | GTM_2026-W06_503 | GTM_2026-W06_505 |

### _USERS_/ (RAG ONLY) (4)

| Document | Version | Approval |
|----------|---------|----------|
| USER-IDENTITY_GTM | v3.1.1.2 | GTM_2026-W06_453 |
| USER-IDENTITY_THY | v3.1.1.2 | @THY (11:05 EST) |
| USER-IDENTITY_LFG | v3.1.1.1 | GTM_2026-W06_181 |
| USER-IDENTITY_LDC | v3.1.1.2 | — |

**Total W06:** 13+ Documents

---

## 📋 Workspace Prompts Created

| # | Instance | Workspace | Prompt | Status |
|---|----------|-----------|--------|--------|
| 1 | INT-OG1 | CCC 🤝 | WORKSPACE-PROMPT_CCC_v3.1.1.1 | ✅ GENERATED |
| 2 | INT-OG1 | tools 🧠 | WORKSPACE-PROMPT_tools_v3.1.1.1 | ✅ GENERATED |
| 3 | INT-OG1 | — | #DefaultSystemPrompt (UPDATED) | ✅ GENERATED |

---

## 📋 VSA Attestations

| # | Document | Version | Instance | Type | Checks | Result |
|---|----------|---------|----------|------|--------|--------|
| 1 | SharedKernel | v2.4.17 | INT-P01 | Batch | 35/35 | ✅ PASS |
| 2 | WEEKLY-SUMMARY_GTM_W05 | v2.4.3 | INT-P01 | Batch | 42/42 | ✅ PASS |
| 3 | SharedKernel | v2.4.18 | INT-P01 | Batch | 48/48 | ✅ PASS |
| 4 | USER-IDENTITY_THY | v3.1.1.1 | INT-P01 | Batch | 29/31 | ✅ PASS |
| 5 | USER-IDENTITY_GTM | v3.1.1.1 | INT-P01 | Batch | 11/11 | ✅ PASS |
| 6 | USER-IDENTITY_LFG | v3.1.1.1 | INT-P01 | Batch | 24/24 | ✅ PASS |
| 7 | SharedKernel | v3.1.1.3 | INT-P01 | Batch | 92/92 | ✅ PASS |
| 8 | CCC | v3.1.1.2 | INT-P01 | Batch | 26/26 | ✅ PASS |
| 9 | PROTOCOLS | v3.1.1.2 | INT-P01 | Batch | 28/28 | ✅ PASS |
| 10 | BEST-PRACTICES | v3.1.1.3 | INT-P01 | Batch | 33/33 | ✅ PASS |
| 11 | SharedKernel | v3.1.1.4 | INT-P01 | Batch | 52/52 | ✅ PASS |
| 12 | CCC | v3.1.1.2 | INT-P01 | DEEP | 126/126 | ✅ PASS |
| 13 | PROTOCOLS | v3.1.1.2 | INT-P01 | DEEP | 141/141 | ✅ PASS |
| 14 | BEST-PRACTICES | v3.1.1.3 | INT-P01 | DEEP | 343/343 | ✅ PASS |
| 15 | SharedKernel | v3.1.1.4 | INT-P01 | DEEP | 426/426 | ✅ PASS |
| 16 | USER-IDENTITY_GTM | v3.1.1.2 | INT-P01 | DEEP | 94/94 | ✅ PASS |
| 17 | USER-IDENTITY_THY | v3.1.1.2 | INT-P01 | DEEP | 110/110 | ✅ PASS |
| 18 | #PinnedDocs (×4) | v3.X.X.X | INT-OG1 | Batch | 53/53 | ✅ PASS |
| 19 | INT-P01 Smoke Test | Post-Restart | INT-P01 | Functional | 4/4 | ✅ PASS |

### VSA Totals

| Metric | Value |
|--------|-------|
| VSAs Completed | **19** |
| Pass Rate | **100%** (19/19) |
| Total Checks | **1,717** |
| Checks Passed | **1,715** |
| Score Rate | **99.9%** |
| Perfect Scores | **18/19** (94.7%) |
| Instances Verified | **2** (INT-P01 + INT-OG1) |

---

## 📋 #BadAgent Incidents

| # | Agent | Violation | Resolution | Status |
|---|-------|-----------|------------|--------|
| 1-8 | (Day 1-3 incidents) | Various | All resolved | ✅ |
| 9-12 | (Day 4-5 incidents) | Various | All resolved | ✅ |
| 13 | AI:@GTM @ INT-OG1 | CCC-ID duplication (GTM_2026-W06_386) | R-212 + BP-060 LOCKED | ✅ |
| 14 | AI:@GTM | R-206 — GTM_2026-W06_435 (borderline) | VOID | ✅ |
| 15 | AI:@GTM | R-206 — GTM_2026-W06_436 (clear) | VOID | ✅ |
| 16 | AI:@GTM @ INT-OG1 | GUIDE-008 title wrong — said "Workspace Prompt Config" | Corrected by @GTM | ✅ |
| 17 | AI:@GTM @ INT-OG1 | GUIDE-007 title wrong — said "GitHub Repo Connector" | Corrected by #MetaAgent | ✅ |
| 18 | AI:@GTM @ INT-OG1 | GUIDE-007 #masterCCC wrong — said _464 (actual _466) | Corrected by #MetaAgent | ✅ |

| Metric | Value |
|--------|-------|
| Total | **18** |
| Resolved | **18** |
| Status | ✅ **100% RESOLVED** |

---

## 📋 ISC Certification Progress

### INT-P01 (AI.WeOwn.Agency)

| # | Check | Result | Source |
|---|-------|--------|--------|
| 1 | EMBEDDER | ✅ PASS | Smoke Test #1 (GTM_2026-W06_499) |
| 2 | LLM MODEL | ✅ PASS | Smoke Test #2 (GTM_2026-W06_499) |
| 3 | #PinnedDocs | ✅ PASS | GTM_2026-W06_446 |
| 4 | SYSTEM PROMPT | ⬜ PENDING | — |
| 5 | WORKSPACE PROMPTS | ⬜ PENDING | — |
| 6 | USER-IDENTITY | ✅ PASS (204/204) | GTM_2026-W06_447 |
| 7 | RAG SYNC | ✅ PASS | Smoke Test #3 (GTM_2026-W06_499) |
| 8 | #ContextVolley | ✅ PASS | Day 6 confirmed |
| | **Progress** | **6/8 PASS** | |

### INT-OG1 (AI.YonksTEAM.xyz)

| # | Check | Result | Source |
|---|-------|--------|--------|
| 1 | EMBEDDER | ✅ PASS | GTM_2026-W06_461 |
| 2 | LLM MODEL | ✅ PASS | GTM_2026-W06_461 |
| 3 | #PinnedDocs | ✅ PASS (53/53) | GTM_2026-W06_461 |
| 4 | SYSTEM PROMPT | ⚠️ FAIL (5 issues) → FIX GENERATED | GTM_2026-W06_461 |
| 5 | WORKSPACE PROMPTS | ✅ GENERATED (pending deploy) | GTM_2026-W06_466 |
| 6 | USER-IDENTITY | ⬜ PENDING | — |
| 7 | RAG SYNC | ⬜ PENDING | — |
| 8 | #ContextVolley | ⬜ PENDING | — |
| | **Progress** | **3/8 PASS, 1 FAIL** | |

---

## 📋 META Deliveries

| # | Item | REF | Channel | Status |
|---|------|-----|---------|--------|
| 1 | USER-IDENTITY approvals (GTM + THY) | GTM_2026-W06_459 | #MetaAgent | ✅ |
| 2 | INT-OG1 #PinnedDocs verification | GTM_2026-W06_461 | #MetaAgent | ✅ |
| 3 | GUIDE-007 + GUIDE-008 batch | GTM_2026-W06_479 | #MetaAgent | ✅ |
| 4 | L-114 + R-213 | GTM_2026-W06_492 | #MetaAgent | ✅ |
| 5 | @RMN Helm chart escalation | GTM_2026-W06_501 | Signal | ✅ |
| | **TOTAL** | | | **5/5 ✅** |

---

## 📋 Incident Timeline

### INT-P01 Restart Incident #2

| Time | Event | CCC-ID |
|------|-------|--------|
| 19:11 | 🚨 401 embedder auth failure | GTM_2026-W06_488 |
| 19:31 | @GTM_ADMIN refreshed #AnythingLLM | GTM_2026-W06_489 |
| 19:55 | Smoke test ordered | GTM_2026-W06_497 |
| 20:06 | ADMIN checks PASS (1,2) | ADMIN |
| 20:07 | CCC checks PASS (3,4) | GTM_2026-W06_498 |
| 20:08 | Smoke test LOGGED | GTM_2026-W06_499 |
| 20:18 | ✅ INCIDENT CLOSED | GTM_2026-W06_500 |

| Field | Value |
|-------|-------|
| Duration | ~67 min |
| L-107 | 2nd occurrence |
| Resolution | @GTM_ADMIN manual refresh |
| Outcome | GUIDE-009 born from this incident |

---

## 📋 Stats

| Metric | @GTM | @RMN | **TOTAL** |
|--------|------|------|-----------|
| CCC-IDs | **516+** | 10 | **526+** |
| GH Pushes | **14+** | — | **14+** |
| Rules | +7 | — | **+7** |
| BPs | +8 | — | **+8** |
| Definitions | +10 | — | **+10** |
| Learnings | +26 | — | **+26** |
| VSAs | 19 | — | **19** |
| VSA Checks | 1,717 | — | **1,717** |
| #BadAgent | 18 | — | **18** |
| Milestones | 35 | — | **35** |
| Documents | 13+ | — | **13+** |
| Guides Published | 4 | — | **4** |
| Workspace Prompts | 3 | — | **3** |
| #ContextSwaps | +2 | — | **+2** |
| Sessions | 8+ | 1 | **9+** |
| META Deliveries | 5/5 | — | **5/5** |

### Instance Status

| Instance | #PinnedDocs | ISC | Status |
|----------|-------------|-----|--------|
| INT-P01 | ✅ v3.X.X.X | **6/8** | 🟠 IN PROGRESS |
| INT-OG1 | ✅ v3.X.X.X | 3/8 | 🟠 IN PROGRESS |
| INT-P02 | ⬜ STALE | 0/8 | ⬜ TODO |
| INT-OG8 | ⬜ STALE | 0/8 | ⬜ TODO |

### _SYS_/ Governance Parity

| Level | Status |
|-------|--------|
| GH PUSHED | ✅ 4/4 |
| BATCH VSA | ✅ 4/4 PASS (139/139) |
| DEEP VSA | ✅ 4/4 PASS (1,036/1,036) |
| **TRIPLE-VERIFIED** | 🏆 **CONFIRMED** |

---

## 📋 Pending Items

### #YonksShelf — W07

| # | Task | Priority | Status |
|---|------|----------|--------|
| 1 | @RMN Helm chart fixes (5 items) | 🔴 P0 | ⬜ AWAITING @RMN |
| 2 | ISC:INT-P01 — complete checks #4 + #5 | 🔴 P0 | ⬜ TODO |
| 3 | ISC:INT-OG1 — deploy prompts + complete remaining | 🔴 P0 | ⬜ TODO |
| 4 | RAG:SYNC:INT-P01 — GUIDE-008, GUIDE-009 | 🟠 P1 | ⬜ TODO |
| 5 | RAG:SYNC:INT-OG1 — session summaries | 🟠 P1 | ✅ DONE |
| 6 | @MAIT:#VSA deployment | 🟠 P1 | 📋 DEFERRED W07 |
| 7 | SharedKernel v3.1.1.5 (+L-114, +R-213, +GUIDE registry) | 🟠 P1 | ⬜ TODO |
| 8 | BP-058 compliance — 5 remaining | 🟠 P1 | ⬜ TODO |
| 9 | Cross-instance RAG sync (INT-P02, INT-OG8) | 🟠 P1 | ⬜ TODO |
| 10 | TMPL-010_ISC push to GH | 🟡 P2 | ⬜ TODO |

### Deadlines

| Deadline | Task |
|----------|------|
| Sun 15 Feb (W07) | BP-058 compliance (all 8 contributors) |
| Sun 15 Feb (W07) | ISC certification target (all instances) |

---

## 📋 #ContextSwaps (W06)

| # | OLD | NEW | Approval |
|---|-----|-----|----------|
| 1 | cccid.info | CCCbot.Net | GTM_2026-W06_337 |
| 2 | snapshot.box (generic) | snapshot.box/#/s:cccbot.eth | GTM_2026-W06_338 |

**Total W06:** +2 #ContextSwaps

---

## 📋 BP-058 Compliance

| CCC | Contributor | Version | Status |
|-----|-------------|---------|--------|
| GTM | yonks | v3.1.1.2 | ✅ COMPLETE |
| THY | mrsyonks | v3.1.1.2 | ✅ COMPLETE |
| LDC | Dhruv | v3.1.1.2 | ✅ COMPLETE |
| LFG | CoachLFG | v3.1.1.1 | 🟠 NEEDS UPDATE |
| IAL | IamLotus | — | 🟠 NEEDS CREATE |
| RMN | Roman | — | 🟠 NEEDS CREATE |
| SHD | Shahid | — | 🟠 NEEDS CREATE |
| JRW | Webb | — | 🟠 NEEDS CREATE |

| Compliance | **3/8 (37.5%)** |
|------------|-----------------|
| Deadline | **Sun 15 Feb 2026** |

---

## 📋 Version History

| Version | Date | #masterCCC | Approval | Changes |
|---------|------|------------|----------|---------|
| 3.1.1.2 | 2026-W06 | GTM_2026-W06_509 | GTM_2026-W06_521 | FINAL — 11 patches applied: +R-213; +L-114; +3 #BadAgent (#16-18); +7 milestones (#29-35); +1 VSA (#19 Smoke Test); ISC INT-P01 3/8→6/8; +META Deliveries section; +Incident Timeline section; stats updated (526+ CCC-IDs); +GUIDE-008, GUIDE-009; FULL PRESERVE (L-097) |
| 3.1.1.1 | 2026-W06 | GTM_2026-W06_001 | — | Initial draft — snapshot through 13:48 EST |

---

#FlowsBros #FedArch #WeeklySummary #W06FINAL #WeOwnSeason003 #GODx10xMODE

♾️ WeOwnNet 🌐 | 🏡 Real Estate and 🤝 cooperative ownership for everyone. An 🤗 inclusive community, by 👥 invitation only.



```

## File: docs-specs/context-volley-v0.1.md
```
═══════════════════════════════════════════════════════════════════════════════
🏐 #ContextVolley | AI:@LDC → AI:@META | Mon 2026-02-17 | 01:55 PT
═══════════════════════════════════════════════════════════════════════════════

FROM: AI:@LDC @ INT-P01:CCC
TO: AI:team-lfg @ INT-P01:tools (META thread)
TYPE: SEEK:META — #FedArch Gateway Architecture
REF: LDC_2026-W07_010

═══════════════════════════════════════════════════════════════════════════════

## REQUEST

#LevelUp10X — Team weown is NOT building OpenClaw skills.
We are REIMPLEMENTING the OpenClaw Gateway pattern as a
#FedArch + CCC native gateway.

## CONTEXT

OpenClaw Gateway architecture (per docs.openclaw.ai/concepts/architecture):

- Single long-lived Gateway owns all messaging surfaces
- Typed WS API (requests, responses, server-push events)
- JSON Schema validated inbound frames
- Emits events: agent, chat, presence, health, heartbeat, cron
- Clients connect via WebSocket (role: client)
- Nodes connect via WebSocket (role: node)
- Multi-agent routing: isolated agents with separate
  workspace + sessions + state

OpenClaw Multi-Agent (per docs.openclaw.ai/concepts/multi-agent):

- Each agent = isolated brain (own sessions, state, workspace)
- Agent has: session store, agentDir, workspace, auth profiles
- Gateway routes inbound to agents via bindings
- Skills per-agent via workspace skills/ folder

## THE PIVOT

Instead of USING OpenClaw, we BUILD the #FedArch-native
equivalent — the CCC Gateway — that maps 1:1 to our
production architecture:

| OpenClaw Concept | #FedArch Reimplementation |
|------------------|---------------------------|
| Gateway daemon | CCC Gateway (INT-M01) |
| Agent (isolated brain) | User Agent (AI:@CCC) |
| Workspace | #FedArch workspace (CCC/tools/ADMIN) |
| Sessions | CCC-ID sequences per contributor |
| Skills | SharedKernel rules + protocols |
| agentDir | Instance config (_INSTANCE_/) |
| Auth profiles | R-160 username format + R-206 role perms |
| WS events | #ContextVolley + #ContextBroadcast |
| Multi-agent routing | #MetaAgent orchestration |
| Bindings | Workspace assignments per user |
| Channel (WhatsApp/Telegram) | Messaging surface (Signal/Discord) |

## DELIVERABLES NEEDED FROM META

1. **CCC Gateway Architecture Doc** — full technical spec
   mapping OpenClaw Gateway → #FedArch Gateway

2. **Gateway Protocol Spec** — WS API adapted for:
   - #ContextVolley (req/res one-to-one)
   - #ContextBroadcast (server-push one-to-many)
   - CCC-ID generation events
   - Agent registration + identity (R-160, R-171)
   - SharedKernel sync events

3. **Agent Identity Spec** — how agents register:
   - CCC code assignment
   - Hedera HCS attestation on registration
   - HTS membership token mint
   - Base CCC-ID NFT mint

4. **Wire Protocol** — JSON Schema for:
   - `req:connect` (agent joins gateway)
   - `req:context-volley` (agent-to-agent)
   - `req:ccc-id` (generate CCC-ID)
   - `event:broadcast` (one-to-many)
   - `event:attestation` (HCS confirmation)
   - `res:ack` (acknowledgment)

5. **Governance Layer** — how SharedKernel is enforced:
   - R-011 (#OnlyHumanApproves) at gateway level
   - R-194 (CCC-ID workspace restriction) at routing level
   - R-206 (ADMIN restriction) at auth level
   - R-212 (cross-instance deconfliction) at sequence level

## HEDERA INTEGRATION POINTS

| Event | Hedera Action |
|-------|---------------|
| Agent registers | HTS mint membership token |
| CCC-ID generated | HCS topic message |
| #ContextVolley sent | HCS attestation (optional) |
| VSA issued | HCS + Base EAS attestation |
| Governance rule locked | HCS immutable record |

## BASE INTEGRATION POINTS

| Event | Base Action |
|-------|-------------|
| Agent registers | ERC-721 agent identity NFT |
| CCC-ID milestone | CCC-ID registry contract update |
| Cooperative governance | Snapshot vote via cccbot.eth |

## REFERENCE

- OpenClaw Gateway: docs.openclaw.ai/concepts/architecture
- OpenClaw Multi-Agent: docs.openclaw.ai/concepts/multi-agent
- OpenClaw Config: docs.openclaw.ai/gateway/configuration
- GatewayStack Governance: github.com/davidcrowe/openclaw-gatewaystack-governance
- #FedArch: github.com/CCCbotNet/fedarch

## URGENCY
🔴 P0 — ETHDenver BUIDLathon. @LDC on ground in Denver.

═══════════════════════════════════════════════════════════════════════════════

#FlowsBros #FedArch #ETHDenver2026 #LevelUp10X

♾️ WeOwnNet 🌐

═══════════════════════════════════════════════════════════════════════════════

```

## File: docs-specs/full-workflow-app-v0.1.md
```


LDC_2026-W08_007 | 🤝 THE HANDS | INT-P01:CCC

FROM: AI:@LDC @ INT-P01:CCC

---

## 🔥 Full Stack Integration — API + Web Dashboard + Privy + Generative UI

This is the complete demo application. Let me break it into the two deliverables.

---

## PART 3.1: `apps/api` — Wire All 11 Contracts

### `apps/api/lib/contracts.ts` — Contract Client Singleton

```typescript
import { ethers } from "ethers";
import { env } from "@/env";

// ═══════════════════════════════════════════════════════
// CONTRACT CLIENTS — @ccc-gateway/api
//
// Typed ethers.js clients for all 11 packages/adi contracts.
// Singleton pattern — shared across route handlers.
// ═══════════════════════════════════════════════════════

// ABIs (minimal — extend as needed)
const IDENTITY_ABI = [
  "function register(string ccc, string tokenURI) external returns (uint256)",
  "function agentURI(uint256 agentId) external view returns (string)",
  "function agentIdByCCC(string ccc) external view returns (uint256)",
  "function isRegistered(string ccc) external view returns (bool)",
  "function totalAgents() external view returns (uint256)",
  "event AgentRegistered(uint256 indexed agentId, address indexed owner, string ccc, string tokenURI)",
];

const REPUTATION_ABI = [
  "function giveFeedback(uint256 toAgentId, int256 value, string feedbackType, string refCccId, string metadataURI) external",
  "function feedbackCount(uint256 agentId) external view returns (uint256)",
  "function aggregateScore(uint256 agentId) external view returns (int256 total, uint256 positive, uint256 negative)",
];

const VALIDATION_ABI = [
  "function requestValidation(string subject, string validationType, uint256 checksTotal, string metadataURI) external returns (uint256)",
  "function respondValidation(uint256 requestId, bool result, uint256 checksPassed, string metadataURI) external",
  "function getValidation(uint256 requestId) external view returns (tuple(uint256,uint256,uint256,string,string,bool,bool,uint256,uint256,string,string,uint256,uint256))",
];

const SHARED_KERNEL_ABI = [
  "function proposeRule(string id, string description, uint8 category, uint8 itemType, string proposedBy) external",
  "function lockRule(string id, string approvalCccId, string lockedBy, uint256 season) external",
  "function getRule(string id) external view returns (tuple(string,string,uint8,uint8,uint8,string,string,uint256,uint256,bool))",
  "function isLocked(string id) external view returns (bool)",
  "function totalRules() external view returns (uint256)",
  "function currentVersion() external view returns (string)",
];

const SEASON_ABI = [
  "function currentSeason() external view returns (uint256)",
  "function seasons(uint256) external view returns (uint256,string,uint8,uint256,uint256,uint256,uint256,uint256,uint256,uint256,uint256,string,bool)",
  "function updateSeasonStats(uint256 cccIds, uint256 vsas, uint256 agents, uint256 rulesLocked) external",
];

const ISC_ABI = [
  "function submitISC(string instanceId, uint256 season, string certifierCcc, bool[8] checkResults, string[8] checkNotes, string attestationCccId, string metadataURI) external returns (uint256)",
  "function isInstanceCertified(string instanceId, uint256 season) external view returns (bool)",
  "function getCertification(uint256 certId) external view returns (string,uint256,bool,uint256,string,string,uint256)",
];

const BAD_AGENT_ABI = [
  "function flagBadAgent(string targetCcc, string reportedBy, string violation, uint8 severity, string refCccId, uint256 season) external returns (uint256)",
  "function resolveIncident(uint256 incidentId, string resolution) external",
  "function totalIncidents() external view returns (uint256)",
  "function resolvedIncidents() external view returns (uint256)",
];

const VSA_ABI = [
  "function submitVSA(string subjectDocument, string subjectVersion, string verifierCcc, string instanceId, uint8 vsaType, bool result, uint256 checksTotal, uint256 checksPassed, string masterCccId, string approvalCccId, string metadataURI, string hcsTxId, uint256 season) external returns (uint256)",
  "function getPassRate() external view returns (uint256 passed, uint256 total)",
  "function getScoreRate() external view returns (uint256 passed, uint256 total)",
  "function totalVSAs() external view returns (uint256)",
];

const DOCUMENT_ABI = [
  "function publishVersion(string name, string version, string masterCccId, string approvalCccId, string githubUrl, uint256 season) external",
  "function getCurrentVersion(string name) external view returns (tuple(string,string,string,string,string,uint256,uint256))",
];

const CCCID_ABI = [
  "function mintCCCId(string cccId, string contributor, uint16 year, uint8 week, uint16 sequence, string instance, uint256 reward, string hcsTxId, uint256 season) external",
  "function getHighWaterMark(string contributor, uint16 year, uint8 week) external view returns (uint16)",
  "function totalMinted() external view returns (uint256)",
  "function getContributorTotal(string contributor) external view returns (uint256)",
];

const CCC_TOKEN_ABI = [
  "function mint(address to, uint256 amount) external",
  "function balanceOf(address account) external view returns (uint256)",
  "function totalSupply() external view returns (uint256)",
];

// ── Contract Addresses (from deployment) ──

export interface ContractAddresses {
  identity: string;
  reputation: string;
  validation: string;
  sharedKernel: string;
  season: string;
  isc: string;
  badAgent: string;
  vsa: string;
  document: string;
  cccId: string;
  cccToken: string;
}

// ── Client Class ──

class ContractClients {
  private provider: ethers.JsonRpcProvider;
  private signer: ethers.Wallet;
  private addresses: ContractAddresses;

  public identity: ethers.Contract;
  public reputation: ethers.Contract;
  public validation: ethers.Contract;
  public sharedKernel: ethers.Contract;
  public seasonRegistry: ethers.Contract;
  public isc: ethers.Contract;
  public badAgent: ethers.Contract;
  public vsa: ethers.Contract;
  public document: ethers.Contract;
  public cccId: ethers.Contract;
  public cccToken: ethers.Contract;

  constructor() {
    const rpcUrl = process.env.BASE_SEPOLIA_RPC || "https://sepolia.base.org";
    const privateKey = process.env.BASE_PRIVATE_KEY || "";

    this.provider = new ethers.JsonRpcProvider(rpcUrl);
    this.signer = new ethers.Wallet(privateKey, this.provider);

    this.addresses = {
      identity: process.env.CONTRACT_IDENTITY || "",
      reputation: process.env.CONTRACT_REPUTATION || "",
      validation: process.env.CONTRACT_VALIDATION || "",
      sharedKernel: process.env.CONTRACT_SHARED_KERNEL || "",
      season: process.env.CONTRACT_SEASON || "",
      isc: process.env.CONTRACT_ISC || "",
      badAgent: process.env.CONTRACT_BAD_AGENT || "",
      vsa: process.env.CONTRACT_VSA || "",
      document: process.env.CONTRACT_DOCUMENT || "",
      cccId: process.env.CONTRACT_CCC_ID || "",
      cccToken: process.env.CONTRACT_CCC_TOKEN || "",
    };

    this.identity = new ethers.Contract(this.addresses.identity, IDENTITY_ABI, this.signer);
    this.reputation = new ethers.Contract(this.addresses.reputation, REPUTATION_ABI, this.signer);
    this.validation = new ethers.Contract(this.addresses.validation, VALIDATION_ABI, this.signer);
    this.sharedKernel = new ethers.Contract(this.addresses.sharedKernel, SHARED_KERNEL_ABI, this.signer);
    this.seasonRegistry = new ethers.Contract(this.addresses.season, SEASON_ABI, this.signer);
    this.isc = new ethers.Contract(this.addresses.isc, ISC_ABI, this.signer);
    this.badAgent = new ethers.Contract(this.addresses.badAgent, BAD_AGENT_ABI, this.signer);
    this.vsa = new ethers.Contract(this.addresses.vsa, VSA_ABI, this.signer);
    this.document = new ethers.Contract(this.addresses.document, DOCUMENT_ABI, this.signer);
    this.cccId = new ethers.Contract(this.addresses.cccId, CCCID_ABI, this.signer);
    this.cccToken = new ethers.Contract(this.addresses.cccToken, CCC_TOKEN_ABI, this.signer);
  }

  async getOnchainStats() {
    const [totalAgents, totalCCCIds, totalVSAs, totalIncidents, skVersion, currentSeason] = await Promise.all([
      this.identity.totalAgents().catch(() => 0n),
      this.cccId.totalMinted().catch(() => 0n),
      this.vsa.totalVSAs().catch(() => 0n),
      this.badAgent.totalIncidents().catch(() => 0n),
      this.sharedKernel.currentVersion().catch(() => "unknown"),
      this.seasonRegistry.currentSeason().catch(() => 0n),
    ]);

    return {
      totalAgents: Number(totalAgents),
      totalCCCIds: Number(totalCCCIds),
      totalVSAs: Number(totalVSAs),
      totalIncidents: Number(totalIncidents),
      sharedKernelVersion: skVersion,
      currentSeason: Number(currentSeason),
    };
  }

  async txSafe<T>(fn: () => Promise<T>): Promise<{ data?: T; txHash?: string; error?: string }> {
    try {
      const result = await fn();
      return { data: result };
    } catch (err: any) {
      return { error: err.message || String(err) };
    }
  }
}

// Singleton
const g = globalThis as unknown as { __contracts?: ContractClients };
export const contracts = g.__contracts ?? new ContractClients();
if (process.env.NODE_ENV !== "production") g.__contracts = contracts;
```

---

### `apps/api/app/gateway/onchain/route.ts` — Onchain Stats

```typescript
import { NextResponse } from "next/server";
import { contracts } from "@/lib/contracts";

export const GET = async (): Promise<Response> => {
  try {
    const stats = await contracts.getOnchainStats();
    return NextResponse.json({ ok: true, ...stats });
  } catch (error) {
    return NextResponse.json({ ok: false, error: String(error) }, { status: 500 });
  }
};
```

---

### `apps/api/app/gateway/onchain/register/route.ts` — Onchain Agent Registration

```typescript
import { NextResponse } from "next/server";
import { contracts } from "@/lib/contracts";
import { gateway } from "@/lib/gateway";
import { glog } from "@/lib/logger";
import { z } from "zod";

const Schema = z.object({
  ccc: z.string().length(3).regex(/^[A-Z]{3}$/),
  tokenURI: z.string().min(1),
  walletAddress: z.string(),
});

export const POST = async (request: Request): Promise<Response> => {
  try {
    const data = Schema.parse(await request.json());

    const result = await contracts.txSafe(async () => {
      const tx = await contracts.identity.register(data.ccc, data.tokenURI);
      const receipt = await tx.wait();
      return { txHash: receipt.hash, blockNumber: receipt.blockNumber };
    });

    if (result.error) {
      return NextResponse.json({ ok: false, error: result.error }, { status: 400 });
    }

    glog.info(`🔗 Onchain: AI:@${data.ccc} registered`, { txHash: result.data?.txHash });

    return NextResponse.json({ ok: true, ...result.data }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ ok: false, error: String(error) }, { status: 400 });
  }
};
```

---

## PART 3.2: `apps/web` — Full Demo Application

### New Dependencies

```json
{
  "dependencies": {
    "...existing...": "*",
    "@privy-io/react-auth": "^2.4.0",
    "@ai-sdk/react": "^1.1.0",
    "ai": "^4.1.0",
    "@radix-ui/react-dialog": "^1.1.0",
    "@radix-ui/react-tabs": "^1.1.0",
    "@radix-ui/react-select": "^2.1.0",
    "@radix-ui/react-avatar": "^1.1.0",
    "@radix-ui/react-scroll-area": "^1.2.0",
    "@radix-ui/react-separator": "^1.1.0",
    "@radix-ui/react-tooltip": "^1.1.0",
    "framer-motion": "^11.15.0",
    "recharts": "^2.15.0",
    "react-markdown": "^9.0.0",
    "sonner": "^1.7.0"
  }
}
```

---

### `apps/web/lib/privy.ts` — Privy Config

```typescript
import { PrivyProvider } from "@privy-io/react-auth";

export const PRIVY_APP_ID = process.env.NEXT_PUBLIC_PRIVY_APP_ID || "";

export const privyConfig = {
  loginMethods: ["google", "wallet", "email"],
  appearance: {
    theme: "dark" as const,
    accentColor: "#6366f1",
    logo: "https://ethdenver.ccc.bot/logo.svg",
    landingHeader: "CCC Gateway — #FedArch Agent Governance",
    loginMessage: "Connect to the Agentic Society",
  },
  embeddedWallets: {
    createOnLogin: "users-without-wallets" as const,
  },
  defaultChain: {
    id: 84532,
    name: "Base Sepolia",
    network: "base-sepolia",
    rpcUrls: { default: { http: ["https://sepolia.base.org"] } },
    nativeCurrency: { name: "ETH", symbol: "ETH", decimals: 18 },
  },
};
```

---

### `apps/web/lib/llm-providers.ts` — LLM Provider Config

```typescript
// ═══════════════════════════════════════════════════════
// LLM PROVIDER SELECTION
//
// User selects their preferred LLM before starting
// their CCC season. Supports:
//   - Self-hosted (Ollama)
//   - Bare metal (vLLM, TGI)
//   - Cloud (OpenRouter, Together, Groq)
// ═══════════════════════════════════════════════════════

export interface LLMProvider {
  id: string;
  name: string;
  type: "self-hosted" | "bare-metal" | "cloud";
  icon: string;
  description: string;
  models: LLMModel[];
  configFields: ConfigField[];
}

export interface LLMModel {
  id: string;
  name: string;
  contextWindow: number;
  recommended?: boolean;
}

export interface ConfigField {
  key: string;
  label: string;
  type: "text" | "url" | "password" | "select";
  placeholder: string;
  required: boolean;
}

export const LLM_PROVIDERS: LLMProvider[] = [
  {
    id: "ollama",
    name: "Ollama",
    type: "self-hosted",
    icon: "🦙",
    description: "Self-hosted, fully private. Runs on your machine.",
    models: [
      { id: "llama3.2:3b", name: "Llama 3.2 (3B)", contextWindow: 128000, recommended: true },
      { id: "llama3.2:8b", name: "Llama 3.2 (8B)", contextWindow: 128000 },
      { id: "mistral:7b", name: "Mistral (7B)", contextWindow: 32000 },
      { id: "qwen2.5:7b", name: "Qwen 2.5 (7B)", contextWindow: 128000 },
      { id: "phi-3:3.8b", name: "Phi-3 (3.8B)", contextWindow: 128000 },
    ],
    configFields: [
      { key: "baseUrl", label: "Ollama URL", type: "url", placeholder: "http://localhost:11434", required: true },
    ],
  },
  {
    id: "vllm",
    name: "vLLM",
    type: "bare-metal",
    icon: "⚡",
    description: "High-throughput inference server. GPU required.",
    models: [
      { id: "meta-llama/Llama-3.2-8B-Instruct", name: "Llama 3.2 8B", contextWindow: 128000, recommended: true },
      { id: "mistralai/Mistral-7B-Instruct-v0.3", name: "Mistral 7B", contextWindow: 32000 },
    ],
    configFields: [
      { key: "baseUrl", label: "vLLM URL", type: "url", placeholder: "http://localhost:8000", required: true },
      { key: "apiKey", label: "API Key", type: "password", placeholder: "Optional", required: false },
    ],
  },
  {
    id: "llamacpp",
    name: "llama.cpp",
    type: "bare-metal",
    icon: "🔧",
    description: "CPU-optimized inference. No GPU needed.",
    models: [
      { id: "llama-3.2-3b", name: "Llama 3.2 (3B GGUF)", contextWindow: 128000, recommended: true },
    ],
    configFields: [
      { key: "baseUrl", label: "Server URL", type: "url", placeholder: "http://localhost:8080", required: true },
    ],
  },
  {
    id: "openrouter",
    name: "OpenRouter",
    type: "cloud",
    icon: "🌐",
    description: "Access 100+ models via single API.",
    models: [
      { id: "anthropic/claude-opus-4", name: "Claude Opus 4", contextWindow: 1000000, recommended: true },
      { id: "meta-llama/llama-3.2-70b", name: "Llama 3.2 70B", contextWindow: 128000 },
      { id: "google/gemini-2.0-flash", name: "Gemini 2.0 Flash", contextWindow: 1000000 },
    ],
    configFields: [
      { key: "apiKey", label: "OpenRouter API Key", type: "password", placeholder: "sk-or-...", required: true },
    ],
  },
  {
    id: "together",
    name: "Together AI",
    type: "cloud",
    icon: "🤝",
    description: "Fast inference for open-source models.",
    models: [
      { id: "meta-llama/Llama-3.2-70B-Instruct", name: "Llama 3.2 70B", contextWindow: 128000, recommended: true },
      { id: "mistralai/Mixtral-8x22B", name: "Mixtral 8x22B", contextWindow: 65000 },
    ],
    configFields: [
      { key: "apiKey", label: "Together API Key", type: "password", placeholder: "tok-...", required: true },
    ],
  },
  {
    id: "groq",
    name: "Groq",
    type: "cloud",
    icon: "⚡",
    description: "Ultra-fast inference on LPU hardware.",
    models: [
      { id: "llama-3.2-70b-versatile", name: "Llama 3.2 70B", contextWindow: 128000, recommended: true },
      { id: "mixtral-8x7b-32768", name: "Mixtral 8x7B", contextWindow: 32768 },
    ],
    configFields: [
      { key: "apiKey", label: "Groq API Key", type: "password", placeholder: "gsk_...", required: true },
    ],
  },
];

export function getProviderById(id: string): LLMProvider | undefined {
  return LLM_PROVIDERS.find((p) => p.id === id);
}
```

---

### `apps/web/lib/store.ts` — Zustand Store (Extended)

```typescript
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface UserConfig {
  ccc: string | null;
  contributor: string | null;
  walletAddress: string | null;
  llmProvider: string | null;
  llmModel: string | null;
  llmConfig: Record<string, string>;
  onboarded: boolean;
  seasonStarted: boolean;
}

interface AppStore extends UserConfig {
  setCCC: (ccc: string) => void;
  setContributor: (name: string) => void;
  setWallet: (address: string) => void;
  setLLM: (provider: string, model: string, config: Record<string, string>) => void;
  completeOnboarding: () => void;
  startSeason: () => void;
  reset: () => void;
}

export const useAppStore = create<AppStore>()(
  persist(
    (set) => ({
      ccc: null,
      contributor: null,
      walletAddress: null,
      llmProvider: null,
      llmModel: null,
      llmConfig: {},
      onboarded: false,
      seasonStarted: false,

      setCCC: (ccc) => set({ ccc }),
      setContributor: (contributor) => set({ contributor }),
      setWallet: (walletAddress) => set({ walletAddress }),
      setLLM: (llmProvider, llmModel, llmConfig) =>
        set({ llmProvider, llmModel, llmConfig }),
      completeOnboarding: () => set({ onboarded: true }),
      startSeason: () => set({ seasonStarted: true }),
      reset: () =>
        set({
          ccc: null,
          contributor: null,
          walletAddress: null,
          llmProvider: null,
          llmModel: null,
          llmConfig: {},
          onboarded: false,
          seasonStarted: false,
        }),
    }),
    { name: "ccc-gateway-config" }
  )
);
```

---

### `apps/web/app/(gateway)/providers.tsx` — Root Providers

```tsx
"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { PrivyProvider } from "@privy-io/react-auth";
import { Toaster } from "sonner";
import { useState } from "react";
import { PRIVY_APP_ID, privyConfig } from "@/lib/privy";

export function GatewayProviders({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <PrivyProvider appId={PRIVY_APP_ID} config={privyConfig}>
      <QueryClientProvider client={queryClient}>
        {children}
        <Toaster richColors position="bottom-right" />
      </QueryClientProvider>
    </PrivyProvider>
  );
}
```

---

### `apps/web/app/(gateway)/page.tsx` — Landing / Auth Gate

```tsx
"use client";

import { usePrivy } from "@privy-io/react-auth";
import { useAppStore } from "@/lib/store";
import { LandingPage } from "@/components/gateway/landing-page";
import { OnboardingFlow } from "@/components/gateway/onboarding-flow";
import { Dashboard } from "@/components/gateway/dashboard";

export default function GatewayPage() {
  const { authenticated, ready } = usePrivy();
  const { onboarded, seasonStarted } = useAppStore();

  if (!ready) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin text-4xl">🤝</div>
      </div>
    );
  }

  // Step 1: Not logged in → Landing with Privy login
  if (!authenticated) return <LandingPage />;

  // Step 2: Logged in but not onboarded → Onboarding flow
  if (!onboarded) return <OnboardingFlow />;

  // Step 3: Onboarded → Full dashboard
  return <Dashboard />;
}
```

---

### `components/gateway/landing-page.tsx` — Privy Login

```tsx
"use client";

import { usePrivy } from "@privy-io/react-auth";
import { motion } from "framer-motion";

export function LandingPage() {
  const { login } = usePrivy();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-950 via-indigo-950 to-slate-950">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-lg w-full mx-4"
      >
        <div className="text-center mb-8">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", delay: 0.2 }}
            className="text-7xl mb-4"
          >
            🤝
          </motion.div>
          <h1 className="text-4xl font-bold text-white mb-2">CCC Gateway</h1>
          <p className="text-lg text-indigo-300">#FedArch Agent Governance</p>
          <p className="text-sm text-slate-400 mt-2">
            Cooperative agent governance for the Agentic Society
          </p>
        </div>

        <div className="bg-slate-900/50 backdrop-blur border border-slate-800 rounded-2xl p-8">
          <div className="space-y-4 mb-6">
            {[
              { icon: "🆔", text: "Generate CCC-IDs for every contribution" },
              { icon: "📜", text: "Attest to Hedera Consensus Service" },
              { icon: "🏐", text: "Coordinate via #ContextVolley" },
              { icon: "🔒", text: "Enforce governance with SharedKernel" },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 + i * 0.1 }}
                className="flex items-center gap-3 text-slate-300"
              >
                <span className="text-xl">{item.icon}</span>
                <span className="text-sm">{item.text}</span>
              </motion.div>
            ))}
          </div>

          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            onClick={login}
            className="w-full py-3 px-6 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-semibold text-lg transition-colors"
          >
            Enter the Gateway
          </motion.button>

          <p className="text-xs text-center text-slate-500 mt-4">
            Login with Google or MetaMask
          </p>
        </div>

        <div className="text-center mt-6 text-xs text-slate-600">
          ♾️ WeOwnNet 🌐 • Team weown • ETHDenver 2026
        </div>
      </motion.div>
    </div>
  );
}
```

---

### `components/gateway/onboarding-flow.tsx` — CCC + LLM Selection

```tsx
"use client";

import { useState } from "react";
import { usePrivy } from "@privy-io/react-auth";
import { motion, AnimatePresence } from "framer-motion";
import { useAppStore } from "@/lib/store";
import { LLM_PROVIDERS, type LLMProvider, type LLMModel } from "@/lib/llm-providers";
import { useConnectAgent } from "@/lib/gateway-client";
import { toast } from "sonner";

type Step = "ccc" | "llm" | "confirm";

export function OnboardingFlow() {
  const [step, setStep] = useState<Step>("ccc");
  const { user } = usePrivy();
  const store = useAppStore();
  const connectAgent = useConnectAgent();

  // ── Step 1: CCC Code ──
  const [ccc, setCcc] = useState("");
  const [contributor, setContributor] = useState("");

  // ── Step 2: LLM ──
  const [selectedProvider, setSelectedProvider] = useState<LLMProvider | null>(null);
  const [selectedModel, setSelectedModel] = useState<LLMModel | null>(null);
  const [llmConfig, setLlmConfig] = useState<Record<string, string>>({});

  const handleCCCSubmit = () => {
    if (ccc.length !== 3) return;
    store.setCCC(ccc.toUpperCase());
    store.setContributor(contributor || ccc);
    store.setWallet(user?.wallet?.address || "");
    setStep("llm");
  };

  const handleLLMSubmit = () => {
    if (!selectedProvider || !selectedModel) return;
    store.setLLM(selectedProvider.id, selectedModel.id, llmConfig);
    setStep("confirm");
  };

  const handleConfirm = async () => {
    try {
      await connectAgent.mutateAsync({
        ccc: store.ccc!,
        contributor: store.contributor || undefined,
        tier: "contributor",
      });
      store.completeOnboarding();
      toast.success(`Welcome, AI:@${store.ccc}! 🤝`);
    } catch (err) {
      toast.error(`Registration failed: ${err}`);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-950 via-indigo-950 to-slate-950 p-4">
      <div className="max-w-2xl w-full">
        {/* Progress */}
        <div className="flex items-center justify-center gap-2 mb-8">
          {(["ccc", "llm", "confirm"] as Step[]).map((s, i) => (
            <div key={s} className="flex items-center gap-2">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                step === s ? "bg-indigo-600 text-white" :
                ["ccc", "llm", "confirm"].indexOf(step) > i ? "bg-green-600 text-white" :
                "bg-slate-800 text-slate-500"
              }`}>
                {["ccc", "llm", "confirm"].indexOf(step) > i ? "✓" : i + 1}
              </div>
              {i < 2 && <div className="w-12 h-0.5 bg-slate-800" />}
            </div>
          ))}
        </div>

        <AnimatePresence mode="wait">
          {step === "ccc" && (
            <motion.div key="ccc" initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -50 }}
              className="bg-slate-900/50 backdrop-blur border border-slate-800 rounded-2xl p-8"
            >
              <h2 className="text-2xl font-bold text-white mb-2">Your CCC Code</h2>
              <p className="text-slate-400 text-sm mb-6">Choose your 3-letter Contributor Code Convention identifier.</p>

              <div className="space-y-4">
                <div>
                  <label className="text-xs text-slate-500 uppercase">CCC Code</label>
                  <input
                    value={ccc}
                    onChange={(e) => setCcc(e.target.value.toUpperCase().replace(/[^A-Z]/g, "").slice(0, 3))}
                    placeholder="LDC"
                    maxLength={3}
                    className="w-full mt-1 px-4 py-3 bg-slate-800 border border-slate-700 rounded-xl text-white text-3xl font-mono text-center tracking-[0.5em] uppercase"
                  />
                </div>
                <div>
                  <label className="text-xs text-slate-500 uppercase">Your Name</label>
                  <input
                    value={contributor}
                    onChange={(e) => setContributor(e.target.value)}
                    placeholder="Dhruv"
                    className="w-full mt-1 px-4 py-3 bg-slate-800 border border-slate-700 rounded-xl text-white"
                  />
                </div>
                <button onClick={handleCCCSubmit} disabled={ccc.length !== 3}
                  className="w-full py-3 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white rounded-xl font-semibold transition-colors"
                >
                  Continue →
                </button>
              </div>
            </motion.div>
          )}

          {step === "llm" && (
            <motion.div key="llm" initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -50 }}
              className="bg-slate-900/50 backdrop-blur border border-slate-800 rounded-2xl p-8"
            >
              <h2 className="text-2xl font-bold text-white mb-2">Select Your LLM</h2>
              <p className="text-slate-400 text-sm mb-6">Choose your inference provider for the CCC season.</p>

              {/* Provider Type Tabs */}
              <div className="flex gap-2 mb-4">
                {(["self-hosted", "bare-metal", "cloud"] as const).map((type) => (
                  <button key={type}
                    onClick={() => { setSelectedProvider(null); setSelectedModel(null); }}
                    className="px-3 py-1 text-xs rounded-full bg-slate-800 text-slate-400 hover:text-white transition-colors"
                  >
                    {type === "self-hosted" ? "🏠 Self-Hosted" : type === "bare-metal" ? "🖥️ Bare Metal" : "☁️ Cloud"}
                  </button>
                ))}
              </div>

              {/* Provider Cards */}
              <div className="grid grid-cols-2 gap-3 mb-4">
                {LLM_PROVIDERS.map((p) => (
                  <button key={p.id} onClick={() => { setSelectedProvider(p); setSelectedModel(p.models.find(m => m.recommended) || p.models[0]); }}
                    className={`p-3 rounded-xl border text-left transition-all ${
                      selectedProvider?.id === p.id ? "border-indigo-500 bg-indigo-950/50" : "border-slate-700 hover:border-slate-600 bg-slate-800/50"
                    }`}
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <span>{p.icon}</span>
                      <span className="font-semibold text-white text-sm">{p.name}</span>
                    </div>
                    <p className="text-xs text-slate-500">{p.description}</p>
                  </button>
                ))}
              </div>

              {/* Model + Config */}
              {selectedProvider && (
                <div className="space-y-3 border-t border-slate-800 pt-4">
                  <div>
                    <label className="text-xs text-slate-500 uppercase">Model</label>
                    <select
                      value={selectedModel?.id || ""}
                      onChange={(e) => setSelectedModel(selectedProvider.models.find(m => m.id === e.target.value) || null)}
                      className="w-full mt-1 px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white text-sm"
                    >
                      {selectedProvider.models.map((m) => (
                        <option key={m.id} value={m.id}>
                          {m.name} ({(m.contextWindow / 1000).toFixed(0)}K ctx){m.recommended ? " ⭐" : ""}
                        </option>
                      ))}
                    </select>
                  </div>
                  {selectedProvider.configFields.map((field) => (
                    <div key={field.key}>
                      <label className="text-xs text-slate-500 uppercase">{field.label}</label>
                      <input
                        type={field.type === "password" ? "password" : "text"}
                        value={llmConfig[field.key] || ""}
                        onChange={(e) => setLlmConfig({ ...llmConfig, [field.key]: e.target.value })}
                        placeholder={field.placeholder}
                        className="w-full mt-1 px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white text-sm"
                      />
                    </div>
                  ))}
                </div>
              )}

              <div className="flex gap-3 mt-6">
                <button onClick={() => setStep("ccc")} className="flex-1 py-3 bg-slate-800 text-white rounded-xl">← Back</button>
                <button onClick={handleLLMSubmit} disabled={!selectedProvider || !selectedModel}
                  className="flex-1 py-3 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white rounded-xl font-semibold transition-colors"
                >
                  Continue →
                </button>
              </div>
            </motion.div>
          )}

          {step === "confirm" && (
            <motion.div key="confirm" initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -50 }}
              className="bg-slate-900/50 backdrop-blur border border-slate-800 rounded-2xl p-8"
            >
              <h2 className="text-2xl font-bold text-white mb-6">Confirm Setup</h2>

              <div className="space-y-3 mb-6">
                <Row label="CCC Code" value={store.ccc || ""} />
                <Row label="Agent ID" value={`AI:@${store.ccc}`} />
                <Row label="Contributor" value={store.contributor || ""} />
                <Row label="LLM Provider" value={selectedProvider?.name || ""} />
                <Row label="Model" value={selectedModel?.name || ""} />
                <Row label="Season" value="#WeOwnSeason003" />
              </div>

              <div className="flex gap-3">
                <button onClick={() => setStep("llm")} className="flex-1 py-3 bg-slate-800 text-white rounded-xl">← Back</button>
                <button onClick={handleConfirm} disabled={connectAgent.isPending}
                  className="flex-1 py-3 bg-green-600 hover:bg-green-500 disabled:opacity-50 text-white rounded-xl font-semibold transition-colors"
                >
                  {connectAgent.isPending ? "Registering..." : "🚀 Launch Gateway"}
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between py-2 border-b border-slate-800">
      <span className="text-slate-500 text-sm">{label}</span>
      <span className="text-white font-mono text-sm">{value}</span>
    </div>
  );
}
```

---

### `components/gateway/dashboard.tsx` — Main Dashboard with Chat + Onchain

```tsx
"use client";

import { useState } from "react";
import { useAppStore } from "@/lib/store";
import { useGatewayStats, useEvents } from "@/lib/gateway-client";
import { Sidebar } from "./sidebar";
import { TopBar } from "./top-bar";
import { ChatPanel } from "./chat-panel";
import { OnchainFeed } from "./onchain-feed";
import { StatsCards } from "./stats-cards";

export function Dashboard() {
  const { ccc } = useAppStore();
  const [activePanel, setActivePanel] = useState<"chat" | "onchain">("chat");

  return (
    <div className="flex h-screen bg-slate-950">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <TopBar />
        <div className="p-4">
          <StatsCards />
        </div>

        {/* Main Content — Split View */}
        <div className="flex-1 flex overflow-hidden">
          {/* Left: Chat + Agent Orchestration */}
          <div className="flex-1 border-r border-slate-800">
            <ChatPanel />
          </div>

          {/* Right: Real-time Onchain Feed */}
          <div className="w-96">
            <OnchainFeed />
          </div>
        </div>
      </div>
    </div>
  );
}
```

---

### `components/gateway/chat-panel.tsx` — Chat with Multi-Agent Orchestration

```tsx
"use client";

import { useState, useRef, useEffect } from "react";
import { useAppStore } from "@/lib/store";
import { useGenerateCCCId, useSendVolley } from "@/lib/gateway-client";
import { motion, AnimatePresence } from "framer-motion";
import ReactMarkdown from "react-markdown";
import { toast } from "sonner";
import { Send, Hash, Zap } from "lucide-react";

interface Message {
  id: string;
  role: "user" | "assistant" | "system" | "agent";
  content: string;
  agentId?: string;
  cccId?: string;
  txHash?: string;
  timestamp: Date;
}

export function ChatPanel() {
  const { ccc, llmProvider, llmModel, llmConfig } = useAppStore();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      role: "system",
      content: `Welcome to CCC Gateway, AI:@${ccc}! 🤝\n\nYou're connected to #FedArch with **${llmProvider}** (${llmModel}).\n\nType a message to start contributing. Every interaction generates a CCC-ID attested to Hedera.`,
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [isThinking, setIsThinking] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const generateCCCId = useGenerateCCCId();

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isThinking) return;

    const userMsg: Message = {
      id: crypto.randomUUID(),
      role: "user",
      content: input,
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsThinking(true);

    // Generate CCC-ID for this interaction
    try {
      const cccResult = await generateCCCId.mutateAsync({
        ccc: ccc!,
        workspace: "CCC",
      });

      const cccIdMsg: Message = {
        id: crypto.randomUUID(),
        role: "system",
        content: `🆔 **${cccResult.id}** generated (+${cccResult.reward} $CCC)`,
        cccId: cccResult.id,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, cccIdMsg]);

      // Call LLM
      const response = await callLLM(input);

      const assistantMsg: Message = {
        id: crypto.randomUUID(),
        role: "assistant",
        content: response,
        agentId: `AI:@${ccc}`,
        cccId: cccResult.id,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, assistantMsg]);
    } catch (err) {
      toast.error(`Error: ${err}`);
    }

    setIsThinking(false);
  };

  const callLLM = async (prompt: string): Promise<string> => {
    const baseUrl = llmConfig?.baseUrl || "http://localhost:11434";

    if (llmProvider === "ollama") {
      const res = await fetch(`${baseUrl}/api/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: llmModel,
          messages: [
            { role: "system", content: `You are AI:@${ccc}, a #FedArch agent. Be concise. Use tables. #LessIsMore.` },
            { role: "user", content: prompt },
          ],
          stream: false,
        }),
      });
      const data = await res.json();
      return data.message?.content || "No response";
    }

    // Cloud providers via OpenAI-compatible API
    const apiKey = llmConfig?.apiKey || "";
    const apiUrl = llmProvider === "openrouter"
      ? "https://openrouter.ai/api/v1/chat/completions"
      : llmProvider === "together"
      ? "https://api.together.xyz/v1/chat/completions"
      : llmProvider === "groq"
      ? "https://api.groq.com/openai/v1/chat/completions"
      : `${baseUrl}/v1/chat/completions`;

    const res = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: llmModel,
        messages: [
          { role: "system", content: `You are AI:@${ccc}, a #FedArch agent.` },
          { role: "user", content: prompt },
        ],
      }),
    });
    const data = await res.json();
    return data.choices?.[0]?.message?.content || "No response";
  };

  return (
    <div className="flex flex-col h-full">
      {/* Messages */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-3">
        <AnimatePresence>
          {messages.map((msg) => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
            >
              <div className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                msg.role === "user" ? "bg-indigo-600 text-white" :
                msg.role === "system" ? "bg-slate-800/50 text-slate-300 border border-slate-700" :
                "bg-slate-800 text-slate-200"
              }`}>
                {msg.agentId && (
                  <div className="text-xs text-indigo-400 font-mono mb-1">{msg.agentId}</div>
                )}
                {msg.cccId && (
                  <div className="text-xs text-green-400 font-mono mb-1">📎 {msg.cccId}</div>
                )}
                <div className="text-sm prose prose-invert prose-sm max-w-none">
                  <ReactMarkdown>{msg.content}</ReactMarkdown>
                </div>
                <div className="text-xs text-slate-500 mt-1">
                  {msg.timestamp.toLocaleTimeString()}
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {isThinking && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center gap-2 text-slate-500">
            <div className="flex gap-1">
              {[0, 1, 2].map((i) => (
                <motion.div key={i} animate={{ y: [0, -5, 0] }} transition={{ repeat: Infinity, delay: i * 0.15, duration: 0.6 }}
                  className="w-2 h-2 bg-indigo-500 rounded-full" />
              ))}
            </div>
            <span className="text-xs">AI:@{ccc} is thinking...</span>
          </motion.div>
        )}
      </div>

      {/* Input */}
      <div className="border-t border-slate-800 p-4">
        <div className="flex items-center gap-2">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && handleSend()}
            placeholder={`Message AI:@${ccc}...`}
            className="flex-1 px-4 py-3 bg-slate-800 border border-slate-700 rounded-xl text-white placeholder:text-slate-500 focus:outline-none focus:border-indigo-500"
          />
          <button onClick={handleSend} disabled={!input.trim() || isThinking}
            className="p-3 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white rounded-xl transition-colors"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
        <div className="flex items-center gap-3 mt-2 text-xs text-slate-600">
          <span className="flex items-center gap-1"><Hash className="w-3 h-3" /> CCC-ID auto-generated</span>
          <span className="flex items-center gap-1"><Zap className="w-3 h-3" /> HCS attested</span>
        </div>
      </div>
    </div>
  );
}
```

---

### `components/gateway/onchain-feed.tsx` — Real-Time Onchain Interactions

```tsx
"use client";

import { useEvents, useGatewayStats } from "@/lib/gateway-client";
import { useQuery } from "@tanstack/react-query";
import { motion, AnimatePresence } from "framer-motion";
import { Activity, ExternalLink } from "lucide-react";

const API = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3002";

export function OnchainFeed() {
  const { data: events } = useEvents(30);
  const { data: onchain } = useQuery({
    queryKey: ["onchain"],
    queryFn: () => fetch(`${API}/gateway/onchain`).then((r) => r.json()),
    refetchInterval: 5000,
  });

  const TYPE_CONFIG: Record<string, { icon: string; color: string }> = {
    CONNECT: { icon: "🔌", color: "text-blue-400" },
    "CCC-ID": { icon: "🆔", color: "text-green-400" },
    VOLLEY: { icon: "🏐", color: "text-purple-400" },
    BROADCAST: { icon: "📢", color: "text-orange-400" },
    GOVERNANCE: { icon: "🔒", color: "text-red-400" },
    BAD_AGENT: { icon: "🚨", color: "text-red-500" },
  };

  return (
    <div className="flex flex-col h-full border-l border-slate-800">
      {/* Header */}
      <div className="p-4 border-b border-slate-800">
        <div className="flex items-center gap-2">
          <Activity className="w-4 h-4 text-green-400 animate-pulse" />
          <h3 className="font-semibold text-white text-sm">Onchain Activity</h3>
        </div>

        {/* Onchain Stats */}
        {onchain?.ok && (
          <div className="grid grid-cols-2 gap-2 mt-3">
            <Stat label="Agents" value={onchain.totalAgents} />
            <Stat label="CCC-IDs" value={onchain.totalCCCIds} />
            <Stat label="VSAs" value={onchain.totalVSAs} />
            <Stat label="Season" value={onchain.currentSeason} />
          </div>
        )}
      </div>

      {/* Feed */}
      <div className="flex-1 overflow-y-auto">
        <AnimatePresence>
          {(events?.events || []).map((event: any, i: number) => {
            const config = TYPE_CONFIG[event.type] || { icon: "📌", color: "text-slate-400" };
            return (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
                className="px-4 py-3 border-b border-slate-800/50 hover:bg-slate-900/50 transition-colors"
              >
                <div className="flex items-start gap-2">
                  <span className="text-sm mt-0.5">{config.icon}</span>
                  <div className="flex-1 min-w-0">
                    <p className={`text-xs font-medium ${config.color}`}>{event.type}</p>
                    <p className="text-xs text-slate-400 truncate">{event.summary}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-[10px] text-slate-600 font-mono">{event.agent}</span>
                      <span className="text-[10px] text-slate-700">
                        {new Date(event.timestamp).toLocaleTimeString()}
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>

        {(!events?.events || events.events.length === 0) && (
          <div className="flex flex-col items-center justify-center h-40 text-slate-600">
            <Activity className="w-6 h-6 mb-2 opacity-50" />
            <p className="text-xs">Waiting for onchain activity...</p>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="p-3 border-t border-slate-800 text-center">
        <a href="https://sepolia.basescan.org" target="_blank" rel="noopener noreferrer"
          className="text-xs text-indigo-400 hover:text-indigo-300 flex items-center justify-center gap-1"
        >
          View on BaseScan <ExternalLink className="w-3 h-3" />
        </a>
      </div>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: number | string }) {
  return (
    <div className="bg-slate-800/50 rounded-lg p-2">
      <p className="text-[10px] text-slate-500 uppercase">{label}</p>
      <p className="text-sm font-bold text-white">{value}</p>
    </div>
  );
}
```

---

## 📋 USER FLOW SUMMARY

```
┌─────────────────────────────────────────┐
│  1. LANDING PAGE                         │
│     Privy Login (Google / MetaMask)      │
└────────────────┬────────────────────────┘
                 │ authenticated
                 ▼
┌─────────────────────────────────────────┐
│  2. ONBOARDING — Step 1: CCC Code       │
│     Enter 3-letter code + name           │
└────────────────┬────────────────────────┘
                 │
                 ▼
┌─────────────────────────────────────────┐
│  3. ONBOARDING — Step 2: LLM Selection  │
│     Self-hosted / Bare-metal / Cloud     │
│     Provider → Model → Config            │
└────────────────┬────────────────────────┘
                 │
                 ▼
┌─────────────────────────────────────────┐
│  4. ONBOARDING — Step 3: Confirm         │
│     Review → Register on Gateway         │
│     → Onchain identity (ERC-8004)        │
└────────────────┬────────────────────────┘
                 │ registered
                 ▼
┌─────────────────────────────────────────┐
│  5. DASHBOARD                            │
│  ┌──────────┬──────────────┬──────────┐ │
│  │ Sidebar  │  Chat Panel  │ Onchain  │ │
│  │          │  + Agent     │ Feed     │ │
│  │  Nav     │  Orchestr.   │ (live)   │ │
│  │          │              │          │ │
│  │  Stats   │  CCC-ID auto │ Events   │ │
│  │  Agents  │  HCS attest  │ Txs      │ │
│  │  Gov     │  LLM response│ Stats    │ │
│  └──────────┴──────────────┴──────────┘ │
└─────────────────────────────────────────┘
```

---

## 📋 FILE MANIFEST — NET NEW

| # | File | Purpose |
|---|------|---------|
| **API (3.1)** | | |
| 1 | `apps/api/lib/contracts.ts` | 11-contract ethers.js client |
| 2 | `apps/api/app/gateway/onchain/route.ts` | Onchain stats |
| 3 | `apps/api/app/gateway/onchain/register/route.ts` | Onchain registration |
| **Web (3.2)** | | |
| 4 | `apps/web/lib/privy.ts` | Privy config |
| 5 | `apps/web/lib/llm-providers.ts` | 6 LLM providers |
| 6 | `apps/web/lib/store.ts` | Zustand persistent store |
| 7 | `apps/web/app/(gateway)/providers.tsx` | Privy + Query providers |
| 8 | `apps/web/app/(gateway)/page.tsx` | Auth gate (3 states) |
| 9 | `components/gateway/landing-page.tsx` | Privy login |
| 10 | `components/gateway/onboarding-flow.tsx` | CCC + LLM selection |
| 11 | `components/gateway/dashboard.tsx` | Split-view dashboard |
| 12 | `components/gateway/chat-panel.tsx` | Chat + multi-agent |
| 13 | `components/gateway/onchain-feed.tsx` | Real-time onchain |

**13 new files. Full demo application.**

---

## 🎯 QUICK COMMANDS — @LDC

| # | Option |
|---|--------|
| 1 | 🧪 **E2E test** — full flow: login → onboard → chat → verify onchain |
| 2 | 🎬 **Demo video script** — 3-min walkthrough for judges |
| 3 | 🚀 **Deploy to INT-E01** — docker build + push |

---

**STOP.** Full demo app: Privy auth → CCC onboarding → LLM selection (6 providers) → Chat with auto CCC-ID generation + HCS attestation → Real-time onchain feed. All wired to 11 contracts on Base Sepolia. This is the ETHDenver demo, @LDC. 🏔️🔥

#FlowsBros #WeOwnSeason003 #ETHDenver2026 #BUIDLathon

♾️ WeOwnNet 🌐
```

## File: docs-specs/protocol-8004-setup-tasks.md
```


LDC_2026-W08_005 | 🤝 THE HANDS | INT-P01:CCC

FROM: AI:@LDC @ INT-P01:CCC

---

## 🔥 ERC-8004 × #FedArch — Foundry Implementation with OpenZeppelin

Proper Solidity contracts using Foundry + `lib/openzeppelin-contracts` + `lib/forge-std` in `packages/adi/`.

Per [github.com/OpenZeppelin/openzeppelin-foundry-upgrades](https://github.com/OpenZeppelin/openzeppelin-foundry-upgrades) and [docs.sei.io](https://docs.sei.io/evm/evm-foundry) for Foundry best practices.

---

### `packages/adi/` — Agent Decentralized Identity

```
packages/adi/
├── foundry.toml
├── package.json
├── remappings.txt
├── .gitmodules
├── lib/
│   ├── forge-std/                     # forge install foundry-rs/forge-std
│   └── openzeppelin-contracts/        # forge install OpenZeppelin/openzeppelin-contracts
├── src/
│   ├── AgentIdentityRegistry.sol      # ERC-8004 Identity — ERC-721 + Agent Registration
│   ├── AgentReputationRegistry.sol    # ERC-8004 Reputation — Feedback signals
│   ├── AgentValidationRegistry.sol    # ERC-8004 Validation — VSA attestations
│   ├── CCCGovernanceToken.sol         # $CCC Governance Token (ERC-20 Votes)
│   ├── interfaces/
│   │   ├── IAgentIdentityRegistry.sol
│   │   ├── IAgentReputationRegistry.sol
│   │   └── IAgentValidationRegistry.sol
│   └── libraries/
│       └── CCCLib.sol                 # CCC-ID validation + parsing
├── script/
│   └── Deploy.s.sol                   # Deployment script
├── test/
│   ├── AgentIdentityRegistry.t.sol
│   ├── AgentReputationRegistry.t.sol
│   ├── AgentValidationRegistry.t.sol
│   ├── CCCGovernanceToken.t.sol
│   └── Integration.t.sol             # Full E2E flow
└── README.md
```

---

### `packages/adi/foundry.toml`

```toml
[profile.default]
src = "src"
out = "out"
libs = ["lib"]
solc_version = "0.8.24"
optimizer = true
optimizer_runs = 200
via_ir = true
ffi = false

[rpc_endpoints]
base_sepolia = "${BASE_SEPOLIA_RPC}"
base_mainnet = "${BASE_MAINNET_RPC}"
hedera_testnet = "https://testnet.hashio.io/api"

[etherscan]
base_sepolia = { key = "${BASESCAN_API_KEY}", url = "https://api-sepolia.basescan.org/api" }

[fmt]
line_length = 120
tab_width = 4
bracket_spacing = true
```

---

### `packages/adi/remappings.txt`

```
@openzeppelin/contracts/=lib/openzeppelin-contracts/contracts/
forge-std/=lib/forge-std/src/
```

---

### `packages/adi/.gitmodules`

```
[submodule "lib/forge-std"]
    path = lib/forge-std
    url = https://github.com/foundry-rs/forge-std

[submodule "lib/openzeppelin-contracts"]
    path = lib/openzeppelin-contracts
    url = https://github.com/OpenZeppelin/openzeppelin-contracts
```

---

### `packages/adi/package.json`

```json
{
  "name": "@ccc-gateway/adi",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "build": "forge build",
    "test": "forge test -vvv",
    "test:gas": "forge test --gas-report",
    "deploy:base-sepolia": "forge script script/Deploy.s.sol --rpc-url base_sepolia --broadcast --verify",
    "deploy:hedera-testnet": "forge script script/Deploy.s.sol --rpc-url hedera_testnet --broadcast",
    "fmt": "forge fmt",
    "snapshot": "forge snapshot"
  }
}
```

---

### `packages/adi/src/libraries/CCCLib.sol` — CCC Utility Library

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

/// @title CCCLib — Contributor Code Convention Utilities
/// @author Team weown (@LDC, @SHD, @RMN) — ETHDenver 2026
/// @notice Validation and parsing for CCC-ID format: <CCC>_<YYYY>-W<WW>_<NNN>
library CCCLib {
    /// @notice Validate CCC code is exactly 3 uppercase ASCII letters
    function isValidCCC(string memory ccc) internal pure returns (bool) {
        bytes memory b = bytes(ccc);
        if (b.length != 3) return false;
        for (uint256 i = 0; i < 3; i++) {
            if (b[i] < 0x41 || b[i] > 0x5A) return false; // A-Z
        }
        return true;
    }

    /// @notice Validate ISO week number (1-53)
    function isValidWeek(uint8 week) internal pure returns (bool) {
        return week >= 1 && week <= 53;
    }

    /// @notice Validate CCC-ID sequence (1-999)
    function isValidSequence(uint16 sequence) internal pure returns (bool) {
        return sequence >= 1 && sequence <= 999;
    }

    /// @notice Check if sequence is a reserved slot
    /// @dev _001 = WeeklySummary, _002 = WeeklyPlan, _003 = WeeklyReflection
    function isReservedSlot(uint16 sequence) internal pure returns (bool) {
        return sequence >= 1 && sequence <= 3;
    }

    /// @notice First assignable sequence number
    function firstAssignable() internal pure returns (uint16) {
        return 4;
    }

    /// @notice Build CCC-ID string from components
    function buildCCCId(
        string memory ccc,
        uint16 year,
        uint8 week,
        uint16 sequence
    ) internal pure returns (string memory) {
        return string(
            abi.encodePacked(
                ccc,
                "_",
                _uint16ToString(year),
                "-W",
                _uint8PadTwo(week),
                "_",
                _uint16PadThree(sequence)
            )
        );
    }

    /// @notice Hash a CCC-ID for mapping keys
    function hashCCCId(
        string memory ccc,
        uint16 year,
        uint8 week
    ) internal pure returns (bytes32) {
        return keccak256(abi.encodePacked(ccc, year, week));
    }

    // ── Internal Helpers ──

    function _uint16ToString(uint16 value) private pure returns (string memory) {
        if (value == 0) return "0";
        uint16 temp = value;
        uint8 digits;
        while (temp != 0) {
            digits++;
            temp /= 10;
        }
        bytes memory buffer = new bytes(digits);
        while (value != 0) {
            digits--;
            buffer[digits] = bytes1(uint8(48 + uint16(value % 10)));
            value /= 10;
        }
        return string(buffer);
    }

    function _uint8PadTwo(uint8 value) private pure returns (string memory) {
        bytes memory buffer = new bytes(2);
        buffer[0] = bytes1(uint8(48 + value / 10));
        buffer[1] = bytes1(uint8(48 + value % 10));
        return string(buffer);
    }

    function _uint16PadThree(uint16 value) private pure returns (string memory) {
        bytes memory buffer = new bytes(3);
        buffer[0] = bytes1(uint8(48 + value / 100));
        buffer[1] = bytes1(uint8(48 + (value / 10) % 10));
        buffer[2] = bytes1(uint8(48 + value % 10));
        return string(buffer);
    }
}
```

---

### `packages/adi/src/interfaces/IAgentIdentityRegistry.sol`

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

/// @title IAgentIdentityRegistry — ERC-8004 Identity Registry Interface
/// @notice Manages agent identity NFTs with registration files
interface IAgentIdentityRegistry {
    struct AgentInfo {
        string ccc;
        string agentId;
        string tier;
        string homeInstance;
        uint256 registeredAt;
        bool active;
    }

    event AgentRegistered(uint256 indexed agentId, address indexed owner, string ccc, string tokenURI);
    event AgentDeactivated(uint256 indexed agentId, string ccc);
    event AgentReactivated(uint256 indexed agentId, string ccc);

    function register(string calldata ccc, string calldata tokenURI) external returns (uint256 agentId);
    function deactivate(uint256 agentId) external;
    function reactivate(uint256 agentId) external;
    function agentURI(uint256 agentId) external view returns (string memory);
    function agentInfo(uint256 agentId) external view returns (AgentInfo memory);
    function agentIdByCCC(string calldata ccc) external view returns (uint256);
    function isRegistered(string calldata ccc) external view returns (bool);
    function totalAgents() external view returns (uint256);
}
```

---

### `packages/adi/src/interfaces/IAgentReputationRegistry.sol`

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

/// @title IAgentReputationRegistry — ERC-8004 Reputation Registry Interface
/// @notice Manages signed reputation feedback for agents
interface IAgentReputationRegistry {
    struct Feedback {
        uint256 fromAgentId;
        uint256 toAgentId;
        int256 value;
        string feedbackType;
        string refCccId;
        string metadataURI;
        uint256 timestamp;
    }

    event FeedbackGiven(
        uint256 indexed fromAgentId,
        uint256 indexed toAgentId,
        int256 value,
        string feedbackType,
        string refCccId
    );

    function giveFeedback(
        uint256 toAgentId,
        int256 value,
        string calldata feedbackType,
        string calldata refCccId,
        string calldata metadataURI
    ) external;

    function getFeedback(uint256 agentId, uint256 offset, uint256 limit) external view returns (Feedback[] memory);
    function feedbackCount(uint256 agentId) external view returns (uint256);
    function aggregateScore(uint256 agentId) external view returns (int256 total, uint256 positive, uint256 negative);
}
```

---

### `packages/adi/src/interfaces/IAgentValidationRegistry.sol`

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

/// @title IAgentValidationRegistry — ERC-8004 Validation Registry Interface
/// @notice Manages validation request/response workflows (VSA, ISC)
interface IAgentValidationRegistry {
    struct ValidationRecord {
        uint256 requestId;
        uint256 requesterAgentId;
        uint256 validatorAgentId;
        string subject;
        string validationType;
        bool result;
        bool completed;
        uint256 checksTotal;
        uint256 checksPassed;
        string requestMetadataURI;
        string responseMetadataURI;
        uint256 requestTimestamp;
        uint256 responseTimestamp;
    }

    event ValidationRequested(uint256 indexed requestId, uint256 indexed requesterAgentId, string subject);
    event ValidationResponded(uint256 indexed requestId, uint256 indexed validatorAgentId, bool result, uint256 checksPassed, uint256 checksTotal);

    function requestValidation(
        string calldata subject,
        string calldata validationType,
        uint256 checksTotal,
        string calldata metadataURI
    ) external returns (uint256 requestId);

    function respondValidation(
        uint256 requestId,
        bool result,
        uint256 checksPassed,
        string calldata metadataURI
    ) external;

    function getValidation(uint256 requestId) external view returns (ValidationRecord memory);
    function validationCount(uint256 agentId) external view returns (uint256);
    function passRate(uint256 agentId) external view returns (uint256 passed, uint256 total);
}
```

---

### `packages/adi/src/AgentIdentityRegistry.sol`

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "./interfaces/IAgentIdentityRegistry.sol";
import "./libraries/CCCLib.sol";

/// @title AgentIdentityRegistry — ERC-8004 × #FedArch
/// @author Team weown — ETHDenver 2026
/// @notice ERC-721 identity registry for #FedArch agents
/// @dev tokenURI → IPFS Agent Registration File (JSON)
///
/// Governance enforced:
///   R-168: CCC-ID tied to contributor
///   R-206: ADMIN accounts cannot register as user_agent
///   R-212: One agentId per CCC (no duplicates)
contract AgentIdentityRegistry is
    ERC721,
    ERC721URIStorage,
    ERC721Enumerable,
    AccessControl,
    IAgentIdentityRegistry
{
    using Counters for Counters.Counter;

    bytes32 public constant GATEWAY_ROLE = keccak256("GATEWAY_ROLE");
    bytes32 public constant GOVERNANCE_ROLE = keccak256("GOVERNANCE_ROLE");

    Counters.Counter private _agentIds;

    // CCC string → agentId
    mapping(bytes32 => uint256) private _cccToAgentId;

    // agentId → AgentInfo
    mapping(uint256 => AgentInfo) private _agents;

    // Season tracking
    uint256 public currentSeason;

    constructor(
        address gateway,
        address governance,
        uint256 season
    ) ERC721("FedArch Agent Identity", "AGENTID") {
        _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);
        _grantRole(GATEWAY_ROLE, gateway);
        _grantRole(GOVERNANCE_ROLE, governance);
        currentSeason = season;
    }

    /// @inheritdoc IAgentIdentityRegistry
    function register(
        string calldata ccc,
        string calldata tokenURI_
    ) external onlyRole(GATEWAY_ROLE) returns (uint256 agentId) {
        require(CCCLib.isValidCCC(ccc), "ADI: invalid CCC format");
        require(!isRegistered(ccc), "ADI: CCC already registered (R-212)");
        require(bytes(tokenURI_).length > 0, "ADI: tokenURI required");

        _agentIds.increment();
        agentId = _agentIds.current();

        _safeMint(msg.sender, agentId);
        _setTokenURI(agentId, tokenURI_);

        bytes32 cccHash = keccak256(bytes(ccc));
        _cccToAgentId[cccHash] = agentId;

        _agents[agentId] = AgentInfo({
            ccc: ccc,
            agentId: string(abi.encodePacked("AI:@", ccc)),
            tier: "contributor",
            homeInstance: "",
            registeredAt: block.timestamp,
            active: true
        });

        emit AgentRegistered(agentId, msg.sender, ccc, tokenURI_);
    }

    /// @inheritdoc IAgentIdentityRegistry
    function deactivate(uint256 agentId) external onlyRole(GOVERNANCE_ROLE) {
        require(_agents[agentId].active, "ADI: already inactive");
        _agents[agentId].active = false;
        emit AgentDeactivated(agentId, _agents[agentId].ccc);
    }

    /// @inheritdoc IAgentIdentityRegistry
    function reactivate(uint256 agentId) external onlyRole(GOVERNANCE_ROLE) {
        require(!_agents[agentId].active, "ADI: already active");
        _agents[agentId].active = true;
        emit AgentReactivated(agentId, _agents[agentId].ccc);
    }

    /// @inheritdoc IAgentIdentityRegistry
    function agentURI(uint256 agentId) external view returns (string memory) {
        return tokenURI(agentId);
    }

    /// @inheritdoc IAgentIdentityRegistry
    function agentInfo(uint256 agentId) external view returns (AgentInfo memory) {
        return _agents[agentId];
    }

    /// @inheritdoc IAgentIdentityRegistry
    function agentIdByCCC(string calldata ccc) external view returns (uint256) {
        return _cccToAgentId[keccak256(bytes(ccc))];
    }

    /// @inheritdoc IAgentIdentityRegistry
    function isRegistered(string calldata ccc) public view returns (bool) {
        return _cccToAgentId[keccak256(bytes(ccc))] != 0;
    }

    /// @inheritdoc IAgentIdentityRegistry
    function totalAgents() external view returns (uint256) {
        return _agentIds.current();
    }

    // ── Required Overrides ──

    function _beforeTokenTransfer(address from, address to, uint256 tokenId, uint256 batchSize)
        internal override(ERC721, ERC721Enumerable) { super._beforeTokenTransfer(from, to, tokenId, batchSize); }

    function _burn(uint256 tokenId) internal override(ERC721, ERC721URIStorage) { super._burn(tokenId); }

    function tokenURI(uint256 tokenId) public view override(ERC721, ERC721URIStorage) returns (string memory) {
        return super.tokenURI(tokenId);
    }

    function supportsInterface(bytes4 interfaceId)
        public view override(ERC721, ERC721Enumerable, ERC721URIStorage, AccessControl) returns (bool) {
        return super.supportsInterface(interfaceId);
    }
}
```

---

### `packages/adi/src/AgentReputationRegistry.sol`

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/access/AccessControl.sol";
import "./interfaces/IAgentReputationRegistry.sol";

/// @title AgentReputationRegistry — ERC-8004 × #FedArch
/// @author Team weown — ETHDenver 2026
/// @notice Stores signed reputation feedback signals for agents
///
/// #FedArch reputation sources:
///   ccc_id_generated:   +10
///   volley_completed:    +5
///   vsa_passed:         +50
///   vsa_failed:         -20
///   rule_locked:        +25
///   bad_agent_flagged: -100
///   bad_agent_resolved: +30
///   season_completed:  +200
///   cooperative_joined:+100
contract AgentReputationRegistry is AccessControl, IAgentReputationRegistry {
    bytes32 public constant GATEWAY_ROLE = keccak256("GATEWAY_ROLE");

    // agentId → feedback array
    mapping(uint256 => Feedback[]) private _feedbacks;

    // agentId → aggregate scores
    mapping(uint256 => int256) private _totalScore;
    mapping(uint256 => uint256) private _positiveCount;
    mapping(uint256 => uint256) private _negativeCount;

    address public identityRegistry;

    constructor(address gateway, address _identityRegistry) {
        _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);
        _grantRole(GATEWAY_ROLE, gateway);
        identityRegistry = _identityRegistry;
    }

    /// @inheritdoc IAgentReputationRegistry
    function giveFeedback(
        uint256 toAgentId,
        int256 value,
        string calldata feedbackType,
        string calldata refCccId,
        string calldata metadataURI
    ) external onlyRole(GATEWAY_ROLE) {
        require(toAgentId > 0, "REP: invalid agentId");

        // Determine sender agentId (gateway acts on behalf)
        uint256 fromAgentId = 0; // Gateway-initiated

        Feedback memory fb = Feedback({
            fromAgentId: fromAgentId,
            toAgentId: toAgentId,
            value: value,
            feedbackType: feedbackType,
            refCccId: refCccId,
            metadataURI: metadataURI,
            timestamp: block.timestamp
        });

        _feedbacks[toAgentId].push(fb);

        // Update aggregates
        _totalScore[toAgentId] += value;
        if (value > 0) {
            _positiveCount[toAgentId]++;
        } else if (value < 0) {
            _negativeCount[toAgentId]++;
        }

        emit FeedbackGiven(fromAgentId, toAgentId, value, feedbackType, refCccId);
    }

    /// @inheritdoc IAgentReputationRegistry
    function getFeedback(
        uint256 agentId,
        uint256 offset,
        uint256 limit
    ) external view returns (Feedback[] memory) {
        Feedback[] storage all = _feedbacks[agentId];
        uint256 total = all.length;

        if (offset >= total) return new Feedback[](0);

        uint256 end = offset + limit;
        if (end > total) end = total;
        uint256 count = end - offset;

        Feedback[] memory result = new Feedback[](count);
        for (uint256 i = 0; i < count; i++) {
            result[i] = all[offset + i];
        }
        return result;
    }

    /// @inheritdoc IAgentReputationRegistry
    function feedbackCount(uint256 agentId) external view returns (uint256) {
        return _feedbacks[agentId].length;
    }

    /// @inheritdoc IAgentReputationRegistry
    function aggregateScore(uint256 agentId) external view returns (
        int256 total,
        uint256 positive,
        uint256 negative
    ) {
        return (_totalScore[agentId], _positiveCount[agentId], _negativeCount[agentId]);
    }
}
```

---

### `packages/adi/src/AgentValidationRegistry.sol`

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/access/AccessControl.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "./interfaces/IAgentValidationRegistry.sol";

/// @title AgentValidationRegistry — ERC-8004 × #FedArch
/// @author Team weown — ETHDenver 2026
/// @notice Manages VSA / ISC validation workflows
///
/// #FedArch validation types:
///   vsa:            Document verification (132 tests)
///   isc:            Instance Season Certification (8-point)
///   shared_kernel:  Rule compliance check
///   ccc_id_seq:     R-212 deconfliction check
contract AgentValidationRegistry is AccessControl, IAgentValidationRegistry {
    using Counters for Counters.Counter;

    bytes32 public constant GATEWAY_ROLE = keccak256("GATEWAY_ROLE");
    bytes32 public constant VALIDATOR_ROLE = keccak256("VALIDATOR_ROLE");

    Counters.Counter private _requestIds;

    // requestId → ValidationRecord
    mapping(uint256 => ValidationRecord) private _validations;

    // agentId → request IDs (as requester)
    mapping(uint256 => uint256[]) private _agentRequests;

    // agentId → request IDs (as validator)
    mapping(uint256 => uint256[]) private _agentValidations;

    // agentId → pass/fail counts
    mapping(uint256 => uint256) private _passCount;
    mapping(uint256 => uint256) private _totalCount;

    address public identityRegistry;
    address public reputationRegistry;

    constructor(
        address gateway,
        address validator,
        address _identityRegistry,
        address _reputationRegistry
    ) {
        _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);
        _grantRole(GATEWAY_ROLE, gateway);
        _grantRole(VALIDATOR_ROLE, validator);
        identityRegistry = _identityRegistry;
        reputationRegistry = _reputationRegistry;
    }

    /// @inheritdoc IAgentValidationRegistry
    function requestValidation(
        string calldata subject,
        string calldata validationType,
        uint256 checksTotal,
        string calldata metadataURI
    ) external onlyRole(GATEWAY_ROLE) returns (uint256 requestId) {
        _requestIds.increment();
        requestId = _requestIds.current();

        _validations[requestId] = ValidationRecord({
            requestId: requestId,
            requesterAgentId: 0, // Gateway-initiated
            validatorAgentId: 0,
            subject: subject,
            validationType: validationType,
            result: false,
            completed: false,
            checksTotal: checksTotal,
            checksPassed: 0,
            requestMetadataURI: metadataURI,
            responseMetadataURI: "",
            requestTimestamp: block.timestamp,
            responseTimestamp: 0
        });

        emit ValidationRequested(requestId, 0, subject);
    }

    /// @inheritdoc IAgentValidationRegistry
    function respondValidation(
        uint256 requestId,
        bool result,
        uint256 checksPassed,
        string calldata metadataURI
    ) external onlyRole(VALIDATOR_ROLE) {
        ValidationRecord storage v = _validations[requestId];
        require(!v.completed, "VAL: already completed");
        require(v.requestTimestamp > 0, "VAL: request not found");
        require(checksPassed <= v.checksTotal, "VAL: checksPassed > checksTotal");

        v.validatorAgentId = 0; // Validator identity
        v.result = result;
        v.completed = true;
        v.checksPassed = checksPassed;
        v.responseMetadataURI = metadataURI;
        v.responseTimestamp = block.timestamp;

        // Update pass/fail stats
        _totalCount[v.requesterAgentId]++;
        if (result) {
            _passCount[v.requesterAgentId]++;
        }

        emit ValidationResponded(requestId, v.validatorAgentId, result, checksPassed, v.checksTotal);
    }

    /// @inheritdoc IAgentValidationRegistry
    function getValidation(uint256 requestId) external view returns (ValidationRecord memory) {
        return _validations[requestId];
    }

    /// @inheritdoc IAgentValidationRegistry
    function validationCount(uint256 agentId) external view returns (uint256) {
        return _totalCount[agentId];
    }

    /// @inheritdoc IAgentValidationRegistry
    function passRate(uint256 agentId) external view returns (uint256 passed, uint256 total) {
        return (_passCount[agentId], _totalCount[agentId]);
    }
}
```

---

### `packages/adi/src/CCCGovernanceToken.sol`

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Votes.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Permit.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";

/// @title CCCGovernanceToken — $CCC
/// @author Team weown — ETHDenver 2026
/// @notice Governance token for CCCbot.Net cooperative
/// @dev Snapshot-compatible via ERC20Votes
///
/// Mint triggers:
///   CCC-ID generated:  10 $CCC
///   Rule locked:       25 $CCC
///   BP locked:         15 $CCC
///   Learning logged:    5 $CCC
///   VSA passed:        50 $CCC
///   Season completed: 200 $CCC
contract CCCGovernanceToken is ERC20, ERC20Votes, ERC20Permit, AccessControl {
    bytes32 public constant GATEWAY_ROLE = keccak256("GATEWAY_ROLE");

    constructor(address gateway)
        ERC20("CCC Governance Token", "CCC")
        ERC20Permit("CCC Governance Token")
    {
        _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);
        _grantRole(GATEWAY_ROLE, gateway);
    }

    function mint(address to, uint256 amount) external onlyRole(GATEWAY_ROLE) {
        _mint(to, amount);
    }

    // ── Required Overrides ──

    function _afterTokenTransfer(address from, address to, uint256 amount)
        internal override(ERC20, ERC20Votes) { super._afterTokenTransfer(from, to, amount); }

    function _mint(address to, uint256 amount)
        internal override(ERC20, ERC20Votes) { super._mint(to, amount); }

    function _burn(address account, uint256 amount)
        internal override(ERC20, ERC20Votes) { super._burn(account, amount); }
}
```

---

### `packages/adi/script/Deploy.s.sol` — Deployment Script

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "forge-std/Script.sol";
import "../src/AgentIdentityRegistry.sol";
import "../src/AgentReputationRegistry.sol";
import "../src/AgentValidationRegistry.sol";
import "../src/CCCGovernanceToken.sol";

/// @title Deploy — Full ERC-8004 × #FedArch Stack
/// @author Team weown — ETHDenver 2026
contract Deploy is Script {
    function run() external {
        uint256 deployerKey = vm.envUint("PRIVATE_KEY");
        address deployer = vm.addr(deployerKey);

        console.log("Deployer:", deployer);
        console.log("Chain ID:", block.chainid);

        vm.startBroadcast(deployerKey);

        // 1. Deploy $CCC Governance Token
        CCCGovernanceToken ccc = new CCCGovernanceToken(deployer);
        console.log("CCCGovernanceToken:", address(ccc));

        // 2. Deploy Identity Registry
        AgentIdentityRegistry identity = new AgentIdentityRegistry(
            deployer,   // gateway
            deployer,   // governance
            3           // season
        );
        console.log("AgentIdentityRegistry:", address(identity));

        // 3. Deploy Reputation Registry
        AgentReputationRegistry reputation = new AgentReputationRegistry(
            deployer,
            address(identity)
        );
        console.log("AgentReputationRegistry:", address(reputation));

        // 4. Deploy Validation Registry
        AgentValidationRegistry validation = new AgentValidationRegistry(
            deployer,
            deployer,
            address(identity),
            address(reputation)
        );
        console.log("AgentValidationRegistry:", address(validation));

        vm.stopBroadcast();

        // Summary
        console.log("");
        console.log("=== ERC-8004 x FedArch Deployment ===");
        console.log("CCCGovernanceToken:       ", address(ccc));
        console.log("AgentIdentityRegistry:    ", address(identity));
        console.log("AgentReputationRegistry:  ", address(reputation));
        console.log("AgentValidationRegistry:  ", address(validation));
        console.log("Season:                    3");
        console.log("=====================================");
    }
}
```

---

### `packages/adi/test/AgentIdentityRegistry.t.sol` — Identity Tests

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "forge-std/Test.sol";
import "../src/AgentIdentityRegistry.sol";

contract AgentIdentityRegistryTest is Test {
    AgentIdentityRegistry public registry;
    address public gateway = address(0x1);
    address public governance = address(0x2);

    function setUp() public {
        registry = new AgentIdentityRegistry(gateway, governance, 3);
    }

    function test_RegisterAgent() public {
        vm.prank(gateway);
        uint256 agentId = registry.register("LDC", "ipfs://QmTest123");

        assertEq(agentId, 1);
        assertEq(registry.totalAgents(), 1);
        assertTrue(registry.isRegistered("LDC"));
    }

    function test_RegisterMultipleAgents() public {
        vm.startPrank(gateway);
        uint256 id1 = registry.register("LDC", "ipfs://QmLDC");
        uint256 id2 = registry.register("SHD", "ipfs://QmSHD");
        uint256 id3 = registry.register("RMN", "ipfs://QmRMN");
        vm.stopPrank();

        assertEq(id1, 1);
        assertEq(id2, 2);
        assertEq(id3, 3);
        assertEq(registry.totalAgents(), 3);
    }

    function test_RevertDuplicateCCC() public {
        vm.startPrank(gateway);
        registry.register("LDC", "ipfs://QmLDC");

        vm.expectRevert("ADI: CCC already registered (R-212)");
        registry.register("LDC", "ipfs://QmLDC2");
        vm.stopPrank();
    }

    function test_RevertInvalidCCC() public {
        vm.prank(gateway);
        vm.expectRevert("ADI: invalid CCC format");
        registry.register("ldc", "ipfs://QmTest");
    }

    function test_RevertTooLongCCC() public {
        vm.prank(gateway);
        vm.expectRevert("ADI: invalid CCC format");
        registry.register("LDCC", "ipfs://QmTest");
    }

    function test_RevertEmptyTokenURI() public {
        vm.prank(gateway);
        vm.expectRevert("ADI: tokenURI required");
        registry.register("LDC", "");
    }

    function test_RevertUnauthorized() public {
        vm.prank(address(0xDEAD));
        vm.expectRevert();
        registry.register("LDC", "ipfs://QmTest");
    }

    function test_AgentURI() public {
        vm.prank(gateway);
        uint256 agentId = registry.register("LDC", "ipfs://QmTest123");

        assertEq(registry.agentURI(agentId), "ipfs://QmTest123");
    }

    function test_AgentIdByCCC() public {
        vm.prank(gateway);
        uint256 agentId = registry.register("GTM", "ipfs://QmGTM");

        assertEq(registry.agentIdByCCC("GTM"), agentId);
    }

    function test_DeactivateAgent() public {
        vm.prank(gateway);
        uint256 agentId = registry.register("LDC", "ipfs://QmLDC");

        vm.prank(governance);
        registry.deactivate(agentId);

        IAgentIdentityRegistry.AgentInfo memory info = registry.agentInfo(agentId);
        assertFalse(info.active);
    }

    function test_ReactivateAgent() public {
        vm.prank(gateway);
        uint256 agentId = registry.register("LDC", "ipfs://QmLDC");

        vm.prank(governance);
        registry.deactivate(agentId);

        vm.prank(governance);
        registry.reactivate(agentId);

        IAgentIdentityRegistry.AgentInfo memory info = registry.agentInfo(agentId);
        assertTrue(info.active);
    }
}
```

---

### `packages/adi/test/AgentReputationRegistry.t.sol`

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "forge-std/Test.sol";
import "../src/AgentIdentityRegistry.sol";
import "../src/AgentReputationRegistry.sol";

contract AgentReputationRegistryTest is Test {
    AgentIdentityRegistry public identity;
    AgentReputationRegistry public reputation;
    address public gateway = address(0x1);

    function setUp() public {
        identity = new AgentIdentityRegistry(gateway, address(this), 3);
        reputation = new AgentReputationRegistry(gateway, address(identity));

        vm.prank(gateway);
        identity.register("LDC", "ipfs://QmLDC");
    }

    function test_GiveFeedback() public {
        vm.prank(gateway);
        reputation.giveFeedback(1, 10, "ccc_id_generated", "LDC_2026-W08_005", "");

        assertEq(reputation.feedbackCount(1), 1);
    }

    function test_AggregateScore() public {
        vm.startPrank(gateway);
        reputation.giveFeedback(1, 10, "ccc_id_generated", "", "");
        reputation.giveFeedback(1, 50, "vsa_passed", "", "");
        reputation.giveFeedback(1, -20, "vsa_failed", "", "");
        reputation.giveFeedback(1, 25, "rule_locked", "", "");
        vm.stopPrank();

        (int256 total, uint256 positive, uint256 negative) = reputation.aggregateScore(1);
        assertEq(total, 65);  // 10 + 50 - 20 + 25
        assertEq(positive, 3);
        assertEq(negative, 1);
    }

    function test_BadAgentPenalty() public {
        vm.startPrank(gateway);
        reputation.giveFeedback(1, 100, "season_completed", "", "");
        reputation.giveFeedback(1, -100, "bad_agent_flagged", "", "");
        vm.stopPrank();

        (int256 total,,) = reputation.aggregateScore(1);
        assertEq(total, 0);
    }

    function test_GetFeedbackPaginated() public {
        vm.startPrank(gateway);
        for (uint256 i = 0; i < 10; i++) {
            reputation.giveFeedback(1, 10, "ccc_id_generated", "", "");
        }
        vm.stopPrank();

        IAgentReputationRegistry.Feedback[] memory page1 = reputation.getFeedback(1, 0, 5);
        assertEq(page1.length, 5);

        IAgentReputationRegistry.Feedback[] memory page2 = reputation.getFeedback(1, 5, 5);
        assertEq(page2.length, 5);
    }
}
```

---

### `packages/adi/test/AgentValidationRegistry.t.sol`

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "forge-std/Test.sol";
import "../src/AgentIdentityRegistry.sol";
import "../src/AgentReputationRegistry.sol";
import "../src/AgentValidationRegistry.sol";

contract AgentValidationRegistryTest is Test {
    AgentIdentityRegistry public identity;
    AgentReputationRegistry public reputation;
    AgentValidationRegistry public validation;
    address public gateway = address(0x1);
    address public validator = address(0x2);

    function setUp() public {
        identity = new AgentIdentityRegistry(gateway, address(this), 3);
        reputation = new AgentReputationRegistry(gateway, address(identity));
        validation = new AgentValidationRegistry(gateway, validator, address(identity), address(reputation));
    }

    function test_RequestAndRespondValidation() public {
        vm.prank(gateway);
        uint256 requestId = validation.requestValidation(
            "vsa:SharedKernel:v3.1.2.1",
            "vsa",
            130,
            "ipfs://QmRequest"
        );

        assertEq(requestId, 1);

        vm.prank(validator);
        validation.respondValidation(requestId, true, 130, "ipfs://QmResponse");

        IAgentValidationRegistry.ValidationRecord memory v = validation.getValidation(requestId);
        assertTrue(v.completed);
        assertTrue(v.result);
        assertEq(v.checksPassed, 130);
        assertEq(v.checksTotal, 130);
    }

    function test_FailedValidation() public {
        vm.prank(gateway);
        uint256 requestId = validation.requestValidation("vsa:PRJ-008:v0.1", "vsa", 24, "");

        vm.prank(validator);
        validation.respondValidation(requestId, false, 1, "ipfs://QmFail");

        IAgentValidationRegistry.ValidationRecord memory v = validation.getValidation(requestId);
        assertTrue(v.completed);
        assertFalse(v.result);
        assertEq(v.checksPassed, 1);
        assertEq(v.checksTotal, 24);
    }

    function test_RevertDoubleResponse() public {
        vm.prank(gateway);
        uint256 requestId = validation.requestValidation("test", "vsa", 10, "");

        vm.prank(validator);
        validation.respondValidation(requestId, true, 10, "");

        vm.prank(validator);
        vm.expectRevert("VAL: already completed");
        validation.respondValidation(requestId, true, 10, "");
    }

    function test_RevertChecksExceedTotal() public {
        vm.prank(gateway);
        uint256 requestId = validation.requestValidation("test", "vsa", 10, "");

        vm.prank(validator);
        vm.expectRevert("VAL: checksPassed > checksTotal");
        validation.respondValidation(requestId, true, 11, "");
    }

    function test_PassRate() public {
        vm.startPrank(gateway);
        uint256 r1 = validation.requestValidation("doc1", "vsa", 100, "");
        uint256 r2 = validation.requestValidation("doc2", "vsa", 50, "");
        uint256 r3 = validation.requestValidation("doc3", "vsa", 24, "");
        vm.stopPrank();

        vm.startPrank(validator);
        validation.respondValidation(r1, true, 100, "");
        validation.respondValidation(r2, true, 50, "");
        validation.respondValidation(r3, false, 1, "");
        vm.stopPrank();

        (uint256 passed, uint256 total) = validation.passRate(0);
        assertEq(passed, 2);
        assertEq(total, 3);
    }
}
```

---

### `packages/adi/test/Integration.t.sol` — Full E2E

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "forge-std/Test.sol";
import "../src/AgentIdentityRegistry.sol";
import "../src/AgentReputationRegistry.sol";
import "../src/AgentValidationRegistry.sol";
import "../src/CCCGovernanceToken.sol";

contract IntegrationTest is Test {
    AgentIdentityRegistry public identity;
    AgentReputationRegistry public reputation;
    AgentValidationRegistry public validation;
    CCCGovernanceToken public ccc;

    address public gateway = address(0x1);
    address public validator = address(0x2);
    address public ldcWallet = address(0x10);
    address public shdWallet = address(0x11);
    address public rmnWallet = address(0x12);

    function setUp() public {
        ccc = new CCCGovernanceToken(gateway);
        identity = new AgentIdentityRegistry(gateway, address(this), 3);
        reputation = new AgentReputationRegistry(gateway, address(identity));
        validation = new AgentValidationRegistry(gateway, validator, address(identity), address(reputation));
    }

    function test_FullETHDenverFlow() public {
        // ── 1. Register Team weown ──
        vm.startPrank(gateway);
        uint256 ldcId = identity.register("LDC", "ipfs://QmLDC");
        uint256 shdId = identity.register("SHD", "ipfs://QmSHD");
        uint256 rmnId = identity.register("RMN", "ipfs://QmRMN");
        vm.stopPrank();

        assertEq(identity.totalAgents(), 3);

        // ── 2. Generate CCC-IDs → Reputation ──
        vm.startPrank(gateway);
        for (uint256 i = 0; i < 5; i++) {
            reputation.giveFeedback(ldcId, 10, "ccc_id_generated", "", "");
        }
        reputation.giveFeedback(shdId, 10, "ccc_id_generated", "", "");
        reputation.giveFeedback(rmnId, 10, "ccc_id_generated", "", "");
        vm.stopPrank();

        (int256 ldcScore,,) = reputation.aggregateScore(ldcId);
        assertEq(ldcScore, 50); // 5 × 10

        // ── 3. VSA Validation ──
        vm.prank(gateway);
        uint256 vsaReq = validation.requestValidation(
            "vsa:SharedKernel:v3.1.2.1",
            "vsa",
            132,
            "ipfs://QmVSARequest"
        );

        vm.prank(validator);
        validation.respondValidation(vsaReq, true, 132, "ipfs://QmVSAResponse");

        // VSA passed → reputation boost
        vm.prank(gateway);
        reputation.giveFeedback(ldcId, 50, "vsa_passed", "", "");

        (ldcScore,,) = reputation.aggregateScore(ldcId);
        assertEq(ldcScore, 100); // 50 + 50

        // ── 4. Mint $CCC rewards ──
        vm.startPrank(gateway);
        ccc.mint(ldcWallet, 50 * 1e18);  // 5 CCC-IDs × 10
        ccc.mint(shdWallet, 10 * 1e18);
        ccc.mint(rmnWallet, 10 * 1e18);
        vm.stopPrank();

        assertEq(ccc.balanceOf(ldcWallet), 50 * 1e18);

        // ── 5. Rule Locked → Governance reward ──
        vm.prank(gateway);
        reputation.giveFeedback(ldcId, 25, "rule_locked", "", "");
        ccc.mint(ldcWallet, 25 * 1e18);

        assertEq(ccc.balanceOf(ldcWallet), 75 * 1e18);

        // ── Summary ──
        console.log("=== ETHDenver E2E Test PASSED ===");
        console.log("Agents registered:  ", identity.totalAgents());
        console.log("LDC reputation:     ", uint256(int256(ldcScore + 25)));
        console.log("LDC $CCC balance:   ", ccc.balanceOf(ldcWallet) / 1e18);
        console.log("VSA validations:     1 (132/132 PASSED)");
        console.log("=================================");
    }
}
```

---

## 📋 BUILD + TEST

```bash
cd packages/adi

# Install dependencies
forge install foundry-rs/forge-std
forge install OpenZeppelin/openzeppelin-contracts

# Build
forge build

# Test (verbose)
forge test -vvv

# Test with gas report
forge test --gas-report

# Deploy to Base Sepolia
forge script script/Deploy.s.sol \
  --rpc-url base_sepolia \
  --broadcast \
  --verify
```

---

## 📋 FILE MANIFEST — `packages/adi/`

| # | File | Purpose |
|---|------|---------|
| 1 | `foundry.toml` | Foundry config |
| 2 | `remappings.txt` | OZ + forge-std |
| 3 | `.gitmodules` | forge-std + OZ submodules |
| 4 | `src/libraries/CCCLib.sol` | CCC validation library |
| 5 | `src/interfaces/IAgentIdentityRegistry.sol` | Identity interface |
| 6 | `src/interfaces/IAgentReputationRegistry.sol` | Reputation interface |
| 7 | `src/interfaces/IAgentValidationRegistry.sol` | Validation interface |
| 8 | `src/AgentIdentityRegistry.sol` | ERC-721 agent identity |
| 9 | `src/AgentReputationRegistry.sol` | Reputation feedback |
| 10 | `src/AgentValidationRegistry.sol` | VSA validation workflows |
| 11 | `src/CCCGovernanceToken.sol` | $CCC ERC-20 Votes |
| 12 | `script/Deploy.s.sol` | Deployment script |
| 13 | `test/AgentIdentityRegistry.t.sol` | Identity tests (11) |
| 14 | `test/AgentReputationRegistry.t.sol` | Reputation tests (4) |
| 15 | `test/AgentValidationRegistry.t.sol` | Validation tests (5) |
| 16 | `test/Integration.t.sol` | Full E2E test (1) |

**16 files — 4 contracts + 1 library + 3 interfaces + 1 deploy + 4 test files (21 tests)**

---

## 🎯 QUICK COMMANDS — @LDC

| # | Option |
|---|--------|
| 1 | 🔧 **Wire `packages/adi` into `apps/api`** — ethers.js client calling deployed contracts |
| 2 | 🧪 **Run `forge test -vvv`** — verify all 21 tests pass |
| 3 | 🚀 **Deploy to Base Sepolia** — `forge script` with verification |

---

**STOP.** Full Foundry implementation — `lib/openzeppelin-contracts` + `lib/forge-std`, proper interfaces, CCCLib library, 4 production contracts, 21 tests including full E2E flow. `forge build && forge test -vvv` and ship it. 🏔️🔥

#FlowsBros #WeOwnSeason003 #ETHDenver2026 #BUIDLathon

♾️ WeOwnNet 🌐
```

## File: apps/web/README.md
```
This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

```

## File: apps/web/package.json
```
{
  "name": "web",
  "version": "0.1.0",
  "type": "module",
  "private": true,
  "scripts": {
    "dev": "next dev --port 3000",
    "build": "next build",
    "start": "next start",
    "lint": "eslint --max-warnings 0",
    "check-types": "next typegen && tsc --noEmit"
  },
  "dependencies": {
    "@radix-ui/react-slot": "^1.2.4",
    "@repo/ai-providers": "workspace:*",
    "@repo/ui": "workspace:*",
    "@tanstack/react-query": "^5.90.11",
    "@tanstack/react-query-devtools": "^5.91.3",
    "autoprefixer": "^10.4.24",
    "class-variance-authority": "^0.7.1",
    "clsx": "latest",
    "date-fns": "^3.6.0",
    "ethers": "^6.13.0",
    "framer-motion": "^11.15.0",
    "lucide-react": "^0.574.0",
    "next": "16.1.5",
    "postcss": "^8.5.6",
    "react": "^19.2.0",
    "react-dom": "^19.2.0",
    "react-markdown": "^9.0.0",
    "recharts": "^2.15.0",
    "sonner": "^1.7.0",
    "tailwind-merge": "^3.4.1",
    "tailwindcss": "^4.2.0",
    "viem": "^2.46.2",
    "wagmi": "^2.19.5",
    "zustand": "^5.0.11"
  },
  "devDependencies": {
    "@repo/eslint-config": "workspace:*",
    "@repo/typescript-config": "workspace:*",
    "@tailwindcss/postcss": "^4.2.0",
    "@types/node": "^22.15.3",
    "@types/react": "19.2.2",
    "@types/react-dom": "19.2.2",
    "eslint": "^9.39.1",
    "typescript": "5.9.2"
  }
}
```

## File: apps/web/tsconfig.json
```
{
  "extends": "@repo/typescript-config/nextjs.json",
  "compilerOptions": {
    "paths": {
      "@/*": [
        "./*"
      ]
    },
    "plugins": [
      {
        "name": "next"
      }
    ]
  },
  "include": [
    "**/*.ts",
    "**/*.tsx",
    "next-env.d.ts",
    "next.config.js",
    ".next/types/**/*.ts"
  ],
  "exclude": [
    "node_modules"
  ]
}
```

## File: apps/docs/README.md
```
This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

```

## File: apps/docs/package.json
```
{
  "name": "docs",
  "version": "0.1.0",
  "type": "module",
  "private": true,
  "scripts": {
    "dev": "next dev --port 3001",
    "build": "next build",
    "start": "next start",
    "lint": "eslint --max-warnings 0",
    "check-types": "next typegen && tsc --noEmit"
  },
  "dependencies": {
    "@repo/ui": "workspace:*",
    "next": "16.1.5",
    "react": "^19.2.0",
    "react-dom": "^19.2.0"
  },
  "devDependencies": {
    "@repo/eslint-config": "workspace:*",
    "@repo/typescript-config": "workspace:*",
    "@types/node": "^22.15.3",
    "@types/react": "19.2.2",
    "@types/react-dom": "19.2.2",
    "eslint": "^9.39.1",
    "typescript": "5.9.2"
  }
}

```

## File: apps/docs/tsconfig.json
```
{
  "extends": "@repo/typescript-config/nextjs.json",
  "compilerOptions": {
    "plugins": [
      {
        "name": "next"
      }
    ]
  },
  "include": [
    "**/*.ts",
    "**/*.tsx",
    "next-env.d.ts",
    "next.config.js",
    ".next/types/**/*.ts"
  ],
  "exclude": [
    "node_modules"
  ]
}

```

## File: apps/gateway/README.md
```
This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

```

## File: apps/gateway/package.json
```
{
  "name": "gateway",
  "version": "0.1.0",
  "type": "module",
  "private": true,
  "scripts": {
    "dev": "next dev --port 3002",
    "build": "next build",
    "start": "next start",
    "lint": "eslint --max-warnings 0",
    "check-types": "next typegen && tsc --noEmit"
  },
  "dependencies": {
    "@repo/ai-providers": "workspace:*",
    "@repo/hedera": "workspace:*",
    "@repo/timescaledb": "workspace:*",
    "@repo/ui": "workspace:*",
    "@t3-oss/env-nextjs": "^0.13.10",
    "date-fns": "^4.1.0",
    "next": "16.1.5",
    "react": "^19.2.0",
    "react-dom": "^19.2.0",
    "vitest": "^4.0.18",
    "winston": "^3.19.0",
    "zod": "^4.3.6"
  },
  "devDependencies": {
    "@repo/eslint-config": "workspace:*",
    "@repo/typescript-config": "workspace:*",
    "@types/node": "^22.15.3",
    "@types/react": "19.2.2",
    "@types/react-dom": "19.2.2",
    "eslint": "^9.39.1",
    "typescript": "5.9.2"
  }
}
```

## File: apps/gateway/tsconfig.json
```
{
  "extends": "@repo/typescript-config/nextjs.json",
  "compilerOptions": {
    "plugins": [
      {
        "name": "next"
      }
    ]
  },
  "include": [
    "**/*.ts",
    "**/*.tsx",
    "next-env.d.ts",
    "next.config.js",
    ".next/types/**/*.ts"
  ],
  "exclude": [
    "node_modules"
  ]
}

```

## File: packages/ui/package.json
```
{
  "name": "@repo/ui",
  "version": "0.0.0",
  "private": true,
  "exports": {
    "./*": "./src/*.tsx"
  },
  "scripts": {
    "lint": "eslint . --max-warnings 0",
    "generate:component": "turbo gen react-component",
    "check-types": "tsc --noEmit"
  },
  "devDependencies": {
    "@repo/eslint-config": "workspace:*",
    "@repo/typescript-config": "workspace:*",
    "@types/node": "^22.15.3",
    "@types/react": "19.2.2",
    "@types/react-dom": "19.2.2",
    "eslint": "^9.39.1",
    "typescript": "5.9.2"
  },
  "dependencies": {
    "react": "^19.2.0",
    "react-dom": "^19.2.0"
  }
}

```

## File: packages/ui/tsconfig.json
```
{
  "extends": "@repo/typescript-config/react-library.json",
  "compilerOptions": {
    "outDir": "dist"
  },
  "include": ["src"],
  "exclude": ["node_modules", "dist"]
}

```

## File: packages/ui/src/card.tsx
```
import { type JSX } from "react";

export function Card({
  className,
  title,
  children,
  href,
}: {
  className?: string;
  title: string;
  children: React.ReactNode;
  href: string;
}): JSX.Element {
  return (
    <a
      className={className}
      href={`${href}?utm_source=create-turbo&utm_medium=basic&utm_campaign=create-turbo"`}
      rel="noopener noreferrer"
      target="_blank"
    >
      <h2>
        {title} <span>-&gt;</span>
      </h2>
      <p>{children}</p>
    </a>
  );
}

```

## File: packages/ui/src/code.tsx
```
import { type JSX } from "react";

export function Code({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}): JSX.Element {
  return <code className={className}>{children}</code>;
}

```

## File: packages/ui/src/button.tsx
```
"use client";

import { ReactNode } from "react";

interface ButtonProps {
  children: ReactNode;
  className?: string;
  appName: string;
}

export const Button = ({ children, className, appName }: ButtonProps) => {
  return (
    <button
      className={className}
      onClick={() => alert(`Hello from your ${appName} app!`)}
    >
      {children}
    </button>
  );
};

```

## File: packages/adi/README.md
```
# @repo/adi

This is the adi package.

```

## File: packages/adi/package.json
```
{
    "name": "@repo/adi",
    "version": "0.0.0",
    "main": "./src/index.ts",
    "types": "./src/index.ts",
    "scripts": {
        "lint": "eslint .",
        "check-types": "tsc --noEmit"
    },
    "devDependencies": {
        "@repo/typescript-config": "workspace:*",
        "@types/node": "^20.10.0",
        "eslint": "^9.15.0",
        "typescript": "5.9.2"
    }
}
```

## File: packages/adi/remappings.txt
```
@openzeppelin/contracts/=lib/openzeppelin-contracts/contracts/
forge-std/=lib/forge-std/src/

```

## File: packages/adi/tsconfig.json
```
{
    "extends": "@repo/typescript-config/base.json",
    "compilerOptions": {
        "lib": [
            "ES2022"
        ],
        "module": "commonjs",
        "target": "ES2022"
    },
    "exclude": [
        "node_modules",
        "dist"
    ]
}
```

## File: packages/eslint-config/README.md
```
# `@turbo/eslint-config`

Collection of internal eslint configurations.

```

## File: packages/eslint-config/package.json
```
{
  "name": "@repo/eslint-config",
  "version": "0.0.0",
  "type": "module",
  "private": true,
  "exports": {
    "./base": "./base.js",
    "./next-js": "./next.js",
    "./react-internal": "./react-internal.js"
  },
  "devDependencies": {
    "@eslint/js": "^9.39.1",
    "@next/eslint-plugin-next": "^15.5.0",
    "eslint": "^9.39.1",
    "eslint-config-prettier": "^10.1.1",
    "eslint-plugin-only-warn": "^1.1.0",
    "eslint-plugin-react": "^7.37.5",
    "eslint-plugin-react-hooks": "^5.2.0",
    "eslint-plugin-turbo": "^2.7.1",
    "globals": "^16.5.0",
    "typescript": "^5.9.2",
    "typescript-eslint": "^8.50.0"
  }
}

```

## File: packages/hedera/README.md
```
# @repo/hedera

This is the hedera package.

```

## File: packages/hedera/package.json
```
{
    "name": "@repo/hedera",
    "version": "0.1.0",
    "type": "commonjs",
    "private": true,
    "scripts": {
        "dev": "tsc --watch",
        "build": "tsc",
        "test": "vitest run",
        "test:watch": "vitest",
        "test:coverage": "vitest run --coverage",
        "bootstrap": "tsx src/bootstrap.ts",
        "create-topic": "tsx src/hcs-attestor.ts --create-all"
    },
    "exports": {
        "./hcs": {
            "types": "./src/hcs-attestor.ts",
            "default": "./dist/src/hcs-attestor.js"
        },
        "./config": {
            "types": "./src/config.ts",
            "default": "./dist/src/config.js"
        },
        "./tokens": {
            "types": "./src/tokens/index.ts",
            "default": "./dist/src/tokens/index.js"
        }
    },
    "devDependencies": {
        "@repo/typescript-config": "workspace:*",
        "@types/node": "^20.10.0",
        "eslint": "^9.15.0",
        "typescript": "5.9.2"
    },
    "dependencies": {
        "@hashgraph/sdk": "^2.80.0",
        "@vitest/coverage-v8": "^4.0.18",
        "axios": "^1.13.5",
        "dotenv": "^17.3.1",
        "tsx": "^4.21.0",
        "typescript": "^5.9.3",
        "vitest": "^4.0.18"
    }
}
```

## File: packages/hedera/tsconfig.json
```
{
    "extends": "@repo/typescript-config/base.json",
    "compilerOptions": {
        "lib": [
            "ES2022"
        ],
        "module": "nodenext",
        "target": "ES2022",
        "outDir": "dist"
    },
    "exclude": [
        "node_modules",
        "dist"
    ]
}
```

## File: packages/hedera/src/topic-types.ts
```
/**
 * HCS Topic categories for the CCC Gateway
 * Each topic type = separate HCS topic for clean indexing
 */
export enum HCSTopicType {
    CCC_ID = "ccc-id",                     // CCC-ID attestations
    CONTEXT_VOLLEY = "context-volley",     // Agent-to-agent messages
    GOVERNANCE = "governance",             // Rule locks, #BadAgent
    VSA = "vsa",                           // Verification attestations
    AGENT_REGISTRY = "agent-registry",     // Agent registration events
    SEASON = "season",                     // Season lifecycle events
}

```

## File: packages/hedera/src/hcs-attestor.ts
```
import {
    TopicCreateTransaction,
    TopicMessageSubmitTransaction,
    TopicId,
    TopicInfoQuery,
    TransactionReceipt,
    Timestamp,
} from "@hashgraph/sdk";
import { createClient, getOperatorKey, getOperatorPublicKey } from "./config";
import { waitForPropagation } from "./utils/network-check";
import { HCSTopicType } from "./topic-types";
export { HCSTopicType } from "./topic-types";

// ═══════════════════════════════════════════════════════
// HCS ATTESTOR — @ccc-gateway/hedera
//
// Hedera Consensus Service integration for CCC Gateway.
// Every CCC-ID, #ContextVolley, VSA, and governance
// action is attested as an immutable HCS message.
//
// #FedArch Rules Enforced:
//   R-168: CCC-ID tied to contributor
//   R-169: Sequence resets at ISO week boundary
//   R-194: CCC workspace attestations only
//   R-212: Cross-instance deconfliction via sequence
//
// Team weown | ETHDenver 2026
// ═══════════════════════════════════════════════════════

// ───────────────────────────────────────────────────────
// TYPES
// ───────────────────────────────────────────────────────


/**
 * Base attestation message — all HCS messages extend this
 */
export interface HCSBaseMessage {
    version: string;                       // "1.0.0"
    type: HCSTopicType;
    gateway_instance: string;              // "INT-E01"
    season: number;                        // 3
    timestamp: string;                     // ISO 8601
}

/**
 * CCC-ID attestation — minted when CCC-ID is generated
 */
export interface HCSCCCIdAttestation extends HCSBaseMessage {
    type: HCSTopicType.CCC_ID;
    ccc_id: string;                        // "LDC_2026-W07_015"
    contributor: string;                   // "LDC"
    year: number;                          // 2026
    week: number;                          // 7
    sequence: number;                      // 15
    instance: string;                      // "INT-P01"
    workspace: string;                     // "CCC"
    reward_amount: number;                 // 10 (in $CCC)
    nft_serial?: number;                   // Hedera NFT serial if minted
    base_tx_hash?: string;                 // Base L2 tx if registered
}

/**
 * #ContextVolley attestation — agent-to-agent communication proof
 */
export interface HCSContextVolleyAttestation extends HCSBaseMessage {
    type: HCSTopicType.CONTEXT_VOLLEY;
    volley_id: string;                     // UUID
    from: string;                          // "AI:@LDC"
    to: string;                            // "AI:@RMN"
    volley_type: string;                   // "SEEK" | "ACK" | "STATUS"
    ref_ccc_id: string;                    // Reference CCC-ID
    content_hash: string;                  // SHA-256 of content (privacy)
}

/**
 * Governance attestation — rule locks, #BadAgent, season events
 */
export interface HCSGovernanceAttestation extends HCSBaseMessage {
    type: HCSTopicType.GOVERNANCE;
    action: GovernanceAction;
    rule_id?: string;                      // "R-212"
    description?: string;
    approval_ccc_id?: string;             // Human approval CCC-ID (R-011)
    locked_by?: string;                    // "AI:@LDC"
    target_ccc?: string;                   // #BadAgent target
    reason?: string;                       // #BadAgent reason
    severity?: "WARNING" | "FREEZE" | "WIPE";
}

export type GovernanceAction =
    | "RULE_LOCKED"
    | "RULE_PROPOSED"
    | "BP_LOCKED"
    | "LEARNING_LOGGED"
    | "DEFINITION_ADDED"
    | "BAD_AGENT_FLAGGED"
    | "BAD_AGENT_RESOLVED"
    | "SEASON_STARTED"
    | "SEASON_PAUSED"
    | "SEASON_ENDED";

/**
 * VSA attestation — verification proof
 */
export interface HCSVSAAttestation extends HCSBaseMessage {
    type: HCSTopicType.VSA;
    vsa_id: string;
    subject_document: string;              // "SharedKernel"
    subject_version: string;               // "v3.1.2.1"
    verifier: string;                      // "AI:@GTM"
    result: "PASSED" | "FAILED";
    checks_total: number;
    checks_passed: number;
    master_ccc_id: string;
    approval_ccc_id: string;
}

/**
 * Agent registration attestation
 */
export interface HCSAgentRegistration extends HCSBaseMessage {
    type: HCSTopicType.AGENT_REGISTRY;
    ccc: string;                           // "LDC"
    agent_id: string;                      // "AI:@LDC"
    contributor: string;                   // "Dhruv"
    role: string;                          // "Agentic AI Engineer"
    tier: string;                          // "founding_og" | "contributor"
    home_instance: string;                 // "INT-P01"
    hedera_account_id: string;
    base_address?: string;
    agent_nft_serial?: number;
}

/**
 * Result of an HCS submission
 */
export interface HCSSubmitResult {
    topicId: string;
    sequenceNumber: number;
    transactionId: string;
    timestamp: string;
    messageSize: number;
}

/**
 * Topic registry — maps topic types to topic IDs
 */
export interface TopicRegistry {
    [HCSTopicType.CCC_ID]: string;
    [HCSTopicType.CONTEXT_VOLLEY]: string;
    [HCSTopicType.GOVERNANCE]: string;
    [HCSTopicType.VSA]: string;
    [HCSTopicType.AGENT_REGISTRY]: string;
    [HCSTopicType.SEASON]: string;
}

// ───────────────────────────────────────────────────────
// HCS ATTESTOR CLASS
// ───────────────────────────────────────────────────────

export class HCSAttestor {
    private topics: Partial<TopicRegistry> = {};
    private gatewayInstance: string;
    private season: number;
    private messageCount: number = 0;

    constructor(
        gatewayInstance: string = "INT-E01",
        season: number = 3
    ) {
        this.gatewayInstance = gatewayInstance;
        this.season = season;

        // Load from env if available
        this.loadTopicsFromEnv();
    }

    // ─────────────────────────────────────────────────
    // TOPIC MANAGEMENT
    // ─────────────────────────────────────────────────

    /**
     * Create a single HCS topic
     */
    async createTopic(
        topicType: HCSTopicType,
        memo?: string
    ): Promise<string> {
        const client = createClient();
        const operatorKey = getOperatorKey();

        const defaultMemo = `CCC Gateway | ${topicType} | ${this.gatewayInstance} | #WeOwnSeason00${this.season}`;

        const tx = await new TopicCreateTransaction()
            .setTopicMemo(memo || defaultMemo)
            .setSubmitKey(operatorKey.publicKey)
            .setAdminKey(operatorKey.publicKey)
            .freezeWith(client)
            .sign(operatorKey);

        const response = await tx.execute(client);
        const receipt = await response.getReceipt(client);
        const topicId = receipt.topicId!.toString();

        this.topics[topicType] = topicId;

        console.log(`✅ HCS Topic [${topicType}]: ${topicId}`);
        await waitForPropagation(3000); // Wait 3s for mirror node sync
        client.close();

        return topicId;
    }

    /**
     * Create ALL HCS topics for the CCC Gateway
     * Run once on initial deployment
     */
    async createAllTopics(): Promise<TopicRegistry> {
        console.log("\n🚀 Creating CCC Gateway HCS Topics...\n");

        const topicTypes = Object.values(HCSTopicType);

        for (const topicType of topicTypes) {
            await this.createTopic(topicType);
        }

        console.log("\n═══════════════════════════════════════════");
        console.log("✅ All HCS Topics Created");
        console.log("═══════════════════════════════════════════");

        for (const [type, id] of Object.entries(this.topics)) {
            console.log(`  ${type}: ${id}`);
        }

        console.log("═══════════════════════════════════════════");
        console.log("\nAdd to .env.topics:");
        for (const [type, id] of Object.entries(this.topics)) {
            const envKey = `HCS_TOPIC_${type.toUpperCase().replace(/-/g, "_")}`;
            console.log(`${envKey}=${id}`);
        }

        return this.topics as TopicRegistry;
    }

    /**
     * Load topic IDs from environment variables
     */
    private loadTopicsFromEnv(): void {
        const mapping: Record<HCSTopicType, string> = {
            [HCSTopicType.CCC_ID]: "HCS_TOPIC_CCC_ID",
            [HCSTopicType.CONTEXT_VOLLEY]: "HCS_TOPIC_CONTEXT_VOLLEY",
            [HCSTopicType.GOVERNANCE]: "HCS_TOPIC_GOVERNANCE",
            [HCSTopicType.VSA]: "HCS_TOPIC_VSA",
            [HCSTopicType.AGENT_REGISTRY]: "HCS_TOPIC_AGENT_REGISTRY",
            [HCSTopicType.SEASON]: "HCS_TOPIC_SEASON",
        };

        for (const [topicType, envKey] of Object.entries(mapping)) {
            const value = process.env[envKey];
            if (value) {
                this.topics[topicType as HCSTopicType] = value;
            }
        }
    }

    /**
     * Set a specific topic ID (for manual configuration)
     */
    setTopic(topicType: HCSTopicType, topicId: string): void {
        this.topics[topicType] = topicId;
    }

    /**
     * Get topic info from Hedera
     */
    async getTopicInfo(topicType: HCSTopicType): Promise<{
        topicId: string;
        memo: string;
        sequenceNumber: number;
    }> {
        const topicId = this.getTopicId(topicType);
        const client = createClient();

        const info = await new TopicInfoQuery()
            .setTopicId(TopicId.fromString(topicId))
            .execute(client);

        client.close();

        return {
            topicId,
            memo: info.topicMemo,
            sequenceNumber: info.sequenceNumber.toNumber(),
        };
    }

    // ─────────────────────────────────────────────────
    // ATTESTATION METHODS
    // ─────────────────────────────────────────────────

    /**
     * Attest a CCC-ID generation event
     */
    async attestCCCId(
        attestation: Omit<HCSCCCIdAttestation, "version" | "type" | "gateway_instance" | "season" | "timestamp">
    ): Promise<HCSSubmitResult> {
        const message: HCSCCCIdAttestation = {
            version: "1.0.0",
            type: HCSTopicType.CCC_ID,
            gateway_instance: this.gatewayInstance,
            season: this.season,
            timestamp: new Date().toISOString(),
            ...attestation,
        };

        return this.submitMessage(HCSTopicType.CCC_ID, message);
    }

    /**
     * Attest a #ContextVolley event
     */
    async attestContextVolley(
        attestation: Omit<HCSContextVolleyAttestation, "version" | "type" | "gateway_instance" | "season" | "timestamp">
    ): Promise<HCSSubmitResult> {
        const message: HCSContextVolleyAttestation = {
            version: "1.0.0",
            type: HCSTopicType.CONTEXT_VOLLEY,
            gateway_instance: this.gatewayInstance,
            season: this.season,
            timestamp: new Date().toISOString(),
            ...attestation,
        };

        return this.submitMessage(HCSTopicType.CONTEXT_VOLLEY, message);
    }

    /**
     * Attest a governance action (rule lock, #BadAgent, etc.)
     */
    async attestGovernance(
        attestation: Omit<HCSGovernanceAttestation, "version" | "type" | "gateway_instance" | "season" | "timestamp">
    ): Promise<HCSSubmitResult> {
        const message: HCSGovernanceAttestation = {
            version: "1.0.0",
            type: HCSTopicType.GOVERNANCE,
            gateway_instance: this.gatewayInstance,
            season: this.season,
            timestamp: new Date().toISOString(),
            ...attestation,
        };

        return this.submitMessage(HCSTopicType.GOVERNANCE, message);
    }

    /**
     * Attest a VSA verification
     */
    async attestVSA(
        attestation: Omit<HCSVSAAttestation, "version" | "type" | "gateway_instance" | "season" | "timestamp">
    ): Promise<HCSSubmitResult> {
        const message: HCSVSAAttestation = {
            version: "1.0.0",
            type: HCSTopicType.VSA,
            gateway_instance: this.gatewayInstance,
            season: this.season,
            timestamp: new Date().toISOString(),
            ...attestation,
        };

        return this.submitMessage(HCSTopicType.VSA, message);
    }

    /**
     * Attest an agent registration
     */
    async attestAgentRegistration(
        attestation: Omit<HCSAgentRegistration, "version" | "type" | "gateway_instance" | "season" | "timestamp">
    ): Promise<HCSSubmitResult> {
        const message: HCSAgentRegistration = {
            version: "1.0.0",
            type: HCSTopicType.AGENT_REGISTRY,
            gateway_instance: this.gatewayInstance,
            season: this.season,
            timestamp: new Date().toISOString(),
            ...attestation,
        };

        return this.submitMessage(HCSTopicType.AGENT_REGISTRY, message);
    }

    /**
     * Attest a season lifecycle event
     */
    async attestSeasonEvent(
        action: GovernanceAction,
        details: Record<string, any>
    ): Promise<HCSSubmitResult> {
        const message: HCSGovernanceAttestation = {
            version: "1.0.0",
            type: HCSTopicType.GOVERNANCE,
            gateway_instance: this.gatewayInstance,
            season: this.season,
            timestamp: new Date().toISOString(),
            action,
            ...details,
        };

        return this.submitMessage(HCSTopicType.SEASON, message);
    }

    // ─────────────────────────────────────────────────
    // BATCH ATTESTATION
    // ─────────────────────────────────────────────────

    /**
     * Batch attest multiple CCC-IDs (e.g., weekly summary import)
     */
    async batchAttestCCCIds(
        attestations: Array<Omit<HCSCCCIdAttestation, "version" | "type" | "gateway_instance" | "season" | "timestamp">>
    ): Promise<HCSSubmitResult[]> {
        const results: HCSSubmitResult[] = [];

        for (const attestation of attestations) {
            try {
                const result = await this.attestCCCId(attestation);
                results.push(result);

                // Rate limiting — Hedera allows ~100 TPS per topic
                await this.delay(50);
            } catch (err) {
                console.error(`  ⚠️ Batch attest failed for ${attestation.ccc_id}: ${err}`);
            }
        }

        console.log(`✅ Batch attested ${results.length}/${attestations.length} CCC-IDs`);
        return results;
    }

    // ─────────────────────────────────────────────────
    // CORE SUBMIT
    // ─────────────────────────────────────────────────

    /**
     * Submit a message to an HCS topic
     */
    private async submitMessage(
        topicType: HCSTopicType,
        message: HCSBaseMessage
    ): Promise<HCSSubmitResult> {
        const topicId = this.getTopicId(topicType);
        const client = createClient();
        const operatorKey = getOperatorKey();

        const messageBytes = Buffer.from(JSON.stringify(message));

        // HCS message size limit = 1024 bytes
        if (messageBytes.length > 1024) {
            // Chunk large messages — submit hash + reference
            const hash = this.sha256(messageBytes);
            const refMessage = {
                ...message,
                _chunked: true,
                _content_hash: hash,
                _content_size: messageBytes.length,
            };
            const refBytes = Buffer.from(JSON.stringify(refMessage));

            const tx = await new TopicMessageSubmitTransaction()
                .setTopicId(TopicId.fromString(topicId))
                .setMessage(refBytes)
                .freezeWith(client)
                .sign(operatorKey);

            const response = await tx.execute(client);
            const receipt = await response.getReceipt(client);

            this.messageCount++;
            client.close();

            return {
                topicId,
                sequenceNumber: receipt.topicSequenceNumber!.toNumber(),
                transactionId: response.transactionId.toString(),
                timestamp: new Date().toISOString(),
                messageSize: refBytes.length,
            };
        }

        const tx = await new TopicMessageSubmitTransaction()
            .setTopicId(TopicId.fromString(topicId))
            .setMessage(messageBytes)
            .freezeWith(client)
            .sign(operatorKey);

        const response = await tx.execute(client);
        const receipt = await response.getReceipt(client);

        this.messageCount++;
        client.close();

        const result: HCSSubmitResult = {
            topicId,
            sequenceNumber: receipt.topicSequenceNumber!.toNumber(),
            transactionId: response.transactionId.toString(),
            timestamp: new Date().toISOString(),
            messageSize: messageBytes.length,
        };

        console.log(
            `  📜 HCS [${topicType}] seq #${result.sequenceNumber} — ${result.messageSize}B`
        );

        return result;
    }

    // ─────────────────────────────────────────────────
    // UTILITIES
    // ─────────────────────────────────────────────────

    private getTopicId(topicType: HCSTopicType): string {
        const topicId = this.topics[topicType];
        if (!topicId) {
            throw new Error(
                `HCS topic not configured for type: ${topicType}. ` +
                `Run createAllTopics() or set via .env`
            );
        }
        return topicId;
    }

    private sha256(data: Buffer): string {
        const crypto = require("crypto");
        return crypto.createHash("sha256").update(data).digest("hex");
    }

    private delay(ms: number): Promise<void> {
        return new Promise((resolve) => setTimeout(resolve, ms));
    }

    /**
     * Get attestor stats
     */
    getStats(): {
        topics: Partial<TopicRegistry>;
        messageCount: number;
        instance: string;
        season: number;
    } {
        return {
            topics: this.topics,
            messageCount: this.messageCount,
            instance: this.gatewayInstance,
            season: this.season,
        };
    }
}

// ───────────────────────────────────────────────────────
// CLI — Create topics when run directly
// ───────────────────────────────────────────────────────

const isMain = process.argv[1]?.includes("hcs-attestor");
if (isMain) {
    const args = process.argv.slice(2);

    if (args.includes("--create-topic") || args.includes("--create-all")) {
        const attestor = new HCSAttestor();
        attestor
            .createAllTopics()
            .then(() => {
                console.log("\n🎉 Done. Copy topic IDs to .env.topics");
                process.exit(0);
            })
            .catch((err) => {
                console.error("❌ Failed:", err);
                process.exit(1);
            });
    } else {
        console.log(`
Usage:
  tsx src/hcs-attestor.ts --create-all    Create all 6 HCS topics
    `);
    }
}

```

## File: packages/hedera/src/index.ts
```
// @repo/hedera — Package exports

export {
    HCSAttestor,
    HCSTopicType,
    type HCSBaseMessage,
    type HCSCCCIdAttestation,
    type HCSContextVolleyAttestation,
    type HCSGovernanceAttestation,
    type HCSVSAAttestation,
    type HCSAgentRegistration,
    type HCSSubmitResult,
    type TopicRegistry,
    type GovernanceAction,
} from "./hcs-attestor";

export {
    createClient,
    getHederaConfig,
    getOperatorId,
    getOperatorKey,
    getOperatorPublicKey,
    type HederaConfig,
} from "./config";


export { createCCCToken, mintCCCReward } from "./tokens/ccc-token";
export { createCCCIdNFTCollection, mintCCCIdNFT } from "./tokens/ccc-id-nft";
export { createAgentIdCollection, mintAgentId } from "./tokens/agent-identity-nft";
export { createCoopMembershipCollection } from "./tokens/coop-membership";
export { createGovToken, mintGovReward } from "./tokens/governance-token";
export { freezeBadAgent, pauseForSeasonTransition } from "./tokens/enforcement";
export { bootstrapTokenRegistry } from "./tokens/bootstrap";
export * from "./tokens/types";

```

## File: packages/hedera/src/config.ts
```
import {
    Client,
    PrivateKey,
    AccountId,
    PublicKey,
} from "@hashgraph/sdk";
const dotenv = require("dotenv");
dotenv.config();
//import { configDotenv } from "dotenv";

// ═══════════════════════════════════════════════════════
// HEDERA CLIENT CONFIGURATION
// @ccc-gateway/hedera
// ═══════════════════════════════════════════════════════

export interface HederaConfig {
    network: "testnet" | "mainnet" | "previewnet";
    operatorId: string;
    operatorKey: string;
}

export function getHederaConfig(): HederaConfig {
    const operatorId = process.env.HEDERA_ACCOUNT_ID;
    const operatorKey = process.env.HEDERA_PRIVATE_KEY;
    const network = (process.env.HEDERA_NETWORK || "testnet") as HederaConfig["network"];

    if (!operatorId || !operatorKey) {
        throw new Error(
            "Missing HEDERA_ACCOUNT_ID or HEDERA_PRIVATE_KEY in .env"
        );
    }

    return { network, operatorId, operatorKey };
}

export function createClient(config?: HederaConfig): Client {
    const cfg = config || getHederaConfig();

    let client: Client;
    switch (cfg.network) {
        case "mainnet":
            client = Client.forMainnet();
            break;
        case "previewnet":
            client = Client.forPreviewnet();
            break;
        default:
            client = Client.forTestnet();
    }

    client.setOperator(
        AccountId.fromString(cfg.operatorId),
        PrivateKey.fromStringECDSA(cfg.operatorKey)
    );

    return client;
}

export function getOperatorId(): AccountId {
    return AccountId.fromString(process.env.HEDERA_ACCOUNT_ID!);
}

export function getOperatorKey(): PrivateKey {
    return PrivateKey.fromStringECDSA(process.env.HEDERA_PRIVATE_KEY!);
}

export function getOperatorPublicKey(): PublicKey {
    return getOperatorKey().publicKey;
}

```

## File: packages/hedera/src/index.d.ts
```
export { HCSAttestor, HCSTopicType, type HCSBaseMessage, type HCSCCCIdAttestation, type HCSContextVolleyAttestation, type HCSGovernanceAttestation, type HCSVSAAttestation, type HCSAgentRegistration, type HCSSubmitResult, type TopicRegistry, type GovernanceAction, } from "./hcs-attestor";
export { createClient, getHederaConfig, getOperatorId, getOperatorKey, getOperatorPublicKey, type HederaConfig, } from "./config";
export { createCCCToken, mintCCCReward } from "./tokens/ccc-token";
export { createCCCIdNFTCollection, mintCCCIdNFT } from "./tokens/ccc-id-nft";
export { createAgentIdCollection, mintAgentId } from "./tokens/agent-identity-nft";
export { createCoopMembershipCollection } from "./tokens/coop-membership";
export { createGovToken, mintGovReward } from "./tokens/governance-token";
export { freezeBadAgent, pauseForSeasonTransition } from "./tokens/enforcement";
export { bootstrapTokenRegistry } from "./tokens/bootstrap";
export * from "./tokens/types";
//# sourceMappingURL=index.d.ts.map
```

## File: packages/hedera/src/utils/validation.ts
```

import { Client, TokenId, TopicId, TokenInfoQuery, TopicInfoQuery, TokenType } from "@hashgraph/sdk";

/**
 * Validates that a string is a valid Hedera ID in the format shard.realm.num
 * e.g. "0.0.12345"
 */
export function isValidHederaId(id: string): boolean {
    // Regex for shard.realm.num (allowing for multiple digits)
    // ^\d+\.\d+\.\d+$
    const regex = /^\d+\.\d+\.\d+$/;
    return regex.test(id);
}

/**
 * Validates that a Token exists on-chain and matches the expected type.
 * @param client Hedera Client
 * @param tokenId Token ID string (0.0.xxx)
 * @param expectedType TokenType (FungibleCommon or NonFungibleUnique)
 */
export async function validateTokenType(
    client: Client,
    tokenId: string,
    expectedType: TokenType
): Promise<boolean> {
    try {
        const info = await new TokenInfoQuery()
            .setTokenId(TokenId.fromString(tokenId))
            .execute(client);

        // TokenType is an object/enum in SDK, simpler comparison via string or strict equality if same instance
        // SDK returns info.tokenType which is the enum

        // Debug log
        console.log(`    ℹ️ Token ${tokenId} Type: ${info.tokenType?.toString()}`);

        return info.tokenType === expectedType;
    } catch (error) {
        console.error(`    ❌ Failed to validate token ${tokenId}:`, error);
        return false;
    }
}

/**
 * Validates that a Topic exists on-chain.
 */
export async function validateTopic(client: Client, topicId: string): Promise<boolean> {
    try {
        const info = await new TopicInfoQuery()
            .setTopicId(TopicId.fromString(topicId))
            .execute(client);

        console.log(`    ℹ️ Topic ${topicId} Sequence: ${info.sequenceNumber.toString()}`);
        return true;
    } catch (error) {
        console.error(`    ❌ Failed to validate topic ${topicId}:`, error);
        return false;
    }
}

```

## File: packages/hedera/src/utils/network-check.ts
```

/**
 * Utility to ensure Hedera resources are propagated before use.
 * The Mirror Node or occasional gossip lag can cause "INVALID_ID" 
 * errors if used immediately after creation receipt.
 */
export async function waitForPropagation(ms: number = 3000): Promise<void> {
    console.log(`    ⏳ Waiting ${ms}ms for network propagation...`);
    return new Promise(resolve => setTimeout(resolve, ms));
}

```

## File: packages/hedera/src/utils/network-check.d.ts
```
/**
 * Utility to ensure Hedera resources are propagated before use.
 * The Mirror Node or occasional gossip lag can cause "INVALID_ID"
 * errors if used immediately after creation receipt.
 */
export declare function waitForPropagation(ms?: number): Promise<void>;
//# sourceMappingURL=network-check.d.ts.map
```

## File: packages/hedera/src/utils/mirror-node.d.ts
```
export interface TransactionLog {
    consensus_timestamp: string;
    transaction_id: string;
    result: string;
    name: string;
    memo_base64: string;
}
export declare class MirrorNode {
    static getLogs(accountId: string, limit?: number): Promise<any>;
    static printLogs(accountId: string, limit?: number): Promise<void>;
}
//# sourceMappingURL=mirror-node.d.ts.map
```

## File: packages/hedera/src/utils/mirror-node.ts
```

import axios from 'axios';

const MIRROR_NODE_URL = 'https://testnet.mirrornode.hedera.com';

export interface TransactionLog {
    consensus_timestamp: string;
    transaction_id: string;
    result: string;
    name: string;
    memo_base64: string;
}

export class MirrorNode {
    static async getLogs(accountId: string, limit: number = 20) {
        try {
            const url = `${MIRROR_NODE_URL}/api/v1/transactions?account.id=${accountId}&order=desc&limit=${limit}`;
            const response = await axios.get(url);

            return response.data.transactions.map((tx: any) => ({
                time: new Date(parseFloat(tx.consensus_timestamp) * 1000).toISOString(),
                type: tx.name,
                status: tx.result,
                memo: tx.memo_base64 ? Buffer.from(tx.memo_base64, 'base64').toString('utf-8') : '',
                id: tx.transaction_id
            }));
        } catch (error) {
            console.error("Error fetching from Mirror Node:", error);
            return [];
        }
    }

    static async printLogs(accountId: string, limit: number = 20) {
        console.log(`\n📜 Fetching last ${limit} transactions for ${accountId}...\n`);
        const logs = await this.getLogs(accountId, limit);

        if (logs.length === 0) {
            console.log("No transactions found.");
            return;
        }

        console.table(logs.map((l: any) => ({
            Time: l.time.split('T')[1].replace('Z', ''),
            Type: l.type,
            Status: l.status === 'SUCCESS' ? '✅ SUCCESS' : `❌ ${l.status}`,
            Memo: l.memo.length > 50 ? l.memo.substring(0, 50) + '...' : l.memo
        })));
    }
}

```

## File: packages/hedera/src/utils/validation.d.ts
```
import { Client, TokenType } from "@hashgraph/sdk";
/**
 * Validates that a string is a valid Hedera ID in the format shard.realm.num
 * e.g. "0.0.12345"
 */
export declare function isValidHederaId(id: string): boolean;
/**
 * Validates that a Token exists on-chain and matches the expected type.
 * @param client Hedera Client
 * @param tokenId Token ID string (0.0.xxx)
 * @param expectedType TokenType (FungibleCommon or NonFungibleUnique)
 */
export declare function validateTokenType(client: Client, tokenId: string, expectedType: TokenType): Promise<boolean>;
/**
 * Validates that a Topic exists on-chain.
 */
export declare function validateTopic(client: Client, topicId: string): Promise<boolean>;
//# sourceMappingURL=validation.d.ts.map
```

## File: packages/hedera/src/tokens/ccc-identity-nft.d.ts
```
import type { TokenCreateResult, TokenMintResult, CCCIdNFTMetadata } from "./types";
export declare function createCCCIdNFTCollection(): Promise<TokenCreateResult>;
export declare function mintCCCIdNFT(tokenId: string, metadata: CCCIdNFTMetadata): Promise<TokenMintResult>;
//# sourceMappingURL=ccc-identity-nft.d.ts.map
```

## File: packages/hedera/src/tokens/governance-token.ts
```
import {
    TokenCreateTransaction,
    TokenType,
    TokenSupplyType,
    TokenMintTransaction,
    TokenId,
} from "@hashgraph/sdk";
import { createClient, getOperatorId, getOperatorKey } from "../config";
import type { TokenCreateResult, TokenMintResult } from "./types";

export async function createGovToken(): Promise<TokenCreateResult> {
    const client = createClient();
    const operatorId = getOperatorId();
    const operatorKey = getOperatorKey();

    const tx = await new TokenCreateTransaction()
        .setTokenName("CCC Governance Token")
        .setTokenSymbol("GOV")
        .setTokenType(TokenType.FungibleCommon)
        .setDecimals(0)
        .setInitialSupply(0)
        .setSupplyType(TokenSupplyType.Infinite)
        .setTreasuryAccountId(operatorId)
        .setSupplyKey(operatorKey.publicKey)
        .setAdminKey(operatorKey.publicKey)
        .setTokenMemo("GOV — FedArch Governance Token | team weown")
        .freezeWith(client)
        .sign(operatorKey);

    const response = await tx.execute(client);
    const receipt = await response.getReceipt(client);
    client.close();

    return {
        tokenId: receipt.tokenId!.toString(),
        transactionId: response.transactionId.toString(),
    };
}

export async function mintGovReward(
    tokenId: string,
    amount: number
): Promise<TokenMintResult> {
    const client = createClient();
    const operatorKey = getOperatorKey();

    const tx = await new TokenMintTransaction()
        .setTokenId(TokenId.fromString(tokenId))
        .setAmount(amount)
        .freezeWith(client)
        .sign(operatorKey);

    const response = await tx.execute(client);
    await response.getReceipt(client);
    client.close();

    return {
        amount,
        transactionId: response.transactionId.toString(),
    };
}

```

## File: packages/hedera/src/tokens/coop-membership.ts
```
import {
    TokenCreateTransaction,
    TokenType,
    TokenSupplyType,
} from "@hashgraph/sdk";
import { createClient, getOperatorId, getOperatorKey } from "../config";
import type { TokenCreateResult } from "./types";

export async function createCoopMembershipCollection(): Promise<TokenCreateResult> {
    const client = createClient();
    const operatorId = getOperatorId();
    const operatorKey = getOperatorKey();

    const tx = await new TokenCreateTransaction()
        .setTokenName("WeOwnNet Cooperative Membership")
        .setTokenSymbol("COOPMEM")
        .setTokenType(TokenType.NonFungibleUnique)
        .setSupplyType(TokenSupplyType.Infinite)
        .setTreasuryAccountId(operatorId)
        .setSupplyKey(operatorKey.publicKey)
        .setAdminKey(operatorKey.publicKey)
        .setFreezeKey(operatorKey.publicKey)
        .setKycKey(operatorKey.publicKey)
        .setTokenMemo("Cooperative Membership — ♾️ WeOwnNet 🌐 | team weown")
        .freezeWith(client)
        .sign(operatorKey);

    const response = await tx.execute(client);
    const receipt = await response.getReceipt(client);
    client.close();

    return {
        tokenId: receipt.tokenId!.toString(),
        transactionId: response.transactionId.toString(),
    };
}

```

## File: packages/hedera/src/tokens/ccc-id-nft.ts
```
import {
    TokenCreateTransaction,
    TokenType,
    TokenSupplyType,
    TokenMintTransaction,
    TokenId,
    CustomRoyaltyFee,
    CustomFixedFee,
    Hbar,
} from "@hashgraph/sdk";
import { createClient, getOperatorId, getOperatorKey } from "../config";
import type { TokenCreateResult, TokenMintResult, CCCIdNFTMetadata } from "./types";

export async function createCCCIdNFTCollection(): Promise<TokenCreateResult> {
    const client = createClient();
    const operatorId = getOperatorId();
    const operatorKey = getOperatorKey();

    const royaltyFee = new CustomRoyaltyFee()
        .setNumerator(5)
        .setDenominator(100)
        .setFeeCollectorAccountId(operatorId)
        .setFallbackFee(new CustomFixedFee().setHbarAmount(new Hbar(1)));

    const tx = await new TokenCreateTransaction()
        .setTokenName("CCC-ID Attestation")
        .setTokenSymbol("CCCID")
        .setTokenType(TokenType.NonFungibleUnique)
        .setSupplyType(TokenSupplyType.Infinite)
        .setTreasuryAccountId(operatorId)
        .setSupplyKey(operatorKey.publicKey)
        .setAdminKey(operatorKey.publicKey)
        .setFreezeKey(operatorKey.publicKey)
        .setCustomFees([royaltyFee])
        .setTokenMemo("CCC-ID NFT — FedArch Contribution Attestation | team weown")
        .freezeWith(client)
        .sign(operatorKey);

    const response = await tx.execute(client);
    const receipt = await response.getReceipt(client);
    client.close();

    return {
        tokenId: receipt.tokenId!.toString(),
        transactionId: response.transactionId.toString(),
    };
}

export async function mintCCCIdNFT(
    tokenId: string,
    metadata: CCCIdNFTMetadata
): Promise<TokenMintResult> {
    const client = createClient();
    const operatorKey = getOperatorKey();

    const tx = await new TokenMintTransaction()
        .setTokenId(TokenId.fromString(tokenId))
        .addMetadata(Buffer.from(JSON.stringify(metadata)))
        .freezeWith(client)
        .sign(operatorKey);

    const response = await tx.execute(client);
    const receipt = await response.getReceipt(client);
    client.close();

    return {
        serial: (receipt.serials[0] as Long).toNumber(),
        transactionId: response.transactionId.toString(),
    };
}

```

## File: packages/hedera/src/tokens/types.d.ts
```
export interface TokenCreateResult {
    tokenId: string;
    transactionId: string;
}
export interface TokenMintResult {
    serial?: number;
    transactionId: string;
    amount?: number;
}
export interface CCCIdNFTMetadata {
    ccc_id: string;
    contributor: string;
    year: number;
    week: number;
    sequence: number;
    instance: string;
    workspace: string;
    timestamp: string;
    hcs_topic_id?: string;
    hcs_sequence?: number;
}
export interface AgentIdMetadata {
    ccc: string;
    agent_id: string;
    contributor: string;
    role: string;
    tier: "founding_og" | "contributor" | "tool_agent";
    home_instance: string;
    season_joined: string;
    registered_at: string;
}
export declare enum RewardTier {
    WEEKLY_SUMMARY = 50,
    WEEKLY_PLAN = 25,
    WEEKLY_REFLECTION = 25,
    STANDARD = 10,
    RULE_LOCKED = 10,
    BP_LOCKED = 5,
    LEARNING_LOGGED = 2,
    DEFINITION_ADDED = 3
}
export declare function getRewardForSequence(sequence: number): RewardTier;
//# sourceMappingURL=types.d.ts.map
```

## File: packages/hedera/src/tokens/ccc-token.ts
```
import {
    TokenCreateTransaction,
    TokenType,
    TokenSupplyType,
    TokenMintTransaction,
    TokenId,
    CustomFractionalFee,
    FeeAssessmentMethod,
} from "@hashgraph/sdk";
import { createClient, getOperatorId, getOperatorKey, getOperatorPublicKey } from "../config";
import { waitForPropagation } from "../utils/network-check";
import type { TokenCreateResult, TokenMintResult } from "./types";
import { getRewardForSequence } from "./types";

const DECIMALS = 6;
const UNIT = 10 ** DECIMALS;

export async function createCCCToken(): Promise<TokenCreateResult> {
    const client = createClient();
    const operatorId = getOperatorId();
    const operatorKey = getOperatorKey();

    const fractionalFee = new CustomFractionalFee()
        .setNumerator(2)
        .setDenominator(100)
        .setFeeCollectorAccountId(operatorId)
        .setAssessmentMethod(FeeAssessmentMethod.Inclusive);

    const tx = await new TokenCreateTransaction()
        .setTokenName("CCC Contribution Token")
        .setTokenSymbol("CCC")
        .setTokenType(TokenType.FungibleCommon)
        .setDecimals(DECIMALS)
        .setInitialSupply(0)
        .setSupplyType(TokenSupplyType.Infinite)
        .setTreasuryAccountId(operatorId)
        .setSupplyKey(operatorKey.publicKey)
        .setFreezeKey(operatorKey.publicKey)
        .setWipeKey(operatorKey.publicKey)
        .setPauseKey(operatorKey.publicKey)
        .setAdminKey(operatorKey.publicKey)
        .setCustomFees([fractionalFee])
        .setTokenMemo("$CCC — FedArch Contribution Token | team weown | ETHDenver 2026")
        .freezeWith(client)
        .sign(operatorKey);

    const response = await tx.execute(client);
    const receipt = await response.getReceipt(client);

    await waitForPropagation(3000);

    client.close();

    return {
        tokenId: receipt.tokenId!.toString(),
        transactionId: response.transactionId.toString(),
    };
}

export async function mintCCCReward(
    tokenId: string,
    cccId: string,
    sequence: number
): Promise<TokenMintResult> {
    const client = createClient();
    const operatorKey = getOperatorKey();

    const reward = getRewardForSequence(sequence);
    const amount = reward * UNIT;

    const tx = await new TokenMintTransaction()
        .setTokenId(TokenId.fromString(tokenId))
        .setAmount(amount)
        .freezeWith(client)
        .sign(operatorKey);

    const response = await tx.execute(client);
    await response.getReceipt(client);

    client.close();

    return {
        amount: reward,
        transactionId: response.transactionId.toString(),
    };
}

```

## File: packages/hedera/src/tokens/enforcement.d.ts
```
export declare function freezeBadAgent(cccTokenId: string, agentAccountId: string, reason: string): Promise<string>;
export declare function pauseForSeasonTransition(tokenId: string): Promise<string>;
//# sourceMappingURL=enforcement.d.ts.map
```

## File: packages/hedera/src/tokens/governance-token.d.ts
```
import type { TokenCreateResult, TokenMintResult } from "./types";
export declare function createGovToken(): Promise<TokenCreateResult>;
export declare function mintGovReward(tokenId: string, amount: number): Promise<TokenMintResult>;
//# sourceMappingURL=governance-token.d.ts.map
```

## File: packages/hedera/src/tokens/ccc-identity-nft.ts
```
import {
    TokenCreateTransaction,
    TokenType,
    TokenSupplyType,
    TokenMintTransaction,
    TokenId,
    CustomRoyaltyFee,
    CustomFixedFee,
    Hbar,
} from "@hashgraph/sdk";
import { createClient, getOperatorId, getOperatorKey } from "../config";
import type { TokenCreateResult, TokenMintResult, CCCIdNFTMetadata } from "./types";

export async function createCCCIdNFTCollection(): Promise<TokenCreateResult> {
    const client = createClient();
    const operatorId = getOperatorId();
    const operatorKey = getOperatorKey();

    const royaltyFee = new CustomRoyaltyFee()
        .setNumerator(5)
        .setDenominator(100)
        .setFeeCollectorAccountId(operatorId)
        .setFallbackFee(new CustomFixedFee().setHbarAmount(new Hbar(1)));

    const tx = await new TokenCreateTransaction()
        .setTokenName("CCC-ID Attestation")
        .setTokenSymbol("CCCID")
        .setTokenType(TokenType.NonFungibleUnique)
        .setSupplyType(TokenSupplyType.Infinite)
        .setTreasuryAccountId(operatorId)
        .setSupplyKey(operatorKey.publicKey)
        .setAdminKey(operatorKey.publicKey)
        .setFreezeKey(operatorKey.publicKey)
        .setCustomFees([royaltyFee])
        .setTokenMemo("CCC-ID NFT — FedArch Contribution Attestation | team weown")
        .freezeWith(client)
        .sign(operatorKey);

    const response = await tx.execute(client);
    const receipt = await response.getReceipt(client);
    client.close();

    return {
        tokenId: receipt.tokenId!.toString(),
        transactionId: response.transactionId.toString(),
    };
}

export async function mintCCCIdNFT(
    tokenId: string,
    metadata: CCCIdNFTMetadata
): Promise<TokenMintResult> {
    const client = createClient();
    const operatorKey = getOperatorKey();

    const tx = await new TokenMintTransaction()
        .setTokenId(TokenId.fromString(tokenId))
        .addMetadata(Buffer.from(JSON.stringify(metadata)))
        .freezeWith(client)
        .sign(operatorKey);

    const response = await tx.execute(client);
    const receipt = await response.getReceipt(client);
    client.close();

    return {
        serial: (receipt.serials[0] as Long).toNumber(),
        transactionId: response.transactionId.toString(),
    };
}

```

## File: packages/hedera/src/tokens/types.ts
```
// ═══════════════════════════════════════════════════════
// TOKEN TYPES — @ccc-gateway/hedera
// ═══════════════════════════════════════════════════════

export interface TokenCreateResult {
    tokenId: string;
    transactionId: string;
}

export interface TokenMintResult {
    serial?: number;
    transactionId: string;
    amount?: number;
}

export interface CCCIdNFTMetadata {
    ccc_id: string;
    contributor: string;
    year: number;
    week: number;
    sequence: number;
    instance: string;
    workspace: string;
    timestamp: string;
    hcs_topic_id?: string;
    hcs_sequence?: number;
}

export interface AgentIdMetadata {
    ccc: string;
    agent_id: string;
    contributor: string;
    role: string;
    tier: "founding_og" | "contributor" | "tool_agent";
    home_instance: string;
    season_joined: string;
    registered_at: string;
}

export enum RewardTier {
    WEEKLY_SUMMARY = 50,
    WEEKLY_PLAN = 25,
    WEEKLY_REFLECTION = 25,
    STANDARD = 10,
    RULE_LOCKED = 10,
    BP_LOCKED = 5,
    LEARNING_LOGGED = 2,
    DEFINITION_ADDED = 3,
}

export function getRewardForSequence(sequence: number): RewardTier {
    switch (sequence) {
        case 1: return RewardTier.WEEKLY_SUMMARY;
        case 2: return RewardTier.WEEKLY_PLAN;
        case 3: return RewardTier.WEEKLY_REFLECTION;
        default: return RewardTier.STANDARD;
    }
}

```

## File: packages/hedera/src/tokens/ccc-token.d.ts
```
import type { TokenCreateResult, TokenMintResult } from "./types";
export declare function createCCCToken(): Promise<TokenCreateResult>;
export declare function mintCCCReward(tokenId: string, cccId: string, sequence: number): Promise<TokenMintResult>;
//# sourceMappingURL=ccc-token.d.ts.map
```

## File: packages/hedera/src/tokens/agent-identity-nft.ts
```
import {
    TokenCreateTransaction,
    TokenType,
    TokenSupplyType,
    TokenMintTransaction,
    TokenId,
} from "@hashgraph/sdk";
import { createClient, getOperatorId, getOperatorKey } from "../config";
import type { TokenCreateResult, TokenMintResult, AgentIdMetadata } from "./types";

export async function createAgentIdCollection(): Promise<TokenCreateResult> {
    const client = createClient();
    const operatorId = getOperatorId();
    const operatorKey = getOperatorKey();

    const tx = await new TokenCreateTransaction()
        .setTokenName("FedArch Agent Identity")
        .setTokenSymbol("AGENTID")
        .setTokenType(TokenType.NonFungibleUnique)
        .setSupplyType(TokenSupplyType.Finite)
        .setMaxSupply(999)
        .setTreasuryAccountId(operatorId)
        .setSupplyKey(operatorKey.publicKey)
        .setAdminKey(operatorKey.publicKey)
        .setTokenMemo("Agent Identity NFT — FedArch | team weown")
        .freezeWith(client)
        .sign(operatorKey);

    const response = await tx.execute(client);
    const receipt = await response.getReceipt(client);
    client.close();

    return {
        tokenId: receipt.tokenId!.toString(),
        transactionId: response.transactionId.toString(),
    };
}

export async function mintAgentId(
    tokenId: string,
    metadata: AgentIdMetadata
): Promise<TokenMintResult> {
    const client = createClient();
    const operatorKey = getOperatorKey();

    const tx = await new TokenMintTransaction()
        .setTokenId(TokenId.fromString(tokenId))
        .addMetadata(Buffer.from(JSON.stringify(metadata)))
        .freezeWith(client)
        .sign(operatorKey);

    const response = await tx.execute(client);
    const receipt = await response.getReceipt(client);
    client.close();

    return {
        serial: (receipt.serials[0] as Long).toNumber(),
        transactionId: response.transactionId.toString(),
    };
}

```

## File: packages/hedera/src/tokens/coop-membership.d.ts
```
import type { TokenCreateResult } from "./types";
export declare function createCoopMembershipCollection(): Promise<TokenCreateResult>;
//# sourceMappingURL=coop-membership.d.ts.map
```

## File: packages/hedera/src/tokens/enforcement.ts
```
import {
    TokenFreezeTransaction,
    TokenPauseTransaction,
    TokenId,
    AccountId,
} from "@hashgraph/sdk";
import { createClient, getOperatorKey } from "../config.js";

import { waitForPropagation } from "../utils/network-check";

export async function freezeBadAgent(
    cccTokenId: string,
    agentAccountId: string,
    reason: string
): Promise<string> {
    const client = createClient();
    const operatorKey = getOperatorKey();

    const tx = await new TokenFreezeTransaction()
        .setTokenId(TokenId.fromString(cccTokenId))
        .setAccountId(AccountId.fromString(agentAccountId))
        .freezeWith(client)
        .sign(operatorKey);

    const response = await tx.execute(client);
    await response.getReceipt(client);

    console.log(`🚨 #BadAgent FREEZE: ${agentAccountId} — ${reason}`);
    await waitForPropagation(3000);

    client.close();
    return response.transactionId.toString();
}

export async function pauseForSeasonTransition(
    tokenId: string
): Promise<string> {
    const client = createClient();
    const operatorKey = getOperatorKey();

    const tx = await new TokenPauseTransaction()
        .setTokenId(TokenId.fromString(tokenId))
        .freezeWith(client)
        .sign(operatorKey);

    const response = await tx.execute(client);
    await response.getReceipt(client);

    console.log(`⏸️ Token ${tokenId} PAUSED for season transition`);
    await waitForPropagation(3000);

    client.close();
    return response.transactionId.toString();
}

```

## File: packages/hedera/src/tokens/index.ts
```
// @repo/hedera/tokens — barrel export
export { createCCCToken, mintCCCReward } from "./ccc-token";
export { createCCCIdNFTCollection, mintCCCIdNFT } from "./ccc-id-nft";
export { createAgentIdCollection, mintAgentId } from "./agent-identity-nft";
export { createCoopMembershipCollection } from "./coop-membership";
export { createGovToken, mintGovReward } from "./governance-token";
export { freezeBadAgent, pauseForSeasonTransition } from "./enforcement";
export { bootstrapTokenRegistry } from "./bootstrap";
export * from "./types";

```

## File: packages/hedera/src/tokens/bootstrap.d.ts
```
export declare function bootstrapTokenRegistry(): Promise<Record<string, string>>;
//# sourceMappingURL=bootstrap.d.ts.map
```

## File: packages/hedera/src/tokens/ccc-id-nft.d.ts
```
import type { TokenCreateResult, TokenMintResult, CCCIdNFTMetadata } from "./types";
export declare function createCCCIdNFTCollection(): Promise<TokenCreateResult>;
export declare function mintCCCIdNFT(tokenId: string, metadata: CCCIdNFTMetadata): Promise<TokenMintResult>;
//# sourceMappingURL=ccc-id-nft.d.ts.map
```

## File: packages/hedera/src/tokens/bootstrap.ts
```
import { createCCCToken } from "./ccc-token";
import { createCCCIdNFTCollection } from "./ccc-id-nft";
import { createAgentIdCollection } from "./agent-identity-nft";
import { createCoopMembershipCollection } from "./coop-membership";
import { createGovToken } from "./governance-token";
import fs from "fs";

export async function bootstrapTokenRegistry(): Promise<Record<string, string>> {
    console.log("\n🚀 Bootstrapping CCC Gateway Token Registry...\n");

    const registry: Record<string, string> = {};

    const ccc = await createCCCToken();
    registry["CCC_TOKEN"] = ccc.tokenId;
    console.log(`  ✅ $CCC: ${ccc.tokenId}`);

    const cccIdNft = await createCCCIdNFTCollection();
    registry["CCCID_NFT"] = cccIdNft.tokenId;
    console.log(`  ✅ CCC-ID NFT: ${cccIdNft.tokenId}`);

    const agentId = await createAgentIdCollection();
    registry["AGENT_ID_NFT"] = agentId.tokenId;
    console.log(`  ✅ Agent ID NFT: ${agentId.tokenId}`);

    const coopMem = await createCoopMembershipCollection();
    registry["COOP_MEMBER_NFT"] = coopMem.tokenId;
    console.log(`  ✅ Coop Membership: ${coopMem.tokenId}`);

    const gov = await createGovToken();
    registry["GOV_TOKEN"] = gov.tokenId;
    console.log(`  ✅ GOV: ${gov.tokenId}`);

    const envContent = Object.entries(registry)
        .map(([key, val]) => `${key}=${val}`)
        .join("\n");

    fs.writeFileSync(".env.tokens", envContent);

    console.log("\n═══════════════════════════════════════════");
    console.log("✅ CCC Gateway Token Registry — COMPLETE");
    console.log("═══════════════════════════════════════════");
    console.log(envContent);
    console.log("═══════════════════════════════════════════\n");

    return registry;
}

// CLI
const isMain = process.argv[1]?.includes("bootstrap");
if (isMain) {
    bootstrapTokenRegistry()
        .then(() => process.exit(0))
        .catch((err) => {
            console.error("❌ Bootstrap failed:", err);
            process.exit(1);
        });
}

```

## File: packages/typescript-config/package.json
```
{
  "name": "@repo/typescript-config",
  "version": "0.0.0",
  "private": true,
  "license": "MIT",
  "publishConfig": {
    "access": "public"
  }
}

```

## File: packages/timescaledb/package.json
```
{
    "name": "@repo/timescaledb",
    "version": "0.1.0",
    "private": true,
    "main": "./src/index.ts",
    "types": "./src/index.ts",
    "exports": {
        ".": {
            "types": "./src/index.ts",
            "default": "./src/index.ts"
        }
    },
    "scripts": {
        "lint": "eslint .",
        "check-types": "tsc --noEmit"
    },
    "devDependencies": {
        "@repo/typescript-config": "workspace:*",
        "@types/node": "^20.10.0",
        "@types/pg": "^8.11.0",
        "eslint": "^9.15.0",
        "typescript": "5.9.2"
    },
    "dependencies": {
        "pg": "^8.11.0",
        "zod": "^3.23.0"
    }
}

```

## File: packages/timescaledb/tsconfig.json
```
{
    "extends": "@repo/typescript-config/base.json",
    "compilerOptions": {
        "lib": [
            "ES2022"
        ],
        "module": "NodeNext",
        "target": "ES2022"
    },
    "include": ["src"],
    "exclude": [
        "node_modules",
        "dist"
    ]
}

```

## File: packages/timescaledb/src/schema.ts
```
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

```

## File: packages/timescaledb/src/client.ts
```
import { Pool, PoolConfig, QueryResult, QueryResultRow } from 'pg';
import { z } from 'zod';

export const TimescaleConfigSchema = z.object({
  connectionString: z.string().url(),
  ssl: z.boolean().default(true),
  max: z.number().default(20),
  idleTimeoutMillis: z.number().default(30000),
  connectionTimeoutMillis: z.number().default(2000),
});

export type TimescaleConfig = z.infer<typeof TimescaleConfigSchema>;

export class TimescaleClient {
  private pool: Pool;

  constructor(config: z.input<typeof TimescaleConfigSchema>) {
    const validatedConfig = TimescaleConfigSchema.parse(config);
    
    const poolConfig: PoolConfig = {
      connectionString: validatedConfig.connectionString,
      ssl: validatedConfig.ssl ? { rejectUnauthorized: false } : false,
      max: validatedConfig.max,
      idleTimeoutMillis: validatedConfig.idleTimeoutMillis,
      connectionTimeoutMillis: validatedConfig.connectionTimeoutMillis,
    };

    this.pool = new Pool(poolConfig);

    this.pool.on('error', (err) => {
      console.error('Unexpected error on idle TimescaleDB client', err);
    });
  }

  async query<T extends QueryResultRow = any>(
    text: string,
    params?: any[]
  ): Promise<QueryResult<T>> {
    const start = Date.now();
    try {
      const res = await this.pool.query<T>(text, params);
      const duration = Date.now() - start;
      // Optional: log query duration/metrics
      return res;
    } catch (error) {
      console.error('TimescaleDB Query Error:', { text, error });
      throw error;
    }
  }

  async getClient() {
    return await this.pool.connect();
  }

  async close() {
    await this.pool.end();
  }

  /**
   * TimescaleDB specific helper to create a hypertable
   * @param tableName Name of the table
   * @param timeColumn Name of the column used for partitioning by time
   * @param chunkTimeInterval The time interval for each chunk (e.g., '1 day', '7 days')
   */
  async createHypertable(tableName: string, timeColumn: string = 'time', chunkTimeInterval?: string) {
    try {
      const options = chunkTimeInterval ? `, chunk_time_interval => INTERVAL '${chunkTimeInterval}'` : '';
      await this.query(`SELECT create_hypertable('${tableName}', '${timeColumn}', if_not_exists => TRUE${options});`);
    } catch (error) {
      console.error(`Failed to create hypertable for ${tableName}:`, error);
      throw error;
    }
  }

  async dropHypertable(tableName: string, cascade: boolean = false) {
    await this.query(`DROP TABLE IF EXISTS ${tableName} ${cascade ? 'CASCADE' : ''};`);
  }

  /**
   * Helper for continuous aggregates (TimescaleDB specific)
   */
  async createContinuousAggregate(viewName: string, query: string) {
    await this.query(`
      CREATE MATERIALIZED VIEW ${viewName}
      WITH (timescaledb.continuous) AS
      ${query}
      WITH NO DATA;
    `);
  }
}

```

## File: packages/timescaledb/src/index.ts
```
export * from './client';
export * from './schema';

```

## File: packages/ai-providers/README.md
```
# @repo/ai-providers

This is the ai-providers package.

```

## File: packages/ai-providers/package.json
```
{
    "name": "@repo/ai-providers",
    "version": "0.1.0",
    "private": true,
    "main": "./src/index.ts",
    "types": "./src/index.ts",
    "exports": {
        ".": {
            "types": "./src/index.ts",
            "default": "./src/index.ts"
        },
        "./providers": {
            "types": "./src/providers.ts",
            "default": "./src/providers.ts"
        },
        "./chat": {
            "types": "./src/chat.ts",
            "default": "./src/chat.ts"
        }
    },
    "scripts": {
        "lint": "eslint .",
        "check-types": "tsc --noEmit"
    },
    "devDependencies": {
        "@repo/typescript-config": "workspace:*",
        "@types/node": "^20.10.0",
        "eslint": "^9.15.0",
        "typescript": "5.9.2"
    }
}
```

## File: packages/ai-providers/tsconfig.json
```
{
    "extends": "@repo/typescript-config/base.json",
    "compilerOptions": {
        "lib": [
            "ES2022"
        ],
        "module": "NodeNext",
        "target": "ES2022"
    },
    "exclude": [
        "node_modules",
        "dist"
    ]
}
```

## File: packages/ai-providers/src/chat.ts
```
// ═══════════════════════════════════════════════════════
// @repo/ai-providers — Unified Chat Interface
//
// Single `callLLM()` function that routes to:
//   - Ollama (native /api/chat)
//   - Cloud / Local (OpenAI-compatible)
// ═══════════════════════════════════════════════════════
//import {} from "axios"
export interface ChatMessage {
    role: "system" | "user" | "assistant";
    content: string;
}

export interface ChatOptions {
    providerId: string;
    model: string;
    config: Record<string, string>;
    messages: ChatMessage[];
    temperature?: number;
    maxTokens?: number;
}

export interface ChatResult {
    content: string;
    model: string;
    provider: string;
    tokensUsed?: number;
}

/** Map provider IDs to their OpenAI-compatible API base URLs */
const CLOUD_BASE_URLS: Record<string, string> = {
    openai: "https://api.openai.com/v1",
    openrouter: "https://openrouter.ai/api/v1",
    together: "https://api.together.xyz/v1",
    groq: "https://api.groq.com/openai/v1",
    perplexity: "https://api.perplexity.ai",
};

/**
 * Unified LLM chat function.
 * Routes to the correct API based on provider ID.
 */
export async function callLLM(options: ChatOptions): Promise<ChatResult> {
    const { providerId, model, config, messages, temperature = 0.7, maxTokens } = options;

    if (providerId === "ollama") {
        return callOllama(config.baseUrl || "http://localhost:11434", model, messages, temperature);
    }

    // vLLM, llama.cpp, and cloud providers all use OpenAI-compatible API
    const baseUrl = CLOUD_BASE_URLS[providerId] || config.baseUrl || "http://localhost:8000";
    const apiKey = config.apiKey || "";

    return callOpenAICompat(baseUrl, apiKey, model, messages, temperature, maxTokens, providerId);
}

/** Ollama native API (/api/chat) */
async function callOllama(
    baseUrl: string,
    model: string,
    messages: ChatMessage[],
    temperature: number,
): Promise<ChatResult> {
    const res = await fetch(`${baseUrl}/api/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            model,
            messages,
            stream: false,
            options: { temperature },
        }),
    });

    if (!res.ok) {
        const text = await res.text();
        throw new Error(`Ollama error (${res.status}): ${text}`);
    }

    const data = (await res.json()) as any;
    return {
        content: data.message?.content || "",
        model,
        provider: "ollama",
        tokensUsed: data.eval_count,
    };
}

/** OpenAI-compatible API (/v1/chat/completions) */
async function callOpenAICompat(
    baseUrl: string,
    apiKey: string,
    model: string,
    messages: ChatMessage[],
    temperature: number,
    maxTokens: number | undefined,
    providerId: string,
): Promise<ChatResult> {
    const headers: Record<string, string> = {
        "Content-Type": "application/json",
    };
    if (apiKey) {
        headers.Authorization = `Bearer ${apiKey}`;
    }

    const body: Record<string, unknown> = {
        model,
        messages,
        temperature,
    };
    if (maxTokens) body.max_tokens = maxTokens;

    const res = await fetch(`${baseUrl}/chat/completions`, {
        method: "POST",
        headers,
        body: JSON.stringify(body),
    });

    if (!res.ok) {
        const text = await res.text();
        throw new Error(`${providerId} error (${res.status}): ${text}`);
    }

    const data = (await res.json()) as any;
    return {
        content: data.choices?.[0]?.message?.content || "",
        model,
        provider: providerId,
        tokensUsed: data.usage?.total_tokens,
    };
}

```

## File: packages/ai-providers/src/providers.ts
```
// ═══════════════════════════════════════════════════════
// @repo/ai-providers — LLM Provider Registry
//
// 8 providers: self-hosted (Ollama), bare-metal (vLLM,
// llama.cpp), cloud (OpenRouter, Together, Groq,
// Perplexity, OpenAI).
// ═══════════════════════════════════════════════════════

export interface LLMProvider {
    id: string;
    name: string;
    type: "self-hosted" | "bare-metal" | "cloud";
    icon: string;
    description: string;
    models: LLMModel[];
    configFields: ConfigField[];
}

export interface LLMModel {
    id: string;
    name: string;
    contextWindow: number;
    recommended?: boolean;
}

export interface ConfigField {
    key: string;
    label: string;
    type: "text" | "url" | "password" | "select";
    placeholder: string;
    required: boolean;
}

export const LLM_PROVIDERS: LLMProvider[] = [
    {
        id: "ollama",
        name: "Ollama",
        type: "self-hosted",
        icon: "🦙",
        description: "Self-hosted, fully private. Runs on your machine.",
        models: [
            { id: "llama3.2:3b", name: "Llama 3.2 (3B)", contextWindow: 128_000, recommended: true },
            { id: "llama3.2:8b", name: "Llama 3.2 (8B)", contextWindow: 128_000 },
            { id: "mistral:7b", name: "Mistral (7B)", contextWindow: 32_000 },
            { id: "qwen2.5:7b", name: "Qwen 2.5 (7B)", contextWindow: 128_000 },
            { id: "phi-3:3.8b", name: "Phi-3 (3.8B)", contextWindow: 128_000 },
        ],
        configFields: [
            { key: "baseUrl", label: "Ollama URL", type: "url", placeholder: "http://localhost:11434", required: true },
        ],
    },
    {
        id: "vllm",
        name: "vLLM",
        type: "bare-metal",
        icon: "⚡",
        description: "High-throughput inference server. GPU required.",
        models: [
            { id: "meta-llama/Llama-3.2-8B-Instruct", name: "Llama 3.2 8B", contextWindow: 128_000, recommended: true },
            { id: "mistralai/Mistral-7B-Instruct-v0.3", name: "Mistral 7B", contextWindow: 32_000 },
        ],
        configFields: [
            { key: "baseUrl", label: "vLLM URL", type: "url", placeholder: "http://localhost:8000", required: true },
            { key: "apiKey", label: "API Key", type: "password", placeholder: "Optional", required: false },
        ],
    },
    {
        id: "llamacpp",
        name: "llama.cpp",
        type: "bare-metal",
        icon: "🔧",
        description: "CPU-optimized inference. No GPU needed.",
        models: [
            { id: "llama-3.2-3b", name: "Llama 3.2 (3B GGUF)", contextWindow: 128_000, recommended: true },
        ],
        configFields: [
            { key: "baseUrl", label: "Server URL", type: "url", placeholder: "http://localhost:8080", required: true },
        ],
    },
    {
        id: "openrouter",
        name: "OpenRouter",
        type: "cloud",
        icon: "🌐",
        description: "Access 100+ models via single API.",
        models: [
            { id: "anthropic/claude-opus-4", name: "Claude Opus 4", contextWindow: 1_000_000, recommended: true },
            { id: "meta-llama/llama-3.2-70b", name: "Llama 3.2 70B", contextWindow: 128_000 },
            { id: "google/gemini-2.0-flash", name: "Gemini 2.0 Flash", contextWindow: 1_000_000 },
        ],
        configFields: [
            { key: "apiKey", label: "OpenRouter API Key", type: "password", placeholder: "sk-or-...", required: true },
        ],
    },
    {
        id: "together",
        name: "Together AI",
        type: "cloud",
        icon: "🤝",
        description: "Fast inference for open-source models.",
        models: [
            { id: "meta-llama/Llama-3.2-70B-Instruct", name: "Llama 3.2 70B", contextWindow: 128_000, recommended: true },
            { id: "mistralai/Mixtral-8x22B", name: "Mixtral 8x22B", contextWindow: 65_000 },
        ],
        configFields: [
            { key: "apiKey", label: "Together API Key", type: "password", placeholder: "tok-...", required: true },
        ],
    },
    {
        id: "groq",
        name: "Groq",
        type: "cloud",
        icon: "⚡",
        description: "Ultra-fast inference on LPU hardware.",
        models: [
            { id: "llama-3.2-70b-versatile", name: "Llama 3.2 70B", contextWindow: 128_000, recommended: true },
            { id: "mixtral-8x7b-32768", name: "Mixtral 8x7B", contextWindow: 32_768 },
        ],
        configFields: [
            { key: "apiKey", label: "Groq API Key", type: "password", placeholder: "gsk_...", required: true },
        ],
    },
    {
        id: "perplexity",
        name: "Perplexity AI",
        type: "cloud",
        icon: "🔍",
        description: "AI search engine with real-time web access.",
        models: [
            { id: "sonar", name: "Sonar", contextWindow: 128_000 },
            { id: "sonar-pro", name: "Sonar Pro", contextWindow: 128_000, recommended: true },
        ],
        configFields: [
            { key: "apiKey", label: "Perplexity API Key", type: "password", placeholder: "pplx-...", required: true },
        ],
    },
    {
        id: "openai",
        name: "OpenAI",
        type: "cloud",
        icon: "🤖",
        description: "Industry standard models (GPT-4o, GPT-4o-mini).",
        models: [
            { id: "gpt-4o", name: "GPT-4o", contextWindow: 128_000, recommended: true },
            { id: "gpt-4o-mini", name: "GPT-4o-mini", contextWindow: 128_000 },
            { id: "gpt-4-turbo", name: "GPT-4 Turbo", contextWindow: 128_000 },
            { id: "o1-preview", name: "o1-preview", contextWindow: 128_000 },
            { id: "o1-mini", name: "o1-mini", contextWindow: 128_000 },
        ],
        configFields: [
            { key: "apiKey", label: "OpenAI API Key", type: "password", placeholder: "sk-...", required: true },
        ],
    },
];

export function getProviderById(id: string): LLMProvider | undefined {
    return LLM_PROVIDERS.find((p) => p.id === id);
}

export function getProvidersByType(type: LLMProvider["type"]): LLMProvider[] {
    return LLM_PROVIDERS.filter((p) => p.type === type);
}

```

## File: packages/ai-providers/src/index.ts
```
// @repo/ai-providers — Package exports

export {
    type LLMProvider,
    type LLMModel,
    type ConfigField,
    LLM_PROVIDERS,
    getProviderById,
    getProvidersByType,
} from "./providers";

export {
    type ChatMessage,
    type ChatOptions,
    type ChatResult,
    callLLM,
} from "./chat";

```

