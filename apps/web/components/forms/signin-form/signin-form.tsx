"use client";

import { FormProvider, useForm } from "react-hook-form";
import { SignInFormView } from "./signin-form-view";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  SignInValidation,
  signInValidation,
} from "../../../shared/validations/signin.validation";
import { delay } from "@todo-app/mockup/delay";
import { API_BASE_URL } from "../../../shared/config";
import { toast } from "sonner";

import { SystemPath } from "../../../shared/path";
import { useRouter } from "next/navigation";

export function SignInForm() {
  const router = useRouter();

  const form = useForm<SignInValidation>({
    mode: "onSubmit",
    reValidateMode: "onBlur",
    resolver: zodResolver(signInValidation),
  });

  async function onFormSubmit(data: SignInValidation) {
    try {
      await loginUser(data);
      toast.success("Login successful! Redirecting...");

      await delay(1000);
      router.push(SystemPath.Home);
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "An unexpected error occurred";

      toast.error("Login failed", {
        description: errorMessage,
      });

      console.error("Error on sign in:", error);
    }
  }

  async function loginUser(payload: SignInValidation) {
    const { email, password } = payload;

    try {
      const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Login failed");
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
      <SignInFormView onSubmit={onFormSubmit} />
    </FormProvider>
  );
}
