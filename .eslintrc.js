module.exports = {
    env: {
      browser: true,
      es6: true,
    },
    extends: ['eslint:recommended'],
    parserOptions: {
      ecmaVersion: 2018,
      sourceType: 'module',
    },
    rules: {
      indent: ['error', 4],
      quotes: ['warn', 'single'],
      semi: ['warn', 'never'],
    },
  }
  