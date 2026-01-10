"use strict"

const globals = require("globals")
const { recommendeRulesConfig } = require("./_commons")

/**
 * https://eslint.org/docs/latest/use/configure/configuration-files-new
 * @type {import('eslint').Linter.Config}
 */
module.exports.flat = {
    name: "node/flat/recommended-script",
    languageOptions: {
        sourceType: "commonjs",
        globals: {
            ...globals.node,
            __dirname: "readonly",
            __filename: "readonly",
            exports: "writable",
            module: "readonly",
            require: "readonly",
        },
    },
    rules: {
        ...recommendeRulesConfig,
        "n/no-unsupported-features/es-syntax": ["error", { ignores: [] }],
    },
}
