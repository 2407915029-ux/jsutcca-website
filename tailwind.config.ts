import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        cream: "#fff8ec",
        honey: "#f8c96a",
        leaf: "#8ebf8b",
        salmon: "#ef8f75",
        ink: "#3f3328"
      },
      boxShadow: {
        soft: "0 18px 45px rgba(93, 65, 39, 0.12)"
      }
    }
  },
  plugins: []
};

export default config;
