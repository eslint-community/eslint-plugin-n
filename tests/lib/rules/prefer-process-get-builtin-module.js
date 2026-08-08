/**
 * @author ColumbusLabs
 * See LICENSE file in root directory for full license.
 */

import { RuleTester } from "#test-helpers"
import rule from "../../../lib/rules/prefer-process-get-builtin-module.js"

new RuleTester({
    languageOptions: {
        ecmaVersion: 2022,
        sourceType: "module",
    },
}).run("prefer-process-get-builtin-module", rule, {
    valid: [
        'const fs = process.getBuiltinModule("node:fs")',
        'const fs = require("eslint")',
        "const fs = require(name)",
        "const fs = require(`node:${name}`)",
        'const fs = require("node:fs", extra)',
        'const fs = require?.("node:fs")',
        'const fs = require(...["node:fs"])',
        'const fs = other.require("node:fs")',
        'const fs = import("node:fs")',
        "const fs = await import(name)",
        'const fs = await import("eslint")',
        {
            code: 'const fs = require("node:fs")',
            options: [{ version: "20.15.1" }],
        },
        {
            code: 'const fs = await import("node:fs")',
            options: [{ version: "22.2.0" }],
        },
        {
            code: 'const fs = require("node:fs")',
            options: [{ version: "21.7.3" }],
        },
        {
            code: 'function load(process) { return require("node:fs") }',
            languageOptions: { sourceType: "script" },
        },
        {
            code: 'async function load(process) { return await import("node:fs") }',
        },
        'const process = {}; const fs = require("node:fs")',
        {
            code: 'function load(require) { return require("node:fs") }',
            languageOptions: { sourceType: "script" },
        },
        'const createRequire = () => () => {}; const require = createRequire(); require("node:fs")',
        'import { createRequire } from "node:module"; let require = createRequire(import.meta.url); require = () => ({}); require("node:fs")',
    ],
    invalid: [
        {
            code: 'const fs = require("node:fs")',
            errors: [
                {
                    messageId: "preferProcessGetBuiltinModule",
                    data: { method: "require" },
                },
            ],
        },
        {
            code: 'const fs = require("fs/promises")',
            errors: [
                {
                    messageId: "preferProcessGetBuiltinModule",
                    data: { method: "require" },
                },
            ],
        },
        {
            code: 'const fs = require("node:" + "fs")',
            errors: [
                {
                    messageId: "preferProcessGetBuiltinModule",
                    data: { method: "require" },
                },
            ],
        },
        {
            code: "const fs = require(`node:fs`)",
            errors: [
                {
                    messageId: "preferProcessGetBuiltinModule",
                    data: { method: "require" },
                },
            ],
        },
        {
            code: 'const fs = await import("node:fs")',
            errors: [
                {
                    messageId: "preferProcessGetBuiltinModule",
                    data: { method: "import" },
                },
            ],
        },
        {
            code: 'const fs = await import("fs/promises")',
            errors: [
                {
                    messageId: "preferProcessGetBuiltinModule",
                    data: { method: "import" },
                },
            ],
        },
        {
            code: 'const fs = await /* keep */ import("node:fs")',
            errors: [
                {
                    messageId: "preferProcessGetBuiltinModule",
                    data: { method: "import" },
                },
            ],
        },
        {
            code: 'const fs = await import(/* keep */ "node:fs")',
            errors: [
                {
                    messageId: "preferProcessGetBuiltinModule",
                    data: { method: "import" },
                },
            ],
        },
        {
            code: 'const fs = require("node:fs")',
            options: [{ version: "20.16.0" }],
            errors: [
                {
                    messageId: "preferProcessGetBuiltinModule",
                    data: { method: "require" },
                },
            ],
        },
        {
            code: 'const fs = await import("node:fs")',
            options: [{ version: "22.3.0" }],
            errors: [
                {
                    messageId: "preferProcessGetBuiltinModule",
                    data: { method: "import" },
                },
            ],
        },
        {
            code: 'import { createRequire } from "node:module"; const require = createRequire(import.meta.url); require("node:fs")',
            errors: [
                {
                    messageId: "preferProcessGetBuiltinModule",
                    data: { method: "require" },
                },
            ],
        },
        {
            code: 'import { createRequire as makeRequire } from "module"; const require = makeRequire(import.meta.url); require("node:fs")',
            errors: [
                {
                    messageId: "preferProcessGetBuiltinModule",
                    data: { method: "require" },
                },
            ],
        },
    ],
})
