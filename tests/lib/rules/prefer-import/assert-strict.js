/**
 * @author baevm
 * See LICENSE file in root directory for full license.
 */

import { RuleTester } from "#test-helpers"
import rule from "../../../../lib/rules/prefer-import/assert-strict.js"

new RuleTester({
    languageOptions: {
        ecmaVersion: 2020,
        sourceType: "module",
    },
}).run("prefer-import/assert-strict", rule, {
    valid: [
        'import assert from "node:assert/strict";',
        'import assert from "assert";',
        'import assert from "node:assert/assert";',
        'import assert from "another-assert";',
        'import { strict } from "node:assert";',
        'import { strict as assert } from "node:assert";',
        'import { strict, strict as assert } from "node:assert";',
        'export { strict } from "node:assert";',
        'export { strict as assert } from "node:assert";',
        'export { strict, strict as assert } from "node:assert";',
        'import("node:assert/strict");',
        'require("node:assert/strict");',
        'const assert = require("node:assert").strict;',
        'const assert = require("node:assert")["strict"];',
        'const { strict } = require("node:assert");',
        'const { strict: assert } = require("node:assert");',
        'const { ["strict"]: assert } = require("node:assert");',
        '({ strict: assert } = require("node:assert"));',
        'notRequire("node:assert");',
        "require(`node:assert`);",
        "require(moduleName);",
    ],
    invalid: [
        {
            code: 'import assert from "node:assert";',
            errors: [{ messageId: "preferAssertStrict" }],
        },
        {
            code: "import * as assert from 'node:assert';",
            errors: [{ messageId: "preferAssertStrict" }],
        },
        {
            code: 'import "node:assert";',
            errors: [{ messageId: "preferAssertStrict" }],
        },
        {
            code: 'import assert, { strict } from "node:assert";',
            errors: [{ messageId: "preferAssertStrict" }],
        },
        {
            code: 'import { strict, equal } from "node:assert";',
            errors: [{ messageId: "preferAssertStrict" }],
        },
        {
            code: 'export { default as assert } from "node:assert";',
            errors: [{ messageId: "preferAssertStrict" }],
        },
        {
            code: 'export { strict, equal } from "node:assert";',
            errors: [{ messageId: "preferAssertStrict" }],
        },
        {
            code: 'export * from "node:assert";',
            errors: [{ messageId: "preferAssertStrict" }],
        },
        {
            code: 'import("node:assert");',
            errors: [{ messageId: "preferAssertStrict" }],
        },
        {
            code: 'require("node:assert");',
            errors: [{ messageId: "preferAssertStrict" }],
        },
        {
            code: 'require("node:assert", extra);',
            errors: [{ messageId: "preferAssertStrict" }],
        },
        {
            code: 'const { strict, equal } = require("node:assert");',
            errors: [{ messageId: "preferAssertStrict" }],
        },
        {
            code: 'require("node:\\u0061ssert");',
            errors: [{ messageId: "preferAssertStrict" }],
        },
    ],
})
