"use client";

import { useFormContext } from "react-hook-form";
import { SignInValidation } from "../../../shared/validations/signin.validation";

import { Button } from "@todo-app/design-system/button";
import { TextInputControlled } from "../../inputs/text-input-controlled";
import Link from "next/link";
import { SystemPath } from "../../../shared/path";
import { SaveAction } from "../../actions/save-action";

interface SignInFormViewProps {
  onSubmit: (data: SignInValidation) => Promise<void>;
}

export function SignInFormView(props: Readonly<SignInFormViewProps>) {
  const { onSubmit } = props;

  const { handleSubmit, formState } = useFormContext<SignInValidation>();

  const { isSubmitting, isSubmitSuccessful } = formState;

  return (
    <form className="flex flex-col gap-y-6" onSubmit={handleSubmit(onSubmit)}>
      <fieldset className="flex flex-col gap-y-4" disabled={isSubmitting}>
        <TextInputControlled
          name="email"
          className="min-h-12"
          variant={"auth"}
          placeholder="Email"
        />

        <TextInputControlled
          name="password"
          className="min-h-12"
          variant={"auth"}
          placeholder="Password"
          type="password"
        />
      </fieldset>

      <div className="flex flex-col gap-y-2">
        <SaveAction isSubmitting={isSubmitting}>
          {isSubmitting ? "Signing in..." : "Sign In"}
        </SaveAction>

        <Link className="w-full" href={SystemPath.ResetPassword}>
          <Button type="button" className="w-full">
            Forget your password?
          </Button>
        </Link>
      </div>
    </form>
  );
}
