export = plugin;
/**
 * @typedef {{
     'recommended-module': import('eslint').ESLint.ConfigData;
     'recommended-script': import('eslint').ESLint.ConfigData;
     'recommended': import('eslint').ESLint.ConfigData;
     'flat/recommended-module': import('eslint').Linter.FlatConfig;
     'flat/recommended-script': import('eslint').Linter.FlatConfig;
     'flat/recommended': import('eslint').Linter.FlatConfig;
     'flat/mixed-esm-and-cjs': import('eslint').Linter.FlatConfig[];
 }} Configs
 */
/** @type {import('eslint').ESLint.Plugin & { configs: Configs }} */
declare const plugin: import('eslint').ESLint.Plugin & {
    configs: Configs;
};
type Configs = {
    'recommended-module': import('eslint').ESLint.ConfigData;
    'recommended-script': import('eslint').ESLint.ConfigData;
    'recommended': import('eslint').ESLint.ConfigData;
    'flat/recommended-module': import('eslint').Linter.FlatConfig;
    'flat/recommended-script': import('eslint').Linter.FlatConfig;
    'flat/recommended': import('eslint').Linter.FlatConfig;
    'flat/mixed-esm-and-cjs': import('eslint').Linter.FlatConfig[];
};
