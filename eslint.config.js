// eslint.config.js

import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  { ignores: ['dist', 'node_modules'] }, // игнорируем папки

  js.configs.recommended, // базовые JS правила

  ...tseslint.configs.recommended, // TypeScript правила (распаковываем массив!)

  {
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: 'module',
      globals: {
        ...globals.browser,
        ...globals.node, // для Vite и process.env
      },
    },
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
    },
    rules: {
      // React Hooks правила
      ...reactHooks.configs.recommended.rules,

      // React Refresh правило (для Vite Fast Refresh)
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],

      // Опционально: полезные правила
      '@typescript-eslint/no-unused-vars': 'warn',
      '@typescript-eslint/no-explicit-any': 'off', // если часто используешь any
      'no-console': 'warn',
    },
  }
);