import { ReactNode } from "react";

export interface IAlertSectionProps {
  title?: ReactNode;
  children: ReactNode;
}

export function AlertSection(props: Readonly<IAlertSectionProps>) {
  const { title, children } = props;

  return (
    <div className="min-h-[calc(100vh-8rem)] mt-4">
      {title ? <div className="mb-1 text-lg font-semibold">{title}</div> : null}
      <div className="h-64 bg-input-error">
        <div className="flex flex-col items-center justify-center h-full gap-4 font-light">
          {children}
        </div>
      </div>
    </div>
  );
}
