FROM node:22-bookworm-slim AS base

RUN apt-get update \
  && apt-get install -y --no-install-recommends curl ca-certificates git build-essential \
  && rm -rf /var/lib/apt/lists/*

RUN curl -L https://foundry.paradigm.xyz | bash
RUN /root/.foundry/bin/foundryup

ENV PATH="/root/.foundry/bin:${PATH}"
ENV NEXT_TELEMETRY_DISABLED=1

RUN corepack enable

FROM base AS deps
WORKDIR /app

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml turbo.json ./
COPY apps/anvil/package.json ./apps/anvil/package.json
COPY packages/eslint-config/package.json ./packages/eslint-config/package.json
COPY packages/typescript-config/package.json ./packages/typescript-config/package.json

RUN pnpm install --frozen-lockfile

FROM base AS builder
WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules
COPY . .

RUN pnpm --filter anvil build

FROM base AS runner
WORKDIR /app

# Runtime dependencies for Next.js app
COPY --from=builder /app/node_modules ./node_modules

# Next.js anvil microservice app (built + source for route handlers)
COPY --from=builder /app/apps/anvil ./apps/anvil

# ADI source + scripts + latest broadcast data for in-container deploy/contract hydration
COPY --from=builder /app/packages/adi ./packages/adi

WORKDIR /app/apps/anvil

RUN mkdir -p .data

EXPOSE 3004 8545

CMD ["node", "../../node_modules/next/dist/bin/next", "start", "--port", "3004"]
