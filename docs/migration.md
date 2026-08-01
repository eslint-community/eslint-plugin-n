# Migrating from eslint-plugin-node

`eslint-plugin-n` is the maintained fork of `eslint-plugin-node`. The rule options are compatible, so most migrations only need to change the package name and the plugin prefix.

## Install

Remove the unmaintained package and install the maintained fork:

```sh
npm uninstall eslint-plugin-node
npm install --save-dev eslint-plugin-n
```

## Configuration

For a legacy `.eslintrc.*` configuration, change the plugin name and the `extends` entry:

```jsonc
{
    "plugins": ["n"],
    "extends": ["plugin:n/recommended"]
}
```

The other legacy recommended configurations use the same replacement:

| Before                           | After                         |
| -------------------------------- | ----------------------------- |
| `plugin:node/recommended`        | `plugin:n/recommended`        |
| `plugin:node/recommended-module` | `plugin:n/recommended-module` |
| `plugin:node/recommended-script` | `plugin:n/recommended-script` |

For a flat `eslint.config.js`, import the fork and register it under the `n` plugin name:

```js
import n from "eslint-plugin-n"
import { defineConfig } from "eslint/config"

export default defineConfig([
    {
        plugins: { n },
        extends: ["n/recommended-module"]
    }
])
```

## Rule names and disable comments

Replace the `node/` prefix with `n/` wherever a rule is referenced. Rule options do not need to change:

```diff
- "node/no-deprecated-api": "error"
+ "n/no-deprecated-api": "error"
```

The same replacement applies to inline configuration comments:

```diff
- /* eslint node/no-deprecated-api: "error" */
+ /* eslint n/no-deprecated-api: "error" */
```

Existing shared settings under the `node` name continue to work for backward compatibility. New configurations may use the `n` name instead.
