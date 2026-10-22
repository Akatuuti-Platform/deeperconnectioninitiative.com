// Signing and hashing with the Web Crypto API (available in the Convex runtime).
//
// Email links carry a signed token instead of a stored secret: purpose.contactId.issuedAt.signature.
// Nothing about the token is stored, and it cannot be forged without MM_LINK_KEY.

const encoder = new TextEncoder();

function toHex(buf: ArrayBuffer): string {
  return Array.from(new Uint8Array(buf))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

export async function hmacHex(key: string, message: string): Promise<string> {
  const cryptoKey = await crypto.subtle.importKey(
    "raw",
    encoder.encode(key),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );
  return toHex(await crypto.subtle.sign("HMAC", cryptoKey, encoder.encode(message)));
}

/** Compares two strings without leaking, through timing, how much of them matched. */
export function constantTimeEqual(a: string, b: string): boolean {
  const len = Math.max(a.length, b.length);
  let diff = a.length ^ b.length;
  for (let i = 0; i < len; i++) {
    diff |= (a.charCodeAt(i) || 0) ^ (b.charCodeAt(i) || 0);
  }
  return diff === 0;
}

export function normaliseEmail(email: string): string {
  return email.trim().toLowerCase();
}

export type TokenPurpose = "confirm" | "manage";

export async function signToken(
  key: string,
  purpose: TokenPurpose,
  contactId: string,
  issuedAt: number,
): Promise<string> {
  const body = `${purpose}.${contactId}.${issuedAt.toString(36)}`;
  return `${body}.${await hmacHex(key, body)}`;
}

export async function verifyToken(
  key: string,
  token: string,
  purpose: TokenPurpose,
): Promise<{ contactId: string; issuedAt: number } | null> {
  if (token.length > 300) return null;
  const parts = token.split(".");
  if (parts.length !== 4) return null;
  const [p, contactId, issued, sig] = parts;
  if (p !== purpose || !/^[a-z0-9]+$/i.test(contactId) || !/^[a-z0-9]+$/.test(issued)) return null;
  const expected = await hmacHex(key, `${p}.${contactId}.${issued}`);
  if (!constantTimeEqual(expected, sig)) return null;
  return { contactId, issuedAt: parseInt(issued, 36) };
}
