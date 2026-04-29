# n/shebang

📝 Require correct usage of hashbang.

❌ This rule is deprecated. It was replaced by [`n/hashbang`](hashbang.md).

🔧 This rule is automatically fixable by the [`--fix` CLI option](https://eslint.org/docs/latest/user-guide/command-line-interface#--fix).

<!-- end auto-generated rule header -->

When we make a CLI tool with Node.js, we add `bin` field to `package.json`, then we add a shebang the entry file.
This rule suggests correct usage of shebang.

## 📖 Rule Details

The details for this rule can be found in [docs/rules/hashbang.md](https://github.com/eslint-community/eslint-plugin-n/blob/HEAD/docs/rules/hashbang.md#-rule-details)

## 🔎 Implementation

- [Rule source](../../lib/rules/shebang.js)
- [Test source](../../tests/lib/rules/shebang.js)
