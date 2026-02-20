import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./sections/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        primary: {
          500: "#FDB360", // Gold (primary)
          600: "#e39c4a", // Gold (darker)
        },
        secondary: {
          600: "#11689D", // Blue (secondary)
          700: "#0d537e", // Blue (darker)
        },
      },
    },
  },
  darkMode: 'class', // Manual toggling only, preventing system preference auto-detection
  plugins: [],
};
export default config;
