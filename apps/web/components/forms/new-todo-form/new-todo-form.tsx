"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";

import { NewTodoFormView } from "./new-todo-form-view";
import {
  newTodoValidation,
  NewTodoValidation,
} from "../../../shared/validations/new-todo-item.validation";

interface NewTodoFormProps {
  defaultValues?: Partial<NewTodoValidation>;
}

export function NewTodoForm(props: Readonly<NewTodoFormProps>) {
  const { defaultValues } = props;

  const form = useForm<NewTodoValidation>({
    defaultValues,
    resolver: zodResolver(newTodoValidation),
  });

  const { reset } = form;

  async function onFormSubmit(data: NewTodoValidation) {
    const payload = newTodoValidation.parse(data);
    console.log("Form submitted", payload);

    reset({
      title: "",
    });
  }

  return (
    <FormProvider {...form}>
      <NewTodoFormView onSubmit={onFormSubmit} />
    </FormProvider>
  );
}
