import { createRequire } from "node:module";
const require = createRequire(import.meta.url);
/**
 * @fileoverview the `recommended-script` config for `eslint.config.js`
 * @author 唯然<weiran.zsd@outlook.com>
 * @deprecated use `flat/recommended-script` instead
 */

export default require("../lib/index.js").configs["flat/recommended-script"]
