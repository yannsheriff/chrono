module.exports = {
  env: {
    es6: true,
    node: true,
    jest: true,
  },
  extends: [
    'plugin:@typescript-eslint/recommended',
    'eslint:recommended',
    'airbnb-base',
    'plugin:jest/recommended',
    'plugin:react/recommended',
    'prettier',
    'prettier/@typescript-eslint',
    '@react-native-community',
  ],
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint', 'prettier'],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parserOptions: {
    project: './tsconfig.json',
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  rules: {
    'prettier/prettier': 'error',
    'import/extensions': 0,
    'no-plusplus': [
      'error',
      {
        allowForLoopAfterthoughts: true,
      },
    ],
    'func-names': 0,
    'no-bitwise': 0,
    '@typescript-eslint/camelcase': 0,
    'react/prop-types': 0,
    camelcase: 0,
    '@typescript-eslint/interface-name-prefix': 0,
    'no-underscore-dangle': 0,
    'import/prefer-default-export': 0,
    'class-methods-use-this': 0,
    'no-unused-expressions': ['error', { allowShortCircuit: true }],
    'no-param-reassign': 0,
    '@typescript-eslint/explicit-function-return-type': 2,
    '@typescript-eslint/no-explicit-any': 2,
    'react/style-prop-object': 0,
  },
  overrides: [
    {
      // disable rules for test files
      files: ['*.spec.ts'],
      rules: {
        'import/no-extraneous-dependencies': 0,
        'no-multi-assign': 0,
        '@typescript-eslint/ban-ts-ignore': 0,
      },
    },
    {
      // disable rules for saga test files
      files: ['*.sagas.spec.ts'],
      rules: {
        'jest/expect-expect': 0,
      },
    },
    {
      // disable rules for test files
      files: ['*.actions.ts', '*.reducer.ts'],
      rules: {
        '@typescript-eslint/explicit-function-return-type': 0,
      },
    },
  ],
  settings: {
    'import/parsers': {
      '@typescript-eslint/parser': ['.ts', '.tsx'],
    },
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx'],
      },
      typescript: {
        alwaysTryTypes: true,
      },
    },
    react: {
      version: 'detect', // Tells eslint-plugin-react to automatically detect the version of React to use
    },
  },
};
