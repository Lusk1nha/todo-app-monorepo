"use client";

import { FormProvider, useForm } from "react-hook-form";
import { SignUpFormView } from "./signup-form-view";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  SignUpValidation,
  signUpValidation,
} from "../../../shared/validations/signup.validation";

import { SystemPath } from "../../../shared/path";
import { toast } from "sonner";

import { API_BASE_URL } from "../../../shared/config";
import { delay } from "@todo-app/mockup/delay";
import { useRouter } from "next/navigation";

export function SignUpForm() {
  const router = useRouter();

  const form = useForm<SignUpValidation>({
    mode: "onSubmit",
    reValidateMode: "onBlur",
    resolver: zodResolver(signUpValidation),
  });

  async function onFormSubmit(data: SignUpValidation): Promise<void> {
    try {
      await registerUser(data);
      toast.success("Registration successful! Redirecting...");

      await delay(1000);
      router.push(SystemPath.Login);
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "An unexpected error occurred";

      toast.error("Registration failed", {
        description: errorMessage,
      });

      console.error("Error on sign up:", error);
    }
  }

  async function registerUser(payload: SignUpValidation): Promise<any> {
    const { email, name, password } = payload;

    try {
      const response = await fetch(`${API_BASE_URL}/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, name, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Registration failed");
      }

      return data;
    } catch (error) {
      if (error instanceof TypeError) {
        throw new Error("Network error. Please check your connection.");
      }
      throw error;
    }
  }

  return (
    <FormProvider {...form}>
      <SignUpFormView onSubmit={onFormSubmit} />
    </FormProvider>
  );
}
