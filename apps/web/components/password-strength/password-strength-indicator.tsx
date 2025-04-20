"use client";

import { useEffect, useState } from "react";
import {
  PasswordStrength,
  StrengthFeedback,
  PasswordStrengthStrategy,
} from "./password-strength.types";
import { AdvancedPasswordStrengthStrategy } from "./strategies/advanced-strength.strategy";
import { StrengthMeter } from "./strength-meter";

interface PasswordStrengthIndicatorProps {
  password: string;
  strategy?: PasswordStrengthStrategy;
  className?: string;
}

export const PasswordStrengthIndicator = ({
  password,
  strategy = new AdvancedPasswordStrengthStrategy(),
  className = "",
}: PasswordStrengthIndicatorProps) => {
  const [feedback, setFeedback] = useState<StrengthFeedback>({
    strength: PasswordStrength.VeryWeak,
    suggestions: [],
    score: 0,
  });

  useEffect(() => {
    setFeedback(strategy.calculate(password));
  }, [password]);

  return (
    <div
      className={`space-y-2 ${className}`}
      data-testid="password-strength-indicator"
    >
      <div className="flex justify-between items-center text-sm">
        <span className="text-gray-600">Password Strength:</span>
        <span
          className={`font-medium ${StrengthConfig[
            feedback.strength
          ].color.replace("bg", "text")}`}
        >
          {StrengthConfig[feedback.strength].label}
        </span>
      </div>

      <StrengthMeter strength={feedback.strength} score={feedback.score} />

      {feedback.suggestions?.length > 0 && (
        <ul className="text-xs text-gray-500 space-y-1">
          {feedback.suggestions.map((suggestion, index) => (
            <li key={index} className="flex items-center">
              <span className="mr-1">•</span>
              {suggestion}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

const StrengthConfig = {
  [PasswordStrength.VeryWeak]: {
    color: "bg-input-error",
    label: "Very Weak",
  },
  [PasswordStrength.Weak]: {
    color: "bg-orange-500",
    label: "Weak",
  },
  [PasswordStrength.Medium]: {
    color: "bg-yellow-500",
    label: "Medium",
  },
  [PasswordStrength.Strong]: {
    color: "bg-blue-500",
    label: "Strong",
  },
  [PasswordStrength.VeryStrong]: {
    color: "bg-green-500",
    label: "Very Strong",
  },
};
