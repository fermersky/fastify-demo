module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: "airbnb-base",
  overrides: [],
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
  rules: {
    quotes: ["error", "double", { avoidEscape: true }],
    "linebreak-style": ["error", "windows"],
    "no-console": "off",
    "import/extensions": "off",
    "no-unused-vars": "off",
    "class-methods-use-this": "off",
    "import/no-unresolved": ["warn", { ignore: ["^node:test$"] }],
    "object-curly-newline": "off",
    "max-classes-per-file": "off",
  },
};
