# Require that `process.exit()` expressions use the same code path as `throw` (`n/process-exit-as-throw`)

💼 This rule is enabled in the following [configs](https://github.com/eslint-community/eslint-plugin-n#-configs): 🌐 `all`, 🟢 `recommended-module`, ✅ `recommended-script`.

<!-- end auto-generated rule header -->

## 📖 Rule Details

```js
function foo(a) {
    if (a) {
        return new Bar();
    } else {
        process.exit(1);
    }
}
```

ESLint does not mark code after `process.exit()` calls as unreachable like it does with `throw` and `return` expressions, meaning rules like [consistent-return] will still warn.

This rule overrides the default code path analyzer so that code after `process.exit()` calls are marked as unreachable, meaning code like the above will not trigger warnings.

This rule itself never warn code.

## 📚 Related Rules

- [consistent-return]
- [no-fallthrough]
- [no-unreachable]

[consistent-return]: http://eslint.org/docs/rules/consistent-return
[no-fallthrough]: http://eslint.org/docs/rules/no-fallthrough
[no-unreachable]: http://eslint.org/docs/rules/no-unreachable

## 🔎 Implementation

- [Rule source](../../lib/rules/process-exit-as-throw.js)
- [Test source](../../tests/lib/rules/process-exit-as-throw.js)
