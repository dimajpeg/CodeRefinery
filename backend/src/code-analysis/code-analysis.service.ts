import { Injectable, Logger } from '@nestjs/common';
import { Linter } from 'eslint';
// Этот импорт теперь будет работать правильно благодаря esModuleInterop
import escomplex from 'escomplex';

@Injectable()
export class CodeAnalysisService {
  private readonly linter = new Linter();
  private readonly logger = new Logger(CodeAnalysisService.name);

  analyzeCode(code: string) {
    const lintMessages = this.linter.verify(code, {
      languageOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
      },
      rules: {
        'no-console': 'warn',
        'no-var': 'error',
        'prefer-const': 'error',
      },
    });

    try {
      // И теперь этот вызов тоже будет работать
      const report = escomplex.analyze(code);

      return {
        lintMessages,
        // И TypeScript не будет ругаться, так как он сможет подхватить наши типы
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
