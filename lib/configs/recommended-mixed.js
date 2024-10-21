"use strict"

const { commonRules } = require("./_commons")
const { recommendedEnv } = require("./recommended-env")

/**
 * https://eslint.org/docs/latest/use/configure/configuration-files-new
 * @type {import('eslint').Linter.FlatConfig[]}
 */
module.exports = [
    ...recommendedEnv,
    {
        name: "node/recommended",
        rules: commonRules,
    },
]
