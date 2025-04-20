import { FieldError } from "react-hook-form";

interface InputWrapperProps {
  error?: FieldError;
  children: React.ReactNode;
}

export function InputWrapper(props: Readonly<InputWrapperProps>) {
  const { error, children } = props;

  return (
    <div className="flex flex-col gap-y-1 w-full">
      {children}
      {error && (
        <p className="pl-1 text-input-error text-sm font-normal">
          {error.message}
        </p>
      )}
    </div>
  );
}
