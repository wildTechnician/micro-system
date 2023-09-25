
module.exports = {
  root: true,
  env: {
    node: true,
    'vue/setup-compiler-macros': true
  },
  extends: ['eslint:recommended', 'plugin:vue/vue3-recommended', 'prettier', './.eslintrc-auto-import.json'],
  globals: {
    Cesium: true,
    debugger: true
  },
  rules: {
    'vue/require-default-prop': 'off',
    "@typescript-eslint/no-explicit-any": "off",
    'no-console': 'warn',
    "no-unused-vars": "off",
    'no-undef': 'off'
  },
  parser: 'vue-eslint-parser',
  parserOptions: {
    parser: '@typescript-eslint/parser',
    ecmaVersion: 'latest',
    sourceType: 'module',
  },

};