/**
 * @author Toru Nagashima <https://github.com/mysticatea>
 * See LICENSE file in root directory for full license.
 */


import { RuleTester } from "#test-helpers";
import rule from "../../../lib/rules/no-exports-assign.js";

new RuleTester({
    languageOptions: {
        globals: {
            exports: "writable",
            module: "readonly",
        },
    },
}).run("no-exports-assign", rule, {
    valid: [
        "module.exports.foo = 1",
        "exports.bar = 1",
        "module.exports = exports = {}",
        "exports = module.exports = {}",
        "function f(exports) { exports = {} }",
    ],
    invalid: [
        {
            code: "exports = {}",
            errors: [
                "Unexpected assignment to 'exports' variable. Use 'module.exports' instead.",
            ],
        },
    ],
})
