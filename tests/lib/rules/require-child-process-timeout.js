/** See LICENSE file in root directory for full license. */

import { RuleTester } from "#test-helpers"
import rule from "../../../lib/rules/require-child-process-timeout.js"

const methods = [
    "exec",
    "execFile",
    "execSync",
    "execFileSync",
    "spawn",
    "spawnSync",
    "fork",
]
const asyncMethods = methods.filter(name => !name.endsWith("Sync"))
const errors = name => [
    {
        messageId: name.endsWith("Sync")
            ? "missingTimeout"
            : "missingTimeoutOrSignal",
        data: { name },
    },
]
const invalid = (code, name = "exec") => ({
    code,
    errors: errors(name),
    output: null,
})

new RuleTester({
    languageOptions: { ecmaVersion: "latest", sourceType: "module" },
}).run("require-child-process-timeout", rule, {
    valid: [
        ...methods
            .filter(name => name !== "exec" && name !== "execSync")
            .map(
                name =>
                    `import { ${name} } from 'child_process'; ${name}('cmd', undefined, { timeout: 1000 })`
            ),
        ...methods.flatMap(name => [
            `import { ${name} as run } from 'node:child_process'; run('command', { timeout: 1000 })`,
            `const cp = require('child_process'); cp.${name}('command', { timeout: duration })`,
            `import * as cp from 'child_process'; cp.${name}('command', options)`,
        ]),
        ...asyncMethods.map(
            name =>
                `import { ${name} } from 'child_process'; ${name}('command', { signal: controller.signal })`
        ),
        "import { exec } from 'child_process'; exec('cmd', { timeout: 0, signal: controller.signal })",
        "import { exec } from 'child_process'; exec('cmd', { ...options })",
        "import { exec } from 'child_process'; exec('cmd', { timeout: 0, ...options })",
        "import { exec } from 'child_process'; exec('cmd', { ...options, timeout: 0 })",
        "import { exec } from 'child_process'; exec('cmd', { [key]: 1000 })",
        "import { exec } from 'child_process'; exec('cmd', { get timeout() { return 1000 } })",
        "import { exec } from 'child_process'; exec('cmd', { timeout: 1000 }, callback)",
        "import { exec } from 'child_process'; exec(...args)",
        "import { exec } from 'child_process'; exec('cmd', callback)",
        "import { spawn } from 'child_process'; spawn('cmd', args, options)",
        "import { spawn } from 'child_process'; spawn('cmd', [], { timeout: 1000 })",
        "import { exec } from 'child_process'; const options = { signal: controller.signal }; exec('cmd', options)",
        "import { exec } from 'child_process'; const options = {}; options.timeout = 1000; exec('cmd', options)",
        "import { exec } from 'child_process'; const options = {}; const alias = options; alias.timeout = 1000; exec('cmd', options)",
        "import { exec } from 'child_process'; const options = {}; const alias = options; const next = alias; next.timeout = 1000; exec('cmd', options)",
        "import { exec } from 'child_process'; let options = {}; options = getOptions(); exec('cmd', options)",
        "const exec = command => command; exec('cmd')",
        "const cp = { exec() {} }; cp.exec('cmd')",
        "function run(require) { require('child_process').exec('cmd') }",
        "import { exec } from 'somewhere-else'; exec('cmd')",
        "const { exec } = require('child_process'); function run(exec) { exec('cmd') }",
        "let { exec } = require('child_process'); exec = customExec; exec('cmd')",
        "const cp = require('child_process'); cp.exec = customExec; cp.exec('cmd')",
        "const cp = require('child_process'); const run = cp.exec; cp.exec = customExec; run('cmd')",
        "import { execFile } from 'child_process'; import { promisify } from 'util'; promisify(execFile)('cmd', [], { timeout: 1000 })",
        "import { exec } from 'child_process'; import { promisify } from 'node:util'; const run = promisify(exec); run('cmd', { signal: controller.signal })",
        "import { exec } from 'child_process'; function promisify(fn) { return customExec } promisify(exec)('cmd')",
        "import { exec } from 'child_process'; const { promisify } = require('custom-util'); promisify(exec)('cmd')",
        "import { exec } from 'child_process'; import { promisify } from 'util'; let run = promisify(exec); run = customExec; run('cmd')",
    ],
    invalid: [
        ...methods
            .filter(name => name !== "exec" && name !== "execSync")
            .map(name =>
                invalid(
                    `import { ${name} } from 'child_process'; ${name}('cmd', undefined)`,
                    name
                )
            ),
        invalid(
            "import { exec } from 'child_process'; exec('cmd', { signal: false })"
        ),
        invalid(
            "import { exec } from 'child_process'; exec('cmd', { signal: 0 })"
        ),
        ...methods.flatMap(name => [
            invalid(
                `import { ${name} } from 'node:child_process'; ${name}('command')`,
                name
            ),
            invalid(
                `import * as cp from 'child_process'; cp.${name}('command', {})`,
                name
            ),
            invalid(
                `const { ${name}: run } = require('node:child_process'); run('command', { timeout: 0 })`,
                name
            ),
            invalid(
                `require('child_process').${name}('command', { timeout: undefined })`,
                name
            ),
            invalid(
                `import cp from 'node:child_process'; cp.${name}('command', { timeout: null })`,
                name
            ),
        ]),
        ...methods
            .filter(name => name !== "exec" && name !== "execSync")
            .flatMap(name => [
                invalid(
                    `const cp = require('child_process'); cp.${name}('command', [])`,
                    name
                ),
                invalid(
                    `const cp = require('child_process'); cp.${name}('command', ['arg'], {})`,
                    name
                ),
            ]),
        ...asyncMethods.map(name =>
            invalid(
                `import { ${name} } from 'child_process'; ${name}('cmd', { signal: null })`,
                name
            )
        ),
        ...methods
            .filter(name => name.endsWith("Sync"))
            .map(name =>
                invalid(
                    `import { ${name} } from 'child_process'; ${name}('cmd', { signal: controller.signal })`,
                    name
                )
            ),
        invalid("import { exec } from 'child_process'; exec('cmd', () => {})"),
        invalid(
            "import { exec } from 'child_process'; exec('cmd', {}, () => {})"
        ),
        invalid(
            "import { execFile } from 'child_process'; execFile('cmd', [], () => {})",
            "execFile"
        ),
        invalid(
            "import { exec } from 'child_process'; function done() {} exec('cmd', done)"
        ),
        invalid(
            "import { exec } from 'child_process'; const options = {}; const alias = options; exec('cmd', alias)"
        ),
        invalid(
            "import { exec } from 'child_process'; exec('cmd', { ['timeout']: 0 })"
        ),
        invalid(
            "import { exec } from 'child_process'; const key = 'signal'; exec('cmd', { [key]: undefined })"
        ),
        invalid(
            "import { exec } from 'child_process'; exec('cmd', { timeout: -1 })"
        ),
        invalid(
            "import { exec } from 'child_process'; exec('cmd', { timeout: 1000, timeout: 0 })"
        ),
        invalid(
            "import { exec } from 'child_process'; exec('cmd', { signal: controller.signal, signal: null })"
        ),
        invalid(
            "import { execSync } from 'child_process'; execSync('cmd', { ...options, timeout: 0 })",
            "execSync"
        ),
        invalid(
            "const cp = process.getBuiltinModule('node:child_process'); cp.exec('cmd')"
        ),
        invalid(
            "import { exec as run } from 'child_process'; const alias = run; alias('cmd')"
        ),
        invalid(
            "import { exec } from 'child_process'; import { promisify } from 'util'; promisify(exec)('cmd')"
        ),
        invalid(
            "import { execFile as run } from 'node:child_process'; import { promisify as promise } from 'node:util'; const execute = promise(run); execute('cmd', [])",
            "execFile"
        ),
        invalid(
            "const { exec } = require('child_process'); const { promisify } = require('util'); const run = promisify(exec); run('cmd')"
        ),
        invalid(
            "const cp = require('node:child_process'); const util = require('node:util'); util.promisify(cp.exec)('cmd')"
        ),
        invalid(
            "import * as cp from 'child_process'; import util from 'util'; const run = util.promisify(cp.exec); run('cmd')"
        ),
        invalid(
            "const cp = require('child_process'); const run = cp.exec; require('util').promisify(run)('cmd')"
        ),
    ],
})
