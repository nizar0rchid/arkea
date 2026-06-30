import js from "@eslint/js";
import tsParser from "@typescript-eslint/parser";
import tsPlugin from "@typescript-eslint/eslint-plugin";
import reactPlugin from "eslint-plugin-react";
import reactHooksPlugin from "eslint-plugin-react-hooks";
import jsxA11y from "eslint-plugin-jsx-a11y";
import prettier from "eslint-plugin-prettier";
import globals from "globals";


import path from "node:path";
import { fileURLToPath } from "node:url";


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default [
    js.configs.recommended,
    {
        ignores: [
            ".next/**",
            "node_modules/**",
            "common/components/ui/stepper.tsx",
            "commitlint.config.js",
            "next.config.js",
            "postcss.config.js",
            "eslint.config.mjs",
            "**/*.test.{js,ts,tsx}",
            "**/*.spec.{js,ts,tsx}",
            "**/tests/**",
            "**/__tests__/**",
            "public/**",
        ],
    },
    {
        settings: {
            react: {
                version: "detect",
            },
        },

        files: ["**/*.{js,ts,tsx}"],

        languageOptions: {
            parser: tsParser,
            globals: {
                ...globals.browser,
                ...globals.node,
                React: "readonly", // <-- tell ESLint React is defined globally
            },
            parserOptions: {
                project: "./tsconfig.json",
                ecmaVersion: 2023,
                sourceType: "module",
                ecmaFeatures: { jsx: true },
            },
        },

        plugins: {
            "@typescript-eslint": tsPlugin,
            react: reactPlugin,
            "react-hooks": reactHooksPlugin,
            "jsx-a11y": jsxA11y,
            prettier,
        },

        rules: {
            ...tsPlugin.configs.recommended.rules,
            ...reactPlugin.configs.recommended.rules,
            ...reactHooksPlugin.configs.recommended.rules,
            ...jsxA11y.configs.recommended.rules,

            "react/react-in-jsx-scope": "off",
            "@typescript-eslint/no-explicit-any": "off",

            "prettier/prettier": [
                "error",
                {
                    trailingComma: "all",
                    semi: false,
                    tabWidth: 2,
                    singleQuote: true,
                    printWidth: 80,
                    endOfLine: "auto",
                    arrowParens: "always",
                    plugins: ["prettier-plugin-tailwindcss"],
                },
            ],
        },
    },
];

