/* eslint @typescript-eslint/naming-convention: 0 */


module.exports = {
  plugins: {
    '@typescript-eslint': require('@typescript-eslint/eslint-plugin'),
    arca: require('eslint-plugin-arca'),
  },
  files: [
    '**/*.ts',
    '**/*.mts',
    '**/*.tsx',
    '**/*.js',
    '**/*.mjs',
    '**/*.cjs',
    '**/*.jsx',
  ],
  rules: {
    '@typescript-eslint/adjacent-overload-signatures': 2,

    '@typescript-eslint/no-unused-vars': [1, {
      args: 'all',
      argsIgnorePattern: '^_',
      caughtErrors: 'all',
      caughtErrorsIgnorePattern: '^_',
      destructuredArrayIgnorePattern: '^_',
      varsIgnorePattern: '^_',
      ignoreRestSiblings: true,
    }],

    '@typescript-eslint/prefer-ts-expect-error': 2,

    'arca/no-default-export': 2,

    'consistent-return': 2,

    'dot-notation': 2,

    'no-async-promise-executor': 2,

    'no-case-declarations': 2,

    'no-compare-neg-zero': 2,

    'no-cond-assign': 2,

    'no-constant-condition': ['error', {
      checkLoops: false,
    }],

    'no-control-regex': 2,

    'no-debugger': 2,

    'no-empty': ['error', {
      allowEmptyCatch: true,
    }],

    'no-empty-character-class': 2,

    'no-empty-pattern': 2,

    'no-fallthrough': 2,

    'no-global-assign': 2,

    'no-import-assign': 2,

    'no-inner-declarations': 2,

    'no-octal': 2,

    'no-prototype-builtins': 2,

    'no-regex-spaces': 2,

    'no-sparse-arrays': 2,

    'no-unneeded-ternary': 2,

    'no-unused-labels': 2,

    'no-useless-catch': 2,

    'no-useless-escape': 2,

    'no-with': 2,

    'object-shorthand': 2,

    'prefer-arrow-callback': 2,

    'prefer-const': ['error', {
      destructuring: 'all',
      ignoreReadBeforeAssign: true,
    }],

    'prefer-object-has-own': 2,

    'prefer-template': 2,

    'require-yield': 2,

    'use-isnan': 2,
  },
};
