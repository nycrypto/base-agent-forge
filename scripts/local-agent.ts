import { runLocalAgent } from "@/src/adapters/local-runner";
import type { AgentId } from "@/src/core/agent-types";

const allowedAgents: AgentId[] = ["wallet", "research", "x402", "privacy"];

function isAgentId(value: string): value is AgentId {
  return allowedAgents.includes(value as AgentId);
}

const agentArg = process.argv[2] ?? "privacy";
const promptArg =
  process.argv.slice(3).join(" ") ||
  "Check this demo prompt for private data before running the agent.";

if (!isAgentId(agentArg)) {
  console.error("Invalid agent type.");
  console.error("Use one of: wallet, research, x402, privacy");
  process.exit(1);
}

const result = runLocalAgent({
  agentId: agentArg,
  prompt: promptArg
});

console.log("");
console.log("Base Agent Forge - Local Mode");
console.log("--------------------------------");
console.log(`Agent: ${result.name}`);
console.log(`Summary: ${result.summary}`);
console.log("");
console.log("Response:");
console.log(result.response);
console.log("");
console.log("Safety notes:");
for (const note of result.safetyNotes) {
  console.log(`- ${note}`);
}
console.log("");
console.log("Next steps:");
for (const step of result.nextSteps) {
  console.log(`- ${step}`);
}
console.log("");