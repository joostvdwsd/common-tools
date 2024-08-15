/* eslint-disable @typescript-eslint/naming-convention */
const globalConfig = require('@jwpkg/eslint-config');

module.exports = [
  ...globalConfig,
  {
    files: ['workspaces/utils/eslint-config/**'],
    rules: {
      '@typescript-eslint/naming-convention': 0,
    },
  },
];
