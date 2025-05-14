"use client";

import { FormProvider, useForm } from "react-hook-form";
import { SignInFormView } from "./signin-form-view";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  SignInValidation,
  signInValidation,
} from "../../../shared/validations/signin.validation";

import { signIn } from "next-auth/react";

import { toast } from "sonner";

import { SystemPath } from "../../../shared/path";
import { useRouter } from "next/navigation";

export function SignInForm() {
  const router = useRouter();

  const form = useForm<SignInValidation>({
    defaultValues: {
      email: "teste@gmail.com",
      password: "123456789",
    },
    mode: "onSubmit",
    reValidateMode: "onBlur",
    resolver: zodResolver(signInValidation),
  });

  async function onFormSubmit(data: SignInValidation) {
    try {
      const response = await signIn("credentials", {
        ...data,
        redirect: false,
      });

      if (response?.ok) {
        toast.success("Login successful! Redirecting...");
        router.push(SystemPath.Home);
      }

      if (response?.error) {
        throw new Error(response.error);
      }
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "An unexpected error occurred";

      toast.error("Login failed", {
        description: errorMessage,
      });

      console.error("Error on sign in:", error);
    }
  }

  return (
    <FormProvider {...form}>
      <SignInFormView onSubmit={onFormSubmit} />
    </FormProvider>
  );
}
