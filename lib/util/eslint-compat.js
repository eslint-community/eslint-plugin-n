/**
 * @fileoverview Utilities for eslint compatibility.
 * @see https://eslint.org/docs/latest/use/migrate-to-9.0.0#removed-context-methods
 * @author aladdin-add<weiran.zsd@outlook.com>
 */
/** @import { Rule } from 'eslint' */
/** @typedef {import('estree').Node} Node */

export const getSourceCode = function (/** @type Rule.RuleContext */ context) {
    return context.sourceCode || context.getSourceCode()
}

export const getScope = function (
    /** @type {Rule.RuleContext} */ context,
    /** @type {Node} */ node
) {
    const sourceCode = exports.getSourceCode(context)
    // @ts-ignore
    return sourceCode.getScope?.(node || sourceCode.ast) || context.getScope()
}

export const getAncestors = function (
    /** @type {Rule.RuleContext} */ context,
    /** @type {Node} */ node
) {
    const sourceCode = exports.getSourceCode(context)
    // @ts-ignore
    return sourceCode.getAncestors?.(node) || context.getAncestors()
}

export const getCwd = function (/** @type {Rule.RuleContext} */ context) {
    return context.cwd || context.getCwd()
}

export const getPhysicalFilename = function (
    /** @type {Rule.RuleContext} */ context
) {
    return context.physicalFilename || context.getPhysicalFilename?.()
}

export const getFilename = function (/** @type {Rule.RuleContext} */ context) {
    return context.filename || context.getFilename?.()
}
