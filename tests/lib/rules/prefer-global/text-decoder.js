/**
 * @author Toru Nagashima
 * See LICENSE file in root directory for full license.
 */
"use strict"

const RuleTester = require("#test-helpers").RuleTester
const rule = require("../../../../lib/rules/prefer-global/text-decoder")

new RuleTester().run("prefer-global/text-decoder", rule, {
    valid: [
        "var b = new TextDecoder(s)",
        {
            code: "var b = new TextDecoder(s)",
            options: ["always"],
        },
        {
            code: "var { TextDecoder } = require('util'); var b = new TextDecoder(s)",
            options: ["never"],
        },
        {
            code: "var { TextDecoder } = require('node:util'); var b = new TextDecoder(s)",
            options: ["never"],
        },
    ],
    invalid: [
        {
            code: "var { TextDecoder } = require('util'); var b = new TextDecoder(s)",
            errors: [{ messageId: "preferGlobal" }],
        },
        {
            code: "var { TextDecoder } = require('node:util'); var b = new TextDecoder(s)",
            errors: [{ messageId: "preferGlobal" }],
        },
        {
            code: "var { TextDecoder } = require('util'); var b = new TextDecoder(s)",
            options: ["always"],
            errors: [{ messageId: "preferGlobal" }],
        },
        {
            code: "var { TextDecoder } = require('node:util'); var b = new TextDecoder(s)",
            options: ["always"],
            errors: [{ messageId: "preferGlobal" }],
        },
        {
            code: "var b = new TextDecoder(s)",
            options: ["never"],
            errors: [{ messageId: "preferModule" }],
        },
    ],
})
