module.exports = [
  {
    ignores: [
      'dist',
      'lib',
      '*.d.ts',
      '.yarn',
      'coverage',
      '*.json',
      '*.tsbuildinfo',
      '*.lock',
      'cdk.out',
      '.pnp.*',
    ],
  },
  require('./best-practices'),
  require('./errors'),
  require('./style'),
  require('./typescript'),
  {
    languageOptions: {
      parser: require('@typescript-eslint/parser'),
      globals: {
        node: true,
        es2021: true,
      },
      parserOptions: {
        sourceType: 'module',
      },
    },
  },
];
