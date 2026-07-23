# n/prefer-stream-pipeline

📝 Require `stream.pipeline()` instead of `Stream#pipe()`.

<!-- end auto-generated rule header -->

`stream.pipeline` should generally be preferred as it handles error forwarding and ensures that streams are properly cleaned up.

## 📖 Rule Details

This rule reports the use of `Stream#pipe()`.

👍 Examples of **correct** code for this rule:

```js
/*eslint n/prefer-stream-pipeline: error */

import { pipeline } from 'stream/promises';

await pipeline(
  createReadStream('input.txt'),
  createGzip(),
  createWriteStream('output.gz')
);
console.log('Done!');
```

👎 Examples of **incorrect** code for this rule:

```js
/*eslint n/prefer-stream-pipeline: error */

import { createReadStream, createWriteStream } from 'fs';
import { createGzip } from 'zlib';

createReadStream('input.txt')
  .pipe(createGzip())
  .pipe(createWriteStream('output.gz'))
```

## 🔎 Implementation

- [Rule source](../../lib/rules/prefer-stream-pipeline.js)
- [Test source](../../tests/lib/rules/prefer-stream-pipeline.js)
