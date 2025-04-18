"use client";

import { useTheme } from "next-themes";
import { useCallback } from "react";
import { MoonIcon } from "../icons/moon-icon";
import { SunIcon } from "../icons/sun-icon";

import { Button } from "@todo-app/design-system/button";

export function ThemeAction() {
  const { theme, setTheme } = useTheme();

  const handleClick = useCallback(() => {
    setTheme(theme === "dark" ? "light" : "dark");
  }, [theme, setTheme]);

  return (
    <Button size="icon" variant="ghost" type="button" onClick={handleClick}>
      {theme === "light" ? (
        <MoonIcon className="h-5" />
      ) : (
        <SunIcon className="h-5" />
      )}
    </Button>
  );
}
