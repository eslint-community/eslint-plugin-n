# Disallow `bin` files that npm ignores (`n/no-unpublished-bin`)

💼 This rule is enabled in the following [configs](https://github.com/eslint-community/eslint-plugin-n#-configs): 🟢 `recommended-module`, ✅ `recommended-script`.

<!-- end auto-generated rule header -->

Users can safely disable this rule if using npm v10 and later.

We can publish CLI commands by `npm`. It uses `bin` field of `package.json`.

```json
{
    "name": "command-name",
    "bin": "bin/index.js"
}
```

At this time, if `npm` ignores the file, your package will fail to install.

## 📖 Rule Details

If `npm` ignores the files in `bin` field, this rule warns the files.

- If `files` field does not includes the files in `bin` field.
- If `.npmignore` file includes the files in `bin` field.

### Options

```json
{
    "rules": {
        "n/no-unpublished-bin": ["error", {
            "convertPath": null
        }]
    }
}
```

#### convertPath

This can be configured in the rule options or as a shared setting [`settings.convertPath`](../shared-settings.md#convertpath).
Please see the shared settings documentation for more information.

## 🔎 Implementation

- [Rule source](../../lib/rules/no-unpublished-bin.js)
- [Test source](../../tests/lib/rules/no-unpublished-bin.js)
