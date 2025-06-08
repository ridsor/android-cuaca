module.exports = {
  "prettier/prettier": [
    "error",
    {
      "endOfLine": "auto"
    },
  ],
  root: true,
  extends: '@react-native',
  rules: {
    // suppress errors for missing 'import React' in files
    'react/react-in-jsx-scope': 'off',
    // allow jsx syntax in js files (for next.js project)
    'react/jsx-filename-extension': [1, {extensions: ['.ts', '.tsx']}], //should add ".ts" if typescript project
  },
};
