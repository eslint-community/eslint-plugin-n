/**
 * @author Toru Nagashima
 * See LICENSE file in root directory for full license.
 */
"use strict"

const RuleTester = require("#test-helpers").RuleTester
const rule = require("../../../../lib/rules/prefer-global/text-decoder")

const cjsMethods = [`require`, "process.getBuiltinModule"]

new RuleTester().run("prefer-global/text-decoder", rule, {
    valid: [
        "var b = new TextDecoder(s)",
        {
            code: "var b = new TextDecoder(s)",
            options: ["always"],
        },
        ...cjsMethods.flatMap(method => [
            {
                code: `var { TextDecoder } = ${method}('util'); var b = new TextDecoder(s)`,
                options: ["never"],
            },
            {
                code: `var { TextDecoder } = ${method}('node:util'); var b = new TextDecoder(s)`,
                options: ["never"],
            },
        ]),
    ],
    invalid: [
        ...cjsMethods.flatMap(method => [
            {
                code: `var { TextDecoder } = ${method}('util'); var b = new TextDecoder(s)`,
                errors: [{ messageId: "preferGlobal" }],
            },
            {
                code: `var { TextDecoder } = ${method}('node:util'); var b = new TextDecoder(s)`,
                errors: [{ messageId: "preferGlobal" }],
            },
            {
                code: `var { TextDecoder } = ${method}('util'); var b = new TextDecoder(s)`,
                options: ["always"],
                errors: [{ messageId: "preferGlobal" }],
            },
            {
                code: `var { TextDecoder } = ${method}('node:util'); var b = new TextDecoder(s)`,
                options: ["always"],
                errors: [{ messageId: "preferGlobal" }],
            },
        ]),
        {
            code: "var b = new TextDecoder(s)",
            options: ["never"],
            errors: [{ messageId: "preferModule" }],
        },
    ],
})
