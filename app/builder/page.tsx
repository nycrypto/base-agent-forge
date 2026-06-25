"use client";

import { useState } from "react";

type AgentId = "wallet" | "research" | "x402" | "privacy";

type AgentOption = {
  id: AgentId;
  name: string;
  tagline: string;
  starterPrompt: string;
};

type AgentApiResult = {
  agentId: AgentId;
  name: string;
  summary: string;
  response: string;
  safetyNotes: string[];
  nextSteps: string[];
};

const agentOptions: AgentOption[] = [
  {
    id: "wallet",
    name: "Base Wallet Agent",
    tagline: "Wallet safety and Base basics",
    starterPrompt: "Create a safe wallet checklist for a new Base user."
  },
  {
    id: "research",
    name: "Base Research Agent",
    tagline: "Base ecosystem research assistant",
    starterPrompt: "Suggest safe Base builder ideas for a beginner."
  },
  {
    id: "x402",
    name: "x402 Agent",
    tagline: "Payment-ready agent flow",
    starterPrompt: "Explain a safe demo x402 payment flow for an AI agent."
  },
  {
    id: "privacy",
    name: "Privacy Guard Agent",
    tagline: "Prompt and metadata safety checker",
    starterPrompt: "Check this demo prompt for private data before running."
  }
];

