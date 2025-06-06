import { Injectable, Logger } from '@nestjs/common';
import { Linter } from 'eslint';

@Injectable()
export class CodeAnalysisService {
  private readonly linter = new Linter();
  private readonly logger = new Logger(CodeAnalysisService.name);

  analyzeCode(code: string) {
    this.logger.log(`Analyzing code with ESLint (length: ${code.length})`);
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
    this.logger.log(`ESLint analysis complete. Found ${lintMessages.length} messages.`);

    try {
      this.logger.log('Attempting to analyze complexity with escomplex...');
      // eslint-disable-next-line @typescript-eslint/no-require-imports
      const escomplex = require('escomplex');
      
      // ВЫЗЫВАЕМ ПРАВИЛЬНЫЙ МЕТОД 'analyse' (с буквой 's')
      const report = escomplex.analyse(code); 
      this.logger.log('Escomplex analysis successful!');

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
      this.logger.error('Error during escomplex analysis:', e);
      return {
        lintMessages,
        complexity: null,
        error: 'Could not analyze code complexity. Check server logs.',
      };
    }
  }
}
