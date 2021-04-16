// module.exports = {
//   env: {
//     browser: true,
//     es2021: true,
//   },
//   extends: ['plugin:react/recommended', 'airbnb'],
//   parserOptions: {
//     ecmaFeatures: {
//       jsx: true,
//     },
//     ecmaVersion: 12,
//     sourceType: 'module',
//   },
//   plugins: ['react'],
//   rules: {
//     'object-curly-newline': 0,
//     'react/prop-types': 0,
//     'react/button-has-type': 0,
//     'no-underscore-dangle': 0,
//     'react/no-array-index-key': 0,
//     'no-unused-vars': 0,
//     'import/extensions': 0,
//     'consistent-return': 0,
//     'arrow-body-style': 0,
//     'jsx-a11y/click-events-have-key-events': 0,
//     'jsx-a11y/no-static-element-interactions': 0,
//     'import/no-unresolved': 0,
//     'no-console': 1,
//     'no-continue': 0,
//     'no-shadow': 0,
//     'jsx-a11y/no-noninteractive-element-interactions': 0,
//     'jsx-a11y/heading-has-content': 0,
//   },
// };
module.exports = {
  env: {
    es6: true,
    node: true,
    browser: true,
  },
  parserOptions: {
    sourceType: 'module',
    ecmaVersion: 2021,
    ecmaFeatures: { jsx: true },
  },
  extends: ['eslint:recommended', 'plugin:react/recommended'],
  plugins: ['react-hooks'],
  rules: {
    'eol-last': ['error', 'always'],
    // Indentation
    'no-mixed-spaces-and-tabs': 2,
    indent: [2, 2],
    // 'offsetTernaryExpressions': true,
    // Variable names
    camelcase: 2,
    // Language constructs
    curly: 2,
    'no-console': ['error', { allow: ['info', 'warn'] }],
    eqeqeq: [2, 'smart'],
    'func-style': [2, 'expression'],
    'object-curly-newline': 'off',
    // 'react/prop-types': 2,
    'no-var': 2,
    'prefer-const': 2,
    // Semicolons
    semi: 2,
    'no-extra-semi': 2,
    // Padding & additional whitespace (preferred but optional)
    'brace-style': [2, '1tbs', { allowSingleLine: true }],
    'semi-spacing': 1,
    'key-spacing': 1,
    'block-spacing': 1,
    'comma-spacing': 1,
    'no-multi-spaces': 1,
    'space-before-blocks': 1,
    'keyword-spacing': [1, { before: true, after: true }],
    'space-infix-ops': 1,
    // Minuta
    'comma-style': [2, 'last'],
    quotes: [2, 'single'],
    'multiline-ternary': ['error', 'always'],
    'react-hooks/rules-of-hooks': 'error',
    // 'react-hooks/exhaustive-deps': [
    //   'warn', {
    //     'additionalHooks': 'useRecoilCallback'
    //   }
    // ],
    'react/destructuring-assignment': 1,
    'react/display-name': 0,
  },
};