module.exports = {
  env: {
    node: true,
    es2022: true,
    jest: true
  },
  extends: [
    'eslint:recommended',
    'prettier'
  ],
  parserOptions: {
    ecmaVersion: 2022,
    sourceType: 'module'
  },
  rules: {
    'no-console': 'off',
    'no-unused-vars': 'warn',
    'prefer-const': 'error',
    'no-var': 'error',
    'object-shorthand': 'error',
    'prefer-template': 'error',
    'template-curly-spacing': 'error',
    'arrow-spacing': 'error',
    'no-duplicate-imports': 'error',
    'sort-imports': 'off',
    'no-multiple-empty-lines': ['error', { max: 2 }],
    'eol-last': 'error',
    'no-trailing-spaces': 'error',
    'comma-dangle': ['error', 'never'],
    'semi': ['error', 'always'],
    'quotes': ['error', 'single', { avoidEscape: true }]
  },
  overrides: [
    {
      files: ['tests/**/*.js'],
      env: {
        jest: true
      }
    }
  ]
};
