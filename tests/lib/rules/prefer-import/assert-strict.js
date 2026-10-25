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
            output: null,
            errors: [
                {
                    messageId: "preferAssertStrict",
                    suggestions: [
                        {
                            messageId: "useAssertStrict",
                            output: 'import assert from "node:assert/strict";',
                        },
                    ],
                },
            ],
        },
        {
            code: "import * as assert from 'node:assert';",
            output: null,
            errors: [
                {
                    messageId: "preferAssertStrict",
                    suggestions: [
                        {
                            messageId: "useAssertStrict",
                            output: "import * as assert from 'node:assert/strict';",
                        },
                    ],
                },
            ],
        },
        {
            code: 'import "node:assert";',
            output: null,
            errors: [
                {
                    messageId: "preferAssertStrict",
                    suggestions: [
                        {
                            messageId: "useAssertStrict",
                            output: 'import "node:assert/strict";',
                        },
                    ],
                },
            ],
        },
        {
            code: 'import assert, { strict } from "node:assert";',
            output: null,
            errors: [
                {
                    messageId: "preferAssertStrict",
                    suggestions: [
                        {
                            messageId: "useAssertStrict",
                            output: 'import assert, { strict } from "node:assert/strict";',
                        },
                    ],
                },
            ],
        },
        {
            code: 'import { strict, equal } from "node:assert";',
            output: null,
            errors: [
                {
                    messageId: "preferAssertStrict",
                    suggestions: [
                        {
                            messageId: "useAssertStrict",
                            output: 'import { strict, equal } from "node:assert/strict";',
                        },
                    ],
                },
            ],
        },
        {
            code: 'export { default as assert } from "node:assert";',
            output: null,
            errors: [
                {
                    messageId: "preferAssertStrict",
                    suggestions: [
                        {
                            messageId: "useAssertStrict",
                            output: 'export { default as assert } from "node:assert/strict";',
                        },
                    ],
                },
            ],
        },
        {
            code: 'export { strict, equal } from "node:assert";',
            output: null,
            errors: [
                {
                    messageId: "preferAssertStrict",
                    suggestions: [
                        {
                            messageId: "useAssertStrict",
                            output: 'export { strict, equal } from "node:assert/strict";',
                        },
                    ],
                },
            ],
        },
        {
            code: 'export * from "node:assert";',
            output: null,
            errors: [
                {
                    messageId: "preferAssertStrict",
                    suggestions: [
                        {
                            messageId: "useAssertStrict",
                            output: 'export * from "node:assert/strict";',
                        },
                    ],
                },
            ],
        },
        {
            code: 'import("node:assert");',
            output: null,
            errors: [
                {
                    messageId: "preferAssertStrict",
                    suggestions: [
                        {
                            messageId: "useAssertStrict",
                            output: 'import("node:assert/strict");',
                        },
                    ],
                },
            ],
        },
        {
            code: 'require("node:assert");',
            output: null,
            errors: [
                {
                    messageId: "preferAssertStrict",
                    suggestions: [
                        {
                            messageId: "useAssertStrict",
                            output: 'require("node:assert/strict");',
                        },
                    ],
                },
            ],
        },
        {
            code: 'require("node:assert", extra);',
            output: null,
            errors: [
                {
                    messageId: "preferAssertStrict",
                    suggestions: [
                        {
                            messageId: "useAssertStrict",
                            output: 'require("node:assert/strict", extra);',
                        },
                    ],
                },
            ],
        },
        {
            code: 'const { strict, equal } = require("node:assert");',
            output: null,
            errors: [
                {
                    messageId: "preferAssertStrict",
                    suggestions: [
                        {
                            messageId: "useAssertStrict",
                            output: 'const { strict, equal } = require("node:assert/strict");',
                        },
                    ],
                },
            ],
        },
        {
            code: 'require("node:\\u0061ssert");',
            output: null,
            errors: [
                {
                    messageId: "preferAssertStrict",
                    suggestions: [
                        {
                            messageId: "useAssertStrict",
                            output: 'require("node:\\u0061ssert/strict");',
                        },
                    ],
                },
            ],
        },
    ],
})
