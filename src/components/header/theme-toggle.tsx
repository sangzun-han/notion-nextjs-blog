"use client";

import { MoonIcon, SunIcon } from "lucide-react";
import { useTheme } from "next-themes";

export default function ThemeGoggle() {
  const { systemTheme, theme, setTheme } = useTheme();
  const currentTheme = theme === "system" ? systemTheme : theme;
  return (
    <>
      {currentTheme === "light" ? (
        <li onClick={() => setTheme("dark")}>
          <SunIcon className="w-5 h-5 text-yellow-500" />
        </li>
      ) : (
        <li onClick={() => setTheme("light")}>
          <MoonIcon className="w-5 h-5 text-yellow-500" />
        </li>
      )}
    </>
  );
}
