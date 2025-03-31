/**
 * @author Toru Nagashima
 * See LICENSE file in root directory for full license.
 */
"use strict"

const RuleTester = require("#test-helpers").RuleTester
const rule = require("../../../../lib/rules/prefer-global/console")

const cjsMethods = [`require`, "process.getBuiltinModule"]

new RuleTester().run("prefer-global/console", rule, {
    valid: [
        "console.log(10)",
        {
            code: "console.log(10)",
            options: ["always"],
        },
        ...cjsMethods.flatMap(method => [
            {
                code: `var console = ${method}('console'); console.log(10)`,
                options: ["never"],
            },
            {
                code: `var console = ${method}('node:console'); console.log(10)`,
                options: ["never"],
            },
        ]),
    ],
    invalid: [
        ...cjsMethods.flatMap(method => [
            {
                code: `var console = ${method}('console'); console.log(10)`,
                errors: [{ messageId: "preferGlobal" }],
            },
            {
                code: `var console = ${method}('node:console'); console.log(10)`,
                errors: [{ messageId: "preferGlobal" }],
            },
            {
                code: `var console = ${method}('console'); console.log(10)`,
                options: ["always"],
                errors: [{ messageId: "preferGlobal" }],
            },
            {
                code: `var console = ${method}('node:console'); console.log(10)`,
                options: ["always"],
                errors: [{ messageId: "preferGlobal" }],
            },
        ]),
        {
            code: "console.log(10)",
            options: ["never"],
            errors: [{ messageId: "preferModule" }],
        },
    ],
})
