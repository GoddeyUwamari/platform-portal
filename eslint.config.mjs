import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
  ]),
  {
    rules: {
      // Downgrade no-explicit-any from error to warning for gradual migration
      '@typescript-eslint/no-explicit-any': 'warn',
      // Downgrade unused vars from error to warning
      '@typescript-eslint/no-unused-vars': 'warn',
      // Allow React Hook Form's watch function pattern
      'react-hooks/incompatible-library': 'warn',
      // Downgrade React hooks errors to warnings for gradual fixes
      'react-hooks/preserve-manual-memoization': 'warn',
      'react-hooks/set-state-in-effect': 'warn',
      'react-hooks/exhaustive-deps': 'warn',
    },
  },
]);

export default eslintConfig;
