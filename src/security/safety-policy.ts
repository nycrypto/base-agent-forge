import type { PaymentMode, RunMode } from "@/src/core/agent-types";

export type SafetyPolicyInput = {
  mode: RunMode;
  paymentMode: PaymentMode;
  hasPrivateDataWarning: boolean;
};

export type SafetyPolicyResult = {
  allowed: boolean;
  status: "safe" | "warning" | "blocked";
  notes: string[];
};

export function evaluateSafetyPolicy(
  input: SafetyPolicyInput
): SafetyPolicyResult {
  const notes: string[] = [];

  if (input.mode === "local") {
    notes.push("Local Mode keeps agent activity on the user's own computer.");
  }

  if (input.mode === "hosted") {
    notes.push("Hosted Mode should never expose private keys or raw secrets.");
  }

  if (input.paymentMode === "disabled") {
    notes.push("Payments are disabled by default.");
  }

  if (input.paymentMode === "demo") {
    notes.push("Demo payment mode can show x402-style flow without real funds.");
  }

  if (input.paymentMode === "live") {
    notes.push("Live payment mode should only be enabled after careful testing.");
  }

  if (input.hasPrivateDataWarning) {
    return {
      allowed: false,
      status: "blocked",
      notes: [
        ...notes,
        "Private data warning detected.",
        "Remove sensitive information before running the agent."
      ]
    };
  }

  return {
    allowed: true,
    status: notes.some((note) => note.includes("Live payment"))
      ? "warning"
      : "safe",
    notes
  };
}