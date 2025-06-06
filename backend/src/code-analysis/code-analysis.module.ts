import { Module } from '@nestjs/common';
import { CodeAnalysisService } from './code-analysis.service';
import { CodeAnalysisController } from './code-analysis.controller';

@Module({
  controllers: [CodeAnalysisController],
  providers: [CodeAnalysisService],
})
export class CodeAnalysisModule {}
