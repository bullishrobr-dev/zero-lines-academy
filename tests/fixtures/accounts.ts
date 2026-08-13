/*
 * The roster the SMOKE TEST signs in with. Never shipped to a phone.
 *
 * vite.test.config.ts swaps this in for src/data/accounts.ts, so this account
 * exists only inside the test bundle. It is not in the real roster, which means
 * it cannot sign in to the live site — that is the whole reason it is a
 * separate file rather than a "test user" added to the team.
 *
 * Which is why the password below being committed, in a public repository, is
 * fine: it unlocks a build that exists for ninety seconds inside a CI runner
 * and talks to no database.
 */
export type AccountRole = 'admin' | 'manager' | 'employee';
export type AccountLocation = 'andorra' | 'gibraltar';

export interface Account {
  username: string;
  name: string;
  salt: string;
  verifier: string;
  role: AccountRole;
  location: AccountLocation;
  managerUsername?: string;
}

/* Password: SMOKE-TEST-ONLY — see tests/smoke.mjs.
   Regenerate with hashPassword() from src/utils/credentials.ts if you change it. */
export const ACCOUNTS: Account[] = [
  {
    username: 'smoketest',
    name: 'Smoke Test',
    salt: '27909385ece44fa6adf4fee557e60ef9',
    verifier: '440d67fab79c84c7a9296a6904d4ae857471d408a65681aa17e308c65e99e2cb',
    /* Admin, so the sweep reaches the manager and admin screens too. A seller
       account would 404 on half the routes and the test would pass by not
       looking. */
    role: 'admin',
    location: 'andorra',
  },
];

export function accountId(username: string): string {
  return `u:${username.trim().toLowerCase()}`;
}

export function findAccount(username: string): Account | undefined {
  const u = username.trim().toLowerCase();
  return ACCOUNTS.find((a) => a.username.toLowerCase() === u);
}
