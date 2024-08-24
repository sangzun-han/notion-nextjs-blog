import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      screens: {
        xs: "360px",
      },
      colors: {
        "notion-blue": "rgba(0, 120, 223, 0.2)",
        "notion-orange": "rgba(245, 93, 0, 0.2)",
        "notion-green": "rgba(0, 135, 107, 0.2)",
        "notion-pink": "rgba(221, 0, 129, 0.2)",
        "notion-brown": "rgba(140, 46, 0, 0.2)",
        "notion-red": "rgba(255, 0, 26, 0.2)",
        "notion-yellow": "rgba(233, 168, 0, 0.2)",
        "notion-default": "rgba(206, 205, 202, 0.5)",
        "notion-purple": "rgba(103, 36, 222, 0.2)",
        "notion-gray": "rgba(155, 154, 151, 0.4)",
      },
      backgroundImage: {},
    },
  },

  plugins: [],
  darkMode: "class",
};
export default config;
