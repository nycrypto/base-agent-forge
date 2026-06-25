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
      response: `This agent type is not supported yet. Choose wallet, research, x402, or privacy.`,
      safetyNotes: ["Unsupported agent request was blocked safely."],
      nextSteps: ["Choose a supported agent type."]
    };
  }

  if (!safetyPolicy.allowed) {
    return {
      agentId: agent.id,
      name: agent.name,
      summary: "Request blocked by safety policy.",
      response: `The agent detected possible private information in your prompt. Remove sensitive data before running this request again.`,
      safetyNotes: [...privateDataCheck.warnings, ...safetyPolicy.notes],
      nextSteps: [
        "Remove private data from the prompt.",
        "Use placeholder values instead of real secrets.",
        "Run the agent again after cleaning the input."
      ]
    };
  }

  const safePrompt =
    prompt.length > 0 ? maskPrivateData(prompt) : "No prompt provided.";

  return {
    agentId: agent.id,
    name: agent.name,
    summary: `${agent.name} completed a safe ${mode} mode demo run.`,
    response: [
      agent.defaultResponse,
      "",
      `Mode: ${mode}`,
      `Payment mode: ${paymentMode}`,
      `Prompt received: ${safePrompt}`,
      "",
      `This starter version uses safe demo logic. No real wallet action, real payment, or private key is required.`
    ].join("\n"),
    safetyNotes: [...agent.safetyNotes, ...safetyPolicy.notes],
    nextSteps: agent.nextSteps
  };
}