module.exports = {
  root: true,
  extends: ['@react-native-community', 'plugin:react/recommended', 'plugin:react-hooks/recommended'],
  plugins: ['unused-imports', 'import'],
  rules: {
    semi: 'off',
    'comma-dangle': 'off',
    'no-unused-vars': 'error',
    'unused-imports/no-unused-imports': 'error',
    'import/no-cycle': 'warn',
    'import/first': 'error',
    'import/no-duplicates': 'error',
    'arrow-body-style': ['error', 'always'],
    'react/prop-types': 'off',
  },
}
