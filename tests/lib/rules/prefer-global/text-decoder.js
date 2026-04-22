/**
 * @author Toru Nagashima
 * See LICENSE file in root directory for full license.
 */


import { RuleTester } from "#test-helpers";
import rule from "../../../../lib/rules/prefer-global/text-decoder.js";

const provideModuleMethods = ["require", "process.getBuiltinModule"]

new RuleTester().run("prefer-global/text-decoder", rule, {
    valid: [
        "var b = new TextDecoder(s)",
        {
            code: "var b = new TextDecoder(s)",
            options: ["always"],
        },
        ...provideModuleMethods.flatMap(method => [
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
        ...provideModuleMethods.flatMap(method => [
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
