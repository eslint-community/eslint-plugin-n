/**
 * @author electrohyun
 * See LICENSE file in root directory for full license.
 */

import { RuleTester } from "#test-helpers"
import rule from "../../../lib/rules/require-assert-message.js"

new RuleTester({
    languageOptions: {
        ecmaVersion: 2022,
        sourceType: "module",
    },
}).run("require-assert-message", rule, {
    valid: [
        'import assert from "node:assert"; assert(true, "expected true");',
        'import * as assert from "node:assert/strict"; assert.ok(user, "user is required");',
        'import { equal as assertEqual } from "node:assert"; assertEqual(actual, expected, "values must match");',
        'const assert = require("node:assert"); assert.strictEqual(actual, expected, "values must match");',
        'const { deepStrictEqual } = require("node:assert/strict"); deepStrictEqual(actual, expected, "values must match");',
        'import assert from "assert"; assert.ok(user);',
        'import assert from "node:assert"; assert.throws(fn);',
        'import assert from "node:assert"; assert.doesNotThrow(fn);',
        'import assert from "node:assert"; assert.rejects(asyncFn);',
        'import assert from "node:assert"; assert.doesNotReject(asyncFn);',
        'import assert from "node:assert"; assert.ifError(error);',
        'import assert from "node:assert"; assert.fail();',
        'import assert from "node:assert"; assert.ok(user, message);',
        'import assert from "node:assert"; assert.ok(user, getMessage());',
        'import assert from "node:assert"; assert.ok(...args);',
        'let assert = require("node:assert"); assert = mock; assert.ok(user);',
        {
            code: 'import assert from "node:assert"; function check(undefined) { assert.ok(user, undefined); }',
        },
        'import assert from "node:assert"; assert[method](user);',
        'import("node:assert").then(assert => assert.ok(user));',
        "function assert() {} assert();",
    ],
    invalid: [
        {
            code: 'import assert from "node:assert";\nassert(true);',
            errors: [
                {
                    column: 1,
                    endColumn: 13,
                    endLine: 2,
                    line: 2,
                    messageId: "missingMessage",
                },
            ],
        },
        {
            code: 'import assert from "node:assert/strict"; assert.ok(user);',
            errors: [{ messageId: "missingMessage" }],
        },
        {
            code: 'import { equal } from "node:assert"; equal(actual, expected);',
            errors: [{ messageId: "missingMessage" }],
        },
        {
            code: 'const { strictEqual } = require("node:assert/strict"); strictEqual(actual, expected);',
            errors: [{ messageId: "missingMessage" }],
            languageOptions: { sourceType: "commonjs" },
        },
        {
            code: 'import { strict as assert } from "node:assert"; assert.ok(user);',
            errors: [{ messageId: "missingMessage" }],
        },
        {
            code: 'const assert = require("node:assert").strict; assert.ok(user);',
            errors: [{ messageId: "missingMessage" }],
            languageOptions: { sourceType: "commonjs" },
        },
        {
            code: 'const { strict } = require("node:assert"); strict.ok(user);',
            errors: [{ messageId: "missingMessage" }],
            languageOptions: { sourceType: "commonjs" },
        },
        {
            code: 'const { strict: assert } = require("node:assert"); assert.ok(user);',
            errors: [{ messageId: "missingMessage" }],
            languageOptions: { sourceType: "commonjs" },
        },
        {
            code: `
                import assert from "node:assert";
                assert.notEqual(actual, expected);
                assert.deepEqual(actual, expected);
                assert.notDeepEqual(actual, expected);
                assert.strictEqual(actual, expected);
                assert.notStrictEqual(actual, expected);
                assert.deepStrictEqual(actual, expected);
                assert.notDeepStrictEqual(actual, expected);
                assert.match(value, pattern);
                assert.doesNotMatch(value, pattern);
                assert.partialDeepStrictEqual(actual, expected);
            `,
            errors: Array.from({ length: 10 }, () => ({
                messageId: "missingMessage",
            })),
        },
        {
            code: 'import assert from "node:assert"; assert.ok(user, undefined);',
            errors: [{ messageId: "emptyMessage" }],
        },
        {
            code: 'import assert from "node:assert"; assert.ok(user, void 0);',
            errors: [{ messageId: "emptyMessage" }],
        },
        {
            code: 'import assert from "node:assert"; assert.ok(user, null);',
            errors: [{ messageId: "emptyMessage" }],
        },
        {
            code: 'import assert from "node:assert"; assert.ok(user, "");',
            errors: [{ messageId: "emptyMessage" }],
        },
        {
            code: "import assert from 'node:assert'; assert.ok(user, ``);",
            errors: [{ messageId: "emptyMessage" }],
        },
    ],
})
