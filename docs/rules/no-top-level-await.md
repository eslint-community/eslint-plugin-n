# Disallow top-level `await` in published modules (`n/no-top-level-await`)

💼 This rule is enabled in the 🌐 `all` [config](https://github.com/eslint-community/eslint-plugin-n#-configs).

<!-- end auto-generated rule header -->

Node.js v20.19 introduced `require(esm)`, but ES modules with top-level `await` cannot be loaded with `require(esm)`. It is a good idea to disallow top-level `await` to ensure interoperability of modules published as Node.js libraries.

## 📖 Rule Details

If a source code file satisfies all of the following conditions, the file is \*published\*.

- `"files"` field of `package.json` includes the file or `"files"` field of `package.json` does not exist.
- `.npmignore` does not include the file.

Then this rule warns top-level `await` in \*published\* files.

Examples of 👎 **incorrect** code for this rule:

```js
/*eslint n/no-top-level-await: error*/

const foo = await import('foo');
for await (const e of asyncIterate()) {
    // ...
}
```

### Options

```json
{
    "rules": {
        "n/no-top-level-await": ["error", {
            "ignoreBin": false,
            "convertPath": null
        }]
    }
}
```

#### ignoreBin

If `true`, this rule ignores top-level `await` in files that are specified in the `bin` field of `package.json` or in files that contain a `#!/usr/bin/env` in their source code.

Examples of 👍 **correct** code for the `"ignoreBin": true` option:

```js
#!/usr/bin/env node
/*eslint n/no-top-level-await: ["error", { "ignoreBin": true }]*/

const foo = await import('foo');
for await (const e of asyncIterate()) {
    // ...
}
```

#### convertPath

This can be configured in the rule options or as a shared setting [`settings.convertPath`](../shared-settings.md#convertpath).
Please see the shared settings documentation for more information.

## 🔎 Implementation

- [Rule source](../../lib/rules/no-top-level-await.js)
- [Test source](../../tests/lib/rules/no-top-level-await.js)
