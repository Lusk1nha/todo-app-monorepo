import "./globals.css";
import "@todo-app/design-system/styles.css";
import "@todo-app/ui/styles.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Todo App",
  description: "A simple todo app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
