import {
  PasswordStrength,
  StrengthFeedback,
  PasswordStrengthStrategy,
} from "../password-strength.types";

export class SimplePasswordStrengthStrategy
  implements PasswordStrengthStrategy
{
  calculate(password = ""): StrengthFeedback {
    const suggestions: string[] = [];
    let score = 0;

    if (password?.length === 0) {
      return {
        strength: PasswordStrength.VeryWeak,
        suggestions: [],
        score: 0,
      };
    }

    if (password?.length < 8) {
      suggestions.push("Password too short (min 8 chars)");
    } else if (password?.length >= 12) {
      score += 2;
    } else {
      score += 1;
    }

    const hasLowercase = /[a-z]/.test(password);
    const hasUppercase = /[A-Z]/.test(password);
    const hasNumbers = /[0-9]/.test(password);
    const hasSpecial = /[^a-zA-Z0-9]/.test(password);

    if (!hasLowercase) suggestions.push("Add lowercase letters");
    if (!hasUppercase) suggestions.push("Add uppercase letters");
    if (!hasNumbers) suggestions.push("Add numbers");
    if (!hasSpecial) suggestions.push("Add special characters");

    if (/(12345|abcde|qwerty|password)/i.test(password)) {
      suggestions.push("Avoid common patterns");
    }

    if (hasLowercase) score += 1;
    if (hasUppercase) score += 1;
    if (hasNumbers) score += 1;
    if (hasSpecial) score += 1;

    return {
      strength: this.mapScoreToStrength(score),
      suggestions,
      score,
    };
  }

  private mapScoreToStrength(score: number): PasswordStrength {
    if (score >= 6) return PasswordStrength.VeryStrong;
    if (score >= 4) return PasswordStrength.Strong;
    if (score >= 3) return PasswordStrength.Medium;
    return score >= 1 ? PasswordStrength.Weak : PasswordStrength.VeryWeak;
  }
}
