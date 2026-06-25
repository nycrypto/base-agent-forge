# Security Policy

Base Agent Forge is designed to be local-first, privacy-safe, and safe-by-default.

This project is an educational starter kit. It should never require users to publish private wallet data, private keys, seed phrases, API keys, or personal information.

---

## Core security rules

Never commit these files or values to GitHub:

- `.env`
- `.env.local`
- `.env.production`
- private keys
- seed phrases
- mnemonic phrases
- real wallet files
- real API keys
- access tokens
- payment secrets
- personal emails
- phone numbers
- private transaction history

Use placeholder values in public files.

---

## Environment files

The repository includes:

```txt
.env.example
```

This file is safe to commit because it only contains example values.

When running locally, users should create:

```txt
.env.local
```

This file must stay private and should never be committed.

---

## Wallet safety

Base Agent Forge uses mock wallet data by default.

The starter version does not require:

- a real wallet
- a real private key
- a real payment
- a real transaction
- a real seed phrase

Any future wallet integration should start with a test wallet and Base Sepolia.

---

## x402 safety

The x402 mode is demo-only in the first version.

Real payment mode is disabled by default.

Before enabling real payments, review:

- payment amount
- network
- payment metadata
- resource name
- reason text
- API route behavior
- secret management
- replay and validation logic

Never include private information inside public payment metadata.

---

## Prompt safety

The project includes a simple privacy filter.

It can detect possible:

- email addresses
- phone numbers
- private keys
- seed phrase mentions
- API key mentions
- secret token mentions

If private data is detected, the request should be blocked or cleaned before continuing.

---

## Safe defaults

The default settings are:

```txt
BASE_NETWORK=base-sepolia
PAYMENT_MODE=disabled
realPaymentsEnabled=false
```

These defaults help users test safely before using real integrations.

---

## Reporting security issues

If you find a security issue, do not publish private exploit details publicly.

Open a responsible security report or contact the maintainer privately.

For educational forks, document the issue clearly and avoid exposing real secrets.