// backend/src/types/escomplex.d.ts

declare module 'escomplex' {
  export interface HalsteadReport {
    operands: { total: number; distinct: number };
    operators: { total: number; distinct: number };
    length: number;
    vocabulary: number;
    difficulty: number;
    volume: number;
    effort: number;
    bugs: number;
    time: number;
  }

  export interface AggregateReport {
    halstead: HalsteadReport;
    cyclomatic: number;
  }

  export interface Report {
    aggregate: AggregateReport;
  }

  export function analyze(code: string, options?: any): Report;
}
