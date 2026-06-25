import { runAgent } from "../core/agent-engine";
import type { AgentId, AgentResponse } from "../core/agent-types";

export type LocalRunnerInput = {
  agentId: AgentId;
  prompt: string;
};

export function runLocalAgent(input: LocalRunnerInput): AgentResponse {
  return runAgent({
    agentId: input.agentId,
    prompt: input.prompt,
    mode: "local",
    paymentMode: "disabled"
  });
}