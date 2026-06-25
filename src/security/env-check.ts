export type EnvCheckResult = {
  isSafe: boolean;
  warnings: string[];
  mode: "demo" | "configured";
};

const dangerousPlaceholderValues = [
  "",
  "your_openai_api_key_here",
  "your_cdp_api_key_id_here",
  "your_cdp_api_key_secret_here",
  "never_commit_real_private_keys"
];

export function checkEnvironment() {
  const warnings: string[] = [];

  const paymentMode = process.env.PAYMENT_MODE ?? "disabled";
  const baseNetwork = process.env.BASE_NETWORK ?? "base-sepolia";
  const appName = process.env.NEXT_PUBLIC_APP_NAME ?? "Base Agent Forge";

  if (paymentMode === "live") {
    warnings.push(
      "PAYMENT_MODE is set to live. Make sure this is intentional and never expose secrets publicly."
    );
  }

  if (baseNetwork !== "base-sepolia") {
    warnings.push(
      "BASE_NETWORK is not base-sepolia. Test carefully before using another network."
    );
  }

  const agentWalletPrivateKey = process.env.AGENT_WALLET_PRIVATE_KEY;

  if (
    agentWalletPrivateKey &&
    !dangerousPlaceholderValues.includes(agentWalletPrivateKey)
  ) {
    warnings.push(
      "AGENT_WALLET_PRIVATE_KEY is set. Never commit this value to GitHub."
    );
  }

  return {
    isSafe: warnings.length === 0,
    warnings,
    mode: warnings.length === 0 ? "demo" : "configured",
    appName,
    baseNetwork,
    paymentMode
  };
}