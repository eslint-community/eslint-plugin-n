/**
 * @author Toru Nagashima
 * See LICENSE file in root directory for full license.
 */


import { RuleTester } from "#test-helpers";
import rule from "../../../../lib/rules/prefer-global/url-search-params.js";

const provideModuleMethods = ["require", "process.getBuiltinModule"]

new RuleTester().run("prefer-global/url-search-params", rule, {
    valid: [
        "var b = new URLSearchParams(s)",
        {
            code: "var b = new URLSearchParams(s)",
            options: ["always"],
        },
        ...provideModuleMethods.flatMap(method => [
            {
                code: `var { URLSearchParams } = ${method}('url'); var b = new URLSearchParams(s)`,
                options: ["never"],
            },
            {
                code: `var { URLSearchParams } = ${method}('node:url'); var b = new URLSearchParams(s)`,
                options: ["never"],
            },
        ]),
    ],
    invalid: [
        ...provideModuleMethods.flatMap(method => [
            {
                code: `var { URLSearchParams } = ${method}('url'); var b = new URLSearchParams(s)`,
                errors: [{ messageId: "preferGlobal" }],
            },
            {
                code: `var { URLSearchParams } = ${method}('node:url'); var b = new URLSearchParams(s)`,
                errors: [{ messageId: "preferGlobal" }],
            },
            {
                code: `var { URLSearchParams } = ${method}('url'); var b = new URLSearchParams(s)`,
                options: ["always"],
                errors: [{ messageId: "preferGlobal" }],
            },
            {
                code: `var { URLSearchParams } = ${method}('node:url'); var b = new URLSearchParams(s)`,
                options: ["always"],
                errors: [{ messageId: "preferGlobal" }],
            },
        ]),
        {
            code: "var b = new URLSearchParams(s)",
            options: ["never"],
            errors: [{ messageId: "preferModule" }],
        },
    ],
})
