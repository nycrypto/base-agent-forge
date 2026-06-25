import { NextResponse } from "next/server";
import { checkEnvironment } from "@/src/security/env-check";
import {
  createWalletSafetyChecklist,
  getMockWalletProfile
} from "@/src/tools/mock-wallet";
import { getBaseBuilderIdeas } from "@/src/tools/base-tools";
import { getX402LearningNotes } from "@/src/tools/x402-tools";

export async function GET() {
  const environment = checkEnvironment();
  const mockWallet = getMockWalletProfile();
  const walletChecklist = createWalletSafetyChecklist();
  const builderIdeas = getBaseBuilderIdeas();
  const x402Notes = getX402LearningNotes();

  return NextResponse.json({
    name: "Base Agent Forge",
    status: "ok",
    version: "0.1.0",
    modes: {
      local: true,
      hosted: true,
      x402Demo: true,
      realPaymentsEnabled: false
    },
    environment,
    mockWallet,
    walletChecklist,
    builderIdeas,
    x402Notes,
    safety: {
      privateKeysRequired: false,
      realWalletRequired: false,
      realPaymentsRequired: false,
      recommendedNetwork: "base-sepolia"
    }
  });
}