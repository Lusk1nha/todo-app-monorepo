import {
  Controller,
  FieldError,
  FieldValues,
  Path,
  useFormContext,
} from "react-hook-form";

import { TextInput, TextInputProps } from "@todo-app/design-system/text-input";
import { InputWrapper } from "./input-wrapper";

interface TextInputControlledProps<T extends FieldValues>
  extends TextInputProps {
  name: Path<T>;
}

export function TextInputControlled<T extends FieldValues>(
  props: TextInputControlledProps<T>
) {
  const { name } = props;
  const { control } = useFormContext<T>();

  function getSomeError(error: FieldError | undefined): boolean {
    if (error?.message) {
      return true;
    }

    return false;
  }

  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState }) => (
        <InputWrapper error={fieldState.error}>
          <TextInput
            {...props}
            {...field}
            error={getSomeError(fieldState.error)}
            onChange={(e) => field.onChange(e.target.value)} // Ensure the value is updated correctly
            onBlur={() => field.onBlur()} // Ensure the blur event is triggered correctly
            value={field.value ?? ""} // Ensure the value is controlled
          />
        </InputWrapper>
      )}
    />
  );
}
