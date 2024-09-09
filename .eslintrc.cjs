module.exports = {
    root: true,
    env: {
        browser: true,
        node: true,
        es6: true,
    },
    globals: {
        wx: 'readonly',
        OnecodeJSBridge: 'readonly',
    },
    parserOptions: {
        parser: '@typescript-eslint/parser',
        ecmaVersion: 2020,
        sourceType: 'module',
        jsxPragma: 'React',
        ecmaFeatures: {
            jsx: true,
        },
    },
    plugins: ['simple-import-sort'],
    extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:prettier/recommended',
    ],
    rules: {
        'simple-import-sort/imports': 'error',
        'simple-import-sort/exports': 'error',
        '@typescript-eslint/no-explicit-any': 'off',
        '@typescript-eslint/ban-ts-comment': 'off',
        'prettier/prettier': 'error',
        '@typescript-eslint/no-empty-interface': 'off',
    },
};
