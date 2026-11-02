/** See LICENSE file in root directory for full license. */

import {
    CALL,
    ReferenceTracker,
    getPropertyName,
    getStaticValue,
} from "@eslint-community/eslint-utils"
import { iterateProcessGetBuiltinModuleReferences } from "../util/iterate-process-get-builtin-module-references.js"

const methods = ["execFile", "execFileSync", "spawn", "spawnSync"]
const childProcess = Object.fromEntries(
    methods.map(name => [name, { [CALL]: name }])
)
const traceMap = {
    child_process: childProcess,
    "node:child_process": childProcess,
}

/** @type {import('./rule-module.js').RuleModule} */
export default {
    meta: {
        type: "problem",
        docs: {
            description:
                "disallow arguments embedded in child process executable names",
            recommended: false,
            url: "https://github.com/eslint-community/eslint-plugin-n/blob/HEAD/docs/rules/prefer-spawn-args.md",
        },
        schema: [],
        messages: {
            separateArgs:
                "Pass the arguments to '{{name}}()' in a separate array instead of including them in the executable name.",
        },
    },
    create(context) {
        /** @param {import('estree').Node} node */
        function scopeOf(node) {
            return context.sourceCode.getScope(node)
        }

        /**
         * Determine whether shell mode is enabled. Unknown options could
         * enable a shell, so do not report them.
         * @param {import('estree').Node | undefined} options
         * @returns {boolean | null}
         */
        function shellOption(options) {
            if (!options) return false

            const constant = getStaticValue(options, scopeOf(options))
            if (constant && constant.value == null) return false
            if (
                constant &&
                typeof constant.value === "object" &&
                constant.value !== null &&
                !Array.isArray(constant.value)
            ) {
                const resolved = /** @type {{ shell?: unknown }} */ (
                    constant.value
                )
                return Boolean(resolved.shell)
            }
            if (options.type !== "ObjectExpression") return null

            /** @type {boolean | null} */
            let shell = false
            for (const property of options.properties) {
                if (property.type !== "Property") {
                    shell = null
                    continue
                }
                const name = getPropertyName(property, scopeOf(property))
                if (name == null) {
                    shell = null
                } else if (name === "shell") {
                    const value =
                        property.kind === "init"
                            ? getStaticValue(property.value, scopeOf(property))
                            : null
                    shell = value ? Boolean(value.value) : null
                }
            }
            return shell
        }

        /**
         * @param {import('estree').CallExpression} node
         * @param {string} name
         */
        function checkCall(node, name) {
            if (
                node.arguments.length === 0 ||
                node.arguments.some(arg => arg.type === "SpreadElement")
            ) {
                return
            }

            const command = node.arguments[0]
            if (!command || command.type === "SpreadElement") return
            const value = getStaticValue(command, scopeOf(command))
            if (
                typeof value?.value !== "string" ||
                !/\S\s+\S/u.test(value.value)
            ) {
                return
            }

            let options = node.arguments[1]
            if (options) {
                const second = getStaticValue(options, scopeOf(options))
                if (
                    options.type === "ArrayExpression" ||
                    Array.isArray(second?.value) ||
                    (second && second.value == null)
                ) {
                    options = node.arguments[2]
                } else if (
                    options.type !== "ObjectExpression" &&
                    !(second && typeof second.value === "object")
                ) {
                    // The second argument could be an args array or options.
                    return
                }
            }

            if (shellOption(options) !== false) return

            context.report({
                node: command,
                messageId: "separateArgs",
                data: { name },
            })
        }

        return {
            "Program:exit"() {
                const tracker = new ReferenceTracker(
                    scopeOf(context.sourceCode.ast),
                    { mode: "legacy" }
                )
                for (const { node, type, info } of [
                    ...tracker.iterateCjsReferences(traceMap),
                    ...tracker.iterateEsmReferences(traceMap),
                    ...iterateProcessGetBuiltinModuleReferences(
                        tracker,
                        traceMap
                    ),
                ]) {
                    if (type === CALL && node.type === "CallExpression") {
                        checkCall(node, info)
                    }
                }
            },
        }
    },
}
