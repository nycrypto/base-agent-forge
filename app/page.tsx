const agents = [
  {
    name: "Base Wallet Agent",
    description: "Helps users understand wallet safety, Base basics, and transaction checklists."
  },
  {
    name: "Base Research Agent",
    description: "Explores Base ecosystem ideas, learning paths, and builder opportunities."
  },
  {
    name: "x402 Agent",
    description: "Prepares agents for optional paid API and tool access using x402-style flows."
  },
  {
    name: "Privacy Guard Agent",
    description: "Checks prompts and payment metadata for possible private information."
  }
];

export default function HomePage() {
  return (
    <main
      style={{
        minHeight: "100vh",
        padding: "56px 20px",
        maxWidth: "1120px",
        margin: "0 auto"
      }}
    >
      <section
        style={{
          display: "grid",
          gap: "24px",
          marginBottom: "44px"
        }}
      >
        <p
          style={{
            color: "#60a5fa",
            fontWeight: 700,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            margin: 0
          }}
        >
          Local-first · Privacy-safe · x402-ready
        </p>

        <h1
          style={{
            fontSize: "clamp(2.5rem, 7vw, 5.5rem)",
            lineHeight: 1,
            margin: 0,
            maxWidth: "900px"
          }}
        >
          Create your own Base AI agent.
        </h1>

        <p
          style={{
            color: "#cbd5e1",
            fontSize: "1.15rem",
            lineHeight: 1.7,
            maxWidth: "720px",
            margin: 0
          }}
        >
          Base Agent Forge helps builders create local-first AI agents for the
          Base ecosystem. Run agents on your own computer first, then deploy
          them later with optional hosted and x402-ready flows.
        </p>

        <div
          style={{
            display: "flex",
            gap: "12px",
            flexWrap: "wrap"
          }}
        >
          <a
            href="/builder"
            style={{
              background: "#3b82f6",
              color: "white",
              padding: "14px 18px",
              borderRadius: "999px",
              fontWeight: 700
            }}
          >
            Open Agent Builder
          </a>

          <a
            href="https://docs.base.org/"
            target="_blank"
            rel="noreferrer"
            style={{
              border: "1px solid #1e3a5f",
              color: "#e2e8f0",
              padding: "14px 18px",
              borderRadius: "999px",
              fontWeight: 700
            }}
          >
            Base Docs
          </a>
        </div>
      </section>

      <section
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          gap: "16px"
        }}
      >
        {agents.map((agent) => (
          <article
            key={agent.name}
            style={{
              background: "rgba(15, 27, 45, 0.78)",
              border: "1px solid #1e3a5f",
              borderRadius: "24px",
              padding: "22px"
            }}
          >
            <h2
              style={{
                fontSize: "1.1rem",
                marginTop: 0,
                marginBottom: "10px"
              }}
            >
              {agent.name}
            </h2>

            <p
              style={{
                color: "#94a3b8",
                lineHeight: 1.6,
                margin: 0
              }}
            >
              {agent.description}
            </p>
          </article>
        ))}
      </section>
    </main>
  );
}