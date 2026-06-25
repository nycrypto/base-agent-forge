# Architecture

Base Agent Forge is designed as a single repository with one shared agent core and multiple execution modes.

The goal is to keep the project simple, safe, and easy to extend.

---

## Core idea

The project does not split local agents and hosted agents into two different codebases.

Instead, both modes use the same shared agent engine.

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

---

## Local Mode

Local Mode is for users who want to run an agent on their own computer.

It is useful for:

- learning how the agent works
- testing prompts safely
- avoiding public deployment at the beginning
- keeping private environment variables local

Local Mode uses:

```txt
scripts/local-agent.ts
        |
        v
src/adapters/local-runner.ts
        |
        v
src/core/agent-engine.ts
```

Local Mode does not require a public server.

---

## Hosted Mode

Hosted Mode is for users who want to deploy the same agent logic as a web app or API.

It is useful for:

- public demos
- serverless deployment
- Vercel deployment
- API-based agent access

Hosted Mode uses:

```txt
app/api/agent/route.ts
        |
        v
src/adapters/hosted-runner.ts
        |
        v
src/core/agent-engine.ts
```

Hosted Mode should never expose private keys or raw secrets.

---

## Optional x402 Demo Mode

The x402 demo route shows how a payment-ready agent flow can be structured.

The first version is demo-only.

It does not:

- move real funds
- require a real private key
- require a real wallet
- enable live payments by default

x402 Demo Mode uses:

```txt
app/api/x402/route.ts
        |
        v
src/security/pii-filter.ts
```

The payment metadata is checked for possible private information before a demo response is returned.

---

## Security layer

The security layer protects the starter kit from unsafe inputs and bad defaults.

Current security files:

```txt
src/security/pii-filter.ts
src/security/safety-policy.ts
src/security/env-check.ts
```

These files help with:

- detecting private data in prompts
- blocking risky prompt inputs
- warning about live payment mode
- keeping real secrets out of GitHub

---

## Agent definitions

Agent definitions are stored separately from the runner logic.

This keeps the project clean.

```txt
src/agents/agent-definitions.ts
```

Each agent has:

- id
- name
- tagline
- description
- default response
- safety notes
- next steps

---

## Agent engine

The shared agent engine is the main logic layer.

```txt
src/core/agent-engine.ts
```

It handles:

- selecting the agent
- checking the prompt
- applying the safety policy
- returning a safe agent response

Both Local Mode and Hosted Mode use this file.

---

## Why this structure is safe

This architecture keeps sensitive logic away from public files.

The repository uses mock data and safe defaults.

Real secrets should only exist inside local environment files such as:

```txt
.env.local
```

This file must never be committed to GitHub.

---

## Extension plan

Future versions can add:

- real AgentKit integration
- real x402 payment verification
- wallet connection
- MCP support
- more agent templates
- deployment guides

These features should be added gradually and safely.