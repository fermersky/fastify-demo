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
    quotes: [2, "double", { avoidEscape: true }],
    "linebreak-style": ["error", "windows"],
    "no-console": "off",
    "import/extensions": "off",
    "no-unused-vars": "warn",
    "class-methods-use-this": "off",
  },
};
