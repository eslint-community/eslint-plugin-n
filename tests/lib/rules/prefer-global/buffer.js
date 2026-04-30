/**
 * @author Toru Nagashima
 * See LICENSE file in root directory for full license.
 */

import { RuleTester } from "#test-helpers"
import rule from "../../../../lib/rules/prefer-global/buffer.js"

const provideModuleMethods = ["require", "process.getBuiltinModule"]

new RuleTester().run("prefer-global/buffer", rule, {
    valid: [
        "var b = Buffer.alloc(10)",
        {
            code: "var b = Buffer.alloc(10)",
            options: ["always"],
        },
        ...provideModuleMethods.flatMap(method => [
            {
                code: `var { Buffer } = ${method}('buffer'); var b = Buffer.alloc(10)`,
                options: ["never"],
            },
            {
                code: `var { Buffer } = ${method}('node:buffer'); var b = Buffer.alloc(10)`,
                options: ["never"],
            },
        ]),
    ],
    invalid: [
        ...provideModuleMethods.flatMap(method => [
            {
                code: `var { Buffer } = ${method}('buffer'); var b = Buffer.alloc(10)`,
                errors: [{ messageId: "preferGlobal" }],
            },
            {
                code: `var { Buffer } = ${method}('node:buffer'); var b = Buffer.alloc(10)`,
                errors: [{ messageId: "preferGlobal" }],
            },
            {
                code: `var { Buffer } = ${method}('buffer'); var b = Buffer.alloc(10)`,
                options: ["always"],
                errors: [{ messageId: "preferGlobal" }],
            },
            {
                code: `var { Buffer } = ${method}('node:buffer'); var b = Buffer.alloc(10)`,
                options: ["always"],
                errors: [{ messageId: "preferGlobal" }],
            },
        ]),
        {
            code: "var b = Buffer.alloc(10)",
            options: ["never"],
            errors: [{ messageId: "preferModule" }],
        },
    ],
})
