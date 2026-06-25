export type X402DemoRequest = {
  resource: string;
  reason: string;
  amount: string;
  network?: string;
};

export type X402DemoPlan = {
  paymentRequired: boolean;
  realPaymentEnabled: boolean;
  network: string;
  resource: string;
  reason: string;
  amount: string;
  steps: string[];
  safetyNotes: string[];
};

export function createX402DemoPlan(request: X402DemoRequest): X402DemoPlan {
  return {
    paymentRequired: true,
    realPaymentEnabled: false,
    network: request.network ?? "base-sepolia",
    resource: request.resource,
    reason: request.reason,
    amount: request.amount,
    steps: [
      "The agent requests access to a paid tool or API.",
      "The server responds with a payment-required style flow.",
      "The agent reviews the resource, reason, amount, and network.",
      "Privacy Guard checks payment metadata for sensitive data.",
      "Demo mode stops before any real payment is created."
    ],
    safetyNotes: [
      "Real payments are disabled in this starter kit.",
      "No private key is needed for the demo flow.",
      "Do not include personal data in payment metadata.",
      "Use Base Sepolia or mock data while testing."
    ]
  };
}

export function getX402LearningNotes(): string[] {
  return [
    "x402 can be used to design paid API and tool access for agents.",
    "A safe implementation should review payment metadata before sending it.",
    "Payment mode should stay disabled or demo until the project is carefully tested.",
    "Secrets and wallet keys should never be committed to GitHub."
  ];
}