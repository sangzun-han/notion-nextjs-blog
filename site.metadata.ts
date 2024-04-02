import { Metadata } from "next";
import { CONFIG } from "./site.config";

export const defaultMetaData: Metadata = {
  title: {
    default: "sangzun's blog",
    template: "%s | sangzun",
  },
  description: CONFIG.blog.description,
  alternates: {
    canonical: CONFIG.link,
  },
  icons: {
    icon: CONFIG.blog.icon,
  },
  verification: {
    google: CONFIG.googleSearchConsole.enable ? CONFIG.googleSearchConsole.config.siteVerification : "",
  },
  openGraph: {
    type: "website",
    url: CONFIG.url,
    title: CONFIG.blog.title,
    description: CONFIG.blog.description,
    locale: CONFIG.lang,
    images: [
      {
        url: `${CONFIG.url}/${CONFIG.profile.image}`,
      },
    ],
  },

  robots: {
    index: true,
    follow: true,
  },
};
