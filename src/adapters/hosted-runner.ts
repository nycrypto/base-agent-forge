import { runAgent } from "@/src/core/agent-engine";
import type {
  AgentId,
  AgentResponse,
  PaymentMode
} from "@/src/core/agent-types";

export type HostedRunnerInput = {
  agentId: AgentId;
  prompt: string;
  paymentMode?: PaymentMode;
};

export function runHostedAgent(input: HostedRunnerInput): AgentResponse {
  return runAgent({
    agentId: input.agentId,
    prompt: input.prompt,
    mode: "hosted",
    paymentMode: input.paymentMode ?? "disabled"
  });
}