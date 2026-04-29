# n/prefer-global/text-encoder

📝 Enforce either `TextEncoder` or `require("util").TextEncoder`.

<!-- end auto-generated rule header -->

The `TextEncoder` class of `util` module is defined as a global variable.

```js
console.log(TextEncoder === require("util").TextEncoder) //→ true
```

It will be readable if we use either `TextEncoder` consistently.

## 📖 Rule Details

This rule enforces which `TextEncoder` we should use.

### Options

This rule has a string option.

```json
{
    "n/prefer-global/text-encoder": ["error", "always" | "never"]
}
```

- `"always"` (default) ... enforces to use the global variable `TextEncoder` rather than `require("util").TextEncoder`.
- `"never"` ... enforces to use `require("util").TextEncoder` rather than the global variable `TextEncoder`.

#### always

Examples of 👎 **incorrect** code for this rule:

```js
/*eslint n/prefer-global/text-encoder: [error]*/

const { TextEncoder } = require("util")
const u = new TextEncoder(s)
```

Examples of 👍 **correct** code for this rule:

```js
/*eslint n/prefer-global/text-encoder: [error]*/

const u = new TextEncoder(s)
```

#### never

Examples of 👎 **incorrect** code for the `"never"` option:

```js
/*eslint n/prefer-global/text-encoder: [error, never]*/

const u = new TextEncoder(s)
```

Examples of 👍 **correct** code for the `"never"` option:

```js
/*eslint n/prefer-global/text-encoder: [error, never]*/

const { TextEncoder } = require("util")
const u = new TextEncoder(s)
```

## 🔎 Implementation

- [Rule source](../../../lib/rules/prefer-global/text-encoder.js)
- [Test source](../../../tests/lib/rules/prefer-global/text-encoder.js)