export default function BuilderPage() {
  const [selectedAgent, setSelectedAgent] = useState<AgentOption>(agentOptions[0]);
  const [prompt, setPrompt] = useState(agentOptions[0].starterPrompt);
  const [result, setResult] = useState<AgentApiResult | null>(null);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  async function runDemoAgent() {
    setIsLoading(true);
    setError("");
    setResult(null);

    try {
      const response = await fetch("/api/agent", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          agentId: selectedAgent.id,
          prompt,
          paymentMode: "disabled"
        })
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error ?? "The agent request failed.");
        return;
      }

      setResult(data as AgentApiResult);
    } catch {
      setError("Could not connect to the hosted agent API.");
    } finally {
      setIsLoading(false);
    }
  }

  function chooseAgent(agent: AgentOption) {
    setSelectedAgent(agent);
    setPrompt(agent.starterPrompt);
    setResult(null);
    setError("");
  }

  return (
    <main
      style={{
        minHeight: "100vh",
        padding: "48px 20px",
        maxWidth: "1120px",
        margin: "0 auto"
      }}
    >
      <a
        href="/"
        style={{
          color: "#93c5fd",
          fontWeight: 700,
          display: "inline-block",
          marginBottom: "28px"
        }}
      >
        ← Back to home
      </a>

      <section style={{ marginBottom: "36px" }}>
        <p
          style={{
            color: "#60a5fa",
            fontWeight: 700,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            margin: 0
          }}
        >
          Agent Builder
        </p>

        <h1
          style={{
            fontSize: "clamp(2rem, 6vw, 4.5rem)",
            lineHeight: 1,
            margin: "14px 0"
          }}
        >
          Choose and run your Base agent.
        </h1>

        <p
          style={{
            color: "#cbd5e1",
            fontSize: "1.05rem",
            lineHeight: 1.7,
            maxWidth: "760px"
          }}
        >
          Select a safe demo agent, edit the prompt, and run it through the
          Hosted Mode API. No real private keys, real wallet actions, or real
          payments are used.
        </p>
      </section>

      <section
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
          gap: "18px"
        }}
      >
        <div style={{ display: "grid", gap: "12px" }}>
          {agentOptions.map((agent) => {
            const isSelected = selectedAgent.id === agent.id;

            return (
              <button
                key={agent.id}
                type="button"
                onClick={() => chooseAgent(agent)}
                style={{
                  textAlign: "left",
                  cursor: "pointer",
                  border: isSelected ? "1px solid #60a5fa" : "1px solid #1e3a5f",
                  background: isSelected
                    ? "rgba(59, 130, 246, 0.18)"
                    : "rgba(15, 27, 45, 0.78)",
                  color: "#f8fafc",
                  borderRadius: "20px",
                  padding: "18px"
                }}
              >
                <strong style={{ display: "block", marginBottom: "6px" }}>
                  {agent.name}
                </strong>

                <span style={{ color: "#94a3b8", lineHeight: 1.5 }}>
                  {agent.tagline}
                </span>
              </button>
            );
          })}
        </div>

        <article
          style={{
            border: "1px solid #1e3a5f",
            background: "rgba(15, 27, 45, 0.78)",
            borderRadius: "28px",
            padding: "26px"
          }}
        >
          <p style={{ color: "#60a5fa", fontWeight: 700, marginTop: 0 }}>
            Selected Agent
          </p>

          <h2
            style={{
              fontSize: "2rem",
              marginTop: 0,
              marginBottom: "12px"
            }}
          >
            {selectedAgent.name}
          </h2>

          <label
            htmlFor="agent-prompt"
            style={{
              display: "block",
              fontWeight: 700,
              marginBottom: "10px"
            }}
          >
            Prompt
          </label>

          <textarea
            id="agent-prompt"
            value={prompt}
            onChange={(event) => setPrompt(event.target.value)}
            rows={6}
            style={{
              width: "100%",
              resize: "vertical",
              border: "1px solid #1e3a5f",
              borderRadius: "18px",
              padding: "14px",
              background: "rgba(2, 6, 23, 0.5)",
              color: "#f8fafc",
              outline: "none",
              lineHeight: 1.6
            }}
          />

          <button
            type="button"
            onClick={runDemoAgent}
            disabled={isLoading}
            style={{
              marginTop: "16px",
              width: "100%",
              border: "none",
              borderRadius: "999px",
              padding: "14px 18px",
              background: isLoading ? "#1e3a5f" : "#3b82f6",
              color: "white",
              fontWeight: 800,
              cursor: isLoading ? "not-allowed" : "pointer"
            }}
          >
            {isLoading ? "Running agent..." : "Run Demo Agent"}
          </button>

          <div
            style={{
              marginTop: "22px",
              border: "1px solid #1e3a5f",
              borderRadius: "18px",
              padding: "16px",
              background: "rgba(2, 6, 23, 0.35)"
            }}
          >
            <strong>Safety status:</strong>
            <p
              style={{
                color: "#94a3b8",
                lineHeight: 1.6,
                marginBottom: 0
              }}
            >
              Demo mode is active. No real payments, no real wallet actions, and
              no private keys are required.
            </p>
          </div>
        </article>
      </section>

      {error && (
        <section
          style={{
            marginTop: "22px",
            border: "1px solid #ef4444",
            background: "rgba(239, 68, 68, 0.12)",
            borderRadius: "20px",
            padding: "18px"
          }}
        >
          <strong>Error</strong>
          <p style={{ color: "#fecaca", lineHeight: 1.6, marginBottom: 0 }}>
            {error}
          </p>
        </section>
      )}

      {result && (
        <section
          style={{
            marginTop: "22px",
            border: "1px solid #1e3a5f",
            background: "rgba(15, 27, 45, 0.78)",
            borderRadius: "28px",
            padding: "26px"
          }}
        >
          <p style={{ color: "#60a5fa", fontWeight: 700, marginTop: 0 }}>
            Agent Result
          </p>

          <h2 style={{ marginTop: 0 }}>{result.name}</h2>

          <p style={{ color: "#cbd5e1", lineHeight: 1.7 }}>
            <strong>Summary:</strong> {result.summary}
          </p>

          <pre
            style={{
              whiteSpace: "pre-wrap",
              overflowX: "auto",
              border: "1px solid #1e3a5f",
              borderRadius: "18px",
              padding: "16px",
              background: "rgba(2, 6, 23, 0.45)",
              color: "#dbeafe",
              lineHeight: 1.6
            }}
          >
            {result.response}
          </pre>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
              gap: "16px",
              marginTop: "18px"
            }}
          >
            <div>
              <h3>Safety notes</h3>
              <ul style={{ color: "#cbd5e1", lineHeight: 1.7 }}>
                {result.safetyNotes.map((note) => (
                  <li key={note}>{note}</li>
                ))}
              </ul>
            </div>

            <div>
              <h3>Next steps</h3>
              <ul style={{ color: "#cbd5e1", lineHeight: 1.7 }}>
                {result.nextSteps.map((step) => (
                  <li key={step}>{step}</li>
                ))}
              </ul>
            </div>
          </div>
        </section>
      )}
    </main>
  );
}