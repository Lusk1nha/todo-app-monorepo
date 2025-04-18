"use client";

import { Controller, useFormContext } from "react-hook-form";
import { NewTodoValidation } from "../../../shared/validations/new-todo-item.validation";

import { Circle } from "@todo-app/design-system/circle";
import { TextInput } from "@todo-app/design-system/text-input";

interface NewTodoFormViewProps {
  onSubmit: (data: NewTodoValidation) => Promise<void> | void;
}

export function NewTodoFormView(props: Readonly<NewTodoFormViewProps>) {
  const { onSubmit } = props;
  const { handleSubmit, control, formState } =
    useFormContext<NewTodoValidation>();

  const { isLoading, isSubmitting } = formState;

  return (
    <form
      className="bg-input-background w-full h-12 md:!h-16 rounded-[5px] flex items-center px-5 md:px-6 gap-x-6 shadow-sm"
      onSubmit={handleSubmit(onSubmit)}
    >
      <fieldset className="hidden">
        <legend>New Todo Form</legend>
        <label htmlFor="title" className="sr-only">
          Title
        </label>
      </fieldset>

      <Circle />

      <Controller
        name="title"
        control={control}
        render={({ field }) => (
          <TextInput
            {...field}
            value={field.value ?? ""}
            placeholder="Create a new todo…"
            onChange={(e) => field.onChange(e.target.value)}
            className="w-full h-full"
            autoComplete="off"
            autoCorrect="off"
            spellCheck="false"
            autoCapitalize="none"
            disabled={isLoading || isSubmitting}
          />
        )}
      />
    </form>
  );
}
