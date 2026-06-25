# Testing Guide

This guide explains how to test Base Agent Forge safely.

The project should be tested locally before deployment.

---

## Testing goals

Testing should confirm that:

- the app installs correctly
- TypeScript passes
- the production build works
- the homepage loads
- the builder page loads
- Local Mode works
- Hosted Mode API works
- x402 demo route works
- real payments stay disabled
- no secrets are committed

---

## Install dependencies

Run:

```bash
npm install
```

If installation fails, check:

- Node.js version
- npm version
- package versions
- internet connection
- lockfile status

---

## TypeScript check

Run:

```bash
npm run typecheck
```

This checks TypeScript without creating build files.

The command should finish without errors.

---

## Production build

Run:

```bash
npm run build
```

This checks whether the Next.js app can build successfully.

If this fails, fix the error before deploying.

---

## Local development server

Run:

```bash
npm run dev
```

Then open:

```txt
http://localhost:3000
```

Expected result:

```txt
The homepage loads.
```

Open:

```txt
http://localhost:3000/builder
```

Expected result:

```txt
The Agent Builder page loads.
```

---

## Local Mode script test

Run:

```bash
npm run agent:local
```

Expected result:

```txt
Base Agent Forge - Local Mode
```

Run a specific agent:

```bash
npm run agent:local wallet "Create a wallet safety checklist."
```

Expected result:

```txt
The wallet agent returns a safe demo response.
```

---

## Hosted Mode API test

Start the development server:

```bash
npm run dev
```

Open:

```txt
http://localhost:3000/api/agent
```

Expected result:

```txt
The API returns supported agents and payment modes.
```

Test POST request:

```bash
curl -X POST http://localhost:3000/api/agent \
  -H "Content-Type: application/json" \
  -d "{\"agentId\":\"privacy\",\"prompt\":\"Check this demo prompt.\",\"paymentMode\":\"disabled\"}"
```

Expected result:

```txt
The Privacy Guard Agent returns a safe hosted mode demo response.
```

---

## Status API test

Open:

```txt
http://localhost:3000/api/status
```

Expected result:

```txt
status=ok
realPaymentsEnabled=false
recommendedNetwork=base-sepolia
```

---

## x402 demo test

Open:

```txt
http://localhost:3000/api/x402
```

Expected result:

```txt
The x402 demo endpoint returns basic information.
```

Test POST request:

```bash
curl -X POST http://localhost:3000/api/x402 \
  -H "Content-Type: application/json" \
  -d "{\"resource\":\"premium-agent-tool\",\"reason\":\"Demo access request for a paid agent tool.\",\"amount\":\"0.001 USDC\"}"
```

Expected result:

```txt
paymentRequired=true
realPaymentEnabled=false
network=base-sepolia
```

---

## Privacy filter test

Try this request:

```bash
curl -X POST http://localhost:3000/api/agent \
  -H "Content-Type: application/json" \
  -d "{\"agentId\":\"privacy\",\"prompt\":\"My email is test@example.com\",\"paymentMode\":\"disabled\"}"
```

Expected result:

```txt
The request is blocked by the safety policy.
```

This confirms that the privacy filter is active.

---

## x402 metadata safety test

Try this request:

```bash
curl -X POST http://localhost:3000/api/x402 \
  -H "Content-Type: application/json" \
  -d "{\"resource\":\"premium-agent-tool\",\"reason\":\"Contact me at test@example.com\",\"amount\":\"0.001 USDC\"}"
```

Expected result:

```txt
The request is blocked because possible private information was detected.
```

---

## GitHub Actions CI

The repository includes a CI workflow:

```txt
.github/workflows/ci.yml
```

The workflow runs:

```txt
npm install
npm run typecheck
npm run build
```

If CI fails, check the error message in the GitHub Actions tab.

---

## Pre-deployment checklist

Before deployment, confirm:

- `npm install` works
- `npm run typecheck` passes
- `npm run build` passes
- `/` loads
- `/builder` loads
- `/api/status` returns status ok
- `/api/agent` works
- `/api/x402` works
- real payments are disabled
- no `.env.local` file is committed
- no private key is committed
- no seed phrase is committed

---

## Safe testing rule

Use this default:

```txt
PAYMENT_MODE=disabled
```

or:

```txt
PAYMENT_MODE=demo
```

Do not test live payment mode until real x402 integration is intentionally added and reviewed.