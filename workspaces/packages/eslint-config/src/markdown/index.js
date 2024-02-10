/** @type {import('eslint').Linter.BaseConfig} */
module.exports = {
  extends: [
    './markdown',
  ].map(require.resolve),
};
