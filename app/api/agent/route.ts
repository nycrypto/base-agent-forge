import { NextResponse } from "next/server";
import { runHostedAgent } from "@/src/adapters/hosted-runner";
import type { AgentId, PaymentMode } from "@/src/core/agent-types";

const allowedAgentIds: AgentId[] = ["wallet", "research", "x402", "privacy"];
const allowedPaymentModes: PaymentMode[] = ["disabled", "demo", "live"];

type AgentApiBody = {
  agentId?: unknown;
  prompt?: unknown;
  paymentMode?: unknown;
};

function isAgentId(value: unknown): value is AgentId {
  return typeof value === "string" && allowedAgentIds.includes(value as AgentId);
}

function isPaymentMode(value: unknown): value is PaymentMode {
  return typeof value === "string" && allowedPaymentModes.includes(value as PaymentMode);
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as AgentApiBody;

    if (!isAgentId(body.agentId)) {
      return NextResponse.json({ error: "Bad agentId." }, { status: 400 });
    }

    if (typeof body.prompt !== "string") {
      return NextResponse.json({ error: "Bad prompt." }, { status: 400 });
    }

    const paymentMode = isPaymentMode(body.paymentMode)
      ? body.paymentMode
      : "disabled";

    const result = runHostedAgent({
      agentId: body.agentId,
      prompt: body.prompt,
      paymentMode
    });

    return NextResponse.json(result);
  } catch {
    return NextResponse.json({ error: "Bad request body." }, { status: 400 });
  }
}

export async function GET() {
  return NextResponse.json({
    name: "Base Agent Forge API",
    status: "ok",
    endpoint: "/api/agent",
    method: "POST",
    supportedAgents: allowedAgentIds,
    supportedPaymentModes: allowedPaymentModes,
    example: {
      agentId: "privacy",
      prompt: "Check this prompt.",
      paymentMode: "disabled"
    }
  });
}