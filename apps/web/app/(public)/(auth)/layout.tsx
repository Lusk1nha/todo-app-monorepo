import { NextLayoutProps } from "../../shared/types/next.types";

export default function AuthLayout(props: Readonly<NextLayoutProps>) {
  const { children } = props;

  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className="w-full max-w-[600px] flex px-8">{children}</div>
    </div>
  );
}
