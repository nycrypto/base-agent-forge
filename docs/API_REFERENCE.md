# API Reference

Base Agent Forge includes simple API routes for Hosted Mode, project status, and the x402 demo flow.

All routes are safe-by-default and use mock or demo logic in the starter version.

---

## Available routes

```txt
GET  /api/status
GET  /api/agent
POST /api/agent
GET  /api/x402
POST /api/x402
```

---

## GET /api/status

Returns project status, environment safety information, mock wallet data, builder ideas, and x402 learning notes.

### Example URL

```txt
http://localhost:3000/api/status
```

### Example response fields

```json
{
  "name": "Base Agent Forge",
  "status": "ok",
  "version": "0.1.0",
  "modes": {
    "local": true,
    "hosted": true,
    "x402Demo": true,
    "realPaymentsEnabled": false
  }
}
```

---

## GET /api/agent

Returns basic information about the Hosted Mode agent endpoint.

### Example URL

```txt
http://localhost:3000/api/agent
```

### Supported agent IDs

```txt
wallet
research
x402
privacy
```

### Supported payment modes

```txt
disabled
demo
live
```

---

## POST /api/agent

Runs an agent through Hosted Mode.

This route uses:

```txt
app/api/agent/route.ts
        |
        v
src/adapters/hosted-runner.ts
        |
        v
src/core/agent-engine.ts
```

### Example request

```json
{
  "agentId": "privacy",
  "prompt": "Check this prompt for private data.",
  "paymentMode": "disabled"
}
```

### Example curl

```bash
curl -X POST http://localhost:3000/api/agent \
  -H "Content-Type: application/json" \
  -d "{\"agentId\":\"privacy\",\"prompt\":\"Check this prompt for private data.\",\"paymentMode\":\"disabled\"}"
```

### Example response fields

```json
{
  "agentId": "privacy",
  "name": "Privacy Guard Agent",
  "summary": "Privacy Guard Agent completed a safe hosted mode demo run.",
  "response": "Demo agent response...",
  "safetyNotes": [],
  "nextSteps": []
}
```

---

## GET /api/x402

Returns basic information about the x402 demo endpoint.

### Example URL

```txt
http://localhost:3000/api/x402
```

This does not start a real payment.

---

## POST /api/x402

Creates a safe demo-only x402-style payment flow.

This route does not:

- move real funds
- require a real private key
- require a seed phrase
- connect to a real wallet
- enable live payments

### Example request

```json
{
  "resource": "premium-agent-tool",
  "reason": "Demo access request for a paid agent tool.",
  "amount": "0.001 USDC"
}
```

### Example curl

```bash
curl -X POST http://localhost:3000/api/x402 \
  -H "Content-Type: application/json" \
  -d "{\"resource\":\"premium-agent-tool\",\"reason\":\"Demo access request for a paid agent tool.\",\"amount\":\"0.001 USDC\"}"
```

### Example response fields

```json
{
  "status": "demo",
  "message": "x402 demo flow generated safely.",
  "paymentRequired": true,
  "realPaymentEnabled": false,
  "network": "base-sepolia"
}
```

---

## Error behavior

If an invalid request is sent, the API returns an error message.

Example invalid agent request:

```json
{
  "agentId": "unknown",
  "prompt": "hello"
}
```

Example response:

```json
{
  "error": "Invalid agentId. Use wallet, research, x402, or privacy."
}
```

---

## Privacy behavior

The API blocks risky prompts or metadata when possible private information is detected.

The privacy filter checks for possible:

- email addresses
- phone numbers
- private keys
- seed phrase mentions
- API key mentions
- secret token mentions

---

## Safety defaults

Default safety settings:

```txt
paymentMode=disabled
realPaymentsEnabled=false
network=base-sepolia
```

The starter version should be tested with mock data before any real integration is added.