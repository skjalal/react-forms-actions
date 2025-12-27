// @ts-check
import js from "@eslint/js";
import prettierConfig from "eslint-config-prettier";
import security from "eslint-plugin-security";
import jsdoc from "eslint-plugin-jsdoc";
import tseslint from "typescript-eslint";
import prettier from "eslint-plugin-prettier";

export default [
  js.configs.recommended,
  prettierConfig,
  ...tseslint.configs.recommended,
  {
    files: ["**/*.ts"],
    plugins: { security, jsdoc, prettier },
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: { ecmaVersion: "latest", sourceType: "module" },
    },
    rules: {
      "no-console": ["error", { allow: ["info", "warn", "error"] }],
      "prefer-const": ["error", { destructuring: "all" }],
      eqeqeq: ["error", "smart"],
      "@typescript-eslint/no-unused-vars": [
        "error",
        { argsIgnorePattern: "^_" },
      ],
      "security/detect-object-injection": "off",
      "jsdoc/check-tag-names": "error",
      "jsdoc/require-param": "off",
      "jsdoc/require-returns": "off",
    },
  },
  { ignores: ["node_modules/**", "dist/**"] },
];
