/**
 * @author Pintu Kumar
 * See LICENSE file in root directory for full license.
 */

import {
    CALL,
    ReferenceTracker,
    getStringIfConstant,
} from "@eslint-community/eslint-utils"
import { extendTraceMapWithNodePrefix } from "../util/extend-trackmap-with-node-prefix.js"

const traceMap = extendTraceMapWithNodePrefix({
    path: {
        resolve: { [CALL]: true },
    },
})

/**
 * Checks whether the given `path.resolve()` call is equivalent to
 * `process.cwd()`: no arguments, or a single argument that statically
 * resolves to `""` or `"."`.
 * @param {import('estree').CallExpression} node The call to check.
 * @param {import("eslint").Scope.Scope} globalScope The global scope.
 * @returns {boolean} `true` if the call is equivalent to `process.cwd()`.
 */
function isCwdEquivalentCall(node, globalScope) {
    if (node.arguments.length === 0) {
        return true
    }
    if (node.arguments.length === 1) {
        const arg = node.arguments[0]
        if (arg == null) {
            return false
        }
        const value = getStringIfConstant(arg, globalScope)
        return value === "" || value === "."
    }
    return false
}

/** @type {import('./rule-module.js').RuleModule} */
export default {
    meta: {
        type: "suggestion",
        docs: {
            description: "enforce `process.cwd()` instead of `path.resolve()`",
            recommended: false,
            url: "https://github.com/eslint-community/eslint-plugin-n/blob/HEAD/docs/rules/prefer-process-cwd.md",
        },
        fixable: "code",
        schema: [],
        messages: {
            preferProcessCwd:
                "Use `process.cwd()` instead of `path.resolve()`.",
        },
    },
    create(context) {
        return {
            "Program:exit"() {
                const sourceCode = context.sourceCode
                const globalScope = sourceCode.getScope(sourceCode.ast)
                // Legacy mode so ESM named imports (`import { resolve }`)
                // are tracked the same way as CJS destructuring.
                const tracker = new ReferenceTracker(globalScope, {
                    mode: "legacy",
                })

                const references = [
                    ...tracker.iterateCjsReferences(traceMap),
                    ...tracker.iterateEsmReferences(traceMap),
                ]

                for (const { node } of references) {
                    if (
                        node.type === "CallExpression" &&
                        isCwdEquivalentCall(node, globalScope)
                    ) {
                        context.report({
                            node,
                            messageId: "preferProcessCwd",
                            fix(fixer) {
                                return fixer.replaceText(node, "process.cwd()")
                            },
                        })
                    }
                }
            },
        }
    },
}
