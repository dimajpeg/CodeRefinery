import { Controller } from '@nestjs/common';
import { CodeAnalysisService } from './code-analysis.service';

@Controller('code-analysis')
export class CodeAnalysisController {
  constructor(private readonly codeAnalysisService: CodeAnalysisService) {}
}
