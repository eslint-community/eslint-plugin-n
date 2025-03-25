/**
 * @author Toru Nagashima
 * See LICENSE file in root directory for full license.
 */
"use strict"

const path = require("path")
const RuleTester = require("#test-helpers").RuleTester
const rule = require("../../../lib/rules/no-unpublished-require")

/**
 * Makes a file path to a fixture.
 * @param {string} name - A name.
 * @returns {string} A file path to a fixture.
 */
function fixture(name) {
    return path.resolve(__dirname, "../../fixtures/no-unpublished", name)
}

const ruleTester = new RuleTester()
ruleTester.run("no-unpublished-require", rule, {
    valid: [
        {
            filename: fixture("1/test.js"),
            code: "require('fs');",
        },
        {
            filename: fixture("1/test.js"),
            code: "require('aaa');",
        },
        {
            filename: fixture("1/test.js"),
            code: "require('aaa/a/b/c');",
        },
        {
            filename: fixture("1/test.js"),
            code: "require('./a');",
        },
        {
            filename: fixture("1/test.js"),
            code: "require('./a.js');",
        },
        {
            filename: fixture("2/ignore1.js"),
            code: "require('./test');",
        },
        {
            filename: fixture("2/ignore1.js"),
            code: "require('bbb');",
        },
        {
            filename: fixture("2/ignore1.js"),
            code: "require('bbb/a/b/c');",
        },
        {
            filename: fixture("2/ignore1.js"),
            code: "require('./ignore2');",
        },
        {
            filename: fixture("3/test.js"),
            code: "require('./pub/a');",
        },
        {
            filename: fixture("3/test.js"),
            code: "require('./test2');",
        },
        {
            filename: fixture("3/test.js"),
            code: "require('aaa');",
        },
        {
            filename: fixture("3/test.js"),
            code: "require('bbb');",
        },
        {
            filename: fixture("3/pub/ignore1.js"),
            code: "require('bbb');",
        },
        {
            filename: fixture("3/pub/test.js"),
            code: "require('../package.json');",
        },
        {
            filename: fixture("3/src/pub/test.js"),
            code: "require('bbb');",
        },
        {
            filename: fixture("3/src/pub/test.js"),
            code: "require('bbb!foo?a=b&c=d');",
        },

        // `convertPath` option.
        {
            filename: fixture("3/src/test.jsx"),
            code: "require('./a');",
            settings: {
                node: {
                    convertPath: {
                        "src/**/*.jsx": ["src/(.+?)\\.jsx", "pub/$1.js"],
                    },
                    tryExtensions: [".js", ".jsx", ".json"],
                },
            },
        },
        {
            filename: fixture("3/src/test.jsx"),
            code: "require('./a');",
            options: [
                {
                    convertPath: {
                        "src/**/*.jsx": ["src/(.+?)\\.jsx", "pub/$1.js"],
                    },
                    tryExtensions: [".js", ".jsx", ".json"],
                },
            ],
        },
        {
            filename: fixture("3/src/test.jsx"),
            code: "require('../test');",
            settings: {
                node: {
                    convertPath: [
                        {
                            include: ["src/**/*.jsx"],
                            exclude: ["**/test.jsx"],
                            replace: ["src/(.+?)\\.jsx", "pub/$1.js"],
                        },
                    ],
                },
            },
        },
        {
            filename: fixture("3/src/test.jsx"),
            code: "require('../test');",
            options: [
                {
                    convertPath: [
                        {
                            include: ["src/**/*.jsx"],
                            exclude: ["**/test.jsx"],
                            replace: ["src/(.+?)\\.jsx", "pub/$1.js"],
                        },
                    ],
                },
            ],
        },

        // Ignores it if not callee.
        {
            filename: fixture("1/test.js"),
            code: "require;",
        },

        // Ignores it if the global variable of `require` is not defined.
        {
            filename: fixture("1/test.js"),
            code: "require('no-exist-package-0');",
        },

        // Ignores it if the filename is unknown.
        {
            code: "require('no-exist-package-0');",
        },
        {
            code: "require('./b');",
        },

        // Ignores it if the target is not string.
        {
            filename: fixture("1/test.js"),
            code: "require();",
        },
        {
            filename: fixture("1/test.js"),
            code: "require(foo);",
        },
        {
            filename: fixture("1/test.js"),
            code: "require(777);",
        },
        {
            filename: fixture("1/test.js"),
            code: "require(`foo${bar}`);",
        },

        // Should work fine if the filename is relative.
        {
            filename: "tests/fixtures/no-unpublished/2/test.js",
            code: "require('aaa');",
        },
        {
            filename: "tests/fixtures/no-unpublished/2/test.js",
            code: "require('./a');",
        },

        // Should work fine if the target is the package directory.
        {
            filename: fixture("issue48n/test.js"),
            code: "require('.');",
        },
        {
            filename: fixture("issue48n/test.js"),
            code: "require('./');",
        },
        {
            filename: fixture("issue48n/test/test.js"),
            code: "require('..');",
        },

        // https://github.com/eslint-community/eslint-plugin-n/issues/122
        // Allow files to start with './' in package.json#files
        {
            filename: fixture("issue99/test/bin.js"),
            code: "require('./index.js');",
        },
        {
            filename: fixture("issue99/test/bin.js"),
            code: "require('.');",
        },

        // allowModules option
        {
            filename: fixture("1/test.js"),
            code: "require('electron');",
            options: [{ allowModules: ["electron"] }],
        },
        // allow virtual modules
        {
            filename: fixture("test.js"),
            code: "require('virtual:package-name');",
            options: [{ allowModules: ["virtual:package-name"] }],
        },
        {
            filename: fixture("test.js"),
            code: "require('virtual:package-scope/name');",
            options: [{ allowModules: ["virtual:package-scope"] }],
        },

        // Auto-published files only apply to root package directory
        {
            filename: fixture("3/src/readme.js"),
            code: "require('bbb');",
        },

        // Negative patterns in files field.
        {
            filename: fixture("negative-in-files/lib/__test__/index.js"),
            code: "require('bbb');",
        },
        {
            filename: fixture("issue126/lib/test.js"),
            code: "require('bbb');",
        },

        // devDependency in a private package
        {
            filename: fixture("private-package/index.js"),
            code: "require('bbb');",
        },
    ],
    invalid: [
        {
            filename: fixture("2/test.js"),
            code: "require('./ignore1.js');",
            errors: ['"./ignore1.js" is not published.'],
        },
        {
            filename: fixture("2/test.js"),
            code: "require('./ignore1');",
            errors: ['"./ignore1" is not published.'],
        },
        {
            filename: fixture("3/pub/test.js"),
            code: "require('bbb');",
            errors: ['"bbb" is not published.'],
        },
        {
            filename: fixture("3/pub/test.js"),
            code: "require('./ignore1');",
            errors: ['"./ignore1" is not published.'],
        },
        {
            filename: fixture("3/pub/test.js"),
            code: "require('./abc');",
            errors: ['"./abc" is not published.'],
        },
        {
            filename: fixture("3/pub/test.js"),
            code: "require('../test');",
            errors: ['"../test" is not published.'],
        },
        {
            filename: fixture("3/pub/test.js"),
            code: "require('../src/pub/a.js');",
            errors: ['"../src/pub/a.js" is not published.'],
        },

        {
            filename: fixture("1/test.js"),
            code: "require('../a.js');",
            errors: ['"../a.js" is not published.'],
        },

        // `convertPath` option.
        {
            filename: fixture("3/src/test.jsx"),
            code: "require('../test');",
            errors: ['"../test" is not published.'],
            settings: {
                node: {
                    convertPath: {
                        "src/**/*.jsx": ["src/(.+?)\\.jsx", "pub/$1.js"],
                    },
                },
            },
        },
        {
            filename: fixture("3/src/test.jsx"),
            code: "require('../test');",
            options: [
                {
                    convertPath: {
                        "src/**/*.jsx": ["src/(.+?)\\.jsx", "pub/$1.js"],
                    },
                },
            ],
            errors: ['"../test" is not published.'],
        },
        {
            filename: fixture("3/src/test.jsx"),
            code: "require('../test');",
            errors: ['"../test" is not published.'],
            settings: {
                node: {
                    convertPath: [
                        {
                            include: ["src/**/*.jsx"],
                            replace: ["src/(.+?)\\.jsx", "pub/$1.js"],
                        },
                    ],
                },
            },
        },
        {
            filename: fixture("3/src/test.jsx"),
            code: "require('../test');",
            options: [
                {
                    convertPath: [
                        {
                            include: ["src/**/*.jsx"],
                            replace: ["src/(.+?)\\.jsx", "pub/$1.js"],
                        },
                    ],
                },
            ],
            errors: ['"../test" is not published.'],
        },

        // Should work fine if the filename is relative.
        {
            filename: "tests/fixtures/no-unpublished/2/test.js",
            code: "require('./ignore1');",
            errors: ['"./ignore1" is not published.'],
        },

        // outside of the package.
        {
            filename: fixture("1/test.js"),
            code: "require('../2/a.js');",
            errors: ['"../2/a.js" is not published.'],
        },

        // devDependency in a private package
        {
            filename: fixture("private-package/index.js"),
            code: "require('bbb');",
            errors: ['"bbb" is not published.'],
            options: [{ ignorePrivate: false }],
        },
    ],
})
