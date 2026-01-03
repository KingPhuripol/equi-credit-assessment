/**
 * Cryptographic utilities for contract integrity verification
 * Using SHA-256 hashing for tamper-proof digital signatures
 */

/**
 * Generate SHA-256 hash from contract data
 * This creates a unique fingerprint that changes if any data is modified
 */
export async function generateContractHash(data: {
  userName: string;
  loanAmount: number;
  creditScore: number;
  date: string;
  contractId: string;
}): Promise<string> {
  const dataString = JSON.stringify(data, Object.keys(data).sort());
  const encoder = new TextEncoder();
  const dataBuffer = encoder.encode(dataString);

  const hashBuffer = await crypto.subtle.digest("SHA-256", dataBuffer);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");

  return hashHex;
}

/**
 * Verify contract integrity by comparing hash
 */
export async function verifyContractHash(
  data: {
    userName: string;
    loanAmount: number;
    creditScore: number;
    date: string;
    contractId: string;
  },
  providedHash: string
): Promise<boolean> {
  const calculatedHash = await generateContractHash(data);
  return calculatedHash === providedHash;
}

/**
 * Generate unique contract ID
 */
export function generateContractId(): string {
  const timestamp = Date.now();
  const random = Math.floor(Math.random() * 10000);
  return `EQ-2026-${timestamp}-${random}`;
}

/**
 * Format hash for display (shortened version)
 */
export function formatHashForDisplay(hash: string): string {
  if (hash.length < 16) return hash;
  return `${hash.substring(0, 8)}...${hash.substring(hash.length - 8)}`;
}
