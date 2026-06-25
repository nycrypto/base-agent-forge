"use client";

import { useState } from "react";

const agentOptions = [
  {
    id: "wallet",
    name: "Base Wallet Agent",
    tagline: "Wallet safety and Base basics",
    output:
      "I can help you understand wallet safety, Base network basics, testnet usage, and transaction checklists. I will never ask for your seed phrase or private key."
  },
  {
    id: "research",
    name: "Base Research Agent",
    tagline: "Base ecosystem research assistant",
    output:
      "I can help you explore Base ecosystem ideas, learning paths, builder opportunities, and safe project directions without exposing personal wallet activity."
  },
  {
    id: "x402",
    name: "x402 Agent",
    tagline: "Payment-ready agent flow",
    output:
      "I can explain how an AI agent may request access to a paid API or tool using an x402-style payment flow. Real payments are disabled in this starter version."
  },
  {
    id: "privacy",
    name: "Privacy Guard Agent",
    tagline: "Prompt and metadata safety checker",
    output:
      "I can check prompts, payment descriptions, and agent metadata for possible private information before anything is sent to an external service."
  }
];

export default function BuilderPage() {
  const [selectedAgent, setSelectedAgent] = useState(agentOptions[0]);

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

      <section
        style={{
          marginBottom: "36px"
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
          Agent Builder
        </p>

        <h1
          style={{
            fontSize: "clamp(2rem, 6vw, 4.5rem)",
            lineHeight: 1,
            margin: "14px 0"
          }}
        >
          Choose your Base agent.
        </h1>

        <p
          style={{
            color: "#cbd5e1",
            fontSize: "1.05rem",
            lineHeight: 1.7,
            maxWidth: "720px"
          }}
        >
          Start with a safe demo agent. This builder does not use real private
          keys, wallet secrets, payment credentials, or personal data.
        </p>
      </section>

      <section
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
          gap: "18px"
        }}
      >
        <div
          style={{
            display: "grid",
            gap: "12px"
          }}
        >
          {agentOptions.map((agent) => {
            const isSelected = selectedAgent.id === agent.id;

            return (
              <button
                key={agent.id}
                type="button"
                onClick={() => setSelectedAgent(agent)}
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
                <strong
                  style={{
                    display: "block",
                    marginBottom: "6px"
                  }}
                >
                  {agent.name}
                </strong>

                <span
                  style={{
                    color: "#94a3b8",
                    lineHeight: 1.5
                  }}
                >
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
          <p
            style={{
              color: "#60a5fa",
              fontWeight: 700,
              marginTop: 0
            }}
          >
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

          <p
            style={{
              color: "#cbd5e1",
              lineHeight: 1.7
            }}
          >
            {selectedAgent.output}
          </p>

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
    </main>
  );
}