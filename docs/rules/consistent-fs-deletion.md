# n/consistent-fs-deletion

📝 Enforce `fs.rm` over `fs.unlink` and `fs.rmdir`.

<!-- end auto-generated rule header -->

We have 3 APIs for deleting files and directories: `fs.rm`, `fs.unlink` and `fs.rmdir`.
This rule enforces the consistent use of `fs.rm`, making it easy to find all deleting operations by searching `fs.rm` in the codebase.

## 📖 Rule Details

This rule reports calls to `fs.unlink`, `fs.rmdir`, `fs.unlinkSync`, `fs.rmdirSync`, `fs.promises.unlink`, and `fs.promises.rmdir`.

👍 Examples of **correct** code for this rule:

```js
/*eslint n/consistent-fs-deletion: error */

import fs from 'node:fs';

fs.rm('path', (err) => {});
fs.rmSync('path');
fs.promises.rm('path');
```

👎 Examples of **incorrect** code for this rule:

```js
/*eslint n/consistent-fs-deletion: error */

import fs from 'node:fs';

fs.unlink('path', (err) => {});
fs.rmdir('path', (err) => {});
fs.unlinkSync('path');
fs.rmdirSync('path');
fs.promises.unlink('path');
fs.promises.rmdir('path');
```

## 🔎 Implementation

- [Rule source](../../lib/rules/consistent-fs-deletion.js)
- [Test source](../../tests/lib/rules/consistent-fs-deletion.js)
