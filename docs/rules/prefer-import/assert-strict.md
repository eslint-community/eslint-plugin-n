# n/prefer-import/assert-strict

📝 Enforce using `node:assert/strict` instead of `node:assert`.

<!-- end auto-generated rule header -->

## 📖 Rule Details

The `node:assert` module exposes [legacy](https://nodejs.org/api/assert.html#legacy-assertion-mode), non-strict assertion methods. The `node:assert/strict` module changes the legacy methods to use strict equality.

👍 Examples of **correct** code for this rule:

```js
/*eslint n/prefer-import/assert-strict: error */

import assert from "node:assert/strict"
import("node:assert/strict")
const assert = require("node:assert/strict")

// These forms already select strict assertion mode.
import { strict as strictAssert } from "node:assert"
const requiredAssert = require("node:assert").strict
```

👎 Examples of **incorrect** code for this rule:

```js
/*eslint n/prefer-import/assert-strict: error */

import assert from "node:assert"
import("node:assert")
const assert = require("node:assert")
```

## 🔎 Implementation

- [Rule source](../../../lib/rules/prefer-import/assert-strict.js)
- [Test source](../../../tests/lib/rules/prefer-import/assert-strict.js)
