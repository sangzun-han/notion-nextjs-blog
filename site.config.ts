export const CONFIG = {
  profile: {
    name: "sangzun",
    image: "/profile.webp",
    role: "frontend dev",
    about: "안녕하세요 한상준입니다.",
  },

  blog: {
    title: "sangzun-log",
    description: "welcome to sangzun-log🔥",
    icon: "/favicon.ico",
  },

  defaultImage: "/default.jpeg",
  link: "https://sangzun-log.vercel.app",
  url: "https://sangzun-log.vercel.app",
  lang: "ko-KR",

  notionConfig: {
    pageId: process.env.NOTION_DATABASE_ID as string,
    token: process.env.NOTION_TOKEN_V2 as string,
  },

  googleSearchConsole: {
    enable: true,
    config: {
      siteVerification: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
    },
  },
};
