"use strict"

/** @type {import('eslint-doc-generator').GenerateOptions} */
const config = {
    ignoreConfig: [
        "recommended",
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
        ["recommended", "☑️"],
        ["flat/recommended-script", "✅"],
        ["flat/recommended-module", "🟢"],
        ["flat/recommended", "☑️"],
        ["flat/mixed-esm-and-cjs", "🟠"],
    ],
    ruleDocSectionOptions: false,
}

module.exports = config
