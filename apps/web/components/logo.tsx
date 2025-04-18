import Link from "next/link";
import { LogoIcon } from "./icons/logo-icon";
import { SystemPath } from "../shared/path";

export function Logo() {
  return (
    <Link href={SystemPath.Home} className="text-white">
      <LogoIcon className="w-28 md:w-40" />
    </Link>
  );
}
