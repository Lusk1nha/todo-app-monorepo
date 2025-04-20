import { ThemeAction } from "../../../../components/actions/theme-action";
import { Logo } from "../../../../components/logo";

export function Header() {
  return (
    <header className="w-full py-9 pb-10 md:py-[70px] px-6 flex items-center justify-between z-10">
      <Logo />
      <ThemeAction />
    </header>
  );
}
