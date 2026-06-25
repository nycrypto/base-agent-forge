import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Base Agent Forge",
  description: "Local-first AI agent starter kit for Base with optional x402 payments."
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}