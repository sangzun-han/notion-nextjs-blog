"use client";

import useMounted from "@/hooks/use-mounted";
import { ThemeProvider } from "next-themes";

export default function NextThemeProvider({ children }: { children: React.ReactNode }) {
  const { mounted } = useMounted();

  return mounted ? <ThemeProvider attribute="class">{children}</ThemeProvider> : null;
}
