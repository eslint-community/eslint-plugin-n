/**
 * @author Pixel998
 * See LICENSE file in root directory for full license.
 */
"use strict"

const RuleTester = require("#test-helpers").RuleTester
const rule = require("../../../../lib/rules/prefer-global/timers")

const provideModuleMethods = ["require", "process.getBuiltinModule"]

new RuleTester().run("prefer-global/timers", rule, {
    valid: [
        "clearImmediate(id)",
        "clearInterval(id)",
        "clearTimeout(id)",
        "setImmediate(() => {})",
        "setInterval(() => {}, 1000)",
        "setTimeout(() => {}, 1000)",
        {
            code: "clearImmediate(id)",
            options: ["always"],
        },
        {
            code: "clearInterval(id)",
            options: ["always"],
        },
        {
            code: "clearTimeout(id)",
            options: ["always"],
        },
        {
            code: "setImmediate(() => {})",
            options: ["always"],
        },
        {
            code: "setInterval(() => {}, 1000)",
            options: ["always"],
        },
        {
            code: "setTimeout(() => {}, 1000)",
            options: ["always"],
        },
        ...provideModuleMethods.flatMap(method => [
            {
                code: `const { clearImmediate } = ${method}('timers'); clearImmediate(id)`,
                options: ["never"],
            },
            {
                code: `const { clearImmediate } = ${method}('node:timers'); clearImmediate(id)`,
                options: ["never"],
            },
            {
                code: `const { clearInterval } = ${method}('timers'); clearInterval(id)`,
                options: ["never"],
            },
            {
                code: `const { clearInterval } = ${method}('node:timers'); clearInterval(id)`,
                options: ["never"],
            },
            {
                code: `const { clearTimeout } = ${method}('timers'); clearTimeout(id)`,
                options: ["never"],
            },
            {
                code: `const { clearTimeout } = ${method}('node:timers'); clearTimeout(id)`,
                options: ["never"],
            },
            {
                code: `const { setImmediate } = ${method}('timers'); setImmediate(() => {})`,
                options: ["never"],
            },
            {
                code: `const { setImmediate } = ${method}('node:timers'); setImmediate(() => {})`,
                options: ["never"],
            },
            {
                code: `const { setInterval } = ${method}('timers'); setInterval(() => {}, 1000)`,
                options: ["never"],
            },
            {
                code: `const { setInterval } = ${method}('node:timers'); setInterval(() => {}, 1000)`,
                options: ["never"],
            },
            {
                code: `const { setTimeout } = ${method}('timers'); setTimeout(() => {}, 1000)`,
                options: ["never"],
            },
            {
                code: `const { setTimeout } = ${method}('node:timers'); setTimeout(() => {}, 1000)`,
                options: ["never"],
            },
        ]),
    ],
    invalid: [
        ...provideModuleMethods.flatMap(method => [
            {
                code: `const { clearImmediate } = ${method}('timers'); clearImmediate(id)`,
                errors: [{ messageId: "preferGlobal" }],
            },
            {
                code: `const { clearImmediate } = ${method}('node:timers'); clearImmediate(id)`,
                errors: [{ messageId: "preferGlobal" }],
            },
            {
                code: `const { clearImmediate } = ${method}('timers'); clearImmediate(id)`,
                options: ["always"],
                errors: [{ messageId: "preferGlobal" }],
            },
            {
                code: `const { clearImmediate } = ${method}('node:timers'); clearImmediate(id)`,
                options: ["always"],
                errors: [{ messageId: "preferGlobal" }],
            },
            {
                code: `const { clearInterval } = ${method}('timers'); clearInterval(id)`,
                errors: [{ messageId: "preferGlobal" }],
            },
            {
                code: `const { clearInterval } = ${method}('node:timers'); clearInterval(id)`,
                errors: [{ messageId: "preferGlobal" }],
            },
            {
                code: `const { clearInterval } = ${method}('timers'); clearInterval(id)`,
                options: ["always"],
                errors: [{ messageId: "preferGlobal" }],
            },
            {
                code: `const { clearInterval } = ${method}('node:timers'); clearInterval(id)`,
                options: ["always"],
                errors: [{ messageId: "preferGlobal" }],
            },
            {
                code: `const { clearTimeout } = ${method}('timers'); clearTimeout(id)`,
                errors: [{ messageId: "preferGlobal" }],
            },
            {
                code: `const { clearTimeout } = ${method}('node:timers'); clearTimeout(id)`,
                errors: [{ messageId: "preferGlobal" }],
            },
            {
                code: `const { clearTimeout } = ${method}('timers'); clearTimeout(id)`,
                options: ["always"],
                errors: [{ messageId: "preferGlobal" }],
            },
            {
                code: `const { clearTimeout } = ${method}('node:timers'); clearTimeout(id)`,
                options: ["always"],
                errors: [{ messageId: "preferGlobal" }],
            },
            {
                code: `const { setImmediate } = ${method}('timers'); setImmediate(() => {})`,
                errors: [{ messageId: "preferGlobal" }],
            },
            {
                code: `const { setImmediate } = ${method}('node:timers'); setImmediate(() => {})`,
                errors: [{ messageId: "preferGlobal" }],
            },
            {
                code: `const { setImmediate } = ${method}('timers'); setImmediate(() => {})`,
                options: ["always"],
                errors: [{ messageId: "preferGlobal" }],
            },
            {
                code: `const { setImmediate } = ${method}('node:timers'); setImmediate(() => {})`,
                options: ["always"],
                errors: [{ messageId: "preferGlobal" }],
            },
            {
                code: `const { setInterval } = ${method}('timers'); setInterval(() => {}, 1000)`,
                errors: [{ messageId: "preferGlobal" }],
            },
            {
                code: `const { setInterval } = ${method}('node:timers'); setInterval(() => {}, 1000)`,
                errors: [{ messageId: "preferGlobal" }],
            },
            {
                code: `const { setInterval } = ${method}('timers'); setInterval(() => {}, 1000)`,
                options: ["always"],
                errors: [{ messageId: "preferGlobal" }],
            },
            {
                code: `const { setInterval } = ${method}('node:timers'); setInterval(() => {}, 1000)`,
                options: ["always"],
                errors: [{ messageId: "preferGlobal" }],
            },
            {
                code: `const { setTimeout } = ${method}('timers'); setTimeout(() => {}, 1000)`,
                errors: [{ messageId: "preferGlobal" }],
            },
            {
                code: `const { setTimeout } = ${method}('node:timers'); setTimeout(() => {}, 1000)`,
                errors: [{ messageId: "preferGlobal" }],
            },
            {
                code: `const { setTimeout } = ${method}('timers'); setTimeout(() => {}, 1000)`,
                options: ["always"],
                errors: [{ messageId: "preferGlobal" }],
            },
            {
                code: `const { setTimeout } = ${method}('node:timers'); setTimeout(() => {}, 1000)`,
                options: ["always"],
                errors: [{ messageId: "preferGlobal" }],
            },
        ]),
        {
            code: "clearImmediate(id)",
            options: ["never"],
            errors: [{ messageId: "preferModule" }],
        },
        {
            code: "clearInterval(id)",
            options: ["never"],
            errors: [{ messageId: "preferModule" }],
        },
        {
            code: "clearTimeout(id)",
            options: ["never"],
            errors: [{ messageId: "preferModule" }],
        },
        {
            code: "setImmediate(() => {})",
            options: ["never"],
            errors: [{ messageId: "preferModule" }],
        },
        {
            code: "setInterval(() => {}, 1000)",
            options: ["never"],
            errors: [{ messageId: "preferModule" }],
        },
        {
            code: "setTimeout(() => {}, 1000)",
            options: ["never"],
            errors: [{ messageId: "preferModule" }],
        },
    ],
})
