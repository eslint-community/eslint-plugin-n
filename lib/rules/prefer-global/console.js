import { createRequire } from "node:module";
const require = createRequire(import.meta.url);
/**
 * @author Toru Nagashima
 * See LICENSE file in root directory for full license.
 */
import { READ } from "@eslint-community/eslint-utils"
import checkForPreferGlobal from "../../util/check-prefer-global.js"

const traceMap = {
    globals: {
        console: { [READ]: true },
    },
    modules: {
        console: { [READ]: true },
        "node:console": { [READ]: true },
    },
}

/** @type {import('../rule-module').RuleModule} */
export default {
    meta: {
        docs: {
            description: 'enforce either `console` or `require("console")`',
            recommended: false,
            url: "https://github.com/eslint-community/eslint-plugin-n/blob/HEAD/docs/rules/prefer-global/console.md",
        },
        type: "suggestion",
        fixable: null,
        schema: [{ enum: ["always", "never"] }],
        messages: {
            preferGlobal:
                "Unexpected use of 'require(\"console\")'. Use the global variable 'console' instead.",
            preferModule:
                "Unexpected use of the global variable 'console'. Use 'require(\"console\")' instead.",
        },
    },

    create(context) {
        return {
            "Program:exit"() {
                checkForPreferGlobal(context, traceMap)
            },
        }
    },
}
