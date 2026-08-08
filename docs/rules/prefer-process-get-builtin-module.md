# n/prefer-process-get-builtin-module

📝 Enforce using `process.getBuiltinModule()` to load Node.js built-in modules.

<!-- end auto-generated rule header -->

Node.js exposes built-in modules synchronously through `process.getBuiltinModule()`.
In ES modules, this avoids creating a `require` function solely to access a
built-in module. It also communicates that the requested module is built into
Node.js.

This API is available starting in Node.js 20.16.0 on the 20.x release line and
in Node.js 22.3.0 or later.

## 📖 Rule Details

This rule reports calls to `require()` for built-in modules and awaited dynamic
imports of built-in modules. It ignores non-built-in modules, dynamic imports
that are not awaited directly, arbitrary functions named `require`, and
references where `process` is shadowed. A local `require` created with
`createRequire()` from `node:module` is recognized.

This rule is not automatically fixable. An awaited dynamic import returns an
ES module namespace object, while `process.getBuiltinModule()` returns the
underlying built-in exports object. Review how the loaded module is used when
applying the suggested replacement.

👍 Examples of **correct** code for this rule:

```js
/*eslint n/prefer-process-get-builtin-module: error */

const fs = process.getBuiltinModule("node:fs")
const eslint = require("eslint")
const lazyFs = import("node:fs")
```

👎 Examples of **incorrect** code for this rule:

```js
/*eslint n/prefer-process-get-builtin-module: error */

const fs = require("node:fs")
const promises = await import("node:fs/promises")
```

### Configured Node.js version range

[Configured Node.js version range](../../README.md#configured-nodejs-version-range)

### Options

```json
{
    "n/prefer-process-get-builtin-module": [
        "error",
        {
            "version": ">=22.3.0"
        }
    ]
}
```

#### version

This rule reads the [`engines`] field of `package.json`. You can override that
range with the `version` option, which accepts any valid
[`node-semver` range](https://github.com/npm/node-semver#range-grammar).

The rule does not report when the configured range includes Node.js versions
without `process.getBuiltinModule()`.

## 🔎 Implementation

- [Rule source](../../lib/rules/prefer-process-get-builtin-module.js)
- [Test source](../../tests/lib/rules/prefer-process-get-builtin-module.js)
