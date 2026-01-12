/**
 * @author Toru Nagashima
 * See LICENSE file in root directory for full license.
 */
import { checkExistence, messages } from "../util/check-existence.js"
import getAllowModules from "../util/get-allow-modules.js"
import getResolvePaths from "../util/get-resolve-paths.js"
import getResolverConfig from "../util/get-resolver-config.js"
import getTryExtensions from "../util/get-try-extensions.js"
import getTSConfig from "../util/get-tsconfig.js"
import getTypescriptExtensionMap from "../util/get-typescript-extension-map.js"
import visitImport from "../util/visit-import.js"

/**
 * @typedef {[
 *   {
 *     allowModules?: import('../util/get-allow-modules').AllowModules;
 *     resolvePaths?: import('../util/get-resolve-paths').ResolvePaths;
 *     resolverConfig?: import('../util/get-resolver-config').ResolverConfig;
 *     tryExtensions?: import('../util/get-try-extensions').TryExtensions;
 *     ignoreTypeImport?: boolean;
 *     tsconfigPath?: import('../util/get-tsconfig').TSConfigPath;
 *     typescriptExtensionMap?: import('../util/get-typescript-extension-map').TypescriptExtensionMap;
 *   }?
 * ]} RuleOptions
 */
/** @type {import('./rule-module').RuleModule<{RuleOptions: RuleOptions}>} */
export default {
    meta: {
        docs: {
            description:
                "disallow `import` declarations which import missing modules",
            recommended: true,
            url: "https://github.com/eslint-community/eslint-plugin-n/blob/HEAD/docs/rules/no-missing-import.md",
        },
        type: "problem",
        fixable: null,
        schema: [
            {
                type: "object",
                properties: {
                    allowModules: getAllowModules.schema,
                    resolvePaths: getResolvePaths.schema,
                    resolverConfig: getResolverConfig.schema,
                    tryExtensions: getTryExtensions.schema,
                    ignoreTypeImport: { type: "boolean", default: false },
                    tsconfigPath: getTSConfig.schema,
                    typescriptExtensionMap: getTypescriptExtensionMap.schema,
                },
                additionalProperties: false,
            },
        ],
        messages,
    },
    create(context) {
        const options = context.options[0] ?? {}
        const ignoreTypeImport = options.ignoreTypeImport ?? false

        const filePath = context.filename ?? context.getFilename()
        if (filePath === "<input>") {
            return {}
        }

        return visitImport(context, { ignoreTypeImport }, targets => {
            checkExistence(context, targets)
        })
    },
}
