/**
 * @author copilot
 * See LICENSE file in root directory for full license.
 */

import { CALL, ReferenceTracker } from "@eslint-community/eslint-utils"
import { iterateProcessGetBuiltinModuleReferences } from "../util/iterate-process-get-builtin-module-references.js"

/** @type {import('@eslint-community/eslint-utils').TraceMap<boolean>} */
const traceMap = {
    fs: {
        unlink: { [CALL]: true },
        rmdir: { [CALL]: true },
        unlinkSync: { [CALL]: true },
        rmdirSync: { [CALL]: true },
    },
    promises: {
        unlink: { [CALL]: true },
        rmdir: { [CALL]: true },
    },
}
// @ts-expect-error -- TraceMap properties are optional
traceMap.fs.promises = traceMap.promises
traceMap["node:fs"] = traceMap.fs
traceMap["fs/promises"] = traceMap.promises
traceMap["node:fs/promises"] = traceMap.promises

/** @type {import('./rule-module.js').RuleModule} */
export default {
    meta: {
        type: "suggestion",
        docs: {
            description: "enforce `fs.rm` over `fs.unlink` and `fs.rmdir`",
            recommended: false,
            url: "https://github.com/eslint-community/eslint-plugin-n/blob/HEAD/docs/rules/consistent-fs-deletion.md",
        },
        fixable: void 0,
        messages: {
            preferFsRm: "Use 'fs.rm' or 'fs.rmSync' instead of 'fs.{{name}}'.",
            preferFsRmPromises:
                "Use 'fs.promises.rm' instead of 'fs.promises.{{name}}'.",
        },
        schema: [],
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
                    ...iterateProcessGetBuiltinModuleReferences(
                        tracker,
                        traceMap
                    ),
                    ...tracker.iterateEsmReferences(traceMap),
                ]

                for (const { node, path } of references) {
                    const name = path.at(-1)
                    if (name == null) {
                        continue
                    }
                    const isPromises =
                        path.includes("promises") ||
                        (path[0] && path[0].includes("promises"))

                    context.report({
                        node,
                        messageId: isPromises
                            ? "preferFsRmPromises"
                            : "preferFsRm",
                        data: { name },
                    })
                }
            },
        }
    },
}
