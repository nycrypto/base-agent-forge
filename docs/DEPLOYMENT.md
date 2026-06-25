# Deployment Guide

Base Agent Forge can run locally first and then be deployed as a hosted web app.

The recommended hosted setup is a serverless Next.js deployment.

---

## Deployment goal

The goal of deployment is to make the web interface and API routes available online.

Current hosted routes:

```txt
GET  /api/status
GET  /api/agent
POST /api/agent
GET  /api/x402
POST /api/x402
```

The same shared agent engine is used in both Local Mode and Hosted Mode.

---

## Recommended order

Do not deploy before testing locally.

Recommended order:

1. Install dependencies locally.
2. Run the development server.
3. Test the homepage.
4. Test the builder page.
5. Test `/api/status`.
6. Test `/api/agent`.
7. Test `/api/x402`.
8. Deploy only after local testing works.

---

## Local pre-deployment check

Install dependencies:

```bash
npm install
```

Run type checking:

```bash
npm run typecheck
```

Run a production build:

```bash
npm run build
```

Run the development server:

```bash
npm run dev
```

Open:

```txt
http://localhost:3000
```

Open the builder:

```txt
http://localhost:3000/builder
```

Check status:

```txt
http://localhost:3000/api/status
```

---

## Vercel deployment flow

General flow:

```txt
GitHub repository
        |
        v
Vercel project
        |
        v
Next.js build
        |
        v
Hosted web app and API routes
```

Recommended steps:

1. Create or open a Vercel account.
2. Import the GitHub repository.
3. Select the `base-agent-forge` repository.
4. Keep the framework preset as Next.js.
5. Keep the build command as `npm run build`.
6. Keep the install command as `npm install`.
7. Add environment variables only if needed.
8. Deploy.
9. Test the hosted URL.
10. Keep real payments disabled.

---

## Environment variables

The repository includes:

```txt
.env.example
```

This file is safe because it only contains placeholder values.

For local development, create:

```txt
.env.local
```

For hosted deployment, use the hosting platform environment variable settings.

Never paste secrets directly into source code.

---

## Safe default environment

Recommended safe defaults:

```env
NEXT_PUBLIC_APP_NAME="Base Agent Forge"
BASE_NETWORK="base-sepolia"
PAYMENT_MODE="disabled"
```

Do not enable live payments by default.

---

## Secrets warning

Never expose these in the browser:

- private keys
- seed phrases
- wallet secrets
- real API keys
- access tokens
- payment secrets
- private user data

Do not use `NEXT_PUBLIC_` for secret values.

Values that start with `NEXT_PUBLIC_` are intended for public frontend access.

---

## Post-deployment checks

After deployment, test these routes:

```txt
/
```

```txt
/builder
```

```txt
/api/status
```

```txt
/api/agent
```

```txt
/api/x402
```

The status route should show:

```txt
status=ok
realPaymentsEnabled=false
recommendedNetwork=base-sepolia
```

---

## Testing Hosted Agent API

Example local request:

```bash
curl -X POST http://localhost:3000/api/agent \
  -H "Content-Type: application/json" \
  -d "{\"agentId\":\"privacy\",\"prompt\":\"Check this demo prompt.\",\"paymentMode\":\"disabled\"}"
```

For a deployed app, replace the local URL with your hosted URL.

Example:

```bash
curl -X POST https://your-project.vercel.app/api/agent \
  -H "Content-Type: application/json" \
  -d "{\"agentId\":\"privacy\",\"prompt\":\"Check this demo prompt.\",\"paymentMode\":\"disabled\"}"
```

---

## Testing x402 demo route

Example local request:

```bash
curl -X POST http://localhost:3000/api/x402 \
  -H "Content-Type: application/json" \
  -d "{\"resource\":\"premium-agent-tool\",\"reason\":\"Demo access request for a paid agent tool.\",\"amount\":\"0.001 USDC\"}"
```

For a deployed app, replace the local URL with your hosted URL.

---

## Payment safety

The starter version should use:

```txt
PAYMENT_MODE=disabled
```

or:

```txt
PAYMENT_MODE=demo
```

Do not use:

```txt
PAYMENT_MODE=live
```

until the full x402 integration is reviewed, tested, and documented.

---

## Deployment checklist

Before sharing the hosted app publicly, check:

- The app builds successfully.
- `/builder` loads correctly.
- `/api/status` returns `status: ok`.
- `/api/agent` accepts valid POST requests.
- `/api/x402` stays demo-only.
- Real payments are disabled.
- No private environment files are committed.
- No private keys or seed phrases are included.
- No personal wallet history is published.

---

## Rollback plan

If something breaks after deployment:

1. Go back to the previous working commit.
2. Disable live payment settings.
3. Remove risky environment variables.
4. Rebuild the deployment.
5. Test locally before redeploying.

Keep deployments simple and safe.