/**
 * @author Pixel998
 * See LICENSE file in root directory for full license.
 */
"use strict"

const RuleTester = require("#test-helpers").RuleTester
const rule = require("../../../../lib/rules/prefer-global/crypto")

const provideModuleMethods = ["require", "process.getBuiltinModule"]

new RuleTester().run("prefer-global/crypto", rule, {
    valid: [
        "crypto.randomUUID()",
        {
            code: "crypto.randomUUID()",
            options: ["always"],
        },
        ...provideModuleMethods.flatMap(method => [
            {
                code: `var { webcrypto } = ${method}('crypto'); webcrypto.randomUUID()`,
                options: ["never"],
            },
            {
                code: `var { webcrypto } = ${method}('node:crypto'); webcrypto.randomUUID()`,
                options: ["never"],
            },
        ]),
    ],
    invalid: [
        ...provideModuleMethods.flatMap(method => [
            {
                code: `var { webcrypto } = ${method}('crypto'); webcrypto.randomUUID()`,
                errors: [{ messageId: "preferGlobal" }],
            },
            {
                code: `var { webcrypto } = ${method}('node:crypto'); webcrypto.randomUUID()`,
                errors: [{ messageId: "preferGlobal" }],
            },
            {
                code: `var { webcrypto } = ${method}('crypto'); webcrypto.randomUUID()`,
                options: ["always"],
                errors: [{ messageId: "preferGlobal" }],
            },
            {
                code: `var { webcrypto } = ${method}('node:crypto'); webcrypto.randomUUID()`,
                options: ["always"],
                errors: [{ messageId: "preferGlobal" }],
            },
        ]),
        {
            code: "crypto.randomUUID()",
            options: ["never"],
            errors: [{ messageId: "preferModule" }],
        },
    ],
})
