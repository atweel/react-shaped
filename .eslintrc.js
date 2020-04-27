module.exports = {
  root: true,
  ignorePatterns: [
    "node_modules/", 
    "library/", 
    "application/", 
    "lib/",
    "app/", 
    "tests/hooks", 
    "*.config.js"
  ],
  settings: {
    react: {
      version: "16.0",
    }
  },
  parser: '@typescript-eslint/parser',
  plugins: [
    '@typescript-eslint',
    'eslint-plugin-react'
  ],
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended'
  ],
  rules: {
    "quotes": "off",
    "@typescript-eslint/quotes": ["error", "single", { "allowTemplateLiterals": true }],
    "@typescript-eslint/no-empty-interface": ["warn"],
    "@typescript-eslint/no-empty-function": ["warn"],
    "@typescript-eslint/no-explicit-any": ["off"],
    "comma-dangle": ["error", "always-multiline"],
    "@typescript-eslint/no-misused-new": ["off"],
    "indent": ["error", 4, {
      "FunctionDeclaration": {"parameters": "first"},
      "FunctionExpression": {"parameters": "first"},
      "CallExpression": {"arguments": "first"},
      "MemberExpression": 1,
      "flatTernaryExpressions": false,
      "SwitchCase": 1
    }],
    "no-trailing-spaces": "error",
    "template-tag-spacing": ["error", "never"],
    "template-curly-spacing": ["error", "always"],
    "object-curly-spacing": ["error", "always"],
    "array-bracket-spacing": ["error", "always"],
    "eol-last": ["error", "always"],
    "semi": ["error", "always"],
    "react/prop-types": ["off"]
  }
};