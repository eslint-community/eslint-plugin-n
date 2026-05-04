/**
 * @author 唯然<weiran.zsd@outlook.com>
 */


import js from "@eslint/js";
import globals from "globals";
import nodePlugin from "eslint-plugin-n";
import eslintPlugin from "eslint-plugin-eslint-plugin";
import prettierConfig from "eslint-config-prettier";

export default [
    {
        languageOptions: { globals: globals.mocha },
        linterOptions: { reportUnusedDisableDirectives: true },
    },
    {
        ignores: [
            ".nyc_output/",
            "coverage/",
            "docs/",
            "lib/converted-esm/",
            "tests/fixtures/",
        ],
    },
    js.configs.recommended,
    nodePlugin.configs["flat/recommended"],
    eslintPlugin.configs["flat/recommended"],
    prettierConfig,
    {
        rules: {
            strict: ["error", "global"],
            "eslint-plugin/require-meta-docs-description": "error",
        },
    },
    {
        // these messageIds were used outside
        files: ["lib/rules/prefer-global/*.js"],
        rules: {
            "eslint-plugin/no-unused-message-ids": 0,
        },
    },
    {
        files: ["{tests,scripts}/**/*.js"],
        rules: {
            "n/no-unsupported-features/node-builtins": 0, // import.meta.dirname is used in tests, and it is supported in all supported Node versions
        }
    }
]
