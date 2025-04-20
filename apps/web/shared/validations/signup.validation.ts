import { z } from "zod";
import { API_BASE_URL } from "../config";

interface CheckValueExistsResponse {
  available: boolean;
}

export const signUpValidation = z
  .object({
    email: z
      .string({
        required_error: "Email is required",
      })
      .email("Invalid email address"),
    name: z
      .string({
        required_error: "Name is required",
      })
      .min(1, "Name is required"),
    password: z
      .string({
        required_error: "Password is required",
      })
      .min(8, "Password must be at least 8 characters long"),
    confirmPassword: z
      .string({
        required_error: "Confirm password is required",
      })
      .min(8, "Confirm password is required"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  })
  .superRefine(async (data, ctx) => {
    const name = data.name.trim().toLowerCase();
    const email = data.email.trim().toLowerCase();

    const [nameExists, emailExists] = await Promise.all([
      checkUsernameExists(name),
      checkEmailExists(email),
    ]);

    if (!nameExists.available) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Username already exists",
        path: ["name"],
      });
    }

    if (!emailExists.available) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Email already exists",
        path: ["email"],
      });
    }

    return data;
  });

async function checkUsernameExists(
  name: string
): Promise<CheckValueExistsResponse> {
  const response = await fetch(`${API_BASE_URL}/auth/username-exists`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name }),
  });

  const data = await response.json();

  return data;
}

export const checkEmailExists = async (
  email: string
): Promise<CheckValueExistsResponse> => {
  const response = await fetch(`${API_BASE_URL}/auth/email-exists`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email }),
  });

  const data = await response.json();

  return data;
};

export type SignUpValidation = z.infer<typeof signUpValidation>;
