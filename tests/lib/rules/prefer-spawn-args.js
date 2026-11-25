/** See LICENSE file in root directory for full license. */

import { RuleTester } from "#test-helpers"
import rule from "../../../lib/rules/prefer-spawn-args.js"

const errors = name => [{ messageId: "separateArgs", data: { name } }]
const invalid = (code, name = "spawn") => ({
    code,
    errors: errors(name),
    output: null,
})

new RuleTester({
    languageOptions: { ecmaVersion: "latest", sourceType: "module" },
}).run("prefer-spawn-args", rule, {
    valid: [
        "import { spawn } from 'child_process'; spawn('echo', ['foo', 'bar'])",
        "import { spawnSync } from 'node:child_process'; spawnSync('echo')",
        "import { execFile } from 'child_process'; execFile('git', ['status'])",
        "import { execFileSync } from 'child_process'; execFileSync('node', ['-v'])",
        "import { spawn } from 'child_process'; spawn('echo hello', { shell: true })",
        "import { spawnSync } from 'child_process'; spawnSync('echo hello', [], { shell: true })",
        "import { execFile } from 'child_process'; execFile('echo hello', [], { shell: '/bin/bash' })",
        "import { spawn } from 'child_process'; spawn('echo hello', [], { shell: enabled })",
        "import { spawn } from 'child_process'; spawn('echo hello', { ...options })",
        "import { spawn } from 'child_process'; spawn('echo hello', { shell: false, ...options })",
        "import { spawn } from 'child_process'; spawn('echo hello', args)",
        "import { spawn } from 'child_process'; spawn('echo hello', options)",
        "import { spawn } from 'child_process'; spawn('echo hello', ...args)",
        "import { spawn } from 'child_process'; spawn(command, [])",
        "import { spawn } from 'child_process'; spawn(`echo ${name}`)",
        "import { spawn } from 'child_process'; spawn('echo ')",
        "import { spawn } from 'child_process'; spawn('echo')",
        "import { exec } from 'child_process'; exec('echo hello')",
        "import { execSync } from 'child_process'; execSync('echo hello')",
        "import { fork } from 'child_process'; fork('my script.js')",
        "const spawn = command => command; spawn('echo hello')",
        "const cp = { spawn() {} }; cp.spawn('echo hello')",
        "const cp = require('some-other-module'); cp.spawn('echo hello')",
        "function run(require) { require('child_process').spawn('echo hello') }",
        "import { spawn } from 'unrelated-module'; spawn('echo hello')",
        "import { spawn } from 'child_process'; spawn('echo hello', null, { shell: true })",
        "import { spawn } from 'child_process'; spawn('echo hello', [], { shell: true, shell: false, ...options })",
    ],
    invalid: [
        ...["spawn", "spawnSync", "execFile", "execFileSync"].flatMap(name => [
            invalid(
                `import { ${name} } from 'child_process'; ${name}('echo hello')`,
                name
            ),
            invalid(
                `import * as cp from 'node:child_process'; cp.${name}('echo hello', [])`,
                name
            ),
            invalid(
                `const cp = require('child_process'); cp.${name}('echo hello', [], { shell: false })`,
                name
            ),
        ]),
        invalid(
            "import { spawn as run } from 'node:child_process'; run('npm run build')"
        ),
        invalid(
            "const { spawn } = require('node:child_process'); spawn('git status')"
        ),
        invalid("require('child_process').spawn('echo hello')"),
        invalid(
            "process.getBuiltinModule('node:child_process').spawn('echo hello')"
        ),
        invalid(
            "import { spawnSync } from 'node:child_process'; spawnSync(`echo hello`)",
            "spawnSync"
        ),
        invalid(
            "import { spawn } from 'child_process'; const command = 'echo hello'; spawn(command)"
        ),
        invalid("import { spawn } from 'child_process'; spawn('echo\\tworld')"),
        invalid(
            "import { spawn } from 'child_process'; spawn('echo hello', ['world'], {})"
        ),
        invalid(
            "import { spawn } from 'child_process'; spawn('echo hello', [], { ...options, shell: false })"
        ),
        invalid(
            "import { spawn } from 'child_process'; spawn('echo hello', { shell: true, shell: false })"
        ),
        invalid(
            "import { spawn } from 'child_process'; spawn('echo hello', undefined, { shell: false })"
        ),
        invalid(
            "import { execFile } from 'node:child_process'; execFile('git status', ['--short'])",
            "execFile"
        ),
    ],
})
