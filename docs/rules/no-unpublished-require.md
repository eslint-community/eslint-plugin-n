# Disallow `require()` expressions which import private modules (`n/no-unpublished-require`)

💼 This rule is enabled in the following [configs](https://github.com/eslint-community/eslint-plugin-n#-configs): 🌐 `all`, 🟢 `recommended-module`, ✅ `recommended-script`.

<!-- end auto-generated rule header -->

If a `require()` expression's target is not published, the program works in local, but will not work after published to npm.
This rule disallows `require()` expressions of unpublished files/modules.

## 📖 Rule Details

If a source code file satisfies all of the following conditions, the file is \*published\*.

- `"files"` field of `package.json` includes the file or `"files"` field of `package.json` does not exist.
- `.npmignore` does not include the file.

Then this rule warns `require()` expressions in \*published\* files if the `require()` expression imports \*unpublished\* files or the packages of `devDependencies`.

> This intends to prevent "Module Not Found" error after `npm publish`.\
> 💡 If you want to import `devDependencies`, please write `.npmignore` or `"files"` field of `package.json`.

### Options

```json
{
    "rules": {
        "n/no-unpublished-require": ["error", {
            "allowModules": [],
            "convertPath": null,
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

#### convertPath

This can be configured in the rule options or as a shared setting [`settings.convertPath`](../shared-settings.md#convertpath).
Please see the shared settings documentation for more information.

#### tryExtensions

This can be configured in the rule options or as a shared setting [`settings.tryExtensions`](../shared-settings.md#tryextensions).
Please see the shared settings documentation for more information.

### ignorePrivate

In a private package you sometimes want to disable checking for unpublished dependencies, e.g. if the package is not published.

However, there are situations where you want to mark it as private, though still ensure only published dependencies are used in your source code.
An example, for such a case would be a package that is deployed to a server.

Defaults to `true`.

package.json:

```json
{
    "private": true,
    ...
}
```

```json
{
    "rules": {
        "n/no-unpublished-import": ["error", {
            "ignorePrivate": true
        }]
    }
}
```

## 🔎 Implementation

- [Rule source](../../lib/rules/no-unpublished-require.js)
- [Test source](../../tests/lib/rules/no-unpublished-require.js)
