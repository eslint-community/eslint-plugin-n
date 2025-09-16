# Disallow `require()` expressions which import missing modules (`n/no-missing-require`)

💼 This rule is enabled in the following [configs](https://github.com/eslint-community/eslint-plugin-n#-configs): 🟢 `recommended-module`, ✅ `recommended-script`.

<!-- end auto-generated rule header -->

Maybe we cannot find typo of import paths until run it, so this rule checks import paths.

```js
// If the file "foo" doesn't exist, this is a runtime error.
const foo = require("./foo");
```

## 📖 Rule Details

This rule checks the file paths of `require()`s, then reports the path of files which don't exist.

Examples of 👎 **incorrect** code for this rule:

```js
/*eslint n/no-missing-require: "error" */

var typoFile = require("./typo-file");   /*error "./typo-file" is not found.*/
var typoModule = require("typo-module"); /*error "typo-module" is not found.*/
```

Examples of 👍 **correct** code for this rule:

```js
/*eslint n/no-missing-require: "error" */

var existingFile = require("./existing-file");
var existingModule = require("existing-module");

// This rule cannot check for dynamic imports.
var foo = require(FOO_NAME);
```

### Options

```json
{
    "rules": {
        "n/no-missing-require": ["error", {
            "allowModules": [],
            "resolvePaths": ["/path/to/a/modules/directory"],
            "tryExtensions": [".js", ".json", ".node"]
        }]
    }
}
```

#### allowModules

This can be configured in the rule options or as a shared setting [`settings.allowModules`](../shared-settings.md#allowmodules).
Please see the shared settings documentation for more information.

#### resolvePaths

This can be configured in the rule options or as a shared setting [`settings.resolvePaths`](../shared-settings.md#resolvepaths).
Please see the shared settings documentation for more information.

#### resolverConfig

This can be configured in the rule options or as a shared setting [`settings.resolverConfig`](../shared-settings.md#resolverconfig).
Please see the shared settings documentation for more information.

#### tryExtensions

This can be configured in the rule options or as a shared setting [`settings.tryExtensions`](../shared-settings.md#tryextensions).
Please see the shared settings documentation for more information.

#### tsconfigPath

This can be configured in the rule options or as a shared setting [`settings.tsconfigPath`](../shared-settings.md#tsconfigpath).
Please see the shared settings documentation for more information.

#### typescriptExtensionMap

This can be configured in the rule options or as a shared setting [`settings.typescriptExtensionMap`](../shared-settings.md#typescriptextensionmap).
Please see the shared settings documentation for more information.

## 🔎 Implementation

- [Rule source](../../lib/rules/no-missing-require.js)
- [Test source](../../tests/lib/rules/no-missing-require.js)
