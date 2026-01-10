"use strict"

const globals = require("globals")
const { recommendeRulesConfig } = require("./_commons")

/**
 * https://eslint.org/docs/latest/use/configure/configuration-files-new
 * @type {import('eslint').Linter.Config}
 */
module.exports.flat = {
    name: "node/flat/recommended-module",
    languageOptions: {
        sourceType: "module",
        globals: {
            ...globals.node,
            __dirname: "off",
            __filename: "off",
            exports: "off",
            module: "off",
            require: "off",
        },
    },
    rules: {
        ...recommendeRulesConfig,
        "n/no-unsupported-features/es-syntax": [
            "error",
            { ignores: ["modules"] },
        ],
    },
}
