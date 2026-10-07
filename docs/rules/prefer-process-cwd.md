# n/prefer-process-cwd

📝 Enforce `process.cwd()` instead of `path.resolve()`.

🔧 This rule is automatically fixable by the [`--fix` CLI option](https://eslint.org/docs/latest/user-guide/command-line-interface#--fix).

<!-- end auto-generated rule header -->

Calling `path.resolve()` with no arguments (or with `""` / `"."`) returns the current working directory — exactly what `process.cwd()` returns. The results are the same, but `process.cwd()` states the intention directly instead of going through path resolution.

## 📖 Rule Details

This rule reports `path.resolve()` calls that are equivalent to `process.cwd()`.

Examples of **incorrect** code for this rule:

```js
/*eslint n/prefer-process-cwd: "error"*/

const cwd1 = path.resolve();
const cwd2 = path.resolve("");
const cwd3 = path.resolve(".");
```

Examples of **correct** code for this rule:

```js
/*eslint n/prefer-process-cwd: "error"*/

const cwd1 = process.cwd();
const cwd2 = path.resolve("foo", "bar");
const cwd3 = path.resolve(__dirname, "foo");
```

## 🔎 Implementation

- [Rule source](../../lib/rules/prefer-process-cwd.js)
- [Test source](../../tests/lib/rules/prefer-process-cwd.js)
