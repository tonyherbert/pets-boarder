module.exports = {
    "env": {
        "browser": true,
        "es2021": true
    },
    "extends": [
        "eslint:recommended",
        "plugin:react/recommended",
        "plugin:@typescript-eslint/recommended",
        'plugin:prettier/recommended',

    ],
    "overrides": [
    ],
    "parser": "@typescript-eslint/parser",
    "parserOptions": {
        "ecmaFeatures": {
            "jsx": true
        },
        "ecmaVersion": "latest",
        "sourceType": "module"
    },
    "plugins": [
        "react",
        "@typescript-eslint",
        'prettier'
    ],
    "rules": {
        "react/jsx-uses-react": "off",
        "react/jsx-uses-vars": "error",
        "react/prop-types": "off",
        "react/react-in-jsx-scope": "off",
    },
    "settings": {
        "react": {
            "pragma": "React",
            "version": "detect"
        },
    }
};