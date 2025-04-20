import { PasswordStrength } from "./password-strength.types";

interface StrengthMeterProps {
  strength: PasswordStrength;
  score: number;
}

const StrengthConfig: Record<
  PasswordStrength,
  {
    color: string;
    label: string;
    width: string;
  }
> = {
  [PasswordStrength.VeryWeak]: {
    color: "bg-red-500",
    label: "Very Weak",
    width: "w-1/5",
  },
  [PasswordStrength.Weak]: {
    color: "bg-orange-500",
    label: "Weak",
    width: "w-2/5",
  },
  [PasswordStrength.Medium]: {
    color: "bg-yellow-500",
    label: "Medium",
    width: "w-3/5",
  },
  [PasswordStrength.Strong]: {
    color: "bg-blue-500",
    label: "Strong",
    width: "w-4/5",
  },
  [PasswordStrength.VeryStrong]: {
    color: "bg-green-500",
    label: "Very Strong",
    width: "w-full",
  },
};

export const StrengthMeter = ({ strength, score }: StrengthMeterProps) => (
  <div className="w-full bg-gray-200 rounded-full h-1.5">
    <div
      className={`h-1.5 rounded-full transition-all duration-500 ${
        StrengthConfig[strength].color
      } ${StrengthConfig[strength].width}`}
      role="progressbar"
      aria-valuenow={score}
      aria-valuemin={0}
      aria-valuemax={20}
    />
  </div>
);
