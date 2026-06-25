# Future Integration Plan

Base Agent Forge is currently a safe starter kit.

The first version uses mock data, demo agent logic, hosted API routes, and a demo-only x402 flow.

Future versions can add real Base and Coinbase developer integrations gradually.

---

## Current foundation

The current project already includes:

- shared agent engine
- local runner
- hosted runner
- privacy filter
- safety policy
- mock wallet tool
- x402 demo route
- agent builder UI
- API documentation
- deployment documentation
- security documentation

This creates a safe foundation before adding real integrations.

---

## Integration philosophy

Future integrations should follow these principles:

```txt
Start local
Use testnets first
Keep secrets private
Use mock data before real data
Keep payments disabled by default
Add live features gradually
Document every new risk
```

The project should never rush into live payments or real wallet actions.

---

## Possible future integration areas

Future versions may add:

- Coinbase AgentKit
- real x402 payment verification
- Base Sepolia wallet actions
- MCP server support
- user-created custom agents
- paid agent tools
- wallet connection
- persistent agent configuration
- better UI components
- automated tests

---

## Phase 1: AgentKit research

Before adding AgentKit, review:

- supported networks
- wallet setup
- required environment variables
- available onchain actions
- local usage
- hosted usage
- secret management
- testnet support

No private keys should be committed.

All AgentKit examples should use placeholder values in public files.

---

## Phase 2: Safe AgentKit demo

A safe AgentKit demo should start with:

```txt
Base Sepolia
test wallet
limited actions
clear warnings
no real funds
```

Recommended first actions:

- read network information
- explain wallet safety
- prepare transaction checklist
- show mock transaction plan
- avoid automatic real transactions

The first AgentKit version should not auto-send transactions.

---

## Phase 3: x402 verification research

Before adding real x402 verification, review:

- payment request structure
- facilitator configuration
- supported network
- payment amount
- token support
- metadata behavior
- replay protection
- error handling
- receipt handling

The current project already has:

```txt
app/api/x402/route.ts
src/tools/x402-tools.ts
src/security/pii-filter.ts
```

These files can be extended later.

---

## Phase 4: Real x402 on Base Sepolia

The first real x402 version should use:

```txt
Base Sepolia
small test amount
demo resource
safe metadata
clear user confirmation
```

It should not use mainnet first.

Live payment mode should require an explicit environment variable:

```txt
PAYMENT_MODE=live
```

The default should remain:

```txt
PAYMENT_MODE=disabled
```

---

## Phase 5: MCP support

MCP support may allow external AI tools to use Base Agent Forge tools.

Possible MCP tools:

- wallet safety checklist
- Base learning path generator
- privacy guard checker
- x402 demo plan generator
- Base builder idea generator

MCP support should start locally before hosted deployment.

---

## Phase 6: Custom agent builder

A future custom agent builder may allow users to define:

- agent name
- agent purpose
- allowed tools
- safety rules
- payment mode
- network
- prompt template

Custom agents should be validated before running.

Unsafe prompts or metadata should be blocked.

---

## Required safety checks before live features

Before enabling any live feature, check:

- no private key is committed
- no seed phrase is committed
- no real API key is committed
- `.env.local` is ignored
- payment mode is intentional
- network is intentional
- payment metadata is safe
- user confirmation exists
- error handling exists
- documentation is updated

---

## Recommended future folder structure

Possible future files:

```txt
src/integrations/agentkit/
src/integrations/x402/
src/integrations/mcp/
src/config/
src/tests/
```

Suggested structure:

```txt
src/integrations/
├─ agentkit/
│  ├─ client.ts
│  ├─ actions.ts
│  └─ safety.ts
│
├─ x402/
│  ├─ config.ts
│  ├─ verifier.ts
│  └─ metadata.ts
│
└─ mcp/
   ├─ server.ts
   └─ tools.ts
```

These folders should only be added when the project is ready.

---

## What should stay unchanged

Even after future integrations, these rules should stay:

- local-first development
- mock data by default
- no secrets in GitHub
- testnet before mainnet
- payments disabled by default
- privacy checks before external requests
- simple documentation for beginners

---

## Final goal

The long-term goal is to make Base Agent Forge a safe starter kit for creating AI agents that can:

- run locally
- run as hosted APIs
- protect private data
- use Base safely
- prepare for x402 paid tools
- support future AgentKit features

The project should remain simple, safe, and builder-friendly.