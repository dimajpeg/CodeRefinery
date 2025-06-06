import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CodeAnalysisModule } from './code-analysis/code-analysis.module';

@Module({
  imports: [CodeAnalysisModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
