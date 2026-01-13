import { createRequire } from "node:module";
const require = createRequire(import.meta.url);
/**
 * @author Toru Nagashima
 * See LICENSE file in root directory for full license.
 */
import { ReferenceTracker } from "@eslint-community/eslint-utils"
const {
    checkUnsupportedBuiltins,
    checkUnsupportedBuiltinReferences,
    messages,
} = require("../../util/check-unsupported-builtins")
import enumeratePropertyNames from "../../util/enumerate-property-names.js"
import getConfiguredNodeVersion from "../../util/get-configured-node-version.js"
import { getSourceCode } from "../../util/eslint-compat.js"

const {
    NodeBuiltinGlobals,
    NodeBuiltinModules,
    NodeBuiltinImportMeta,
} = require("../../unsupported-features/node-builtins.js")

const traceMap = {
    globals: NodeBuiltinGlobals,
    modules: NodeBuiltinModules,
}

/** @type {import('../rule-module').RuleModule} */
export default {
    meta: {
        docs: {
            description:
                "disallow unsupported Node.js built-in APIs on the specified version",
            recommended: true,
            url: "https://github.com/eslint-community/eslint-plugin-n/blob/HEAD/docs/rules/no-unsupported-features/node-builtins.md",
        },
        type: "problem",
        fixable: null,
        schema: [
            {
                type: "object",
                properties: {
                    version: getConfiguredNodeVersion.schema,
                    allowExperimental: { type: "boolean" },
                    ignores: {
                        type: "array",
                        items: {
                            enum: Array.from(
                                new Set([
                                    ...enumeratePropertyNames(traceMap.globals),
                                    ...enumeratePropertyNames(traceMap.modules),
                                    ...[
                                        ...enumeratePropertyNames(
                                            NodeBuiltinImportMeta
                                        ),
                                    ].map(s => `import.meta.${s}`),
                                ])
                            ),
                        },
                        uniqueItems: true,
                    },
                },
                additionalProperties: false,
            },
        ],
        messages,
    },
    create(context) {
        const sourceCode = getSourceCode(context)
        const tracker = new ReferenceTracker(
            /** @type {NonNullable<typeof sourceCode.scopeManager.globalScope>} */ (
                sourceCode.scopeManager.globalScope
            )
        )
        return {
            "Program:exit"() {
                checkUnsupportedBuiltins(context, traceMap)
            },
            "MetaProperty:exit"(node) {
                if (
                    node.meta.name !== "import" ||
                    node.property.name !== "meta"
                ) {
                    return
                }

                const references = [
                    ...tracker.iteratePropertyReferences(
                        node,
                        NodeBuiltinImportMeta
                    ),
                ].map(reference => {
                    return {
                        ...reference,
                        path: ["import.meta", ...reference.path],
                    }
                })
                checkUnsupportedBuiltinReferences(context, references)
            },
        }
    },
}
