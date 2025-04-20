import {
  PasswordStrengthStrategy,
  PasswordStrength,
  StrengthFeedback,
} from "../password-strength.types";

const MIN_LENGTH = 8;
const MIN_STRONG_LENGTH = 12;

export class AdvancedPasswordStrengthStrategy
  implements PasswordStrengthStrategy
{
  calculate(password: string): StrengthFeedback {
    const suggestions: string[] = [];
    let score = 0;

    score += this.calculateLengthScore(password, suggestions);
    score += this.calculateComplexityScore(password, suggestions);
    score -= this.calculatePenalties(password, suggestions);

    return {
      strength: this.mapScoreToStrength(score),
      suggestions,
      score,
    };
  }

  private calculateLengthScore(
    password: string,
    suggestions: string[]
  ): number {
    if (password?.length === 0) return 0;

    if (password?.length < MIN_LENGTH) {
      suggestions.push(`At least ${MIN_LENGTH} characters`);
      return Math.floor(password.length / 2);
    }

    return password?.length >= MIN_STRONG_LENGTH ? 4 : 2;
  }

  private calculateComplexityScore(
    password: string,
    suggestions: string[]
  ): number {
    const checks = {
      lowercase: /[a-z]/.test(password),
      uppercase: /[A-Z]/.test(password),
      numbers: /[0-9]/.test(password),
      special: /[^a-zA-Z0-9]/.test(password),
    };

    let score = 0;
    if (!checks.lowercase) suggestions.push("Add lowercase letters");
    if (!checks.uppercase) suggestions.push("Add uppercase letters");
    if (!checks.numbers) suggestions.push("Add numbers");
    if (!checks.special) suggestions.push("Add special characters");

    score += Object.values(checks).filter(Boolean).length * 2;
    return score;
  }

  private calculatePenalties(password: string, suggestions: string[]): number {
    let penalties = 0;

    if (/(.)\1{2,}/.test(password)) {
      penalties += 2;
      suggestions.push("Avoid repeated characters");
    }

    if (/(123|abc|qwerty|password)/i.test(password)) {
      penalties += 3;
      suggestions.push("Avoid common patterns");
    }

    return penalties;
  }

  private mapScoreToStrength(score: number): PasswordStrength {
    if (score >= 12) return PasswordStrength.VeryStrong;
    if (score >= 8) return PasswordStrength.Strong;
    if (score >= 5) return PasswordStrength.Medium;
    return score >= 3 ? PasswordStrength.Weak : PasswordStrength.VeryWeak;
  }
}
