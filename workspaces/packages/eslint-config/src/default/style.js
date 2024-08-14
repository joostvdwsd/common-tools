/* eslint @typescript-eslint/naming-convention: 0 */
module.exports = {
  plugins: {
    '@typescript-eslint': require('@typescript-eslint/eslint-plugin'),
    '@stylistic': require('@stylistic/eslint-plugin-ts'),
    arca: require('eslint-plugin-arca'),
  },

  rules: {
    '@typescript-eslint/array-type': ['error', {
      default: 'array',
    }],

    '@stylistic/brace-style': 2,

    '@stylistic/comma-dangle': ['error', 'always-multiline'],

    '@stylistic/keyword-spacing': 2,

    'comma-spacing': 2,

    '@typescript-eslint/naming-convention': ['error', {
      selector: 'default',
      format: ['camelCase', 'UPPER_CASE', 'PascalCase'],
      filter: {
        regex: '^(__.*|__non_webpack_require__|npm(_[a-z]+)+)$',
        match: false,
      },
      leadingUnderscore: 'allow',
    }],

    '@stylistic/func-call-spacing': 2,

    '@stylistic/indent': ['error', 2, {
      SwitchCase: 1,
      ignoredNodes: ['TSTypeParameterInstantiation'],
    }],

    '@stylistic/member-delimiter-style': ['error', {
      multiline: {
        delimiter: 'semi',
        requireLast: true,
      },
      singleline: {
        requireLast: false,
      },
      overrides: {
        interface: {
          singleline: {
            delimiter: 'semi',
          },
        },
        typeLiteral: {
          singleline: {
            delimiter: 'comma',
          },
        },
      },
    }],

    '@stylistic/quotes': ['error', 'single'],

    '@stylistic/semi': 2,

    '@stylistic/space-infix-ops': 2,

    '@stylistic/type-annotation-spacing': 2,

    'arca/import-quotes': 2,

    // 'arca/curly': 2,

    // 'arca/import-align': [2, {
    //   collapseExtraSpaces: true,
    // }],

    'arca/import-ordering': [2, {
      hoistOneliners: true,
    }],

    'arca/newline-after-import-section': [2, {
      enableOnelinerSections: true,
    }],

    'array-bracket-spacing': 2,

    'arrow-parens': ['error', 'as-needed'],

    'arrow-spacing': 2,

    'computed-property-spacing': 2,

    'eol-last': ['error', 'always'],

    'generator-star-spacing': ['error', {
      before: true,
      after: true,
    }],

    'jsx-quotes': 2,

    'key-spacing': 2,

    'no-extra-semi': 2,

    'no-irregular-whitespace': 2,

    'no-mixed-spaces-and-tabs': 2,

    'no-multiple-empty-lines': ['error', { max: 2, maxBOF: 0, maxEOF: 0 }],

    'no-tabs': 2,

    'no-trailing-spaces': 2,

    'object-curly-spacing': ['error', 'always'],

    'padded-blocks': ['error', 'never'],

    'quote-props': ['error', 'as-needed'],

    'rest-spread-spacing': 2,

    'space-before-blocks': 2,

    'space-in-parens': 2,

    'template-curly-spacing': 2,
  },
};
