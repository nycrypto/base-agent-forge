# Contributing

Thank you for your interest in Base Agent Forge.

This project is designed to be local-first, privacy-safe, and x402-ready.

Contributions should keep the project simple, secure, and easy to understand.

---

## Project principles

Before contributing, follow these principles:

- Keep the project beginner-friendly.
- Do not add unnecessary complexity.
- Do not commit private keys or secrets.
- Use mock data by default.
- Keep real payments disabled by default.
- Prefer Base Sepolia for testing.
- Document every new feature clearly.

---

## Safe contribution rules

Never include:

- private keys
- seed phrases
- real wallet files
- real API keys
- access tokens
- payment secrets
- private user data
- personal wallet history
- `.env.local`

Use placeholder values instead.

---

## Development workflow

Recommended workflow:

1. Fork the repository.
2. Create a new branch.
3. Make your changes.
4. Test locally.
5. Check that no secrets are included.
6. Open a pull request.

Example branch names:

```txt
feature/add-new-agent
fix/privacy-filter
docs/update-local-mode
```

---

## Local setup

Install dependencies:

```bash
npm install
```

Run the development server:

```bash
npm run dev
```

Run type checking:

```bash
npm run typecheck
```

Run the local agent script:

```bash
npm run agent:local
```

---

## Adding a new agent

New agents should be added in:

```txt
src/agents/agent-definitions.ts
```

Each agent should include:

- id
- name
- tagline
- description
- default response
- safety notes
- next steps

If the new agent needs custom logic, keep that logic separate and reusable.

---

## Adding a new tool

New tools should be added in:

```txt
src/tools/
```

Tools should be safe-by-default.

They should not require real private keys or real payment credentials in the starter version.

---

## Adding payment features

Payment-related features must be added carefully.

Before adding live payment support, review:

- payment metadata
- payment amount
- network
- secret management
- replay protection
- user confirmation flow
- privacy filter behavior

The default payment mode should stay:

```txt
disabled
```

or:

```txt
demo
```

---

## Documentation

If you add a feature, update the relevant documentation.

Useful files:

```txt
README.md
docs/ARCHITECTURE.md
docs/LOCAL_MODE.md
docs/HOSTED_MODE.md
docs/X402_DEMO.md
docs/SECURITY.md
```

---

## Pull request checklist

Before opening a pull request, check:

- No secrets are committed.
- No private wallet data is included.
- The project still works locally.
- Documentation is updated.
- Real payments are not enabled by default.
- Mock data is used where possible.

---

## Code style

Keep code readable and simple.

Prefer clear names over clever shortcuts.

This project should be understandable for new builders.