"use client";

import { SessionProvider } from "next-auth/react";
import { ThemeProvider } from "../providers/theme-provider";
import { Toaster } from "sonner";

interface SystemProvidersProps {
  children: React.ReactNode;
}

export function SystemProviders(props: Readonly<SystemProvidersProps>) {
  const { children } = props;

  return (
    <SessionProvider>
      <ThemeProvider
        attribute="data-theme"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
        storageKey="web:theme"
      >
        <Toaster />
        {children}
      </ThemeProvider>
    </SessionProvider>
  );
}
