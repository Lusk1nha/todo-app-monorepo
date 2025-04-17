"use client";

import { ThemeProvider } from "../providers/theme-provider";

interface SystemProvidersProps {
  children: React.ReactNode;
}

export function SystemProviders(props: Readonly<SystemProvidersProps>) {
  const { children } = props;

  return (
    <ThemeProvider
      attribute="data-theme"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
      storageKey="web:theme"
    >
      {children}
    </ThemeProvider>
  );
}
