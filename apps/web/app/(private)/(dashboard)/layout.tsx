import { Banner } from "../../../components/banner/banner";
import { NextLayoutProps } from "../../shared/types/next.types";
import { Header } from "./_components/header";

export default function DashboardLayout(props: Readonly<NextLayoutProps>) {
  const { children } = props;

  return (
    <div className="max-w-[540px] w-full h-screen flex flex-col items-center">
      <Banner />
      <Header />

      <div className="w-full flex z-10">{children}</div>
    </div>
  );
}
