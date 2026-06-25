export type PiiCheckResult = {
  isSafe: boolean;
  warnings: string[];
};

const patterns = [
  {
    name: "email address",
    regex: /[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/i,
    warning: "The prompt may contain an email address."
  },
  {
    name: "phone number",
    regex: /(\+?\d[\d\s().-]{8,}\d)/,
    warning: "The prompt may contain a phone number."
  },
  {
    name: "private key",
    regex: /0x[a-fA-F0-9]{64}/,
    warning: "The prompt may contain an Ethereum-style private key."
  },
  {
    name: "seed phrase",
    regex:
      /\b(seed phrase|mnemonic|recovery phrase|12 words|24 words|private key)\b/i,
    warning: "The prompt mentions a seed phrase, mnemonic, or private key."
  },
  {
    name: "api key",
    regex: /\b(api[_-]?key|secret[_-]?key|access[_-]?token|bearer token)\b/i,
    warning: "The prompt may contain or mention an API key or secret token."
  }
];

export function checkForPrivateData(input: string): PiiCheckResult {
  const warnings = patterns
    .filter((pattern) => pattern.regex.test(input))
    .map((pattern) => pattern.warning);

  return {
    isSafe: warnings.length === 0,
    warnings
  };
}

export function maskPrivateData(input: string): string {
  return input
    .replace(/[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/gi, "[masked-email]")
    .replace(/0x[a-fA-F0-9]{64}/g, "[masked-private-key]")
    .replace(/(\+?\d[\d\s().-]{8,}\d)/g, "[masked-phone]");
}