/** @type {import('eslint').Linter.BaseConfig} */
module.exports = {
  extends: [
    './react',
  ].map(require.resolve),
};
