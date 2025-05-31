/**
 * @author Toru Nagashima
 * See LICENSE file in root directory for full license.
 */
"use strict"

const RuleTester = require("#test-helpers").RuleTester
const rule = require("../../../../lib/rules/prefer-global/url")

const provideModuleMethods = ["require", "process.getBuiltinModule"]

new RuleTester().run("prefer-global/url", rule, {
    valid: [
        "var b = new URL(s)",
        {
            code: "var b = new URL(s)",
            options: ["always"],
        },
        ...provideModuleMethods.flatMap(method => [
            {
                code: `var { URL } = ${method}('url'); var b = new URL(s)`,
                options: ["never"],
            },
            {
                code: `var { URL } = ${method}('node:url'); var b = new URL(s)`,
                options: ["never"],
            },
        ]),
    ],
    invalid: [
        ...provideModuleMethods.flatMap(method => [
            {
                code: `var { URL } = ${method}('url'); var b = new URL(s)`,
                errors: [{ messageId: "preferGlobal" }],
            },
            {
                code: `var { URL } = ${method}('node:url'); var b = new URL(s)`,
                errors: [{ messageId: "preferGlobal" }],
            },
            {
                code: `var { URL } = ${method}('url'); var b = new URL(s)`,
                options: ["always"],
                errors: [{ messageId: "preferGlobal" }],
            },
            {
                code: `var { URL } = ${method}('node:url'); var b = new URL(s)`,
                options: ["always"],
                errors: [{ messageId: "preferGlobal" }],
            },
        ]),
        {
            code: "var b = new URL(s)",
            options: ["never"],
            errors: [{ messageId: "preferModule" }],
        },
    ],
})
