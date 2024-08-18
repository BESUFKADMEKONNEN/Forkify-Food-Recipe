declare module 'fractional' {
    export class Fraction {
      constructor(numerator: number | string, denominator?: number);
      add(b: Fraction | number): Fraction;
      subtract(b: Fraction | number): Fraction;
      multiply(b: Fraction | number): Fraction;
      divide(b: Fraction | number): Fraction;
      equals(b: Fraction | number): boolean;
      toString(): string;
    }
  }
  