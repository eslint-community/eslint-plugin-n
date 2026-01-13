import { createRequire } from "node:module";
const require = createRequire(import.meta.url);
/**
 * @author Toru Nagashima
 * See LICENSE file in root directory for full license.
 */
import { checkExistence, messages } from "../util/check-existence.js"
import getAllowModules from "../util/get-allow-modules.js"
import getResolvePaths from "../util/get-resolve-paths.js"
import getResolverConfig from "../util/get-resolver-config.js"
import getTSConfig from "../util/get-tsconfig.js"
import getTryExtensions from "../util/get-try-extensions.js"
import getTypescriptExtensionMap from "../util/get-typescript-extension-map.js"
import visitRequire from "../util/visit-require.js"

/** @type {import('./rule-module').RuleModule} */
export default {
    meta: {
        docs: {
            description:
                "disallow `require()` expressions which import missing modules",
            recommended: true,
            url: "https://github.com/eslint-community/eslint-plugin-n/blob/HEAD/docs/rules/no-missing-require.md",
        },
        type: "problem",
        fixable: null,
        schema: [
            {
                type: "object",
                properties: {
                    allowModules: getAllowModules.schema,
                    tryExtensions: getTryExtensions.schema,
                    resolvePaths: getResolvePaths.schema,
                    resolverConfig: getResolverConfig.schema,
                    typescriptExtensionMap: getTypescriptExtensionMap.schema,
                    tsconfigPath: getTSConfig.schema,
                },
                additionalProperties: false,
            },
        ],
        messages,
    },
    create(context) {
        const filePath = context.filename ?? context.getFilename()
        if (filePath === "<input>") {
            return {}
        }

        return visitRequire(context, {}, targets => {
            checkExistence(context, targets)
        })
    },
}
