"use strict"

const {
    getParserServices: getParserServicesFromTsEslint,
} = require("@typescript-eslint/utils/eslint-utils")

/**
 * Get the TypeScript parser services.
 * If TypeScript isn't present, returns `null`.
 *
 * @param {import('eslint').Rule.RuleContext} context - rule context
 * @returns {import('@typescript-eslint/parser').ParserServices | null}
 */
module.exports = function getParserServices(context) {
    // Not using tseslint parser?
    if (
        context.sourceCode.parserServices?.esTreeNodeToTSNodeMap == null ||
        context.sourceCode.parserServices.tsNodeToESTreeNodeMap == null
    ) {
        return null
    }

    return getParserServicesFromTsEslint(/** @type {any} */ (context), true)
}
