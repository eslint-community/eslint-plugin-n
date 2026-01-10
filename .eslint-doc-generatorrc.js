"use strict"

/** @type {import('eslint-doc-generator').GenerateOptions} */
const config = {
    ignoreConfig: [
        "recommended",
        "mixed-esm-and-cjs",
        "flat/recommended-script",
        "flat/recommended-module",
        "flat/recommended",
        "flat/mixed-esm-and-cjs",
        "flat/all",
    ],
    urlConfigs: "https://github.com/eslint-community/eslint-plugin-n#-configs",
    configEmoji: [
        ["recommended-script", "✅"],
        ["recommended-module", "🟢"],
    ],
    ruleDocSectionOptions: false,
}

module.exports = config
