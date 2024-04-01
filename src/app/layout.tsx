import RecoilProvider from "@/components/providers/recoil-provider";
import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Header from "@/components/header/header";
import NextThemeProvider from "@/components/providers/theme";
import siteConfig from "../../site.config";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: "sangzun's blog",
    template: "%s | sangzun",
  },
  icons: {
    icon: "/favicon.ico",
  },
  verification: {
    google: process.env.GOOGLE_SITE_VERIFICATION,
  },
  openGraph: {
    type: "website",
    url: "https://sangzun-log.vercel.app",
    title: "sangzun-log",
    description: "welcome to sangzun-log🔥",
    locale: "ko-KR",
    images: [
      {
        url: `https://sangzun-log.vercel.app/${siteConfig.profileImage}`,
      },
    ],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <body className={`${inter.className} bg-white dark:bg-[#2f3437]`}>
        <RecoilProvider>
          <NextThemeProvider>
            <Header />
          </NextThemeProvider>
          <main className="text-black">{children}</main>
        </RecoilProvider>
      </body>
    </html>
  );
}
