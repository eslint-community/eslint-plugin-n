# Disallow synchronous methods (`n/no-sync`)

<!-- end auto-generated rule header -->

In Node.js, most I/O is done through asynchronous methods. However, there are often synchronous versions of the asynchronous methods. For example, `fs.exists()` and `fs.existsSync()`. In some contexts, using synchronous operations is okay (if, as with ESLint, you are writing a command line utility). However, in other contexts the use of synchronous operations is considered a bad practice that should be avoided. For example, if you are running a high-travel web server on Node.js, you should consider carefully if you want to allow any synchronous operations that could lock up the server.

## 📖 Rule Details

This rule is aimed at preventing synchronous methods from being called in Node.js. It looks specifically for the method suffix "`Sync`" (as is the convention with Node.js operations).

### Options

#### allowAtRootLevel

This rule has an optional object option `{ allowAtRootLevel: <boolean> }`, which determines whether synchronous methods should be allowed at the top level of a file, outside of any functions. This option defaults to `false`.

Examples of **incorrect** code for this rule with the default `{ allowAtRootLevel: false }` option:

```js
/*eslint n/no-sync: "error"*/

fs.existsSync(somePath);

function foo() {
  var contents = fs.readFileSync(somePath).toString();
}
```

Examples of **correct** code for this rule with the default `{ allowAtRootLevel: false }` option:

```js
/*eslint n/no-sync: "error"*/

obj.sync();

async(function() {
    // ...
});
```

Examples of **incorrect** code for this rule with the `{ allowAtRootLevel: true }` option

```js
/*eslint n/no-sync: ["error", { allowAtRootLevel: true }]*/

function foo() {
  var contents = fs.readFileSync(somePath).toString();
}

var bar = baz => fs.readFileSync(qux);
```

Examples of **correct** code for this rule with the `{ allowAtRootLevel: true }` option

```js
/*eslint n/no-sync: ["error", { allowAtRootLevel: true }]*/

fs.readFileSync(somePath).toString();
```

#### ignores

You can `ignore` specific function names using this option.
Additionally, if you are using TypeScript you can optionally specify where the function is declared.

Examples of **incorrect** code for this rule with the `{ ignores: ['readFileSync'] }` option:

```js
/*eslint n/no-sync: ["error", { ignores: ['readFileSync'] }] */

fs.readdirSync(somePath);
```

Examples of **correct** code for this rule with the `{ ignores: ['readFileSync'] }` option:

```js
/*eslint n/no-sync: ["error", { ignores: ['readFileSync'] }] */

fs.readFileSync(somePath);
```

##### Advanced (TypeScript only)

You can provide a list of specifiers to ignore. Specifiers are typed as follows:

```ts
type Specifier =
| string
| {
    from: "file";
    path?: string;
    name?: string[];
  }
| {
    from: "package";
    package?: string;
    name?: string[];
  }
| {
    from: "lib";
    name?: string[];
  }
```

###### From a file

Examples of **correct** code for this rule with the ignore file specifier:

```js
/*eslint n/no-sync: ["error", { ignores: [{ from: 'file', path: './foo.ts' }]}] */

import { fooSync } from "./foo"
fooSync()
```

###### From a package

Examples of **correct** code for this rule with the ignore package specifier:

```js
/*eslint n/no-sync: ["error", { ignores: [{ from: 'package', package: 'effect' }]}] */

import { Effect } from "effect"
const value = Effect.runSync(Effect.succeed(42))
```

###### From the TypeScript library

Examples of **correct** code for this rule with the ignore lib specifier:

```js
/*eslint n/no-sync: ["error", { ignores: [{ from: 'lib' }]}] */

const stylesheet = new CSSStyleSheet()
stylesheet.replaceSync("body { font-size: 1.4em; } p { color: red; }")
```

## 🔎 Implementation

- [Rule source](../../lib/rules/no-sync.js)
- [Test source](../../tests/lib/rules/no-sync.js)
