module.exports = {
  root: true,
  extends: ['@react-native-community', 'plugin:react/recommended', 'plugin:react-hooks/recommended'],
  plugins: ['unused-imports'],
  rules: {
    semi: 'off',
    'comma-dangle': 'off',
    'no-unused-vars': 'error',
    'unused-imports/no-unused-imports': 'error',
    'import/no-cycle': 'error',
    'import/first': 'error',
    'import/no-duplicates': 'warn',
    'arrow-body-style': ['warn', 'always'],
  },
}
