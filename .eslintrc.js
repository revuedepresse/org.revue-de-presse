module.exports = {
  root: true,
  env: {
    node: true,
    browser: true
  },
  extends: [
    'plugin:vue/recommended',
    'eslint:recommended',
    'prettier',
    '@nuxtjs/eslint-config-typescript'
  ],
  rules: {
    'comma-dangle': 'off',
    'no-control-regex': 'off',
    'prefer-regex-literals': 'off',
    'vue/html-self-closing': 'off',
    'vue/multi-word-component-names': 'off',
    'vue/component-name-in-template-casing': ['error', 'PascalCase'],
    'vue/no-v-html': 'off',
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    camelcase: 'off',
    '@typescript-eslint/camelcase': 'off',
    'no-unused-vars': 'off'
  },
  globals: {
    $nuxt: true
  },
  parser: 'vue-eslint-parser',
  parserOptions: {
    parser: '@typescript-eslint/parser'
  }
}
