module.exports = {
  extends: [require.resolve('@umijs/fabric/dist/eslint')],
  rules: {
    'no-console': 0, // 禁止使用console
    'no-debugger': 2, // 禁止使用debugger
    'no-unused-vars': ['error'],
    '@typescript-eslint/no-unused-vars': ['error'], // 不能有声明后未被使用的变量或参数
    '@typescript-eslint/no-empty-function': ['warn'],
    'no-unused-vars': 'off',
    '@typescript-eslint/no-var-requires': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/ban-ts-comment': 'off',
    '@typescript-eslint/ban-types': 'off',
    '@typescript-eslint/no-unused-vars': 'off',
    '@typescript-eslint/no-non-null-assertion': 'off',
    'no-unused-vars': 'off',
    'no-case-declarations': 'off',
    'no-unused-expressions': 'off',
    '@typescript-eslint/no-unused-expressions': 'error',
    'no-use-before-define': 'off',
    '@typescript-eslint/no-use-before-define': ['error'],
    // 'react/jsx-filename-extension': [
    //   1,
    //   { extensions: ['.js', '.jsx', '.tsx'] },
    // ],
    // '@typescript-eslint/member-delimiter-style': 0,
    // '@typescript-eslint/explicit-function-return-type': 0,
    // 'jsx-quotes': ['error', 'prefer-double'],
    // '@typescript-eslint/no-explicit-any': 0,
    // 'react/self-closing-comp': 1,
  },
};
