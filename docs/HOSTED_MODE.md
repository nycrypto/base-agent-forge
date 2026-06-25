# Hosted Mode Guide

Hosted Mode lets users deploy Base Agent Forge as a web app or API while keeping the same shared agent engine.

The goal is to use the same logic from Local Mode without creating a second messy codebase.

---

## What Hosted Mode does

Hosted Mode exposes the agent through API routes.

It uses:

```txt
app/api/agent/route.ts
        |
        v
src/adapters/hosted-runner.ts
        |
        v
src/core/agent-engine.ts
```

This means the hosted API and the local script both use the same core agent logic.

---

## Why Hosted Mode is useful

Hosted Mode is useful for:

- public demos
- web apps
- serverless deployment
- Vercel deployment
- API-based agent access
- future x402 payment endpoints

Hosted Mode should be enabled only after the local version works correctly.

---

## Main endpoint

The main Hosted Mode endpoint is:

```txt
POST /api/agent
```

This endpoint accepts:

```json
{
  "agentId": "privacy",
  "prompt": "Check this prompt for private data.",
  "paymentMode": "disabled"
}
```

Supported agent IDs:

```txt
wallet
research
x402
privacy
```

Supported payment modes:

```txt
disabled
demo
live
```

The default payment mode is:

```txt
disabled
```

---

## Test the API locally

Start the development server:

```bash
npm run dev
```

Then open this URL in the browser:

```txt
http://localhost:3000/api/agent
```

This should return basic API information.

To test a POST request, use a tool like curl, Postman, Thunder Client, or another API client.

Example curl request:

```bash
curl -X POST http://localhost:3000/api/agent \
  -H "Content-Type: application/json" \
  -d "{\"agentId\":\"privacy\",\"prompt\":\"Check this demo prompt.\",\"paymentMode\":\"disabled\"}"
```

---

## Hosted safety rules

Hosted Mode must never expose:

- private keys
- seed phrases
- real wallet files
- raw API secrets
- payment secrets
- personal user data
- private `.env.local` files

Only safe public values should be visible in the frontend.

---

## Environment variables

Hosted deployments should use environment variables from the hosting platform.

Do not hardcode secrets into source code.

Safe example file:

```txt
.env.example
```

Private local file:

```txt
.env.local
```

Deployment platforms usually have their own environment variable settings page.

Put real secrets there only when needed.

---

## Vercel deployment idea

A simple hosted deployment can use Vercel.

General flow:

```txt
GitHub repo
        |
        v
Vercel project
        |
        v
Next.js app
        |
        v
API routes
```

Recommended deployment steps:

1. Connect the GitHub repository to Vercel.
2. Keep the framework as Next.js.
3. Add environment variables only if needed.
4. Deploy the project.
5. Test `/api/status`.
6. Test `/api/agent`.
7. Keep payment mode disabled until the demo is reviewed.

---

## Useful hosted routes

Current hosted routes:

```txt
/api/status
/api/agent
/api/x402
```

### `/api/status`

Shows project status, safe defaults, mock wallet data, builder ideas, and x402 learning notes.

### `/api/agent`

Runs the shared agent engine through Hosted Mode.

### `/api/x402`

Shows a safe demo-only x402 payment-style flow.

---

## Payment mode warning

The starter version should use:

```txt
PAYMENT_MODE=disabled
```

or:

```txt
PAYMENT_MODE=demo
```

Do not use live payment mode until:

- the app is tested locally
- the hosted API is tested
- payment metadata is reviewed
- private data filtering is reviewed
- wallet and payment secrets are managed safely

---

## Recommended hosted workflow

Use this order:

1. Build and test Local Mode.
2. Test the web interface.
3. Test `/api/status`.
4. Test `/api/agent`.
5. Test `/api/x402` in demo mode.
6. Deploy to Vercel only after local tests pass.
7. Keep real payments disabled by default.

Hosted Mode is optional. Users can still run the project locally without deploying anything.