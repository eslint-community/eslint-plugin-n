# Disallow the use of `process.env` (`n/no-process-env`)

💼 This rule is enabled in the 🌐 `all` [config](https://github.com/eslint-community/eslint-plugin-n#-configs).

<!-- end auto-generated rule header -->

The `process.env` object in Node.js is used to store deployment/configuration parameters. Littering it through out a project could lead to maintenance issues as it's another kind of global dependency. As such, it could lead to merge conflicts in a multi-user setup and deployment issues in a multi-server setup. Instead, one of the best practices is to define all those parameters in a single configuration/settings file which could be accessed throughout the project.

## 📖 Rule Details

This rule is aimed at discouraging use of `process.env` to avoid global dependencies. As such, it will warn whenever `process.env` is used.

Examples of **incorrect** code for this rule:

```js
/*eslint n/no-process-env: "error"*/

if(process.env.NODE_ENV === "development") {
    //...
}
```

Examples of **correct** code for this rule:

```js
/*eslint n/no-process-env: "error"*/

var config = require("./config");

if(config.env === "development") {
    //...
}
```

### Options

```json
{
    "rules": {
        "n/no-process-env": ["error", {
            "allowedVariables": ["NODE_ENV"]
        }]
    }
}
```

#### allowedVariables

Sometimes you need to allow specific environment variables, this option allows you to exclude specific variables from triggering a linting error.

## 🔎 Implementation

- [Rule source](../../lib/rules/no-process-env.js)
- [Test source](../../tests/lib/rules/no-process-env.js)
