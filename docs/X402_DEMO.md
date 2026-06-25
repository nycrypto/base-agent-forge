# x402 Demo Guide

Base Agent Forge includes a safe demo structure for x402-style payment flows.

The first version is demo-only.

It does not move real funds, does not require a real wallet, and does not require a private key.

---

## What x402 Demo Mode does

x402 Demo Mode shows how an AI agent may request access to a paid API, tool, or service.

The demo flow is built around this route:

```txt
app/api/x402/route.ts
```

The route checks payment metadata and returns a safe demo response.

---

## What it does not do

The starter version does not:

- create a real payment
- move real USDC
- ask for a private key
- ask for a seed phrase
- connect to a real wallet
- enable live payments by default

This keeps the project safe for learning and testing.

---

## Demo endpoint

The demo endpoint is:

```txt
POST /api/x402
```

Example request:

```json
{
  "resource": "premium-agent-tool",
  "reason": "Demo access request for a paid agent tool.",
  "amount": "0.001 USDC"
}
```

Example response includes:

```txt
paymentRequired=true
realPaymentEnabled=false
network=base-sepolia
```

---

## Test locally

Start the local development server:

```bash
npm run dev
```

Open this route in the browser:

```txt
http://localhost:3000/api/x402
```

This should return basic information about the x402 demo endpoint.

---

## Test with curl

Example POST request:

```bash
curl -X POST http://localhost:3000/api/x402 \
  -H "Content-Type: application/json" \
  -d "{\"resource\":\"premium-agent-tool\",\"reason\":\"Demo access request for a paid agent tool.\",\"amount\":\"0.001 USDC\"}"
```

---

## Privacy protection

Payment metadata can accidentally contain private information.

For example:

- email addresses
- phone numbers
- private keys
- secret tokens
- personal names
- private wallet notes

The demo route checks the resource and reason fields with:

```txt
src/security/pii-filter.ts
```

If risky information is detected, the request is blocked.

---

## Safe metadata examples

Good demo metadata:

```txt
resource=premium-agent-tool
reason=Demo access request for a paid agent tool.
amount=0.001 USDC
```

Bad metadata examples:

```txt
reason=Send payment for my private email test@example.com
reason=Use my private key 0x...
reason=Call me at +90...
```

Avoid putting personal information in payment metadata.

---

## Payment modes

Base Agent Forge uses three payment modes:

```txt
disabled
demo
live
```

Recommended default:

```txt
PAYMENT_MODE=disabled
```

Safe demo setting:

```txt
PAYMENT_MODE=demo
```

Do not use live mode until the full payment flow is reviewed and tested.

---

## Future live x402 integration

A future live integration may add:

- real x402 payment verification
- Base Sepolia payment testing
- paid API routes
- agent tool pricing
- facilitator configuration
- replay protection
- payment receipt handling

These should be added only after the demo version is stable.

---

## Recommended x402 workflow

Use this order:

1. Keep payments disabled.
2. Test the demo route locally.
3. Review the payment metadata.
4. Confirm the privacy filter blocks risky data.
5. Test hosted mode.
6. Add real x402 verification later.
7. Keep secrets out of GitHub.

x402 support should be added gradually and safely.