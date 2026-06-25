# Local Mode Guide

Local Mode lets users run Base Agent Forge on their own computer before deploying anything publicly.

This is the safest way to test agents, prompts, mock wallet tools, and demo flows.

---

## What Local Mode does

Local Mode runs the shared agent engine from your own machine.

It uses:

```txt
scripts/local-agent.ts
        |
        v
src/adapters/local-runner.ts
        |
        v
src/core/agent-engine.ts
```

The same agent engine can later be used by Hosted Mode.

---

## Why Local Mode is useful

Local Mode is useful because it allows users to:

- test the agent without public deployment
- keep `.env.local` private
- avoid exposing API keys
- avoid exposing wallet secrets
- test with mock wallet data
- understand the project before using hosted APIs

---

## Requirements

Recommended setup:

```txt
Node.js 20 or newer
npm
Git
```

This project does not require a real wallet for the starter version.

---

## Setup

Clone the repository:

```bash
git clone https://github.com/your-username/base-agent-forge.git
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

Start the local development server:

```bash
npm run dev
```

Open the app in your browser:

```txt
http://localhost:3000
```

This runs only on your own computer during development.

---

## Run the local agent script

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

Supported agent IDs:

```txt
wallet
research
x402
privacy
```

---

## Safety behavior

Local Mode uses safe defaults:

```txt
mode=local
paymentMode=disabled
realPaymentsEnabled=false
```

The starter version does not:

- move real funds
- require a real private key
- require a seed phrase
- require a real wallet
- publish private data

---

## Private data protection

If the prompt contains risky data, the agent engine can block the request.

The privacy filter checks for possible:

- email addresses
- phone numbers
- private keys
- seed phrase mentions
- API key mentions
- secret token mentions

Use placeholder values when testing.

---

## Windows note

If PowerShell blocks npm scripts, try running the commands from Command Prompt instead.

Example:

```cmd
npm run dev
```

or:

```cmd
npm run agent:local
```

---

## Recommended workflow

Use this order:

1. Run the project locally.
2. Test the mock agent engine.
3. Check the privacy filter.
4. Test the local script.
5. Review environment variables.
6. Deploy only after the local version works.

Local-first development keeps the project safer and easier to debug.