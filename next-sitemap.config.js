/** @type {import('next-sitemap').IConfig} */

module.exports = {
  siteUrl: "https://sangzun-log.vercel.app",
  changefreq: "daily",
  generateRobotsTxt: true,
  robotsTxtOptions: {
    policies: [
      {
        userAgent: "*",
        allow: "/",
      },
    ],
  },
};
