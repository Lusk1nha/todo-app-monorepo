"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { SystemPath } from "../shared/path";

interface User {
  id: string;
  name: string;
  email: string;
  image: string | null;
}

export function useCurrentUser(): User {
  const { data: session } = useSession();
  const router = useRouter();

  const user = session?.user || null;

  if (!user) {
    router.push(SystemPath.Login);
    throw new Error("User not found. Please log in.");
  }

  return user as User;
}
