// ─────────────────────────────────────────────────────────────────────────────
//                        WHO CAN SIGN IN — EDIT THIS FILE
// ─────────────────────────────────────────────────────────────────────────────
//
// This is the team roster. It lives in the repository on purpose: the app is a
// static site with no server, so an account created inside the app would only
// exist on the phone that created it. Committing the roster here is what lets
// a seller sign in on their OWN phone.
//
// ── To add someone ───────────────────────────────────────────────────────────
//   1. Sign in as an admin and open Profile → Admin Panel → Add user.
//   2. Fill in the name, username, role and shop. It shows you a password and
//      a block of code.
//   3. Press "Copy", then paste it into the ACCOUNTS list below.
//      (On a phone: github.com → this file → pencil icon → paste → Commit.)
//   4. Commit. The site rebuilds itself and they can sign in within a minute.
//   5. Give them their username and password. The password is shown ONCE —
//      if it is lost, generate a new line and replace theirs.
//
// ── To remove someone ────────────────────────────────────────────────────────
//   Delete their entry and commit. They can no longer sign in anywhere.
//
// ── Passwords ────────────────────────────────────────────────────────────────
//   Stored as a salted hash, never as text, because this repository is public.
//   See src/utils/credentials.ts for exactly how much that is and is not worth.
// ─────────────────────────────────────────────────────────────────────────────

export type AccountRole = 'admin' | 'manager' | 'employee';
export type AccountLocation = 'andorra' | 'gibraltar';

export interface Account {
  /** What they type to sign in. Lowercase, no spaces. Must be unique. */
  username: string;
  /** Shown in the app. */
  name: string;
  /** Random per-account salt. */
  salt: string;
  /** hashPassword(password, salt) — see src/utils/credentials.ts */
  verifier: string;
  role: AccountRole;
  /** Decides the currency and prices this person is trained on. */
  location: AccountLocation;
  /** Username of their manager. Optional; used to build the manager's team. */
  managerUsername?: string;
}

export const ACCOUNTS: Account[] = [
  {
    username: 'admin',
    name: 'Owner',
    salt: 'ceb0a5dc7876b3a7f9171b029cf2bc3d',
    verifier: '98204ff06eeb0d553f6a4e34bd376fe5f27e8406980c12180ed5f897137b488a',
    role: 'admin',
    location: 'andorra',
  },

  // ── Add your managers and sellers below this line ──
];

/** Stable id for an account. Usernames are unique, so they are the identity. */
export function accountId(username: string): string {
  return `u:${username.trim().toLowerCase()}`;
}

export function findAccount(username: string): Account | undefined {
  const u = username.trim().toLowerCase();
  return ACCOUNTS.find((a) => a.username.toLowerCase() === u);
}
