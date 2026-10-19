# n/require-child-process-timeout

📝 Require a timeout or signal for child processes.

<!-- end auto-generated rule header -->

A child process can wait indefinitely for a daemon, network connection, or input.
Callers waiting for that process can get stuck too. A timeout or an abort signal
lets the application bound how long it waits.

## 📖 Rule Details

This rule reports `child_process` calls with no execution bound:

- `execSync`, `execFileSync`, and `spawnSync` need a positive `timeout`.
- `exec`, `execFile`, `spawn`, and `fork` need a positive `timeout` or a `signal`.

It recognizes CommonJS and ES module imports, aliases, `node:` specifiers,
`process.getBuiltinModule()`, and `util.promisify()` wrappers for `exec` and
`execFile`. A statically known zero, negative, null, or undefined timeout does
not provide a bound. A null or undefined signal does not provide a bound either.
Synchronous APIs do not support abort signals.

👎 Examples of **incorrect** code for this rule:

```js
/*eslint n/require-child-process-timeout: error */

import { execSync, execFile, spawn } from "node:child_process"
import { promisify } from "node:util"

execSync("docker ps")
promisify(execFile)("gh", ["api", "user"])
spawn("docker", ["logs", "-f", "container"], { timeout: 0 })
```

👍 Examples of **correct** code for this rule:

```js
/*eslint n/require-child-process-timeout: error */

import { execSync, execFile, spawn } from "node:child_process"
import { promisify } from "node:util"

execSync("docker ps", { timeout: 10_000 })
promisify(execFile)("gh", ["api", "user"], { timeout: 60_000 })
spawn("docker", ["logs", "-f", "container"], {
    signal: AbortSignal.timeout(60_000),
})
```

### Options

This rule has no options and is not enabled in the recommended configurations.
Enable it explicitly when child processes should have bounded lifetimes.
For an intentionally long-running process, use an ESLint disable comment with
an explanation.

### Limitations

The rule skips cases it cannot determine statically, such as dynamic options,
unknown argument lists, unknown spreads, and reassigned API bindings. It follows
unchanged local options objects, but does not perform interprocedural analysis.
An unknown timeout or signal value is accepted; the rule cannot prove that a
signal will ever abort or that a runtime timeout is positive.

There is no automatic fix because the appropriate timeout and cancellation
policy depend on the application. A timeout sends a termination signal; it does
not guarantee that a child that ignores that signal will exit.

## 🔎 Implementation

- [Rule source](../../lib/rules/require-child-process-timeout.js)
- [Test source](../../tests/lib/rules/require-child-process-timeout.js)
