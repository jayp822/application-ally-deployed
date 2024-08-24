import globals from 'globals';
import pluginJs from '@eslint/js';

export default [
  {
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node, // Add Node.js globals
      },
      parserOptions: {
        ecmaVersion: 2021,
      },
    },
    plugins: {
      'eslint-plugin-js': pluginJs,
    },
    rules: {
      'no-undef': 'off', // Disable the no-undef rule
    },
  },
  pluginJs.configs.recommended,
];
