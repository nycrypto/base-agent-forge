# Create Your Own Agent

Base Agent Forge is designed to help users create their own AI agents for the Base ecosystem.

The starter version includes safe demo agents, but the structure is built so new agents can be added later.

---

## Current agent system

Agent definitions are stored in:

```txt
src/agents/agent-definitions.ts
```

Agent types are defined in:

```txt
src/core/agent-types.ts
```

The shared agent engine is stored in:

```txt
src/core/agent-engine.ts
```

Both Local Mode and Hosted Mode use the same agent engine.

---

## Current supported agents

Current agent IDs:

```txt
wallet
research
x402
privacy
```

Current agents:

- Base Wallet Agent
- Base Research Agent
- x402 Agent
- Privacy Guard Agent

---

## How to add a new agent

To add a new agent, start with three steps:

1. Add a new agent ID.
2. Add the agent definition.
3. Add it to the UI if needed.

---

## Step 1: Add a new agent ID

Open:

```txt
src/core/agent-types.ts
```

Find:

```ts
export type AgentId = "wallet" | "research" | "x402" | "privacy";
```

Add your new agent ID.

Example:

```ts
export type AgentId = "wallet" | "research" | "x402" | "privacy" | "nft";
```

---

## Step 2: Add the agent definition

Open:

```txt
src/agents/agent-definitions.ts
```

Add a new object to the `agentDefinitions` array.

Example:

```ts
{
  id: "nft",
  name: "Base NFT Agent",
  tagline: "NFT learning and safety assistant",
  description:
    "Helps users understand NFT basics, safe minting habits, and collection research on Base.",
  defaultResponse:
    "I can help you understand NFT basics, safe minting habits, and collection research. I will not ask for private keys or seed phrases.",
  safetyNotes: [
    "Never mint from unknown links without checking them.",
    "Never share your seed phrase.",
    "Use a separate test wallet for experiments."
  ],
  nextSteps: [
    "Create an NFT safety checklist.",
    "Research collection basics.",
    "Use testnets before real minting."
  ]
}
```

---

## Step 3: Add the agent to the builder UI

Open:

```txt
app/builder/page.tsx
```

Find:

```txt
agentOptions
```

Add a new option.

Example:

```ts
{
  id: "nft",
  name: "Base NFT Agent",
  tagline: "NFT learning and safety assistant",
  starterPrompt: "Create a safe NFT minting checklist for Base."
}
```

---

## Step 4: Add the agent to the API allowlist

Open:

```txt
app/api/agent/route.ts
```

Find:

```ts
const allowedAgentIds: AgentId[] = ["wallet", "research", "x402", "privacy"];
```

Add the new ID:

```ts
const allowedAgentIds: AgentId[] = ["wallet", "research", "x402", "privacy", "nft"];
```

---

## Step 5: Add local script support

Open:

```txt
scripts/local-agent.ts
```

Find:

```ts
const allowedAgents: AgentId[] = ["wallet", "research", "x402", "privacy"];
```

Add the new ID:

```ts
const allowedAgents: AgentId[] = ["wallet", "research", "x402", "privacy", "nft"];
```

---

## Recommended agent template

Use this structure for new agents:

```ts
{
  id: "your-agent-id",
  name: "Your Agent Name",
  tagline: "Short description",
  description:
    "Longer explanation of what this agent does.",
  defaultResponse:
    "Safe default response for this agent.",
  safetyNotes: [
    "Safety note one.",
    "Safety note two.",
    "Safety note three."
  ],
  nextSteps: [
    "Next step one.",
    "Next step two.",
    "Next step three."
  ]
}
```

---

## Good agent ideas

Possible future agents:

- Base NFT Agent
- Base DeFi Safety Agent
- Base Learning Agent
- Base Onchain Reputation Agent
- Base Builder Coach
- x402 Merchant Agent
- AgentKit Wallet Agent
- MCP Tool Agent

Start simple and keep the first version safe.

---

## Safety rules for new agents

Every new agent should follow these rules:

- Do not ask for seed phrases.
- Do not ask for private keys.
- Do not ask for real payment secrets.
- Do not expose personal user data.
- Use mock data first.
- Use Base Sepolia before mainnet.
- Keep real payments disabled by default.
- Add clear safety notes.
- Add simple next steps.

---

## Custom agent philosophy

A good Base Agent Forge agent should be:

```txt
useful
safe
simple
local-first
privacy-aware
easy to understand
```

The goal is not to create a risky autonomous agent.

The goal is to create a safe starter structure that users can understand, run locally, and extend carefully.

---

## Testing a new agent

After adding a new agent, run:

```bash
npm run typecheck
```

Then run:

```bash
npm run build
```

Test local mode:

```bash
npm run agent:local your-agent-id "Test prompt"
```

Test hosted mode:

```bash
curl -X POST http://localhost:3000/api/agent \
  -H "Content-Type: application/json" \
  -d "{\"agentId\":\"your-agent-id\",\"prompt\":\"Test prompt\",\"paymentMode\":\"disabled\"}"
```

---

## Final reminder

Keep new agents safe-by-default.

Do not add live wallet actions, real payments, or external secret usage until the basic agent works locally and the safety layer is reviewed.