module.exports = {
    root: true,
    parser: '@typescript-eslint/parser',
    extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended',
        // 'plugin:@typescript-eslint/recommended-requiring-type-checking',
    ],
    plugins: ['@typescript-eslint', 'prettier', 'import'],
    settings: {
        react: {
            version: 'detect',
        },
    },
    parserOptions: {
        sourceType: 'module',
        ecmaVersion: 2021,
        project: 'tsconfig.json',
        tsconfigRootDir: __dirname,
    },
    env: {
        es2021: true,
        node: true,
        jest: true,
    },
    ignorePatterns: ['node_modules', '.eslintrc.js'],
}
