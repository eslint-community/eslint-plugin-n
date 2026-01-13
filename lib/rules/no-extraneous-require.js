import { createRequire } from "node:module";
const require = createRequire(import.meta.url);
/**
 * @author Toru Nagashima
 * See LICENSE file in root directory for full license.
 */
import { checkExtraneous, messages } from "../util/check-extraneous.js"
import getAllowModules from "../util/get-allow-modules.js"
import getConvertPath from "../util/get-convert-path.js"
import getResolvePaths from "../util/get-resolve-paths.js"
import getResolverConfig from "../util/get-resolver-config.js"
import getTryExtensions from "../util/get-try-extensions.js"
import visitRequire from "../util/visit-require.js"

/** @type {import('./rule-module').RuleModule} */
export default {
    meta: {
        docs: {
            description:
                "disallow `require()` expressions which import extraneous modules",
            recommended: true,
            url: "https://github.com/eslint-community/eslint-plugin-n/blob/HEAD/docs/rules/no-extraneous-require.md",
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
            checkExtraneous(context, filePath, targets)
        })
    },
}
