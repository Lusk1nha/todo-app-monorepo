export enum PasswordStrength {
  VeryWeak = "very-weak",
  Weak = "weak",
  Medium = "medium",
  Strong = "strong",
  VeryStrong = "very-strong",
}

export type StrengthFeedback = {
  strength: PasswordStrength;
  suggestions: string[];
  score: number;
};

export interface PasswordStrengthStrategy {
  calculate(password: string): StrengthFeedback;
}
