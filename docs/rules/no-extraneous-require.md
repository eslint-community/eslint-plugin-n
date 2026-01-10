# Disallow `require()` expressions which import extraneous modules (`n/no-extraneous-require`)

💼 This rule is enabled in the following [configs](https://github.com/eslint-community/eslint-plugin-n#-configs): 🌐 `all`, 🟢 `recommended-module`, ✅ `recommended-script`.

<!-- end auto-generated rule header -->

If a `require()`'s target is extraneous (it's not listed in your `package.json`), the program may work locally but can break after dependencies are re-installed. This can cause issues for your team/contributors. If a declaration source is extraneous yet consistently works for you and your team, it might be a transitive dependency (a dependency of another dependency). Transitive dependencies should still be added as an explicit dependency in your `package.json` to avoid the risk of a dependency potentially changing or removing the transitive dependency.

Additionally, the transitive dependency could be a dev dependency, meaning your code could work in development but not in production.

This rule disallows `require()` of extraneous modules.

## 📖 Rule Details

This rule warns `require()` of extraneous modules.

### Options

```json
{
    "rules": {
        "n/no-extraneous-require": ["error", {
            "allowModules": [],
            "resolvePaths": [],
            "tryExtensions": []
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

## 🔎 Implementation

- [Rule source](../../lib/rules/no-extraneous-require.js)
- [Test source](../../tests/lib/rules/no-extraneous-require.js)
