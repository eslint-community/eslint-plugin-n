# n/prefer-global/timers

📝 Enforce either global timer functions or `require("timers")`.

<!-- end auto-generated rule header -->

The timer functions `clearImmediate`, `clearInterval`, `clearTimeout`, `setImmediate`, `setInterval`, and `setTimeout` are defined as global variables but are also available in the `timers` module.

```js
console.log(setTimeout === require("timers").setTimeout) //→ true
```

It will be readable if we use either consistently.

## 📖 Rule Details

This rule enforces which timer functions we should use.

### Options

This rule has a string option.

```json
{
    "n/prefer-global/timers": ["error", "always" | "never"]
}
```

- `"always"` (default) ... enforces to use the global timer functions rather than `require("timers").*`.
- `"never"` ... enforces to use `require("timers").*` rather than the global timer functions.

#### always

Examples of 👎 **incorrect** code for this rule:

```js
/*eslint n/prefer-global/timers: [error]*/

const { setTimeout } = require("timers")
setTimeout(() => {}, 1000)
```

Examples of 👍 **correct** code for this rule:

```js
/*eslint n/prefer-global/timers: [error]*/

setTimeout(() => {}, 1000)
```

#### never

Examples of 👎 **incorrect** code for the `"never"` option:

```js
/*eslint n/prefer-global/timers: [error, never]*/

setTimeout(() => {}, 1000)
```

Examples of 👍 **correct** code for the `"never"` option:

```js
/*eslint n/prefer-global/timers: [error, never]*/

const { setTimeout } = require("timers")
setTimeout(() => {}, 1000)
```

## 🔎 Implementation

- [Rule source](../../../lib/rules/prefer-global/timers.js)
- [Test source](../../../tests/lib/rules/prefer-global/timers.js)
