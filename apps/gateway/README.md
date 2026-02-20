This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/create-next-app).

## ADL Testnet Persistent Indexer

This app now includes a persistent ADL testnet indexer for deployed `@repo/adi` contracts.

### Required env for indexing

- `ADI_RPC_URL`
- `CONTRACT_IDENTITY`
- `CONTRACT_REPUTATION`
- `CONTRACT_VALIDATION`
- `CONTRACT_SHARED_KERNEL`
- `CONTRACT_SEASON`
- `CONTRACT_ISC`
- `CONTRACT_BAD_AGENT`
- `CONTRACT_VSA`
- `CONTRACT_DOCUMENT`
- `CONTRACT_CCC_ID`
- `CONTRACT_CCC_TOKEN`

Optional:

- `ADI_INDEX_STORAGE_PATH` (default: `apps/gateway/.data/adl-onchain-index.json`)
- `ADI_INDEX_START_BLOCK` (first block for initial sync)

### API

- `GET /events?count=50` → merged gateway + onchain indexed feed
- `GET /events?count=50&sync=1` → force sync before returning
- `GET /stats` → includes `onchain` + `onchainIndex`
- `GET /onchain?count=100` → raw indexed onchain view
- `GET /onchain?count=100&sync=1` → force sync + return raw index data
- `GET /infra` → anvil microservice + ADI runtime status
- `POST /infra` → force re-bootstrap from anvil microservice
- `GET /persistence` → persistence diagnostics + recent persisted events

## Persistence verification quick checks

1) Trigger writes through gateway APIs (examples):

- `POST /connect`
- `POST /broadcast`
- `POST /ccc-id`
- `POST /volley`

2) Verify API-level persistence snapshots:

- `GET /persistence?count=20`
- `GET /events?count=20`
- `GET /stats` (check `data.persistence`)

3) Verify directly in TimescaleDB (same database from `TIMESCALEDB_URL`):

- `SELECT COUNT(*) FROM volley_events;`
- `SELECT event_type, COUNT(*) FROM volley_events GROUP BY event_type ORDER BY COUNT(*) DESC;`
- `SELECT time, event_id, agent_id, event_type, status FROM volley_events ORDER BY time DESC LIMIT 20;`

4) Restart gateway, then re-run step 2 and step 3. Event rows should remain present.

## Anvil microservice integration

Gateway can consume a dedicated `apps/anvil` microservice that manages:

- persistent local Anvil process
- ADI deploy-if-needed
- contract address hydration for gateway runtime

Set in gateway env:

- `ANVIL_SERVICE_URL` (example: `http://localhost:3004`)
- `ANVIL_SERVICE_BOOTSTRAP=1` (default behavior)

On startup, gateway calls `POST /adi/bootstrap` on that service and refreshes ADI clients + onchain indexer in-process.

Manual trigger endpoints in gateway:

- `POST /infra` → force re-bootstrap from anvil microservice
- `POST /onchain/bootstrap` → force re-bootstrap + onchain index refresh payload

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
