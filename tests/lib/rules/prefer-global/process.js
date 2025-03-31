/**
 * @author Toru Nagashima
 * See LICENSE file in root directory for full license.
 */
"use strict"

const RuleTester = require("#test-helpers").RuleTester
const rule = require("../../../../lib/rules/prefer-global/process")

const cjsMethods = [`require`, "process.getBuiltinModule"]

new RuleTester().run("prefer-global/process", rule, {
    valid: [
        "process.exit(0)",
        {
            code: "process.exit(0)",
            options: ["always"],
        },
        {
            code: "var process = require('process'); process.exit(0)",
            options: ["never"],
        },
        {
            code: "var process = require('node:process'); process.exit(0)",
            options: ["never"],
        },
        {
            code: "process.getBuiltinModule('buffer')",
            options: ["always"],
        },
    ],
    invalid: [
        ...cjsMethods.flatMap(method => [
            {
                code: `var process_ = ${method}('process'); process_.exit(0)`,
                errors: [{ messageId: "preferGlobal" }],
            },
            {
                code: `var process_ = ${method}('node:process'); process_.exit(0)`,
                errors: [{ messageId: "preferGlobal" }],
            },
            {
                code: `var process_ = ${method}('process'); process_.exit(0)`,
                options: ["always"],
                errors: [{ messageId: "preferGlobal" }],
            },
            {
                code: `var process_ = ${method}('node:process'); process_.exit(0)`,
                options: ["always"],
                errors: [{ messageId: "preferGlobal" }],
            },
        ]),
        {
            code: "process.exit(0)",
            options: ["never"],
            errors: [{ messageId: "preferModule" }],
        },
    ],
})
