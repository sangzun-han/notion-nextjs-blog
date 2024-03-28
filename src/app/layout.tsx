import RecoilProvider from "@/components/providers/recoil-provider";
import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Header from "@/components/header/header";
import NextThemeProvider from "@/components/providers/theme";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: "sangzun's blog",
    template: "%s | sangzun",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className={`${inter.className} bg-white dark:bg-[#2f3437]`}>
        <NextThemeProvider>
          <RecoilProvider>
            <Header />
            <main className="text-black">{children}</main>
          </RecoilProvider>
        </NextThemeProvider>
      </body>
    </html>
  );
}
