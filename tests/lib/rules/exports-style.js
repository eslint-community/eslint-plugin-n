/**
 * @author Toru Nagashima
 * See LICENSE file in root directory for full license.
 */

import { RuleTester } from "#test-helpers"
import rule from "../../../lib/rules/exports-style.js"

new RuleTester({ languageOptions: { ecmaVersion: 11 } }).run(
    "exports-style",
    rule,
    {
        valid: [
            {
                code: "module.exports = {foo: 1}",
            },
            {
                code: "module.exports = {foo: 1}",
                options: ["module.exports"],
            },
            {
                code: "exports.foo = 1",
                options: ["exports"],
            },
            {
                code: "exports = module.exports = {foo: 1}",
                options: ["module.exports", { allowBatchAssign: true }],
            },
            {
                code: "module.exports = exports = {foo: 1}",
                options: ["module.exports", { allowBatchAssign: true }],
            },
            {
                code: "exports = module.exports = {foo: 1}",
                options: ["exports", { allowBatchAssign: true }],
            },
            {
                code: "module.exports = exports = {foo: 1}",
                options: ["exports", { allowBatchAssign: true }],
            },
            {
                code: "exports = module.exports = {foo: 1}; exports.bar = 2",
                options: ["exports", { allowBatchAssign: true }],
            },
            {
                code: "module.exports = exports = {foo: 1}; exports.bar = 2",
                options: ["exports", { allowBatchAssign: true }],
            },

            // allow accesses of `modules` except `module.exports`
            {
                code: "module = {}; module.foo = 1",
                options: ["exports"],
            },

            // Ignores if it's not defined.
            {
                code: "exports.foo = 1",
                options: ["module.exports"],
                languageOptions: { globals: { exports: "off" } },
            },
            {
                code: "module.exports = {foo: 1}",
                options: ["exports"],
                languageOptions: { globals: { module: "off" } },
            },
        ],
        invalid: [
            {
                code: "exports = {foo: 1}",
                output: null,
                errors: [
                    "Unexpected access to 'exports'. Use 'module.exports' instead.",
                ],
            },
            {
                code: "exports.foo = 1",
                output: null,
                errors: [
                    "Unexpected access to 'exports'. Use 'module.exports' instead.",
                ],
            },
            {
                code: "module.exports = exports = {foo: 1}",
                output: null,
                errors: [
                    "Unexpected access to 'exports'. Use 'module.exports' instead.",
                ],
            },
            {
                code: "exports = module.exports = {foo: 1}",
                output: null,
                errors: [
                    "Unexpected access to 'exports'. Use 'module.exports' instead.",
                ],
            },

            {
                code: "exports = {foo: 1}",
                output: null,
                options: ["module.exports"],
                errors: [
                    "Unexpected access to 'exports'. Use 'module.exports' instead.",
                ],
            },
            {
                code: "exports.foo = 1",
                output: null,
                options: ["module.exports"],
                errors: [
                    "Unexpected access to 'exports'. Use 'module.exports' instead.",
                ],
            },
            {
                code: "module.exports = exports = {foo: 1}",
                output: null,
                options: ["module.exports"],
                errors: [
                    "Unexpected access to 'exports'. Use 'module.exports' instead.",
                ],
            },
            {
                code: "exports = module.exports = {foo: 1}",
                output: null,
                options: ["module.exports"],
                errors: [
                    "Unexpected access to 'exports'. Use 'module.exports' instead.",
                ],
            },

            {
                code: "exports = {foo: 1}",
                output: null,
                options: ["exports"],
                errors: [
                    "Unexpected assignment to 'exports'. Don't modify 'exports' itself.",
                ],
            },
            {
                code: "module.exports = {foo: 1}",
                output: "exports.foo = 1;",
                options: ["exports"],
                errors: [
                    "Unexpected access to 'module.exports'. Use 'exports' instead.",
                ],
            },
            {
                code: "module.exports.foo = 1",
                output: "exports.foo = 1",
                options: ["exports"],
                errors: [
                    "Unexpected access to 'module.exports'. Use 'exports' instead.",
                ],
            },
            {
                code: "module.exports = { a: 1 }",
                output: "exports.a = 1;",
                options: ["exports"],
                errors: [
                    "Unexpected access to 'module.exports'. Use 'exports' instead.",
                ],
            },
            {
                code: "module.exports = { a: 1, b: 2 }",
                output: "exports.a = 1;\n\nexports.b = 2;",
                options: ["exports"],
                errors: [
                    "Unexpected access to 'module.exports'. Use 'exports' instead.",
                ],
            },
            {
                code: "module.exports = { // before a\na: 1, // between a and b\nb: 2 // after b\n}",
                output: "// before a\nexports.a = 1;\n\n// between a and b\nexports.b = 2;\n// after b",
                options: ["exports"],
                errors: [
                    "Unexpected access to 'module.exports'. Use 'exports' instead.",
                ],
            },
            {
                code: "foo(module.exports = {foo: 1})",
                output: null,
                options: ["exports"],
                errors: [
                    "Unexpected access to 'module.exports'. Use 'exports' instead.",
                ],
            },
            {
                code: "if(foo){ module.exports = { foo: 1};} else { module.exports = {foo: 2};}",
                output: null,
                options: ["exports"],
                errors: [
                    "Unexpected access to 'module.exports'. Use 'exports' instead.",
                    "Unexpected access to 'module.exports'. Use 'exports' instead.",
                ],
            },
            {
                code: "function bar() { module.exports = { foo: 1 }; }",
                output: null,
                options: ["exports"],
                errors: [
                    "Unexpected access to 'module.exports'. Use 'exports' instead.",
                ],
            },
            {
                code: "module.exports = { get a() {} }",
                output: null,
                options: ["exports"],
                errors: [
                    "Unexpected access to 'module.exports'. Use 'exports' instead.",
                ],
            },
            {
                code: "module.exports = { set a(a) {} }",
                output: null,
                options: ["exports"],
                errors: [
                    "Unexpected access to 'module.exports'. Use 'exports' instead.",
                ],
            },
            {
                code: "module.exports = { a }",
                output: "exports.a = a;",
                options: ["exports"],
                errors: [
                    "Unexpected access to 'module.exports'. Use 'exports' instead.",
                ],
            },
            {
                code: "module.exports = { ...a }",
                output: null,
                options: ["exports"],
                errors: [
                    "Unexpected access to 'module.exports'. Use 'exports' instead.",
                ],
            },
            {
                code: "module.exports = { ['a' + 'b']: 1 }",
                output: "exports['a' + 'b'] = 1;",
                options: ["exports"],
                errors: [
                    "Unexpected access to 'module.exports'. Use 'exports' instead.",
                ],
            },
            {
                code: "module.exports = { 'foo': 1 }",
                output: "exports['foo'] = 1;",
                options: ["exports"],
                errors: [
                    "Unexpected access to 'module.exports'. Use 'exports' instead.",
                ],
            },
            {
                code: "module.exports = { foo(a) {} }",
                output: "exports.foo = function (a) {};",
                options: ["exports"],
                errors: [
                    "Unexpected access to 'module.exports'. Use 'exports' instead.",
                ],
            },
            {
                code: "module.exports = { *foo(a) {} }",
                output: "exports.foo = function* (a) {};",
                options: ["exports"],
                errors: [
                    "Unexpected access to 'module.exports'. Use 'exports' instead.",
                ],
            },
            {
                code: "module.exports = { async foo(a) {} }",
                output: "exports.foo = async function (a) {};",
                options: ["exports"],
                errors: [
                    "Unexpected access to 'module.exports'. Use 'exports' instead.",
                ],
            },
            {
                code: "module.exports.foo()",
                output: "exports.foo()",
                options: ["exports"],
                errors: [
                    "Unexpected access to 'module.exports'. Use 'exports' instead.",
                ],
            },
            {
                code: "a = module.exports.foo + module.exports['bar']",
                output: "a = exports.foo + exports['bar']",
                options: ["exports"],
                errors: [
                    "Unexpected access to 'module.exports'. Use 'exports' instead.",
                    "Unexpected access to 'module.exports'. Use 'exports' instead.",
                ],
            },
            {
                code: "module.exports = exports = {foo: 1}",
                output: null,
                options: ["exports"],
                errors: [
                    "Unexpected access to 'module.exports'. Use 'exports' instead.",
                    "Unexpected assignment to 'exports'. Don't modify 'exports' itself.",
                ],
            },
            {
                code: "exports = module.exports = {foo: 1}",
                output: null,
                options: ["exports"],
                errors: [
                    "Unexpected assignment to 'exports'. Don't modify 'exports' itself.",
                    "Unexpected access to 'module.exports'. Use 'exports' instead.",
                ],
            },
            {
                code: "module.exports = exports = {foo: 1}; exports = obj",
                output: null,
                options: ["exports", { allowBatchAssign: true }],
                errors: [
                    "Unexpected assignment to 'exports'. Don't modify 'exports' itself.",
                ],
            },
            {
                code: "exports = module.exports = {foo: 1}; exports = obj",
                output: null,
                options: ["exports", { allowBatchAssign: true }],
                errors: [
                    "Unexpected assignment to 'exports'. Don't modify 'exports' itself.",
                ],
            },
        ],
    }
)
