export type AgentId = "wallet" | "research" | "x402" | "privacy";

export type RunMode = "local" | "hosted";

export type PaymentMode = "disabled" | "demo" | "live";

export type AgentRequest = {
  agentId: AgentId;
  prompt: string;
  mode?: RunMode;
  paymentMode?: PaymentMode;
};

export type AgentResponse = {
  agentId: AgentId;
  name: string;
  summary: string;
  response: string;
  safetyNotes: string[];
  nextSteps: string[];
};

export type AgentDefinition = {
  id: AgentId;
  name: string;
  tagline: string;
  description: string;
  defaultResponse: string;
  safetyNotes: string[];
  nextSteps: string[];
};