/**
 * @author Toru Nagashima
 * See LICENSE file in root directory for full license.
 */
"use strict"

const RuleTester = require("#test-helpers").RuleTester
const rule = require("../../../../lib/rules/prefer-global/text-encoder")

const cjsMethods = [`require`, "process.getBuiltinModule"]

new RuleTester().run("prefer-global/text-encoder", rule, {
    valid: [
        "var b = new TextEncoder(s)",
        {
            code: "var b = new TextEncoder(s)",
            options: ["always"],
        },
        ...cjsMethods.flatMap(method => [
            {
                code: `var { TextEncoder } = ${method}('util'); var b = new TextEncoder(s)`,
                options: ["never"],
            },
            {
                code: `var { TextEncoder } = ${method}('node:util'); var b = new TextEncoder(s)`,
                options: ["never"],
            },
        ]),
    ],
    invalid: [
        ...cjsMethods.flatMap(method => [
            {
                code: `var { TextEncoder } = ${method}('util'); var b = new TextEncoder(s)`,
                errors: [{ messageId: "preferGlobal" }],
            },
            {
                code: `var { TextEncoder } = ${method}('node:util'); var b = new TextEncoder(s)`,
                errors: [{ messageId: "preferGlobal" }],
            },
            {
                code: `var { TextEncoder } = ${method}('util'); var b = new TextEncoder(s)`,
                options: ["always"],
                errors: [{ messageId: "preferGlobal" }],
            },
            {
                code: `var { TextEncoder } = ${method}('node:util'); var b = new TextEncoder(s)`,
                options: ["always"],
                errors: [{ messageId: "preferGlobal" }],
            },
        ]),
        {
            code: "var b = new TextEncoder(s)",
            options: ["never"],
            errors: [{ messageId: "preferModule" }],
        },
    ],
})
