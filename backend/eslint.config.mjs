import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  eslint.configs.recommended,
  ...tseslint.configs.recommended,
  {
    rules: {
      // ИСПРАВЛЯЕМ ИМЯ ПРАВИЛА ЗДЕСЬ
      '@typescript-eslint/no-require-imports': 'off', 
      '@typescript-eslint/no-explicit-any': 'off', 
    },
  },
);