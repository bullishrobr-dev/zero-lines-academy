/*
 * Where the repo is, worked out from where THIS FILE is.
 *
 * Every guard in this folder used to open its files through a path beginning
 * `/home/user/zero-lines-academy/…`, which is where the repo happens to sit in
 * one sandbox. On a GitHub runner the checkout is at
 * `/home/runner/work/zero-lines-academy/zero-lines-academy`, so the very first
 * guard died on ENOENT and took the whole `check` job down with it. The guards
 * passed locally and had never once passed in CI — which is the worst possible
 * state for a safety net to be in, because it looks like coverage.
 *
 * Resolve from `import.meta.url` and the scripts run wherever the repo is
 * cloned, including a git worktree or someone else's laptop.
 */
import path from 'node:path';
import { fileURLToPath } from 'node:url';

export const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
export const SRC = path.join(ROOT, 'src');
export const DATA = path.join(SRC, 'data');

/** Absolute path to a file given repo-relative segments. */
export const fromRoot = (...segments) => path.join(ROOT, ...segments);
