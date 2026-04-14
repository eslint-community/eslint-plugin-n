# Enforce Node.js-style error-first callback pattern is followed (`n/no-callback-literal`)

<!-- end auto-generated rule header -->

When invoking a callback function which uses the Node.js error-first callback pattern, all of your errors should either use the `Error` class or a subclass of it. It is also acceptable to use `undefined` or `null` if there is no error.

## 📖 Rule Details

When a function is named `cb` or `callback`, then it must be invoked with a first argument that is `undefined`, `null`, an `Error` class, or a subclass of `Error`.

Examples of 👎 **incorrect** code for this rule:

```js
/*eslint n/no-callback-literal: "error" */

cb('this is an error string');
callback(0);
```

Examples of 👍 **correct** code for this rule:

```js
/*eslint n/no-callback-literal: "error" */

cb(undefined);
cb(null, 5);
callback(new Error('some error'));
callback(someVariable);
```

## 🔎 Implementation

- [Rule source](../../lib/rules/no-callback-literal.js)
- [Test source](../../tests/lib/rules/no-callback-literal.js)
