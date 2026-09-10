# n/require-assert-message

📝 Require messages for `node:assert` calls.

<!-- end auto-generated rule header -->

Node.js assertion errors are easier to understand when the assertion provides an explanation. This rule requires a non-empty message for `node:assert` and `node:assert/strict` calls whose message position is unambiguous. It also supports the `strict` export from `node:assert`.

## 📖 Rule Details

Examples of 👍 **correct** code for this rule:

```js
/*eslint n/require-assert-message: "error" */

import assert from "node:assert/strict";

assert.ok(user, "user is required");
assert.equal(user.role, "admin", "user must be an administrator");
assert.match(name, /^[a-z]+$/u, "name must contain lowercase letters only");
```

Examples of 👎 **incorrect** code for this rule:

```js
/*eslint n/require-assert-message: "error" */

import assert from "node:assert/strict";

assert.ok(user);
assert.equal(user.role, "admin", undefined);
assert.match(name, /^[a-z]+$/u, "");
```

The rule checks `assert()`, `assert.ok()`, equality assertions, `match()`, `doesNotMatch()`, and `partialDeepStrictEqual()`.

It does not check `throws()`, `doesNotThrow()`, `rejects()`, or `doesNotReject()` because their optional error parameter makes the position of a message ambiguous. It also does not check `ifError()`, which has no message parameter, or `fail()`, which is commonly used to mark unreachable code.

To avoid false positives, the rule does not report calls through an assertion binding that is reassigned after it is imported or required.

## 🔎 Implementation

- [Rule source](../../lib/rules/require-assert-message.js)
- [Test source](../../tests/lib/rules/require-assert-message.js)
