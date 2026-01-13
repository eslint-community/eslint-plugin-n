import { createRequire } from "node:module";
const require = createRequire(import.meta.url);
/**
 * @author Toru Nagashima
 * See LICENSE file in root directory for full license.
 */
import { checkPublish, messages } from "../util/check-publish.js"
import getAllowModules from "../util/get-allow-modules.js"
import getConvertPath from "../util/get-convert-path.js"
import getResolvePaths from "../util/get-resolve-paths.js"
import getResolverConfig from "../util/get-resolver-config.js"
import getTryExtensions from "../util/get-try-extensions.js"
import visitRequire from "../util/visit-require.js"

/**
 * @typedef {[
 *   {
 *     allowModules?: import('../util/get-allow-modules').AllowModules;
 *     convertPath?: import('../util/get-convert-path').ConvertPath;
 *     resolvePaths?: import('../util/get-resolve-paths').ResolvePaths;
 *     resolverConfig?: import('../util/get-resolver-config').ResolverConfig;
 *     tryExtensions?: import('../util/get-try-extensions').TryExtensions;
 *     ignorePrivate?: boolean;
 *   }?
 * ]} RuleOptions
 */
/** @type {import('./rule-module').RuleModule<{RuleOptions: RuleOptions}>} */
export default {
    meta: {
        docs: {
            description:
                "disallow `require()` expressions which import private modules",
            recommended: true,
            url: "https://github.com/eslint-community/eslint-plugin-n/blob/HEAD/docs/rules/no-unpublished-require.md",
        },
        type: "problem",
        fixable: null,
        schema: [
            {
                type: "object",
                properties: {
                    allowModules: getAllowModules.schema,
                    convertPath: getConvertPath.schema,
                    resolvePaths: getResolvePaths.schema,
                    resolverConfig: getResolverConfig.schema,
                    tryExtensions: getTryExtensions.schema,
                    ignorePrivate: { type: "boolean", default: true },
                },
                additionalProperties: false,
            },
        ],
        messages,
    },
    create(context) {
        const filePath = context.filename ?? context.getFilename()
        const options = context.options[0] || {}
        const ignorePrivate = options.ignorePrivate ?? true

        if (filePath === "<input>") {
            return {}
        }

        return visitRequire(context, {}, targets => {
            checkPublish(context, filePath, targets, { ignorePrivate })
        })
    },
}
