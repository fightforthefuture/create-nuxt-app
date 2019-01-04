module.exports = {
  root: true,
  env: {
    browser: true,
    node: true
  },
  parserOptions: {
    parser: 'babel-eslint'
  },
  extends: [
    '@nuxtjs'<% if (prettier === 'yes'){ %>,
    'plugin:prettier/recommended'<% } %>
  ],<% if (prettier === 'yes'){ %>
  plugins: [
    'prettier'
  ],<% } %>
  // add your custom rules here
  rules: {
    'no-console': 'off',
    'space-infix-ops': 'off',
    'vue/no-v-html': 'off',
    'vue/html-closing-bracket-newline': 'off',
    'vue/max-attributes-per-line': 'off',
    'vue/html-indent': 'off'
  }
}
