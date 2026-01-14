# Disallow unsupported Node.js built-in APIs on the specified version (`n/no-unsupported-features/node-builtins`)

💼 This rule is enabled in the following [configs](https://github.com/eslint-community/eslint-plugin-n#-configs): 🌐 `all`, 🟢 `recommended-module`, ✅ `recommended-script`.

<!-- end auto-generated rule header -->

Node.js community is improving built-in APIs continuously.
You can check [Node.js Documentation](https://nodejs.org/api/) to know which Node.js version supports each Node.js API.

This rule reports unsupported Node.js built-in APIs on the configured Node.js version as lint errors.
Editor integrations of ESLint would be useful to know it in real-time.

This only supports the static apis, eg `Buffer.from` is supported, but `Buffer#includes` is not.

## 📖 Rule Details

This rule reports APIs of Node.js built-in APIs on the basis of [Node.js v13.2.0 Documentation](https://nodejs.org/docs/v13.2.0/api/).

### Configured Node.js version range

[Configured Node.js version range](../../../README.md#configured-nodejs-version-range)

### Options

```json
{
    "n/no-unsupported-features/node-builtins": ["error", {
        "version": ">=16.0.0",
        "ignores": []
    }]
}
```

#### version

As mentioned above, this rule reads the [`engines`] field of `package.json`.
But, you can overwrite the version by `version` option.

The `version` option accepts [the valid version range of `node-semver`](https://github.com/npm/node-semver#range-grammar).

#### allowExperimental

This allows you to enable experimental features that are available in your configured node version

The `"allowExperimental"` option accepts a boolean value (the default value is `false`).

#### ignores

If you are using transpilers, maybe you want to ignore the warnings about some features.
You can use this `ignores` option to ignore the given features.

The `"ignores"` option accepts an array of strings.

> [!TIP]
> You will see the following error messages:
>
> - `The '{{name}}' is not an experimental feature until Node.js {{version}}.`
> - `The '{{name}}' is still an experimental feature and is not supported until Node.js {{version}}.`
> - `The '{{name}}' is still an experimental feature`
>
> The "name" property is what you can use in your `ignores` array
> You can find the full tree view of the list of the modules over in [lib/unsupported-features/node-builtins-modules](https://github.com/eslint-community/eslint-plugin-n/tree/HEAD/lib/unsupported-features/node-builtins-modules). and globals over in [lib/unsupported-features/node-globals.js](https://github.com/eslint-community/eslint-plugin-n/blob/HEAD/lib/unsupported-features/node-globals.js)

### Shared Settings

The following options can be set by [shared settings](http://eslint.org/docs/user-guide/configuring.html#adding-shared-settings).
Several rules have the same option, but we can set this option at once.

- `version`

For Example:

```json
{
    "settings": {
        "node": {
            "version": ">=16.0.0",
        }
    },
    "rules": {
        "n/no-unsupported-features/node-builtins": ["error", {
            "ignores": []
        }]
    }
}
```

### Known limitations

This rule cannot find non-static things.
For example:

- New properties and methods of instances.
- New parameters of functions.
- New `options` properties of function parameters.
- New events.

[`engines`]: https://docs.npmjs.com/files/package.json#engines

## 🔎 Implementation

- [Rule source](../../../lib/rules/no-unsupported-features/node-builtins.js)
- [Test source](../../../tests/lib/rules/no-unsupported-features/node-builtins.js)
