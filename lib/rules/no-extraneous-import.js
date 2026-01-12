/**
 * @author Toru Nagashima
 * See LICENSE file in root directory for full license.
 */
import { checkExtraneous, messages } from "../util/check-extraneous.js"
import getAllowModules from "../util/get-allow-modules.js"
import getConvertPath from "../util/get-convert-path.js"
import getResolvePaths from "../util/get-resolve-paths.js"
import getResolverConfig from "../util/get-resolver-config.js"
import visitImport from "../util/visit-import.js"

/** @type {import('./rule-module').RuleModule} */
export default {
    meta: {
        docs: {
            description:
                "disallow `import` declarations which import extraneous modules",
            recommended: true,
            url: "https://github.com/eslint-community/eslint-plugin-n/blob/HEAD/docs/rules/no-extraneous-import.md",
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

        return visitImport(context, {}, targets => {
            checkExtraneous(context, filePath, targets)
        })
    },
}
