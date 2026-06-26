import { getAgentDefinition } from "../agents/agent-definitions";
import type {
  AgentRequest,
  AgentResponse,
  PaymentMode,
  RunMode
} from "./agent-types";
import { checkForPrivateData, maskPrivateData } from "../security/pii-filter";
import { evaluateSafetyPolicy } from "../security/safety-policy";

export function runAgent(request: AgentRequest): AgentResponse {
  const mode: RunMode = request.mode ?? "local";
  const paymentMode: PaymentMode = request.paymentMode ?? "disabled";
  const prompt = request.prompt.trim();

  const agent = getAgentDefinition(request.agentId);
  const privateDataCheck = checkForPrivateData(prompt);

  const safetyPolicy = evaluateSafetyPolicy({
    mode,
    paymentMode,
    hasPrivateDataWarning: !privateDataCheck.isSafe
  });

  if (!agent) {
    return {
      agentId: request.agentId,
      name: "Unknown Agent",
      summary: "Agent not found.",
      response: "Choose a supported agent.",
      safetyNotes: ["Blocked safely."],
      nextSteps: ["Use wallet, research, x402, or privacy."]
    };
  }

  if (!safetyPolicy.allowed) {
    return {
      agentId: agent.id,
      name: agent.name,
      summary: "Blocked by safety policy.",
      response: "Private data may be present.",
      safetyNotes: [...privateDataCheck.warnings, ...safetyPolicy.notes],
      nextSteps: ["Remove private data.", "Use placeholders.", "Run again."]
    };
  }

  const safePrompt =
    prompt.length > 0 ? maskPrivateData(prompt) : "No prompt.";

  return {
    agentId: agent.id,
    name: agent.name,
    summary: `${agent.name} ran in ${mode} mode.`,
    response: [
      agent.defaultResponse,
      "",
      `Mode: ${mode}`,
      `Payment mode: ${paymentMode}`,
      `Prompt: ${safePrompt}`,
      "",
      "Demo only.",
      "No real wallet or payment."
    ].join("\n"),
    safetyNotes: [...agent.safetyNotes, ...safetyPolicy.notes],
    nextSteps: agent.nextSteps
  };
}