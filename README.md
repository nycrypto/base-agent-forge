# Base Agent Forge

**Local-first. Privacy-safe. x402-ready.**

Base Agent Forge is a starter kit for creating AI agents for the Base ecosystem.

Users can run agents locally on their own computer or deploy the same logic later as a hosted web app or API.

The project is designed to keep private keys, API keys, wallet secrets, and personal data out of GitHub.

---

## Main idea

Base Agent Forge helps builders create safe AI agent templates for Base.

The project supports three main modes:

1. **Local Mode**  
   Run the agent on your own computer.

2. **Hosted Mode**  
   Deploy the same agent logic as a web app or API.

3. **Optional x402 Demo Mode**  
   Show how agents can prepare for paid API or tool access using x402-style payment flows.

---

## Project slogan

```txt
Local-first. Privacy-safe. x402-ready.
```

---

## Current features

- Shared agent engine
- Local runner
- Hosted API runner
- Agent builder web page
- Demo x402 API route
- Privacy data filter
- Safety policy layer
- Environment safety check
- Mock wallet tool
- Base builder idea tools
- x402 demo tools
- API reference documentation
- Local Mode guide
- Hosted Mode guide
- Security documentation

---

## Agent types

### Base Wallet Agent

Helps users understand wallet safety, Base basics, and transaction checklists.

### Base Research Agent

Helps users explore Base ecosystem ideas, learning paths, and builder opportunities.

### x402 Agent

Explains how x402-style paid APIs can work with AI agents.

### Privacy Guard Agent

Checks prompts and payment metadata for possible private information.

---

## How the architecture works

The project uses one shared agent core.

Local Mode and Hosted Mode both use the same agent engine.

```txt
Shared Agent Engine
        |
        |--- Local Runner
        |       Used by scripts/local-agent.ts
        |
        |--- Hosted Runner
        |       Used by app/api/agent/route.ts
        |
        |--- x402 Demo Route
                Used by app/api/x402/route.ts
```

This keeps the repository clean and avoids splitting the project into multiple messy codebases.

---

## Repository structure

```txt
base-agent-forge/
├─ app/
│  ├─ api/
│  │  ├─ agent/
│  │  │  └─ route.ts
│  │  ├─ status/
│  │  │  └─ route.ts
│  │  └─ x402/
│  │     └─ route.ts
│  ├─ builder/
│  │  └─ page.tsx
│  ├─ globals.css
│  ├─ layout.tsx
│  └─ page.tsx
│
├─ docs/
│  ├─ API_REFERENCE.md
│  ├─ ARCHITECTURE.md
│  ├─ HOSTED_MODE.md
│  ├─ LOCAL_MODE.md
│  ├─ SECURITY.md
│  └─ X402_DEMO.md
│
├─ scripts/
│  └─ local-agent.ts
│
├─ src/
│  ├─ adapters/
│  │  ├─ hosted-runner.ts
│  │  └─ local-runner.ts
│  ├─ agents/
│  │  └─ agent-definitions.ts
│  ├─ core/
│  │  ├─ agent-engine.ts
│  │  └─ agent-types.ts
│  ├─ security/
│  │  ├─ env-check.ts
│  │  ├─ pii-filter.ts
│  │  └─ safety-policy.ts
│  └─ tools/
│     ├─ base-tools.ts
│     ├─ mock-wallet.ts
│     └─ x402-tools.ts
│
├─ .env.example
├─ .gitignore
├─ CONTRIBUTING.md
├─ LICENSE
├─ README.md
├─ next.config.ts
├─ package.json
└─ tsconfig.json
```

---

## Getting started

Clone the repository:

```bash
git clone https://github.com/nycrypto/base-agent-forge.git
cd base-agent-forge
```

Install dependencies:

```bash
npm install
```

Create a local environment file:

```bash
cp .env.example .env.local
```

Do not commit `.env.local` to GitHub.

---

## Run the web app locally

Start the development server:

```bash
npm run dev
```

Open:

```txt
http://localhost:3000
```

Open the builder page:

```txt
http://localhost:3000/builder
```

---

## Run Local Mode

Run the default local agent:

```bash
npm run agent:local
```

Run a specific agent:

```bash
npm run agent:local wallet "Create a wallet safety checklist."
```

Other examples:

```bash
npm run agent:local research "Suggest safe Base builder ideas."
npm run agent:local x402 "Explain a demo x402 payment flow."
npm run agent:local privacy "Check this prompt for private data."
```

---

## Hosted API routes

Current routes:

```txt
GET  /api/status
GET  /api/agent
POST /api/agent
GET  /api/x402
POST /api/x402
```

---

## Example API request

```bash
curl -X POST http://localhost:3000/api/agent \
  -H "Content-Type: application/json" \
  -d "{\"agentId\":\"privacy\",\"prompt\":\"Check this prompt for private data.\",\"paymentMode\":\"disabled\"}"
```

---

## x402 demo

The x402 route is demo-only in the starter version.

It does not:

- move real funds
- require a private key
- require a seed phrase
- connect to a real wallet
- enable live payments by default

Example route:

```txt
/api/x402
```

---

## Security rules

This repository must never include:

- private keys
- seed phrases
- real wallet secrets
- real API keys
- access tokens
- payment secrets
- personal emails
- phone numbers
- private transaction history
- private `.env` files

Use placeholder values and mock data in public files.

---

## Safe defaults

Default safety settings:

```txt
BASE_NETWORK=base-sepolia
PAYMENT_MODE=disabled
realPaymentsEnabled=false
```

The starter version uses mock data and safe demo logic.

---

## Documentation

Read more:

```txt
docs/ARCHITECTURE.md
docs/LOCAL_MODE.md
docs/HOSTED_MODE.md
docs/X402_DEMO.md
docs/API_REFERENCE.md
docs/SECURITY.md
CONTRIBUTING.md
```

---

## Roadmap

### Phase 1

Set up the repository structure, README, and security files.

### Phase 2

Build a mock agent engine without real API keys.

### Phase 3

Add Local Mode.

### Phase 4

Add a clean web interface.

### Phase 5

Add Hosted Mode using API routes.

### Phase 6

Add optional x402 demo flow.

### Phase 7

Prepare future integration with Base, Coinbase developer tools, AgentKit, and real x402 verification.

---

## Disclaimer

This project is an educational starter kit.

It does not provide financial advice.

It does not require users to publish private keys, wallet secrets, or personal data.

Use testnets and mock data before working with real funds.