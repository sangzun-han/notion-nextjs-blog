import "./globals.css";
import type { Metadata } from "next";
import RecoilProvider from "@/components/providers/recoil-provider";
import { Inter } from "next/font/google";
import { CONFIG } from "../../site.config";
import { defaultMetaData } from "../../site.metadata";
import Header from "@/components/header/header";
import NextThemeProvider from "@/components/providers/theme";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  ...defaultMetaData,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang={CONFIG.lang} suppressHydrationWarning>
      <head></head>
      <body className={`${inter.className} bg-white dark:bg-[#2f3437]`}>
        <RecoilProvider>
          <NextThemeProvider>
            <Header />
            <main className="text-black">{children}</main>
          </NextThemeProvider>
        </RecoilProvider>
      </body>
    </html>
  );
}
