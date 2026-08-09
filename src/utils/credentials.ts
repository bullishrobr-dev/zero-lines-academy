// ─────────────────────────────────────────────────────────────────────────────
// credentials.ts — password hashing for the committed account roster.
//
// BE CLEAR-EYED ABOUT WHAT THIS IS. This app is a static site with no server:
// every check happens in the browser, on code the visitor already has. Anyone
// determined can open devtools and walk straight past the login. This is a
// name-tag, not a lock.
//
// What hashing DOES buy, and why it is worth doing:
//   - The repository is public. Without this, every seller's password would be
//     readable by anyone who opened src/data/accounts.ts on github.com.
//   - It stops a curious colleague reading someone else's password over their
//     shoulder or out of the repo.
//
// If real access control is ever needed — hiding the sales bible from
// competitors, or trusting the numbers a seller reports — that requires a
// server. See "Replacing the backend" in the README.
// ─────────────────────────────────────────────────────────────────────────────

/** Hex-encode bytes. */
function toHex(buf: ArrayBuffer): string {
  return Array.from(new Uint8Array(buf))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('');
}

/**
 * Derive the stored verifier for a password.
 *
 * Iterated SHA-256 rather than a single pass: it costs us nothing at login
 * (one-off, ~30ms) but multiplies the work of anyone trying passwords in bulk
 * against the public repo.
 */
export async function hashPassword(password: string, salt: string): Promise<string> {
  const enc = new TextEncoder();
  let digest = await crypto.subtle.digest('SHA-256', enc.encode(`${salt}:${password}`));
  for (let i = 0; i < 5000; i++) {
    digest = await crypto.subtle.digest('SHA-256', digest);
  }
  return toHex(digest);
}

/** A fresh random salt, hex encoded. */
export function newSalt(): string {
  const bytes = new Uint8Array(16);
  crypto.getRandomValues(bytes);
  return toHex(bytes.buffer);
}

/**
 * A password that is easy to read aloud across a shop floor and type on a
 * phone: no ambiguous characters (0/O, 1/l/I), grouped for legibility.
 */
export function generatePassword(): string {
  const alphabet = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  const bytes = new Uint8Array(12);
  crypto.getRandomValues(bytes);
  const chars = Array.from(bytes, (b) => alphabet[b % alphabet.length]);
  return `${chars.slice(0, 4).join('')}-${chars.slice(4, 8).join('')}-${chars.slice(8, 12).join('')}`;
}

/** Constant-time-ish comparison. Not security-critical here, but free. */
export function verifierMatches(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return diff === 0;
}
