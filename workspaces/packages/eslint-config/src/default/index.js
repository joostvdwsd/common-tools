// Workaround for https://github.com/eslint/eslint/issues/3458
require('@rushstack/eslint-patch/modern-module-resolution');

/** @type {import('eslint').Linter.BaseConfig} */
module.exports = {
  extends: [
    './best-practices',
    './errors',
    './style',
    './typescript',
  ].map(require.resolve),

  parser: require.resolve('@typescript-eslint/parser'),

  env: {
    node: true,
    es2021: true,
  },

  parserOptions: {
    sourceType: 'module',
  },
};
