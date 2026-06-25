# Quickstart

This guide helps you run Base Agent Forge quickly and safely.

Use this project locally first before deploying it anywhere.

---

## 1. Clone the repository

```bash
git clone https://github.com/nycrypto/base-agent-forge.git
cd base-agent-forge
```

---

## 2. Install dependencies

```bash
npm install
```

---

## 3. Create local environment file

Copy the example environment file:

```bash
cp .env.example .env.local
```

Do not commit `.env.local` to GitHub.

---

## 4. Run the app locally

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

## 5. Run Local Mode

Run the default local agent:

```bash
npm run agent:local
```

Run a specific agent:

```bash
npm run agent:local wallet "Create a wallet safety checklist."
```

Supported agents:

```txt
wallet
research
x402
privacy
```

---

## 6. Test Hosted Mode API

Start the dev server:

```bash
npm run dev
```

Open:

```txt
http://localhost:3000/api/agent
```

Example POST request:

```bash
curl -X POST http://localhost:3000/api/agent \
  -H "Content-Type: application/json" \
  -d "{\"agentId\":\"privacy\",\"prompt\":\"Check this demo prompt.\",\"paymentMode\":\"disabled\"}"
```

---

## 7. Test x402 demo route

Open:

```txt
http://localhost:3000/api/x402
```

Example POST request:

```bash
curl -X POST http://localhost:3000/api/x402 \
  -H "Content-Type: application/json" \
  -d "{\"resource\":\"premium-agent-tool\",\"reason\":\"Demo access request for a paid agent tool.\",\"amount\":\"0.001 USDC\"}"
```

---

## 8. Run checks

TypeScript check:

```bash
npm run typecheck
```

Production build:

```bash
npm run build
```

Both should pass before deployment.

---

## Safe defaults

The starter version uses safe defaults:

```txt
BASE_NETWORK=base-sepolia
PAYMENT_MODE=disabled
realPaymentsEnabled=false
```

The project does not require:

- real private keys
- seed phrases
- real wallet files
- real payments
- personal wallet history

---

## Recommended first workflow

Use this order:

1. Read the README.
2. Run the project locally.
3. Open the builder page.
4. Test the local agent script.
5. Test `/api/status`.
6. Test `/api/agent`.
7. Test `/api/x402`.
8. Deploy only after local tests pass.

Keep the project local-first and safe-by-default.