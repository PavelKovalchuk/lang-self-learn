module.exports = {
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint', 'jest', 'prettier'],
  env: {
    browser: true,
    'jest/globals': true,
  },
  extends: [
    'airbnb',
    'prettier/@typescript-eslint',
    'prettier',
    'prettier/react',
    'plugin:import/typescript',
  ],
  globals: {
    React: 'readable',
    grecaptcha: 'readable',
    PriceSpider: 'readable',
    AppImages: 'readable',
    UmbracoTypes: 'readable',
  },
  rules: {
    'class-methods-use-this': 0,
    'no-nested-ternary': 0,
    'linebreak-style': 0,
    'max-len': 0,
    'consistent-return': 0,
    'object-curly-newline': 0,
    'no-alert': 1,
    'newline-before-return': 2,
    'no-confusing-arrow': 0,
    'no-cycle': 0,
    'no-underscore-dangle': 0,
    'no-console': [1, { allow: ['warn', 'error', 'info'] }],
    'no-param-reassign': [2, { props: false }],
    'no-shadow': [2, { allow: ['res', 'err'] }],
    'no-use-before-define': 'off',
    'no-new': 0,
    '@typescript-eslint/no-use-before-define': ['error'],
    'comma-dangle': [
      2,
      {
        arrays: 'always-multiline',
        objects: 'always-multiline',
        imports: 'always-multiline',
        exports: 'always-multiline',
        functions: 'never',
      },
    ],
    'import/no-named-as-default': 0,
    'import/prefer-default-export': 0,
    'import/extensions': 0,
    'import/no-unresolved': 1,
    'import/no-extraneous-dependencies': 0,
    'jsx-a11y/click-events-have-key-events': 0,
    'jsx-a11y/no-noninteractive-element-interactions': 1,
    'jsx-a11y/anchor-is-valid': [
      2,
      {
        components: ['Link'],
        specialLink: ['to', 'hrefLeft', 'hrefRight'],
        aspects: ['noHref', 'invalidHref', 'preferButton'],
      },
    ],
    'jsx-a11y/no-static-element-interactions': 1,
    'jsx-a11y/label-has-for': [
      2,
      {
        required: {
          every: ['id'],
        },
      },
    ],
    'jsx-a11y/label-has-associated-control': [
      2,
      {
        labelComponents: ['label'],
        labelAttributes: ['htmlFor'],
        controlComponents: ['input'],
      },
    ],
    'react/prop-types': 0,
    'react/require-default-props': 0,
    'react/destructuring-assignment': 0,
    'react/jsx-one-expression-per-line': [2, { allow: 'single-child' }],
    'react/no-array-index-key': 1,
    'react/no-danger': 0,
    'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx', '.tsx', '.ts'] }],
    'react/jsx-props-no-spreading': 0,
    'react/react-in-jsx-scope': 0,
    'react/no-did-update-set-state': 0,
    'react/state-in-constructor': 0,
    'no-plusplus': ['error', { allowForLoopAfterthoughts: true }],
    'no-unused-expressions': 0,
    'no-undef': 0,
    '@typescript-eslint/no-unused-expressions': [
      'error',
      { allowShortCircuit: true, allowTernary: true },
    ],
    '@typescript-eslint/no-unused-vars': 2,
    'prettier/prettier': [
      'error',
      {
        endOfLine: 'auto',
      },
    ],
  },
  settings: {
    'import/resolver': {
      typescript: {},
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
        moduleDirectory: ['src'],
      },
      alias: [
        ['layout', './src/layout'],
        ['common', './src/common'],
        ['components', './src/components'],
        ['screens', './src/screens'],
        ['pages', './src/pages'],
        ['styles', './src/styles'],
        ['mocks', './src/mocks'],
        ['utils', './src/utils'],
        ['utils', './src/testUtils'],
        ['hooks', './src/hooks'],
        ['templates', './src/templates'],
      ],
    },
  },
};
