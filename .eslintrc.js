module.exports = {
    parser: "@typescript-eslint/parser",
    env: {
        "browser": true,
        "es2021": true,
        "node": true,
        "jest": true
    },
    extends: [
        "plugin:@typescript-eslint/recommended",
        "plugin:jest/recommended",
        "plugin:prettier/recommended",
    ],
    parserOptions: {
        "ecmaVersion": 12,
        "sourceType": "module",
        "project": "tsconfig.json",
        "tsconfigRootDir": "."
    },
    plugins: [
        "@typescript-eslint",
        "prettier",
        "jest"
    ],
    rules: {}
}