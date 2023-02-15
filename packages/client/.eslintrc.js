module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  // recommend는 eslint의 기본 규칙을 사용하겠다는 의미한다.
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
    'plugin:prettier/recommended',
  ],
  overrides: [],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  // custom으로 사용하고 싶을 경우 plugins에 추가 후 rules에 추가헌다.
  plugins: ['react', '@typescript-eslint'],
  rules: {
    'react/react-in-jsx-scope': 'off',
    'no-duplicate-imports': 'error',
    '@typescript-eslint/interface-name-prefix': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    // non-null assertion
    '@typescript-eslint/no-non-null-asserted-optional-chain': 'warn',
    '@typescript-eslint/no-non-null-assertion': 'warn',
  },
  ignorePatterns: ['.eslintrc.js'],
  settings: {
    react: {
      version: 'detect',
    },
  },
};
