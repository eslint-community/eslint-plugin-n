/** See LICENSE file in root directory for full license. */

import {
    CALL,
    READ,
    ReferenceTracker,
    findVariable,
    getPropertyName,
    getStaticValue,
} from "@eslint-community/eslint-utils"
import { iterateProcessGetBuiltinModuleReferences } from "../util/iterate-process-get-builtin-module-references.js"

const methods = [
    "exec",
    "execFile",
    "execSync",
    "execFileSync",
    "spawn",
    "spawnSync",
    "fork",
]
const childProcess = Object.fromEntries(
    methods.map(name => [name, { [CALL]: name, [READ]: name }])
)
const traceMap = {
    child_process: childProcess,
    "node:child_process": childProcess,
}
const promisify = { promisify: { [CALL]: true } }
const utilMap = { util: promisify, "node:util": promisify }

/** @type {import('./rule-module.js').RuleModule} */
export default {
    meta: {
        type: "problem",
        docs: {
            description: "require a timeout or signal for child processes",
            recommended: false,
            url: "https://github.com/eslint-community/eslint-plugin-n/blob/HEAD/docs/rules/require-child-process-timeout.md",
        },
        schema: [],
        messages: {
            missingTimeout:
                "Pass a positive timeout to '{{name}}()' to bound its execution.",
            missingTimeoutOrSignal:
                "Pass a positive timeout or an AbortSignal to '{{name}}()' to bound its execution.",
        },
    },
    create(context) {
        /** @param {import('estree').Node} node */
        function scopeOf(node) {
            return context.sourceCode.getScope(node)
        }

        /**
         * Skip bindings that may no longer refer to the imported API or options.
         * @param {import('estree').Node} node
         * @param {Set<import('eslint').Scope.Variable>} [seen]
         * @returns {boolean}
         */
        function isModified(node, seen = new Set()) {
            if (node.type === "MemberExpression") {
                return isModified(node.object, seen)
            }
            if (node.type !== "Identifier") return false
            const variable = findVariable(scopeOf(node), node)
            if (!variable || seen.has(variable)) return false
            seen.add(variable)
            for (const reference of variable.references) {
                if (reference.isWrite() && !reference.init) return true
                let target = /** @type {import('eslint').Rule.Node} */ (
                    reference.identifier
                )
                let parent = target.parent
                while (
                    parent?.type === "MemberExpression" &&
                    parent.object === target
                ) {
                    target = parent
                    parent = target.parent
                }
                if (
                    (parent?.type === "AssignmentExpression" &&
                        parent.left === target) ||
                    parent?.type === "UpdateExpression" ||
                    (parent?.type === "UnaryExpression" &&
                        parent.operator === "delete")
                )
                    return true
            }
            return variable.defs.some(
                definition =>
                    definition.type === "Variable" &&
                    definition.node.init != null &&
                    isModified(definition.node.init, seen)
            )
        }

        /**
         * Resolve unchanged local options and callback aliases, without evaluating code.
         * @param {import('estree').Node} node
         * @param {Set<import('eslint').Scope.Variable>} [seen]
         * @returns {import('estree').Node | undefined}
         */
        function resolve(node, seen = new Set()) {
            if (node.type !== "Identifier") return node
            const variable = findVariable(scopeOf(node), node)
            if (!variable || seen.has(variable) || isModified(node))
                return undefined
            seen.add(variable)
            const definition = variable.defs[0]
            if (definition?.type === "FunctionName") return definition.node
            if (
                definition?.type === "Variable" &&
                definition.node.id.type === "Identifier" &&
                definition.node.init
            )
                return resolve(definition.node.init, seen)
            return undefined
        }

        /**
         * @param {import('estree').Node} node
         * @returns {boolean}
         */
        function isCallback(node) {
            const value = resolve(node)
            return (
                value?.type === "FunctionExpression" ||
                value?.type === "ArrowFunctionExpression" ||
                value?.type === "FunctionDeclaration"
            )
        }

        /**
         * Only report options that are provably unbounded. Unknown spreads or
         * computed properties can supply either option, in property order.
         * @param {import('estree').Node | undefined} node
         * @param {boolean} sync
         * @returns {boolean}
         */
        function isUnbounded(node, sync) {
            if (!node || isCallback(node)) return true
            const value = getStaticValue(node, scopeOf(node))
            if (value && value.value == null) return true
            const options = resolve(node)
            if (options?.type !== "ObjectExpression") return false
            /** @type {boolean | undefined} */
            let timeout = false
            /** @type {boolean | undefined} */
            let signal = false
            for (const property of options.properties) {
                const key =
                    property.type === "Property"
                        ? getPropertyName(property, scopeOf(property))
                        : null
                if (key == null) {
                    timeout = signal = undefined
                } else if (key === "timeout" || key === "signal") {
                    const constant =
                        property.type === "Property" && property.kind === "init"
                            ? getStaticValue(property.value, scopeOf(property))
                            : null
                    const bounded =
                        constant == null
                            ? undefined
                            : key === "timeout"
                              ? typeof constant.value === "number" &&
                                Number.isFinite(constant.value) &&
                                constant.value > 0
                              : constant.value != null &&
                                typeof constant.value === "object"
                    if (key === "timeout") timeout = bounded
                    else signal = bounded
                }
            }
            return timeout === false && (sync || signal === false)
        }

        /**
         * @param {import('estree').CallExpression} node
         * @param {string} name
         */
        function checkCall(node, name) {
            if (
                !node.arguments.length ||
                node.arguments.some(arg => arg.type === "SpreadElement") ||
                isModified(node.callee)
            )
                return
            let options = node.arguments[1]
            if (name !== "exec" && name !== "execSync" && options) {
                const second = resolve(options)
                const constant = getStaticValue(options, scopeOf(options))
                if (
                    second?.type === "ArrayExpression" ||
                    (constant &&
                        (Array.isArray(constant.value) ||
                            constant.value == null))
                ) {
                    options = node.arguments[2]
                } else if (
                    second?.type !== "ObjectExpression" &&
                    !isCallback(options)
                ) {
                    // An unknown second argument might be either args or options.
                    return
                }
            }
            const sync = name.endsWith("Sync")
            if (isUnbounded(options, sync)) {
                context.report({
                    node,
                    messageId: sync
                        ? "missingTimeout"
                        : "missingTimeoutOrSignal",
                    data: { name },
                })
            }
        }

        return {
            "Program:exit"() {
                const tracker = new ReferenceTracker(
                    scopeOf(context.sourceCode.ast),
                    { mode: "legacy" }
                )
                /**
                 * @template T
                 * @param {import('@eslint-community/eslint-utils').TraceMap<T>} map
                 */
                function references(map) {
                    return [
                        ...tracker.iterateCjsReferences(map),
                        ...tracker.iterateEsmReferences(map),
                        ...iterateProcessGetBuiltinModuleReferences(
                            tracker,
                            map
                        ),
                    ]
                }
                const refs = references(traceMap)
                const expressions = new Map()
                const bindings = new Map()
                for (const { node, type, info } of refs) {
                    if (type === CALL && node.type === "CallExpression")
                        checkCall(node, info)
                    if (type !== READ) continue
                    expressions.set(node, info)
                    const binding =
                        node.type === "ImportSpecifier"
                            ? node.local
                            : node.type === "Property" &&
                                node.value.type === "Identifier"
                              ? node.value
                              : null
                    if (binding)
                        bindings.set(
                            findVariable(scopeOf(binding), binding),
                            info
                        )
                }

                /**
                 * @param {import('estree').Node} node
                 * @param {Set<import('estree').Node>} [seen]
                 * @returns {string | undefined}
                 */
                function methodName(node, seen = new Set()) {
                    if (seen.has(node) || isModified(node)) return undefined
                    seen.add(node)
                    if (expressions.has(node)) return expressions.get(node)
                    if (node.type !== "Identifier") return undefined
                    const variable = findVariable(scopeOf(node), node)
                    if (bindings.has(variable)) return bindings.get(variable)
                    const value = resolve(node)
                    return value ? methodName(value, seen) : undefined
                }

                for (const { node } of references(utilMap)) {
                    if (
                        node.type !== "CallExpression" ||
                        isModified(node.callee) ||
                        node.arguments.length !== 1
                    )
                        continue
                    const argument = node.arguments[0]
                    if (!argument) continue
                    const name = methodName(argument)
                    if (name !== "exec" && name !== "execFile") continue
                    for (const reference of tracker.iteratePropertyReferences(
                        node,
                        { [CALL]: name }
                    )) {
                        if (reference.node.type === "CallExpression")
                            checkCall(reference.node, name)
                    }
                }
            },
        }
    },
}
