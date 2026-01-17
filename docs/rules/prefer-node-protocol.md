# Enforce using the `node:` protocol when importing Node.js builtin modules (`n/prefer-node-protocol`)

💼 This rule is enabled in the 🌐 `all` [config](https://github.com/eslint-community/eslint-plugin-n#-configs).

🔧 This rule is automatically fixable by the [`--fix` CLI option](https://eslint.org/docs/latest/user-guide/command-line-interface#--fix).

<!-- end auto-generated rule header -->

Older built-in Node modules such as fs now can be imported via either their name or `node:` + their name:

```js
import fs from "fs"
import fs from "node:fs"
```

The prefixed versions are nice because they can't be overridden by user modules and are similarly formatted to prefix-only modules such as node:test.

Note that Node.js support for this feature began in:

> v16.0.0, v14.18.0 (`require()`)  
> v14.13.1, v12.20.0 (`import`)
> v22.3.0, v20.16.0 (`process.getBuiltinModule()`)

## 📖 Rule Details

This rule enforces that `node:` protocol is prepended to built-in Node modules when importing or exporting built-in Node modules.

👍 Examples of **correct** code for this rule:

```js
/*eslint n/prefer-node-protocol: error */

import fs from "node:fs"

export { promises } from "node:fs"

const fs = require("node:fs")

const fs = process.getBuiltinModule("node:fs")
```

👎 Examples of **incorrect** code for this rule:

```js
/*eslint n/prefer-node-protocol: error */

import fs from "fs"

export { promises } from "fs"

const fs = require("fs")

const fs = process.getBuiltinModule("fs")
```

### Configured Node.js version range

[Configured Node.js version range](../../../README.md#configured-nodejs-version-range)

### Options

```json
{
    "n/prefer-node-protocol": ["error", {
        "version": ">=16.0.0",
    }]
}
```

#### version

As mentioned above, this rule reads the [`engines`] field of `package.json`.
But, you can overwrite the version by `version` option.

The `version` option accepts [the valid version range of `node-semver`](https://github.com/npm/node-semver#range-grammar).

## 🔎 Implementation

- [Rule source](../../lib/rules/prefer-node-protocol.js)
- [Test source](../../tests/lib/rules/prefer-node-protocol.js)
