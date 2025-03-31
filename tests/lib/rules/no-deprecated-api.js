/**
 * @author Toru Nagashima
 * See LICENSE file in root directory for full license.
 */
"use strict"

const { RuleTester } = require("#test-helpers")
const rule = require("../../../lib/rules/no-deprecated-api")

const ruleTester = new RuleTester()
ruleTester.run("no-deprecated-api", rule, {
    valid: [
        {
            code: "require('buffer').Buffer",
        },
        {
            code: "require('node:buffer').Buffer",
        },
        {
            code: "foo(require('buffer').Buffer)",
        },
        {
            code: "new (require('another-buffer').Buffer)()",
        },
        {
            code: "var http = require('http'); http.request()",
        },
        {
            code: "var {request} = require('http'); request()",
        },
        {
            code: "(s ? require('https') : require('http')).request()",
        },
        {
            code: "require(HTTP).createClient",
        },
        {
            code: "import {Buffer} from 'another-buffer'; new Buffer()",
            languageOptions: { sourceType: "module" },
        },
        {
            code: "import {request} from 'http'; request()",
            languageOptions: { sourceType: "module" },
        },
        {
            code: "const {Buffer} = process.getBuiltinModule('another-buffer'); new Buffer()",
        },
        {
            code: "const {request} = process.getBuiltinModule('http'); request()",
        },

        // On Node v6.8.0, fs.existsSync revived.
        {
            code: "require('fs').existsSync;",
        },

        // use third parties.
        {
            code: "require('domain/');",
        },
        {
            code: "import domain from 'domain/';",
            languageOptions: { sourceType: "module" },
        },

        // https://github.com/mysticatea/eslint-plugin-node/issues/55
        {
            code: "undefinedVar = require('fs')",
        },

        // ignore options
        {
            code: "new (require('buffer').Buffer)()",
            options: [
                {
                    //
                    ignoreModuleItems: ["new buffer.Buffer()"],
                },
            ],
        },
        {
            code: "require('buffer').Buffer()",
            options: [
                {
                    //
                    ignoreModuleItems: ["buffer.Buffer()"],
                },
            ],
        },
        {
            code: "require('node:buffer').Buffer()",
            options: [
                {
                    //
                    ignoreModuleItems: ["buffer.Buffer()"],
                },
            ],
        },
        {
            code: "require('domain');",
            options: [
                {
                    //
                    ignoreModuleItems: ["domain"],
                },
            ],
        },
        {
            code: "require('events').EventEmitter.listenerCount;",
            options: [
                {
                    //
                    ignoreModuleItems: ["events.EventEmitter.listenerCount"],
                },
            ],
        },
        {
            code: "require('events').listenerCount;",
            options: [
                {
                    //
                    ignoreModuleItems: ["events.listenerCount"],
                },
            ],
        },
        {
            code: "new Buffer;",
            options: [
                {
                    //
                    ignoreGlobalItems: ["new Buffer()"],
                },
            ],
        },
        {
            code: "Buffer();",
            options: [
                {
                    //
                    ignoreGlobalItems: ["Buffer()"],
                },
            ],
        },
        {
            code: "Intl.v8BreakIterator;",
            options: [
                {
                    //
                    ignoreGlobalItems: ["Intl.v8BreakIterator"],
                },
            ],
        },
        {
            code: "let {env: {NODE_REPL_HISTORY_FILE}} = process;",
            options: [
                {
                    //
                    ignoreGlobalItems: ["process.env.NODE_REPL_HISTORY_FILE"],
                },
            ],
        },

        // https://github.com/mysticatea/eslint-plugin-node/issues/65
        {
            code: 'require("domain/")',
            options: [{ ignoreIndirectDependencies: true }],
        },

        // https://github.com/mysticatea/eslint-plugin-node/issues/87
        {
            code: 'let fs = fs || require("fs")',
        },
    ],
    invalid: [
        //----------------------------------------------------------------------
        // Modules
        //----------------------------------------------------------------------
        {
            code: "new (require('buffer').Buffer)()",
            options: [{ version: "6.0.0" }],
            errors: [
                "'new buffer.Buffer()' was deprecated since v6.0.0. Use 'buffer.Buffer.alloc()' or 'buffer.Buffer.from()' instead.",
            ],
        },
        {
            code: "new (require('node:buffer').Buffer)()",
            options: [{ version: "6.0.0" }],
            errors: [
                "'new buffer.Buffer()' was deprecated since v6.0.0. Use 'buffer.Buffer.alloc()' or 'buffer.Buffer.from()' instead.",
            ],
        },
        {
            code: "require('buffer').Buffer()",
            options: [{ version: "6.0.0" }],
            errors: [
                "'buffer.Buffer()' was deprecated since v6.0.0. Use 'buffer.Buffer.alloc()' or 'buffer.Buffer.from()' instead.",
            ],
        },
        {
            code: "require('node:buffer').Buffer()",
            options: [{ version: "6.0.0" }],
            errors: [
                "'buffer.Buffer()' was deprecated since v6.0.0. Use 'buffer.Buffer.alloc()' or 'buffer.Buffer.from()' instead.",
            ],
        },
        {
            code: "var b = require('buffer'); new b.Buffer()",
            options: [{ version: "6.0.0" }],
            errors: [
                "'new buffer.Buffer()' was deprecated since v6.0.0. Use 'buffer.Buffer.alloc()' or 'buffer.Buffer.from()' instead.",
            ],
        },
        {
            code: "var b = require('buffer'); new b['Buffer']()",
            options: [{ version: "6.0.0" }],
            errors: [
                "'new buffer.Buffer()' was deprecated since v6.0.0. Use 'buffer.Buffer.alloc()' or 'buffer.Buffer.from()' instead.",
            ],
        },
        {
            code: "var b = require('buffer'); new b[`Buffer`]()",
            options: [{ version: "6.0.0" }],
            errors: [
                "'new buffer.Buffer()' was deprecated since v6.0.0. Use 'buffer.Buffer.alloc()' or 'buffer.Buffer.from()' instead.",
            ],
        },
        {
            code: "var b = require('buffer').Buffer; new b()",
            options: [{ version: "6.0.0" }],
            errors: [
                "'new buffer.Buffer()' was deprecated since v6.0.0. Use 'buffer.Buffer.alloc()' or 'buffer.Buffer.from()' instead.",
            ],
        },
        {
            code: "var b; new ((b = require('buffer')).Buffer)(); new b.Buffer()",
            options: [{ version: "6.0.0" }],
            errors: [
                "'new buffer.Buffer()' was deprecated since v6.0.0. Use 'buffer.Buffer.alloc()' or 'buffer.Buffer.from()' instead.",
                "'new buffer.Buffer()' was deprecated since v6.0.0. Use 'buffer.Buffer.alloc()' or 'buffer.Buffer.from()' instead.",
            ],
        },
        {
            code: "var {Buffer: b} = require('buffer'); new b()",
            options: [{ version: "6.0.0" }],
            errors: [
                "'new buffer.Buffer()' was deprecated since v6.0.0. Use 'buffer.Buffer.alloc()' or 'buffer.Buffer.from()' instead.",
            ],
        },
        {
            code: "var {['Buffer']: b = null} = require('buffer'); new b()",
            options: [{ version: "6.0.0" }],
            errors: [
                "'new buffer.Buffer()' was deprecated since v6.0.0. Use 'buffer.Buffer.alloc()' or 'buffer.Buffer.from()' instead.",
            ],
        },
        {
            code: "var {'Buffer': b = null} = require('buffer'); new b()",
            options: [{ version: "6.0.0" }],
            errors: [
                "'new buffer.Buffer()' was deprecated since v6.0.0. Use 'buffer.Buffer.alloc()' or 'buffer.Buffer.from()' instead.",
            ],
        },
        {
            code: "var {Buffer: b = require('buffer').Buffer} = {}; new b()",
            options: [{ version: "6.0.0" }],
            errors: [
                "'new buffer.Buffer()' was deprecated since v6.0.0. Use 'buffer.Buffer.alloc()' or 'buffer.Buffer.from()' instead.",
            ],
        },
        {
            code: "require('buffer').SlowBuffer",
            options: [{ version: "6.0.0" }],
            errors: [
                "'buffer.SlowBuffer' was deprecated since v6.0.0. Use 'buffer.Buffer.allocUnsafeSlow()' instead.",
            ],
        },
        {
            code: "require('node:buffer').SlowBuffer",
            options: [{ version: "6.0.0" }],
            errors: [
                "'buffer.SlowBuffer' was deprecated since v6.0.0. Use 'buffer.Buffer.allocUnsafeSlow()' instead.",
            ],
        },
        {
            code: "var b = require('buffer'); b.SlowBuffer",
            options: [{ version: "6.0.0" }],
            errors: [
                "'buffer.SlowBuffer' was deprecated since v6.0.0. Use 'buffer.Buffer.allocUnsafeSlow()' instead.",
            ],
        },
        {
            code: "var {SlowBuffer: b} = require('buffer');",
            options: [{ version: "6.0.0" }],
            errors: [
                "'buffer.SlowBuffer' was deprecated since v6.0.0. Use 'buffer.Buffer.allocUnsafeSlow()' instead.",
            ],
        },

        //----------------------------------------------------------------------
        {
            code: "require('_linklist');",
            options: [{ version: "5.0.0" }],
            errors: ["'_linklist' module was deprecated since v5.0.0."],
        },
        {
            code: "require('async_hooks').currentId;",
            options: [{ version: "8.2.0" }],
            errors: [
                "'async_hooks.currentId' was deprecated since v8.2.0. Use 'async_hooks.executionAsyncId()' instead.",
            ],
        },
        {
            code: "require('async_hooks').triggerId;",
            options: [{ version: "8.2.0" }],
            errors: [
                "'async_hooks.triggerId' was deprecated since v8.2.0. Use 'async_hooks.triggerAsyncId()' instead.",
            ],
        },
        {
            code: "require('constants');",
            options: [{ version: "6.3.0" }],
            errors: [
                "'constants' module was deprecated since v6.3.0. Use 'constants' property of each module instead.",
            ],
        },
        {
            code: "require('crypto').Credentials;",
            options: [{ version: "0.12.0" }],
            errors: [
                "'crypto.Credentials' was deprecated since v0.12.0. Use 'tls.SecureContext' instead.",
            ],
        },
        {
            code: "require('crypto').createCredentials;",
            options: [{ version: "0.12.0" }],
            errors: [
                "'crypto.createCredentials' was deprecated since v0.12.0. Use 'tls.createSecureContext()' instead.",
            ],
        },
        {
            code: "require('domain');",
            options: [{ version: "4.0.0" }],
            errors: ["'domain' module was deprecated since v4.0.0."],
        },
        {
            code: "require('events').EventEmitter.listenerCount;",
            options: [{ version: "4.0.0" }],
            errors: [
                "'events.EventEmitter.listenerCount' was deprecated since v4.0.0. Use 'events.EventEmitter#listenerCount()' instead.",
            ],
        },
        {
            code: "require('events').listenerCount;",
            options: [{ version: "4.0.0" }],
            errors: [
                "'events.listenerCount' was deprecated since v4.0.0. Use 'events.EventEmitter#listenerCount()' instead.",
            ],
        },
        {
            code: "require('freelist');",
            options: [{ version: "4.0.0" }],
            errors: ["'freelist' module was deprecated since v4.0.0."],
        },
        {
            code: "require('fs').SyncWriteStream;",
            options: [{ version: "4.0.0" }],
            errors: ["'fs.SyncWriteStream' was deprecated since v4.0.0."],
        },
        {
            code: "require('fs').exists;",
            options: [{ version: "4.0.0" }],
            errors: [
                "'fs.exists' was deprecated since v4.0.0. Use 'fs.stat()' or 'fs.access()' instead.",
            ],
        },
        {
            code: "require('fs').lchmod;",
            options: [{ version: "0.4.0" }],
            errors: ["'fs.lchmod' was deprecated since v0.4.0."],
        },
        {
            code: "require('fs').lchmodSync;",
            options: [{ version: "0.4.0" }],
            errors: ["'fs.lchmodSync' was deprecated since v0.4.0."],
        },
        {
            code: "require('http').createClient;",
            options: [{ version: "0.10.0" }],
            errors: [
                "'http.createClient' was deprecated since v0.10.0. Use 'http.request()' instead.",
            ],
        },
        {
            code: "require('module').requireRepl;",
            options: [{ version: "6.0.0" }],
            errors: [
                "'module.requireRepl' was deprecated since v6.0.0. Use 'require(\"repl\")' instead.",
            ],
        },
        {
            code: "require('module').Module.requireRepl;",
            options: [{ version: "6.0.0" }],
            errors: [
                "'module.Module.requireRepl' was deprecated since v6.0.0. Use 'require(\"repl\")' instead.",
            ],
        },
        {
            code: "require('module')._debug;",
            options: [{ version: "9.0.0" }],
            errors: ["'module._debug' was deprecated since v9.0.0."],
        },
        {
            code: "require('module').Module._debug;",
            options: [{ version: "9.0.0" }],
            errors: ["'module.Module._debug' was deprecated since v9.0.0."],
        },
        {
            code: "require('os').getNetworkInterfaces;",
            options: [{ version: "0.6.0" }],
            errors: [
                "'os.getNetworkInterfaces' was deprecated since v0.6.0. Use 'os.networkInterfaces()' instead.",
            ],
        },
        {
            code: "require('os').tmpDir;",
            options: [{ version: "7.0.0" }],
            errors: [
                "'os.tmpDir' was deprecated since v7.0.0. Use 'os.tmpdir()' instead.",
            ],
        },
        {
            code: "require('path')._makeLong;",
            options: [{ version: "9.0.0" }],
            errors: [
                "'path._makeLong' was deprecated since v9.0.0. Use 'path.toNamespacedPath()' instead.",
            ],
        },
        {
            code: "require('punycode');",
            options: [{ version: "7.0.0" }],
            errors: [
                "'punycode' module was deprecated since v7.0.0. Use 'https://www.npmjs.com/package/punycode' instead.",
            ],
        },
        {
            code: "require('readline').codePointAt;",
            options: [{ version: "4.0.0" }],
            errors: ["'readline.codePointAt' was deprecated since v4.0.0."],
        },
        {
            code: "require('readline').getStringWidth;",
            options: [{ version: "6.0.0" }],
            errors: ["'readline.getStringWidth' was deprecated since v6.0.0."],
        },
        {
            code: "require('readline').isFullWidthCodePoint;",
            options: [{ version: "6.0.0" }],
            errors: [
                "'readline.isFullWidthCodePoint' was deprecated since v6.0.0.",
            ],
        },
        {
            code: "require('readline').stripVTControlCharacters;",
            options: [{ version: "6.0.0" }],
            errors: [
                "'readline.stripVTControlCharacters' was deprecated since v6.0.0.",
            ],
        },
        {
            code: "require('sys');",
            options: [{ version: "0.3.0" }],
            errors: [
                "'sys' module was deprecated since v0.3.0. Use 'util' module instead.",
            ],
        },
        {
            code: "require('tls').CleartextStream;",
            options: [{ version: "0.10.0" }],
            errors: ["'tls.CleartextStream' was deprecated since v0.10.0."],
        },
        {
            code: "require('tls').CryptoStream;",
            options: [{ version: "0.12.0" }],
            errors: [
                "'tls.CryptoStream' was deprecated since v0.12.0. Use 'tls.TLSSocket' instead.",
            ],
        },
        {
            code: "require('tls').SecurePair;",
            options: [{ version: "6.0.0" }],
            errors: [
                "'tls.SecurePair' was deprecated since v6.0.0. Use 'tls.TLSSocket' instead.",
            ],
        },
        {
            code: "require('tls').createSecurePair;",
            options: [{ version: "6.0.0" }],
            errors: [
                "'tls.createSecurePair' was deprecated since v6.0.0. Use 'tls.TLSSocket' instead.",
            ],
        },
        {
            code: "require('tls').parseCertString;",
            options: [{ version: "8.6.0" }],
            errors: [
                "'tls.parseCertString' was deprecated since v8.6.0. Use 'querystring.parse()' instead.",
            ],
        },
        {
            code: "require('tty').setRawMode;",
            options: [{ version: "0.10.0" }],
            errors: [
                "'tty.setRawMode' was deprecated since v0.10.0. Use 'tty.ReadStream#setRawMode()' (e.g. 'process.stdin.setRawMode()') instead.",
            ],
        },
        {
            code: "require('util').debug;",
            options: [{ version: "0.12.0" }],
            errors: [
                "'util.debug' was deprecated since v0.12.0. Use 'console.error()' instead.",
            ],
        },
        {
            code: "require('util').error;",
            options: [{ version: "0.12.0" }],
            errors: [
                "'util.error' was deprecated since v0.12.0. Use 'console.error()' instead.",
            ],
        },
        {
            code: "require('util').isArray;",
            options: [{ version: "4.0.0" }],
            errors: [
                "'util.isArray' was deprecated since v4.0.0. Use 'Array.isArray()' instead.",
            ],
        },
        {
            code: "require('util').isBoolean;",
            options: [{ version: "4.0.0" }],
            errors: ["'util.isBoolean' was deprecated since v4.0.0."],
        },
        {
            code: "require('util').isBuffer;",
            options: [{ version: "4.0.0" }],
            errors: [
                "'util.isBuffer' was deprecated since v4.0.0. Use 'Buffer.isBuffer()' instead.",
            ],
        },
        {
            code: "require('util').isDate;",
            options: [{ version: "4.0.0" }],
            errors: ["'util.isDate' was deprecated since v4.0.0."],
        },
        {
            code: "require('util').isError;",
            options: [{ version: "4.0.0" }],
            errors: ["'util.isError' was deprecated since v4.0.0."],
        },
        {
            code: "require('util').isFunction;",
            options: [{ version: "4.0.0" }],
            errors: ["'util.isFunction' was deprecated since v4.0.0."],
        },
        {
            code: "require('util').isNull;",
            options: [{ version: "4.0.0" }],
            errors: ["'util.isNull' was deprecated since v4.0.0."],
        },
        {
            code: "require('util').isNullOrUndefined;",
            options: [{ version: "4.0.0" }],
            errors: ["'util.isNullOrUndefined' was deprecated since v4.0.0."],
        },
        {
            code: "require('util').isNumber;",
            options: [{ version: "4.0.0" }],
            errors: ["'util.isNumber' was deprecated since v4.0.0."],
        },
        {
            code: "require('util').isObject;",
            options: [{ version: "4.0.0" }],
            errors: ["'util.isObject' was deprecated since v4.0.0."],
        },
        {
            code: "require('util').isPrimitive;",
            options: [{ version: "4.0.0" }],
            errors: ["'util.isPrimitive' was deprecated since v4.0.0."],
        },
        {
            code: "require('util').isRegExp;",
            options: [{ version: "4.0.0" }],
            errors: ["'util.isRegExp' was deprecated since v4.0.0."],
        },
        {
            code: "require('util').isString;",
            options: [{ version: "4.0.0" }],
            errors: ["'util.isString' was deprecated since v4.0.0."],
        },
        {
            code: "require('util').isSymbol;",
            options: [{ version: "4.0.0" }],
            errors: ["'util.isSymbol' was deprecated since v4.0.0."],
        },
        {
            code: "require('util').isUndefined;",
            options: [{ version: "4.0.0" }],
            errors: ["'util.isUndefined' was deprecated since v4.0.0."],
        },
        {
            code: "require('util').log;",
            options: [{ version: "6.0.0" }],
            errors: [
                "'util.log' was deprecated since v6.0.0. Use a third party module instead.",
            ],
        },
        {
            code: "require('util').print;",
            options: [{ version: "0.12.0" }],
            errors: [
                "'util.print' was deprecated since v0.12.0. Use 'console.log()' instead.",
            ],
        },
        {
            code: "require('util').pump;",
            options: [{ version: "0.10.0" }],
            errors: [
                "'util.pump' was deprecated since v0.10.0. Use 'stream.Readable#pipe()' instead.",
            ],
        },
        {
            code: "require('util').puts;",
            options: [{ version: "0.12.0" }],
            errors: [
                "'util.puts' was deprecated since v0.12.0. Use 'console.log()' instead.",
            ],
        },
        {
            code: "require('util')._extend;",
            options: [{ version: "6.0.0" }],
            errors: [
                "'util._extend' was deprecated since v6.0.0. Use 'Object.assign()' instead.",
            ],
        },
        {
            code: "require('vm').runInDebugContext;",
            options: [{ version: "8.0.0" }],
            errors: ["'vm.runInDebugContext' was deprecated since v8.0.0."],
        },

        // ES2015 Modules
        {
            code: "import b from 'buffer'; new b.Buffer()",
            options: [{ version: "6.0.0" }],
            languageOptions: { sourceType: "module" },
            errors: [
                "'new buffer.Buffer()' was deprecated since v6.0.0. Use 'buffer.Buffer.alloc()' or 'buffer.Buffer.from()' instead.",
            ],
        },
        {
            code: "import b from 'node:buffer'; new b.Buffer()",
            options: [{ version: "6.0.0" }],
            languageOptions: { sourceType: "module" },
            errors: [
                "'new buffer.Buffer()' was deprecated since v6.0.0. Use 'buffer.Buffer.alloc()' or 'buffer.Buffer.from()' instead.",
            ],
        },
        {
            code: "import * as b from 'buffer'; new b.Buffer()",
            options: [{ version: "6.0.0" }],
            languageOptions: { sourceType: "module" },
            errors: [
                "'new buffer.Buffer()' was deprecated since v6.0.0. Use 'buffer.Buffer.alloc()' or 'buffer.Buffer.from()' instead.",
            ],
        },
        {
            code: "import * as b from 'buffer'; new b.default.Buffer()",
            options: [{ version: "6.0.0" }],
            languageOptions: { sourceType: "module" },
            errors: [
                "'new buffer.Buffer()' was deprecated since v6.0.0. Use 'buffer.Buffer.alloc()' or 'buffer.Buffer.from()' instead.",
            ],
        },
        {
            code: "import {Buffer as b} from 'buffer'; new b()",
            options: [{ version: "6.0.0" }],
            languageOptions: { sourceType: "module" },
            errors: [
                "'new buffer.Buffer()' was deprecated since v6.0.0. Use 'buffer.Buffer.alloc()' or 'buffer.Buffer.from()' instead.",
            ],
        },
        {
            code: "import b from 'buffer'; b.SlowBuffer",
            options: [{ version: "6.0.0" }],
            languageOptions: { sourceType: "module" },
            errors: [
                "'buffer.SlowBuffer' was deprecated since v6.0.0. Use 'buffer.Buffer.allocUnsafeSlow()' instead.",
            ],
        },
        {
            code: "import * as b from 'buffer'; b.SlowBuffer",
            options: [{ version: "6.0.0" }],
            languageOptions: { sourceType: "module" },
            errors: [
                "'buffer.SlowBuffer' was deprecated since v6.0.0. Use 'buffer.Buffer.allocUnsafeSlow()' instead.",
            ],
        },
        {
            code: "import * as b from 'buffer'; b.default.SlowBuffer",
            options: [{ version: "6.0.0" }],
            languageOptions: { sourceType: "module" },
            errors: [
                "'buffer.SlowBuffer' was deprecated since v6.0.0. Use 'buffer.Buffer.allocUnsafeSlow()' instead.",
            ],
        },
        {
            code: "import {SlowBuffer as b} from 'buffer';",
            options: [{ version: "6.0.0" }],
            languageOptions: { sourceType: "module" },
            errors: [
                "'buffer.SlowBuffer' was deprecated since v6.0.0. Use 'buffer.Buffer.allocUnsafeSlow()' instead.",
            ],
        },
        {
            code: "import domain from 'domain';",
            options: [{ version: "4.0.0" }],
            languageOptions: { sourceType: "module" },
            errors: ["'domain' module was deprecated since v4.0.0."],
        },

        {
            code: "new (require('buffer').Buffer)()",
            options: [
                {
                    //
                    ignoreModuleItems: ["buffer.Buffer()"],
                    ignoreGlobalItems: ["Buffer()", "new Buffer()"],
                    version: "6.0.0",
                },
            ],
            errors: [
                "'new buffer.Buffer()' was deprecated since v6.0.0. Use 'buffer.Buffer.alloc()' or 'buffer.Buffer.from()' instead.",
            ],
        },
        {
            code: "require('buffer').Buffer()",
            options: [
                {
                    //
                    ignoreModuleItems: ["new buffer.Buffer()"],
                    ignoreGlobalItems: ["Buffer()", "new Buffer()"],
                    version: "6.0.0",
                },
            ],
            errors: [
                "'buffer.Buffer()' was deprecated since v6.0.0. Use 'buffer.Buffer.alloc()' or 'buffer.Buffer.from()' instead.",
            ],
        },
        {
            code: "require('module').createRequireFromPath()",
            options: [{ version: "12.0.0" }],
            errors: [
                "'module.createRequireFromPath' was deprecated since v12.2.0.",
            ],
        },
        {
            code: "require('module').createRequireFromPath()",
            options: [{ version: "12.2.0" }],
            errors: [
                "'module.createRequireFromPath' was deprecated since v12.2.0. Use 'module.createRequire()' instead.",
            ],
        },

        // process.getBuiltinModule()
        {
            code: "const b = process.getBuiltinModule('buffer'); new b.Buffer()",
            options: [{ version: "6.0.0" }],
            errors: [
                "'new buffer.Buffer()' was deprecated since v6.0.0. Use 'buffer.Buffer.alloc()' or 'buffer.Buffer.from()' instead.",
            ],
        },
        {
            code: "const b = process.getBuiltinModule('node:buffer'); new b.Buffer()",
            options: [{ version: "6.0.0" }],
            errors: [
                "'new buffer.Buffer()' was deprecated since v6.0.0. Use 'buffer.Buffer.alloc()' or 'buffer.Buffer.from()' instead.",
            ],
        },
        {
            code: "const {Buffer} = process.getBuiltinModule('buffer'); new Buffer()",
            options: [{ version: "6.0.0" }],
            errors: [
                "'new buffer.Buffer()' was deprecated since v6.0.0. Use 'buffer.Buffer.alloc()' or 'buffer.Buffer.from()' instead.",
            ],
        },
        {
            code: "const {Buffer:b} = process.getBuiltinModule('buffer'); new b()",
            options: [{ version: "6.0.0" }],
            errors: [
                "'new buffer.Buffer()' was deprecated since v6.0.0. Use 'buffer.Buffer.alloc()' or 'buffer.Buffer.from()' instead.",
            ],
        },
        {
            code: "const b = process.getBuiltinModule('buffer'); b.SlowBuffer",
            options: [{ version: "6.0.0" }],
            errors: [
                "'buffer.SlowBuffer' was deprecated since v6.0.0. Use 'buffer.Buffer.allocUnsafeSlow()' instead.",
            ],
        },
        {
            code: "const domain = process.getBuiltinModule('domain');",
            options: [{ version: "4.0.0" }],
            languageOptions: { sourceType: "module" },
            errors: ["'domain' module was deprecated since v4.0.0."],
        },

        {
            code: "new (process.getBuiltinModule('buffer').Buffer)()",
            options: [
                {
                    //
                    ignoreModuleItems: ["buffer.Buffer()"],
                    ignoreGlobalItems: ["Buffer()", "new Buffer()"],
                    version: "6.0.0",
                },
            ],
            errors: [
                "'new buffer.Buffer()' was deprecated since v6.0.0. Use 'buffer.Buffer.alloc()' or 'buffer.Buffer.from()' instead.",
            ],
        },
        {
            code: "process.getBuiltinModule('buffer').Buffer()",
            options: [
                {
                    //
                    ignoreModuleItems: ["new buffer.Buffer()"],
                    ignoreGlobalItems: ["Buffer()", "new Buffer()"],
                    version: "6.0.0",
                },
            ],
            errors: [
                "'buffer.Buffer()' was deprecated since v6.0.0. Use 'buffer.Buffer.alloc()' or 'buffer.Buffer.from()' instead.",
            ],
        },
        {
            code: "process.getBuiltinModule('module').createRequireFromPath()",
            options: [{ version: "12.0.0" }],
            errors: [
                "'module.createRequireFromPath' was deprecated since v12.2.0.",
            ],
        },
        {
            code: "process.getBuiltinModule('module').createRequireFromPath()",
            options: [{ version: "12.2.0" }],
            errors: [
                "'module.createRequireFromPath' was deprecated since v12.2.0. Use 'module.createRequire()' instead.",
            ],
        },

        //----------------------------------------------------------------------
        // Global Variables
        //----------------------------------------------------------------------
        {
            code: "new Buffer;",
            options: [{ version: "6.0.0" }],
            errors: [
                "'new Buffer()' was deprecated since v6.0.0. Use 'Buffer.alloc()' or 'Buffer.from()' instead.",
            ],
        },
        {
            code: "Buffer();",
            options: [{ version: "6.0.0" }],
            errors: [
                "'Buffer()' was deprecated since v6.0.0. Use 'Buffer.alloc()' or 'Buffer.from()' instead.",
            ],
        },
        {
            code: "GLOBAL; /*globals GLOBAL*/",
            options: [{ version: "6.0.0" }],
            errors: [
                "'GLOBAL' was deprecated since v6.0.0. Use 'global' instead.",
            ],
        },
        {
            code: "Intl.v8BreakIterator;",
            options: [{ version: "7.0.0" }],
            errors: [
                {
                    messageId: "removed",
                    data: {
                        name: "'Intl.v8BreakIterator'",
                        version: "7.0.0",
                        removed: "9.0.0",
                    },
                },
            ],
        },
        {
            code: "require.extensions;",
            options: [{ version: "0.12.0" }],
            errors: [
                "'require.extensions' was deprecated since v0.12.0. Use compiling them ahead of time instead.",
            ],
        },
        {
            code: "root;",
            options: [{ version: "6.0.0" }],
            languageOptions: { globals: { root: false } },
            errors: [
                "'root' was deprecated since v6.0.0. Use 'global' instead.",
            ],
        },
        {
            code: "process.EventEmitter;",
            options: [{ version: "0.6.0" }],
            errors: [
                "'process.EventEmitter' was deprecated since v0.6.0. Use 'require(\"events\")' instead.",
            ],
        },
        {
            code: "process.env.NODE_REPL_HISTORY_FILE;",
            options: [{ version: "4.0.0" }],
            errors: [
                "'process.env.NODE_REPL_HISTORY_FILE' was deprecated since v4.0.0. Use 'NODE_REPL_HISTORY' instead.",
            ],
        },
        {
            code: "let {env: {NODE_REPL_HISTORY_FILE}} = process;",
            options: [{ version: "4.0.0" }],
            errors: [
                "'process.env.NODE_REPL_HISTORY_FILE' was deprecated since v4.0.0. Use 'NODE_REPL_HISTORY' instead.",
            ],
        },

        {
            code: "new Buffer()",
            options: [
                {
                    //
                    ignoreModuleItems: [
                        "buffer.Buffer()",
                        "new buffer.Buffer()",
                    ],
                    ignoreGlobalItems: ["Buffer()"],
                    version: "6.0.0",
                },
            ],
            errors: [
                "'new Buffer()' was deprecated since v6.0.0. Use 'Buffer.alloc()' or 'Buffer.from()' instead.",
            ],
        },
        {
            code: "Buffer()",
            options: [
                {
                    //
                    ignoreModuleItems: [
                        "buffer.Buffer()",
                        "new buffer.Buffer()",
                    ],
                    ignoreGlobalItems: ["new Buffer()"],
                    version: "6.0.0",
                },
            ],
            errors: [
                "'Buffer()' was deprecated since v6.0.0. Use 'Buffer.alloc()' or 'Buffer.from()' instead.",
            ],
        },
        {
            code: "Buffer()",
            settings: {
                node: {
                    version: "6.0.0",
                },
            },
            options: [
                {
                    //
                    ignoreModuleItems: [
                        "buffer.Buffer()",
                        "new buffer.Buffer()",
                    ],
                    ignoreGlobalItems: ["new Buffer()"],
                },
            ],
            errors: [
                "'Buffer()' was deprecated since v6.0.0. Use 'Buffer.alloc()' or 'Buffer.from()' instead.",
            ],
        },
    ],
})
