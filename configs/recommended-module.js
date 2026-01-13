import { createRequire } from "node:module";
const require = createRequire(import.meta.url);
/**
 * @fileoverview the `recommended-module` config for `eslint.config.js`
 * @author 唯然<weiran.zsd@outlook.com>
 * @deprecated use `flat/recommended-module` instead
 */

export default require("../lib/index.js").configs["flat/recommended-module"]
