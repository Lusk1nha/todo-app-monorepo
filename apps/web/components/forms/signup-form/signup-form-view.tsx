"use client";

import { useFormContext } from "react-hook-form";
import { SignUpValidation } from "../../../shared/validations/signup.validation";

import { Button } from "@todo-app/design-system/button";
import { TextInputControlled } from "../../inputs/text-input-controlled";
import { SaveAction } from "../../actions/save-action";
import { PasswordStrengthIndicator } from "../../password-strength/password-strength-indicator";
import { SimplePasswordStrengthStrategy } from "../../password-strength/strategies/simple-strength.strategy";

interface SignUpFormViewProps {
  onSubmit: (data: SignUpValidation) => Promise<void>;
}

export function SignUpFormView(props: Readonly<SignUpFormViewProps>) {
  const { onSubmit } = props;

  const { watch, handleSubmit, formState } = useFormContext<SignUpValidation>();

  const { isSubmitting, isSubmitSuccessful } = formState;

  const password = watch("password");

  return (
    <form className="flex flex-col gap-y-6" onSubmit={handleSubmit(onSubmit)}>
      <fieldset className="flex flex-col gap-y-4" disabled={isSubmitting}>
        <TextInputControlled
          type="email"
          name="email"
          className="min-h-12"
          variant={"auth"}
          placeholder="Email"
          aria-describedby="email-error"
        />

        <TextInputControlled
          type="text"
          name="name"
          className="min-h-12"
          variant={"auth"}
          placeholder="Username"
        />

        <div className="flex flex-col gap-y-2">
          <TextInputControlled
            name="password"
            type="password"
            className="min-h-12"
            variant={"auth"}
            placeholder="Password"
            aria-describedby="password-error password-strength"
          />

          <div className="flex-1 px-1">
            <PasswordStrengthIndicator
              password={password}
              strategy={new SimplePasswordStrengthStrategy()}
            />
          </div>
        </div>

        <TextInputControlled
          name="confirmPassword"
          type="password"
          className="min-h-12"
          variant={"auth"}
          placeholder="Confirm Password"
        />
      </fieldset>

      <SaveAction disabled={isSubmitSuccessful} isSubmitting={isSubmitting}>
        {isSubmitting ? "Creating account..." : "Create Account"}
      </SaveAction>
    </form>
  );
}
