/**
 * @author electrohyun
 * See LICENSE file in root directory for full license.
 */

import {
    CALL,
    findVariable,
    ReferenceTracker,
} from "@eslint-community/eslint-utils"

/** @type {import('@eslint-community/eslint-utils').TraceMap<number>} */
const assertTraceMap = {
    [CALL]: 1,
    ok: { [CALL]: 1 },
    equal: { [CALL]: 2 },
    notEqual: { [CALL]: 2 },
    deepEqual: { [CALL]: 2 },
    notDeepEqual: { [CALL]: 2 },
    strictEqual: { [CALL]: 2 },
    notStrictEqual: { [CALL]: 2 },
    deepStrictEqual: { [CALL]: 2 },
    notDeepStrictEqual: { [CALL]: 2 },
    match: { [CALL]: 2 },
    doesNotMatch: { [CALL]: 2 },
    partialDeepStrictEqual: { [CALL]: 2 },
}

/** @type {import('@eslint-community/eslint-utils').TraceMap<number>} */
const traceMap = {
    "node:assert": {
        ...assertTraceMap,
        strict: assertTraceMap,
    },
    "node:assert/strict": assertTraceMap,
}

/**
 * @param {import('estree').Expression | import('estree').SpreadElement} node
 * @returns {boolean}
 */
function isEmptyString(node) {
    return (
        (node.type === "Literal" && node.value === "") ||
        (node.type === "TemplateLiteral" &&
            node.expressions.length === 0 &&
            node.quasis[0]?.value.cooked === "")
    )
}

/**
 * @param {import('estree').Expression | import('estree').SpreadElement} node
 * @param {import('eslint').Rule.RuleContext} context
 * @returns {boolean}
 */
function isUndefined(node, context) {
    if (node.type === "UnaryExpression" && node.operator === "void") {
        return true
    }

    if (node.type !== "Identifier" || node.name !== "undefined") {
        return false
    }

    const variable = findVariable(context.sourceCode.getScope(node), node)

    return variable?.defs.length === 0
}

/**
 * @param {import('estree').CallExpression} node
 * @param {import('eslint').Rule.RuleContext} context
 * @returns {boolean}
 */
function isModifiedCallee(node, context) {
    let callee = node.callee

    while (callee.type === "MemberExpression") {
        callee = callee.object
    }

    if (callee.type !== "Identifier") {
        return false
    }

    const variable = findVariable(context.sourceCode.getScope(callee), callee)

    return (
        variable?.references.some(
            reference => reference.isWrite() && !reference.init
        ) ?? false
    )
}

/** @type {import('./rule-module.js').RuleModule} */
export default {
    meta: {
        docs: {
            description: "require messages for `node:assert` calls",
            recommended: false,
            url: "https://github.com/eslint-community/eslint-plugin-n/blob/HEAD/docs/rules/require-assert-message.md",
        },
        messages: {
            emptyMessage: "The assertion message must not be empty.",
            missingMessage: "Provide an assertion message.",
        },
        schema: [],
        type: "suggestion",
    },
    create(context) {
        return {
            "Program:exit"() {
                const scope = context.sourceCode.getScope(
                    context.sourceCode.ast
                )
                const tracker = new ReferenceTracker(scope, { mode: "legacy" })
                const references = [
                    ...tracker.iterateCjsReferences(traceMap),
                    ...tracker.iterateEsmReferences(traceMap),
                ]

                for (const {
                    info: messageIndex,
                    node: reference,
                } of references) {
                    const node =
                        /** @type {import('estree').CallExpression} */ (
                            reference
                        )

                    if (isModifiedCallee(node, context)) {
                        continue
                    }

                    const message = node.arguments[messageIndex]

                    if (message == null) {
                        context.report({ node, messageId: "missingMessage" })
                    } else if (
                        isUndefined(message, context) ||
                        isEmptyString(message)
                    ) {
                        context.report({
                            node: message,
                            messageId: "emptyMessage",
                        })
                    }
                }
            },
        }
    },
}
