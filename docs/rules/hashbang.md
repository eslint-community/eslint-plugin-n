# Require correct usage of hashbang (`n/hashbang`)

💼 This rule is enabled in the following [configs](https://github.com/eslint-community/eslint-plugin-n#-configs): 🌐 `all`, 🟢 `recommended-module`, ✅ `recommended-script`.

🔧 This rule is automatically fixable by the [`--fix` CLI option](https://eslint.org/docs/latest/user-guide/command-line-interface#--fix).

<!-- end auto-generated rule header -->

When we make a CLI tool with Node.js, we add `bin` field to `package.json`, then we add a hashbang the entry file.
This rule suggests correct usage of hashbang.

## 📖 Rule Details

This rule looks up `package.json` file from each linting target file.
Starting from the directory of the target file, it goes up ancestor directories until found.

If `package.json` was not found, this rule does nothing.

This rule checks `bin` field of `package.json`, then if a target file matches one of `bin` files, it checks whether or not there is a correct hashbang.
Otherwise it checks whether or not there is not a hashbang.

The following patterns are considered problems for files in `bin` field of `package.json`:

```js
console.log("hello"); /*error This file needs hashbang "#!/usr/bin/env node".*/
```

```js
#!/usr/bin/env node  /*error This file must not have Unicode BOM.*/
console.log("hello");
// If this file has Unicode BOM.
```

```js
#!/usr/bin/env node  /*error This file must have Unix linebreaks (LF).*/
console.log("hello");
// If this file has Windows' linebreaks (CRLF).
```

The following patterns are considered problems for other files:

```js
#!/usr/bin/env node   /*error This file needs no hashbang.*/
console.log("hello");
```

The following patterns are not considered problems for files in `bin` field of `package.json`:

```js
#!/usr/bin/env node
console.log("hello");
```

The following patterns are not considered problems for other files:

```js
console.log("hello");
```

### Options

```json
{
    "n/hashbang": ["error", {
        "convertPath": null,
        "ignoreUnpublished": false,
        "additionalExecutables": [],
        "executableMap": {
            ".js": "node"
        }
    }]
}
```

#### convertPath

This can be configured in the rule options or as a shared setting [`settings.convertPath`](../shared-settings.md#convertpath).
Please see the shared settings documentation for more information.

#### ignoreUnpublished

Allow for files that are not published to npm to be ignored by this rule.

#### additionalExecutables

Mark files as executable that are not referenced by the package.json#bin property

#### executableMap

Allow for different executables to be used based on file extension.
This is in the form `"{extension}": "{binaryName}"`.

```js
{
    ".js": "node",
    ".ts": "ts-node"
}
```

## 🔎 Implementation

- [Rule source](../../lib/rules/hashbang.js)
- [Test source](../../tests/lib/rules/hashbang.js)
