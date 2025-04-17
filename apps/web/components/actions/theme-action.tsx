"use client";

import { useTheme } from "next-themes";
import { useCallback } from "react";
import { MoonIcon } from "../icons/moon-icon";
import { SunIcon } from "../icons/sun-icon";

export function ThemeAction() {
  const { theme, setTheme } = useTheme();

  const handleClick = useCallback(() => {
    setTheme(theme === "dark" ? "light" : "dark");
  }, [theme, setTheme]);

  return (
    <button
      className="w-5 h-5 md:w-7 md:h-7 text-white flex items-center justify-center cursor-pointer"
      type="button"
      onClick={handleClick}
    >
      {theme === "light" ? <MoonIcon /> : <SunIcon />}
    </button>
  );
}
