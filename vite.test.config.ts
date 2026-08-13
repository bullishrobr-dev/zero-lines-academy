/*
 * The build the smoke test drives. Same app, two things swapped out:
 *
 *   src/backend/supabaseClient.ts → tests/fixtures/supabaseClient.ts
 *       blank URL and key, so the app runs in the device-only mode it already
 *       ships with and CI never touches the live database.
 *
 *   src/data/accounts.ts          → tests/fixtures/accounts.ts
 *       a throwaway account that exists only in this bundle, so the test needs
 *       no password from a repository secret and the account it uses cannot
 *       sign in to the real site.
 *
 * Nothing here is reachable from `npm run build`. The production build has no
 * idea this file exists.
 */
import path from 'path';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

export default defineConfig({
  base: './',
  plugins: [react()],
  build: {
    outDir: 'dist-test',
    /* Minifying costs ~8s and buys the test nothing — it asserts on rendered
       text and localStorage, not on bundle size. */
    minify: false,
    sourcemap: false,
  },
  resolve: {
    /* ORDER MATTERS. The first entry that matches wins and nothing after it is
       consulted, so the two swaps have to come BEFORE the '@' prefix. With '@'
       first, '@/backend/supabaseClient' resolved to the real module and one
       component kept the live client — silently, in a build whose whole
       purpose is not having one. Caught by grepping the bundle for the project
       URL, which is why `npm run build:test` still does that. */
    alias: [
      {
        /* Matches however the module is spelled — './supabaseClient' from
           inside src/backend, '../backend/supabaseClient' from a hook,
           '@/backend/supabaseClient' from a component. Miss one and the test
           build quietly keeps the live client for that one file.

           The leading `^.*` is load-bearing: a regex alias substitutes only
           the span it matched, so a pattern anchored on the bare name rewrites
           '../backend/supabaseClient' to '../backend/<absolute path>' and the
           build dies on a nonsense path. It has to match the whole specifier. */
        find: /^.*supabaseClient$/,
        replacement: path.resolve(__dirname, './tests/fixtures/supabaseClient.ts'),
      },
      {
        find: /^.*data\/accounts$/,
        replacement: path.resolve(__dirname, './tests/fixtures/accounts.ts'),
      },
      { find: '@', replacement: path.resolve(__dirname, './src') },
    ],
  },
});
