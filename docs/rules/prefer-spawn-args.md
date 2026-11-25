# n/prefer-spawn-args

📝 Disallow arguments embedded in child process executable names.

<!-- end auto-generated rule header -->

`spawn()`, `spawnSync()`, `execFile()`, and `execFileSync()` expect the
executable name as their first argument. Arguments belong in a separate array.

Passing a command and its arguments as one string can cause an executable lookup
failure or run something other than intended, depending on the environment.

## 📖 Rule Details

This rule reports statically known command strings containing whitespace between
words when they are passed to these four methods without shell mode.

👎 Examples of **incorrect** code for this rule:

```js
/*eslint n/prefer-spawn-args: "error" */

import { spawn, spawnSync, execFile } from "node:child_process"

spawn("git status")
spawnSync("echo hello world")
execFile("node -v")
```

👍 Examples of **correct** code for this rule:

```js
/*eslint n/prefer-spawn-args: "error" */

import { spawn, spawnSync, execFile, exec } from "node:child_process"

spawn("git", ["status"])
spawnSync("echo", ["hello", "world"])
execFile("node", ["-v"])

// Shell mode handles full command strings
spawn("echo hello world", { shell: true })
exec("echo hello world")

// Dynamic command strings are not checked
spawn(command, args)
```

The rule recognizes CommonJS and ES module imports, destructured or renamed
imports, `node:` specifiers and `process.getBuiltinModule()`.

### Options

This rule has no options and is not part of the recommended configurations.

### Limitations

The rule deliberately skips dynamic commands, unknown argument lists and
options that might enable shell mode. It only reports commands with statically
known whitespace, not every invalid executable name.

Executable paths can legitimately contain spaces. If a project uses paths like
these, disable this opt-in rule for those calls.

There is no automatic fix because splitting a command safely requires
understanding quoted arguments and platform-specific parsing.

## 🔎 Implementation

- [Rule source](../../lib/rules/prefer-spawn-args.js)
- [Test source](../../tests/lib/rules/prefer-spawn-args.js)
