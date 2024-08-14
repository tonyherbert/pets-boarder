// .eslintrc.js

export default {
    env: {
        browser: true,
        es2021: true,
    },
    extends: [
        'eslint:recommended',
        'plugin:react/recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:prettier/recommended',
    ],
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaFeatures: {
            jsx: true,
        },
        ecmaVersion: 2021,
        sourceType: 'module',
    },
    plugins: [
        'react',
        '@typescript-eslint',
        'prettier',
    ],
    rules: {
        'prettier/prettier': 'error',
        'react/jsx-uses-react': 'off',
        'react/jsx-uses-vars': 'error',
        'react/prop-types': 'off',
        'react/react-in-jsx-scope': 'off',
        '@typescript-eslint/explicit-module-boundary-types': 'off',
        '@typescript-eslint/no-explicit-any': 'warn',
        'no-console': 'warn',
    },
    settings: {
        react: {
            pragma: 'React',
            version: 'detect',
        },
    },
    overrides: {
        eslint: "^9",
        glob: "^10"

    }
};
