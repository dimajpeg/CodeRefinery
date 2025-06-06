import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { CodeAnalysisService } from './code-analysis.service';

class AnalyzeCodeDto {
  code: string;
}

@Controller('analyze')
export class CodeAnalysisController {
  constructor(private readonly codeAnalysisService: CodeAnalysisService) {}

  @Post()
  @HttpCode(HttpStatus.OK)
  analyze(@Body() analyzeCodeDto: AnalyzeCodeDto) {
    return this.codeAnalysisService.analyzeCode(analyzeCodeDto.code);
  }
}
