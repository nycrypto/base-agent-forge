import { NextResponse } from "next/server";
import { checkForPrivateData } from "@/src/security/pii-filter";

type X402DemoBody = {
  resource?: unknown;
  reason?: unknown;
  amount?: unknown;
};

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as X402DemoBody;

    const resource =
      typeof body.resource === "string" && body.resource.trim().length > 0
        ? body.resource.trim()
        : "premium-agent-tool";

    const reason =
      typeof body.reason === "string" && body.reason.trim().length > 0
        ? body.reason.trim()
        : "Demo access request for a paid agent tool.";

    const amount =
      typeof body.amount === "string" && body.amount.trim().length > 0
        ? body.amount.trim()
        : "0.001 USDC";

    const privacyCheck = checkForPrivateData(`${resource} ${reason}`);

    if (!privacyCheck.isSafe) {
      return NextResponse.json(
        {
          status: "blocked",
          message:
            "Possible private information was detected in the payment metadata.",
          warnings: privacyCheck.warnings,
          nextSteps: [
            "Remove private data from resource names and payment reasons.",
            "Use generic descriptions for public payment metadata.",
            "Try the request again with safe demo text."
          ]
        },
        { status: 400 }
      );
    }

    return NextResponse.json({
      status: "demo",
      message: "x402 demo flow generated safely.",
      paymentRequired: true,
      realPaymentEnabled: false,
      network: "base-sepolia",
      resource,
      amount,
      reason,
      demoFlow: [
        "Client requests a paid agent tool.",
        "Server returns a payment-required response.",
        "Agent reviews payment metadata.",
        "Privacy Guard checks for sensitive data.",
        "Real payment is disabled in this starter version."
      ],
      safetyNotes: [
        "No real funds are moved.",
        "No private key is required.",
        "Do not include personal data in payment metadata."
      ]
    });
  } catch {
    return NextResponse.json(
      {
        error: "Invalid request body."
      },
      { status: 400 }
    );
  }
}

export async function GET() {
  return NextResponse.json({
    name: "Base Agent Forge x402 Demo",
    status: "ok",
    endpoint: "/api/x402",
    method: "POST",
    realPaymentEnabled: false,
    example: {
      resource: "premium-agent-tool",
      reason: "Demo access request for a paid agent tool.",
      amount: "0.001 USDC"
    }
  });
}