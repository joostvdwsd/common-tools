/* eslint-disable @typescript-eslint/naming-convention */
const globalConfig = require('@joostvdwsd/eslint-config');

module.exports = [
  ...globalConfig,
  {
    files: ['workspaces/utils/eslint-config/**'],
    rules: {
      '@typescript-eslint/naming-convention': 0,
    },
  },
];

// module.exports = {
//   extends: [
//     '@jvdwaalsd/eslint-config',
//     // '@cp-utils/eslint-config/local-react',
//     // '@cp-utils/eslint-config/local-markdown',
//   ],
//   overrides: [{
//     files: ['workspaces/utils/eslint-config/**'],
//     rules: {
//       '@typescript-eslint/naming-convention': 0,
//     },
//   }],
//   rules: {

//   },
// };
