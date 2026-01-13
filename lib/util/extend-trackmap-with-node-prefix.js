import { isBuiltin } from "node:module"

/**
 * Extend traceMap.modules with `node:` prefixed modules
 * @template {import('@eslint-community/eslint-utils').TraceMap<*>} TraceMap
 * @param {TraceMap} modules Like `{assert: foo}`
 * @returns {TraceMap} Like `{assert: foo}, "node:assert": foo}`
 */
export default function extendTraceMapWithNodePrefix(modules) {
    const ret = {
        ...modules,
        ...Object.fromEntries(
            Object.entries(modules)
                .map(([name, value]) => [`node:${name}`, value])
                .filter(([name]) => typeof name === "string" && isBuiltin(name))
        ),
    }
    return ret
}
