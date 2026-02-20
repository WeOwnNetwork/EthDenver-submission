# Anvil Orchestrator Service

Next.js microservice for local ADI fork orchestration.

## Endpoints

- `GET /health` - service and RPC health
- `POST /health` - ensure local Anvil is running
- `POST /anvil/ensure` - ensure local Anvil is running
- `POST /anvil/stop` - stop managed Anvil process
- `POST /adi/deploy` - force deploy ADI contracts on local Anvil
- `POST /adi/ensure` - ensure Anvil + ensure ADI contracts
- `GET /adi/contracts` - read latest broadcast contract addresses
- `POST /adi/bootstrap` - ensure Anvil + deploy-if-needed + return RPC/contracts

## Local run

```bash
pnpm --filter anvil dev
```

Service default: `http://localhost:3004`
Anvil default: `http://127.0.0.1:8545`

## Docker

```bash
cd apps/anvil
docker compose up --build
```

## Gateway integration

In gateway `.env`:

- `ANVIL_SERVICE_URL=http://localhost:3004`
- `ANVIL_SERVICE_BOOTSTRAP=1`

Gateway will call `POST /adi/bootstrap`, then hydrate `ADI_RPC_URL` + `CONTRACT_*` in-process and refresh ADI clients/indexer.
