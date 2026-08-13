import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import tseslint from 'typescript-eslint';
import { defineConfig, globalIgnores } from 'eslint/config';

export default defineConfig([
  // `public/sw.js` is a service worker with its own globals and is not part of
  // the app bundle. The rest are build output — `dist-test` and `dist-local`
  // are the smoke-test and offline builds, and linting a bundle reports on
  // every dependency in it.
  globalIgnores(['dist', 'dist-test', 'dist-local', 'public/sw.js']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      js.configs.recommended,
      tseslint.configs.recommended,
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
    ],
    languageOptions: {
      // Matches `target` in tsconfig.app.json.
      ecmaVersion: 2022,
      globals: globals.browser,
    },
    rules: {
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          // `const { password: _, ...safe } = user` is how the backend strips a
          // field before returning it — the discard is the point.
          ignoreRestSiblings: true,
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
          caughtErrorsIgnorePattern: '^_',
        },
      ],
    },
  },
  {
    // A context file exports its Provider component and its hook together.
    // That is the intended shape, and the only cost is a full reload instead of
    // a hot update when the file itself is edited.
    files: ['src/contexts/**/*.tsx'],
    rules: { 'react-refresh/only-export-components': 'off' },
  },
  {
    // Vendored shadcn/ui components ship variant objects alongside components.
    files: ['src/components/ui/**/*.tsx'],
    rules: { 'react-refresh/only-export-components': 'off' },
  },
]);
