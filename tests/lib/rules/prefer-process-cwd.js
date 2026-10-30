/**
 * @author Pintu Kumar
 * See LICENSE file in root directory for full license.
 */

import { RuleTester } from "#test-helpers"
import rule from "../../../lib/rules/prefer-process-cwd.js"

new RuleTester({
    languageOptions: {
        ecmaVersion: 2020,
        sourceType: "module",
    },
}).run("prefer-process-cwd", rule, {
    valid: [
        // Real path resolution is untouched.
        'const path = require("path"); const p = path.resolve("foo");',
        'const path = require("path"); const p = path.resolve("foo", "bar");',
        'const path = require("path"); const p = path.resolve("./foo");',
        'import path from "path"; const p = path.resolve("foo");',
        // Not the `path` module.
        "const resolve = () => {}; resolve();",
        'import path from "./my-path"; const p = path.resolve();',
        "const path = {}; const p = path.resolve();",
        // Bare read, no call.
        'const path = require("path"); const r = path.resolve;',
    ],
    invalid: [
        {
            code: 'const path = require("path"); const cwd = path.resolve();',
            output: 'const path = require("path"); const cwd = process.cwd();',
            errors: [{ messageId: "preferProcessCwd" }],
        },
        {
            code: 'const path = require("path"); const cwd = path.resolve("");',
            output: 'const path = require("path"); const cwd = process.cwd();',
            errors: [{ messageId: "preferProcessCwd" }],
        },
        {
            code: 'const path = require("path"); const cwd = path.resolve(".");',
            output: 'const path = require("path"); const cwd = process.cwd();',
            errors: [{ messageId: "preferProcessCwd" }],
        },
        {
            code: 'import path from "path"; const cwd = path.resolve();',
            output: 'import path from "path"; const cwd = process.cwd();',
            errors: [{ messageId: "preferProcessCwd" }],
        },
        {
            code: 'import { resolve } from "path"; const cwd = resolve();',
            output: 'import { resolve } from "path"; const cwd = process.cwd();',
            errors: [{ messageId: "preferProcessCwd" }],
        },
        {
            code: 'const path = require("node:path"); const cwd = path.resolve(".");',
            output: 'const path = require("node:path"); const cwd = process.cwd();',
            errors: [{ messageId: "preferProcessCwd" }],
        },
        {
            code: 'import path from "node:path"; const cwd = path.resolve("");',
            output: 'import path from "node:path"; const cwd = process.cwd();',
            errors: [{ messageId: "preferProcessCwd" }],
        },
    ],
})
