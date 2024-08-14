/* eslint @typescript-eslint/naming-convention: 0 */

module.exports = {
  plugins: [
    'markdown',
  ],
  rules: {
    'no-console': 'off',
    // ...
  },
  overrides: [
    {
      // In v2, explicitly apply eslint-plugin-markdown's `markdown`
      // processor on any Markdown files you want to lint.
      files: ['**/*.{md,MD}'],
      processor: 'markdown/markdown',
    },
  ],
};
