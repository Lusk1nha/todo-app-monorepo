"use client";

import { useSession } from "next-auth/react";
import Link from "next/link";
import { ReactNode } from "react";
import { SystemPath } from "../../shared/path";
import { AlertSection } from "../alerts/alert.section";

type RenderPropChild = (uid: string) => ReactNode;

interface IsLoggedInProps {
  children: RenderPropChild | ReactNode;
  fallback?: ReactNode;
}

export function IsLoggedIn(props: Readonly<IsLoggedInProps>) {
  const { children, fallback } = props;
  const { status, data } = useSession();

  if (status === "loading") {
    return (
      <div className="flex h-screen items-center justify-center">
        Loading...
      </div>
    );
  }

  if (!data?.user) {
    if (fallback) {
      return <>{fallback}</>;
    }

    return (
      <AlertSection title="You are not logged in.">
        <Link href={SystemPath.Login}>Login</Link>
      </AlertSection>
    );
  }

  return <>{children}</>;
}
