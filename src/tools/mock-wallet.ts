export type MockWalletProfile = {
  address: string;
  network: string;
  balanceLabel: string;
  safetyStatus: "demo-only" | "configured";
  notes: string[];
};

export function getMockWalletProfile(): MockWalletProfile {
  return {
    address: "0xDemoWallet000000000000000000000000000000000",
    network: "base-sepolia",
    balanceLabel: "Demo balance only",
    safetyStatus: "demo-only",
    notes: [
      "This is not a real wallet.",
      "No private key is stored in the repository.",
      "Use testnets before working with real funds."
    ]
  };
}

export function createWalletSafetyChecklist(): string[] {
  return [
    "Never share your seed phrase.",
    "Never paste private keys into public repositories.",
    "Use a separate test wallet for experiments.",
    "Check the network before signing a transaction.",
    "Read transaction details before approving anything.",
    "Keep .env.local out of GitHub."
  ];
}