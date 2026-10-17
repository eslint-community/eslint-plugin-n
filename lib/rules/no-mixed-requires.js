/**
 * @author Raphael Pigulla
 * See LICENSE file in root directory for full license.
 */

import { isBuiltin } from "node:module"

/**
 * @typedef {[
 *   (
 *     | boolean
 *     | {
 *       grouping?: boolean;
 *       allowCall?: boolean;
 *     }
 *   )?
 * ]} RuleOptions
 */
/** @type {import('./rule-module.js').RuleModule<{RuleOptions: RuleOptions}>} */
export default {
    meta: {
        type: "suggestion",
        docs: {
            description:
                "disallow `require` calls to be mixed with regular variable declarations",
            recommended: false,
            url: "https://github.com/eslint-community/eslint-plugin-n/blob/HEAD/docs/rules/no-mixed-requires.md",
        },
        fixable: void 0,
        schema: [
            {
                oneOf: [
                    {
                        type: "boolean",
                    },
                    {
                        type: "object",
                        properties: {
                            grouping: {
                                type: "boolean",
                            },
                            allowCall: {
                                type: "boolean",
                            },
                        },
                        additionalProperties: false,
                    },
                ],
            },
        ],
        messages: {
            noMixRequire: "Do not mix 'require' and other declarations.",
            noMixCoreModuleFileComputed:
                "Do not mix core, module, file and computed requires.",
        },
    },
    create(context) {
        const options = context.options[0]
        let grouping = false
        let allowCall = false

        if (typeof options === "object") {
            grouping = options.grouping ?? false
            allowCall = options.allowCall ?? false
        } else {
            grouping = Boolean(options)
        }

        const DECL_REQUIRE = "require"
        const DECL_UNINITIALIZED = "uninitialized"
        const DECL_OTHER = "other"

        const REQ_CORE = "core"
        const REQ_FILE = "file"
        const REQ_MODULE = "module"
        const REQ_COMPUTED = "computed"

        /**
         * Determines the type of a declaration statement.
         * @param {import('estree').Node | undefined | null} initExpression The init node of the VariableDeclarator.
         * @returns {string} The type of declaration represented by the expression.
         */
        function getDeclarationType(initExpression) {
            if (!initExpression) {
                // "var x;"
                return DECL_UNINITIALIZED
            }

            if (
                initExpression.type === "CallExpression" &&
                initExpression.callee.type === "Identifier" &&
                initExpression.callee.name === "require"
            ) {
                // "var x = require('util');"
                return DECL_REQUIRE
            }
            if (
                allowCall &&
                initExpression.type === "CallExpression" &&
                initExpression.callee.type === "CallExpression"
            ) {
                // "var x = require('diagnose')('sub-module');"
                return getDeclarationType(initExpression.callee)
            }
            if (initExpression.type === "MemberExpression") {
                // "var x = require('glob').Glob;"
                return getDeclarationType(initExpression.object)
            }

            // "var x = 42;"
            return DECL_OTHER
        }

        /**
         * Determines the type of module that is loaded via require.
         * @param {import('estree').Expression | import('estree').Super} initExpression The init node of the VariableDeclarator.
         * @returns {string} The module type.
         */
        function inferModuleType(initExpression) {
            if (initExpression.type === "MemberExpression") {
                // "var x = require('glob').Glob;"
                return inferModuleType(initExpression.object)
            }

            if (initExpression.type !== "CallExpression") {
                return REQ_MODULE
            }

            if (initExpression.arguments.length === 0) {
                // "var x = require();"
                return REQ_COMPUTED
            }

            const arg = initExpression.arguments[0]

            if (arg?.type !== "Literal" || typeof arg.value !== "string") {
                // "var x = require(42);"
                return REQ_COMPUTED
            }

            if (isBuiltin(arg.value)) {
                // "var fs = require('fs');"
                return REQ_CORE
            }
            if (/^\.{0,2}\//u.test(arg.value)) {
                // "var utils = require('./utils');"
                return REQ_FILE
            }

            // "var async = require('async');"
            return REQ_MODULE
        }

        /**
         * Check if the list of variable declarations is mixed, i.e. whether it
         * contains both require and other declarations.
         * @param {import('estree').VariableDeclarator[]} declarations The list of VariableDeclarators.
         * @returns {boolean} True if the declarations are mixed, false if not.
         */
        function isMixed(declarations) {
            /** @type {Record<string, boolean>} */
            const contains = {}

            for (const declaration of declarations) {
                const type = getDeclarationType(declaration.init)

                contains[type] = true
            }

            return Boolean(
                contains[DECL_REQUIRE] &&
                (contains[DECL_UNINITIALIZED] || contains[DECL_OTHER])
            )
        }

        /**
         * Check if all require declarations in the given list are of the same
         * type.
         * @param {import('estree').VariableDeclarator[]} declarations The list of VariableDeclarators.
         * @returns {boolean} True if the declarations are grouped, false if not.
         */
        function isGrouped(declarations) {
            /** @type {Record<string, boolean>} */
            const found = {}

            for (const declaration of declarations) {
                if (
                    declaration.init != null &&
                    getDeclarationType(declaration.init) === DECL_REQUIRE
                ) {
                    found[inferModuleType(declaration.init)] = true
                }
            }

            return Object.keys(found).length <= 1
        }

        return {
            VariableDeclaration(node) {
                if (isMixed(node.declarations)) {
                    context.report({
                        node,
                        messageId: "noMixRequire",
                    })
                } else if (grouping && !isGrouped(node.declarations)) {
                    context.report({
                        node,
                        messageId: "noMixCoreModuleFileComputed",
                    })
                }
            },
        }
    },
}
