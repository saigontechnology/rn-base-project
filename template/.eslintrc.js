module.exports = {
  root: true,
  extends: '@react-native-community',
  plugins: ['unused-imports'],
  rules: {
    semi: 'off',
    'comma-dangle': 'off',
    'no-unused-vars': 'error',
    'unused-imports/no-unused-imports': 'error',
  },
}
