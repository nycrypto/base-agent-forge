export type BaseBuilderIdea = {
  title: string;
  difficulty: "beginner" | "intermediate" | "advanced";
  description: string;
  safetyNote: string;
};

export function getBaseBuilderIdeas(): BaseBuilderIdea[] {
  return [
    {
      title: "Base Wallet Safety Assistant",
      difficulty: "beginner",
      description:
        "A simple assistant that teaches users how to check networks, avoid seed phrase leaks, and review transactions safely.",
      safetyNote: "Use mock wallet data only. Never ask for real private keys."
    },
    {
      title: "Base Learning Path Agent",
      difficulty: "beginner",
      description:
        "An agent that creates weekly learning plans for Base, smart contracts, testnets, and onchain app basics.",
      safetyNote: "Keep the project educational and avoid financial promises."
    },
    {
      title: "x402 Paid Tool Demo",
      difficulty: "intermediate",
      description:
        "A demo agent flow that shows how paid API or tool access can work with x402-style payment logic.",
      safetyNote: "Start with demo payments. Do not enable real payment mode by default."
    },
    {
      title: "Privacy Guard for Agent Prompts",
      difficulty: "intermediate",
      description:
        "A safety layer that checks prompts and payment metadata before sending them to external tools.",
      safetyNote: "Mask emails, phone numbers, private keys, and secret tokens."
    }
  ];
}

export function createBaseLearningPath(): string[] {
  return [
    "Learn the difference between Base mainnet and Base Sepolia.",
    "Set up a test wallet with no real funds.",
    "Understand wallet safety and transaction approvals.",
    "Build a simple local-first agent.",
    "Add a hosted API route after the local version works.",
    "Add an optional x402 demo flow without real funds.",
    "Only test live integrations after everything is reviewed."
  ];
}