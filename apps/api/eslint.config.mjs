import js from "@eslint/js";
import { defineConfig, globalIgnores } from "eslint/config";
import prettier from "eslint-config-prettier/flat";
import globals from "globals";
import { fileURLToPath } from "node:url";
import tseslint from "typescript-eslint";

export default defineConfig([
  globalIgnores(["dist/**"]),
  {
    files: ["**/*.mjs"],
    extends: [js.configs.recommended],
    languageOptions: {
      globals: globals.node,
    },
  },
  {
    files: ["**/*.{ts,tsx}"],
    extends: [js.configs.recommended, tseslint.configs.recommendedTypeChecked],
    languageOptions: {
      globals: globals.node,
      parserOptions: {
        project: "./tsconfig.eslint.json",
        tsconfigRootDir: fileURLToPath(new URL(".", import.meta.url)),
      },
    },
  },
  prettier,
]);
