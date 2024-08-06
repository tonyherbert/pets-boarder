// eslint.config.js
export default {
    env: {
        browser: true,
        es2021: true,
    },
    extends: 'eslint:recommended',
    parserOptions: {
        ecmaVersion: 12,
        sourceType: 'module',
    },
    rules: {
        // Enforces consistent spacing inside array brackets
        'array-bracket-spacing': ['error', 'never'],

        // Enforces consistent brace style for blocks
        'brace-style': ['error', '1tbs', { 'allowSingleLine': true }],

        // Requires camel case names
        'camelcase': ['error', { 'properties': 'always' }],

        // Disallow console.log statements
        'no-console': 'warn',

        // Disallow empty functions
        'no-empty-function': ['warn', { 'allow': ['functions', 'arrowFunctions'] }],

        // Disallow unused variables
        'no-unused-vars': ['warn', { 'vars': 'all', 'args': 'none' }],

        // Disallow variable declarations from shadowing variables declared in the outer scope
        'no-shadow': 'warn',

        // Enforces consistent indentation
        'indent': ['error', 2],

        // Enforces the use of === and !==
        'eqeqeq': ['error', 'always'],

        // Enforces consistent line breaks inside blocks
        'padded-blocks': ['error', 'never'],

        // Enforces a consistent line length
        'max-len': ['warn', { 'code': 80 }],

        // Enforces the use of single quotes for strings
        'quotes': ['error', 'single'],

        // Enforces consistent spacing before and after keywords
        'keyword-spacing': ['error', { 'before': true, 'after': true }],

        // Enforces consistent spacing around operators
        'operator-spacing': ['error', { 'before': true, 'after': true }],

        // Requires a newline at the end of files
        'eol-last': ['error', 'always'],

        // Enforces consistent use of trailing commas
        'comma-dangle': ['error', 'never'],

        // Enforces or disallows the use of semicolons instead of ASI
        'semi': ['error', 'always'],
    },
};
