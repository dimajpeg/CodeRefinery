import { Injectable, Logger } from '@nestjs/common';
import { Linter } from 'eslint';
import { analyze, Report } from 'escomplex';

@Injectable()
export class CodeAnalysisService {
  // Инициализируем Linter прямо здесь. Конструктор нам даже не нужен.
  private readonly linter = new Linter();
  private readonly logger = new Logger(CodeAnalysisService.name);

  analyzeCode(code: string) {
    // Вызываем verify с кодом и конфигурацией. Этого достаточно.
    const lintMessages = this.linter.verify(code, {
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
      },
      // ВАЖНО: Мы можем использовать эти правила, потому что они встроены в ESLint.
      // Linter знает о них по умолчанию.
      rules: {
        'no-console': 'warn',
        'no-var': 'error',
        'prefer-const': 'error',
      },
    });

    try {
      const report: Report = analyze(code);

      return {
        lintMessages,
        complexity: {
          operands: report.aggregate.halstead.operands.total,
          operators: report.aggregate.halstead.operators.total,
          difficulty: report.aggregate.halstead.difficulty,
          volume: report.aggregate.halstead.volume,
          effort: report.aggregate.halstead.effort,
          cyclomatic: report.aggregate.cyclomatic,
        },
      };
    } catch (e) {
      this.logger.error('Failed to analyze code complexity', e);

      return {
        lintMessages,
        complexity: null,
        error: 'Could not analyze code complexity. Possible syntax error.',
      };
    }
  }
}
