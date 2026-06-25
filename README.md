# Base Agent Forge

**Local-first. Privacy-safe. x402-ready.**

Base Agent Forge is a starter kit for creating your own AI agent for the Base ecosystem.

Users can run their agent locally on their own computer or deploy it later as a hosted app.

The project is designed to keep private keys, API keys, wallet secrets, and personal data out of GitHub.

---

## Main idea

Base Agent Forge helps users create simple AI agents for Base.

The project supports three main modes:

1. **Local Mode**  
   Run the agent on your own computer.

2. **Hosted Mode**  
   Deploy the same agent logic as a web app or API.

3. **Optional x402 Mode**  
   Prepare agents for paid API or tool access using x402-style payment flows.

---

## How it works

The repository uses one shared agent core.

Local Mode and Hosted Mode both use the same agent logic, so the project stays clean and easy to understand.

```txt
Shared Agent Core
        |
        |--- Local Mode
        |       Runs on the user's own computer
        |
        |--- Hosted Mode
        |       Runs through web app or API routes
        |
        |--- Optional x402 Mode
                Adds payment-ready API/tool access
```

---

## Planned agent types

### Base Wallet Agent

Helps users understand wallet safety, Base basics, and transaction checklists.

### Base Research Agent

Helps users explore Base ecosystem ideas and learning paths.

### x402 Agent

Explains how x402-style paid APIs can work with AI agents.

### Privacy Guard Agent

Checks prompts and payment metadata for possible private information.

---

## Security rules

This repository must never include:

- private keys
- seed phrases
- real wallet secrets
- real API keys
- personal email addresses
- phone numbers
- private transaction history
- private `.env` files

Only safe example values should be committed.

---

## Environment variables

Create your own `.env.local` file when running the project locally.

Do not upload `.env.local` to GitHub.

Example:

```env
NEXT_PUBLIC_APP_NAME="Base Agent Forge"

BASE_NETWORK="base-sepolia"
PAYMENT_MODE="disabled"

OPENAI_API_KEY="your_openai_api_key_here"
CDP_API_KEY_ID="your_cdp_api_key_id_here"
CDP_API_KEY_SECRET="your_cdp_api_key_secret_here"
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

Prepare future integration with Base and Coinbase developer tools.

---

## Useful references

- Base documentation
- Coinbase Developer Platform
- Coinbase AgentKit
- x402 documentation

---

## Disclaimer

This project is an educational starter kit.

It does not provide financial advice.

It does not require users to publish private keys, wallet secrets, or personal data.

Use testnets and mock data before working with real funds.