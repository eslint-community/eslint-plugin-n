/**
 * @author Jamund Ferguson
 * See LICENSE file in root directory for full license.
 */


import { RuleTester } from "#test-helpers";
import rule from "../../../lib/rules/no-callback-literal.js";
import tsParser from "@typescript-eslint/parser";

const ruleTester = new RuleTester()
ruleTester.run("no-callback-literal", rule, {
    valid: [
        // random stuff
        "horse()",
        "sort(null)",
        'require("zyx")',
        'require("zyx", data)',

        // callback()
        "callback()",
        "callback(undefined)",
        "callback(null)",
        "callback(x)",
        'callback(new Error("error"))',
        "callback(friendly, data)",
        "callback(undefined, data)",
        "callback(null, data)",
        "callback(x, data)",
        'callback(new Error("error"), data)',
        "callback(x = obj, data)",
        "callback((1, a), data)",
        "callback(a || b, data)",
        "callback(a ? b : c, data)",
        "callback(a ? 1 : c, data)",
        "callback(a ? b : 1, data)",

        // cb()
        "cb()",
        "cb(undefined)",
        "cb(null)",
        'cb(undefined, "super")',
        'cb(null, "super")',
        // https://github.com/eslint-community/eslint-plugin-n/issues/162
        {
            code: "cb(e as Error)",
            languageOptions: { parser: tsParser },
        },
    ],

    invalid: [
        // callback
        {
            code: 'callback(false, "snork")',
            errors: [
                {
                    message:
                        "Unexpected literal in error position of callback.",
                },
            ],
        },
        {
            code: 'callback("help")',
            errors: [
                {
                    message:
                        "Unexpected literal in error position of callback.",
                },
            ],
        },
        {
            code: 'callback("help", data)',
            errors: [
                {
                    message:
                        "Unexpected literal in error position of callback.",
                },
            ],
        },

        // cb
        {
            code: "cb(false)",
            errors: [
                {
                    message:
                        "Unexpected literal in error position of callback.",
                },
            ],
        },
        {
            code: 'cb("help")',
            errors: [
                {
                    message:
                        "Unexpected literal in error position of callback.",
                },
            ],
        },
        {
            code: 'cb("help", data)',
            errors: [
                {
                    message:
                        "Unexpected literal in error position of callback.",
                },
            ],
        },
        {
            code: "callback((a, 1), data)",
            errors: [
                {
                    message:
                        "Unexpected literal in error position of callback.",
                },
            ],
        },
    ],
})
