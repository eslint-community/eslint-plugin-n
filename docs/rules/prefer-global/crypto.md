# n/prefer-global/crypto

📝 Enforce either `crypto` or `require("crypto").webcrypto`.

<!-- end auto-generated rule header -->

An implementation of the Web Crypto API is defined as a global variable.

```js
console.log(crypto === require("node:crypto").webcrypto) //→ true
```

It will be readable if we use `crypto` consistently.

## 📖 Rule Details

This rule enforces whether to use the global `crypto` variable or the `webcrypto` property from the `crypto` module.

### Options

This rule has a string option.

```json
{
    "n/prefer-global/crypto": ["error", "always" | "never"]
}
```

- `"always"` (default) ... enforces to use the global variable `crypto` rather than `require("crypto").webcrypto`.
- `"never"` ... enforces to use `require("crypto").webcrypto` rather than the global variable `crypto`.

#### always

Examples of 👎 **incorrect** code for this rule:

```js
/*eslint n/prefer-global/crypto: [error]*/

const { webcrypto } = require("crypto")
webcrypto.randomUUID()
```

Examples of 👍 **correct** code for this rule:

```js
/*eslint n/prefer-global/crypto: [error]*/

crypto.randomUUID()
```

#### never

Examples of 👎 **incorrect** code for the `"never"` option:

```js
/*eslint n/prefer-global/crypto: [error, never]*/

crypto.randomUUID()
```

Examples of 👍 **correct** code for the `"never"` option:

```js
/*eslint n/prefer-global/crypto: [error, never]*/

const { webcrypto } = require("crypto")
webcrypto.randomUUID()
```

## 🔎 Implementation

- [Rule source](../../../lib/rules/prefer-global/crypto.js)
- [Test source](../../../tests/lib/rules/prefer-global/crypto.js)
